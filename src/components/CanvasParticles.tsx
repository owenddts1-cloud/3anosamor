import { useEffect, useRef } from 'react';

interface Sparkle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  radius: number;
  color: string;
  alpha: number;
  phase: number;
}

interface InkDrop {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  speed: number;
  color: string;
  subBlobs: { dx: number; dy: number; sizeMult: number; angle: number; rotSpeed: number }[];
}

export default function CanvasParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });
  const inkDropsRef = useRef<InkDrop[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let sparkles: Sparkle[] = [];
    const maxSparkles = 60; // Balanced density of floating gold specs

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initSparkles();
    };

    const initSparkles = () => {
      sparkles = [];
      const colors = [
        'rgba(196, 154, 108, ', // Champagne Gold #C49A6C
        'rgba(229, 169, 149, ', // Rose gold #E5A995
        'rgba(217, 56, 58, ',   // Red ink highlight #D9383A
      ];

      for (let i = 0; i < maxSparkles; i++) {
        const baseRadius = Math.random() * 1.5 + 0.5;
        sparkles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3 - 0.08, // slow upward drift
          baseRadius,
          radius: baseRadius,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: Math.random() * 0.4 + 0.1,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    // Helper to spawn a new magnificent red ink explosion (resembling video)
    const triggerInkExplosion = (x: number, y: number, isInitial = false) => {
      const maxRadius = isInitial 
        ? Math.random() * 180 + 160 
        : Math.random() * 120 + 90;
      
      const colors = [
        'rgba(217, 56, 58, ',  // Deep Crimson #D9383A
        'rgba(190, 30, 35, ',  // Warm Ruby Red
        'rgba(235, 94, 85, ',  // Soft Rose Red
      ];

      // Build organic sub-blobs to represent smoke-like tendrils branching out
      const subBlobsCount = Math.floor(Math.random() * 6) + 6;
      const subBlobs = [];
      for (let i = 0; i < subBlobsCount; i++) {
        subBlobs.push({
          dx: (Math.random() - 0.5) * 45,
          dy: (Math.random() - 0.5) * 45,
          sizeMult: Math.random() * 0.5 + 0.4,
          angle: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.015,
        });
      }

      inkDropsRef.current.push({
        x,
        y,
        radius: 0.1,
        maxRadius,
        alpha: 0.75,
        speed: 1.5 + Math.random() * 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        subBlobs,
      });

      // Keep maximum simultaneous ink drops capped to preserve performance
      if (inkDropsRef.current.length > 8) {
        inkDropsRef.current.shift();
      }
    };

    // Initial gorgeous splash in center on load
    setTimeout(() => {
      // Powerful sequence of horizontal dispersing ink drops mimicking the video exactly
      triggerInkExplosion(window.innerWidth / 2, window.innerHeight * 0.45, true);
      
      setTimeout(() => {
        triggerInkExplosion(window.innerWidth / 2 - 160, window.innerHeight * 0.42);
      }, 150);

      setTimeout(() => {
        triggerInkExplosion(window.innerWidth / 2 + 160, window.innerHeight * 0.48);
      }, 300);

      setTimeout(() => {
        triggerInkExplosion(window.innerWidth / 2 - 60, window.innerHeight * 0.38);
        triggerInkExplosion(window.innerWidth / 2 + 60, window.innerHeight * 0.52);
      }, 450);
    }, 400);

    const draw = () => {
      // Clear with soft trails to make ink look fluid and blended
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mouse = mouseRef.current;

      // 1. Draw expanding soft organic watercolor ink clouds (Multiply Blend)
      ctx.globalCompositeOperation = 'multiply';
      const activeDrops = inkDropsRef.current;

      for (let i = activeDrops.length - 1; i >= 0; i--) {
        const d = activeDrops[i];
        
        // Organic exponential expansion
        d.radius += (d.maxRadius - d.radius) * 0.012 * d.speed;
        d.alpha -= 0.003 * d.speed; // Beautiful slow fade

        if (d.alpha <= 0 || d.radius >= d.maxRadius - 1) {
          activeDrops.splice(i, 1);
          continue;
        }

        // Draw main ink drop core
        ctx.beginPath();
        const mainGrad = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.radius);
        mainGrad.addColorStop(0, `${d.color}${d.alpha})`);
        mainGrad.addColorStop(0.5, `${d.color}${d.alpha * 0.45})`);
        mainGrad.addColorStop(1, `${d.color}0)`);
        ctx.fillStyle = mainGrad;
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
        ctx.fill();

        // Draw organic sub-blobs expanding and swirling around core
        for (let j = 0; j < d.subBlobs.length; j++) {
          const b = d.subBlobs[j];
          b.angle += b.rotSpeed;
          
          // Animate offset expanding with the core
          const offsetMult = d.radius / d.maxRadius;
          const bx = d.x + Math.cos(b.angle) * b.dx * 1.5 * offsetMult;
          const by = d.y + Math.sin(b.angle) * b.dy * 1.5 * offsetMult;
          const bRadius = d.radius * b.sizeMult;

          ctx.beginPath();
          const subGrad = ctx.createRadialGradient(bx, by, 0, bx, by, bRadius);
          subGrad.addColorStop(0, `${d.color}${d.alpha * 0.6})`);
          subGrad.addColorStop(0.6, `${d.color}${d.alpha * 0.25})`);
          subGrad.addColorStop(1, `${d.color}0)`);
          ctx.fillStyle = subGrad;
          ctx.arc(bx, by, bRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 2. Draw sparkles (Source Over Blend)
      ctx.globalCompositeOperation = 'source-over';
      for (let i = 0; i < sparkles.length; i++) {
        const p = sparkles[i];

        p.phase += 0.01;
        p.vx += Math.sin(p.phase) * 0.002;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = canvas.height + 10;

        // Interactive mouse hover
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxInfluence = 120;

          if (dist < maxInfluence) {
            const force = (maxInfluence - dist) / maxInfluence;
            p.vx += (dx / dist) * force * 0.05;
            p.vy += (dy / dist) * force * 0.05;
            p.radius = p.baseRadius * (1 + force * 1.0);
          } else {
            p.radius += (p.baseRadius - p.radius) * 0.05;
          }
        } else {
          p.radius += (p.baseRadius - p.radius) * 0.05;
        }

        // Pulse alpha gently
        const currentAlpha = p.alpha * (0.6 + Math.sin(p.phase * 1.5) * 0.4);

        ctx.beginPath();
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2);
        grad.addColorStop(0, `${p.color}${currentAlpha})`);
        grad.addColorStop(1, `${p.color}0)`);
        
        ctx.fillStyle = grad;
        ctx.arc(p.x, p.y, p.radius * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    // Clicking spawns a lovely romantic red explosion splash!
    const handleClick = (e: MouseEvent) => {
      // Avoid spawning right on the drawer edit panel triggers
      const target = e.target as HTMLElement;
      if (target.closest('button, a, input, [role="button"], textarea')) return;
      triggerInkExplosion(e.clientX, e.clientY);
    };

    // Slowly drip red ink as user scrolls!
    let lastScrollY = window.scrollY;
    let scrollAccumulator = 0;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = Math.abs(currentScrollY - lastScrollY);
      scrollAccumulator += diff;
      lastScrollY = currentScrollY;

      if (scrollAccumulator > 380) { // spawn ink cloud as you travel the love page
        scrollAccumulator = 0;
        const randomX = Math.random() * window.innerWidth;
        const viewportY = Math.random() * (window.innerHeight - 100) + 50;
        triggerInkExplosion(randomX, viewportY);
      }
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);
    window.addEventListener('scroll', handleScroll);

    resizeCanvas();
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="particles-canvas"
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{ mixBlendMode: 'normal' }}
    />
  );
}
