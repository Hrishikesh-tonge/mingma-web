/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { CafeProvider, useCafe } from './context/CafeContext';
import { RelocationBanner } from './components/RelocationBanner';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LandingSlideshow } from './components/LandingSlideshow';
import { Speciality } from './components/Speciality';
import { MenuCatalog } from './components/MenuCatalog';
import { AboutStory } from './components/AboutStory';
import { CoffeeCorner } from './components/CoffeeCorner';
import { GeneralInfo } from './components/GeneralInfo';
import { Footer } from './components/Footer';
import { ItemDetailModal } from './components/ItemDetailModal';
import { TableQRModal } from './components/TableQRModal';
import { TableMenuView } from './components/TableMenuView';
import { AdminDashboard } from './components/AdminDashboard';

const CafeAppContent: React.FC = () => {
  const { isAdminView, setIsAdminView, isTableMenuView, setIsTableMenuView } = useCafe();

  // Support direct URL routing via pathname (/admin, /menu) or hash (#admin, #table-menu)
  useEffect(() => {
    const checkDirectRoutes = () => {
      const pathname = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      
      if (pathname === '/admin' || pathname === '/admin/' || hash === '#admin') {
        setIsAdminView(true);
        setIsTableMenuView(false);
      } else if (
        pathname === '/menu' ||
        pathname === '/menu/' ||
        hash === '#table-menu' ||
        hash === '#menu-direct' ||
        search.includes('view=menu') ||
        search.includes('menu=table') ||
        search.includes('table=')
      ) {
        setIsTableMenuView(true);
        setIsAdminView(false);
      }
    };
    checkDirectRoutes();
    window.addEventListener('popstate', checkDirectRoutes);
    window.addEventListener('hashchange', checkDirectRoutes);
    return () => {
      window.removeEventListener('popstate', checkDirectRoutes);
      window.removeEventListener('hashchange', checkDirectRoutes);
    };
  }, [setIsAdminView, setIsTableMenuView]);

  // Admin Dashboard view
  if (isAdminView) {
    return <AdminDashboard />;
  }

  // Streamlined Phone Table QR Menu View
  if (isTableMenuView) {
    return (
      <>
        <TableMenuView />
        <ItemDetailModal />
        <TableQRModal />
      </>
    );
  }

  // Standard Portfolio Website Flow
  return (
    <div className="min-h-screen bg-[#FAF9F5] text-stone-800 flex flex-col font-sans selection:bg-[#1F4231] selection:text-[#FAF9F5]">
      {/* Top Relocation Notification Banner */}
      <RelocationBanner />

      {/* Main Top Bar Contract Navbar */}
      <Navbar />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* Landing Page (Home) */}
        <Hero />

        {/* Space for Landing Image Slideshow */}
        <LandingSlideshow />

        {/* Their Speciality */}
        <Speciality />

        {/* The Menu */}
        <MenuCatalog />

        {/* About the Cafe */}
        <AboutStory />

        {/* Coffee Corner */}
        <CoffeeCorner />

        {/* General Info & Location (Google Maps) */}
        <GeneralInfo />
      </main>

      {/* Footer with subtle admin and table menu links */}
      <Footer />

      {/* Interactive Modal for detailed item craft information */}
      <ItemDetailModal />

      {/* Table QR Code & Link Generator Modal */}
      <TableQRModal />
    </div>
  );
};

export default function App() {
  return (
    <CafeProvider>
      <CafeAppContent />
    </CafeProvider>
  );
}
