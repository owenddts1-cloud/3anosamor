import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { Laptop, Play, Pause, Heart, ChevronRight, ChevronLeft } from 'lucide-react';
import { MemoryItem } from '../types';
import { CINEMA_VIDEOS as LOCAL_CINEMA_VIDEOS } from '../galleryData';

interface LaptopSectionProps {
  memories: MemoryItem[];
}

// Cinematic looping romantic MP4 videos to showcase in the notebook (different from memories to avoid repeat)
const STATIC_CINEMA_VIDEOS = [
  "https://player.vimeo.com/external/454523315.sd.mp4?s=d63ebda594379a05df8c519a7776f8a846f7f6a7&profile_id=139&oauth2_token_id=57447761", // Cozy fireplace couple
  "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c02cba73fa00ecf004c861217e909062&profile_id=139&oauth2_token_id=57447761", // Romantic city lights walk
  "https://player.vimeo.com/external/469951662.sd.mp4?s=12cd0b1154546419747cb90c60f4e24ef4b00511&profile_id=139&oauth2_token_id=57447761"  // Sweet sunset together
];

const CINEMA_VIDEOS = LOCAL_CINEMA_VIDEOS && LOCAL_CINEMA_VIDEOS.length > 0
  ? LOCAL_CINEMA_VIDEOS
  : STATIC_CINEMA_VIDEOS;

export default function LaptopSection({ memories }: LaptopSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Scroll parallax indicators to animate laptop content elements
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });
  
  // Parallax elements for decorative texts around the laptop
  const textXLeft = useTransform(smoothProgress, [0, 1], [-100, 100]);
  const textXRight = useTransform(smoothProgress, [0, 1], [100, -100]);
  const laptopScale = useTransform(smoothProgress, [0, 0.5, 1], [1.02, 1.12, 1.05]);

  // Handle play/pause of HTML5 Video
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % CINEMA_VIDEOS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + CINEMA_VIDEOS.length) % CINEMA_VIDEOS.length);
  };

  return (
    <section
      ref={sectionRef}
      id="notebook-cinematic-section"
      className="relative min-h-screen bg-[#F4EDE4] dark:bg-[#0B0A09] py-28 px-4 overflow-hidden flex flex-col items-center justify-center select-none transition-colors duration-500"
    >
      {/* Decorative Warm Backlights */}
      <div className="absolute top-[30%] left-[10%] w-[35vw] h-[35vw] rounded-full bg-[#C49A6C]/10 dark:bg-[#C49A6C]/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-[#E5A995]/10 dark:bg-[#E5A995]/5 blur-[120px] pointer-events-none" />

      {/* Floating typography labels behind the notebook */}
      <motion.div
        style={{ x: textXLeft }}
        className="absolute top-1/4 left-0 right-0 whitespace-nowrap text-[12vw] font-serif italic text-stone-300/40 dark:text-stone-800/15 pointer-events-none text-center select-none z-0 font-extrabold transition-colors duration-500"
      >
        Nossos Melhores Momentos
      </motion.div>
      <motion.div
        style={{ x: textXRight }}
        className="absolute bottom-1/4 left-0 right-0 whitespace-nowrap text-[10vw] font-mono text-stone-200/50 dark:text-stone-800/10 pointer-events-none text-center select-none z-0 font-bold transition-colors duration-500"
      >
        LUDMILA & OWEN 3 ANOS
      </motion.div>

      <div className="max-w-5xl w-full mx-auto relative z-10 flex flex-col items-center">
        {/* Typographic Introduction */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D9383A]/15 border border-[#D9383A]/35 text-[#D9383A] text-[10px] font-mono uppercase tracking-widest mb-4 font-bold"
          >
            <Laptop className="w-3.5 h-3.5" />
            <span>O Notebook de Memórias</span>
          </motion.div>
          
          <h2 className="font-serif text-3xl sm:text-4.5xl font-extrabold text-stone-950 dark:text-stone-50 tracking-tight leading-tight transition-colors duration-300">
            Nossa <span className="text-[#D9383A] italic font-extrabold">Série de Amor</span> em Tela Cheia
          </h2>
          
          <p className="mt-3 text-xs sm:text-sm text-stone-700 dark:text-stone-300 font-mono tracking-wide max-w-md mx-auto font-bold transition-colors duration-300">
            Uma exibição de cinema interativa com vídeos reais rodando diretamente no notebook. Assista ao nosso afeto em movimento.
          </p>
        </div>

        {/* Premium CSS-built MacBook Pro Frame Mockup */}
        <motion.div
          id="laptop-mockup-outer"
          style={{ scale: laptopScale }}
          className="relative w-full max-w-[900px] flex flex-col items-center"
        >
          {/* Laptop Screen Display Area */}
          <div className="relative w-full aspect-[16/10] rounded-t-[24px] bg-stone-900 border-[8px] sm:border-[12px] border-stone-800 shadow-[0_30px_70px_rgba(28,26,23,0.18)] overflow-hidden flex items-center justify-center">
            
            {/* Screen Reflective Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/3 to-white/10 pointer-events-none z-10" />

            {/* Inner Display Area Content */}
            <div className="absolute inset-0 bg-stone-950 flex flex-col justify-between p-3 select-none">
              
              {/* Browser Address Bar Mockup */}
              <div className="flex items-center justify-between border-b border-stone-800/80 pb-2 mb-2 text-[9px] font-mono text-stone-500">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500/80" />
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/80" />
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500/80" />
                </div>
                <div className="bg-stone-900/90 border border-stone-800 px-10 py-0.5 rounded text-stone-400 text-[8px] max-w-[200px] sm:max-w-xs truncate text-center">
                  ludmila.love/3-anos-juntos
                </div>
                <div className="w-10 text-right opacity-60">
                  100% ♥
                </div>
              </div>

              {/* Memory video playback simulation */}
              <div className="flex-1 relative rounded-lg overflow-hidden group bg-stone-900">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0"
                  >
                    {/* HTML5 Video playing real cinema clips */}
                    <video
                      ref={videoRef}
                      src={CINEMA_VIDEOS[currentIndex]}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-contain bg-[#0c0b0a]"
                    />

                    {/* Cinematic overlay vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-stone-950/30" />

                    {/* Content on the Screen */}
                    <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-col justify-end text-left">
                      <div className="flex items-center gap-1.5 mb-1 bg-[#D9383A]/25 backdrop-blur-md border border-[#D9383A]/30 text-[#E5A995] font-mono text-[8px] font-semibold px-2 py-0.5 rounded-full w-fit">
                        <Heart className="w-2.5 h-2.5 fill-current text-[#D9383A]" />
                        <span>CENA DE AMOR {String(currentIndex + 1).padStart(2, '0')}</span>
                      </div>
                      
                      <h3 className="font-serif text-sm sm:text-xl text-stone-100 font-medium leading-snug">
                        {CINEMA_VIDEOS === STATIC_CINEMA_VIDEOS
                          ? (currentIndex === 0 ? "Momentos Aconchegantes" : currentIndex === 1 ? "Caminhadas Sob as Estrelas" : "O Pôr do Sol Juntos")
                          : `Nosso Momento em Vídeo #${currentIndex + 1}`}
                      </h3>
                      
                      <p className="text-[10px] sm:text-xs text-stone-300 font-sans mt-1.5 line-clamp-2 leading-relaxed opacity-90 max-w-lg">
                        {CINEMA_VIDEOS === STATIC_CINEMA_VIDEOS
                          ? (currentIndex === 0 
                              ? "O calor do lar, as conversas sem pressa e a paz inabalável que só o seu abraço transmite ao meu peito."
                              : currentIndex === 1 
                              ? "Cada luz na cidade parece celebrar a nossa união, caminhando com as mãos dadas pela eternidade."
                              : "O sol se pondo no horizonte, banhando de ouro e vermelho o futuro lindo que nos aguarda.")
                          : "Revivendo nossos instantes mais felizes e cheios de afeto. Cada segundo guardado na nossa memória e gravado com carinho."
                        }
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Left/Right Slideshow Interactive Arrows */}
                <button
                  onClick={handlePrev}
                  id="laptop-prev-btn"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-stone-950/65 border border-stone-800 text-stone-300 hover:text-[#D9383A] hover:border-[#D9383A] flex items-center justify-center z-20 cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-300 active:scale-90"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  id="laptop-next-btn"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-stone-950/65 border border-stone-800 text-stone-300 hover:text-[#D9383A] hover:border-[#D9383A] flex items-center justify-center z-20 cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-300 active:scale-90"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Live Running/Paused indicator overlay */}
                <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                  <span className="font-mono text-[7px] text-stone-400 bg-stone-950/80 px-1.5 py-0.5 rounded">
                    CINEMA VÍDEO ACTIVO
                  </span>
                </div>
              </div>

              {/* Cinema bar navigation */}
              <div className="flex items-center justify-between mt-2.5 text-[8px] font-mono text-stone-500 border-t border-stone-900 pt-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  id="laptop-playback-btn"
                  className="flex items-center gap-1 hover:text-[#D9383A] text-stone-400 cursor-pointer transition-colors"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-2.5 h-2.5 text-[#D9383A] fill-current" />
                      <span>PAUSAR REPRODUÇÃO</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-2.5 h-2.5 text-stone-400 fill-current" />
                      <span>RETOMAR REPRODUÇÃO</span>
                    </>
                  )}
                </button>
                <div className="flex items-center gap-1 text-[8px]">
                  <span>VÍDEO {currentIndex + 1} DE {CINEMA_VIDEOS.length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Laptop Bottom Keyboard base */}
          <div className="relative w-[114%] h-[16px] sm:h-[22px] bg-stone-800 rounded-b-[18px] border-t border-stone-600 shadow-[0_15px_30px_rgba(28,26,23,0.12)]">
            {/* Display notch center groove */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-2 bg-stone-900 rounded-b-md" />
          </div>

          {/* Table stand table shadow */}
          <div className="w-[102%] h-[6px] bg-stone-950/15 rounded-full blur-[4px] mt-0.5" />
        </motion.div>
      </div>
    </section>
  );
}
