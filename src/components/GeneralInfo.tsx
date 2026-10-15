import React from 'react';
import { MapPin, Clock, Phone, Mail, Instagram, Wifi, AlertCircle, Compass, ArrowUpRight } from 'lucide-react';
import { useCafe } from '../context/CafeContext';

export const GeneralInfo: React.FC = () => {
  const { generalInfo } = useCafe();

  return (
    <section id="info" className="py-24 bg-[#F4F1EA] border-t border-[#E2DDD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#1F4231] uppercase tracking-wider mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>Visiting Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-stone-900 tracking-tight leading-tight">
            General Info &amp; Location
          </h2>
          <p className="mt-3 text-base text-stone-600 font-light leading-relaxed">
            Everything you need for your visit to Mingma's. Step in for quiet morning coffee, hearty mountain brunch, or a warm loaf of sourdough.
          </p>
        </div>

        {/* Relocation Announcement Banner Card */}
        <div className="mb-10 bg-[#1F4231] text-[#FAF9F5] p-5 sm:p-6 rounded-lg shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center shrink-0 mt-0.5">
              <AlertCircle className="w-5 h-5 text-[#DFD7C4]" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-[#DFD7C4] font-semibold block mb-0.5">
                Important Relocation Notice
              </span>
              <p className="text-sm sm:text-base font-serif text-[#FAF9F5]">
                {generalInfo.relocationNotice}
              </p>
              <p className="text-xs text-stone-300 mt-1 font-light">
                Please do not visit the Old Manali location as our entire team and kitchen have moved to Mall Road.
              </p>
            </div>
          </div>
          <a
            href={generalInfo.googleMapsShareUrl || "https://maps.app.goo.gl/2UpQbYcdeK6t3T2B9"}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-[#FAF9F5] text-[#1F4231] text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-[#DFD7C4] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-2xs"
          >
            <span>Open in Google Maps</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Main Grid: Details on Left, Google Maps on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Details Column */}
          <div className="lg:col-span-5 bg-[#FAF9F5] border border-[#E2DDD5] rounded-lg p-6 sm:p-8 flex flex-col justify-between space-y-8">
            
            {/* Address */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-800">
                <MapPin className="w-4 h-4 text-[#1F4231]" />
                <span>Our Address</span>
              </div>
              <p className="text-base font-serif text-stone-900 leading-snug">
                {generalInfo.address}
              </p>
              <p className="text-xs text-stone-500 font-light">
                {generalInfo.city}, {generalInfo.state} {generalInfo.pincode}
              </p>
              <p className="text-xs text-stone-400 italic">
                Landmark: {generalInfo.landmark}
              </p>
            </div>

            {/* Operating Hours */}
            <div className="space-y-2 pt-5 border-t border-[#EDE8DC]">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-800">
                <Clock className="w-4 h-4 text-[#1F4231]" />
                <span>Operating Timings</span>
              </div>
              <div className="text-xs space-y-1.5 text-stone-600">
                <div className="flex justify-between">
                  <span className="font-medium text-stone-800">Monday – Friday:</span>
                  <span className="font-mono text-stone-700">{generalInfo.hoursWeekday}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-stone-800">Saturday – Sunday:</span>
                  <span className="font-mono text-stone-700">{generalInfo.hoursWeekend}</span>
                </div>
                <div className="flex justify-between pt-1 text-[#1F4231] font-medium">
                  <span>All-Day Brunch:</span>
                  <span>{generalInfo.brunchHours}</span>
                </div>
              </div>
            </div>

            {/* Wi-Fi & Amenities */}
            <div className="space-y-2 pt-5 border-t border-[#EDE8DC]">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-800">
                <Wifi className="w-4 h-4 text-[#1F4231]" />
                <span>Connectivity &amp; Space</span>
              </div>
              <p className="text-xs text-stone-600 font-light leading-relaxed">
                {generalInfo.wifiNote}
              </p>
              <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-stone-500">
                {generalInfo.amenities.map((item, i) => (
                  <span key={i} className="inline-block bg-[#F4F1EA] px-2 py-0.5 rounded-xs border border-[#E2DDD5]">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="pt-5 border-t border-[#EDE8DC] flex flex-wrap gap-4 text-xs text-stone-600">
              <a
                href={`tel:${generalInfo.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-1.5 hover:text-[#1F4231] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#1F4231]" />
                <span>{generalInfo.phone}</span>
              </a>
              <a
                href={`mailto:${generalInfo.email}`}
                className="flex items-center gap-1.5 hover:text-[#1F4231] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#1F4231]" />
                <span>{generalInfo.email}</span>
              </a>
              <span className="flex items-center gap-1.5 text-stone-500">
                <Instagram className="w-3.5 h-3.5 text-[#1F4231]" />
                <span>{generalInfo.instagram}</span>
              </span>
            </div>

          </div>

          {/* Google Maps Embed Column */}
          <div className="lg:col-span-7 bg-[#FAF9F5] border border-[#E2DDD5] rounded-lg overflow-hidden flex flex-col justify-between shadow-xs">
            <div className="p-4 sm:p-5 border-b border-[#EDE8DC] flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-800">
                  Google Maps Location
                </span>
                <p className="text-xs text-stone-500 font-light">
                  1st Floor, Hotel Solang, Mall Road, Siyal, Manali 175131
                </p>
              </div>
              <span className="text-[11px] font-mono text-[#1F4231] bg-[#E8F0EB] px-2.5 py-1 rounded-xs font-medium">
                Live Embed
              </span>
            </div>

            {/* Responsive Iframe Container */}
            <div className="relative w-full h-[360px] sm:h-[420px] bg-stone-100">
              <iframe
                title="Mingma's Coffee Shop & Cafe Location on Mall Road Manali"
                src={generalInfo.mapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full filter saturate-[0.85] contrast-[1.05]"
              />
            </div>

            <div className="p-4 bg-[#FAF9F5] border-t border-[#EDE8DC] flex items-center justify-between text-xs text-stone-500">
              <span>Directions: 1st Floor, Hotel Solang, Mall Road, Manali.</span>
              <a
                href={generalInfo.googleMapsShareUrl || "https://maps.app.goo.gl/2UpQbYcdeK6t3T2B9"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1F4231] font-semibold hover:underline flex items-center gap-1 shrink-0"
              >
                <span>Get Directions</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
