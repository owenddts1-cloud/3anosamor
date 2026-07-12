import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Position motion values
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Apply friction (stiffness and damping) to create the romantic, physical floating lag
  const springConfig = { stiffness: 400, damping: 35, mass: 0.6 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    // Global listener to check for custom cursor text triggers
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest('[data-cursor-text]');
      
      if (interactiveEl) {
        const text = interactiveEl.getAttribute('data-cursor-text') || '';
        setCursorText(text);
        setIsHovered(true);
      } else {
        const standardButton = target.closest('button, a, input, [role="button"]');
        if (standardButton) {
          setIsHovered(true);
          setCursorText('');
        } else {
          setIsHovered(false);
          setCursorText('');
        }
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Leading pointer (Main Spring-Damped Circle) */}
      <motion.div
        id="custom-cursor-glow"
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[100] flex items-center justify-center mix-blend-difference font-mono text-[9px] font-bold uppercase tracking-widest text-stone-900 text-center"
        style={{
          x: cursorX,
          y: cursorY,
          width: isHovered ? (cursorText ? '85px' : '36px') : '14px',
          height: isHovered ? (cursorText ? '85px' : '36px') : '14px',
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: isHovered ? 'rgba(245, 245, 240, 1)' : 'rgba(196, 154, 108, 0.95)',
          boxShadow: isHovered 
            ? '0 0 25px rgba(245, 245, 240, 0.3)' 
            : '0 0 12px rgba(196, 154, 108, 0.4)',
        }}
        transition={{
          type: 'tween',
          ease: 'backOut',
          duration: 0.15,
        }}
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-2 text-stone-950 font-sans tracking-wide leading-tight text-center font-medium text-[10px]"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>

      {/* Behind atmospheric soft dot */}
      <motion.div
        id="custom-cursor-dot"
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#C49A6C] rounded-full pointer-events-none z-[101]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </>
  );
}
