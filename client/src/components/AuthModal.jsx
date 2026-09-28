import React, { useState } from 'react';
import { 
  X, 
  Tractor, 
  Store, 
  Mail, 
  Phone, 
  Lock, 
  User, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export default function AuthModal({ initialRole = 'buyer', isOpen, onClose, onAuthSuccess }) {
  if (!isOpen) return null;

  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [role, setRole] = useState(initialRole); // 'farmer' or 'buyer'
  const [contact, setContact] = useState(''); // Email or Mobile Number
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [farmOrKitchenName, setFarmOrKitchenName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!contact.trim()) {
      setError('Please enter your email or mobile number.');
      return;
    }

    if (!password || password.length < 4) {
      setError('Please enter a password with at least 4 characters.');
      return;
    }

    if (mode === 'signup' && !name.trim()) {
      setError('Please enter your full name.');
      return;
    }

    const defaultBusinessName = role === 'farmer' 
      ? (farmOrKitchenName.trim() || `${name || 'Green Acres'} Farm`) 
      : (farmOrKitchenName.trim() || `${name || 'Artisanal'} Kitchen & Bistro`);

    const authenticatedUser = {
      id: `usr-${Date.now()}`,
      name: name.trim() || (role === 'farmer' ? 'Green Valley Organic Farms' : 'Artisanal Kitchen & Bistro'),
      emailOrPhone: contact.trim(),
      role: role, // 'farmer' or 'buyer'
      businessName: defaultBusinessName,
    };

    onAuthSuccess(authenticatedUser);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 dark:bg-[#040d08]/90 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-white dark:bg-[#091f14] rounded-3xl border border-slate-200 dark:border-[#143823] shadow-2xl p-6 sm:p-8 overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-[#34d399] hover:bg-slate-100 dark:hover:bg-[#06170e] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-[#34d399] border border-emerald-200 dark:border-emerald-800 text-[11px] font-black uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            AgriGrid Secure B2B Authentication
          </span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            {mode === 'login' ? 'Sign In to AgriGrid' : 'Create B2B Account'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-emerald-300/70 mt-1">
            {mode === 'login' 
              ? 'Enter your email or phone and password to access your portal' 
              : 'Register as a local Producer or Commercial Buyer'}
          </p>
        </div>

        {/* Login / Sign Up Tabs */}
        <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-[#06170e] rounded-xl mb-6 border border-slate-200 dark:border-[#143823]">
          <button
            type="button"
            onClick={() => { setMode('login'); setError(''); }}
            className={`py-2 rounded-lg text-xs font-bold transition-all ${
              mode === 'login' 
                ? 'bg-white dark:bg-[#091f14] text-slate-900 dark:text-[#34d399] shadow-sm' 
                : 'text-slate-500 dark:text-emerald-400/60 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => { setMode('signup'); setError(''); }}
            className={`py-2 rounded-lg text-xs font-bold transition-all ${
              mode === 'signup' 
                ? 'bg-white dark:bg-[#091f14] text-slate-900 dark:text-[#34d399] shadow-sm' 
                : 'text-slate-500 dark:text-emerald-400/60 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Role Picker Selector */}
        <div className="mb-6">
          <label className="block text-xs font-bold text-slate-700 dark:text-emerald-300 uppercase tracking-wider mb-2">
            Select Account Role:
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setRole('farmer')}
              className={`p-3 rounded-xl border text-left flex flex-col items-center gap-1.5 transition-all ${
                role === 'farmer'
                  ? 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-500 text-emerald-700 dark:text-[#34d399] shadow-md ring-2 ring-emerald-500/20'
                  : 'bg-slate-50 dark:bg-[#06170e] border-slate-200 dark:border-[#143823] text-slate-600 dark:text-emerald-400/70 hover:border-slate-300'
              }`}
            >
              <Tractor className="w-5 h-5" />
              <span className="text-xs font-black">Seller / Farmer</span>
              <span className="text-[10px] opacity-80">List Surplus Produce</span>
            </button>

            <button
              type="button"
              onClick={() => setRole('buyer')}
              className={`p-3 rounded-xl border text-left flex flex-col items-center gap-1.5 transition-all ${
                role === 'buyer'
                  ? 'bg-amber-50 dark:bg-amber-950/80 border-amber-500 text-amber-700 dark:text-amber-400 shadow-md ring-2 ring-amber-500/20'
                  : 'bg-slate-50 dark:bg-[#06170e] border-slate-200 dark:border-[#143823] text-slate-600 dark:text-emerald-400/70 hover:border-slate-300'
              }`}
            >
              <Store className="w-5 h-5" />
              <span className="text-xs font-black">Buyer / Kitchen</span>
              <span className="text-[10px] opacity-80">Buy Fresh Harvest</span>
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {error && (
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-xs font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-emerald-200 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="e.g. John Miller"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs font-medium bg-slate-50 dark:bg-[#06170e] border border-slate-200 dark:border-[#143823] rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-emerald-200 mb-1">
              Email Address or Mobile Number
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="name@farm.com or +1 555-0199"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs font-medium bg-slate-50 dark:bg-[#06170e] border border-slate-200 dark:border-[#143823] rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-emerald-200 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs font-medium bg-slate-50 dark:bg-[#06170e] border border-slate-200 dark:border-[#143823] rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            className={`w-full py-3 px-4 rounded-xl text-white font-black text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 mt-6 ${
              role === 'farmer' 
                ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/30' 
                : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/30'
            }`}
          >
            {mode === 'login' ? `Sign In as ${role === 'farmer' ? 'Seller' : 'Buyer'}` : `Create ${role === 'farmer' ? 'Seller' : 'Buyer'} Account`}
            <ArrowRight className="w-4 h-4" />
          </button>

        </form>

      </div>
    </div>
  );
}
