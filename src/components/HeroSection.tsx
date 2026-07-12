import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { Heart, ChevronDown } from 'lucide-react';
import { MemoryItem } from '../types';

interface HeroSectionProps {
  memories: MemoryItem[];
  coupleName1: string;
  coupleName2: string;
}

export default function HeroSection({ memories, coupleName1, coupleName2 }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Measure scroll over a 300vh track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Inertial physics mapping for buttery smooth reactions on trackpads/scrollwheels
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    mass: 0.5
  });

  // Scale the phone aggressively to fill the viewport
  const phoneScale = useTransform(smoothProgress, [0, 0.65], [0.72, 5.5]);
  
  // PUSH the phone downwards initially so it NEVER overlaps the header text!
  const phoneY = useTransform(smoothProgress, [0, 0.65], [150, 0]);

  // Fade out the phone bezel as it goes full screen
  const bezelOpacity = useTransform(smoothProgress, [0.55, 0.70], [1, 0]);

  // Once full screen, fade out the whole hero section and blur it
  const heroOpacity = useTransform(smoothProgress, [0.75, 0.95], [1, 0]);
  const heroBlur = useTransform(smoothProgress, [0.72, 0.95], ["blur(0px)", "blur(18px)"]);

  // Overlay text scale and fade out
  const textOpacity = useTransform(smoothProgress, [0, 0.22], [1, 0]);
  const textTranslateY = useTransform(smoothProgress, [0, 0.22], [0, -70]);

  // Cycle slides based on scroll percentage inside the phone
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      // We have 4 memories to showcase inside the phone
      const totalSlides = 4;
      const progressPerSlide = 0.55 / totalSlides; // Transition slides in first 55% of the scroll track
      const slideIndex = Math.min(
        Math.floor(latest / progressPerSlide),
        totalSlides - 1
      );
      if (slideIndex >= 0 && slideIndex !== currentSlide) {
        setCurrentSlide(slideIndex);
      }
    });
    return () => unsubscribe();
  }, [smoothProgress, currentSlide]);

  return (
    <div
      ref={containerRef}
      id="hero-scroll-track"
      className="relative h-[300vh] w-full bg-[#F4EDE4] dark:bg-[#0B0A09] text-stone-950 dark:text-stone-100 select-none transition-colors duration-500"
    >
      {/* CSS Sticky pinning locks viewport in place during scaling scrub */}
      <motion.div
        style={{ opacity: heroOpacity, filter: heroBlur }}
        className="sticky top-0 left-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center z-10"
      >
        {/* Soft elegant warm gradient overlay */}
        <div className="absolute inset-0 bg-radial-gradient from-[#EDE2D4]/60 dark:from-stone-900/40 to-[#F4EDE4]/95 dark:to-[#0B0A09]/95 pointer-events-none transition-all duration-500" />

        {/* Intro Typographic Header (Fades away on first scroll, positioned high with generous breathing space) */}
        <motion.div
          style={{ opacity: textOpacity, y: textTranslateY }}
          className="absolute top-[8vh] text-center px-4 z-20 pointer-events-none max-w-2xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex items-center justify-center gap-2 mb-2"
          >
            <span className="text-stone-400 dark:text-stone-500 tracking-widest text-[9px] uppercase font-mono">MEMÓRIA CINEMÁTICA</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D9383A] animate-pulse" />
          </motion.div>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold tracking-tight text-stone-950 dark:text-stone-50 leading-tight transition-colors duration-300">
            Para <span className="text-[#C49A6C] font-serif italic font-extrabold">{coupleName2}</span>, com todo meu amor
          </h1>
          <p className="mt-2.5 text-xs sm:text-sm font-mono text-stone-700 dark:text-stone-300 tracking-wide max-w-lg mx-auto font-medium transition-colors duration-300">
            Três anos de uma história esculpida em sorrisos, cumplicidade e sonhos compartilhados.
          </p>
          <div className="mt-4 flex items-center justify-center gap-1.5 text-stone-500 dark:text-stone-400 font-mono text-[10px] font-bold transition-colors duration-300">
            <span>ROLE PARA SE APROXIMAR</span>
            <ChevronDown className="w-3.5 h-3.5 animate-bounce text-[#C49A6C]" />
          </div>
        </motion.div>

        {/* Floating Cellphone Frame */}
        <motion.div
          id="mockup-phone-viewport"
          style={{ scale: phoneScale, y: phoneY }}
          className="relative flex items-center justify-center transition-shadow duration-700"
        >
          {/* Main phone body */}
          <div className="relative w-[285px] h-[560px] sm:w-[315px] sm:h-[630px] rounded-[48px] bg-stone-950 flex items-center justify-center overflow-hidden shadow-[0_25px_60px_rgba(28,26,23,0.14)] border border-stone-800">
            
            {/* Bezel frame overlay (Fades on deep zoom) */}
            <motion.div
              style={{ opacity: bezelOpacity }}
              className="absolute inset-0 pointer-events-none border-[11px] border-stone-900 rounded-[48px] z-30"
            />
            <motion.div
              style={{ opacity: bezelOpacity }}
              className="absolute top-0 inset-x-0 h-6.5 bg-stone-900 rounded-b-[18px] mx-auto w-24 flex items-center justify-center z-40 pointer-events-none"
            >
              {/* Dynamic Island / Bezel notch */}
              <div className="w-12 h-3 rounded-full bg-stone-950 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-stone-900 absolute right-8" />
              </div>
            </motion.div>

            {/* Display Screen */}
            <div className="relative w-full h-full rounded-[40px] overflow-hidden bg-stone-950 z-20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.85, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full"
                >
                  {/* Photo cover display */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000"
                    style={{
                      backgroundImage: `url('${memories[currentSlide]?.mediaUrl}')`,
                    }}
                  />
                  {/* Cinematic dark overlay inside screen */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-stone-950/45 z-10" />

                  {/* On-screen floating love subtitle/date */}
                  <div className="absolute bottom-10 inset-x-0 px-6 text-center z-20 flex flex-col items-center">
                    <motion.div
                      initial={{ y: 15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-center gap-1.5 bg-[#C49A6C]/25 backdrop-blur-md border border-[#C49A6C]/40 px-2.5 py-0.5 rounded-full mb-2"
                    >
                      <Heart className="w-3 h-3 text-[#C49A6C] fill-current" />
                      <span className="font-mono text-[8px] text-[#C49A6C] font-bold tracking-wider">
                        {memories[currentSlide]?.date}
                      </span>
                    </motion.div>
                    
                    <motion.h3
                      initial={{ y: 15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="font-serif text-xl text-white font-extrabold"
                    >
                      {memories[currentSlide]?.title}
                    </motion.h3>
                    
                    <motion.p
                      initial={{ y: 15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-xs text-stone-200 font-mono mt-1 text-center max-w-[220px] font-semibold"
                    >
                      {memories[currentSlide]?.location}
                    </motion.p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Side background floating quote (appears subtly during scroll) */}
        <motion.div
          style={{ opacity: useTransform(smoothProgress, [0.15, 0.5], [0, 0.45]) }}
          className="absolute bottom-[6vh] text-center font-serif italic text-stone-500 max-w-md px-6 text-[11px] sm:text-xs z-10"
        >
          "Há momentos que merecem ser guardados para sempre... num espaço onde o tempo nunca passa."
        </motion.div>
      </motion.div>
    </div>
  );
}
