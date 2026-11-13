import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Bot, User, Sparkles, MessageCircle, Calendar, Phone, CheckCircle2 } from 'lucide-react';
import { STORE_INFO, CATALOG_PRODUCTS } from '../data/jewelleryData';

interface AIChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAppointment: (itemName?: string) => void;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  suggestedActions?: { label: string; action: () => void }[];
}

export const AIChatbotModal: React.FC<AIChatbotModalProps> = ({
  isOpen,
  onClose,
  onOpenAppointment,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Bonjour & Welcome to Intemporel Genève Concierge. I am your personal horological assistant for our Geneva salon on Route des Jeunes 4bis. How may I assist your fine timepiece discovery today?',
      suggestedActions: [
        { label: '💰 Pricing & Reference Valuations in USD', action: () => handleSendPrompt('What are your prices in USD and reference valuations?') },
        { label: '📅 Reserve Private Salon Viewing Slot', action: () => onOpenAppointment() },
        { label: '⌚ Complications & Certified Calibres', action: () => handleSendPrompt('Tell me about your complications and certified calibres.') },
        { label: '🇨🇭 Swiss Made Authenticity & Papers', action: () => handleSendPrompt('Tell me about your authenticity guarantee and box/papers.') },
        { label: '📍 Geneva Salon Hours & Address', action: () => handleSendPrompt('Where is your salon located in Geneva?') },
      ],
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendPrompt = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      let replyText = '';
      let dynamicActions: { label: string; action: () => void }[] = [
        { label: '📅 Book Private Appointment', action: () => onOpenAppointment() },
        { label: '💬 Chat on WhatsApp', action: () => window.open(STORE_INFO.whatsappUrl, '_blank') },
      ];

      const lower = text.toLowerCase().trim();

      const isGreeting =
        /^(hi|hello|hey|bonjour|salut|good morning|good afternoon|good evening)(\b|\s|!|\.)/i.test(lower) ||
        lower === 'hi' ||
        lower === 'hello' ||
        lower === 'hey' ||
        lower === 'bonjour';

      if (isGreeting && !lower.includes('appointment') && !lower.includes('order') && !lower.includes('price')) {
        replyText =
          'Bonjour! Welcome to Intemporel Genève. How may I assist you today? Feel free to ask about our verified Swiss luxury timepieces, booking a private viewing in our Geneva salon, or acquiring rare references.';
        dynamicActions = [
          { label: '📅 How to Book Salon Viewing', action: () => handleSendPrompt('How to book an appointment?') },
          { label: '🛍️ How to Acquire a Timepiece', action: () => handleSendPrompt('How to acquire a watch?') },
          { label: '⌚ Swiss Calibre Authenticity', action: () => handleSendPrompt('Tell me about your watch authenticity') },
          { label: '📍 Salon Address & Hours', action: () => handleSendPrompt('Where is your salon located?') },
        ];
      } else if (
        lower.includes('appointment') ||
        lower.includes('book') ||
        lower.includes('booking') ||
        lower.includes('reserve') ||
        lower.includes('viewing') ||
        lower.includes('schedule')
      ) {
        replyText =
          'Here are the steps to reserve a private viewing appointment with us:\n\n' +
          '1. Click the "Book Viewing" or "Reserve Appointment" button.\n' +
          '2. Select your preferred date and convenient time slot.\n' +
          '3. Specify your area of interest (Patek Philippe, Rolex, Audemars Piguet, Complications, or Chronographs).\n' +
          '4. Enter your contact details to confirm.\n\n' +
          'Our horological concierge on Route des Jeunes 4bis, Les Acacias will prepare the pieces for your private inspection. You can also WhatsApp us at +41 79 966 01 56 for instant confirmation.';
        dynamicActions = [
          { label: '📅 Open Appointment Form', action: () => onOpenAppointment() },
          { label: '💬 WhatsApp Booking (+41 79 966 01 56)', action: () => window.open(STORE_INFO.whatsappUrl, '_blank') },
        ];
      } else if (
        lower.includes('order') ||
        lower.includes('buy') ||
        lower.includes('purchase') ||
        lower.includes('acquire') ||
        lower.includes('how to order')
      ) {
        replyText =
          'Here is how you can acquire a timepiece from Intemporel Genève:\n\n' +
          '1. Browse our curated collection and select your preferred reference.\n' +
          '2. Inspect specifications, case dimensions, calibre details, and USD pricing.\n' +
          '3. Connect directly with our concierge via WhatsApp (+41 79 966 01 56) or book a private salon viewing.\n' +
          '4. Choose between confidential salon collection in Geneva or insured international courier delivery with full tracking and certification.';
        dynamicActions = [
          { label: '💬 Inquire on WhatsApp (+41 79 966 01 56)', action: () => window.open(STORE_INFO.whatsappUrl, '_blank') },
          { label: '📅 Reserve Salon Viewing', action: () => onOpenAppointment() },
        ];
      } else if (
        lower.includes('authenticity') ||
        lower.includes('original') ||
        lower.includes('genuine') ||
        lower.includes('papers') ||
        lower.includes('box') ||
        lower.includes('movement')
      ) {
        replyText =
          'At Intemporel Genève, every timepiece is 100% verified and guaranteed authentic:\n\n' +
          '• Inspected by master watchmakers for calibre timing, amplitude, and water resistance.\n' +
          '• Accompanied by original manufacturer certificates, warranty papers, and presentation boxes where noted.\n' +
          '• Lifetime guarantee of authenticity with documented provenance from reputable European collectors and manufactures.';
      } else if (lower.includes('location') || lower.includes('where') || lower.includes('address') || lower.includes('hours') || lower.includes('directions')) {
        replyText =
          `Our private flagship salon is located at:\n\n` +
          `📍 Route des Jeunes 4bis, 1227 Les Acacias, Genève, Suisse.\n\n` +
          `🕒 Salon Hours:\n` +
          `• Monday – Friday: 10:00 AM – 7:00 PM\n` +
          `• Saturday: 10:00 AM – 6:00 PM\n` +
          `• Sunday: By Private Appointment\n\n` +
          `📞 Direct Phone: +41 79 966 01 56\n` +
          `📧 Email: contact@intemporel-geneve.ch\n` +
          `🅿️ Private client parking available at the building.`;
      } else if (lower.includes('price') || lower.includes('cost') || lower.includes('usd') || lower.includes('rate') || lower.includes('dollar')) {
        replyText =
          'All our prices are displayed transparently in US Dollars ($), spanning from luxury daily references ($3,000–$8,000) to grand complications and tourbillons ($15,000–$25,000+). For confidential quotes, wire instructions, or trade-in valuations, contact our Geneva concierge on WhatsApp (+41 79 966 01 56).';
      } else {
        replyText =
          `Thank you for reaching out! Intemporel Genève is a premier luxury watch salon located on Route des Jeunes 4bis in Les Acacias, Genève, Suisse.\n\n` +
          `We specialize in certified Swiss master calibres, complications, chronographs, and haute joaillerie timepieces.\n\n` +
          `You can reach our concierge directly at +41 79 966 01 56 or reserve a private appointment.`;
      }

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: replyText,
        suggestedActions: dynamicActions,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Chat Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-xl h-[92vh] sm:h-[620px] bg-[#FBF8F1] rounded-3xl border border-[#C9A45C]/50 shadow-2xl flex flex-col overflow-hidden z-10"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 bg-[#145C5A] text-white flex items-center justify-between border-b border-[#C9A45C]/40 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/15 border border-[#C9A45C] flex items-center justify-center text-[#E4CCA1] shadow-xs">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif-cormorant text-lg sm:text-xl font-bold leading-none">
                    Intemporel Concierge
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                </div>
                <p className="text-[11px] text-[#E4CCA1] mt-0.5 font-medium">
                  Les Acacias, Genève • Online
                </p>
              </div>
            </div>

            <button
              id="close-ai-chat-btn"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/20 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 font-body">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-[#145C5A] text-[#C9A45C] flex items-center justify-center shrink-0 shadow-xs border border-[#C9A45C]/40 mt-1">
                    <Sparkles className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-3.5 sm:p-4 text-xs sm:text-sm leading-relaxed shadow-xs whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-[#145C5A] text-white rounded-tr-xs'
                      : 'bg-white text-[#463A34] border border-[#E9DDCB] rounded-tl-xs'
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Suggested Dynamic Actions */}
                  {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-[#E9DDCB]/60 flex flex-wrap gap-2">
                      {msg.suggestedActions.map((action, i) => (
                        <button
                          key={i}
                          onClick={action.action}
                          className="px-3 py-1.5 rounded-full bg-[#FBF8F1] hover:bg-[#145C5A] hover:text-white border border-[#C9A45C]/50 text-[11px] font-semibold text-[#145C5A] transition-all text-left shadow-2xs cursor-pointer"
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-[#C9A45C] text-[#463A34] flex items-center justify-center shrink-0 shadow-xs mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-[#145C5A] text-[#C9A45C] flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 animate-spin" />
                </div>
                <div className="bg-white border border-[#E9DDCB] p-3 rounded-2xl rounded-tl-xs text-xs text-[#75665D] flex items-center gap-1.5 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#C9A45C] animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-[#C9A45C] animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-[#C9A45C] animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[11px] ml-1">Intemporel concierge is typing...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 sm:p-4 bg-white border-t border-[#E9DDCB] shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendPrompt(inputText);
              }}
              className="flex items-center gap-2"
            >
              <input
                id="ai-chat-input"
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask about watches, Geneva salon viewing, prices..."
                className="flex-1 px-4 py-2.5 rounded-full border border-[#C9A45C]/40 text-xs text-[#463A34] placeholder-[#75665D]/60 focus:outline-none focus:border-[#145C5A] bg-[#FBF8F1]"
              />
              <button
                id="ai-chat-send-btn"
                type="submit"
                disabled={!inputText.trim()}
                className="w-10 h-10 rounded-full bg-[#145C5A] hover:bg-[#0D3E3D] text-white flex items-center justify-center transition-colors disabled:opacity-40 disabled:hover:bg-[#145C5A] shrink-0 cursor-pointer shadow-sm"
              >
                <Send className="w-4 h-4 text-[#C9A45C]" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
