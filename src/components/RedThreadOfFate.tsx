import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';

interface Point {
  x: number;
  y: number;
}

export default function RedThreadOfFate() {
  const [pathData, setPathData] = useState<string>('');
  const [height, setHeight] = useState<number>(0);
  const [width, setWidth] = useState<number>(window.innerWidth);
  const containerRef = useRef<SVGSVGElement | null>(null);

  // Measure the vertical scroll of the entire document
  const { scrollYProgress } = useScroll();
  
  // Map progress so it reaches 100% drawn when user scrolls 75% of the page (reaching the final timeline/countdown area)
  const mappedProgress = useTransform(scrollYProgress, [0, 0.75], [0, 1], { clamp: true });

  // Use a soft, elegant spring-damped motion to animate the drawing of the path
  const pathLength = useSpring(mappedProgress, {
    stiffness: 45,
    damping: 18,
    mass: 0.8
  });

  useEffect(() => {
    const calculatePath = () => {
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      setHeight(docHeight);

      const currentWidth = window.innerWidth;
      setWidth(currentWidth);

      const points: Point[] = [];

      // 1. Start point near the very top of the page
      points.push({ x: currentWidth / 2, y: 150 });

      // Helper to calculate scroll-offset coordinates of a DOM element
      const getCoords = (el: HTMLElement) => {
        const rect = el.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        return {
          x: rect.left + rect.width / 2 + scrollLeft,
          y: rect.top + rect.height / 2 + scrollTop
        };
      };

      // 2. Locate the floating Phone Viewport
      const phoneEl = document.getElementById('mockup-phone-viewport');
      if (phoneEl) {
        const coords = getCoords(phoneEl);
        // Contour the left border of the page before diving into the phone
        points.push({ x: 35, y: coords.y - 180 });
        // Dive into the center of the phone
        points.push({ x: coords.x, y: coords.y });
        // Contour the right border of the page after exiting the phone
        points.push({ x: currentWidth - 35, y: coords.y + 180 });
      }

      // 3. Locate the Notebook Mockup
      const laptopEl = document.getElementById('laptop-mockup-outer');
      if (laptopEl) {
        const coords = getCoords(laptopEl);
        // Contour the left border of the site before the notebook
        points.push({ x: 35, y: coords.y - 250 });
        // Plunge right into the notebook screen to power the cinematic video!
        points.push({ x: coords.x, y: coords.y });
        // Contour the right border of the site after the notebook
        points.push({ x: currentWidth - 35, y: coords.y + 250 });
      }

      // 4. Locate each timeline card dynamically
      const timelineCards = document.querySelectorAll('.timeline-card-anchor');
      timelineCards.forEach((card, idx) => {
        const coords = getCoords(card as HTMLElement);
        const isLeft = idx % 2 === 0;
        const isLast = idx === timelineCards.length - 1;

        // Contour the corresponding border before looping into the card
        if (isLeft) {
          points.push({ x: 45, y: coords.y - 120 });
        } else {
          points.push({ x: currentWidth - 45, y: coords.y - 120 });
        }

        // Swoop directly into the card center
        points.push({ x: coords.x, y: coords.y });

        // Smooth transition back near center
        if (!isLast) {
          points.push({ x: currentWidth / 2, y: coords.y + 160 });
        } else {
          points.push({ x: currentWidth / 2, y: coords.y + 240 });
        }
      });

      // 5. Flow past the last card into the finale love letter area
      const finaleEl = document.getElementById('finale-countdown-section');
      if (finaleEl) {
        const coords = getCoords(finaleEl);
        points.push({ x: currentWidth / 2, y: coords.y - 80 });
        points.push({ x: currentWidth / 2, y: coords.y + 250 });
      }

      if (points.length < 2) return;

      // 5. Generate a smooth cubic Bezier path string from the points
      let d = `M ${points[0].x} ${points[0].y}`;
      for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i];
        const p1 = points[i + 1];
        // Control points are midway vertically to generate natural organic S-curves
        const cpX1 = p0.x;
        const cpY1 = p0.y + (p1.y - p0.y) / 2.2;
        const cpX2 = p1.x;
        const cpY2 = p0.y + (p1.y - p0.y) / 1.8;
        
        d += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${p1.x} ${p1.y}`;
      }

      setPathData(d);
    };

    // Recalculate on load, resize, and with a small delay for image assets layout stabilization
    calculatePath();
    window.addEventListener('resize', calculatePath);
    
    const timeoutId = setTimeout(calculatePath, 1500);

    return () => {
      window.removeEventListener('resize', calculatePath);
      clearTimeout(timeoutId);
    };
  }, []);

  if (!pathData || height === 0) return null;

  return (
    <svg
      ref={containerRef}
      className="absolute top-0 left-0 w-full pointer-events-none z-[4]"
      style={{ height: `${height}px` }}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
    >
      <defs>
        {/* Soft glowing neon shadow for the Red Thread of Fate */}
        <filter id="thread-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feComponentTransfer in="blur" result="boost">
            <feFuncA type="linear" slope="1.8" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode in="boost" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* 1. Underlying soft glowing path shadow */}
      <motion.path
        d={pathData}
        stroke="rgba(217, 56, 58, 0.25)"
        strokeWidth={16}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ pathLength }}
      />

      {/* 2. Main Glowing Crimson Red Thread - Thickened as requested ("grande, vermelha") */}
      <motion.path
        d={pathData}
        stroke="#D9383A"
        strokeWidth={6.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#thread-glow)"
        style={{ pathLength }}
      />

      {/* 3. Glowing core energy tip that rides the scroll */}
      <motion.circle
        r={9}
        fill="#FFFFFF"
        stroke="#D9383A"
        strokeWidth={4}
        style={{
          pathLength,
          // Ride the end of the drawing line
          offsetPath: `path('${pathData}')`,
          offsetDistance: `${scrollYProgress.get() * 100}%`
        }}
        className="shadow-lg"
      />
    </svg>
  );
}
