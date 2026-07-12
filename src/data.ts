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
  coupleName1: "Owen",
  coupleName2: "Ludmila",
  anniversaryDate: "12 de Julho de 2023",
  anniversaryDateString: "2023-07-12",
  primaryColor: "#0B0A09", // Deep Charcoal
  accentColor: "#C49A6C",  // Warm Gold/Champagne
  bgTrackUrl: "https://archive.org/download/googoodollsiris/Goo%20Goo%20Dolls%20-%20Iris.mp3" // Iris by Goo Goo Dolls
};

export const defaultMemories: MemoryItem[] = [
  {
    id: "m1",
    title: "O Começo de Tudo",
    date: "12 de Julho de 2023",
    location: "Nosso Café Favorito",
    description: "Aquele primeiro olhar onde o tempo pareceu desacelerar por alguns segundos. Ali, no meio de conversas bobas e risadas tímidas, eu já sentia que o meu coração tinha encontrado o lar dele. O início da nossa jornada mais linda.",
    mediaUrl: getMedia(0), // Assign first local image dynamically
    mediaType: "image",
    rotation: -3,
    speed: 0.15
  },
  {
    id: "m2",
    title: "O Primeiro 'Eu Te Amo'",
    date: "24 de Setembro de 2023",
    location: "Mirante da Cidade",
    description: "Sob um céu repleto de estrelas e as luzes da cidade cintilando lá embaixo. O momento em que o sentimento transbordou do peito e virou palavra. Um sussurro carregado de certezas que mudou o rumo das nossas vidas para sempre.",
    mediaUrl: getMedia(1), // Assign second local image dynamically
    mediaType: "image",
    rotation: 2.5,
    speed: -0.1
  },
  {
    id: "m3",
    title: "Nossa Primeira Viagem",
    date: "15 de Janeiro de 2024",
    location: "Serra e Névoa",
    description: "A estrada fria, o aquecedor do carro no máximo e a sua risada doce preenchendo todo o espaço. Cada curva na neblina nos aproximava ainda mais do nosso próprio destino. Descobrir o mundo ao seu lado é minha aventura favorita.",
    mediaUrl: getMedia(2), // Assign third local image dynamically
    mediaType: "image",
    rotation: -1.5,
    speed: 0.2
  },
  {
    id: "m4",
    title: "Cúmplices na Rotina",
    date: "08 de Junho de 2024",
    location: "Nosso Cantinho Coberto",
    description: "Cozinhar juntos numa tarde de chuva, errar a receita de propósito, rir até faltar o ar e ver um filme clichê sob a mesma coberta. Percebi ali que o amor de verdade mora nos detalhes mais simples do dia a dia com você.",
    mediaUrl: getMedia(3), // Assign fourth local image dynamically
    mediaType: "image",
    rotation: 4,
    speed: -0.15
  },
  {
    id: "m5",
    title: "Dois Anos de Nós",
    date: "12 de Julho de 2025",
    location: "Jantar à Luz de Velas",
    description: "Dois anos inteiros de cumplicidade, carinho, apoio mútuo e amadurecimento. Olhar para você e ver que nossa sintonia só aumenta é a maior prova de que fomos feitos para somar. Uma noite inesquecível de celebração.",
    mediaUrl: getMedia(4), // Assign fifth local image dynamically
    mediaType: "image",
    rotation: -2,
    speed: 0.1
  },
  {
    id: "m6",
    title: "Três Anos e uma Vida Inteira",
    date: "Amanhã, 12 de Julho de 2026",
    location: "O Infinito",
    description: "Três anos de namoro. 1095 dias escolhendo amar você a cada amanhecer. Sinto um orgulho imenso de tudo o que superamos e construímos até aqui. Quando olho para o futuro, só vejo você. Feliz aniversário de namoro, meu amor.",
    mediaUrl: getMedia(5), // Assign sixth local image dynamically
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
