import React, { useState } from 'react';
import { X, Sparkles, Utensils, Tag, Coffee } from 'lucide-react';
import { useCafe } from '../context/CafeContext';

export const ItemDetailModal: React.FC = () => {
  const { selectedItem, setSelectedItem } = useCafe();
  const [imgError, setImgError] = useState(false);

  if (!selectedItem) return null;

  const hasImage = selectedItem.imageUrl && !imgError;

  return (
    <div
      className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={() => setSelectedItem(null)}
    >
      <div
        className="bg-[#FAF9F5] border border-[#E2DDD5] rounded-lg max-w-lg w-full p-4 sm:p-7 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150 my-4 sm:my-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setSelectedItem(null)}
          className="absolute right-4 top-4 z-10 p-1.5 rounded-full text-stone-600 bg-white/80 hover:bg-white hover:text-stone-900 shadow-xs transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Image Header */}
        {selectedItem.imageUrl && (
          <div className="relative aspect-16/9 rounded-md overflow-hidden border border-[#EDE8DC] bg-[#F4F1EA] mb-5">
            {hasImage ? (
              <img
                src={selectedItem.imageUrl}
                alt={selectedItem.name}
                onError={() => setImgError(true)}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-[#E8F0EB] text-[#1F4231] p-4 text-center">
                <Coffee className="w-8 h-8 mb-2 opacity-70" />
                <span className="text-xs uppercase font-mono tracking-widest font-semibold">
                  Mingma's {selectedItem.category}
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent pointer-events-none" />
          </div>
        )}

        {/* Modal Content */}
        <div className="space-y-4">
          
          {/* Category & Tag */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#1F4231] font-semibold bg-[#E8F0EB] px-2.5 py-0.5 rounded-xs">
              {selectedItem.category}
            </span>
            {selectedItem.isSpeciality && (
              <span className="text-[11px] font-mono uppercase tracking-widest text-amber-800 bg-amber-50 px-2 py-0.5 rounded-xs border border-amber-200 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Signature
              </span>
            )}
          </div>

          {/* Title & Price */}
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-2xl sm:text-3xl font-serif text-stone-900 leading-tight">
              {selectedItem.name}
            </h3>
            <span className="font-mono text-xl font-semibold text-stone-900 tabular-nums shrink-0">
              ₹{selectedItem.price}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-stone-600 font-light leading-relaxed">
            {selectedItem.description}
          </p>

          {/* Signature Detail Callout if applicable */}
          {selectedItem.specialityReason && (
            <div className="p-3.5 bg-[#E8F0EB] border border-[#D5E4D9] rounded-sm">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#1F4231] font-bold block mb-1">
                Mingma's Craft Rationale
              </span>
              <p className="text-xs text-[#1F4231] leading-relaxed">
                {selectedItem.specialityReason}
              </p>
            </div>
          )}

          {/* Tasting Notes */}
          {selectedItem.tastingNotes && selectedItem.tastingNotes.length > 0 && (
            <div className="space-y-1.5 pt-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 block">
                Flavor Profile &amp; Sensory Notes
              </span>
              <div className="flex flex-wrap items-center gap-1.5 text-xs text-stone-700">
                {selectedItem.tastingNotes.map((note) => (
                  <span
                    key={note}
                    className="bg-[#F4F1EA] border border-[#E2DDD5] px-2.5 py-1 rounded-xs font-serif italic"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Pairing suggestion */}
          {selectedItem.pairing && (
            <div className="pt-1 text-xs text-stone-600 flex items-start gap-2 bg-[#F4F1EA]/70 p-3 rounded-sm border border-[#E2DDD5]">
              <Utensils className="w-3.5 h-3.5 text-[#1F4231] shrink-0 mt-0.5" />
              <p>
                <strong className="font-medium text-stone-800">Suggested Pairing:</strong> {selectedItem.pairing}
              </p>
            </div>
          )}

          {/* Dietary & Freshness */}
          <div className="pt-4 border-t border-[#EDE8DC] flex items-center justify-between text-xs text-stone-500">
            <div className="flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-stone-400" />
              <span>
                {selectedItem.dietary && selectedItem.dietary.length > 0
                  ? selectedItem.dietary.map(d => d.toUpperCase()).join(' · ')
                  : 'Prepared Fresh Daily'}
              </span>
            </div>
            <span className="font-serif italic text-stone-400">Mall Road, Manali</span>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => setSelectedItem(null)}
              className="px-5 py-2.5 bg-[#1F4231] text-[#FAF9F5] text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-[#153324] transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
