export type MenuCategory = 'all' | 'coffee' | 'brews' | 'teas' | 'brunch' | 'bakery';

export interface MenuItem {
  id: string;
  name: string;
  category: 'coffee' | 'brews' | 'teas' | 'brunch' | 'bakery';
  price: number;
  description: string;
  imageUrl?: string;
  tastingNotes?: string[];
  dietary?: ('veg' | 'vegan' | 'gf')[];
  isSpeciality?: boolean;
  specialityReason?: string;
  available: boolean;
  imagePromptFallback?: string;
  pairing?: string;
}

export interface SlideItem {
  id: string;
  url: string;
  title: string;
  subtitle: string;
  caption?: string;
}

export interface GeneralInfo {
  name: string;
  tagline: string;
  subTagline: string;
  relocationNotice: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  landmark: string;
  hoursWeekday: string;
  hoursWeekend: string;
  brunchHours: string;
  phone: string;
  email: string;
  instagram: string;
  mapsEmbedUrl: string;
  googleMapsShareUrl: string;
  wifiNote: string;
  wifiNetwork?: string;
  wifiPassword?: string;
  amenities: string[];
  slideshowImages: SlideItem[];
}

export interface CafeStory {
  title: string;
  subtitle: string;
  paragraphs: string[];
  philosophyQuotes: {
    quote: string;
    author: string;
  }[];
  stats: {
    label: string;
    value: string;
    detail: string;
  }[];
}

export interface CoffeeTrivia {
  id: string;
  question: string;
  answer: string;
  altitudeFact: string;
  tip: string;
}
