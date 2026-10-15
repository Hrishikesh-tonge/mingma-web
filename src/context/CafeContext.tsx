import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem, GeneralInfo, CafeStory, SlideItem } from '../types/cafe';
import { DEFAULT_GENERAL_INFO, DEFAULT_MENU_ITEMS, DEFAULT_STORY } from '../data/defaultData';

interface CafeContextType {
  menuItems: MenuItem[];
  generalInfo: GeneralInfo;
  cafeStory: CafeStory;
  isAdminView: boolean;
  setIsAdminView: (val: boolean) => void;
  isTableMenuView: boolean;
  setIsTableMenuView: (val: boolean) => void;
  tableNumber: string;
  setTableNumber: (val: string) => void;
  showQrModal: boolean;
  setShowQrModal: (val: boolean) => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
  selectedItem: MenuItem | null;
  setSelectedItem: (item: MenuItem | null) => void;
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  updateMenuItem: (item: MenuItem) => void;
  deleteMenuItem: (id: string) => void;
  updateGeneralInfo: (info: Partial<GeneralInfo>) => void;
  updateSlideshowImages: (images: SlideItem[]) => void;
  updateCafeStory: (story: Partial<CafeStory>) => void;
  resetToDefaults: () => void;
  exportDataJSON: () => string;
  importDataJSON: (jsonStr: string) => boolean;
}

const STORAGE_KEY_MENU = 'mingmas_menu_items_v2';
const STORAGE_KEY_INFO = 'mingmas_general_info_v2';
const STORAGE_KEY_STORY = 'mingmas_cafe_story_v2';

const CafeContext = createContext<CafeContextType | undefined>(undefined);

export const CafeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_MENU);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((item: MenuItem) => {
            if (!item.imageUrl) {
              const defaultMatch = DEFAULT_MENU_ITEMS.find(d => d.id === item.id || d.name.toLowerCase() === item.name.toLowerCase());
              if (defaultMatch?.imageUrl) {
                return { ...item, imageUrl: defaultMatch.imageUrl };
              }
            }
            return item;
          });
        }
      }
    } catch (e) {
      console.error('Error loading menu from localStorage:', e);
    }
    return DEFAULT_MENU_ITEMS;
  });

  const [generalInfo, setGeneralInfo] = useState<GeneralInfo>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_INFO);
      if (saved) {
        const parsed = JSON.parse(saved);
        const isOldEmbed = !parsed.mapsEmbedUrl || parsed.mapsEmbedUrl.includes('32.2396328') || !parsed.mapsEmbedUrl.includes('Mingma');
        return {
          ...DEFAULT_GENERAL_INFO,
          ...parsed,
          mapsEmbedUrl: isOldEmbed ? DEFAULT_GENERAL_INFO.mapsEmbedUrl : parsed.mapsEmbedUrl,
          googleMapsShareUrl: DEFAULT_GENERAL_INFO.googleMapsShareUrl,
          slideshowImages: (parsed.slideshowImages && parsed.slideshowImages.length > 0)
            ? parsed.slideshowImages
            : DEFAULT_GENERAL_INFO.slideshowImages,
        };
      }
    } catch (e) {
      console.error('Error loading general info from localStorage:', e);
    }
    return DEFAULT_GENERAL_INFO;
  });

  const [cafeStory, setCafeStory] = useState<CafeStory>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STORY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading story from localStorage:', e);
    }
    return DEFAULT_STORY;
  });

  const [isAdminView, setIsAdminViewState] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      const search = window.location.search.toLowerCase();
      return hash === '#admin' || path.endsWith('/admin') || search.includes('admin=true');
    }
    return false;
  });

  const [isTableMenuView, setIsTableMenuViewState] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      const params = new URLSearchParams(window.location.search);
      return (
        hash === '#table-menu' ||
        hash === '#menu-direct' ||
        hash === '#qr' ||
        path.endsWith('/menu') ||
        path.endsWith('/table') ||
        params.get('view') === 'menu' ||
        params.get('menu') === 'table' ||
        params.has('table')
      );
    }
    return false;
  });

  const [tableNumber, setTableNumber] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('table') || '';
    }
    return '';
  });

  const [showQrModal, setShowQrModal] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  // Sync hash/query changes
  useEffect(() => {
    const handleUrlChange = () => {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      const params = new URLSearchParams(window.location.search);

      if (hash === '#admin') {
        setIsAdminViewState(true);
        setIsTableMenuViewState(false);
      } else if (
        hash === '#table-menu' ||
        hash === '#menu-direct' ||
        path.endsWith('/menu') ||
        params.get('view') === 'menu' ||
        params.get('menu') === 'table' ||
        params.has('table')
      ) {
        setIsTableMenuViewState(true);
        setIsAdminViewState(false);
        if (params.get('table')) {
          setTableNumber(params.get('table')!);
        }
      }
    };
    window.addEventListener('hashchange', handleUrlChange);
    window.addEventListener('popstate', handleUrlChange);
    return () => {
      window.removeEventListener('hashchange', handleUrlChange);
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, []);

  const setIsAdminView = (val: boolean) => {
    setIsAdminViewState(val);
    if (val) {
      setIsTableMenuViewState(false);
    }
    if (typeof window !== 'undefined') {
      if (val) {
        window.location.hash = 'admin';
      } else if (window.location.hash === '#admin') {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    }
  };

  const setIsTableMenuView = (val: boolean) => {
    setIsTableMenuViewState(val);
    if (val) {
      setIsAdminViewState(false);
    }
    if (typeof window !== 'undefined') {
      if (val) {
        const query = tableNumber ? `?table=${encodeURIComponent(tableNumber)}&view=menu` : `?view=menu`;
        window.history.pushState(null, '', query + '#table-menu');
      } else {
        window.history.pushState(null, '', window.location.pathname);
      }
    }
  };

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_MENU, JSON.stringify(menuItems));
    } catch (e) {
      console.error('Error saving menu to localStorage:', e);
    }
  }, [menuItems]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_INFO, JSON.stringify(generalInfo));
    } catch (e) {
      console.error('Error saving info to localStorage:', e);
    }
  }, [generalInfo]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_STORY, JSON.stringify(cafeStory));
    } catch (e) {
      console.error('Error saving story to localStorage:', e);
    }
  }, [cafeStory]);

  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newId = `item-${Date.now()}`;
    const newItem: MenuItem = { ...item, id: newId };
    setMenuItems(prev => [newItem, ...prev]);
  };

  const updateMenuItem = (updatedItem: MenuItem) => {
    setMenuItems(prev => prev.map(item => (item.id === updatedItem.id ? updatedItem : item)));
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
  };

  const updateGeneralInfo = (info: Partial<GeneralInfo>) => {
    setGeneralInfo(prev => ({ ...prev, ...info }));
  };

  const updateSlideshowImages = (images: SlideItem[]) => {
    setGeneralInfo(prev => ({ ...prev, slideshowImages: images }));
  };

  const updateCafeStory = (story: Partial<CafeStory>) => {
    setCafeStory(prev => ({ ...prev, ...story }));
  };

  const resetToDefaults = () => {
    setMenuItems(DEFAULT_MENU_ITEMS);
    setGeneralInfo(DEFAULT_GENERAL_INFO);
    setCafeStory(DEFAULT_STORY);
    try {
      localStorage.removeItem(STORAGE_KEY_MENU);
      localStorage.removeItem(STORAGE_KEY_INFO);
      localStorage.removeItem(STORAGE_KEY_STORY);
    } catch (e) {
      console.error('Error resetting localStorage:', e);
    }
  };

  const exportDataJSON = (): string => {
    const backup = {
      menuItems,
      generalInfo,
      cafeStory,
      exportedAt: new Date().toISOString()
    };
    return JSON.stringify(backup, null, 2);
  };

  const importDataJSON = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.menuItems && Array.isArray(parsed.menuItems)) {
        setMenuItems(parsed.menuItems);
      }
      if (parsed.generalInfo && typeof parsed.generalInfo === 'object') {
        setGeneralInfo(parsed.generalInfo);
      }
      if (parsed.cafeStory && typeof parsed.cafeStory === 'object') {
        setCafeStory(parsed.cafeStory);
      }
      return true;
    } catch (err) {
      console.error('Failed to import JSON data:', err);
      return false;
    }
  };

  return (
    <CafeContext.Provider
      value={{
        menuItems,
        generalInfo,
        cafeStory,
        isAdminView,
        setIsAdminView,
        isTableMenuView,
        setIsTableMenuView,
        tableNumber,
        setTableNumber,
        showQrModal,
        setShowQrModal,
        activeSection,
        setActiveSection,
        selectedItem,
        setSelectedItem,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        updateGeneralInfo,
        updateSlideshowImages,
        updateCafeStory,
        resetToDefaults,
        exportDataJSON,
        importDataJSON
      }}
    >
      {children}
    </CafeContext.Provider>
  );
};

export const useCafe = () => {
  const context = useContext(CafeContext);
  if (!context) {
    throw new Error('useCafe must be used within a CafeProvider');
  }
  return context;
};
