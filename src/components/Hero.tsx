import React from 'react';
import { ArrowDown, Sparkles, MapPin, Coffee, Utensils, Compass } from 'lucide-react';
import { useCafe } from '../context/CafeContext';

export const Hero: React.FC = () => {
  const { generalInfo, setActiveSection } = useCafe();

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative pt-12 pb-20 sm:pt-16 sm:pb-28 overflow-hidden">
      {/* Background subtle noise and geometric ambient accents */}
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-40" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#1F4231]/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#DFD7C4]/30 rounded-full blur-2xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top metadata kicker - Zero-pill discipline */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-stone-500 mb-6">
          <span className="text-[#1F4231] font-semibold tracking-wider uppercase">Manali, Himachal Pradesh</span>
          <span aria-hidden="true" className="text-stone-300">·</span>
          <span>Elevation 2,050 Meters</span>
          <span aria-hidden="true" className="text-stone-300">·</span>
          <span>Now on Mall Road</span>
          <span aria-hidden="true" className="text-stone-300">·</span>
          <span>All-Day Brunch & Roastery</span>
        </div>

        {/* 2-Column Split: Editorial Typography on Left, Abstract Architectural Composition on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Headlines & Brand Voice */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#E8F0EB] text-[#1F4231] text-xs font-semibold tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Coffee Shop · Cafe · Bakery</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-stone-900 tracking-tight leading-[1.12] text-balance">
                Slow coffee &amp; all-day brunch, high in the <span className="italic font-normal text-[#1F4231]">Manali pines</span>.
              </h1>
            </div>

            <p className="text-base sm:text-lg text-stone-600 font-sans leading-relaxed max-w-2xl font-light">
              Welcome to <span className="font-medium text-stone-900">Mingma's</span>. Born in the quiet lanes of Old Manali and now rooted in our sunlit sanctuary on <span className="font-medium text-stone-900">Mall Road</span>. We calibrate single-origin Indian coffees for Himalayan high altitude and bake wild sourdough every single morning.
            </p>

            {/* Editorial Feature Highlights */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-2 border-t border-[#EDE8DC]">
              <div>
                <p className="text-xl sm:text-2xl font-serif font-normal text-stone-900">2,050<span className="text-xs sm:text-sm font-sans text-stone-500 ml-0.5">m</span></p>
                <p className="text-[10px] sm:text-xs text-stone-500 mt-0.5 leading-tight">High altitude boiling (93°C)</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-serif font-normal text-stone-900">All-Day</p>
                <p className="text-[10px] sm:text-xs text-stone-500 mt-0.5 leading-tight">Brunch served till 5 PM</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-serif font-normal text-stone-900">36<span className="text-xs sm:text-sm font-sans text-stone-500 ml-0.5">hrs</span></p>
                <p className="text-[10px] sm:text-xs text-stone-500 mt-0.5 leading-tight">Mountain sourdough</p>
              </div>
            </div>

            {/* CTAs - Phone optimized full-width stacking */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3.5 pt-3">
              <button
                onClick={() => scrollTo('menu')}
                className="px-5 py-3 bg-[#1F4231] text-[#FAF9F5] text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-[#153324] transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2 touch-manipulation min-h-[44px]"
              >
                <Utensils className="w-4 h-4" />
                <span>Explore The Menu</span>
              </button>

              <button
                onClick={() => scrollTo('speciality')}
                className="px-5 py-3 bg-white sm:bg-transparent text-stone-800 border border-stone-300 text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-stone-100 hover:border-stone-400 transition-all cursor-pointer flex items-center justify-center gap-2 touch-manipulation min-h-[44px]"
              >
                <Coffee className="w-4 h-4 text-[#1F4231]" />
                <span>Signature Offerings</span>
              </button>

              <button
                onClick={() => scrollTo('info')}
                className="text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors flex items-center justify-center sm:justify-start gap-1.5 py-2 px-1 cursor-pointer min-h-[36px]"
              >
                <MapPin className="w-3.5 h-3.5 text-[#1F4231]" />
                <span>Mall Road Location &amp; Map</span>
              </button>
            </div>
          </div>

          {/* Right Column: Abstract Minimalist Graphic Composition */}
          <div className="lg:col-span-5 relative">
            
            {/* Visual Frame mimicking modern architectural cafe portfolio */}
            <div className="relative bg-[#F4F1EA] border border-[#E2DDD5] rounded-lg p-6 sm:p-8 shadow-xs overflow-hidden">
              
              {/* Subtle mountain ridge silhouette SVG */}
              <div className="absolute top-0 right-0 w-64 h-32 opacity-15 pointer-events-none">
                <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full stroke-stone-800">
                  <path d="M0 90 L40 50 L80 75 L120 30 L160 65 L200 20" strokeWidth="1.5" strokeDasharray="3 3" />
                  <path d="M20 95 L70 45 L110 60 L150 25 L190 50" strokeWidth="1" />
                </svg>
              </div>

              {/* Cafe Emblem & Visual Vibe Card */}
              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between pb-4 border-b border-[#E2DDD5]">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#1F4231] text-[#FAF9F5] px-3 py-1 font-serif text-lg tracking-tight rounded-xs lowercase">
                      mingma's
                    </div>
                    <div>
                      <span className="block text-xs font-semibold text-stone-800 uppercase tracking-wider">Himalayan Roastery</span>
                      <span className="text-[11px] text-stone-500">Established in Old Manali</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-stone-400">EST. 2021</span>
                </div>

                {/* Abstract Visual Centerpiece */}
                <div className="relative aspect-4/3 bg-[#FAF9F5] rounded-md border border-[#E5E0D5] p-5 flex flex-col justify-between overflow-hidden group">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-[#1F4231] font-semibold">Specialty Profile</span>
                      <h2 className="text-base font-serif font-medium text-stone-900">Manali High Altitude V60</h2>
                      <p className="text-xs text-stone-500">Washed Arabica · Baba Budangiri Estate</p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-[#E8F0EB] text-[#1F4231] flex items-center justify-center shrink-0">
                      <Compass className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Minimalist Graphic Extraction Diagram */}
                  <div className="py-3">
                    <div className="flex items-end justify-between h-14 gap-1 px-1">
                      {[40, 65, 85, 95, 75, 55, 30].map((h, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                          <div
                            style={{ height: `${h}%` }}
                            className={`w-full rounded-xs transition-all duration-300 ${
                              i === 3 ? 'bg-[#1F4231]' : 'bg-[#1F4231]/20'
                            }`}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between text-[10px] font-mono text-stone-400 mt-2 px-1">
                      <span>Bloom (0:45)</span>
                      <span className="text-[#1F4231] font-semibold">Peak Extraction</span>
                      <span>Finish (2:30)</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-3 border-t border-stone-100 text-stone-600">
                    <span className="italic font-serif">Notes: Meyer Lemon, Wildflower Honey</span>
                    <span className="font-mono text-xs font-semibold text-stone-900">₹250</span>
                  </div>
                </div>

                {/* Relocation Badge Card */}
                <div className="bg-[#FAF9F5] border border-[#E2DDD5] p-4 rounded-md flex items-center gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-[#1F4231] text-[#FAF9F5] flex items-center justify-center shrink-0 text-xs font-serif font-bold">
                    M
                  </div>
                  <div className="text-xs">
                    <p className="font-semibold text-stone-900">Now on Mall Road, Manali</p>
                    <p className="text-stone-500">Relocated from Old Manali · Open daily from 8:00 AM</p>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Quiet scroll indicator */}
        <div className="flex justify-center mt-12 sm:mt-16">
          <button
            onClick={() => scrollTo('menu')}
            className="group flex flex-col items-center gap-1.5 text-xs text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
            aria-label="Scroll to menu section"
          >
            <span className="tracking-widest uppercase text-[10px]">Scroll Down</span>
            <ArrowDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-1" />
          </button>
        </div>

      </div>
    </section>
  );
};
