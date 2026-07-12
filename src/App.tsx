import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, MapPin, Calendar, Compass } from 'lucide-react';
import { defaultSettings, defaultMemories, defaultChapters } from './data';
import { AppSettings, MemoryItem, LoveChapter } from './types';
import { GALLERY_IMAGES } from './galleryData';

// Component Imports
import CanvasParticles from './components/CanvasParticles';
import CustomCursor from './components/CustomCursor';
import MusicPlayer from './components/MusicPlayer';
import EditorPanel from './components/EditorPanel';
import HeroSection from './components/HeroSection';
import LaptopSection from './components/LaptopSection';
import PipelineTimeline from './components/PipelineTimeline';
import LiveCountdown from './components/LiveCountdown';
import RedThreadOfFate from './components/RedThreadOfFate';
import PhotoSlider from './components/PhotoSlider';

export default function App() {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [memories, setMemories] = useState<MemoryItem[]>(defaultMemories);
  const [chapters, setChapters] = useState<LoveChapter[]>(defaultChapters);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  // Load from local storage on mount with automatic legacy data migration
  useEffect(() => {
    const savedSettings = localStorage.getItem('ludmila_anniversary_settings');
    const savedMemories = localStorage.getItem('ludmila_anniversary_memories');
    const savedChapters = localStorage.getItem('ludmila_anniversary_chapters');

    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings);
      // Auto-upgrade path to acoustic audio file
      if (!parsedSettings.bgTrackUrl || parsedSettings.bgTrackUrl.includes('googoodollsiris')) {
        parsedSettings.bgTrackUrl = "/audios/Goo Goo Dolls - Iris ...(Acoustic).mp3";
        localStorage.setItem('ludmila_anniversary_settings', JSON.stringify(parsedSettings));
      }
      setSettings(parsedSettings);
    }

    if (savedMemories) {
      const parsedMemories = JSON.parse(savedMemories);
      let hasUpdates = false;
      const upgradedMemories = parsedMemories.map((m: MemoryItem, idx: number) => {
        if (m.mediaUrl && m.mediaUrl.startsWith('/images/foto')) {
          hasUpdates = true;
          if (GALLERY_IMAGES && GALLERY_IMAGES.length > idx) {
            return { ...m, mediaUrl: GALLERY_IMAGES[idx] };
          }
        }
        return m;
      });

      if (hasUpdates) {
        localStorage.setItem('ludmila_anniversary_memories', JSON.stringify(upgradedMemories));
        setMemories(upgradedMemories);
      } else {
        setMemories(parsedMemories);
      }
    }

    if (savedChapters) setChapters(JSON.parse(savedChapters));
  }, []);

  // Set dark class on html root and sync with localStorage
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Sync state changes with localStorage
  const updateSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
    localStorage.setItem('ludmila_anniversary_settings', JSON.stringify(newSettings));
  };

  const updateMemories = (newMemories: MemoryItem[]) => {
    setMemories(newMemories);
    localStorage.setItem('ludmila_anniversary_memories', JSON.stringify(newMemories));
  };

  const updateChapters = (newChapters: LoveChapter[]) => {
    setChapters(newChapters);
    localStorage.setItem('ludmila_anniversary_chapters', JSON.stringify(newChapters));
  };

  // Reset to default curated storyboard
  const handleReset = () => {
    if (window.confirm("Deseja mesmo redefinir para os textos e fotos originais da nossa história?")) {
      localStorage.removeItem('ludmila_anniversary_settings');
      localStorage.removeItem('ludmila_anniversary_memories');
      localStorage.removeItem('ludmila_anniversary_chapters');
      setSettings(defaultSettings);
      setMemories(defaultMemories);
      setChapters(defaultChapters);
      window.location.reload();
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F4EDE4] dark:bg-[#0B0A09] text-stone-950 dark:text-stone-100 selection:bg-[#D9383A]/10 selection:text-[#D9383A] transition-colors duration-500">
      {/* 1. Custom Interactive Physics Canvas Particles (Handles gold sparkles + crimson water ink splashes) */}
      <CanvasParticles />

      {/* 1b. The Crimson Red Thread of Fate tracking card coordinates dynamically */}
      <RedThreadOfFate />

      {/* 2. Custom Spring-Damped Cursor */}
      <CustomCursor />

      {/* 3. Floating Music Controller Capsule */}
      <MusicPlayer trackUrl={settings.bgTrackUrl} />

      {/* 4. Settings Drawer / Romance Panel */}
      <EditorPanel
        settings={settings}
        setSettings={updateSettings}
        memories={memories}
        setMemories={updateMemories}
        chapters={chapters}
        setChapters={updateChapters}
        onReset={handleReset}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />

      {/* 5. Phase 1 & 2: Hero Section (Cellphone Scaling / Crossfades) */}
      <HeroSection
        memories={memories}
        coupleName1={settings.coupleName1}
        coupleName2={settings.coupleName2}
      />

      {/* 6. Laptop Cinema Section (Notebook displaying memory reel) */}
      <LaptopSection memories={memories} />

      {/* 7. Phase 3: Central SVG Pipeline Timeline (Cards and Story Narrative) */}
      <PipelineTimeline
        memories={memories}
        chapters={chapters}
      />

      {/* 8. Finale Section: Live Clock, Grand Love Letter & Sign-off */}
      <section
        id="finale-countdown-section"
        className="relative py-32 px-4 md:px-8 border-t border-stone-300/60 dark:border-stone-800 bg-[#EDE2D4] dark:bg-[#151312] overflow-hidden z-20 transition-colors duration-500"
      >
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#F4EDE4] dark:from-[#0B0A09] to-transparent pointer-events-none" />
        
        {/* Soft atmospheric radial center glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full bg-[#C49A6C]/4 blur-[140px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          
          {/* Animated Heart Centerpoint */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: [1, 1.15, 1], opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              scale: { repeat: Infinity, duration: 2, ease: "easeInOut" },
              opacity: { duration: 0.8 }
            }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#D9383A]/5 border border-[#D9383A]/25 text-[#D9383A] mb-10 shadow-[0_10px_30px_rgba(217,56,58,0.08)]"
          >
            <Heart className="w-7 h-7 fill-current text-[#D9383A]" />
          </motion.div>

          {/* Interactive Photo Slider Carousel of 406 Memories */}
          <PhotoSlider />

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-3xl sm:text-5xl font-extrabold tracking-tight text-stone-950 dark:text-stone-50 mb-4 transition-colors duration-300"
          >
            Três Anos de Nós... <br />
            <span className="text-[#C49A6C] italic font-semibold">e apenas o começo de tudo</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-stone-700 dark:text-stone-300 font-mono text-xs sm:text-sm tracking-wide max-w-lg mx-auto mb-16 leading-relaxed font-medium transition-colors duration-300"
          >
            Nossa cronologia de amor se estende além das fotos e recordações. Cada segundo é um privilégio, cada minuto é um privilégio maior. Veja o nosso tempo real decorrido:
          </motion.p>

          {/* Real-time ticker countdown */}
          <LiveCountdown startDateString={settings.anniversaryDateString} />

          {/* Letter Final Closure */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-24 p-8 sm:p-12 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-850 text-left shadow-[0_20px_50px_rgba(28,26,23,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative transition-all duration-300"
          >
            {/* Elegant visual gold frame layout inside the letter card */}
            <div className="absolute inset-4 border border-[#C49A6C]/15 rounded-2xl pointer-events-none" />
            <span className="font-serif italic text-2xl text-[#C49A6C] block mb-6 font-extrabold">Minha amada {settings.coupleName2},</span>
            
            <p className="text-stone-900 dark:text-stone-100 font-sans text-xs sm:text-sm leading-relaxed mb-6 whitespace-pre-line font-normal transition-colors duration-300">
              {`TRÊS ANOS de nós, minha Princesa! S2

Às vezes eu fico só te olhando e pensando: que linda, que linda, que linda meu Deus... Você é, de verdade, uma das melhores coisas que já aconteceu na minha vida, a mais linda de todas. Eu te amo demais, meu amor! Estar com você me dá uma certeza tão grande, você é minha luz, minha paz e meu refrigério... é o significado real e total do que é o amor pra mim. Foi com você que aprendi o que é amar de verdade, porque você é o meu primeiro amor, e vai ser o último... Vou ser pra sempre apaixonado por você e te olhar com todo o carinho do mundo, porque você merece o melhor de tudo, minha gata, minha vidaaaa...

Esses 3 anos de nós foram de muito aprendizado pra gente, né? A gente teve que consertar muitos pedaços quebrados, reatar laços, perdoar de verdade e ter uma paciência de outro mundo que a gente nem sabia que tinha. Tivemos que aprender a amar um outro no meio da dificuldade, no meio das discussões e quando as coisas pareciam meio confusas. A gente aprendeu muito a lidar com o jeito, as manias e o sentimento do outro. E o começo do nosso processo de amadurecimento tá só começando!

Quero te dizer que hoje eu estou renovando a minha vontade de ficar com você por toda a minha vida. Então isso é, realmente, é uma das escolhas mais difíceis... porque permanecer com alguém não é fácil, se adaptar e mudar por uma pessoa é bem complicado, exige muito da gente. Mas pelo carinho e pelo cuidado que Deus tem com a sua vida, eu quero continuar fazendo essa escolha todos os dias.

Quero só te reafirmar o quanto você é um presente de Deus pra mim, sério! Mesmo eu te ajudando muito, a verdade é que eu aprendo demais com você, amor... Você me inspira em tanta coisa. Quero te agradecer por cada detalhezinho que você mudou no seu jeito, primeiro por amor a Deus e depois por mim. Quando você fez isso, você transformou seu jeito totalmente e hoje eu te vejo com outros olhos, você tá com um brilho diferente... isso mudou literalmente TUDO!!

Tenho tanta gratidão por você existir, você tem me deixado muito orgulhoso de você... Você é uma companheira MARAVILHOSA, extremamente cuidadosa, uma menina trabalhadora que corre atrás dos objetivos e busca depender de Deus a cada dia mais e mais.

E eu, amor, não só te apoio em tudo como quero estar com você em todos os seus planos e projetos pro nosso futuro, tô do seu lado pra tudo mesmo! Que a gente venha a ser muito feliz pra sempre e com Deus no centro de tudo. Te amo demais, minha vida!`}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-6 border-t border-stone-100 dark:border-stone-800">
              <div className="font-mono text-[9px] text-stone-500 dark:text-stone-400 uppercase tracking-widest leading-none font-bold transition-colors duration-300">
                <span>COMEMORAÇÃO DE 3 ANOS DE NAMORO</span>
                <span className="block mt-1">12 DE JULHO DE 2026</span>
              </div>
              <div className="text-right font-serif italic text-base text-[#C49A6C] font-semibold">
                Do seu eterno namorado, <span className="font-extrabold block sm:inline not-italic font-sans text-stone-950 dark:text-stone-100 ml-1 transition-colors duration-300">{settings.coupleName1}</span>
              </div>
            </div>
          </motion.div>

          {/* Symmetrical footer label */}
          <div className="mt-32 text-[10px] text-stone-400 dark:text-stone-500 font-mono tracking-widest uppercase flex items-center justify-center gap-2 transition-colors duration-300">
            <span>FEITO COM AMOR</span>
            <span className="text-[#D9383A]">♥</span>
            <span>PARA LUDMILA</span>
          </div>
        </div>
      </section>
    </div>
  );
}
