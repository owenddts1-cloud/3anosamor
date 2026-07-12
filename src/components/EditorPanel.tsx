import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, X, RotateCcw, Plus, Trash2, Heart, Edit3, Sun, Moon } from 'lucide-react';
import { MemoryItem, LoveChapter, AppSettings } from '../types';

interface EditorPanelProps {
  settings: AppSettings;
  setSettings: (settings: AppSettings) => void;
  memories: MemoryItem[];
  setMemories: (memories: MemoryItem[]) => void;
  chapters: LoveChapter[];
  setChapters: (chapters: LoveChapter[]) => void;
  onReset: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export default function EditorPanel({
  settings,
  setSettings,
  memories,
  setMemories,
  chapters,
  setChapters,
  onReset,
  isDarkMode,
  toggleTheme
}: EditorPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'geral' | 'memorias' | 'capitulos'>('geral');

  // Modify overall general settings
  const handleSettingChange = (key: keyof AppSettings, value: string) => {
    setSettings({ ...settings, [key]: value });
  };

  // Modify specific memory card
  const handleMemoryChange = (id: string, key: keyof MemoryItem, value: any) => {
    const updated = memories.map((m) => (m.id === id ? { ...m, [key]: value } : m));
    setMemories(updated);
  };

  // Modify specific love chapter
  const handleChapterChange = (id: string, key: keyof LoveChapter, value: string) => {
    const updated = chapters.map((c) => (c.id === id ? { ...c, [key]: value } : c));
    setChapters(updated);
  };

  // Delete a specific memory card
  const deleteMemory = (id: string) => {
    const filtered = memories.filter((m) => m.id !== id);
    setMemories(filtered);
  };

  // Add a brand new memory card
  const addNewMemory = () => {
    const newId = `m${Date.now()}`;
    const newCard: MemoryItem = {
      id: newId,
      title: "Novo Momento Mágico",
      date: "Hoje",
      location: "Algum lugar do world",
      description: "Escreva aqui uma linda recordação que vocês guardam com muito carinho.",
      mediaUrl: "/images/foto1.jpg", // Local image placeholder
      mediaType: "image",
      rotation: Math.random() * 6 - 3,
      speed: Math.random() * 0.2 + 0.05
    };
    setMemories([...memories, newCard]);
  };

  return (
    <>
      {/* Floating Action Buttons */}
      <div className="fixed top-6 right-6 z-[95] flex items-center gap-3" id="settings-trigger-wrapper">
        {/* Dark Mode Toggle Button */}
        <motion.button
          onClick={toggleTheme}
          id="toggle-dark-mode-btn"
          className="flex items-center justify-center w-11 h-11 rounded-full bg-white/95 dark:bg-stone-900/95 border border-stone-200 dark:border-stone-800 text-[#C49A6C] dark:text-[#C49A6C] hover:text-[#D9383A] dark:hover:text-[#D9383A] shadow-lg backdrop-blur-md cursor-pointer transition-all active:scale-95"
          whileHover={{ scale: 1.1 }}
          title={isDarkMode ? "Modo Claro" : "Modo Escuro"}
        >
          {isDarkMode ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5" />}
        </motion.button>

        {/* Gear Settings Button */}
        <motion.button
          onClick={() => setIsOpen(true)}
          id="toggle-settings-btn"
          className="flex items-center justify-center w-11 h-11 rounded-full bg-white/95 dark:bg-stone-900/95 border border-stone-200 dark:border-stone-800 text-[#C49A6C] dark:text-[#C49A6C] hover:text-[#D9383A] dark:hover:text-[#D9383A] shadow-lg backdrop-blur-md cursor-pointer transition-all active:scale-95"
          whileHover={{ rotate: 15 }}
          title="Configurações da Galeria"
        >
          <Settings className="w-5 h-5" />
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-stone-900/15 backdrop-blur-xs z-[98]"
            />

            {/* Editing Sliding Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#FDFBF7] border-l border-stone-200/80 shadow-2xl z-[99] flex flex-col text-stone-800 select-none"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-stone-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-[#C49A6C]" />
                  <h3 className="font-serif text-lg font-medium text-stone-900">Ateliê do Romance</h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  id="close-drawer-btn"
                  className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center text-stone-400 hover:text-stone-800 cursor-pointer active:scale-95 bg-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Tabs */}
              <div className="flex border-b border-stone-200 text-xs font-mono">
                <button
                  onClick={() => setActiveTab('geral')}
                  className={`flex-1 py-3 text-center border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'geral' ? 'border-[#C49A6C] text-[#C49A6C] font-semibold' : 'border-transparent text-stone-400 hover:text-stone-600'
                  }`}
                >
                  CONFIGURAÇÕES
                </button>
                <button
                  onClick={() => setActiveTab('memorias')}
                  className={`flex-1 py-3 text-center border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'memorias' ? 'border-[#C49A6C] text-[#C49A6C] font-semibold' : 'border-transparent text-stone-400 hover:text-stone-600'
                  }`}
                >
                  MEMÓRIAS ({memories.length})
                </button>
                <button
                  onClick={() => setActiveTab('capitulos')}
                  className={`flex-1 py-3 text-center border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'capitulos' ? 'border-[#C49A6C] text-[#C49A6C] font-semibold' : 'border-transparent text-stone-400 hover:text-stone-600'
                  }`}
                >
                  CAPÍTULOS
                </button>
              </div>

              {/* Sliding Form Elements Scroll Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {activeTab === 'geral' && (
                  <div className="space-y-4 text-xs font-mono">
                    <div className="space-y-1.5">
                      <label className="text-stone-500 font-medium">Nome Dele (Você)</label>
                      <input
                        type="text"
                        value={settings.coupleName1}
                        onChange={(e) => handleSettingChange('coupleName1', e.target.value)}
                        className="w-full bg-white border border-stone-200 rounded-lg p-2.5 text-stone-800 focus:outline-none focus:border-[#C49A6C] shadow-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-stone-500 font-medium">Nome Dela (Sua Namorada)</label>
                      <input
                        type="text"
                        value={settings.coupleName2}
                        onChange={(e) => handleSettingChange('coupleName2', e.target.value)}
                        className="w-full bg-white border border-stone-200 rounded-lg p-2.5 text-stone-800 focus:outline-none focus:border-[#C49A6C] shadow-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-stone-500 font-medium">Data de Início do Namoro</label>
                      <input
                        type="text"
                        value={settings.anniversaryDate}
                        onChange={(e) => handleSettingChange('anniversaryDate', e.target.value)}
                        className="w-full bg-white border border-stone-200 rounded-lg p-2.5 text-stone-800 focus:outline-none focus:border-[#C49A6C] shadow-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-stone-500 font-medium">URL da Música Ambiente (MP3/MP4)</label>
                      <input
                        type="text"
                        value={settings.bgTrackUrl}
                        onChange={(e) => handleSettingChange('bgTrackUrl', e.target.value)}
                        className="w-full bg-white border border-stone-200 rounded-lg p-2.5 text-stone-800 focus:outline-none focus:border-[#C49A6C] shadow-sm"
                        placeholder="Ex: /music.mp3"
                      />
                      <span className="block text-[10px] text-stone-400 font-sans leading-tight mt-1">
                        <strong>Dica:</strong> Para máxima estabilidade, salve a música na pasta <code className="bg-stone-100 p-0.5 rounded text-[#D9383A]">public/</code> com o nome <code className="bg-stone-100 p-0.5 rounded">music.mp3</code> ou <code className="bg-stone-100 p-0.5 rounded">music.mp4</code> e mude este campo para <code className="text-[#C49A6C]">/music.mp3</code> ou <code className="text-[#C49A6C]">/music.mp4</code>. URLs do YouTube não funcionam.
                      </span>
                    </div>

                    <div className="pt-6 border-t border-stone-200">
                      <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#C49A6C]/15 text-stone-500 leading-relaxed font-sans text-[11px] flex gap-2 shadow-sm">
                        <Heart className="w-4 h-4 text-[#D9383A] shrink-0 mt-0.5 fill-current" />
                        <div>
                          <strong className="text-stone-700">Dica Romântica:</strong> Você pode usar qualquer URL direta de imagem do Unsplash ou de arquivos locais hospedados na internet para preencher os momentos e mudar as fotos!
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'memorias' && (
                  <div className="space-y-6">
                    {memories.map((m, mIdx) => (
                      <div
                        key={m.id}
                        className="p-4 rounded-xl bg-[#FAF7F2] border border-stone-200 space-y-3 font-mono text-[11px] shadow-sm"
                      >
                        <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                          <span className="text-[#C49A6C] font-bold">MOMENTO #0{mIdx + 1}</span>
                          <button
                            onClick={() => deleteMemory(m.id)}
                            className="text-stone-400 hover:text-[#D9383A] transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="space-y-1">
                          <label className="text-stone-400 font-medium">Título do Momento</label>
                          <input
                            type="text"
                            value={m.title}
                            onChange={(e) => handleMemoryChange(m.id, 'title', e.target.value)}
                            className="w-full bg-white border border-stone-200 rounded p-2 text-stone-800 focus:outline-none focus:border-[#C49A6C]"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label className="text-stone-400 font-medium">Data</label>
                            <input
                              type="text"
                              value={m.date}
                              onChange={(e) => handleMemoryChange(m.id, 'date', e.target.value)}
                              className="w-full bg-white border border-stone-200 rounded p-2 text-stone-800 focus:outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-stone-400 font-medium">Localização</label>
                            <input
                              type="text"
                              value={m.location}
                              onChange={(e) => handleMemoryChange(m.id, 'location', e.target.value)}
                              className="w-full bg-white border border-stone-200 rounded p-2 text-stone-800 focus:outline-none"
                            />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-stone-400 font-medium">URL da Imagem / Vídeo</label>
                          <input
                            type="text"
                            value={m.mediaUrl}
                            onChange={(e) => handleMemoryChange(m.id, 'mediaUrl', e.target.value)}
                            className="w-full bg-white border border-stone-200 rounded p-2 text-stone-800 focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-stone-400 font-medium">Nossa Lembrança (Carta de Amor)</label>
                          <textarea
                            value={m.description}
                            rows={3}
                            onChange={(e) => handleMemoryChange(m.id, 'description', e.target.value)}
                            className="w-full bg-white border border-stone-200 rounded p-2 text-stone-800 focus:outline-none leading-relaxed font-sans"
                          />
                        </div>
                      </div>
                    ))}

                    <button
                      onClick={addNewMemory}
                      className="w-full py-3 rounded-xl border border-dashed border-[#C49A6C]/40 hover:border-[#C49A6C] text-[#C49A6C] hover:text-[#D9383A] flex items-center justify-center gap-2 text-xs font-mono cursor-pointer transition-colors bg-white shadow-sm"
                    >
                      <Plus className="w-4 h-4" /> ADICIONAR NOVO MOMENTO
                    </button>
                  </div>
                )}

                {activeTab === 'capitulos' && (
                  <div className="space-y-6">
                    {chapters.map((c, cIdx) => (
                      <div
                        key={c.id}
                        className="p-4 rounded-xl bg-[#FAF7F2] border border-stone-200 space-y-3 font-mono text-[11px] shadow-sm"
                      >
                        <span className="text-[#C49A6C] font-bold block pb-2 border-b border-stone-200">
                          CAPÍTULO 0{cIdx + 1}
                        </span>
                        <div className="space-y-1">
                          <label className="text-stone-400 font-medium">Título do Capítulo</label>
                          <input
                            type="text"
                            value={c.title}
                            onChange={(e) => handleChapterChange(c.id, 'title', e.target.value)}
                            className="w-full bg-white border border-stone-200 rounded p-2 text-stone-800 focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-stone-400 font-medium">Subtítulo</label>
                          <input
                            type="text"
                            value={c.subtitle}
                            onChange={(e) => handleChapterChange(c.id, 'subtitle', e.target.value)}
                            className="w-full bg-white border border-stone-200 rounded p-2 text-stone-800"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-stone-400 font-medium">Narrativa</label>
                          <textarea
                            value={c.content}
                            rows={4}
                            onChange={(e) => handleChapterChange(c.id, 'content', e.target.value)}
                            className="w-full bg-white border border-stone-200 rounded p-2 text-stone-800 leading-relaxed font-sans"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-stone-400 font-medium">Frase de Destaque / Citação</label>
                          <input
                            type="text"
                            value={c.quote}
                            onChange={(e) => handleChapterChange(c.id, 'quote', e.target.value)}
                            className="w-full bg-white border border-stone-200 rounded p-2 text-stone-800 italic font-serif text-[11px]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Reset to Original Curated Defaults button */}
              <div className="p-6 border-t border-stone-200 bg-[#FAF7F2]">
                <button
                  onClick={onReset}
                  className="w-full py-2.5 rounded-xl bg-white border border-stone-200 text-stone-500 hover:text-[#D9383A] flex items-center justify-center gap-2 text-xs font-mono cursor-pointer transition-colors shadow-sm"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> RESETAR ORIGINAIS
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
