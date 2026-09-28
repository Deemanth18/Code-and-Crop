import React, { useState } from 'react';
import { 
  ShoppingBag, 
  MapPin, 
  Flame, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck,
  Scale,
  DollarSign,
  AlertCircle
} from 'lucide-react';

export default function MarketplaceFeed({ 
  listings = [], 
  onClaimListing, 
  isLoading, 
  activeBuyerName 
}) {
  const [claimingId, setClaimingId] = useState(null);

  const availableListings = listings.filter(item => item.status === 'Available');

  const handleClaimClick = async (item) => {
    setClaimingId(item._id);
    try {
      await onClaimListing(item);
    } finally {
      setClaimingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-16 bg-white dark:bg-[#091f14] rounded-3xl border border-slate-200 dark:border-[#143823] shadow-xl text-center">
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-[#34d399] mb-4 animate-spin">
          <ShoppingBag className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">Scanning Nearby Produce Inventory...</h3>
        <p className="text-sm text-slate-500 dark:text-emerald-300/70 mt-1">Fetching live farm listings from regional producers</p>
      </div>
    );
  }

  if (availableListings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-16 bg-white dark:bg-[#091f14] rounded-3xl border border-slate-200 dark:border-[#143823] shadow-xl text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-[#34d399] flex items-center justify-center mb-4 text-2xl">
          🌱
        </div>
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">No Surplus Batches Available Right Now</h3>
        <p className="text-sm text-slate-500 dark:text-emerald-300/70 max-w-md mt-2">
          All surplus produce batches have been claimed by local commercial kitchens. Check back soon or list your own inventory!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {availableListings.map((item) => {
        const isClaiming = claimingId === item._id;
        const numPrice = Number(item.price) || 0;
        const numQty = Number(item.quantity) || 0;
        const totalBatchPrice = (numQty * numPrice).toFixed(2);
        const distanceStr = '3.2 km';

        return (
          <div 
            key={item._id || item.createdAt}
            className="group bg-white dark:bg-[#091f14] rounded-3xl border border-slate-200 dark:border-[#143823] shadow-xl hover:shadow-2xl hover:border-emerald-500/40 transition-all duration-300 flex flex-col overflow-hidden"
          >
            {/* Produce Banner Image Container */}
            <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100 dark:bg-[#06170e]">
              <img 
                src={item.imageUrl || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80'} 
                alt={item.produceType} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80';
                }}
              />

              {/* Status Badge */}
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-emerald-600 text-white text-[11px] font-black tracking-wider uppercase shadow-lg shadow-emerald-600/30 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                AVAILABLE
              </div>

              {/* Flame Discount Tag */}
              <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-[11px] font-black tracking-wider uppercase shadow-lg shadow-amber-500/30 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-slate-950" />
                28% OFF
              </div>

              {/* Distance Pill */}
              <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-slate-900/80 dark:bg-[#040d08]/90 backdrop-blur text-white text-xs font-bold flex items-center gap-1 border border-slate-700 dark:border-[#143823]">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                {distanceStr}
              </div>
            </div>

            {/* Card Body */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-[#34d399] transition-colors">
                      {item.produceType}
                    </h3>
                    <p className="text-xs font-medium text-slate-500 dark:text-emerald-300/70">
                      From <span className="font-bold text-slate-700 dark:text-emerald-200">{item.farmerName}</span>
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-lg font-black text-emerald-600 dark:text-[#34d399]">
                      ${numPrice.toFixed(2)}<span className="text-xs font-normal text-slate-400 dark:text-emerald-400/60">/kg</span>
                    </p>
                    <p className="text-[11px] font-bold text-amber-600 dark:text-amber-400">
                      Batch: ${totalBatchPrice}
                    </p>
                  </div>
                </div>

                {/* Batch Quantity Banner */}
                <div className="my-3 p-2.5 rounded-xl bg-slate-50 dark:bg-[#06170e] border border-slate-200/80 dark:border-[#143823] flex items-center justify-between text-xs font-bold text-slate-700 dark:text-emerald-200">
                  <span className="flex items-center gap-1.5">
                    <Scale className="w-4 h-4 text-emerald-500" />
                    Batch Weight:
                  </span>
                  <span className="text-emerald-600 dark:text-[#34d399] font-extrabold text-sm">
                    {numQty} kg Total
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 dark:text-emerald-300/70 line-clamp-2 leading-relaxed mb-4">
                  {item.description || 'Harvested fresh this morning. Premium grade produce ready for commercial kitchen pickup.'}
                </p>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleClaimClick(item)}
                disabled={isClaiming}
                className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isClaiming ? (
                  <span className="animate-pulse flex items-center gap-2">Processing Claim...</span>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    Claim & Reserve Batch (${totalBatchPrice})
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

            </div>
          </div>
        );
      })}
    </div>
  );
}
