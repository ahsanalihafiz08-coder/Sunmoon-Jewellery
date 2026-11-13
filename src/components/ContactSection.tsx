import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, MessageCircle, Send, CheckCircle2, Sparkles, Clock, Calendar } from 'lucide-react';
import { STORE_INFO } from '../data/jewelleryData';
import { InquiryFormData } from '../types';

interface ContactSectionProps {
  onSuccessToast: (msg: string) => void;
  onOpenAppointment: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onSuccessToast, onOpenAppointment }) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    phone: '',
    email: '',
    subject: 'Haute Horlogerie Acquisition',
    inquiryType: 'custom',
    message: '',
    preferredContact: 'whatsapp',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof InquiryFormData, string>>>({});
  const [submittedData, setSubmittedData] = useState<InquiryFormData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: Partial<Record<keyof InquiryFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your name';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please provide a valid phone number';
    } else if (!/^[0-9+() -]{7,20}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone format';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim() || formData.message.length < 5) {
      newErrors.message = 'Please provide a brief description of your inquiry';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedData({ ...formData });
      onSuccessToast('Inquiry prepared successfully. You may now connect directly with our concierge.');
    }, 600);
  };

  const generateWhatsAppUrl = () => {
    if (!submittedData) return STORE_INFO.whatsappUrl;
    const text = `Hello Intemporel Genève,\n\nName: ${submittedData.name}\nPhone: ${submittedData.phone}\nSubject: ${submittedData.subject}\nMessage: ${submittedData.message}`;
    return `https://wa.me/41799660156?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-[#FBF8F1] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E9DDCB]/50 border border-[#C9A45C]/30 text-xs font-semibold uppercase tracking-widest text-[#145C5A]">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A45C]" />
            <span>Connect With Our Salon</span>
          </div>

          <h2 className="font-serif-cormorant text-3xl sm:text-4xl md:text-5xl font-bold text-[#463A34] tracking-tight">
            Begin Your Conversation
          </h2>

          <p className="text-base sm:text-lg text-[#75665D] font-body max-w-2xl mx-auto leading-relaxed">
            Have an inquiry regarding reference availability, valuations, or reserving a private viewing in our Geneva salon? Send us a message or contact our concierge directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Salon Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="p-5 sm:p-8 rounded-3xl bg-white border border-[#C9A45C]/40 shadow-lg space-y-6">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#C9A45C]">
                  Geneva Flagship Salon
                </span>
                <h3 className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-[#463A34] mt-1">
                  Intemporel Genève
                </h3>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FBF8F1] border border-[#E9DDCB] flex items-center justify-center text-[#145C5A] shrink-0">
                    <MapPin className="w-5 h-5 text-[#C9A45C]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#145C5A]">Salon Address</p>
                    <p className="text-xs sm:text-sm font-semibold text-[#463A34] mt-0.5 leading-snug">
                      Route des Jeunes 4bis, 1227 Les Acacias, Genève, Suisse
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FBF8F1] border border-[#E9DDCB] flex items-center justify-center text-[#145C5A] shrink-0">
                    <Phone className="w-5 h-5 text-[#C9A45C]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#145C5A]">Direct Line</p>
                    <a
                      href="tel:+41799660156"
                      className="text-xs sm:text-sm font-bold text-[#463A34] hover:text-[#145C5A] transition-colors"
                    >
                      +41 79 966 01 56
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FBF8F1] border border-[#E9DDCB] flex items-center justify-center text-[#145C5A] shrink-0">
                    <MessageCircle className="w-5 h-5 text-[#C9A45C]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#145C5A]">WhatsApp Concierge</p>
                    <a
                      href="https://wa.me/41799660156"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm font-bold text-[#145C5A] hover:underline"
                    >
                      +41 79 966 01 56 (Chat with Concierge)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FBF8F1] border border-[#E9DDCB] flex items-center justify-center text-[#145C5A] shrink-0">
                    <Mail className="w-5 h-5 text-[#C9A45C]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#145C5A]">Support Email</p>
                    <a
                      href="mailto:contact@intemporel-geneve.ch"
                      className="text-xs sm:text-sm font-bold text-[#463A34] hover:text-[#145C5A] transition-colors"
                    >
                      contact@intemporel-geneve.ch
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FBF8F1] border border-[#E9DDCB] flex items-center justify-center text-[#145C5A] shrink-0">
                    <Clock className="w-5 h-5 text-[#C9A45C]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#145C5A]">Salon Opening Hours</p>
                    <p className="text-xs text-[#75665D] mt-0.5">Mon – Fri: 10:00 AM – 7:00 PM</p>
                    <p className="text-xs text-[#75665D]">Sat: 10:00 AM – 6:00 PM • Sun: By Appointment</p>
                  </div>
                </div>
              </div>

              {/* Social Channels in Contact Section */}
              <div className="pt-2 flex items-center gap-3">
                <a
                  href="https://www.instagram.com/intemporel_geneve?vrfl=anQ3c2VhM2ZnYmJ0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white text-[11px] font-bold flex items-center gap-1.5 shadow-sm hover:scale-105 transition-transform"
                >
                  <span>Instagram</span>
                </a>
                <a
                  href="https://www.facebook.com/Intemporel.Geneve"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-full bg-[#1877F2] text-white text-[11px] font-bold flex items-center gap-1.5 shadow-sm hover:scale-105 transition-transform"
                >
                  <span>Facebook</span>
                </a>
              </div>

              {/* Appointment CTA */}
              <div className="pt-4 border-t border-[#E9DDCB]">
                <button
                  id="contact-schedule-visit-btn"
                  onClick={onOpenAppointment}
                  className="w-full py-3 px-3 sm:px-4 rounded-xl bg-[#145C5A] hover:bg-[#0D3E3D] text-white text-[11px] sm:text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 sm:gap-2 transition-all shadow-xs cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#C9A45C] shrink-0" />
                  <span className="truncate">Reserve Private Geneva Viewing Slot</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Inquiry Form or Submission Confirmation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="p-5 sm:p-8 md:p-10 rounded-3xl bg-white border border-[#C9A45C]/40 shadow-xl relative">
              <AnimatePresence mode="wait">
                {!submittedData ? (
                  <form onSubmit={handleSubmit} className="space-y-5" id="jewellery-inquiry-form">
                    <div className="border-b border-[#E9DDCB] pb-4 mb-2">
                      <h3 className="font-serif-cormorant text-2xl font-bold text-[#463A34]">
                        Send an Inquiry
                      </h3>
                      <p className="text-xs text-[#75665D] mt-1 font-body">
                        Please fill out the details below. Our horological concierge in Geneva will assist you promptly.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      {/* Name */}
                      <div className="space-y-1.5">
                        <label htmlFor="inquiry-name" className="text-xs font-semibold text-[#463A34] block">
                          Full Name <span className="text-[#D99A8B]">*</span>
                        </label>
                        <input
                          id="inquiry-name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Marc de Chambrier"
                          className={`w-full h-11 px-4 py-2.5 rounded-xl border text-sm bg-[#FBF8F1] focus:bg-white transition-colors focus:outline-none ${
                            errors.name ? 'border-[#D99A8B]' : 'border-[#E9DDCB] focus:border-[#145C5A]'
                          }`}
                        />
                        {errors.name && <p className="text-[11px] text-[#D99A8B]">{errors.name}</p>}
                      </div>

                      {/* Phone */}
                      <div className="space-y-1.5">
                        <label htmlFor="inquiry-phone" className="text-xs font-semibold text-[#463A34] block">
                          Phone Number <span className="text-[#D99A8B]">*</span>
                        </label>
                        <input
                          id="inquiry-phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="e.g. +41 79 966 01 56"
                          className={`w-full h-11 px-4 py-2.5 rounded-xl border text-sm bg-[#FBF8F1] focus:bg-white transition-colors focus:outline-none ${
                            errors.phone ? 'border-[#D99A8B]' : 'border-[#E9DDCB] focus:border-[#145C5A]'
                          }`}
                        />
                        {errors.phone && <p className="text-[11px] text-[#D99A8B]">{errors.phone}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      {/* Email */}
                      <div className="space-y-1.5">
                        <label htmlFor="inquiry-email" className="text-xs font-semibold text-[#463A34] block">
                          Email Address <span className="text-[#75665D] font-normal">(Optional)</span>
                        </label>
                        <input
                          id="inquiry-email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@example.com"
                          className={`w-full h-11 px-4 py-2.5 rounded-xl border text-sm bg-[#FBF8F1] focus:bg-white transition-colors focus:outline-none ${
                            errors.email ? 'border-[#D99A8B]' : 'border-[#E9DDCB] focus:border-[#145C5A]'
                          }`}
                        />
                        {errors.email && <p className="text-[11px] text-[#D99A8B]">{errors.email}</p>}
                      </div>

                      {/* Inquiry Type */}
                      <div className="space-y-1.5">
                        <label htmlFor="inquiry-subject" className="text-xs font-semibold text-[#463A34] block">
                          Subject / Topic
                        </label>
                        <select
                          id="inquiry-subject"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full h-11 px-4 py-2 rounded-xl border border-[#E9DDCB] text-sm bg-[#FBF8F1] focus:bg-white focus:border-[#145C5A] focus:outline-none"
                        >
                          <option value="Haute Horlogerie Acquisition">Haute Horlogerie Acquisition</option>
                          <option value="Reference Sourcing & Verification">Reference Sourcing & Verification</option>
                          <option value="Geneva Private Salon Viewing">Geneva Private Salon Viewing</option>
                          <option value="Watch Appraisal & Consignment">Watch Appraisal & Consignment</option>
                          <option value="General Salon Question">General Salon Question</option>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <label htmlFor="inquiry-message" className="text-xs font-semibold text-[#463A34] block">
                        Message / Request Details <span className="text-[#D99A8B]">*</span>
                      </label>
                      <textarea
                        id="inquiry-message"
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about the watch model, reference number, metal preference, or preferred date for a salon appointment..."
                        className={`w-full p-4 rounded-xl border text-sm bg-[#FBF8F1] focus:bg-white transition-colors focus:outline-none resize-none leading-relaxed ${
                          errors.message ? 'border-[#D99A8B]' : 'border-[#E9DDCB] focus:border-[#145C5A]'
                        }`}
                      />
                      {errors.message && <p className="text-[11px] text-[#D99A8B]">{errors.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                      id="submit-inquiry-btn"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 rounded-xl bg-[#145C5A] hover:bg-[#0D3E3D] text-[#FBF8F1] text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span>Preparing Inquiry...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-[#C9A45C]" />
                          <span>Send Inquiry</span>
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6 space-y-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#145C5A]/10 text-[#145C5A] flex items-center justify-center mx-auto border border-[#145C5A]/20">
                      <CheckCircle2 className="w-8 h-8 text-[#145C5A]" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-serif-cormorant text-3xl font-bold text-[#463A34]">
                        Thank You, {submittedData.name}
                      </h3>
                      <p className="text-sm text-[#75665D] max-w-md mx-auto">
                        Your inquiry regarding <strong>"{submittedData.subject}"</strong> has been received by Intemporel Genève.
                      </p>
                    </div>

                    {/* Summary Box */}
                    <div className="p-4 rounded-2xl bg-[#FBF8F1] border border-[#E9DDCB] text-left text-xs text-[#75665D] space-y-2 max-w-md mx-auto">
                      <p>
                        <strong className="text-[#463A34]">Phone:</strong> {submittedData.phone}
                      </p>
                      <p>
                        <strong className="text-[#463A34]">Note:</strong> {submittedData.message}
                      </p>
                    </div>

                    {/* WhatsApp Action */}
                    <div className="space-y-3 pt-2">
                      <a
                        id="forward-whatsapp-btn"
                        href={generateWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#145C5A] hover:bg-[#0D3E3D] text-[#FBF8F1] text-xs font-semibold uppercase tracking-wider shadow-md transition-all cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4 text-[#C9A45C]" />
                        <span>Send Directly to WhatsApp Concierge</span>
                      </a>

                      <div>
                        <button
                          onClick={() => {
                            setSubmittedData(null);
                            setFormData({
                              name: '',
                              phone: '',
                              email: '',
                              subject: 'Haute Horlogerie Acquisition',
                              inquiryType: 'custom',
                              message: '',
                              preferredContact: 'whatsapp',
                            });
                          }}
                          className="text-xs font-semibold text-[#75665D] hover:text-[#145C5A] underline cursor-pointer"
                        >
                          Submit Another Inquiry
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
