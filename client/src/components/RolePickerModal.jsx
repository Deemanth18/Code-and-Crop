import React from 'react';
import { 
  Tractor, 
  Store, 
  ArrowRight, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  X,
  Building2,
  Users
} from 'lucide-react';

export default function RolePickerModal({ isOpen, onClose, onSelectAccount }) {
  if (!isOpen) return null;

  const demoAccounts = [
    {
      role: 'farmer',
      name: 'John Miller (Highland Acres)',
      email: 'john.miller@highlandfarm.com',
      location: 'Highland Farm, Sector 12, CA',
      avatar: '👨‍🌾',
      tag: 'ORGANIC FARM PRODUCER',
      desc: '120 kg Roma Tomatoes surplus ready'
    },
    {
      role: 'farmer',
      name: 'Maria Santos (Verde Organics)',
      email: 'maria@verdeorganics.org',
      location: 'Verde Valley Plot #4, CA',
      avatar: '👩‍🌾',
      tag: 'COOPERATIVE SELLER',
      desc: '85 kg Sweet Baby Carrots ready'
    },
    {
      role: 'buyer',
      name: 'The Artisanal Kitchen & Bistro',
      email: 'orders@artisanalkitchen.com',
      location: 'Downtown Commercial Hub, CA',
      avatar: '👨‍🍳',
      tag: 'COMMERCIAL KITCHEN',
      desc: 'Active buyer looking for organic produce'
    },
    {
      role: 'buyer',
      name: 'Green Leaf Supermarket Co-op',
      email: 'procurement@greenleaf.com',
      location: 'Metro Grocery Depot, CA',
      avatar: '🏬',
      tag: 'WHOLESALE BUYER',
      desc: 'Bulk produce procurement buyer'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 overflow-hidden">
        
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-black text-sm uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            1-Click Demo Account Authenticator
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Select Test Account Profile</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Choose an organic seller or commercial buyer profile for instant platform access
          </p>
        </div>

        <div className="space-y-3 mb-6">
          {demoAccounts.map((acc, index) => (
            <div
              key={index}
              onClick={() => onSelectAccount(acc)}
              className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex items-center justify-between group ${
                acc.role === 'farmer'
                  ? 'bg-emerald-50/50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/80 hover:border-emerald-500'
                  : 'bg-amber-50/50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/80 hover:border-amber-500'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-xl shadow-sm">
                  {acc.avatar}
                </div>
                <div>
                  <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    acc.role === 'farmer'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                  }`}>
                    {acc.tag}
                  </span>
                  <h4 className="text-sm font-black text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mt-0.5">
                    {acc.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    {acc.location}
                  </p>
                </div>
              </div>

              <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-emerald-500 group-hover:border-emerald-500 transition-colors">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center text-xs text-slate-400">
          🌱 Connected to local AgriGrid MongoDB server
        </div>

      </div>
    </div>
  );
}
