import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, QrCode } from 'lucide-react';
import { useCafe } from '../context/CafeContext';

export const Navbar: React.FC = () => {
  const { activeSection, setActiveSection, setIsAdminView, isAdminView, setShowQrModal } = useCafe();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'menu', label: 'The Menu' },
    { id: 'speciality', label: 'Our Speciality' },
    { id: 'story', label: 'About Cafe' },
    { id: 'coffee-corner', label: 'Coffee Corner' },
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    if (isAdminView) {
      setIsAdminView(false);
    }
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleVisitClick = () => {
    setMobileMenuOpen(false);
    if (isAdminView) {
      setIsAdminView(false);
    }
    setActiveSection('info');
    const el = document.getElementById('info');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-200 ${
        scrolled
          ? 'bg-[#FAF9F5]/95 backdrop-blur-md border-b border-[#EDE8DC] shadow-[0_2px_12px_rgba(0,0,0,0.03)]'
          : 'bg-[#FAF9F5] border-b border-[#EDE8DC]/70'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Brand Wordmark (Green banner cartouche matching cafe logo) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
            >
              <div className="bg-[#1F4231] text-[#FAF9F5] px-3.5 py-1.5 rounded-sm tracking-tight font-serif text-xl sm:text-2xl font-normal lowercase shadow-xs transition-transform group-hover:scale-[1.02]">
                mingma's
              </div>
              <div className="hidden sm:flex flex-col text-[11px] leading-tight text-stone-500 font-sans uppercase tracking-widest pl-1">
                <span className="font-semibold text-stone-700">Coffee · Cafe · Bakery</span>
                <span>Mall Road, Manali</span>
              </div>
            </button>
          </div>

          {/* Zone 2: 4–5 Single-Line Clean Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-600">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`relative py-1 transition-colors whitespace-nowrap shrink-0 hover:text-[#1F4231] cursor-pointer ${
                  activeSection === link.id ? 'text-[#1F4231] font-semibold' : 'text-stone-600'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1F4231] rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Zone 3: 1 Primary Action + Quick QR Menu */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <button
              onClick={() => setShowQrModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#1F4231] bg-[#E8F0EB] hover:bg-[#D5E4D9] rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer border border-[#D5E4D9]"
              title="Table QR digital menu link"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Table QR</span>
            </button>
            <button
              onClick={handleVisitClick}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-wide uppercase text-[#FAF9F5] bg-[#1F4231] rounded-sm hover:bg-[#153324] transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
            >
              <span>Visit & Location</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setShowQrModal(true)}
              className="p-2 text-[#1F4231] bg-[#E8F0EB] rounded-md transition-colors cursor-pointer"
              aria-label="Table QR Menu"
            >
              <QrCode className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-stone-700 hover:text-[#1F4231] hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF9F5] border-b border-[#EDE8DC] px-5 py-6 space-y-4 shadow-lg animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="text-xs uppercase tracking-widest text-stone-400 font-medium pb-1 border-b border-stone-200">
            Navigation
          </div>
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left text-base font-serif py-1.5 transition-colors cursor-pointer ${
                  activeSection === link.id ? 'text-[#1F4231] font-semibold' : 'text-stone-700'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-stone-200 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setShowQrModal(true);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold uppercase tracking-wider bg-[#E8F0EB] text-[#1F4231] border border-[#D5E4D9] rounded-sm transition-colors cursor-pointer"
            >
              <QrCode className="w-4 h-4" />
              <span>Table QR Menu Link</span>
            </button>
            <button
              onClick={handleVisitClick}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold uppercase tracking-wider bg-[#1F4231] text-[#FAF9F5] rounded-sm hover:bg-[#153324] transition-colors cursor-pointer"
            >
              <span>Location, Timings & Directions</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
