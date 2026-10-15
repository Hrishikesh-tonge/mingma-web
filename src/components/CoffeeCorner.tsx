import React, { useState } from 'react';
import { Coffee, HelpCircle, CheckCircle2, ChevronRight, Sparkles, RefreshCw } from 'lucide-react';
import { COFFEE_TRIVIA_LIST } from '../data/defaultData';

export const CoffeeCorner: React.FC = () => {
  const [selectedTriviaIndex, setSelectedTriviaIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedMood, setSelectedMood] = useState<string>('morning-boost');

  const currentTrivia = COFFEE_TRIVIA_LIST[selectedTriviaIndex];

  const handleNext = () => {
    setShowAnswer(false);
    setSelectedTriviaIndex((prev) => (prev + 1) % COFFEE_TRIVIA_LIST.length);
  };

  const moods = [
    {
      id: 'morning-boost',
      label: 'Crisp Mountain Morning',
      recommendation: "Mingma's Himalayan Spiced Mocha",
      note: 'Infused with local cinnamon and green cardamom to warm you up in 10°C weather.',
      type: 'Espresso Craft'
    },
    {
      id: 'afternoon-reading',
      label: 'Afternoon Book & Vinyl',
      recommendation: 'Estate Pour-Over (Hario V60)',
      note: 'Baba Budangiri washed Arabica highlighting delicate jasmine and meyer lemon notes.',
      type: 'Manual Brew'
    },
    {
      id: 'post-trek',
      label: 'Post-Trek Recovery',
      recommendation: 'Truffle Scramble + Sea Salt Cold Brew',
      note: 'Protein-packed farm scramble with electrolyte pink salt honey iced coffee.',
      type: 'Brunch & Brew'
    },
    {
      id: 'evening-unwind',
      label: 'Gentle Sunset Unwind',
      recommendation: 'Spiced Kashmiri Kahwa Royale',
      note: 'Whole leaf green tea with crushed almonds, cinnamon bark, and saffron threads.',
      type: 'Himalayan Herbal'
    }
  ];

  const currentMoodObj = moods.find((m) => m.id === selectedMood) || moods[0];

  return (
    <section id="coffee-corner" className="py-24 bg-[#FAF9F5] border-t border-[#EDE8DC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#1F4231] uppercase tracking-wider mb-2">
            <Coffee className="w-3.5 h-3.5" />
            <span>Interactive Roastery Corner</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-stone-900 tracking-tight leading-tight">
            Coffee Corner: High-Altitude Science &amp; Trivia
          </h2>
          <p className="mt-3 text-base text-stone-600 font-light leading-relaxed">
            Curious why coffee tastes so different in Manali? Explore our high-altitude extraction science, interactive mountain trivia, and find your cup for today's weather.
          </p>
        </div>

        {/* 2-Column Split: Interactive Trivia on Left, Brew Mood Matcher on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Coffee Trivia Card */}
          <div className="lg:col-span-7 bg-[#F4F1EA] border border-[#E2DDD5] rounded-lg p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E2DDD5] mb-5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#1F4231]" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-800">
                    Himalayan Coffee Fact #{selectedTriviaIndex + 1}
                  </span>
                </div>
                <span className="text-xs font-mono text-stone-400">
                  {selectedTriviaIndex + 1} of {COFFEE_TRIVIA_LIST.length}
                </span>
              </div>

              {/* Question */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-[#1F4231] shrink-0 mt-0.5" />
                  <h3 className="text-xl font-serif text-stone-900 leading-snug">
                    {currentTrivia.question}
                  </h3>
                </div>

                {/* Answer reveal button or Answer body */}
                {!showAnswer ? (
                  <div className="pt-4">
                    <button
                      onClick={() => setShowAnswer(true)}
                      className="px-5 py-2.5 bg-[#1F4231] text-[#FAF9F5] text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-[#153324] transition-colors cursor-pointer flex items-center gap-2 shadow-2xs"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Reveal The Science</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4 pt-2 animate-in fade-in duration-200">
                    <div className="p-4 bg-[#FAF9F5] border border-[#E2DDD5] rounded-md">
                      <div className="flex items-start gap-2.5 text-[#1F4231] mb-2">
                        <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                        <span className="text-xs font-semibold uppercase tracking-wider">The Extraction Reality</span>
                      </div>
                      <p className="text-sm text-stone-700 font-light leading-relaxed">
                        {currentTrivia.answer}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-600">
                      <div className="p-3 bg-[#FAF9F5]/70 rounded-sm border border-[#E2DDD5]">
                        <span className="text-[10px] uppercase font-mono text-stone-400 block mb-0.5">Altitude Metric</span>
                        <p className="font-medium text-stone-800">{currentTrivia.altitudeFact}</p>
                      </div>
                      <div className="p-3 bg-[#FAF9F5]/70 rounded-sm border border-[#E2DDD5]">
                        <span className="text-[10px] uppercase font-mono text-stone-400 block mb-0.5">Barista Tip</span>
                        <p className="font-light text-stone-700">{currentTrivia.tip}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Nav for Trivia */}
            <div className="mt-8 pt-4 border-t border-[#E2DDD5] flex items-center justify-between">
              <span className="text-xs text-stone-500 font-light">
                Brewing science tested at 2,050 meters
              </span>
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1F4231] hover:text-[#153324] transition-colors cursor-pointer"
              >
                <span>Next Trivia</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Mood-to-Brew Matcher */}
          <div className="lg:col-span-5 bg-[#FAF9F5] border border-[#E2DDD5] rounded-lg p-6 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-[#EDE8DC] mb-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-900">
                Pick Your Mountain Vibe
              </span>
              <RefreshCw className="w-3.5 h-3.5 text-stone-400" />
            </div>

            <p className="text-xs text-stone-500 mb-4 font-light">
              Select how your Manali day is feeling, and we will pair the ideal sip:
            </p>

            {/* Mood selector buttons */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              {moods.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedMood(m.id)}
                  className={`p-2.5 text-left rounded-sm border transition-all cursor-pointer ${
                    selectedMood === m.id
                      ? 'bg-[#1F4231] text-[#FAF9F5] border-[#1F4231]'
                      : 'bg-[#F4F1EA] text-stone-700 border-[#E2DDD5] hover:border-stone-400'
                  }`}
                >
                  <span className="block text-xs font-medium leading-tight">{m.label}</span>
                </button>
              ))}
            </div>

            {/* Recommendation Result Card */}
            <div className="p-5 bg-[#F4F1EA] border border-[#E2DDD5] rounded-md space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#1F4231] font-semibold">
                  {currentMoodObj.type}
                </span>
                <span className="text-xs text-stone-400">Craft Pairing</span>
              </div>

              <h4 className="text-lg font-serif text-stone-900">
                {currentMoodObj.recommendation}
              </h4>

              <p className="text-xs text-stone-600 font-light leading-relaxed">
                {currentMoodObj.note}
              </p>

              <div className="pt-2 border-t border-[#E2DDD5] flex justify-end">
                <a
                  href="#menu"
                  className="text-xs font-medium text-[#1F4231] hover:underline"
                >
                  Find in The Menu &rarr;
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
