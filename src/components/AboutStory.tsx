import React from 'react';
import { Mountain, Compass, Sparkles } from 'lucide-react';
import { useCafe } from '../context/CafeContext';

export const AboutStory: React.FC = () => {
  const { cafeStory } = useCafe();

  return (
    <section id="story" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Top Section Header */}
      <div className="max-w-3xl mb-14">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#1F4231] uppercase tracking-wider mb-2">
          <Compass className="w-3.5 h-3.5" />
          <span>Our Origin &amp; Path</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-stone-900 tracking-tight leading-tight">
          {cafeStory.title}
        </h2>
        <p className="mt-3 text-base text-stone-600 font-light leading-relaxed">
          {cafeStory.subtitle}
        </p>
      </div>

      {/* Main 2-Column Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column: Narrative Prose */}
        <div className="lg:col-span-7 space-y-6 text-stone-600 font-light leading-relaxed text-base sm:text-lg">
          {cafeStory.paragraphs.map((p, idx) => (
            <p key={idx} className="first-letter:text-3xl first-letter:font-serif first-letter:text-stone-900 first-letter:mr-1">
              {p}
            </p>
          ))}

          {/* Founder Quote */}
          {cafeStory.philosophyQuotes && cafeStory.philosophyQuotes.length > 0 && (
            <div className="my-8 p-6 sm:p-8 bg-[#F4F1EA] border border-[#E2DDD5] rounded-md relative">
              <Sparkles className="w-5 h-5 text-[#1F4231] mb-3" />
              <blockquote className="font-serif italic text-lg sm:text-xl text-stone-900 leading-snug">
                "{cafeStory.philosophyQuotes[0].quote}"
              </blockquote>
              <cite className="block mt-4 text-xs font-sans font-medium uppercase tracking-wider text-stone-500 not-italic">
                — {cafeStory.philosophyQuotes[0].author}
              </cite>
            </div>
          )}
        </div>

        {/* Right Column: Architectural Mountain Stats Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#FAF9F5] border border-[#E2DDD5] rounded-lg p-6 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-[#EDE8DC] mb-6">
              <div className="flex items-center gap-2">
                <Mountain className="w-4 h-4 text-[#1F4231]" />
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-900">
                  Himalayan Brew Specifications
                </span>
              </div>
              <span className="text-[11px] font-mono text-stone-400">PIR PANJAL RANGE</span>
            </div>

            <div className="space-y-6">
              {cafeStory.stats.map((stat, idx) => (
                <div key={idx} className="flex items-start justify-between pb-4 border-b border-stone-100 last:border-0 last:pb-0">
                  <div>
                    <span className="text-xs text-stone-500 block">{stat.label}</span>
                    <span className="text-xs text-stone-400 font-light mt-0.5 block">{stat.detail}</span>
                  </div>
                  <span className="text-2xl font-serif font-light text-stone-900 tabular-nums">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-5 border-t border-[#EDE8DC] bg-[#E8F0EB]/60 p-4 rounded-sm">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#1F4231] font-bold block mb-1">
                The Relocation Note
              </span>
              <p className="text-xs text-stone-700 leading-relaxed">
                Formerly nestled in Old Manali, Mingma's relocated to Mall Road to provide accessible ground-floor seating, dedicated high-altitude pour-over bar, and an open sourdough hearth.
              </p>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
};
