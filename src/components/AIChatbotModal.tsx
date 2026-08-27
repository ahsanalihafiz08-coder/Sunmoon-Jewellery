import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, Send, Bot, User, MessageCircle, Phone, Calendar, MapPin } from 'lucide-react';
import { STORE_INFO, CATALOG_PRODUCTS } from '../data/jewelleryData';

interface AIChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAppointment: (item?: string) => void;
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
      text: 'Marhaba & Welcome to Sunmoon Jewelleryj Concierge. I am your personal boutique assistant for our Souq Al Watiya showroom in Kuwait City. How may I assist your fine jewellery discovery today?',
      suggestedActions: [
        { label: '💰 Pricing & Daily Gold Rates in KWD', action: () => handleSendPrompt('What are your prices in KWD and daily gold rates?') },
        { label: '📅 Reserve Private Viewing Slot', action: () => onOpenAppointment() },
        { label: '💍 Bespoke Custom Designs & Rings', action: () => handleSendPrompt('Can I create a bespoke custom jewellery design?') },
        { label: '✨ 18K & 21K Official Kuwait Hallmarks', action: () => handleSendPrompt('Tell me about your 18K and 21K gold purity and hallmarks.') },
        { label: '📍 Souq Al Watiya Boutique Hours & Directions', action: () => handleSendPrompt('Where is your boutique located in Souq Al Watiya?') },
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

      // 1. Simple, friendly greetings
      const isGreeting =
        /^(hi|hello|hey|marhaba|salam|salaam|good morning|good afternoon|good evening|howdy|holla)(\b|\s|!|\.)/i.test(lower) ||
        lower === 'hi' ||
        lower === 'hello' ||
        lower === 'hey' ||
        lower === 'marhaba';

      if (isGreeting && !lower.includes('appointment') && !lower.includes('order') && !lower.includes('price')) {
        replyText =
          'Hello and Marhaba! Welcome to Sunmoon Jewelleryj in Souq Al Watiya, Kuwait City. How may I assist you today? Feel free to ask about our 18K/21K gold jewellery, booking an in-person viewing, placing an order, or custom bespoke designs.';
        dynamicActions = [
          { label: '📅 How to Book Appointment', action: () => handleSendPrompt('How to do appointment?') },
          { label: '🛍️ How to Place an Order', action: () => handleSendPrompt('How to do order?') },
          { label: '✨ 18K & 21K Gold Purity', action: () => handleSendPrompt('Tell me about 18K and 21K gold') },
          { label: '📍 Store Location & Hours', action: () => handleSendPrompt('Where is your store located?') },
        ];
      }
      // 2. Exact appointment booking steps
      else if (
        lower.includes('appointment') ||
        lower.includes('book') ||
        lower.includes('booking') ||
        lower.includes('reserve') ||
        lower.includes('viewing') ||
        lower.includes('schedule')
      ) {
        replyText =
          'Here are the exact steps to book a private viewing appointment with us:\n\n' +
          '1. Click the "Book Viewing" or "Reserve Appointment" button on the website.\n' +
          '2. Select your preferred date and time slot.\n' +
          '3. Choose your consultation interest (Bridal Suites, 18K/21K Gold, Diamond Rings, or Bespoke Custom Design).\n' +
          '4. Enter your name and phone number, then click "Confirm Appointment".\n\n' +
          'Our boutique team at Shop 116, Souq Al Watiya will reserve your private slot and welcome you warmly. You can also WhatsApp us at +965 9748 2257 for immediate booking.';
        dynamicActions = [
          { label: '📅 Open Appointment Booking Form', action: () => onOpenAppointment() },
          { label: '💬 WhatsApp Booking (+965 9748 2257)', action: () => window.open(STORE_INFO.whatsappUrl, '_blank') },
        ];
      }
      // 3. Exact order placement steps
      else if (
        lower.includes('order') ||
        lower.includes('buy') ||
        lower.includes('purchase') ||
        lower.includes('how to order') ||
        lower.includes('how to buy') ||
        lower.includes('how to do order')
      ) {
        replyText =
          'Here are the exact steps to place an order with Sunmoon Jewelleryj:\n\n' +
          '1. Browse our Featured Jewellery catalog and Collections online.\n' +
          '2. Click on any piece to view details, specifications, and pricing in KWD.\n' +
          '3. Save items to your Wishlist or click "Order via WhatsApp".\n' +
          '4. Send your selected item details or reference photo to our concierge on WhatsApp (+965 9748 2257).\n' +
          '5. Choose your delivery preference: Secure insured home delivery across all Kuwait areas (24–48 hours) or showroom pickup at Souq Al Watiya.';
        dynamicActions = [
          { label: '💬 Order on WhatsApp (+965 9748 2257)', action: () => window.open(STORE_INFO.whatsappUrl, '_blank') },
          { label: '📅 Book In-Store Fitting', action: () => onOpenAppointment() },
        ];
      }
      // 4. Gold purity, 18K vs 21K, and Ministry hallmarks
      else if (
        lower.includes('18k') ||
        lower.includes('21k') ||
        lower.includes('gold') ||
        lower.includes('purity') ||
        lower.includes('hallmark') ||
        lower.includes('karat') ||
        lower.includes('carat')
      ) {
        replyText =
          'All gold jewellery at Sunmoon Jewelleryj is 100% genuine and officially stamped with the Kuwait Ministry of Commerce hallmark:\n\n' +
          '• 21K Gold (87.5% Purity): Rich, traditional yellow gold hue with high gold content, ideal for Kuwaiti bridal sets and traditional bangles.\n' +
          '• 18K Gold (75.0% Purity): Available in Yellow, White, and Rose Gold. Exceptionally durable for daily elegance, solitaire diamond rings, and modern geometric chains.\n\n' +
          'All purchases include official authenticity certification and guaranteed buy-back / exchange value.';
        dynamicActions = [
          { label: '💰 Check Pricing in KWD', action: () => handleSendPrompt('What are your prices in KWD?') },
          { label: '📅 Book Showroom Viewing', action: () => onOpenAppointment() },
        ];
      }
      // 5. Store Location, Directions, and Working Hours
      else if (
        lower.includes('location') ||
        lower.includes('address') ||
        lower.includes('where') ||
        lower.includes('hours') ||
        lower.includes('timing') ||
        lower.includes('time') ||
        lower.includes('open') ||
        lower.includes('closed') ||
        lower.includes('maliya') ||
        lower.includes('watiya') ||
        lower.includes('parking')
      ) {
        replyText =
          `📍 Showroom Address:\n` +
          `Ground Floor, Shop 116, Souq Al Watiya, Maliya, Kuwait City, Kuwait.\n\n` +
          `🕒 Boutique Hours:\n` +
          `• Saturday – Thursday: 9:30 AM – 1:30 PM & 4:30 PM – 10:00 PM\n` +
          `• Friday: 4:30 PM – 10:00 PM\n\n` +
          `📞 Phone: +965 9748 2257 / +965 2244 8812\n` +
          `🅿️ Ample street and public parking is available adjacent to the Souq Al Watiya shopping complex.`;
        dynamicActions = [
          { label: '📍 Get Google Maps Directions', action: () => window.open(STORE_INFO.googleMapsUrl, '_blank') },
          { label: '📞 Call Boutique Now', action: () => window.open(`tel:${STORE_INFO.phone}`, '_self') },
        ];
      }
      // 6. Custom Bespoke Design Services
      else if (
        lower.includes('custom') ||
        lower.includes('bespoke') ||
        lower.includes('design') ||
        lower.includes('customize') ||
        lower.includes('remount') ||
        lower.includes('sketch')
      ) {
        replyText =
          'Our in-house master goldsmiths offer full bespoke custom jewellery creation in Maliya:\n\n' +
          '1. Send us your concept, sketch, or photo via WhatsApp.\n' +
          '2. Receive 3D design renders and transparent price estimates based on gold weight and gemstone selection.\n' +
          '3. Handcrafted in Kuwait in 18K or 21K gold and stamped with official Ministry hallmarks within 7–10 days.';
        dynamicActions = [
          { label: '💬 Send Custom Sketch on WhatsApp', action: () => window.open(STORE_INFO.whatsappUrl, '_blank') },
          { label: '📅 Consult in Person', action: () => onOpenAppointment('Bespoke Custom Design') },
        ];
      }
      // 7. Pricing, Rates & KWD
      else if (
        lower.includes('price') ||
        lower.includes('rate') ||
        lower.includes('cost') ||
        lower.includes('kwd') ||
        lower.includes('dinar') ||
        lower.includes('how much')
      ) {
        replyText =
          'Our fine jewellery collection starts from approximately KWD 175 for daily gold pieces and up to KWD 3,500+ for magnificent bridal heirloom suites.\n\n' +
          'Prices reflect gold weight, 18K/21K purity, gemstone grades, and daily Kuwait gold market rates. For an exact quote on any piece or custom design, contact our sales concierge on WhatsApp (+965 9748 2257).';
        dynamicActions = [
          { label: '💬 Get Live Quote on WhatsApp', action: () => window.open(STORE_INFO.whatsappUrl, '_blank') },
          { label: '📅 Book Private Viewing', action: () => onOpenAppointment() },
        ];
      }
      // 8. Delivery & Shipping
      else if (
        lower.includes('delivery') ||
        lower.includes('shipping') ||
        lower.includes('deliver') ||
        lower.includes('ship')
      ) {
        replyText =
          'We provide discreet, fully insured door-to-door delivery across all Kuwait Governorates within 24–48 hours:\n\n' +
          '• Kuwait City & Capital Area\n' +
          '• Hawalli, Salmiya, & Jabriya\n' +
          '• Farwaniya, Ahmadi, & Jahra\n\n' +
          'Same-day express delivery and showroom pickup at Souq Al Watiya are also available.';
        dynamicActions = [
          { label: '💬 Inquire About Delivery', action: () => window.open(STORE_INFO.whatsappUrl, '_blank') },
        ];
      }
      // 9. Specific Jewelry Categories (Rings, Necklaces, Bangles, Pearls, Bridal)
      else if (lower.includes('ring') || lower.includes('solitaire') || lower.includes('engagement') || lower.includes('diamond')) {
        replyText =
          'Our ring collection features certified 18K Yellow, White, and Rose Gold solitaires, halo diamond designs, and traditional 21K signet bands. In-person precision ring sizing is complimentary at our Souq Al Watiya showroom.';
        dynamicActions = [
          { label: '📅 Book Ring Sizing & Viewing', action: () => onOpenAppointment('Ring Fitting') },
          { label: '💬 Browse Rings on WhatsApp', action: () => window.open(STORE_INFO.whatsappUrl, '_blank') },
        ];
      } else if (lower.includes('necklace') || lower.includes('chain') || lower.includes('pendant') || lower.includes('choker')) {
        replyText =
          'We offer handcrafted 18K & 21K gold necklaces, multi-strand layered chains, gemstone pendants, and regal bridal chokers crafted to complement both modern and traditional Kuwaiti attire.';
      } else if (lower.includes('bangle') || lower.includes('bracelet') || lower.includes('cuff')) {
        replyText =
          'Discover our collection of traditional Kuwaiti 21K engraved gold bangles, 18K modern cuffs, and classic diamond tennis bracelets with secure luxury clasps.';
      } else if (lower.includes('pearl') || lower.includes('pearls') || lower.includes('lulwa')) {
        replyText =
          'Sunmoon Jewelleryj celebrates the Arabian Gulf heritage with natural and fine cultured pearls, featuring luminous necklaces, matching drop earrings, and pearl-encrusted gold suites.';
      } else if (lower.includes('bridal') || lower.includes('wedding') || lower.includes('suite') || lower.includes('set')) {
        replyText =
          'Our Bridal Suites include complete coordinated sets (Necklace, Earrings, Bangles/Bracelet, and Ring) in 21K traditional gold or 18K diamond settings. Private bridal suite viewings are available by appointment.';
        dynamicActions = [
          { label: '📅 Reserve Bridal Viewing Slot', action: () => onOpenAppointment('Bridal Suite') },
          { label: '💬 Chat with Bridal Stylist', action: () => window.open(STORE_INFO.whatsappUrl, '_blank') },
        ];
      }
      // 10. General / Fallback with smart context
      else {
        replyText =
          `Thank you for reaching out! Sunmoon Jewelleryj is a premier fine jewellery house located at Shop 116, Souq Al Watiya in Kuwait City, specializing in 18K/21K certified gold, bridal suites, and bespoke design.\n\n` +
          `Would you like to book a private viewing, ask about how to order, or speak directly with our concierge?`;
        dynamicActions = [
          { label: '📅 Book Private Appointment', action: () => onOpenAppointment() },
          { label: '🛍️ How to Place an Order', action: () => handleSendPrompt('How to do order?') },
          { label: '💬 WhatsApp Concierge', action: () => window.open(STORE_INFO.whatsappUrl, '_blank') },
        ];
      }

      const aiReply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: replyText,
        suggestedActions: dynamicActions,
      };

      setMessages((prev) => [...prev, aiReply]);
      setIsTyping(false);
    }, 700);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-end justify-end pointer-events-none">
        {/* Backdrop on mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#463A34]/40 backdrop-blur-xs sm:hidden pointer-events-auto"
        />

        {/* Chat Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-[92vw] sm:w-[420px] bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#C9A45C]/50 z-10 flex flex-col h-[560px] max-h-[85vh] pointer-events-auto"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 bg-[#145C5A] text-white flex items-center justify-between border-b border-[#C9A45C]/40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 border border-[#C9A45C] flex items-center justify-center text-[#C9A45C] shadow-xs">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif-cormorant text-xl font-bold text-white">
                  Sunmoon AI Concierge
                </h3>
                <p className="text-[11px] text-[#E4CCA1]">
                  Souq Al Watiya, Kuwait City • Online
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-[#FBF8F1]/50">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-full bg-[#145C5A] text-[#C9A45C] flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[80%] space-y-2`}>
                  <div
                    className={`p-3.5 rounded-2xl text-xs sm:text-sm font-body leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-[#145C5A] text-white rounded-tr-xs shadow-xs'
                        : 'bg-white text-[#463A34] border border-[#E9DDCB] rounded-tl-xs shadow-xs'
                    }`}
                  >
                    {m.text}
                  </div>

                  {/* Suggested action chips */}
                  {m.suggestedActions && m.suggestedActions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {m.suggestedActions.map((act, idx) => (
                        <button
                          key={idx}
                          onClick={act.action}
                          className="px-2.5 py-1 rounded-full bg-white hover:bg-[#145C5A] text-[#145C5A] hover:text-white border border-[#C9A45C]/50 text-[11px] font-semibold transition-all shadow-2xs text-left"
                        >
                          {act.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {m.sender === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-[#C9A45C] text-[#463A34] flex items-center justify-center shrink-0 mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 items-center text-xs text-[#75665D] pl-9">
                <span className="inline-block w-2 h-2 rounded-full bg-[#145C5A] animate-bounce" />
                <span className="inline-block w-2 h-2 rounded-full bg-[#145C5A] animate-bounce [animation-delay:0.2s]" />
                <span className="inline-block w-2 h-2 rounded-full bg-[#145C5A] animate-bounce [animation-delay:0.4s]" />
                <span className="text-[11px] ml-1">Sunmoon concierge is typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Input Bar */}
          <div className="p-3 sm:p-4 bg-white border-t border-[#E9DDCB]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendPrompt(inputText);
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask about 18K/21K gold, pearls, bridal sets..."
                className="flex-1 px-4 py-2.5 rounded-full bg-[#FBF8F1] border border-[#E9DDCB] text-xs sm:text-sm text-[#463A34] placeholder-[#75665D]/60 focus:outline-none focus:border-[#145C5A]"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="w-10 h-10 rounded-full bg-[#145C5A] disabled:opacity-50 hover:bg-[#0D3E3D] text-white flex items-center justify-center transition-colors shadow-xs shrink-0"
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
