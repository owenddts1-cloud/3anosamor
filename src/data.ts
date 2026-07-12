import { MemoryItem, LoveChapter, AppSettings } from './types';
import { GALLERY_IMAGES } from './galleryData';

// Dynamic image helper to assign actual user photos as fallbacks
const getMedia = (index: number) => {
  if (GALLERY_IMAGES && GALLERY_IMAGES.length > index) {
    return GALLERY_IMAGES[index];
  }
  return `/images/foto${index + 1}.jpg`;
};

export const defaultSettings: AppSettings = {
  coupleName1: "Guilherme Lanucci",
  coupleName2: "Ludmila Cristine",
  anniversaryDate: "12 de Julho de 2023",
  anniversaryDateString: "2023-07-12",
  primaryColor: "#0B0A09", // Deep Charcoal
  accentColor: "#C49A6C",  // Warm Gold/Champagne
  bgTrackUrl: "/audios/Goo Goo Dolls - Iris ... (Acoustic).mp3" // Acoustic track from local public folder
};

export const defaultMemories: MemoryItem[] = [
  {
    id: "m1",
    title: "O Começo de Tudo!!!",
    date: "12 de Julho de 2023",
    location: "Te amar é Arte!",
    description: "Aquele primeiro olhar onde o tempo pareceu desacelerar por alguns segundos. Ali, no meio de conversas bobas e risadas tímidas, eu já sentia que o meu coração tinha encontrado o lar dele. O início da nossa jornada mais linda.",
    mediaUrl: "/images/amor/00459C1D-9FFC-48AE-B7D2-E0E321A8274E.JPG",
    mediaType: "image",
    rotation: -3,
    speed: 0.05
  },
  {
    id: "m2",
    title: "'Eu Te Amo' Ludmila!",
    date: "24 de Setembro de 2023",
    location: "Te amar é Vida!",
    description: "Sob um céu repleto de estrelas e as luzes da cidade cintilando lá embaixo. O momento em que o sentimento transbordou do peito e virou palavra. Um sussurro carregado de certezas que mudou o rumo das nossas vidas para sempre.",
    mediaUrl: "/images/amor/01A4DC43-DE45-4667-937E-5AB8070AB74D.JPG",
    mediaType: "image",
    rotation: 2,
    speed: -0.05
  },
  {
    id: "m3",
    title: "Nossa Primeira Viagem",
    date: "22 de Dezembro de 2024",
    location: "Caldas Novas",
    description: "A estrada fria, o aquecedor do carro no máximo e a sua risada doce preenchendo todo o espaço. Cada curva na neblina nos aproximava ainda mais do nosso próprio destino. Descobrir o mundo ao seu lado é minha aventura favorita.",
    mediaUrl: "/images/amor/020ED06E-81E8-4CD6-A9DD-24016B84B90A.JPG",
    mediaType: "image",
    rotation: -1,
    speed: 0.08
  },
  {
    id: "m4",
    title: "Nosso Dia 12 S2!",
    date: "08 de Junho de 2024",
    location: "Via Colonial",
    description: "Cozinhar juntos numa tarde de chuva, errar a receita de propósito, rir até faltar o ar e ver um filme clichê sob a mesma coberta. Percebi ali que o amor de verdade mora nos detalhes mais simples do dia a dia com você.",
    mediaUrl: "/images/amor/093A5780-4534-4D1E-AD36-E0484700DB0C.JPG",
    mediaType: "image",
    rotation: 4,
    speed: -0.15
  },
  {
    id: "m5",
    title: "Dois Anos de Nós",
    date: "12 de Julho de 2025",
    location: "No meu Coração!",
    description: "Dois anos inteiros de cumplicidade, carinho, apoio mútuo e amadurecimento. Olhar para você e ver que nossa sintonia só aumenta é a maior prova de que fomos feitos para somar. Uma noite inesquecível de celebração.",
    mediaUrl: "/images/amor/0BC253A8-635A-4A00-8258-02A2410DB922.JPG",
    mediaType: "image",
    rotation: -2,
    speed: 0.1
  },
  {
    id: "m6",
    title: "Três Anos e uma Vida Inteira",
    date: "Hoje, 12 de Julho de 2026",
    location: "O Infinito",
    description: "Três anos de namoro. 1095 dias escolhendo amar você a cada amanhecer. Sinto um orgulho imenso de tudo o que superamos e construímos até aqui. Quando olho para o futuro, só vejo você. Feliz aniversário de namoro, meu amor.",
    mediaUrl: "/images/amor/0D6EFD0B-9B48-4B98-8D0A-B856ED3332D9.JPG",
    mediaType: "image",
    rotation: 1,
    speed: 0.05
  }
];

export const defaultChapters: LoveChapter[] = [
  {
    id: "c1",
    title: "A Descoberta",
    subtitle: "O Encontro de Almas",
    content: "Quando duas órbitas distintas finalmente se cruzam, a gravidade se encarrega de criar um novo centro de gravidade. Com a Ludmila, foi como se todas as peças confusas do quebra-cabeça da vida fizessem sentido instantaneamente. Não foi pressa, foi apenas o reconhecimento de um porto seguro.",
    quote: "\"E de repente, todas as canções de amor começaram a fazer sentido por sua causa.\""
  },
  {
    id: "c2",
    title: "A Construção",
    subtitle: "A Força da Cumplicidade",
    content: "O amor verdadeiro não é apenas contemplação; é construção diária. Ao longo desses três anos, aprendemos a ler os olhares um do outro, a acolher os dias difíceis com um abraço quente e a comemorar as pequenas vitórias como se fossem mundiais. O nosso elo se tornou uma fortaleza inabalável.",
    quote: "\"Amar não é olhar um para o outro, é olhar juntos na mesma direção.\""
  },
  {
    id: "c3",
    title: "O Infinito",
    subtitle: "O Futuro que nos Aguarda",
    content: "Chegar aos três anos é apenas o primeiro capítulo de um livro infinito que estamos escrevendo. Cada plano traçado, cada viagem sonhada e cada amanhecer que compartilhamos reforça a certeza de que a vida é infinitamente mais bonita porque você está nela.",
    quote: "\"Eu escolheria você. Em cem vidas, em cem mundos, em qualquer versão da realidade, eu escolheria você.\""
  }
];
