import React, { useState, useMemo } from 'react';
import { Search, Filter, X, ArrowLeft, Coffee, Sparkles, Wifi, Check, Copy, Info, Utensils } from 'lucide-react';
import { useCafe } from '../context/CafeContext';
import { MenuCategory } from '../types/cafe';

export const TableMenuView: React.FC = () => {
  const { menuItems, generalInfo, tableNumber, setIsTableMenuView, setSelectedItem } = useCafe();
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('all');
  const [dietaryFilter, setDietaryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedWifi, setCopiedWifi] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  const handleCopyWifi = () => {
    const text = generalInfo.wifiPassword || 'himalayancoffee';
    navigator.clipboard.writeText(text);
    setCopiedWifi(true);
    setTimeout(() => setCopiedWifi(false), 2000);
  };

  const categories: { id: MenuCategory; label: string; count: number }[] = useMemo(() => {
    return [
      { id: 'all', label: 'All Items', count: menuItems.length },
      { id: 'coffee', label: 'Coffee & Espresso', count: menuItems.filter(i => i.category === 'coffee').length },
      { id: 'brews', label: 'Manual Brews', count: menuItems.filter(i => i.category === 'brews').length },
      { id: 'brunch', label: 'All-Day Brunch', count: menuItems.filter(i => i.category === 'brunch').length },
      { id: 'bakery', label: 'Fresh Bakery', count: menuItems.filter(i => i.category === 'bakery').length },
      { id: 'teas', label: 'Himalayan Teas', count: menuItems.filter(i => i.category === 'teas').length },
    ];
  }, [menuItems]);

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      if (activeCategory !== 'all' && item.category !== activeCategory) return false;
      if (dietaryFilter !== 'all') {
        if (!item.dietary || !item.dietary.includes(dietaryFilter as any)) return false;
      }
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesNotes = item.tastingNotes?.some(n => n.toLowerCase().includes(q));
        return matchesName || matchesDesc || matchesNotes;
      }
      return true;
    });
  }, [menuItems, activeCategory, dietaryFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-stone-800 flex flex-col font-sans pb-16 selection:bg-[#1F4231] selection:text-[#FAF9F5]">
      
      {/* Sticky Table Header */}
      <header className="sticky top-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-[#EDE8DC] shadow-2xs">
        <div className="max-w-2xl mx-auto px-4 h-14 sm:h-16 flex items-center justify-between gap-3">
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsTableMenuView(false)}
              className="p-1.5 -ml-1.5 text-stone-600 hover:text-stone-900 rounded-full hover:bg-stone-200/60 transition-colors"
              aria-label="Back to full site"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="bg-[#1F4231] text-[#FAF9F5] px-2.5 py-1 rounded-xs font-serif text-base tracking-tight lowercase">
              mingma's
            </div>
            {tableNumber && (
              <span className="bg-[#E8F0EB] text-[#1F4231] text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-xs border border-[#D5E4D9] font-semibold">
                {tableNumber}
              </span>
            )}
          </div>

          <button
            onClick={() => setIsTableMenuView(false)}
            className="text-xs text-stone-600 hover:text-[#1F4231] font-medium flex items-center gap-1 cursor-pointer py-1 px-2 rounded-sm hover:bg-stone-100"
          >
            <span>Full Website</span>
          </button>
        </div>
      </header>

      {/* Main Table Content */}
      <main className="max-w-2xl mx-auto px-4 w-full flex-1 pt-4 sm:pt-6 space-y-4">
        
        {/* Table Welcome Card */}
        <div className="bg-[#F4F1EA] border border-[#EDE8DC] rounded-lg p-4 sm:p-5 relative overflow-hidden shadow-2xs">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E2DDD5]/70">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#1F4231] font-semibold block">
                Digital Table Menu
              </span>
              <h1 className="text-xl sm:text-2xl font-serif text-stone-900 font-normal">
                Mingma's Coffee &amp; Brunch
              </h1>
            </div>
            <span className="text-[11px] font-mono text-stone-500">2,050m</span>
          </div>

          <p className="text-xs text-stone-600 font-light leading-relaxed mb-3">
            Hand-pulled espresso, high-altitude manual brews, all-day brunch till 5 PM, and slow-fermented bakery goods fresh from our hearth.
          </p>

          {/* Quick Wi-Fi Pill with Copy */}
          <div className="bg-[#FAF9F5] border border-[#E2DDD5] rounded-md p-2.5 flex items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 truncate">
              <Wifi className="w-3.5 h-3.5 text-[#1F4231] shrink-0" />
              <span className="text-stone-700 truncate">
                <strong className="font-medium text-stone-900">Wi-Fi:</strong> {generalInfo.wifiNetwork || 'Mingmas_Sanctuary_Guest'}
              </span>
            </div>
            <button
              onClick={handleCopyWifi}
              className="px-2 py-0.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xs text-[11px] font-medium flex items-center gap-1 shrink-0 transition-colors"
            >
              {copiedWifi ? (
                <>
                  <Check className="w-3 h-3 text-[#1F4231]" />
                  <span className="text-[#1F4231]">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 text-stone-400" />
                  <span>Copy Pass</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Search Bar for Table Diners */}
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search coffee, brunch, bakery..."
            className="w-full pl-9 pr-8 py-2.5 bg-white border border-[#EDE8DC] rounded-md text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#1F4231] shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Sticky-ready Category Filter Strip */}
        <div className="space-y-2.5 py-1">
          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-1 scrollbar-none -mx-4 px-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-sm whitespace-nowrap shrink-0 transition-all cursor-pointer min-h-[36px] flex items-center ${
                  activeCategory === cat.id
                    ? 'bg-[#1F4231] text-[#FAF9F5] shadow-xs'
                    : 'bg-white text-stone-600 border border-[#EDE8DC] hover:bg-stone-50'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`ml-1.5 text-[10px] font-mono ${activeCategory === cat.id ? 'text-white/70' : 'text-stone-400'}`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Dietary Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-1 text-xs -mx-4 px-4">
            <span className="text-stone-400 text-[10px] uppercase font-mono tracking-wider mr-1 shrink-0 flex items-center gap-1">
              <Filter className="w-3 h-3" />
              Diet:
            </span>
            {[
              { id: 'all', label: 'All' },
              { id: 'veg', label: 'Vegetarian' },
              { id: 'vegan', label: 'Vegan' },
              { id: 'gf', label: 'Gluten-Free' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setDietaryFilter(item.id)}
                className={`px-2.5 py-1 text-xs rounded-xs whitespace-nowrap transition-colors cursor-pointer min-h-[30px] flex items-center ${
                  dietaryFilter === item.id
                    ? 'bg-stone-800 text-white font-medium'
                    : 'text-stone-600 bg-stone-100 hover:text-stone-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items List - Ultra Clean Phone View */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-dashed border-stone-200 p-4">
            <p className="text-sm font-serif text-stone-700">No items match your filter.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setDietaryFilter('all');
                setSearchQuery('');
              }}
              className="mt-3 px-3.5 py-1.5 text-xs bg-[#1F4231] text-white rounded-sm font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-3 pt-1">
            {filteredItems.map((item) => {
              const hasError = imageErrors[item.id];
              const hasImage = item.imageUrl && !hasError;

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="bg-white rounded-lg p-3 sm:p-3.5 border border-[#EDE8DC] hover:border-[#1F4231]/40 transition-all cursor-pointer shadow-2xs active:scale-[0.99] flex gap-3 sm:gap-3.5 items-start touch-manipulation"
                >
                  {/* Photo Thumbnail */}
                  <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-md overflow-hidden shrink-0 border border-[#EDE8DC] bg-[#F4F1EA] relative">
                    {hasImage ? (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        onError={() => handleImageError(item.id)}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-[#E8F0EB] text-[#1F4231] p-1 text-center">
                        <Coffee className="w-5 h-5 mb-1 opacity-70" />
                        <span className="text-[8px] uppercase font-mono tracking-wider font-semibold line-clamp-1">
                          {item.category}
                        </span>
                      </div>
                    )}
                    {item.isSpeciality && (
                      <div className="absolute top-1 left-1 bg-[#1F4231] text-[#FAF9F5] p-1 rounded-xs shadow-xs" title="Signature">
                        <Sparkles className="w-2.5 h-2.5" />
                      </div>
                    )}
                  </div>

                  {/* Details column */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm sm:text-base font-serif text-stone-900 leading-snug line-clamp-2">
                          {item.name}
                        </h3>
                        <span className="font-mono text-xs sm:text-sm font-semibold text-[#1F4231] shrink-0 pt-0.5">
                          ₹{item.price}
                        </span>
                      </div>

                      <p className="text-xs text-stone-600 font-light leading-relaxed line-clamp-2 mt-1 mb-2">
                        {item.description}
                      </p>
                    </div>

                    {/* Tasting notes & details affordance */}
                    <div className="flex items-center justify-between text-xs text-stone-500 pt-1 border-t border-stone-100 gap-2">
                      <div className="truncate min-w-0">
                        {item.tastingNotes && item.tastingNotes.length > 0 ? (
                          <span className="italic font-serif text-[11px] text-stone-600 truncate">
                            {item.tastingNotes.join(' · ')}
                          </span>
                        ) : (
                          <span className="text-[10px] text-stone-400 font-mono">Fresh Daily</span>
                        )}
                        {item.dietary && item.dietary.length > 0 && (
                          <span className="uppercase text-[9px] font-mono tracking-wider text-stone-400 ml-1">
                            / {item.dietary.join(', ')}
                          </span>
                        )}
                      </div>

                      <span className="text-[11px] text-[#1F4231] font-medium flex items-center gap-0.5 shrink-0">
                        <Info className="w-3 h-3" />
                        <span>Details</span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Dine-In Ordering Guidance Box */}
        <div className="mt-8 p-4 bg-[#F4F1EA] border border-[#E2DDD5] rounded-lg text-center space-y-1 text-xs text-stone-600">
          <div className="flex items-center justify-center gap-1.5 text-stone-800 font-medium">
            <Utensils className="w-3.5 h-3.5 text-[#1F4231]" />
            <span>Ready to order?</span>
          </div>
          <p className="font-light">
            Please place your order at the espresso counter or let your server know your selections.
          </p>
        </div>

        {/* Return to Full Website link */}
        <div className="pt-4 text-center">
          <button
            onClick={() => setIsTableMenuView(false)}
            className="text-xs text-stone-500 hover:text-stone-900 underline underline-offset-4 cursor-pointer"
          >
            Switch to Full Mingma's Cafe Website
          </button>
        </div>

      </main>

    </div>
  );
};
