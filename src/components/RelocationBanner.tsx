import React, { useState } from 'react';
import { MapPin, ArrowRight, X } from 'lucide-react';
import { useCafe } from '../context/CafeContext';

export const RelocationBanner: React.FC = () => {
  const { generalInfo, setActiveSection } = useCafe();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const scrollToInfo = () => {
    setActiveSection('info');
    const el = document.getElementById('info');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside aria-label="Relocation notice" className="bg-[#1F4231] text-[#FAF9F5] text-xs sm:text-sm py-2.5 px-4 relative z-50 border-b border-[#2A543E]">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="w-5 h-5 rounded-full bg-[#FAF9F5]/15 flex items-center justify-center shrink-0">
            <MapPin className="w-3 h-3 text-[#E8F0EB]" />
          </div>
          <p className="truncate font-medium tracking-wide">
            <span className="font-semibold text-[#DFD7C4]">Notice:</span>{' '}
            {generalInfo.relocationNotice}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={scrollToInfo}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#FAF9F5] hover:text-[#DFD7C4] underline underline-offset-4 font-medium transition-colors cursor-pointer"
          >
            <span>See New Map & Hours</span>
            <ArrowRight className="w-3 h-3" />
          </button>
          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss banner"
            className="p-1 rounded text-[#FAF9F5]/70 hover:text-[#FAF9F5] hover:bg-white/10 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
