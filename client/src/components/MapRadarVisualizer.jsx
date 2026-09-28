import React, { useState } from 'react';
import { 
  Radar, 
  MapPin, 
  Navigation, 
  Store, 
  ChevronRight, 
  Zap, 
  CheckCircle,
  Crosshair
} from 'lucide-react';

export default function MapRadarVisualizer({ 
  listings = [], 
  selectedItem, 
  onSelectItem, 
  onClaimItem 
}) {
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <div className="bg-white dark:bg-[#091f14] rounded-3xl border border-slate-200 dark:border-[#143823] shadow-xl overflow-hidden mb-8">
      
      {/* Header Bar */}
      <div className="flex items-center justify-between px-6 py-4 bg-slate-50 dark:bg-[#06170e] border-b border-slate-200 dark:border-[#143823]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-[#34d399]">
            <Radar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              Agri-Radar Geolocation Matcher
            </h3>
            <p className="text-xs text-slate-500 dark:text-emerald-300/70 font-medium">
              Real-time proximity mapping within 5 km commercial pickup radius
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-[#34d399] border border-emerald-200 dark:border-emerald-800">
            <Crosshair className="w-3.5 h-3.5" />
            GPS ACTIVE
          </span>
        </div>
      </div>

      {/* Radar Canvas Container */}
      <div className="relative h-72 sm:h-80 bg-[#040d08] flex items-center justify-center overflow-hidden">
        
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#143823_1px,transparent_1px),linear-gradient(to_bottom,#143823_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        {/* Concentric Radar Rings */}
        <div className="absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full border border-[#143823] border-dashed"></div>
        <div className="absolute w-52 h-52 sm:w-60 sm:h-60 rounded-full border border-emerald-900/60"></div>
        <div className="absolute w-32 h-32 sm:w-36 sm:h-36 rounded-full border border-emerald-800/60"></div>
        <div className="absolute w-full h-[1px] bg-[#143823]"></div>
        <div className="absolute h-full w-[1px] bg-[#143823]"></div>

        {/* Radar Sweeping Sector Beam */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-80 h-80 rounded-full animate-radar bg-[conic-gradient(from_0deg,transparent_0_300deg,rgba(16,185,129,0.25)_360deg)]"></div>
        </div>

        {/* Center Buyer Location Pulse */}
        <div className="absolute z-20 flex flex-col items-center">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-12 h-12 rounded-full bg-amber-500/30 animate-ping"></div>
            <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-amber-500/50 border-2 border-white">
              <Store className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-1 px-2.5 py-0.5 rounded-full bg-[#091f14]/90 border border-amber-500/50 text-[10px] font-black text-amber-400 backdrop-blur shadow-md">
            Hub (Your Kitchen)
          </div>
        </div>

        {/* Interactive Farm Pin Nodes */}
        {listings.map((item, index) => {
          const isSelected = selectedItem && selectedItem._id === item._id;
          const isHovered = hoveredItem && hoveredItem._id === item._id;

          const angle = (index * (360 / Math.max(listings.length, 1)) + 45) * (Math.PI / 180);
          const distanceOffset = 80 + (index % 3) * 28;
          const leftPos = Math.cos(angle) * distanceOffset;
          const topPos = Math.sin(angle) * distanceOffset;

          return (
            <div
              key={item._id || index}
              style={{
                transform: `translate(${leftPos}px, ${topPos}px)`,
              }}
              className="absolute z-30 flex flex-col items-center cursor-pointer group"
              onClick={() => onSelectItem && onSelectItem(item)}
              onMouseEnter={() => setHoveredItem(item)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {/* Pin Node Circle */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold transition-all duration-200 border-2 ${
                isSelected || isHovered
                  ? 'bg-amber-500 border-white scale-125 shadow-lg shadow-amber-500/50'
                  : 'bg-emerald-600 border-emerald-300 hover:scale-110 shadow-md shadow-emerald-600/30'
              }`}>
                🌾
              </div>

              {/* Pin Tooltip Popover */}
              <div className={`absolute bottom-9 left-1/2 -translate-x-1/2 w-44 p-2.5 rounded-xl bg-[#091f14]/95 border ${
                isSelected ? 'border-amber-500' : 'border-emerald-500/60'
              } text-white shadow-2xl backdrop-blur transition-all duration-200 pointer-events-none ${
                isHovered || isSelected ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}>
                <p className="text-xs font-black truncate">{item.produceType}</p>
                <p className="text-[10px] text-emerald-300/70 truncate">{item.farmerName}</p>
                <div className="flex items-center justify-between mt-1 pt-1 border-t border-[#143823]">
                  <span className="text-[11px] font-black text-[#34d399]">${(Number(item.price) || 0).toFixed(2)}/kg</span>
                  <span className="text-[10px] font-bold text-amber-400">{Number(item.quantity) || 0} kg</span>
                </div>
              </div>
            </div>
          );
        })}

      </div>

      {/* Footer Info Summary */}
      <div className="px-6 py-3 bg-slate-50 dark:bg-[#06170e] border-t border-slate-200 dark:border-[#143823] flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-emerald-300/80">
        <span className="flex items-center gap-1.5">
          <Navigation className="w-3.5 h-3.5 text-emerald-500" />
          <strong className="text-slate-900 dark:text-white font-extrabold">{listings.length} Active Farm Batches</strong> within 15-minute pickup radius
        </span>
        <span className="text-emerald-600 dark:text-[#34d399] font-bold hidden sm:inline">
          Click any radar pin for instant batch details
        </span>
      </div>

    </div>
  );
}
