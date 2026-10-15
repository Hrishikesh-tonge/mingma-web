import { Lock, Heart, ArrowUp, QrCode } from 'lucide-react';
import { useCafe } from '../context/CafeContext';

export const Footer: React.FC = () => {
  const { generalInfo, setIsAdminView, setShowQrModal } = useCafe();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#FAF9F5] border-t border-[#EDE8DC] pt-16 pb-12 text-stone-600 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#EDE8DC]">
          
          {/* Brand lockup */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <span className="bg-[#1F4231] text-[#FAF9F5] px-3.5 py-1.5 font-serif text-xl tracking-tight rounded-xs lowercase">
                mingma's
              </span>
              <div className="text-xs uppercase tracking-widest text-stone-500 font-medium">
                <span className="font-semibold text-stone-800">Coffee · Cafe · Bakery</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-500 font-light leading-relaxed max-w-sm">
              Artisanal single-origin coffee calibrated for 2,050 meters elevation, all-day brunch, and slow-fermented Himalayan sourdough on Mall Road, Manali.
            </p>

            <div className="text-xs text-[#1F4231] font-medium pt-1">
              <span>Notice: Relocated from Old Manali to Mall Road (175131).</span>
            </div>
          </div>

          {/* Location & Contact */}
          <div className="lg:col-span-3 space-y-2 text-xs">
            <span className="font-semibold uppercase tracking-wider text-stone-800 block mb-2">
              Sanctuary Location
            </span>
            <p className="text-stone-700 font-medium">
              {generalInfo.address}
            </p>
            <p className="text-stone-500">
              {generalInfo.city}, {generalInfo.state} {generalInfo.pincode}
            </p>
            <p className="text-stone-400 italic pt-1">
              Opposite Pine Boulevard
            </p>
            <div className="pt-2 text-stone-600 space-y-1">
              <p>Phone: {generalInfo.phone}</p>
              <p>Email: {generalInfo.email}</p>
            </div>
          </div>

          {/* Timings */}
          <div className="lg:col-span-2 space-y-2 text-xs">
            <span className="font-semibold uppercase tracking-wider text-stone-800 block mb-2">
              Hours
            </span>
            <p className="text-stone-600">
              Mon – Fri: 8:00 AM – 10:00 PM
            </p>
            <p className="text-stone-600">
              Sat – Sun: 8:00 AM – 10:30 PM
            </p>
            <p className="text-[#1F4231] font-medium pt-1">
              All-Day Brunch till 5:00 PM
            </p>
            <p className="text-stone-400 text-[11px] pt-1">
              High-Speed Fiber Wi-Fi Available
            </p>
          </div>

          {/* Quick links & Scroll to top */}
          <div className="lg:col-span-2 flex flex-col justify-between space-y-4 text-xs">
            <div className="space-y-1.5">
              <span className="font-semibold uppercase tracking-wider text-stone-800 block mb-2">
                Sections
              </span>
              <div><a href="#menu" className="hover:text-[#1F4231] transition-colors">The Menu</a></div>
              <div><a href="#speciality" className="hover:text-[#1F4231] transition-colors">Their Speciality</a></div>
              <div><a href="#story" className="hover:text-[#1F4231] transition-colors">About Cafe</a></div>
              <div><a href="#coffee-corner" className="hover:text-[#1F4231] transition-colors">Coffee Corner</a></div>
              <div><a href="#info" className="hover:text-[#1F4231] transition-colors">Map &amp; Info</a></div>
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-stone-500 hover:text-stone-900 transition-colors cursor-pointer text-xs self-start"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Subtle Admin Access Link */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()} Mingma's Coffee Shop &amp; Cafe. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowQrModal(true)}
              className="inline-flex items-center gap-1 text-[#1F4231] hover:text-[#153324] font-medium transition-colors cursor-pointer p-1"
              title="Table QR Digital Menu Link"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span className="text-[11px]">Table QR Menu</span>
            </button>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="text-stone-400">
              Mall Road, Manali, HP 175131
            </span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            {/* Hidden admin access */}
            <button
              onClick={() => setIsAdminView(true)}
              className="inline-flex items-center gap-1 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer p-1 rounded"
              title="Content Manager (Admin)"
              aria-label="Open Admin Content Manager"
            >
              <Lock className="w-3 h-3 text-stone-400" />
              <span className="text-[11px]">Admin CMS</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
