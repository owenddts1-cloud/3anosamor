import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { MapPin, Heart, X, Sparkles } from 'lucide-react';
import { MemoryItem, LoveChapter } from '../types';

interface PipelineTimelineProps {
  memories: MemoryItem[];
  chapters: LoveChapter[];
}

export default function PipelineTimeline({ memories, chapters }: PipelineTimelineProps) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [selectedMemory, setSelectedMemory] = useState<MemoryItem | null>(null);

  // Monitor timeline overall scroll
  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end end"]
  });

  // Soft gold line drawing growth rate
  const lineScaleY = useSpring(
    useTransform(timelineProgress, [0.05, 0.95], [0, 1]),
    { stiffness: 60, damping: 20 }
  );

  return (
    <div
      ref={timelineRef}
      id="timeline-section-root"
      className="relative min-h-screen bg-[#F4EDE4] dark:bg-[#0B0A09] pt-24 pb-36 px-4 md:px-8 select-none z-10 overflow-hidden transition-colors duration-500"
    >
      {/* Decorative Warm Light Flares */}
      <div className="absolute top-[10%] left-[-15%] w-[45vw] h-[45vw] rounded-full bg-[#C49A6C]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-15%] w-[50vw] h-[50vw] rounded-full bg-[#E5A995]/4 blur-[130px] pointer-events-none" />

      {/* Main Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C49A6C]/15 border border-[#C49A6C]/30 text-[#C49A6C] text-[10px] font-mono uppercase tracking-widest mb-4 font-bold"
        >
          <Sparkles className="w-3 h-3 text-[#D9383A] animate-pulse" />
          <span>A Esteira de Memórias</span>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl font-extrabold text-stone-950 dark:text-stone-50 tracking-tight transition-colors duration-300"
        >
          Nossa <span className="text-[#C49A6C] italic font-extrabold">Pipeline</span> de Amor
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-4 text-xs sm:text-sm text-stone-700 dark:text-stone-300 font-mono tracking-wide max-w-lg mx-auto leading-relaxed font-semibold transition-colors duration-300"
        >
          Role a página para desenhar o filamento da nossa história. Cada ponto é um marco eterno de afeto, risadas e cumplicidade.
        </motion.p>
      </div>

      {/* Chapters Grid (A Descoberta, etc.) */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-44 relative z-20">
        {chapters.map((chap, idx) => (
          <motion.div
            key={chap.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: idx * 0.15 }}
            className="flex flex-col justify-between p-6 rounded-2xl bg-white/85 dark:bg-stone-900/85 border border-stone-200 dark:border-stone-850 backdrop-blur-md shadow-[0_12px_40px_rgba(28,26,23,0.05)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.3)] hover:border-[#C49A6C]/50 transition-all duration-300 group"
          >
            <div>
              <div className="text-[#C49A6C] font-mono text-xs font-extrabold uppercase tracking-widest mb-3">
                CAPÍTULO 0{idx + 1}
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-extrabold text-stone-950 dark:text-stone-50 mb-1 group-hover:text-[#D9383A] transition-colors leading-tight">
                {chap.title}
              </h3>
              <div className="text-[10px] text-[#E5A995] font-mono uppercase tracking-wider mb-4 font-bold">
                {chap.subtitle}
              </div>
              <p className="text-stone-800 dark:text-stone-200 font-sans text-xs sm:text-sm leading-relaxed mb-6 font-medium transition-colors duration-300">
                {chap.content}
              </p>
            </div>
            <div className="font-serif italic text-stone-700 dark:text-stone-400 text-xs pl-3 border-l-2 border-[#C49A6C]/40 font-semibold transition-colors duration-300">
              {chap.quote}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Timeline Draw Path container */}
      <div className="relative max-w-5xl mx-auto mt-20">
        
        {/* Central Pipeline Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-stone-200 dark:bg-stone-800 transform -translate-x-1/2 pointer-events-none transition-colors" />
        <motion.div
          style={{ scaleY: lineScaleY }}
          className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#C49A6C] via-[#E5A995] to-[#D9383A] origin-top transform -translate-x-1/2 shadow-[0_0_8px_rgba(196,154,108,0.3)] pointer-events-none"
        />

        {/* Floating memories */}
        <div className="space-y-36 relative z-10">
          {memories.map((item, index) => {
            const isLeft = index % 2 === 0;
            return (
              <TimelineCard
                key={item.id}
                item={item}
                isLeft={isLeft}
                onSelect={setSelectedMemory}
                index={index}
              />
            );
          })}
        </div>
      </div>

      {/* Layout Shared Transition Modal */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-stone-950/40 backdrop-blur-xl select-none"
          >
            {/* Modal Container */}
            <motion.div
              layoutId={`card-container-${selectedMemory.id}`}
              className="relative w-full max-w-4xl bg-[#FDFBF7] dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 rounded-3xl overflow-hidden shadow-[0_30px_90px_rgba(28,26,23,0.18)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.5)] grid grid-cols-1 md:grid-cols-2 transition-colors duration-300"
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMemory(null)}
                id="close-modal-btn"
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full flex items-center justify-center bg-white/90 dark:bg-stone-900/90 border border-stone-200 dark:border-stone-800 text-stone-500 dark:text-stone-400 hover:text-[#D9383A] hover:border-[#D9383A] transition-all cursor-pointer active:scale-95"
              >
                <X className="w-4 h-4" />
              </button>

              {/* HD Image Visual */}
              <div className="relative h-64 md:h-full min-h-[300px]">
                <motion.div
                  layoutId={`card-image-${selectedMemory.id}`}
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${selectedMemory.mediaUrl}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#FDFBF7] dark:from-stone-900 via-[#FDFBF7]/10 dark:via-stone-900/10 to-[#FDFBF7]/30 dark:to-stone-900/30" />
                
                {/* Float coordinates/meta on image */}
                <div className="absolute bottom-6 left-6 z-10">
                  <span className="flex items-center gap-1 bg-white/90 dark:bg-stone-900/90 border border-[#C49A6C]/30 backdrop-blur-md text-[#C49A6C] text-[9px] px-2.5 py-0.5 rounded-full font-mono uppercase tracking-widest leading-none mb-1">
                    {selectedMemory.date}
                  </span>
                </div>
              </div>

              {/* Love Letter Side */}
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <span className="text-[#C49A6C] font-mono text-[10px] uppercase tracking-widest mb-1.5 flex items-center gap-1.5 font-bold">
                    <Heart className="w-3 h-3 fill-current text-[#D9383A]" /> Nosso Momento
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3.5xl font-extrabold text-stone-950 dark:text-stone-50 mb-1 leading-tight transition-colors duration-300">
                    {selectedMemory.title}
                  </h3>
                  
                  <div className="flex items-center gap-1 text-[#E5A995] font-mono text-[10px] uppercase tracking-wider mb-6 font-semibold">
                    <MapPin className="w-3 h-3 text-[#E5A995]" />
                    <span>{selectedMemory.location}</span>
                  </div>
 
                  <p className="text-stone-800 dark:text-stone-200 font-sans text-xs sm:text-sm leading-relaxed mb-6 whitespace-pre-line border-l-2 border-[#C49A6C]/35 pl-4 font-normal transition-colors duration-300">
                    {selectedMemory.description}
                  </p>

                  <div className="pt-6 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-[10px] font-mono text-stone-500 dark:text-stone-400 font-bold transition-colors duration-300">
                    <span>REGISTRO HISTÓRICO</span>
                    <span className="text-[#C49A6C]">PARTE DE NÓS</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------ Internally Extracted Card Sub-Component ------------------ */

interface TimelineCardProps {
  key?: string;
  item: MemoryItem;
  isLeft: boolean;
  onSelect: (item: MemoryItem) => void;
  index: number;
}

const ROMANTIC_WORDS = [
  "SINTONIA",
  "SENTIMENTO",
  "AVENTURA",
  "COTIDIANO",
  "CUMPLICIDADE",
  "ETERNIDADE"
];

const ROMANTIC_SUBTITLES = [
  "O COMEÇO DE TUDO",
  "NOSSO PRIMEIRO 'EU TE AMO'",
  "DESCOBRIR O MUNDO COM VOCÊ",
  "OS PEQUENOS DETALHES DIÁRIOS",
  "DOIS ANOS DE NÓS",
  "PARA TODO O SEMPRE"
];

function TimelineCard({ item, isLeft, onSelect, index }: TimelineCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Measure card position relative to viewport
  const { scrollYProgress: cardScroll } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // Calculate real-time asymmetrical vertical paralaxe drift based on speed config
  const yOffset = useTransform(cardScroll, [0, 1], [item.speed * 180, -item.speed * 180]);

  // Transform functions for the big, beautiful, scroll-focused words next to each card
  const wordOpacity = useTransform(cardScroll, [0, 0.25, 0.5, 0.75, 1], [0.03, 0.22, 0.58, 0.22, 0.03]);
  const wordBlur = useTransform(cardScroll, [0, 0.25, 0.5, 0.75, 1], ["blur(14px)", "blur(4px)", "blur(0px)", "blur(4px)", "blur(14px)"]);
  const wordScale = useTransform(cardScroll, [0, 0.5, 1], [0.85, 1.15, 0.85]);
  const wordY = useTransform(cardScroll, [0, 1], [item.speed * -100, item.speed * 100]);

  return (
    <div
      ref={cardRef}
      className={`relative w-full flex items-center ${isLeft ? 'justify-start' : 'justify-end'} md:px-12`}
    >
      {/* Large Floating Animated Word Beside the Photo Card (Focusing & Defocusing) */}
      <motion.div
        style={{
          opacity: wordOpacity,
          filter: wordBlur,
          scale: wordScale,
          y: wordY
        }}
        className={`absolute ${
          isLeft ? 'left-1/2 ml-4 md:ml-12 lg:ml-20 text-left' : 'right-1/2 mr-4 md:mr-12 lg:mr-20 text-right'
        } top-1/2 -translate-y-1/2 pointer-events-none select-none z-0`}
      >
        <span className="font-serif italic font-extrabold tracking-[0.2em] text-stone-950 dark:text-stone-100 text-3xl sm:text-5xl md:text-6xl lg:text-[5.5rem] leading-none block select-none transition-colors duration-300">
          {ROMANTIC_WORDS[index % ROMANTIC_WORDS.length]}
        </span>
        <span className="font-mono text-[9px] sm:text-xs tracking-[0.3em] text-stone-900 dark:text-stone-400 mt-1 sm:mt-2 block font-extrabold select-none transition-colors duration-300">
          {ROMANTIC_SUBTITLES[index % ROMANTIC_SUBTITLES.length]}
        </span>
      </motion.div>

      {/* Central Pipeline Node (Glows when scroll intersects) */}
      <motion.div
        className="absolute left-1/2 w-4 h-4 rounded-full border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 flex items-center justify-center z-20 pointer-events-none transform -translate-x-1/2 shadow-md"
        whileInView={{
          borderColor: '#D9383A',
          backgroundColor: '#D9383A',
          boxShadow: '0 0 15px rgba(217,56,58,0.5)',
          scale: [1, 1.3, 1]
        }}
        viewport={{ once: false, margin: "-45% 0px -45% 0px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-white" />
      </motion.div>

      {/* Paralaxe Polaroid Card */}
      <motion.div
        style={{ y: yOffset }}
        className="w-full md:w-[44%] pr-2 md:pr-0 relative z-10"
      >
        <motion.div
          layoutId={`card-container-${item.id}`}
          onClick={() => onSelect(item)}
          data-cursor-text="Ver Carta"
          className="timeline-card-anchor relative block rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4.5 cursor-pointer shadow-[0_12px_35px_rgba(28,26,23,0.04)] dark:shadow-[0_12px_35px_rgba(0,0,0,0.3)] group hover:border-[#C49A6C] transition-all duration-500"
          data-card-id={item.id}
          style={{
            rotate: item.rotation,
          }}
          whileHover={{
            y: -8,
            scale: 1.015,
            rotate: item.rotation * 0.4,
            boxShadow: '0 18px 45px rgba(28,26,23,0.08)',
          }}
        >
          {/* Polaroid Image */}
          <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-stone-100 dark:bg-stone-950 mb-4 shadow-inner">
            <motion.div
              layoutId={`card-image-${item.id}`}
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url('${item.mediaUrl}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent opacity-60 pointer-events-none" />
            
            {/* Quick date ribbon */}
            <div className="absolute top-3 left-3 bg-white/90 dark:bg-stone-900/90 border border-[#C49A6C]/30 text-[#C49A6C] text-[8px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold">
              {item.date}
            </div>
          </div>

          {/* Card Typo */}
          <div className="px-1 text-left">
            <div className="flex items-center gap-1 text-stone-500 dark:text-stone-400 font-mono text-[9px] uppercase tracking-wider mb-1 font-bold transition-colors">
              <MapPin className="w-3 h-3 text-[#E5A995]" />
              <span>{item.location}</span>
            </div>
            <h4 className="font-serif text-xl sm:text-2xl font-extrabold text-stone-950 dark:text-stone-50 group-hover:text-[#D9383A] transition-colors leading-tight">
              {item.title}
            </h4>
            <p className="text-stone-700 dark:text-stone-300 text-xs font-sans mt-2 line-clamp-2 leading-relaxed font-normal transition-colors duration-300">
              {item.description}
            </p>
            <div className="mt-4 pt-3.5 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-[8px] font-mono text-stone-400 dark:text-stone-500 font-bold transition-colors duration-300">
              <span className="flex items-center gap-1 group-hover:text-[#D9383A] transition-colors">
                LER CARTA DE AMOR <span className="text-[#C49A6C] group-hover:translate-x-1 transition-transform inline-block">→</span>
              </span>
              <span>PARTE 0{item.id.replace('m', '')}</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
