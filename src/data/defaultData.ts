import { MenuItem, GeneralInfo, CafeStory, CoffeeTrivia } from '../types/cafe';

export const DEFAULT_GENERAL_INFO: GeneralInfo = {
  name: "mingma's",
  tagline: "Coffee shop, cafe and bakery",
  subTagline: "All day brunch · High altitude brews · Slow baked morning sourdough",
  relocationNotice: "We have relocated from Old Manali to Mall Road! Find us at our new sunlit sanctuary.",
  address: "1st Floor, Hotel Solang, Mall Road",
  city: "Manali",
  state: "Himachal Pradesh",
  pincode: "175131",
  landmark: "Hotel Solang, Mall Road promenade, Siyal, Manali",
  hoursWeekday: "08:00 AM – 10:00 PM (Monday – Friday)",
  hoursWeekend: "08:00 AM – 10:30 PM (Saturday – Sunday)",
  brunchHours: "All-Day Brunch served fresh until 05:00 PM",
  phone: "+91 82195 58623",
  email: "hello@mingmasmanali.com",
  instagram: "@mingmas.manali",
  mapsEmbedUrl: "https://maps.google.com/maps?q=Mingma's+Coffee+Shop+%26+Cafe,+Mall+Road,+Manali&t=&z=17&ie=UTF8&iwloc=&output=embed",
  googleMapsShareUrl: "https://maps.app.goo.gl/2UpQbYcdeK6t3T2B9",
  wifiNote: "High-speed fiber optic Wi-Fi (150 Mbps) available across all indoor and outdoor seating.",
  wifiNetwork: "Mingmas_Sanctuary_Guest",
  wifiPassword: "himalayancoffee",
  amenities: [
    "High-Altitude Pour-Over Bar",
    "Fresh Artisanal Bakery & Sourdough",
    "All-Day Brunch Menu",
    "Pine-Facing Outdoor Deck",
    "High-Speed Fiber Wi-Fi",
    "Pet-Friendly Terrace",
    "Curated Book & Vinyl Nook"
  ],
  slideshowImages: [
    {
      id: "slide-1",
      url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1600&q=85",
      title: "Himalayan Morning Light",
      subtitle: "Mall Road, Manali · Elevation 2,050m",
      caption: "Reclaimed deodar timber tables, aromatic steam, and mountain light filtering through pine trees."
    },
    {
      id: "slide-2",
      url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1600&q=85",
      title: "High-Altitude Specialty Extraction",
      subtitle: "Single-Origin Manual Brews & Pour-Over",
      caption: "Boiling at 93.1°C with calibrated grind distributions for delicate floral sweetness."
    },
    {
      id: "slide-3",
      url: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1600&q=85",
      title: "Slow Mountain All-Day Brunch",
      subtitle: "Fresh Brioche, Farm Eggs & Tartines",
      caption: "Cultured butter, local mountain orchard apples, and slow-folded scrambles served till 5 PM."
    },
    {
      id: "slide-4",
      url: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1600&q=85",
      title: "Our Sunlit Mall Road Hearth",
      subtitle: "Relocated from Old Manali",
      caption: "Cozy reading corners, ambient folk vinyl, and direct view of the cedar pines."
    }
  ]
};

export const DEFAULT_MENU_ITEMS: MenuItem[] = [
  // COFFEE & ESPRESSO
  {
    id: "c-1",
    name: "Mingma's Himalayan Spiced Mocha",
    category: "coffee",
    price: 280,
    imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
    description: "Double ristretto, single-origin dark cocoa, infused with local Himalayan cinnamon, green cardamom, and steamed velvety whole milk.",
    tastingNotes: ["Dark Cocoa", "Himalayan Cinnamon", "Warm Cardamom"],
    dietary: ["veg"],
    isSpeciality: true,
    specialityReason: "Mingma's signature recipe balancing Himalayan spice warmth with rich Arabica beans.",
    available: true,
    pairing: "Pairs with our Manali Spiced Apple Babka"
  },
  {
    id: "c-2",
    name: "Sea Salt Honey Cold Brew",
    category: "coffee",
    price: 260,
    imageUrl: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80",
    description: "18-hour cold steeped Chikmagalur peaberry coffee topped with whipped mountain wildflower honey cream and flaky pink salt.",
    tastingNotes: ["Wild Honey", "Sweet Cream", "Almond finish"],
    dietary: ["veg"],
    isSpeciality: true,
    specialityReason: "Slow-steeped at 2,050m elevation for zero bitterness and velvety creaminess.",
    available: true,
    pairing: "Perfect on a sunny Manali afternoon"
  },
  {
    id: "c-3",
    name: "Cortado 1:1",
    category: "coffee",
    price: 210,
    imageUrl: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80",
    description: "Equal parts double shot espresso and lightly textured silky microfoam served in a heavy Spanish glass.",
    tastingNotes: ["Hazelnut", "Caramelized Sugar", "Rich Crema"],
    dietary: ["veg"],
    available: true
  },
  {
    id: "c-4",
    name: "Flat White",
    category: "coffee",
    price: 230,
    imageUrl: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80",
    description: "Silky double ristretto layered beneath micro-textured steamed milk with delicate rosetta pour.",
    tastingNotes: ["Toasted Almond", "Vanilla Pod", "Velvet Milk"],
    dietary: ["veg"],
    available: true
  },
  {
    id: "c-5",
    name: "Campfire Smoked Americano",
    category: "coffee",
    price: 220,
    imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
    description: "Espresso pulled over hot spring water with a subtle trace of smoked oak and cedar aromatics.",
    tastingNotes: ["Cedar Wood", "Dark Plum", "Clean Finish"],
    dietary: ["vegan", "gf"],
    available: true
  },

  // MANUAL BREWS & POUR-OVERS
  {
    id: "b-1",
    name: "Estate Pour-Over (Hario V60)",
    category: "brews",
    price: 250,
    imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
    description: "Single-origin washed Arabica from Baba Budangiri, manually dialed for 93°C water boiling point at 2,050m altitude.",
    tastingNotes: ["Jasmine Floral", "Meyer Lemon", "Bergamot"],
    dietary: ["vegan", "gf"],
    isSpeciality: true,
    specialityReason: "Altitude calibrated recipe extracting peak delicate florals without high-temp scorch.",
    available: true
  },
  {
    id: "b-2",
    name: "Aeropress Inverted Brew",
    category: "brews",
    price: 240,
    imageUrl: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80",
    description: "Natural processed microlot with short contact immersion, highlighting intense berry sweetness and clean acidity.",
    tastingNotes: ["Black Currant", "Milk Chocolate", "Juicy Body"],
    dietary: ["vegan", "gf"],
    available: true
  },
  {
    id: "b-3",
    name: "Japanese Iced Drip",
    category: "brews",
    price: 270,
    imageUrl: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80",
    description: "Hot pour-over dripped directly over clear ice cubes, immediately locking in sparkling fruit aromas.",
    tastingNotes: ["Peach Nectar", "Crisp Apple", "Cane Sugar"],
    dietary: ["vegan", "gf"],
    available: true
  },

  // TEAS & BOTANICAL REFRESHERS
  {
    id: "t-1",
    name: "High Mountain Kangra First Flush",
    category: "teas",
    price: 220,
    imageUrl: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
    description: "Tender spring hand-plucked green and black tea leaves from Kangra Valley with shimmering muscatel sweetness.",
    tastingNotes: ["Muscatel Grape", "Pine Honey", "Fresh Grass"],
    dietary: ["vegan", "gf"],
    available: true
  },
  {
    id: "t-2",
    name: "Spiced Kashmiri Kahwa Royale",
    category: "teas",
    price: 240,
    imageUrl: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
    description: "Whole green tea leaves gently simmered with saffron stigmas, cinnamon bark, green cardamom, and slivered almonds.",
    tastingNotes: ["Saffron", "Crushed Almonds", "Sweet Spice"],
    dietary: ["vegan", "gf"],
    isSpeciality: true,
    specialityReason: "Authentic Himalayan recipe brewed in a brass samovar for mountain mornings.",
    available: true
  },
  {
    id: "t-3",
    name: "Himalayan Sea Buckthorn & Mint Tonic",
    category: "teas",
    price: 250,
    imageUrl: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80",
    description: "Wild Spiti valley sea buckthorn berry reduction with fresh garden spearmint, crushed ice, and sparkling mineral tonic.",
    tastingNotes: ["Tart Citrus", "Vitamin Rich", "Crisp Mint"],
    dietary: ["vegan", "gf"],
    available: true
  },

  // ALL-DAY BRUNCH
  {
    id: "br-1",
    name: "Truffle Scramble on Country Sourdough",
    category: "brunch",
    price: 420,
    imageUrl: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
    description: "Slow-folded free-range organic eggs with white truffle oil, shaved aged parmesan, and micro-herbs over thick butter-toasted sourdough.",
    tastingNotes: ["Earthy Truffle", "Creamy Curd", "Tangy Crust"],
    dietary: ["veg"],
    isSpeciality: true,
    specialityReason: "Our most requested brunch signature — slow folded for 6 minutes with cultured butter.",
    available: true
  },
  {
    id: "br-2",
    name: "Avocado & Mountain Ricotta Tartine",
    category: "brunch",
    price: 440,
    imageUrl: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
    description: "Hass avocado ribbons, house-whipped lemon mountain ricotta, roasted cherry tomatoes, za'atar, and cold-pressed olive oil.",
    tastingNotes: ["Creamy Citrus", "Zesty Herbs", "Crusty Sourdough"],
    dietary: ["veg"],
    available: true
  },
  {
    id: "br-3",
    name: "Himalayan Shakshuka Skillet",
    category: "brunch",
    price: 410,
    imageUrl: "https://images.unsplash.com/photo-1590412200988-a436970781fa?auto=format&fit=crop&w=800&q=80",
    description: "Spiced red pepper and heirloom tomato ragout simmered with cumin and smoked paprika, two poached eggs, crumbled feta, and hot flatbread.",
    tastingNotes: ["Smoky Paprika", "Warm Cumin", "Rich Runny Yolk"],
    dietary: ["veg"],
    available: true
  },
  {
    id: "br-4",
    name: "Brioche French Toast & Caramelized Apple",
    category: "brunch",
    price: 390,
    imageUrl: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=800&q=80",
    description: "Thick-cut house brioche soaked in vanilla bean custard, pan-crisped and served with Manali orchard spiced apples and mascarpone quenelle.",
    tastingNotes: ["Manali Apples", "Vanilla Bean", "Golden Caramel"],
    dietary: ["veg"],
    isSpeciality: true,
    specialityReason: "Made using seasonal organic apples sourced from orchards just 8km above the cafe.",
    available: true
  },
  {
    id: "br-5",
    name: "Mingma's Big Mountain Breakfast",
    category: "brunch",
    price: 520,
    imageUrl: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=800&q=80",
    description: "Two eggs your style, herbed roasted baby potatoes, butter-glazed wild mushrooms, grilled tomato, baked beans, and buttered sourdough slice.",
    tastingNotes: ["Savory Herb", "Buttery Crumb", "Hearty Energy"],
    dietary: ["veg"],
    available: true
  },

  // BAKERY & SOURDOUGH
  {
    id: "bk-1",
    name: "Manali Spiced Apple Babka",
    category: "bakery",
    price: 240,
    imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
    description: "Enriched braided yeast dough swirled with local Manali apple compote, brown sugar cinnamon, and salted brown butter glaze.",
    tastingNotes: ["Spiced Apple", "Fluffy Crumb", "Caramel Crust"],
    dietary: ["veg"],
    isSpeciality: true,
    specialityReason: "Baked fresh at 6:30 AM daily using our 4-year-old sourdough starter and local orchard harvest.",
    available: true
  },
  {
    id: "bk-2",
    name: "Classic French Butter Croissant",
    category: "bakery",
    price: 190,
    imageUrl: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80",
    description: "Laminated over 72 hours with 82% cultured European-style butter, creating 27 shatteringly crisp layers.",
    tastingNotes: ["Cultured Butter", "Golden Honeycomb", "Light Flake"],
    dietary: ["veg"],
    available: true
  },
  {
    id: "bk-3",
    name: "Kinnaur Walnut & Cinnamon Swirl Bun",
    category: "bakery",
    price: 220,
    imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
    description: "Warm Swedish-style cardamom bun rolled with roasted Kinnaur mountain walnuts and raw demerara sugar.",
    tastingNotes: ["Nutty Crunch", "Aromatic Cardamom", "Cinnamon Warmth"],
    dietary: ["veg"],
    available: true
  },
  {
    id: "bk-4",
    name: "Artisanal Sourdough Boule (Take-Home Loaf)",
    category: "bakery",
    price: 320,
    imageUrl: "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=800&q=80",
    description: "Whole sourdough loaf fermented for 36 hours at cool mountain ambient temperatures for deep blistered crust and custard crumb.",
    tastingNotes: ["Wild Ferment Tang", "Blistered Crust", "Chewy Crumb"],
    dietary: ["vegan"],
    available: true
  }
];

export const DEFAULT_STORY: CafeStory = {
  title: "A Story Brewed in the Mountains",
  subtitle: "From a cozy hideaway in Old Manali to our sunlit hearth on Mall Road",
  paragraphs: [
    "Mingma's began as an intimate sanctuary in the winding, pine-scented lanes of Old Manali. Our founder, Mingma, envisioned a space where travelers, mountaineers, artists, and locals could gather over slow-brewed specialty coffee and honest, handcrafted food made with mountain-grown ingredients.",
    "At an elevation of 2,050 meters, brewing coffee is an exact science and a quiet art. Water boils at 93°C here instead of 100°C, requiring tailored grind distributions and calibrated extraction curves that bring out delicate florals and citrus sweetness without astringency.",
    "In 2024, we took a leap and relocated from Old Manali to our expansive, light-filled space on Mall Road. Here, large steel-framed windows welcome morning pine mist, Himalayan cedar tables invite slow conversations, and the scent of warm sourdough straight from the deck oven welcomes you throughout the day.",
    "We remain fiercely committed to slow living: ethical single-origin beans sourced directly from Indian micro-estates in Chikmagalur, Baba Budangiri, and the Nilgiris; seasonal apples and walnuts from neighboring orchards; and an all-day brunch menu designed to nourish long days in the Himalayas."
  ],
  philosophyQuotes: [
    {
      quote: "Coffee in the mountains is not merely a beverage; it is the warm anchor between misty mornings and silent peaks.",
      author: "Mingma Sherpa, Founder & Head Roaster"
    }
  ],
  stats: [
    { label: "Altitude Elevation", value: "2,050 m", detail: "Mall Road, Manali" },
    { label: "Fermentation Time", value: "36 hrs", detail: "Slow mountain sourdough" },
    { label: "Water Boiling Point", value: "93.1 °C", detail: "Calibrated extraction" },
    { label: "Estates Sourced", value: "100%", detail: "Direct ethical Indian origin" }
  ]
};

export const COFFEE_TRIVIA_LIST: CoffeeTrivia[] = [
  {
    id: "tr-1",
    question: "Why does coffee taste smoother when brewed at 2,050m in Manali?",
    answer: "Because atmospheric pressure drops with altitude, water boils at ~93°C here rather than 100°C. This lower temperature naturally avoids extracting bitter, harsh tannins, delivering an exceptionally sweet and floral cup.",
    altitudeFact: "Manali Altitude: 2,050 meters | Water boils at ~93.1°C",
    tip: "When making coffee at home in the hills, never let water violently bubble. Brew right as tiny pinprick bubbles appear."
  },
  {
    id: "tr-2",
    question: "What is special about Indian Shade-Grown Arabica?",
    answer: "Almost all Indian coffee is grown under a dual-canopy shade of jackfruit, silver oak, and orange trees. This slows down cherry maturation, allowing complex natural sugars and spice notes to develop deep inside the bean.",
    altitudeFact: "Estate Origins: Baba Budangiri & Coorg shade plantations",
    tip: "Look for notes of cardamom, nutmeg, and dark chocolate inherent to Indian terroir."
  },
  {
    id: "tr-3",
    question: "How does cold mountain air enhance our sourdough fermentation?",
    answer: "Cool ambient mountain air slows microbial yeast activity, letting lactic and acetic acid bacteria ferment over 36 hours. This creates an airy crumb with a subtle, gentle tang that never overwhelms delicate butter.",
    altitudeFact: "Ambient ferment temp: 16°C – 19°C across the year",
    tip: "Our starter is fed daily with stone-ground Himalayan wholewheat."
  },
  {
    id: "tr-4",
    question: "What is the difference between a Cortado and a Piccolo Latte?",
    answer: "While both use espresso and warm textured milk, a Cortado uses equal 1:1 ratio with flat milk in a 4oz glass, whereas a Piccolo uses a single ristretto with silky latte foam in a 3oz duralex glass.",
    altitudeFact: "Best enjoyed with a crisp Himalayan morning breeze",
    tip: "A cortado highlights the espresso roaster's origin profile more directly than a cappuccino."
  }
];
