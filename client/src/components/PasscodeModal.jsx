import React from 'react';
import { 
  CheckCircle, 
  X, 
  QrCode, 
  Clock, 
  MapPin, 
  Printer, 
  ArrowRight,
  ShieldCheck,
  Receipt
} from 'lucide-react';

export default function PasscodeModal({ claimedItem, onClose }) {
  if (!claimedItem) return null;

  const itemPrice = Number(claimedItem.price) || 0;
  const itemQty = Number(claimedItem.quantity) || 0;
  const totalCost = (itemQty * itemPrice).toFixed(2);
  const pickupCode = `AG-${Math.floor(1000 + Math.random() * 9000)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 overflow-hidden">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-xs font-black uppercase tracking-wider">
            <CheckCircle className="w-3.5 h-3.5" />
            ORDER RESERVED & CONFIRMED
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Title */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Pickup Passcode Reserved!</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Produce batch reserved directly from <span className="font-bold text-slate-800 dark:text-slate-200">{claimedItem.farmerName}</span>
          </p>
        </div>

        {/* Digital Passcode Box */}
        <div className="bg-amber-500/10 border-2 border-dashed border-amber-500/40 rounded-2xl p-5 text-center mb-6 relative">
          <p className="text-[10px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-1">
            VERIFICATION PICKUP PASSCODE
          </p>
          <p className="text-4xl font-black tracking-widest text-amber-600 dark:text-amber-400 my-1 font-mono">
            {pickupCode}
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Show this digital passcode to producer upon pickup arrival
          </p>
        </div>

        {/* Structured Receipt Breakdown */}
        <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-700/80 mb-6 space-y-2 text-xs">
          <div className="flex justify-between text-slate-600 dark:text-slate-400">
            <span>Produce Crop:</span>
            <span className="font-bold text-slate-900 dark:text-white">{claimedItem.produceType}</span>
          </div>
          <div className="flex justify-between text-slate-600 dark:text-slate-400">
            <span>Reserved Volume:</span>
            <span className="font-bold text-slate-900 dark:text-white">{claimedItem.quantity} kg</span>
          </div>
          <div className="flex justify-between text-slate-600 dark:text-slate-400">
            <span>Wholesale Rate:</span>
            <span className="font-bold text-slate-900 dark:text-white">${itemPrice.toFixed(2)}/kg</span>
          </div>
          <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between text-sm font-black text-slate-900 dark:text-white">
            <span>Total Payable at Pickup:</span>
            <span className="text-emerald-600 dark:text-emerald-400">${totalCost}</span>
          </div>
        </div>

        {/* Pickup Location Box */}
        <div className="bg-emerald-50 dark:bg-emerald-950/50 rounded-2xl p-4 border border-emerald-200 dark:border-emerald-800/80 mb-6 text-xs text-slate-700 dark:text-slate-300">
          <div className="flex items-center gap-2 font-black text-emerald-700 dark:text-emerald-400 mb-1">
            <MapPin className="w-4 h-4" />
            Pickup Gate Location:
          </div>
          <p className="font-bold text-slate-900 dark:text-white ml-6">
            {claimedItem.location?.address || 'Highland Regional Farm Hub, Gate 3'}
          </p>
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 ml-6 mt-1 text-[11px]">
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            Pickup Window: Today within 3 hours
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="flex-1 py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4" />
            Print Receipt
          </button>

          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
          >
            Return to Feed
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
