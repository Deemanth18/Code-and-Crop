import React from 'react';
import { 
  Package, 
  TrendingDown, 
  MapPin, 
  Leaf, 
  Filter, 
  Sparkles,
  Layers,
  Carrot,
  Apple,
  Salad,
  Flame
} from 'lucide-react';
import { DicedHeroSection } from './ui/diced-hero-section';

export default function HeroSection({ 
  listingsCount = 0, 
  activeCategory, 
  onCategoryChange,
  totalWeight = 0,
  averagePrice = 0
}) {
  const categories = [
    { id: 'All', label: 'All Surplus', icon: Layers },
    { id: 'Vegetables', label: 'Vegetables', icon: Carrot },
    { id: 'Root Crops', label: 'Root Crops', icon: Leaf },
    { id: 'Greens', label: 'Greens', icon: Salad },
    { id: 'Fruits', label: 'Fruits', icon: Apple },
  ];

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
    <div className="relative space-y-6 mb-8">
      {/* Integrated 21st.dev Diced Hero Component */}
      <div className="bg-white dark:bg-[#091f14] rounded-3xl border border-slate-200 dark:border-[#143823] shadow-xl overflow-hidden p-2 sm:p-4">
        <DicedHeroSection
          topText="Hyperlocal B2B Exchange"
          mainText="Freshness Guaranteed"
          subMainText="Explore a vibrant harvest of organic, seasonal fruits and vegetables. Connect directly with local farms and claim premium harvest surplus at up to 40% below wholesale rates!"
          buttonText="Shop Surplus"
          slides={heroSlides}
          onMainButtonClick={() => {
            const feedEl = document.getElementById('produce-feed');
            if (feedEl) feedEl.scrollIntoView({ behavior: 'smooth' });
          }}
          topTextStyle={{
            color: "var(--diced-hero-section-top-text)",
            fontWeight: "800",
            letterSpacing: "1px",
            fontSize: "0.85rem",
            textTransform: "uppercase"
          }}
          mainTextStyle={{
            fontSize: "3.25rem",
            fontWeight: "900",
            gradient: "linear-gradient(135deg, var(--diced-hero-section-main-gradient-from), var(--diced-hero-section-main-gradient-to))",
          }}
          subMainTextStyle={{
            color: "var(--diced-hero-section-sub-text)",
            fontSize: "1rem",
            lineHeight: "1.6"
          }}
          buttonStyle={{
            backgroundColor: "var(--diced-hero-section-button-bg)",
            color: "var(--diced-hero-section-button-fg)",
            borderRadius: "1.5rem",
            hoverColor: "var(--diced-hero-section-button-hover-bg)",
            hoverForeground: "var(--diced-hero-section-button-hover-fg)",
          }}
          separatorColor="var(--diced-hero-section-separator)"
          componentBorderRadius="1.5rem"
        />
      </div>

      {/* Real-time KPI Stats Counter Widgets */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#091f14] border border-slate-200 dark:border-[#143823] rounded-2xl p-4 shadow-md hover:border-emerald-500/50 transition-colors">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-[#34d399] mb-1">
            <Package className="w-4 h-4" />
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-emerald-300/80">Listed Volume</span>
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white">{totalWeight > 0 ? `${totalWeight} kg` : '615 kg'}</p>
          <p className="text-[11px] text-slate-500 dark:text-emerald-400/70 mt-0.5">Fresh harvest ready</p>
        </div>

        <div className="bg-white dark:bg-[#091f14] border border-slate-200 dark:border-[#143823] rounded-2xl p-4 shadow-md hover:border-amber-500/50 transition-colors">
          <div className="flex items-center gap-2 text-amber-500 mb-1">
            <TrendingDown className="w-4 h-4" />
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-emerald-300/80">Avg Wholesale</span>
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white">${averagePrice > 0 ? averagePrice.toFixed(2) : '1.85'}<span className="text-xs text-slate-400 font-normal">/kg</span></p>
          <p className="text-[11px] text-amber-600 dark:text-amber-400 font-bold mt-0.5">🔥 Save ~28% avg</p>
        </div>

        <div className="bg-white dark:bg-[#091f14] border border-slate-200 dark:border-[#143823] rounded-2xl p-4 shadow-md hover:border-emerald-500/50 transition-colors">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-[#34d399] mb-1">
            <MapPin className="w-4 h-4" />
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-emerald-300/80">Pickup Radius</span>
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white">5 km</p>
          <p className="text-[11px] text-slate-500 dark:text-emerald-400/70 mt-0.5">Same-day pickup</p>
        </div>

        <div className="bg-white dark:bg-[#091f14] border border-slate-200 dark:border-[#143823] rounded-2xl p-4 shadow-md hover:border-teal-500/50 transition-colors">
          <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 mb-1">
            <Leaf className="w-4 h-4" />
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-emerald-300/80">Eco Impact</span>
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white">2.4 Tons</p>
          <p className="text-[11px] text-emerald-600 dark:text-[#34d399] font-bold mt-0.5">Food waste saved</p>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div id="produce-feed" className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-2">
        <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-emerald-300/80 mr-2 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" /> Category:
        </span>
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-emerald-600 text-white font-black shadow-lg shadow-emerald-600/25'
                  : 'bg-white dark:bg-[#091f14] text-slate-700 dark:text-emerald-200 hover:bg-slate-100 dark:hover:bg-[#06170e] border border-slate-200 dark:border-[#143823]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
