import React, { useState } from 'react';
import { 
  Sprout, 
  Store, 
  Tractor, 
  Radar, 
  Search, 
  Sun, 
  Moon, 
  RefreshCw, 
  Sparkles, 
  ChevronDown,
  LogOut,
  LogIn,
  User,
  ShieldCheck
} from 'lucide-react';

export default function Navbar({ 
  activeUser, 
  onSignOut,
  onOpenAuth,
  onRefresh, 
  onSeed, 
  currentTab, 
  onTabChange,
  searchTerm,
  onSearchChange,
  isDarkMode,
  onToggleTheme
}) {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const isFarmer = activeUser?.role === 'farmer';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-[#143823] bg-white/90 dark:bg-[#040d08]/95 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Logo & Live Status */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-[#34d399] shadow-sm shadow-emerald-500/10">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  Agri<span className="text-emerald-600 dark:text-[#34d399]">Grid</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-[#34d399] border border-emerald-200 dark:border-emerald-800">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  B2B LIVE
                </span>
              </div>
              <p className="text-xs font-medium text-slate-500 dark:text-emerald-400/70 hidden sm:block">
                Surplus Produce Exchange
              </p>
            </div>
          </div>

          {/* Navigation Tabs - Strictly Locked based on Role */}
          {activeUser ? (
            <div className="hidden md:flex items-center p-1 bg-slate-100 dark:bg-[#091f14] rounded-xl border border-slate-200/60 dark:border-[#143823]">
              {isFarmer ? (
                /* Farmer View Only */
                <button
                  onClick={() => onTabChange('farmer')}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold bg-emerald-600 text-white shadow-md shadow-emerald-600/25"
                >
                  <Tractor className="w-4 h-4" />
                  Seller Dashboard
                </button>
              ) : (
                /* Buyer Views Only */
                <>
                  <button
                    onClick={() => onTabChange('buyer')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-150 ${
                      currentTab === 'buyer'
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25'
                        : 'text-slate-600 dark:text-emerald-300 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Store className="w-4 h-4" />
                    Buyer Marketplace
                  </button>

                  <button
                    onClick={() => onTabChange('radar')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-150 ${
                      currentTab === 'radar'
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25'
                        : 'text-slate-600 dark:text-emerald-300 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Radar className="w-4 h-4" />
                    GPS Radar
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-600 dark:text-emerald-200">
              <span>Hyperlocal Produce Network</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50"></span>
              <span>Direct Farm Pickup</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50"></span>
              <span>Zero Produce Waste</span>
            </div>
          )}

          {/* Right Actions & Account Control */}
          <div className="flex items-center gap-2">
            
            {/* Search Input Bar (Marketplace tab for buyers) */}
            {activeUser && currentTab === 'buyer' && (
              <div className="relative hidden lg:block w-48 xl:w-60">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search tomatoes, carrots..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs font-medium bg-slate-100 dark:bg-[#091f14] border border-slate-200 dark:border-[#143823] rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white placeholder-slate-400"
                />
              </div>
            )}

            {/* Refresh Button */}
            {activeUser && (
              <button
                onClick={onRefresh}
                title="Refresh Data Feed"
                className="p-2 rounded-lg text-slate-600 dark:text-emerald-300 hover:bg-slate-100 dark:hover:bg-[#091f14] transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            )}

            {/* Seed Demo Button */}
            {activeUser && (
              <button
                onClick={onSeed}
                title="Seed Fresh Demo Produce"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900/60 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Seed Demo
              </button>
            )}

            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg text-slate-600 dark:text-emerald-300 hover:bg-slate-100 dark:hover:bg-[#091f14] transition-colors"
              title="Toggle Dark / Light Theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Unauthenticated Sign In Button OR Authenticated User Profile */}
            {!activeUser ? (
              <button
                onClick={() => onOpenAuth()}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider shadow-md shadow-emerald-600/20 transition-all"
              >
                <LogIn className="w-4 h-4" />
                Sign In / Register
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg border border-slate-200 dark:border-[#143823] bg-slate-50 dark:bg-[#091f14] hover:border-emerald-500 transition-colors"
                >
                  <div className={`w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold ${
                    isFarmer ? 'bg-emerald-500/20 text-emerald-700 dark:text-[#34d399]' : 'bg-amber-500/20 text-amber-700 dark:text-amber-400'
                  }`}>
                    {isFarmer ? '🌾' : '👨‍🍳'}
                  </div>
                  <div className="text-left hidden sm:block">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-[120px]">
                      {activeUser.name}
                    </p>
                    <p className="text-[10px] font-semibold text-emerald-600 dark:text-[#34d399] uppercase tracking-wider">
                      {isFarmer ? 'Seller' : 'Buyer'}
                    </p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {showUserDropdown && (
                  <div className="absolute right-0 mt-2 w-64 rounded-xl bg-white dark:bg-[#091f14] border border-slate-200 dark:border-[#143823] shadow-xl p-2 z-50">
                    <div className="px-3 py-2 border-b border-slate-100 dark:border-[#143823] mb-1">
                      <p className="text-xs font-bold text-slate-900 dark:text-white">{activeUser.name}</p>
                      <p className="text-[11px] text-slate-500 dark:text-emerald-300/70 truncate">{activeUser.emailOrPhone || 'user@agrigrid.com'}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-[#34d399] uppercase">
                        {isFarmer ? 'Locked: Seller / Producer Portal' : 'Locked: Commercial Buyer Portal'}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        setShowUserDropdown(false);
                        onSignOut();
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors"
                    >
                      <LogOut className="w-4 h-4 text-red-500" />
                      Sign Out / Logout
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>

        </div>
      </div>
    </header>
  );
}
