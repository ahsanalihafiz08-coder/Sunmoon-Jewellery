import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Copy, AlertCircle, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  type?: 'success' | 'info' | 'error';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose }) => {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 right-6 z-50 max-w-md w-full px-4"
        >
          <div
            id="toast-notification"
            className="flex items-center gap-3 p-4 bg-white/95 backdrop-blur-md rounded-xl border border-[#C9A45C]/40 shadow-xl shadow-[#75665D]/10 text-[#463A34]"
          >
            {type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#145C5A] shrink-0" />}
            {type === 'info' && <Copy className="w-5 h-5 text-[#C9A45C] shrink-0" />}
            {type === 'error' && <AlertCircle className="w-5 h-5 text-[#D99A8B] shrink-0" />}
            
            <p className="text-sm font-medium flex-1 text-[#463A34]">{message}</p>
            
            <button
              id="toast-close-btn"
              onClick={onClose}
              className="p-1 text-[#75665D] hover:text-[#463A34] transition-colors rounded-lg"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
