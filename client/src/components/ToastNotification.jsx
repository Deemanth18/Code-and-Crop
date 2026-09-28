import React, { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, X } from 'lucide-react';

export default function ToastNotification({ toast, onClose }) {
  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast.visible]);

  if (!toast.visible) return null;

  const isSuccess = toast.type === 'success';

  return (
    <div className="fixed top-20 right-4 sm:right-8 z-50 max-w-md w-full animate-bounce-short">
      <div className={`p-4 rounded-2xl border shadow-2xl backdrop-blur-md flex items-center justify-between gap-3 text-sm font-bold ${
        isSuccess
          ? 'bg-emerald-600/95 border-emerald-400 text-white shadow-emerald-600/30'
          : 'bg-amber-600/95 border-amber-400 text-white shadow-amber-600/30'
      }`}>
        <div className="flex items-center gap-2.5">
          {isSuccess ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
          <span>{toast.message}</span>
        </div>
        <button 
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-white/20 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
