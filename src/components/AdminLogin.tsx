import React, { useState } from 'react';
import { Lock, Eye, EyeOff, ArrowLeft, ShieldAlert, KeyRound } from 'lucide-react';
import { verifyCredentials, setSessionAuthenticated } from '../utils/auth';

interface AdminLoginProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess, onCancel }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const isValid = await verifyCredentials(username, password);
      if (isValid) {
        setSessionAuthenticated(true);
        onSuccess();
      } else {
        setErrorMessage('Invalid ID or password. Access is restricted to authorised personnel.');
      }
    } catch (err) {
      setErrorMessage('Authentication error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] flex flex-col justify-center items-center p-4 selection:bg-[#1F4231] selection:text-[#FAF9F5]">
      
      {/* Background grain & ambient glow */}
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-40" />
      <div className="absolute w-96 h-96 bg-[#1F4231]/5 rounded-full blur-3xl -z-10" />

      <div className="w-full max-w-sm relative z-10">
        
        {/* Back link */}
        <button
          onClick={onCancel}
          className="mb-6 inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Cafe Website</span>
        </button>

        {/* Card */}
        <div className="bg-white border border-[#EDE8DC] rounded-xl p-6 sm:p-8 shadow-sm">
          
          {/* Logo Brand Header */}
          <div className="text-center pb-6 border-b border-stone-100 mb-6">
            <div className="inline-block bg-[#1F4231] text-[#FAF9F5] px-3.5 py-1.5 rounded-sm font-serif text-2xl lowercase tracking-tight shadow-xs mb-3">
              mingma's
            </div>
            <h1 className="text-lg font-serif text-stone-900">
              Content Manager Sign In
            </h1>
            <p className="text-xs text-stone-500 font-light mt-1">
              Authorised Cafe Personnel Only
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-5 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md flex items-start gap-2 animate-in fade-in">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            {/* Username / ID */}
            <div>
              <label className="block font-medium text-stone-700 mb-1">
                Authorised ID / Username
              </label>
              <input
                type="text"
                required
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. admin"
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-sm text-xs text-stone-900 outline-none focus:border-[#1F4231] focus:bg-white transition-colors"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block font-medium text-stone-700">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowHint(!showHint)}
                  className="text-[10px] text-[#1F4231] hover:underline cursor-pointer"
                >
                  Default credentials?
                </button>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full p-2.5 pr-9 bg-stone-50 border border-stone-200 rounded-sm text-xs text-stone-900 outline-none focus:border-[#1F4231] focus:bg-white transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Default hint callout */}
            {showHint && (
              <div className="p-2.5 bg-[#E8F0EB] border border-[#D5E4D9] rounded-sm text-[11px] text-[#1F4231] space-y-0.5 animate-in fade-in">
                <div className="font-semibold flex items-center gap-1">
                  <KeyRound className="w-3 h-3" />
                  <span>Initial Default Credentials:</span>
                </div>
                <div>ID: <code className="bg-white/70 px-1 rounded">admin</code></div>
                <div>Password: <code className="bg-white/70 px-1 rounded">mingma@manali</code></div>
                <div className="text-[10px] text-[#1F4231]/75 pt-1 italic">
                  (You can change your password inside the CMS after signing in)
                </div>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 px-4 bg-[#1F4231] hover:bg-[#153324] text-[#FAF9F5] text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{isLoading ? 'Verifying...' : 'Sign In to CMS'}</span>
            </button>
          </form>

        </div>

        {/* Footer info */}
        <div className="mt-6 text-center text-[11px] text-stone-400 font-light">
          Mingma's Coffee Shop &amp; Cafe · Mall Road, Manali
        </div>

      </div>

    </div>
  );
};
