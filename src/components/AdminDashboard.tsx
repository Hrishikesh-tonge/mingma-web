import React, { useState, useRef } from 'react';
import {
  ArrowLeft,
  Plus,
  Trash2,
  Edit2,
  Save,
  RotateCcw,
  Download,
  Upload,
  Check,
  X,
  FileText,
  Coffee,
  Sparkles,
  MapPin,
  Image as ImageIcon,
  Sliders,
  ExternalLink,
  QrCode,
  Lock,
  LogOut,
  KeyRound,
  ShieldCheck,
  ShieldAlert,
  Eye,
  EyeOff,
  AlertTriangle
} from 'lucide-react';
import { useCafe } from '../context/CafeContext';
import { MenuItem, SlideItem } from '../types/cafe';
import { AdminLogin } from './AdminLogin';
import {
  isSessionAuthenticated,
  clearSession,
  getAuthorizedUsername,
  verifyCredentials,
  updateAdminCredentials,
  resetCredentialsToDefault,
} from '../utils/auth';

export const AdminDashboard: React.FC = () => {
  const {
    menuItems,
    generalInfo,
    cafeStory,
    setIsAdminView,
    setShowQrModal,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    updateGeneralInfo,
    updateSlideshowImages,
    updateCafeStory,
    resetToDefaults,
    exportDataJSON,
    importDataJSON,
  } = useCafe();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => isSessionAuthenticated());
  const [activeTab, setActiveTab] = useState<'menu' | 'slideshow' | 'info' | 'story' | 'security'>('menu');
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [importJsonText, setImportJsonText] = useState('');
  const [showImportModal, setShowImportModal] = useState(false);

  // Security & Authentication states
  const [currentUsername, setCurrentUsername] = useState(getAuthorizedUsername());
  const [authForm, setAuthForm] = useState({
    currentPassword: '',
    newUsername: getAuthorizedUsername(),
    newPassword: '',
    confirmPassword: '',
  });
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [securityMessage, setSecurityMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isUpdatingAuth, setIsUpdatingAuth] = useState(false);

  // General info form local state
  const [infoForm, setInfoForm] = useState(generalInfo);
  // Story form local state
  const [storyForm, setStoryForm] = useState(cafeStory);
  // Slideshow form state
  const [slideshowList, setSlideshowList] = useState<SlideItem[]>(generalInfo.slideshowImages || []);
  const [editingSlide, setEditingSlide] = useState<SlideItem | null>(null);
  const [isCreatingSlide, setIsCreatingSlide] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const slideFileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Guard: If unauthenticated, show the secure AdminLogin gateway
  if (!isAuthenticated) {
    return (
      <AdminLogin
        onSuccess={() => setIsAuthenticated(true)}
        onCancel={() => {
          setIsAdminView(false);
          if (window.location.hash === '#admin') {
            window.location.hash = '';
          }
        }}
      />
    );
  }

  const handleSignOut = () => {
    clearSession();
    setIsAuthenticated(false);
    setIsAdminView(false);
    if (window.location.hash === '#admin') {
      window.location.hash = '';
    }
  };

  const handleUpdateAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setSecurityMessage(null);

    if (!authForm.currentPassword) {
      setSecurityMessage({ type: 'error', text: 'Please enter your current password to verify identity.' });
      return;
    }

    if (!authForm.newUsername.trim()) {
      setSecurityMessage({ type: 'error', text: 'Authorised ID / Username cannot be empty.' });
      return;
    }

    if (authForm.newPassword.length < 6) {
      setSecurityMessage({ type: 'error', text: 'New password must be at least 6 characters.' });
      return;
    }

    if (authForm.newPassword !== authForm.confirmPassword) {
      setSecurityMessage({ type: 'error', text: 'New password and confirmation do not match.' });
      return;
    }

    setIsUpdatingAuth(true);
    try {
      const isCurrentValid = await verifyCredentials(currentUsername, authForm.currentPassword);
      if (!isCurrentValid) {
        setSecurityMessage({ type: 'error', text: 'Current password is incorrect. Please check and try again.' });
        setIsUpdatingAuth(false);
        return;
      }

      const ok = await updateAdminCredentials(authForm.newUsername, authForm.newPassword);
      if (ok) {
        setCurrentUsername(authForm.newUsername);
        setSecurityMessage({ type: 'success', text: 'Security credentials updated and SHA-256 hashed successfully!' });
        showToast('Admin password updated successfully');
        setAuthForm({
          currentPassword: '',
          newUsername: authForm.newUsername,
          newPassword: '',
          confirmPassword: '',
        });
      } else {
        setSecurityMessage({ type: 'error', text: 'Failed to update credentials. Please try again.' });
      }
    } catch {
      setSecurityMessage({ type: 'error', text: 'Error verifying credentials.' });
    } finally {
      setIsUpdatingAuth(false);
    }
  };

  const handleResetAuthToDefaults = () => {
    if (window.confirm('Reset admin credentials to default (Username: "admin", Password: "mingma@manali")?')) {
      resetCredentialsToDefault();
      setCurrentUsername('admin');
      setAuthForm({
        currentPassword: '',
        newUsername: 'admin',
        newPassword: '',
        confirmPassword: '',
      });
      setSecurityMessage({ type: 'success', text: 'Restored default credentials: ID "admin", Password "mingma@manali".' });
      showToast('Credentials reset to defaults');
    }
  };

  // New item template
  const defaultNewItem: Omit<MenuItem, 'id'> = {
    name: '',
    category: 'coffee',
    price: 220,
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    description: '',
    tastingNotes: ['Silky', 'Aromatic'],
    dietary: ['veg'],
    isSpeciality: false,
    specialityReason: '',
    available: true,
    pairing: ''
  };

  const [itemForm, setItemForm] = useState<Omit<MenuItem, 'id'> | MenuItem>(defaultNewItem);

  const handleStartCreate = () => {
    setItemForm(defaultNewItem);
    setIsCreatingNew(true);
    setEditingItem(null);
  };

  const handleStartEdit = (item: MenuItem) => {
    setItemForm({ ...item });
    setEditingItem(item);
    setIsCreatingNew(false);
  };

  // Handle image upload from disk (converts to Base64 Data URL)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (JPEG, PNG, WebP, etc.).');
      return;
    }

    // Limit size to ~4MB for localStorage comfort
    if (file.size > 4 * 1024 * 1024) {
      alert('Image size is too large. Please select an image under 4MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setItemForm((prev) => ({ ...prev, imageUrl: result }));
      showToast('Image uploaded successfully!');
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveItemImage = () => {
    setItemForm((prev) => ({ ...prev, imageUrl: '' }));
    showToast('Image removed from item');
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemForm.name || !itemForm.description) {
      alert('Please provide item name and description.');
      return;
    }

    if (isCreatingNew) {
      addMenuItem(itemForm);
      showToast(`Created "${itemForm.name}" successfully!`);
    } else if (editingItem) {
      updateMenuItem(itemForm as MenuItem);
      showToast(`Updated "${itemForm.name}" successfully!`);
    }
    setIsCreatingNew(false);
    setEditingItem(null);
  };

  const handleDeleteItem = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteMenuItem(id);
      showToast(`Deleted "${name}"`);
    }
  };

  // Slideshow management
  const defaultNewSlide: SlideItem = {
    id: `slide-${Date.now()}`,
    url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1600&q=85',
    title: 'Himalayan Morning Light',
    subtitle: 'Mall Road, Manali · Elevation 2,050m',
    caption: 'Reclaimed pine tables, aromatic steam, and mountain light.'
  };

  const [slideForm, setSlideForm] = useState<SlideItem>(defaultNewSlide);

  const handleSlideFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setSlideForm((prev) => ({ ...prev, url: result }));
      showToast('Slide image uploaded!');
    };
    reader.readAsDataURL(file);
  };

  const handleSaveSlide = (e: React.FormEvent) => {
    e.preventDefault();
    if (!slideForm.title || !slideForm.url) {
      alert('Please provide slide title and image.');
      return;
    }

    let updated: SlideItem[];
    if (isCreatingSlide) {
      updated = [...slideshowList, { ...slideForm, id: `slide-${Date.now()}` }];
    } else {
      updated = slideshowList.map((s) => (s.id === slideForm.id ? slideForm : s));
    }

    setSlideshowList(updated);
    updateSlideshowImages(updated);
    showToast('Slideshow updated!');
    setIsCreatingSlide(false);
    setEditingSlide(null);
  };

  const handleDeleteSlide = (id: string) => {
    if (slideshowList.length <= 1) {
      alert('You must have at least one slide in the landing slideshow.');
      return;
    }
    const updated = slideshowList.filter((s) => s.id !== id);
    setSlideshowList(updated);
    updateSlideshowImages(updated);
    showToast('Slide removed.');
  };

  const handleSaveInfo = (e: React.FormEvent) => {
    e.preventDefault();
    updateGeneralInfo(infoForm);
    showToast('General Info & Notice updated successfully!');
  };

  const handleSaveStory = (e: React.FormEvent) => {
    e.preventDefault();
    updateCafeStory(storyForm);
    showToast('Story & Philosophy copy updated successfully!');
  };

  const handleResetData = () => {
    if (window.confirm('Reset all menu items, images, general info, and copy to original default state?')) {
      resetToDefaults();
      showToast('Reset to original default configuration.');
      window.location.reload();
    }
  };

  const handleExport = () => {
    const jsonStr = exportDataJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mingmas-cafe-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    showToast('Backup JSON downloaded!');
  };

  const handleImportSubmit = () => {
    if (!importJsonText.trim()) return;
    const ok = importDataJSON(importJsonText);
    if (ok) {
      showToast('Data imported successfully!');
      setShowImportModal(false);
      setImportJsonText('');
      window.location.reload();
    } else {
      alert('Invalid JSON format. Please verify the backup JSON structure.');
    }
  };

  const filteredItems = menuItems.filter((i) => {
    if (filterCategory === 'all') return true;
    return i.category === filterCategory;
  });

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-stone-800 pb-20">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1F4231] text-[#FAF9F5] px-4 py-3 rounded-md shadow-lg text-xs font-medium flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <Check className="w-4 h-4 text-[#DFD7C4]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Admin Navigation Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#EDE8DC] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAdminView(false)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-sm transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Live Site</span>
            </button>
            <div className="h-4 w-px bg-stone-200" />
            <div className="flex items-center gap-2">
              <span className="bg-[#1F4231] text-[#FAF9F5] px-2.5 py-0.5 rounded-xs font-serif text-sm lowercase">
                mingma's
              </span>
              <span className="text-xs font-medium text-stone-500 uppercase tracking-widest hidden sm:inline">
                Content Manager
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowQrModal(true)}
              title="Generate QR code standees for cafe tables"
              className="px-3 py-1.5 text-xs text-[#1F4231] bg-[#E8F0EB] hover:bg-[#D5E4D9] border border-[#D5E4D9] rounded-sm transition-colors flex items-center gap-1.5 cursor-pointer font-medium"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Table QR Standees</span>
            </button>

            <button
              onClick={handleExport}
              title="Download backup JSON"
              className="px-3 py-1.5 text-xs text-stone-600 hover:text-stone-900 border border-stone-200 rounded-sm hover:bg-stone-50 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export</span>
            </button>

            <button
              onClick={() => setShowImportModal(true)}
              title="Import JSON backup"
              className="px-3 py-1.5 text-xs text-stone-600 hover:text-stone-900 border border-stone-200 rounded-sm hover:bg-stone-50 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Import</span>
            </button>

            <button
              onClick={handleResetData}
              title="Reset to default seed data"
              className="px-3 py-1.5 text-xs text-red-600 hover:text-red-700 border border-red-200 rounded-sm hover:bg-red-50 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Defaults</span>
            </button>

            <div className="h-4 w-px bg-stone-200 hidden sm:block" />

            {/* Lock / Sign out button */}
            <button
              onClick={handleSignOut}
              title="Lock Content Manager and sign out"
              className="px-3 py-1.5 text-xs text-stone-700 hover:text-stone-900 border border-stone-300 bg-stone-50 hover:bg-stone-100 rounded-sm transition-colors flex items-center gap-1.5 cursor-pointer font-medium"
            >
              <Lock className="w-3.5 h-3.5 text-stone-600" />
              <span>Lock CMS</span>
            </button>
          </div>
        </div>

        {/* Tab Strip */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-6 text-xs font-medium border-t border-stone-100 overflow-x-auto">
          <button
            onClick={() => setActiveTab('menu')}
            className={`py-3 flex items-center gap-1.5 border-b-2 cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'menu'
                ? 'border-[#1F4231] text-[#1F4231] font-semibold'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Coffee className="w-3.5 h-3.5" />
            <span>Menu &amp; Images ({menuItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('slideshow')}
            className={`py-3 flex items-center gap-1.5 border-b-2 cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'slideshow'
                ? 'border-[#1F4231] text-[#1F4231] font-semibold'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Landing Slideshow ({slideshowList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('info')}
            className={`py-3 flex items-center gap-1.5 border-b-2 cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'info'
                ? 'border-[#1F4231] text-[#1F4231] font-semibold'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Location &amp; Info</span>
          </button>

          <button
            onClick={() => setActiveTab('story')}
            className={`py-3 flex items-center gap-1.5 border-b-2 cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'story'
                ? 'border-[#1F4231] text-[#1F4231] font-semibold'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Story &amp; Narrative</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`py-3 flex items-center gap-1.5 border-b-2 cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'security'
                ? 'border-[#1F4231] text-[#1F4231] font-semibold'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Security &amp; Password</span>
          </button>
        </div>
      </header>

      {/* Main Admin Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* ==================== TAB 1: MENU CRUD & IMAGES ==================== */}
        {activeTab === 'menu' && (
          <div className="space-y-6">
            
            {/* Header controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-lg border border-[#EDE8DC]">
              <div>
                <h2 className="text-xl font-serif text-stone-900">Manage Menu Offerings &amp; Photos</h2>
                <p className="text-xs text-stone-500 font-light mt-0.5">
                  Upload, delete, and edit images for every dish and drink. Changes persist in local storage and update live immediately.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-3 py-2 bg-stone-50 border border-stone-200 rounded-sm text-xs text-stone-700 focus:outline-none"
                >
                  <option value="all">All Categories</option>
                  <option value="coffee">Coffee &amp; Espresso</option>
                  <option value="brews">Manual Brews</option>
                  <option value="teas">Teas &amp; Refreshers</option>
                  <option value="brunch">All-Day Brunch</option>
                  <option value="bakery">Bakery &amp; Sourdough</option>
                </select>

                <button
                  onClick={handleStartCreate}
                  className="px-4 py-2 bg-[#1F4231] text-white text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-[#153324] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Item</span>
                </button>
              </div>
            </div>

            {/* Menu items table */}
            <div className="bg-white border border-[#EDE8DC] rounded-lg overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase tracking-wider font-mono">
                    <tr>
                      <th className="py-3 px-4 w-16">Photo</th>
                      <th className="py-3 px-4">Item Details</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Price</th>
                      <th className="py-3 px-4">Type</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {filteredItems.map((item) => (
                      <tr key={item.id} className="hover:bg-stone-50/50 transition-colors">
                        
                        {/* Thumbnail column */}
                        <td className="py-3 px-4">
                          <div className="w-12 h-12 rounded-sm overflow-hidden border border-stone-200 bg-stone-100 relative shrink-0">
                            {item.imageUrl ? (
                              <img
                                src={item.imageUrl}
                                alt={item.name}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-stone-400">
                                <ImageIcon className="w-4 h-4" />
                              </div>
                            )}
                          </div>
                        </td>

                        <td className="py-3.5 px-4 max-w-sm">
                          <div className="flex items-center gap-2">
                            <span className="font-serif font-medium text-stone-900 text-sm">
                              {item.name}
                            </span>
                            {item.isSpeciality && (
                              <span className="bg-amber-50 text-amber-800 border border-amber-200 px-1.5 py-0.2 rounded-xs text-[10px] font-mono">
                                Signature
                              </span>
                            )}
                          </div>
                          <p className="text-stone-500 font-light text-[11px] truncate mt-0.5">
                            {item.description}
                          </p>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="capitalize px-2 py-0.5 rounded-xs bg-stone-100 text-stone-600 font-mono text-[11px]">
                            {item.category}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 font-mono font-semibold text-stone-900">
                          ₹{item.price}
                        </td>

                        <td className="py-3.5 px-4 text-stone-500">
                          {item.dietary?.join(', ') || 'Standard'}
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleStartEdit(item)}
                              className="p-1.5 text-stone-500 hover:text-[#1F4231] hover:bg-[#E8F0EB] rounded-sm transition-colors cursor-pointer"
                              title="Edit item & photo"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteItem(item.id, item.name)}
                              className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-sm transition-colors cursor-pointer"
                              title="Delete item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ==================== TAB 2: LANDING SLIDESHOW ==================== */}
        {activeTab === 'slideshow' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-lg border border-[#EDE8DC]">
              <div>
                <h2 className="text-xl font-serif text-stone-900">Landing Page Slideshow Spaces</h2>
                <p className="text-xs text-stone-500 font-light mt-0.5">
                  Manage the image slideshow displayed at the top of the landing page. Upload custom photos or paste cafe aesthetic URLs.
                </p>
              </div>

              <button
                onClick={() => {
                  setSlideForm(defaultNewSlide);
                  setIsCreatingSlide(true);
                  setEditingSlide(null);
                }}
                className="px-4 py-2 bg-[#1F4231] text-white text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-[#153324] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs self-start sm:self-auto"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add New Slide</span>
              </button>
            </div>

            {/* Slides list grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {slideshowList.map((slide, idx) => (
                <div key={slide.id} className="bg-white border border-[#EDE8DC] rounded-lg overflow-hidden shadow-xs flex flex-col justify-between">
                  <div className="relative aspect-16/9 bg-stone-100">
                    <img
                      src={slide.url}
                      alt={slide.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-[#1F4231] text-[#FAF9F5] text-[10px] font-mono px-2 py-0.5 rounded-xs">
                      Slide 0{idx + 1}
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-[#1F4231] uppercase tracking-wider block mb-0.5">
                        {slide.subtitle}
                      </span>
                      <h3 className="text-base font-serif text-stone-900 font-medium">
                        {slide.title}
                      </h3>
                      {slide.caption && (
                        <p className="text-xs text-stone-500 font-light mt-1">
                          {slide.caption}
                        </p>
                      )}
                    </div>

                    <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-stone-400 font-mono truncate max-w-[200px]">
                        {slide.url.startsWith('data:') ? 'Custom uploaded image' : slide.url}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSlideForm(slide);
                            setEditingSlide(slide);
                            setIsCreatingSlide(false);
                          }}
                          className="p-1 text-stone-600 hover:text-[#1F4231] hover:bg-[#E8F0EB] rounded-xs cursor-pointer"
                          title="Edit slide"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteSlide(slide.id)}
                          className="p-1 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-xs cursor-pointer"
                          title="Delete slide"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ==================== TAB 3: GENERAL INFO & NOTICE ==================== */}
        {activeTab === 'info' && (
          <form onSubmit={handleSaveInfo} className="bg-white border border-[#EDE8DC] rounded-lg p-6 sm:p-8 space-y-6 shadow-xs max-w-4xl">
            <div>
              <h2 className="text-xl font-serif text-stone-900">General Information &amp; Location</h2>
              <p className="text-xs text-stone-500 font-light mt-0.5">
                Update cafe operating timings, relocation notice banner, contact information, and exact Google Maps location.
              </p>
            </div>

            {/* Exact Google Location Link */}
            <div className="p-4 bg-[#E8F0EB] border border-[#D5E4D9] rounded-md space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#1F4231]">
                Exact Google Maps Location URL
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={infoForm.googleMapsShareUrl}
                  onChange={(e) => setInfoForm({ ...infoForm, googleMapsShareUrl: e.target.value })}
                  className="w-full p-2.5 bg-white border border-[#D5E4D9] rounded-sm text-xs text-stone-900 font-mono focus:outline-none focus:border-[#1F4231]"
                  placeholder="https://maps.app.goo.gl/2UpQbYcdeK6t3T2B9"
                />
                <a
                  href={infoForm.googleMapsShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 bg-[#1F4231] text-[#FAF9F5] rounded-sm text-xs font-medium flex items-center gap-1 shrink-0"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Verify</span>
                </a>
              </div>
              <span className="text-[11px] text-[#1F4231]/80 block font-light">
                This exact location link powers the "Open in Google Maps" and "Get Directions" buttons.
              </span>
            </div>

            {/* Relocation banner announcement text */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-800">
                Special Relocation Notice (Top Banner &amp; Info Section)
              </label>
              <input
                type="text"
                value={infoForm.relocationNotice}
                onChange={(e) => setInfoForm({ ...infoForm, relocationNotice: e.target.value })}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-sm text-xs text-stone-900 focus:outline-none focus:border-[#1F4231]"
                placeholder="Notice about moving from Old Manali to Mall Road"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Cafe Brand Name</label>
                <input
                  type="text"
                  value={infoForm.name}
                  onChange={(e) => setInfoForm({ ...infoForm, name: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-sm text-xs text-stone-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Tagline</label>
                <input
                  type="text"
                  value={infoForm.tagline}
                  onChange={(e) => setInfoForm({ ...infoForm, tagline: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-sm text-xs text-stone-900 focus:outline-none"
                />
              </div>
            </div>

            {/* Address */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-stone-700 mb-1">Address</label>
                <input
                  type="text"
                  value={infoForm.address}
                  onChange={(e) => setInfoForm({ ...infoForm, address: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-sm text-xs text-stone-900 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Pincode</label>
                <input
                  type="text"
                  value={infoForm.pincode}
                  onChange={(e) => setInfoForm({ ...infoForm, pincode: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-sm text-xs text-stone-900 focus:outline-none"
                />
              </div>
            </div>

            {/* Timings */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Weekday Hours</label>
                <input
                  type="text"
                  value={infoForm.hoursWeekday}
                  onChange={(e) => setInfoForm({ ...infoForm, hoursWeekday: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-sm text-xs text-stone-900 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Weekend Hours</label>
                <input
                  type="text"
                  value={infoForm.hoursWeekend}
                  onChange={(e) => setInfoForm({ ...infoForm, hoursWeekend: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-sm text-xs text-stone-900 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">All-Day Brunch Timing</label>
                <input
                  type="text"
                  value={infoForm.brunchHours}
                  onChange={(e) => setInfoForm({ ...infoForm, brunchHours: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-sm text-xs text-stone-900 focus:outline-none"
                />
              </div>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Phone</label>
                <input
                  type="text"
                  value={infoForm.phone}
                  onChange={(e) => setInfoForm({ ...infoForm, phone: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-sm text-xs text-stone-900 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Email</label>
                <input
                  type="text"
                  value={infoForm.email}
                  onChange={(e) => setInfoForm({ ...infoForm, email: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-sm text-xs text-stone-900 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Instagram Handle</label>
                <input
                  type="text"
                  value={infoForm.instagram}
                  onChange={(e) => setInfoForm({ ...infoForm, instagram: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-sm text-xs text-stone-900 focus:outline-none"
                />
              </div>
            </div>

            {/* Google Maps Embed URL */}
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">Google Maps Iframe Embed Source URL</label>
              <input
                type="text"
                value={infoForm.mapsEmbedUrl}
                onChange={(e) => setInfoForm({ ...infoForm, mapsEmbedUrl: e.target.value })}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-sm text-xs text-stone-900 font-mono focus:outline-none"
              />
            </div>

            <div className="pt-4 border-t border-stone-200 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#1F4231] text-white text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-[#153324] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Save className="w-4 h-4" />
                <span>Save General Info</span>
              </button>
            </div>
          </form>
        )}

        {/* ==================== TAB 4: STORY & COPYWRITING ==================== */}
        {activeTab === 'story' && (
          <form onSubmit={handleSaveStory} className="bg-white border border-[#EDE8DC] rounded-lg p-6 sm:p-8 space-y-6 shadow-xs max-w-4xl">
            <div>
              <h2 className="text-xl font-serif text-stone-900">About the Cafe Narrative</h2>
              <p className="text-xs text-stone-500 font-light mt-0.5">
                Customize the storytelling text about Mingma's journey from Old Manali to Mall Road.
              </p>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">Story Title</label>
              <input
                type="text"
                value={storyForm.title}
                onChange={(e) => setStoryForm({ ...storyForm, title: e.target.value })}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-sm text-xs text-stone-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">Subtitle</label>
              <input
                type="text"
                value={storyForm.subtitle}
                onChange={(e) => setStoryForm({ ...storyForm, subtitle: e.target.value })}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-sm text-xs text-stone-900 focus:outline-none"
              />
            </div>

            {/* Paragraphs */}
            <div className="space-y-3">
              <label className="block text-xs font-medium text-stone-700">Narrative Paragraphs</label>
              {storyForm.paragraphs.map((p, idx) => (
                <div key={idx} className="space-y-1">
                  <span className="text-[10px] font-mono uppercase text-stone-400">Paragraph {idx + 1}</span>
                  <textarea
                    rows={3}
                    value={p}
                    onChange={(e) => {
                      const newParas = [...storyForm.paragraphs];
                      newParas[idx] = e.target.value;
                      setStoryForm({ ...storyForm, paragraphs: newParas });
                    }}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-sm text-xs text-stone-900 focus:outline-none leading-relaxed"
                  />
                </div>
              ))}
            </div>

            {/* Quote */}
            {storyForm.philosophyQuotes && storyForm.philosophyQuotes.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Founder's Quote</label>
                  <textarea
                    rows={2}
                    value={storyForm.philosophyQuotes[0].quote}
                    onChange={(e) => {
                      const updated = [...storyForm.philosophyQuotes];
                      updated[0] = { ...updated[0], quote: e.target.value };
                      setStoryForm({ ...storyForm, philosophyQuotes: updated });
                    }}
                    className="w-full p-2 bg-stone-50 border border-stone-200 rounded-sm text-xs text-stone-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Quote Attribution</label>
                  <input
                    type="text"
                    value={storyForm.philosophyQuotes[0].author}
                    onChange={(e) => {
                      const updated = [...storyForm.philosophyQuotes];
                      updated[0] = { ...updated[0], author: e.target.value };
                      setStoryForm({ ...storyForm, philosophyQuotes: updated });
                    }}
                    className="w-full p-2 bg-stone-50 border border-stone-200 rounded-sm text-xs text-stone-900 focus:outline-none"
                  />
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-stone-200 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#1F4231] text-white text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-[#153324] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Save className="w-4 h-4" />
                <span>Save Narrative</span>
              </button>
            </div>
          </form>
        )}

        {/* ==================== TAB 5: SECURITY & ACCESS CONTROL ==================== */}
        {activeTab === 'security' && (
          <div className="space-y-6 max-w-3xl">
            {/* Header info card */}
            <div className="bg-white p-5 rounded-lg border border-[#EDE8DC] shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#E8F0EB] text-[#1F4231] border border-[#D5E4D9]">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#1F4231]" />
                      <span>CMS Access Restricted</span>
                    </span>
                    <span className="text-xs text-stone-400">·</span>
                    <span className="text-xs text-stone-500 font-mono">SHA-256 Hashed</span>
                  </div>
                  <h2 className="text-xl font-serif text-stone-900">Authorised Personnel &amp; Password</h2>
                  <p className="text-xs text-stone-500 font-light mt-0.5">
                    Restrict who can edit the menu, prices, photos, and cafe announcements. Keep credentials confidential.
                  </p>
                </div>

                <div className="flex sm:flex-col items-end justify-between border-t sm:border-t-0 pt-3 sm:pt-0 border-stone-100">
                  <span className="text-[10px] text-stone-400 uppercase font-mono tracking-wider">Current ID</span>
                  <span className="text-xs font-mono font-semibold text-[#1F4231] bg-stone-100 px-2 py-1 rounded">
                    {currentUsername}
                  </span>
                </div>
              </div>
            </div>

            {/* Change Password Form */}
            <div className="bg-white p-6 sm:p-7 rounded-lg border border-[#EDE8DC] shadow-xs">
              <div className="flex items-center gap-2 pb-4 mb-5 border-b border-stone-100">
                <KeyRound className="w-4 h-4 text-[#1F4231]" />
                <h3 className="text-sm font-semibold text-stone-800 uppercase tracking-wider">
                  Update Authorised ID &amp; Password
                </h3>
              </div>

              {/* Status alerts */}
              {securityMessage && (
                <div
                  className={`mb-5 p-3.5 rounded-sm text-xs flex items-start gap-2.5 animate-in fade-in ${
                    securityMessage.type === 'success'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}
                >
                  {securityMessage.type === 'success' ? (
                    <Check className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
                  ) : (
                    <ShieldAlert className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
                  )}
                  <span className="leading-relaxed">{securityMessage.text}</span>
                </div>
              )}

              <form onSubmit={handleUpdateAuth} className="space-y-4 text-xs">
                
                {/* Current password confirmation */}
                <div>
                  <label className="block font-medium text-stone-700 mb-1">
                    Current Password *
                  </label>
                  <div className="relative max-w-md">
                    <input
                      type={showCurrentPass ? 'text' : 'password'}
                      required
                      value={authForm.currentPassword}
                      onChange={(e) => setAuthForm({ ...authForm, currentPassword: e.target.value })}
                      placeholder="Enter existing password to authorize change"
                      className="w-full p-2.5 pr-9 bg-stone-50 border border-stone-200 rounded-sm text-xs text-stone-900 outline-none focus:border-[#1F4231] focus:bg-white transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPass(!showCurrentPass)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1 cursor-pointer"
                    >
                      {showCurrentPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <p className="text-[11px] text-stone-400 mt-1">
                    (Initial default is <code className="bg-stone-100 px-1 py-0.5 rounded font-mono">mingma@manali</code>)
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-stone-100">
                  {/* New Username / ID */}
                  <div>
                    <label className="block font-medium text-stone-700 mb-1">
                      Authorised ID / Username *
                    </label>
                    <input
                      type="text"
                      required
                      value={authForm.newUsername}
                      onChange={(e) => setAuthForm({ ...authForm, newUsername: e.target.value })}
                      placeholder="e.g. admin or mingma_manager"
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-sm text-xs text-stone-900 outline-none focus:border-[#1F4231] focus:bg-white transition-colors font-mono"
                    />
                  </div>

                  {/* Empty spacing on sm */}
                  <div className="hidden sm:block" />

                  {/* New Password */}
                  <div>
                    <label className="block font-medium text-stone-700 mb-1">
                      New Password *
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPass ? 'text' : 'password'}
                        required
                        minLength={6}
                        value={authForm.newPassword}
                        onChange={(e) => setAuthForm({ ...authForm, newPassword: e.target.value })}
                        placeholder="At least 6 characters"
                        className="w-full p-2.5 pr-9 bg-stone-50 border border-stone-200 rounded-sm text-xs text-stone-900 outline-none focus:border-[#1F4231] focus:bg-white transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPass(!showNewPass)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1 cursor-pointer"
                      >
                        {showNewPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm New Password */}
                  <div>
                    <label className="block font-medium text-stone-700 mb-1">
                      Confirm New Password *
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPass ? 'text' : 'password'}
                        required
                        minLength={6}
                        value={authForm.confirmPassword}
                        onChange={(e) => setAuthForm({ ...authForm, confirmPassword: e.target.value })}
                        placeholder="Re-enter new password"
                        className="w-full p-2.5 pr-9 bg-stone-50 border border-stone-200 rounded-sm text-xs text-stone-900 outline-none focus:border-[#1F4231] focus:bg-white transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPass(!showConfirmPass)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1 cursor-pointer"
                      >
                        {showConfirmPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-5 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-[11px] text-stone-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-stone-400" />
                    <span>Hashed using Web Crypto API SHA-256 standard.</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isUpdatingAuth}
                    className="w-full sm:w-auto px-6 py-2.5 bg-[#1F4231] text-white text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-[#153324] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{isUpdatingAuth ? 'Encrypting & Saving...' : 'Save New Credentials'}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Quick Default Reset & Info Box */}
            <div className="bg-[#FAF9F5] p-5 rounded-lg border border-[#EDE8DC] space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="text-xs font-semibold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                    <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
                    <span>Reset Credentials to Default</span>
                  </h4>
                  <p className="text-xs text-stone-500 font-light mt-1">
                    If ever needed, restore the initial default login credentials (ID: <code className="bg-stone-200/60 px-1 py-0.5 rounded font-mono">admin</code>, Password: <code className="bg-stone-200/60 px-1 py-0.5 rounded font-mono">mingma@manali</code>).
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleResetAuthToDefaults}
                  className="px-3 py-1.5 text-xs text-stone-600 hover:text-stone-900 border border-stone-300 rounded-sm hover:bg-stone-100 transition-colors cursor-pointer shrink-0"
                >
                  Restore Defaults
                </button>
              </div>

              <div className="pt-3 border-t border-[#EDE8DC] text-[11px] text-stone-500 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Tip: You can quickly lock the CMS anytime by clicking the <strong>"Lock CMS"</strong> button in the top navigation bar.</span>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* ==================== CREATE / EDIT MENU ITEM MODAL ==================== */}
      {(isCreatingNew || editingItem) && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-[#EDE8DC] rounded-lg max-w-xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setIsCreatingNew(false);
                setEditingItem(null);
              }}
              className="absolute right-4 top-4 p-1.5 text-stone-400 hover:text-stone-800 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-serif text-stone-900 mb-4">
              {isCreatingNew ? 'Add New Menu Item' : `Edit "${editingItem?.name}"`}
            </h3>

            <form onSubmit={handleSaveItem} className="space-y-4 text-xs">
              
              {/* IMAGE MANAGEMENT BLOCK */}
              <div className="p-4 bg-stone-50 border border-stone-200 rounded-md space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-stone-800 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                    <ImageIcon className="w-3.5 h-3.5 text-[#1F4231]" />
                    Menu Item Photo (Upload, Edit, Delete)
                  </span>
                  {itemForm.imageUrl && (
                    <button
                      type="button"
                      onClick={handleRemoveItemImage}
                      className="text-red-600 hover:text-red-700 font-medium flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Remove Photo</span>
                    </button>
                  )}
                </div>

                {/* Preview Thumbnail */}
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-md overflow-hidden border border-stone-300 bg-white relative shrink-0">
                    {itemForm.imageUrl ? (
                      <img
                        src={itemForm.imageUrl}
                        alt="Preview"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-stone-400 p-2 text-center">
                        <ImageIcon className="w-5 h-5 mb-1" />
                        <span className="text-[9px]">No photo</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 flex-1">
                    {/* Device File Upload */}
                    <div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-1.5 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-sm font-medium flex items-center gap-1.5 cursor-pointer text-xs"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload from device</span>
                      </button>
                    </div>

                    {/* Or URL */}
                    <div>
                      <input
                        type="text"
                        value={itemForm.imageUrl || ''}
                        onChange={(e) => setItemForm({ ...itemForm, imageUrl: e.target.value })}
                        placeholder="Or paste image URL (https://...)"
                        className="w-full p-2 bg-white border border-stone-200 rounded-sm outline-none text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-medium text-stone-700 mb-1">Item Title *</label>
                <input
                  type="text"
                  required
                  value={itemForm.name}
                  onChange={(e) => setItemForm({ ...itemForm, name: e.target.value })}
                  placeholder="e.g. Cardamom Honey Flat White"
                  className="w-full p-2.5 border border-stone-200 rounded-sm focus:border-[#1F4231] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-stone-700 mb-1">Category *</label>
                  <select
                    value={itemForm.category}
                    onChange={(e) => setItemForm({ ...itemForm, category: e.target.value as any })}
                    className="w-full p-2.5 border border-stone-200 rounded-sm outline-none"
                  >
                    <option value="coffee">Coffee &amp; Espresso</option>
                    <option value="brews">Manual Brews</option>
                    <option value="teas">Teas &amp; Refreshers</option>
                    <option value="brunch">All-Day Brunch</option>
                    <option value="bakery">Bakery &amp; Sourdough</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-stone-700 mb-1">Price (₹ INR) *</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={itemForm.price}
                    onChange={(e) => setItemForm({ ...itemForm, price: Number(e.target.value) })}
                    className="w-full p-2.5 border border-stone-200 rounded-sm outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-stone-700 mb-1">Description *</label>
                <textarea
                  rows={2}
                  required
                  value={itemForm.description}
                  onChange={(e) => setItemForm({ ...itemForm, description: e.target.value })}
                  placeholder="Detailed description of flavors, ingredients, preparation..."
                  className="w-full p-2.5 border border-stone-200 rounded-sm focus:border-[#1F4231] outline-none"
                />
              </div>

              <div>
                <label className="block font-medium text-stone-700 mb-1">
                  Tasting Notes (comma-separated)
                </label>
                <input
                  type="text"
                  value={itemForm.tastingNotes?.join(', ') || ''}
                  onChange={(e) =>
                    setItemForm({
                      ...itemForm,
                      tastingNotes: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  placeholder="e.g. Cardamom, Wild Honey, Dark Cocoa"
                  className="w-full p-2.5 border border-stone-200 rounded-sm outline-none"
                />
              </div>

              <div className="flex items-center gap-4 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={itemForm.isSpeciality || false}
                    onChange={(e) => setItemForm({ ...itemForm, isSpeciality: e.target.checked })}
                    className="w-4 h-4 text-[#1F4231] rounded"
                  />
                  <span className="font-medium text-stone-800">Highlight as Mingma's Speciality</span>
                </label>
              </div>

              {itemForm.isSpeciality && (
                <div>
                  <label className="block font-medium text-stone-700 mb-1">Signature Craft Rationale</label>
                  <input
                    type="text"
                    value={itemForm.specialityReason || ''}
                    onChange={(e) => setItemForm({ ...itemForm, specialityReason: e.target.value })}
                    placeholder="Why this item is a signature..."
                    className="w-full p-2.5 border border-[#D5E4D9] bg-[#E8F0EB]/40 rounded-sm outline-none text-[#1F4231]"
                  />
                </div>
              )}

              <div>
                <label className="block font-medium text-stone-700 mb-1">Suggested Pairing</label>
                <input
                  type="text"
                  value={itemForm.pairing || ''}
                  onChange={(e) => setItemForm({ ...itemForm, pairing: e.target.value })}
                  placeholder="e.g. Pairs with our Manali Spiced Apple Babka"
                  className="w-full p-2.5 border border-stone-200 rounded-sm outline-none"
                />
              </div>

              <div className="pt-4 border-t border-stone-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreatingNew(false);
                    setEditingItem(null);
                  }}
                  className="px-4 py-2 border border-stone-200 text-stone-600 rounded-sm hover:bg-stone-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1F4231] text-white rounded-sm font-semibold hover:bg-[#153324] shadow-xs cursor-pointer"
                >
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== CREATE / EDIT SLIDESHOW ITEM MODAL ==================== */}
      {(isCreatingSlide || editingSlide) && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-[#EDE8DC] rounded-lg max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => {
                setIsCreatingSlide(false);
                setEditingSlide(null);
              }}
              className="absolute right-4 top-4 p-1.5 text-stone-400 hover:text-stone-800 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-serif text-stone-900 mb-4">
              {isCreatingSlide ? 'Add Landing Slide' : 'Edit Slide'}
            </h3>

            <form onSubmit={handleSaveSlide} className="space-y-4 text-xs">
              
              {/* Photo preview and upload */}
              <div className="space-y-2">
                <label className="block font-medium text-stone-700">Slide Photo *</label>
                <div className="aspect-16/9 rounded-md overflow-hidden border border-stone-300 bg-stone-100 relative">
                  <img
                    src={slideForm.url}
                    alt="Preview"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex gap-2 pt-1">
                  <input
                    ref={slideFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleSlideFileUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => slideFileInputRef.current?.click()}
                    className="px-3 py-1.5 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-sm font-medium flex items-center gap-1.5 cursor-pointer text-xs"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload image file</span>
                  </button>
                  <input
                    type="text"
                    required
                    value={slideForm.url}
                    onChange={(e) => setSlideForm({ ...slideForm, url: e.target.value })}
                    placeholder="Or paste image URL"
                    className="flex-1 p-1.5 border border-stone-200 rounded-sm text-xs outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-stone-700 mb-1">Headline Title *</label>
                <input
                  type="text"
                  required
                  value={slideForm.title}
                  onChange={(e) => setSlideForm({ ...slideForm, title: e.target.value })}
                  placeholder="e.g. Himalayan Morning Light"
                  className="w-full p-2 border border-stone-200 rounded-sm outline-none"
                />
              </div>

              <div>
                <label className="block font-medium text-stone-700 mb-1">Subtitle / Tag</label>
                <input
                  type="text"
                  value={slideForm.subtitle}
                  onChange={(e) => setSlideForm({ ...slideForm, subtitle: e.target.value })}
                  placeholder="e.g. Mall Road, Manali · Elevation 2,050m"
                  className="w-full p-2 border border-stone-200 rounded-sm outline-none"
                />
              </div>

              <div>
                <label className="block font-medium text-stone-700 mb-1">Atmospheric Caption</label>
                <textarea
                  rows={2}
                  value={slideForm.caption || ''}
                  onChange={(e) => setSlideForm({ ...slideForm, caption: e.target.value })}
                  placeholder="Aesthetic description of the mood or scene..."
                  className="w-full p-2 border border-stone-200 rounded-sm outline-none"
                />
              </div>

              <div className="pt-3 border-t border-stone-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreatingSlide(false);
                    setEditingSlide(null);
                  }}
                  className="px-4 py-2 border border-stone-200 text-stone-600 rounded-sm hover:bg-stone-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1F4231] text-white rounded-sm font-semibold hover:bg-[#153324] shadow-xs cursor-pointer"
                >
                  Save Slide
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== IMPORT JSON MODAL ==================== */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-[#EDE8DC] rounded-lg max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowImportModal(false)}
              className="absolute right-4 top-4 p-1.5 text-stone-400 hover:text-stone-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-serif text-stone-900 mb-2">Import JSON Configuration</h3>
            <p className="text-xs text-stone-500 mb-4">
              Paste the exported JSON text below to restore your custom menu items, images, and settings.
            </p>
            <textarea
              rows={8}
              value={importJsonText}
              onChange={(e) => setImportJsonText(e.target.value)}
              placeholder="Paste backup JSON here..."
              className="w-full p-3 font-mono text-[11px] bg-stone-50 border border-stone-200 rounded-sm mb-4 outline-none"
            />
            <div className="flex justify-end gap-2 text-xs">
              <button
                onClick={() => setShowImportModal(false)}
                className="px-4 py-2 border border-stone-200 rounded-sm text-stone-600 hover:bg-stone-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleImportSubmit}
                className="px-5 py-2 bg-[#1F4231] text-white rounded-sm font-semibold hover:bg-[#153324] cursor-pointer"
              >
                Import Data
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
