import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, Sparkles, CheckCircle2, MessageCircle } from 'lucide-react';
import { STORE_INFO } from '../data/jewelleryData';
import { BoutiqueAppointment } from '../types';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialItemName?: string;
  onSuccessToast: (msg: string) => void;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  initialItemName,
  onSuccessToast,
}) => {
  const [formData, setFormData] = useState<BoutiqueAppointment>({
    fullName: '',
    phone: '',
    email: '',
    preferredDate: '',
    preferredTime: 'Morning (10:00 AM – 1:00 PM)',
    interestCategory: initialItemName ? `Inquiring about ${initialItemName}` : 'Haute Horlogerie Timepiece Viewing',
    notes: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof BoutiqueAppointment, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Partial<Record<keyof BoutiqueAppointment, string>> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone Number is required';
    if (!formData.preferredDate) newErrors.preferredDate = 'Please select a date';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitted(true);
    onSuccessToast('Appointment scheduled! You may also confirm via WhatsApp.');
  };

  const generateWhatsAppAppointmentUrl = () => {
    const text = `Hello Intemporel Genève, I would like to book a private salon viewing in Les Acacias, Genève.\n\nName: ${formData.fullName}\nPhone: ${formData.phone}\nPreferred Date: ${formData.preferredDate}\nPreferred Time: ${formData.preferredTime}\nInterest: ${formData.interestCategory}`;
    return `https://wa.me/41799660156?text=${encodeURIComponent(text)}`;
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#463A34]/50 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-[#FBF8F1] rounded-3xl border border-[#C9A45C]/50 shadow-2xl p-6 sm:p-8 z-10 my-8 text-[#463A34]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white border border-[#E9DDCB] flex items-center justify-center text-[#463A34] hover:bg-[#145C5A] hover:text-white transition-colors cursor-pointer"
            aria-label="Close Appointment Modal"
          >
            <X className="w-4 h-4" />
          </button>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#C9A45C]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Private Consultation</span>
                </div>
                <h3 className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-[#463A34]">
                  Reserve a Salon Viewing
                </h3>
                <p className="text-xs text-[#75665D]">
                  Route des Jeunes 4bis, 1227 Les Acacias, Genève, Suisse
                </p>
              </div>

              {/* Name */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#463A34]">Full Name *</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Your Name"
                  className={`w-full px-4 py-2.5 rounded-xl border text-xs bg-white focus:outline-none ${
                    errors.fullName ? 'border-[#D99A8B]' : 'border-[#E9DDCB] focus:border-[#145C5A]'
                  }`}
                />
                {errors.fullName && <p className="text-[10px] text-[#D99A8B]">{errors.fullName}</p>}
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#463A34]">Phone Number *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+41 79 ..."
                  className={`w-full px-4 py-2.5 rounded-xl border text-xs bg-white focus:outline-none ${
                    errors.phone ? 'border-[#D99A8B]' : 'border-[#E9DDCB] focus:border-[#145C5A]'
                  }`}
                />
                {errors.phone && <p className="text-[10px] text-[#D99A8B]">{errors.phone}</p>}
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#463A34]">Preferred Date *</label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className={`w-full px-3 py-2 rounded-xl border text-xs bg-white focus:outline-none ${
                      errors.preferredDate ? 'border-[#D99A8B]' : 'border-[#E9DDCB] focus:border-[#145C5A]'
                    }`}
                  />
                  {errors.preferredDate && <p className="text-[10px] text-[#D99A8B]">{errors.preferredDate}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#463A34]">Preferred Time</label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E9DDCB] text-xs bg-white focus:outline-none focus:border-[#145C5A]"
                  >
                    <option value="Morning (10:00 AM – 1:00 PM)">Morning (10 AM – 1 PM)</option>
                    <option value="Afternoon (2:00 PM – 5:00 PM)">Afternoon (2 PM – 5 PM)</option>
                    <option value="Late Afternoon (5:00 PM – 7:00 PM)">Late Afternoon (5 PM – 7 PM)</option>
                  </select>
                </div>
              </div>

              {/* Interest */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#463A34]">Area of Interest</label>
                <input
                  type="text"
                  value={formData.interestCategory}
                  onChange={(e) => setFormData({ ...formData, interestCategory: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E9DDCB] text-xs bg-white focus:outline-none focus:border-[#145C5A]"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#145C5A] hover:bg-[#0D3E3D] text-white text-xs font-semibold uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 mt-4 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#C9A45C]" />
                <span>Confirm Viewing Slot</span>
              </button>
            </form>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#145C5A]/10 text-[#145C5A] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-[#145C5A]" />
              </div>

              <h3 className="font-serif-cormorant text-2xl font-bold text-[#463A34]">
                Viewing Requested!
              </h3>

              <p className="text-xs text-[#75665D] max-w-sm mx-auto leading-relaxed">
                Thank you, <strong>{formData.fullName}</strong>. We look forward to welcoming you at our Geneva salon on Route des Jeunes 4bis on <strong>{formData.preferredDate}</strong> ({formData.preferredTime}).
              </p>

              <div className="pt-2 flex flex-col gap-2">
                <a
                  href={generateWhatsAppAppointmentUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-[#145C5A] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#C9A45C]" />
                  <span>Send Confirmation to WhatsApp</span>
                </a>

                <button
                  onClick={onClose}
                  className="w-full py-2.5 px-4 rounded-xl border border-[#E9DDCB] text-xs font-semibold text-[#463A34] hover:bg-white cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
