import React from 'react';
import { Bot, Phone, Sparkles } from 'lucide-react';
import { STORE_INFO } from '../data/jewelleryData';

interface FloatingFABsProps {
  onOpenAIChat: () => void;
}

export const FloatingFABs: React.FC<FloatingFABsProps> = ({ onOpenAIChat }) => {
  return (
    <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
      {/* 1. Direct Phone Call Button - Icon Only */}
      <a
        id="fab-phone-call"
        href={`tel:${STORE_INFO.phone}`}
        className="w-12 h-12 rounded-full bg-white text-[#145C5A] hover:bg-[#FBF8F1] border border-[#C9A45C] shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 group cursor-pointer"
        aria-label="Call Intemporel Genève (+41 79 966 01 56)"
        title="Call +41 79 966 01 56"
      >
        <Phone className="w-5 h-5 text-[#C9A45C] group-hover:text-[#145C5A] transition-colors" />
      </a>

      {/* 2. Direct WhatsApp Button - Icon Only */}
      <a
        id="fab-whatsapp"
        href={STORE_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-[#25D366] text-white hover:bg-[#20bd5a] shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 group cursor-pointer"
        aria-label="WhatsApp Concierge (+41 79 966 01 56)"
        title="Chat on WhatsApp (+41 79 966 01 56)"
      >
        <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
      </a>

      {/* 3. AI Chatbot Assistant Button */}
      <button
        id="fab-ai-chat"
        onClick={onOpenAIChat}
        className="h-12 px-4 rounded-full bg-[#145C5A] hover:bg-[#0D3E3D] text-white border border-[#C9A45C] shadow-2xl flex items-center gap-2.5 transition-all duration-300 transform hover:scale-105 relative group cursor-pointer"
        aria-label="Ask AI Horology Concierge"
        title="Open AI Concierge Chatbot"
      >
        <div className="relative">
          <Bot className="w-5 h-5 text-[#E4CCA1]" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#C9A45C] animate-ping" />
        </div>
        <span className="text-xs font-semibold tracking-wider text-white hidden sm:inline-block">
          AI Concierge
        </span>
      </button>
    </div>
  );
};
