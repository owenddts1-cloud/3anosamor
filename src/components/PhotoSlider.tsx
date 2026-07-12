import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Heart, Sparkles, Camera } from 'lucide-react';
import { GALLERY_IMAGES as LOCAL_GALLERY_IMAGES } from '../galleryData';

// Predefined list of beautiful romantic captions to sequentially assign to the user's images
const ROMANTIC_CAPTIONS = [
  "Mãos entrelaçadas, nossa sintonia inabalável",
  "Sorrisos iluminados sob o calor da nossa cumplicidade",
  "Descobrindo caminhos e colecionando horizontes juntos",
  "Aconchego e o calor do seu abraço nas manhãs frias",
  "O brilho do pôr do sol refletindo a nossa eternidade",
  "Cada risada boba sua é a minha trilha sonora favorita",
  "O sim mais bonito que o destino sussurrou para nós",
  "Apenas nós dois, o infinito e um milhão de sonhos",
  "Seu olhar de sossego acalma qualquer tempestade",
  "Parceiros de vida, cúmplices de risos e amor eterno",
  "Nosso amor se fortalece nos pequenos gestos diários",
  "Atravessando estações, de mãos dadas rumo ao futuro",
  "Cada detalhe seu me faz apaixonar novamente",
  "O porto seguro que meu coração sempre buscou",
  "A beleza do cotidiano ao seu lado é mágica",
  "Seu abraço é o meu lugar favorito no mundo inteiro",
  "Construindo um futuro lindo, passo a passo, dia após dia",
  "Nossa história de amor é a minha favorita",
  "A sintonia perfeita de dois corações que batem juntos",
  "Carinho, cumplicidade e a certeza de um amor eterno",
  "Nossos sorrisos mais sinceros acontecem quando estamos juntos",
  "A doçura do seu beijo alegra qualquer dia",
  "A vida é muito mais colorida e feliz com você ao meu lado",
  "Te amo por quem você é e por quem me torno com você"
];

// Curated list of high-quality romantic/couple images representing their love story milestones
const STATIC_SLIDER_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=1600",
    caption: "Mãos entrelaçadas, nossa sintonia inabalável",
    location: "São Paulo, SP"
  },
  {
    url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=1600",
    caption: "Sorrisos iluminados sob o calor da nossa cumplicidade",
    location: "Parque do Ibirapuera"
  },
  {
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1600",
    caption: "Descobrindo caminhos e colecionando horizontes juntos",
    location: "Campos do Jordão"
  },
  {
    url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=1600",
    caption: "Aconchego e o calor do seu abraço nas manhãs frias",
    location: "Nosso Cantinho"
  },
  {
    url: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=1600",
    caption: "O brilho do pôr do sol refletindo a nossa eternidade",
    location: "Ponta do Humaitá"
  },
  {
    url: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&q=80&w=1600",
    caption: "Cada risada boba sua é a minha trilha sonora favorita",
    location: "Café Romântico"
  },
  {
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1600",
    caption: "O sim mais bonito que o destino sussurrou para nós",
    location: "Praia Vermelha"
  },
  {
    url: "https://images.unsplash.com/photo-1494972308805-463bc619b34e?auto=format&fit=crop&q=80&w=1600",
    caption: "Apenas nós dois, o infinito e um milhão de sonhos",
    location: "Mirante das Estrelas"
  },
  {
    url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=1600",
    caption: "Seu olhar de sossego acalma qualquer tempestade",
    location: "Jardim Botânico"
  },
  {
    url: "https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&q=80&w=1600",
    caption: "Parceiros de vida, cúmplices de risos e amor eterno",
    location: "Gramado, RS"
  },
  {
    url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&q=80&w=1600",
    caption: "Nosso amor se fortalece nos pequenos gestos diários",
    location: "Cinema de Domingo"
  },
  {
    url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1600",
    caption: "Atravessando estações, de mãos dadas rumo ao futuro",
    location: "Liberdade, SP"
  }
];

const SLIDER_IMAGES = LOCAL_GALLERY_IMAGES && LOCAL_GALLERY_IMAGES.length > 0
  ? LOCAL_GALLERY_IMAGES.map((url, i) => ({
      url,
      caption: ROMANTIC_CAPTIONS[i % ROMANTIC_CAPTIONS.length],
      location: "Momentos Românticos"
    }))
  : STATIC_SLIDER_IMAGES;

// We simulate the total photos limit using the slider images length
const TOTAL_PHOTOS_LIMIT = SLIDER_IMAGES.length;

export default function PhotoSlider() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const currentPhotoData = SLIDER_IMAGES[index % SLIDER_IMAGES.length];

  const handleNext = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % TOTAL_PHOTOS_LIMIT);
  };

  const handlePrev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + TOTAL_PHOTOS_LIMIT) % TOTAL_PHOTOS_LIMIT);
  };

  // Keyboard Navigation Support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Helper to resolve card states dynamically
  const getCardStyles = (offset: number) => {
    const absOffset = Math.abs(offset);
    
    // We spread them horizontally. Each offset step moves the card by 35% to 38%
    // of the slider container's width, creating a beautiful overlapping continuous deck.
    const xPercent = offset * 36;
    
    // Smoothly scale down further out cards
    const scale = 1 - absOffset * 0.11;
    
    // Fade cards as they approach the screen edge
    const opacity = Math.max(0, 1 - absOffset * 0.22);
    
    // Gradually increase blur and lower brightness
    const blurVal = absOffset * 2.2;
    const brightness = 1 - absOffset * 0.06;

    return {
      x: `${xPercent}%`,
      scale: Math.max(0.4, scale),
      opacity: opacity,
      filter: `blur(${blurVal}px) brightness(${brightness})`,
    };
  };

  return (
    <div id="photo-slider-wrapper" className="w-full max-w-4xl mx-auto py-12 px-4 select-none overflow-visible">
      
      {/* Dynamic Header & Slider Meta */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C49A6C]/10 border border-[#C49A6C]/30 text-[#C49A6C] text-[10px] font-mono uppercase tracking-widest mb-3 font-bold"
        >
          <Camera className="w-3.5 h-3.5" />
          <span>Nossos {TOTAL_PHOTOS_LIMIT} Instantes de Amor</span>
        </motion.div>
        <h3 className="font-serif text-2xl sm:text-3.5xl font-extrabold text-stone-950 dark:text-stone-50 tracking-tight leading-tight transition-colors duration-300">
          Nossa Galeria de <span className="text-[#D9383A] italic font-semibold">Memórias Eternas</span>
        </h3>
        <p className="mt-2 text-[11px] sm:text-xs text-stone-600 dark:text-stone-400 font-mono tracking-wide max-w-md mx-auto transition-colors duration-300">
          Use as setas laterais, clique nos lados ou use o teclado (← / →) para folhear nossa linda história.
        </p>
      </div>

      {/* Main Slider Canvas with Framed Polaroid Container */}
      <div className="relative flex flex-col items-center overflow-visible">
        
        {/* Navigation Buttons container */}
        <div className="relative w-full aspect-[4/3.3] sm:aspect-[16/10.5] md:h-[530px] flex items-center justify-center overflow-visible">
          
          {/* Animated slide container */}
          <div className="absolute inset-0 flex items-center justify-center p-2 sm:p-4 overflow-visible">
            {[-4, -3, -2, -1, 0, 1, 2, 3, 4].map((offset) => {
              const targetIndex = (index + offset + TOTAL_PHOTOS_LIMIT) % TOTAL_PHOTOS_LIMIT;
              const photoData = SLIDER_IMAGES[targetIndex % SLIDER_IMAGES.length];
              const isCenter = offset === 0;

              return (
                <motion.div
                  key={targetIndex}
                  style={{
                    zIndex: isCenter ? 20 : 15 - Math.abs(offset),
                    pointerEvents: Math.abs(offset) <= 1 ? "auto" : "none",
                  }}
                  animate={getCardStyles(offset)}
                  transition={{
                    type: "spring",
                    stiffness: 280,
                    damping: 28,
                  }}
                  onClick={() => {
                    if (offset < 0) handlePrev();
                    if (offset > 0) handleNext();
                  }}
                  className={`absolute w-[82%] sm:w-[75%] md:w-[68%] max-w-[620px] bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 p-4 sm:p-6 rounded-3xl shadow-[0_15px_45px_rgba(28,26,23,0.06)] dark:shadow-[0_15px_45px_rgba(0,0,0,0.4)] flex flex-col justify-between h-[95%] sm:h-full group/card select-none transition-all duration-300 ${
                    isCenter ? "shadow-[0_25px_50px_rgba(28,26,23,0.12)] dark:shadow-[0_25px_50px_rgba(0,0,0,0.5)]" : "cursor-pointer hover:shadow-lg"
                  }`}
                >
                  {/* Polaroid Image Area */}
                  <div className="relative w-full flex-grow rounded-2xl overflow-hidden bg-stone-950 aspect-[4/3] sm:aspect-video">
                    <motion.img
                      src={photoData.url}
                      alt={photoData.caption}
                      className="absolute inset-0 w-full h-full object-contain bg-[#0c0b0a]"
                      whileHover={isCenter ? { scale: 1.04 } : {}}
                      transition={{ duration: 0.6 }}
                    />
                    
                    {/* Subtle Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                    {/* Top-right sparkle */}
                    <div className={`absolute top-4 right-4 z-10 transition-opacity duration-300 ${isCenter ? "opacity-100" : "opacity-0"}`}>
                      <span className="flex items-center justify-center bg-white/90 dark:bg-stone-950/90 backdrop-blur-md text-[#C49A6C] p-1.5 rounded-full shadow-sm">
                        <Sparkles className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>

                  {/* Caption Description Footer */}
                  <div className="pt-3 sm:pt-4 pb-1 sm:pb-2 text-center flex flex-col items-center justify-center min-h-[75px] sm:min-h-[90px]">
                    <div className={`transition-all duration-300 ${isCenter ? "opacity-100 scale-100" : "opacity-0 scale-95 h-0 overflow-hidden"}`}>
                      <p className="font-serif text-sm sm:text-base md:text-lg font-bold text-stone-900 dark:text-stone-100 leading-snug tracking-tight max-w-[90%] mx-auto transition-colors duration-300">
                        "{photoData.caption}"
                      </p>
                      
                      {/* Visual Counter badge */}
                      <div className="mt-2 sm:mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D9383A]/5 border border-[#D9383A]/15 text-[#D9383A] text-[10px] font-mono tracking-wider font-extrabold uppercase">
                        Foto {targetIndex + 1} de {TOTAL_PHOTOS_LIMIT}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            id="slider-prev-btn"
            className="absolute left-2 sm:left-4 md:left-8 z-30 w-11 h-11 rounded-full flex items-center justify-center bg-white/95 dark:bg-stone-900/95 border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 hover:text-[#D9383A] hover:border-[#D9383A] hover:bg-white dark:hover:bg-stone-800 shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
            aria-label="Foto Anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            id="slider-next-btn"
            className="absolute right-2 sm:right-4 md:right-8 z-30 w-11 h-11 rounded-full flex items-center justify-center bg-white/95 dark:bg-stone-900/95 border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 hover:text-[#D9383A] hover:border-[#D9383A] hover:bg-white dark:hover:bg-stone-800 shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
            aria-label="Próxima Foto"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Thumbnail Slide Track Indicator dots */}
        <div className="flex items-center justify-center gap-1.5 mt-4">
          {Array.from({ length: Math.min(12, SLIDER_IMAGES.length) }).map((_, i) => {
            const isActive = (index % SLIDER_IMAGES.length) === i;
            return (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > (index % SLIDER_IMAGES.length) ? 1 : -1);
                  setIndex(i);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  isActive ? 'w-6 bg-[#D9383A]' : 'w-1.5 bg-stone-300 dark:bg-stone-700 hover:bg-stone-400 dark:hover:bg-stone-500'
                }`}
              />
            );
          })}
          {TOTAL_PHOTOS_LIMIT > SLIDER_IMAGES.length && (
            <span className="text-[9px] text-stone-400 dark:text-stone-500 font-mono font-bold ml-1">
              +{(TOTAL_PHOTOS_LIMIT - SLIDER_IMAGES.length).toString()} momentos
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
