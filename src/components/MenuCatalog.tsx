import React, { useState, useMemo } from 'react';
import { Search, Filter, Info, X, Coffee, Sparkles, QrCode } from 'lucide-react';
import { useCafe } from '../context/CafeContext';
import { MenuCategory } from '../types/cafe';

export const MenuCatalog: React.FC = () => {
  const { menuItems, setSelectedItem, setShowQrModal, setIsTableMenuView } = useCafe();
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('all');
  const [dietaryFilter, setDietaryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [imageErrorIds, setImageErrorIds] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setImageErrorIds((prev) => ({ ...prev, [id]: true }));
  };

  const categories: { id: MenuCategory; label: string; count: number }[] = useMemo(() => {
    return [
      { id: 'all', label: 'All Offerings', count: menuItems.length },
      { id: 'coffee', label: 'Espresso & Milk', count: menuItems.filter(i => i.category === 'coffee').length },
      { id: 'brews', label: 'Manual Brews', count: menuItems.filter(i => i.category === 'brews').length },
      { id: 'teas', label: 'Teas & Infusions', count: menuItems.filter(i => i.category === 'teas').length },
      { id: 'brunch', label: 'All-Day Brunch', count: menuItems.filter(i => i.category === 'brunch').length },
      { id: 'bakery', label: 'Bakery & Sourdough', count: menuItems.filter(i => i.category === 'bakery').length },
    ];
  }, [menuItems]);

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      // Category check
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // Dietary check
      if (dietaryFilter !== 'all') {
        if (!item.dietary || !item.dietary.includes(dietaryFilter as any)) {
          return false;
        }
      }
      // Search query check
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesNotes = item.tastingNotes?.some(n => n.toLowerCase().includes(query));
        const matchesPairing = item.pairing?.toLowerCase().includes(query);
        return matchesName || matchesDesc || matchesNotes || matchesPairing;
      }
      return true;
    });
  }, [menuItems, activeCategory, dietaryFilter, searchQuery]);

  return (
    <section id="menu" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 pb-6 sm:pb-8 border-b border-[#EDE8DC]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#1F4231] uppercase tracking-wider mb-1.5">
            <span>Catalog &amp; Offerings</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-stone-900 tracking-tight">
            The Menu
          </h2>
          <p className="mt-2 text-xs sm:text-sm md:text-base text-stone-600 font-light max-w-xl leading-relaxed">
            Thoughtfully curated drinks, hearty mountain brunch dishes, and wild fermented bakery goods. Served fresh daily on Mall Road.
          </p>
        </div>

        {/* QR Menu direct button & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full md:w-auto">
          
          {/* Table QR Menu button */}
          <button
            onClick={() => setShowQrModal(true)}
            className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 bg-[#E8F0EB] hover:bg-[#D5E4D9] text-[#1F4231] text-xs font-semibold rounded-sm transition-colors cursor-pointer border border-[#D5E4D9] shrink-0"
            title="Generate QR code link for cafe tables"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Table QR Menu Link</span>
          </button>

          {/* Search bar */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes, beans..."
              className="w-full pl-9 pr-8 py-2.5 bg-white border border-[#EDE8DC] rounded-sm text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#1F4231] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1"
                aria-label="Clear search query"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filter Tabs & Dietary Segmented Controls - Mobile Phone Optimized */}
      <div className="py-4 sm:py-5 border-b border-[#EDE8DC] space-y-3.5">
        
        {/* Category Tabs with smooth touch scrolling */}
        <div className="flex items-center gap-2 overflow-x-auto w-full pb-1 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-2 text-xs font-medium rounded-sm whitespace-nowrap shrink-0 transition-colors cursor-pointer touch-manipulation min-h-[38px] flex items-center ${
                activeCategory === cat.id
                  ? 'bg-[#1F4231] text-[#FAF9F5] shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 bg-[#F4F1EA]/70 hover:bg-[#F4F1EA]'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`ml-1.5 text-[10px] font-mono ${activeCategory === cat.id ? 'text-[#FAF9F5]/70' : 'text-stone-400'}`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Dietary Filters - Neat full-width row on mobile */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-1 text-xs -mx-4 px-4 sm:mx-0 sm:px-0">
          <span className="text-stone-400 text-[10px] sm:text-[11px] uppercase tracking-wider mr-1 shrink-0 flex items-center gap-1 font-mono">
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
              className={`px-2.5 py-1 text-xs rounded-xs whitespace-nowrap transition-colors cursor-pointer touch-manipulation min-h-[32px] flex items-center ${
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

      {/* Menu Item Cards Grid - Mobile Optimized Card Layout */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-stone-50/50 rounded-lg mt-8 border border-dashed border-stone-200 px-4">
          <p className="text-base font-serif text-stone-700">No menu items match your search.</p>
          <p className="text-xs text-stone-500 mt-1">Try resetting the category or search keywords.</p>
          <button
            onClick={() => {
              setActiveCategory('all');
              setDietaryFilter('all');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 text-xs font-semibold bg-[#1F4231] text-white rounded-sm hover:bg-[#153324] transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mt-6 sm:mt-8">
          {filteredItems.map((item) => {
            const hasError = imageErrorIds[item.id];
            const hasImage = item.imageUrl && !hasError;

            return (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="group bg-white rounded-lg p-3.5 sm:p-4 border border-[#EDE8DC] hover:border-[#1F4231]/40 transition-all cursor-pointer shadow-2xs hover:shadow-xs flex gap-3.5 sm:gap-4 items-start touch-manipulation"
              >
                {/* Responsive Image Thumbnail */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-md overflow-hidden shrink-0 border border-[#EDE8DC] bg-[#F4F1EA] relative">
                  {hasImage ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      onError={() => handleImageError(item.id)}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-[#E8F0EB] text-[#1F4231] p-1.5 text-center">
                      <Coffee className="w-5 h-5 mb-1 opacity-70" />
                      <span className="text-[8px] uppercase font-mono tracking-wider font-semibold line-clamp-1">
                        {item.category}
                      </span>
                    </div>
                  )}

                  {item.isSpeciality && (
                    <div className="absolute top-1 left-1 bg-[#1F4231] text-[#FAF9F5] p-1 rounded-xs shadow-xs" title="Signature offering">
                      <Sparkles className="w-2.5 h-2.5" />
                    </div>
                  )}
                </div>

                {/* Details Column with strict overflow containment */}
                <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch">
                  <div>
                    {/* Header: Name and Price */}
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm sm:text-base font-serif text-stone-900 group-hover:text-[#1F4231] transition-colors leading-snug line-clamp-2">
                        {item.name}
                      </h3>
                      <span className="font-mono text-xs sm:text-sm font-semibold text-[#1F4231] shrink-0 pt-0.5">
                        ₹{item.price}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-stone-600 font-light leading-relaxed line-clamp-2 mt-1 mb-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Footer: Tasting notes and tap affordance */}
                  <div className="flex items-center justify-between text-xs text-stone-500 pt-1 border-t border-stone-100 gap-2">
                    <div className="flex items-center gap-1.5 truncate min-w-0">
                      {item.tastingNotes && item.tastingNotes.length > 0 ? (
                        <span className="italic font-serif text-[11px] text-stone-600 truncate">
                          {item.tastingNotes.join(' · ')}
                        </span>
                      ) : (
                        <span className="text-[10px] text-stone-400 font-mono">Daily Roast</span>
                      )}
                      {item.dietary && item.dietary.length > 0 && (
                        <span className="uppercase text-[9px] font-mono tracking-wider text-stone-400 shrink-0">
                          / {item.dietary.join(', ')}
                        </span>
                      )}
                    </div>

                    <span className="text-[10px] sm:text-[11px] text-[#1F4231] font-medium flex items-center gap-0.5 shrink-0">
                      <Info className="w-3 h-3" />
                      <span className="hidden xs:inline">Details</span>
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Non-eCommerce Notice */}
      <div className="mt-10 sm:mt-14 p-4 sm:p-5 bg-[#FAF9F5] border border-[#E2DDD5] rounded-sm text-center">
        <p className="text-xs text-stone-500 font-light leading-relaxed">
          Note: Mingma's is an experiential dine-in cafe &amp; roastery on Mall Road, Manali. All items are prepared fresh to order at our hearth.
        </p>
      </div>

    </section>
  );
};
