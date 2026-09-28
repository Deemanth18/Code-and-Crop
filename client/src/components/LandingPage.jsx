import React from 'react';
import { 
  Sprout, 
  Store, 
  Tractor, 
  ShieldCheck, 
  ArrowRight, 
  Flame, 
  MapPin, 
  Truck, 
  TrendingDown, 
  Award, 
  Users, 
  Lock,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { DicedHeroSection } from './ui/diced-hero-section';

export default function LandingPage({ onOpenAuth, onExploreClick }) {
  const heroSlides = [
    {
      title: "Roma Tomatoes",
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Sweet Baby Carrots",
      image: "https://images.unsplash.com/photo-1598170845058-12ef4a457939?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Crisp Bell Peppers",
      image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Organic Baby Spinach",
      image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div className="w-full bg-slate-50 dark:bg-[#040d08] text-slate-900 dark:text-[#f0fdf4] min-h-screen transition-colors duration-200">
      
      {/* Top Hero Section */}
      <section className="relative pt-6 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Main Diced Hero */}
        <div className="bg-white dark:bg-[#091f14] rounded-3xl border border-slate-200 dark:border-[#143823] shadow-2xl p-4 sm:p-6 mb-12 backdrop-blur-sm">
          <DicedHeroSection
            topText="Discover"
            mainText="Freshness"
            subMainText="Explore a vibrant harvest of organic, seasonal fruits and vegetables, bursting with flavors. Unveil a paramount selection of naturally delicious and nutritious premium produce sourced directly from local farms!"
            buttonText="Shop Now"
            slides={heroSlides}
            onMainButtonClick={() => onOpenAuth('buyer')}
            topTextStyle={{
              color: "var(--diced-hero-section-top-text)",
              fontWeight: "700",
              letterSpacing: "1px",
              fontSize: "1.1rem",
            }}
            mainTextStyle={{
              fontSize: "3.5rem",
              fontWeight: "900",
              gradient: "linear-gradient(135deg, var(--diced-hero-section-main-gradient-from), var(--diced-hero-section-main-gradient-to))",
            }}
            subMainTextStyle={{
              color: "var(--diced-hero-section-sub-text)",
              fontSize: "1.05rem",
              lineHeight: "1.7"
            }}
            buttonStyle={{
              backgroundColor: "var(--diced-hero-section-button-bg)",
              color: "var(--diced-hero-section-button-fg)",
              borderRadius: "2rem",
              hoverColor: "var(--diced-hero-section-button-hover-bg)",
              hoverForeground: "var(--diced-hero-section-button-hover-fg)",
            }}
            separatorColor="var(--diced-hero-section-separator)"
            componentBorderRadius="1.5rem"
          />
        </div>

        {/* Live Marketplace Statistics Banner */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          <div className="bg-white dark:bg-[#091f14] border border-slate-200 dark:border-[#143823] rounded-2xl p-5 text-center shadow-md">
            <p className="text-3xl font-black text-emerald-600 dark:text-[#34d399]">1,250+ kg</p>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider">Active Farm Surplus</p>
          </div>
          <div className="bg-white dark:bg-[#091f14] border border-slate-200 dark:border-[#143823] rounded-2xl p-5 text-center shadow-md">
            <p className="text-3xl font-black text-amber-600 dark:text-amber-400">28% OFF</p>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider">Avg Wholesale Discount</p>
          </div>
          <div className="bg-white dark:bg-[#091f14] border border-slate-200 dark:border-[#143823] rounded-2xl p-5 text-center shadow-md">
            <p className="text-3xl font-black text-emerald-600 dark:text-teal-400">5 km</p>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider">Hyperlocal Pickup Radius</p>
          </div>
          <div className="bg-white dark:bg-[#091f14] border border-slate-200 dark:border-[#143823] rounded-2xl p-5 text-center shadow-md">
            <p className="text-3xl font-black text-emerald-600 dark:text-[#34d399]">100%</p>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider">Verified Local Farms</p>
          </div>
        </div>

      </section>

      {/* Role Selection Dual Cards Section */}
      <section className="py-16 bg-white dark:bg-[#06170e] border-t border-b border-slate-200 dark:border-[#143823] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white sm:text-4xl">Join the AgriGrid B2B Network</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              Whether you are an organic farm looking to eliminate harvest waste or a commercial kitchen sourcing fresh produce, choose your role to sign in.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Seller Card */}
            <div className="bg-slate-50 dark:bg-[#091f14] rounded-3xl border border-emerald-500/30 dark:border-[#143823] p-8 shadow-2xl relative overflow-hidden group hover:border-emerald-500 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-[#34d399] mb-6">
                <Tractor className="w-7 h-7" />
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-[#34d399] text-xs font-black uppercase tracking-wider border border-emerald-300 dark:border-emerald-800">
                PRODUCER & FARMER
              </span>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-4 mb-2">Sell Surplus Harvest</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                List your unharvested or surplus crops in 30 seconds. Connect directly with nearby restaurants and commercial kitchens. Zero listing fees, instant payment codes.
              </p>
              <ul className="space-y-2 text-xs font-medium text-slate-700 dark:text-slate-300 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-[#34d399]" /> Monetize 100% of your crop yield
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-[#34d399]" /> Direct payment verification code
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-[#34d399]" /> Hyperlocal buyer radius
                </li>
              </ul>
              <button
                onClick={() => onOpenAuth('farmer')}
                className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
              >
                Sign In as Seller / Farmer
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Buyer Card */}
            <div className="bg-slate-50 dark:bg-[#091f14] rounded-3xl border border-amber-500/30 dark:border-[#143823] p-8 shadow-2xl relative overflow-hidden group hover:border-amber-500 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-6">
                <Store className="w-7 h-7" />
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-400 text-xs font-black uppercase tracking-wider border border-amber-300 dark:border-amber-800">
                COMMERCIAL BUYER
              </span>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-4 mb-2">Source Fresh Local Produce</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                Access farm-fresh organic produce at up to 40% off standard distributor prices. Reserve batches with digital verification codes and pick up same day.
              </p>
              <ul className="space-y-2 text-xs font-medium text-slate-700 dark:text-slate-300 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400" /> Cut food supply chain costs by 30%
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400" /> Real-time GPS Radar view
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400" /> Guaranteed farm-fresh quality
                </li>
              </ul>
              <button
                onClick={() => onOpenAuth('buyer')}
                className="w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/30 transition-all flex items-center justify-center gap-2"
              >
                Sign In as Buyer / Kitchen
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Security & Lock Feature Guarantee */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-[#091f14] border border-slate-200 dark:border-[#143823] text-slate-600 dark:text-slate-300 text-xs font-bold mb-4 shadow-sm">
          <Lock className="w-4 h-4 text-emerald-600 dark:text-[#34d399]" />
          Strict Account Isolation & Verified B2B Authentication
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Once signed in, sellers and buyers operate within isolated dedicated portals to ensure maximum privacy, security, and transaction clarity.
        </p>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-200 dark:border-[#143823] text-center text-xs text-slate-500 dark:text-slate-500">
        <p>© 2026 AgriGrid B2B Produce Exchange Inc. All rights reserved.</p>
      </footer>

    </div>
  );
}
