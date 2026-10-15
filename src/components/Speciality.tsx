import React, { useState } from 'react';
import { Sparkles, Eye, Coffee } from 'lucide-react';
import { useCafe } from '../context/CafeContext';
import { MenuItem } from '../types/cafe';

export const Speciality: React.FC = () => {
  const { menuItems, setSelectedItem } = useCafe();
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const specialityItems = menuItems.filter((item) => item.isSpeciality);

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="speciality" className="py-20 bg-[#F4F1EA] border-y border-[#E2DDD5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#1F4231] uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Mingma's Signature</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-stone-900 tracking-tight leading-tight">
            Their Speciality: Handcrafted with mountain intention.
          </h2>
          <p className="mt-4 text-base text-stone-600 font-light leading-relaxed">
            Every signature offering reflects our high-altitude ethos — from local orchard apples picked in Upper Manali to single-origin Indian coffees slow-brewed to complement the mountain air.
          </p>
        </div>

        {/* Bento Grid Layout for Speciality Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specialityItems.map((item: MenuItem, index: number) => {
            const hasError = imageErrors[item.id];
            const hasImage = item.imageUrl && !hasError;

            return (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="group relative bg-[#FAF9F5] border border-[#E2DDD5] hover:border-[#1F4231]/40 rounded-lg overflow-hidden flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm cursor-pointer"
              >
                {/* Speciality Image Banner */}
                {item.imageUrl && (
                  <div className="relative aspect-16/10 w-full overflow-hidden bg-stone-100 border-b border-[#EDE8DC]">
                    {hasImage ? (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        onError={() => handleImageError(item.id)}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-[#E8F0EB] text-[#1F4231] p-4">
                        <Coffee className="w-6 h-6 mb-1 opacity-70" />
                        <span className="text-[10px] font-mono uppercase tracking-widest font-semibold">
                          Signature {item.category}
                        </span>
                      </div>
                    )}
                    <div className="absolute top-3 left-3 bg-[#1F4231] text-[#FAF9F5] text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded-xs shadow-xs">
                      0{index + 1}
                    </div>
                  </div>
                )}

                <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Category kicker */}
                    <div className="flex items-center justify-between text-xs text-stone-400 font-mono mb-1.5">
                      <span className="uppercase tracking-widest text-[#1F4231] font-sans font-medium text-[10px] sm:text-[11px]">
                        {item.category === 'coffee'
                          ? 'Specialty Espresso'
                          : item.category === 'brews'
                          ? 'Manual Extraction'
                          : item.category === 'brunch'
                          ? 'All-Day Brunch'
                          : item.category === 'bakery'
                          ? 'Artisan Bakery'
                          : 'Himalayan Infusion'}
                      </span>
                      {!item.imageUrl && <span>0{index + 1}</span>}
                    </div>

                    {/* Item Title & Price */}
                    <div className="flex items-start justify-between gap-2.5 mb-1.5">
                      <h3 className="text-base sm:text-xl font-serif text-stone-900 group-hover:text-[#1F4231] transition-colors leading-snug line-clamp-2">
                        {item.name}
                      </h3>
                      <span className="font-mono text-sm sm:text-base font-semibold text-stone-900 shrink-0 pt-0.5">
                        ₹{item.price}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed mb-3 line-clamp-3">
                      {item.description}
                    </p>

                    {/* Speciality Highlight note */}
                    {item.specialityReason && (
                      <div className="p-2.5 sm:p-3 bg-[#E8F0EB]/60 rounded-sm mb-3 border border-[#D5E4D9]">
                        <p className="text-xs text-[#1F4231] font-medium leading-relaxed">
                          <span className="font-semibold uppercase tracking-wider text-[9px] sm:text-[10px] block mb-0.5">
                            Signature Craft
                          </span>
                          {item.specialityReason}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Footer Metadata */}
                  <div className="pt-4 border-t border-[#EDE8DC] flex items-center justify-between">
                    {item.tastingNotes && item.tastingNotes.length > 0 ? (
                      <div className="flex flex-wrap items-center gap-1.5 text-xs text-stone-500">
                        {item.tastingNotes.map((note, idx) => (
                          <React.Fragment key={note}>
                            <span>{note}</span>
                            {idx < item.tastingNotes!.length - 1 && (
                              <span aria-hidden="true" className="text-stone-300">
                                ·
                              </span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    ) : (
                      <span className="text-xs text-stone-400 italic">Fresh Daily</span>
                    )}

                    <span className="text-xs font-medium text-[#1F4231] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Notice on Fresh Daily Roasting & Baking */}
        <div className="mt-12 p-6 bg-[#FAF9F5] border border-[#E2DDD5] rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-serif font-medium text-stone-900">
              All-Day Brunch &amp; Slow Baking Hours
            </h4>
            <p className="text-xs text-stone-500 font-light">
              Breads exit our deck ovens at 06:30 AM and 02:00 PM. Full kitchen brunch menu available until 05:00 PM daily.
            </p>
          </div>
          <a
            href="#menu"
            className="px-5 py-2.5 bg-[#1F4231] text-[#FAF9F5] text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-[#153324] transition-colors whitespace-nowrap shrink-0 shadow-2xs"
          >
            Browse Full Menu Catalog
          </a>
        </div>

      </div>
    </section>
  );
};
