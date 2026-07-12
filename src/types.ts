export interface MemoryItem {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  rotation: number; // For styling cards with a slight organic tilt
  speed: number; // Paralaxe speed modifier
}

export interface LoveChapter {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  quote: string;
}

export interface AppSettings {
  coupleName1: string;
  coupleName2: string;
  anniversaryDate: string; // Printable portuguese name
  anniversaryDateString: string; // Machine-readable string "YYYY-MM-DD"
  primaryColor: string;
  accentColor: string;
  bgTrackUrl: string;
}
