import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Loader2, Sparkles, User, Bot } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { Product } from '../types';

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface AIAssistantProps {
  products: Product[];
}

export default function AIAssistant({ products }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Xin chào! Tôi là trợ lý ảo của Hoa Tươi Thanh Ngọc. Tôi có thể giúp bạn chọn mẫu hoa phù hợp cho dịp đặc biệt của mình. Bạn đang tìm kiếm hoa cho dịp gì?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      
      const productContext = products.map(p => 
        `- ${p.name}: ${p.price?.toLocaleString()}đ. Ý nghĩa: ${p.meaning || 'N/A'}. Mô tả: ${p.description}`
      ).join('\n');

      const systemInstruction = `
        Bạn là trợ lý ảo thông minh của cửa hàng "Hoa Tươi Thanh Ngọc". 
        Địa chỉ: 8 Phan Văn Hân, Phường 19, Bình Thạnh, TP. Hồ Chí Minh.
        Số điện thoại: 0777 110 959.
        
        Nhiệm vụ của bạn:
        1. Tư vấn nhiệt tình, lịch sự và chuyên nghiệp cho khách hàng về việc chọn hoa.
        2. Sử dụng danh sách sản phẩm hiện có của cửa hàng để gợi ý chính xác:
        ${productContext}
        
        Quy tắc:
        - Luôn trả lời bằng tiếng Việt, giọng điệu ấm áp, tinh tế.
        - Nếu khách hỏi về giá, hãy cung cấp giá từ danh sách trên.
        - Nếu khách hỏi về ý nghĩa hoa, hãy giải thích dựa trên kiến thức về hoa và thông tin sản phẩm.
        - Khuyến khích khách hàng đặt hàng hoặc liên hệ hotline nếu họ có vẻ ưng ý.
        - Giữ câu trả lời ngắn gọn, súc tích nhưng đầy đủ thông tin.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          { role: 'user', parts: [{ text: systemInstruction }] },
          ...messages.map(m => ({
            role: m.role,
            parts: [{ text: m.text }]
          })),
          { role: 'user', parts: [{ text: userMessage }] }
        ],
      });

      const aiText = response.text || "Xin lỗi, tôi gặp chút trục trặc. Bạn có thể thử lại sau được không?";
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error) {
      console.error('Gemini Error:', error);
      setMessages(prev => [...prev, { role: 'model', text: "Rất tiếc, tôi không thể kết nối lúc này. Vui lòng liên hệ hotline 0777 110 959 để được hỗ trợ trực tiếp nhé!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-brand-orange text-white rounded-full shadow-2xl flex items-center justify-center group overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange to-brand-blue opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <MessageCircle className="relative z-10" size={28} />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-2 border-dashed border-white/20 rounded-full"
        />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-28 right-8 z-50 w-[90vw] sm:w-[400px] h-[600px] max-h-[70vh] bg-white rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden border border-brand-brown/5"
          >
            {/* Header */}
            <div className="bg-brand-brown p-6 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-orange rounded-2xl flex items-center justify-center">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="font-black text-sm uppercase tracking-widest">Trợ Lý Thanh Ngọc</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-pulse" />
                    <span className="text-[10px] text-white/60 font-bold uppercase tracking-tighter">Đang trực tuyến</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-xl transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-4 bg-brand-bg/30"
            >
              {messages.map((m, i) => (
                <motion.div
                  initial={{ opacity: 0, x: m.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-3 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${m.role === 'user' ? 'bg-brand-blue text-white' : 'bg-brand-brown text-white'}`}>
                      {m.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                    </div>
                    <div className={`p-4 rounded-2xl text-sm font-medium leading-relaxed shadow-sm ${
                      m.role === 'user' 
                        ? 'bg-brand-blue text-white rounded-tr-none' 
                        : 'bg-white text-brand-brown rounded-tl-none'
                    }`}>
                      {m.text}
                    </div>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-xl bg-brand-brown text-white flex items-center justify-center">
                      <Bot size={14} />
                    </div>
                    <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm">
                      <Loader2 className="animate-spin text-brand-blue" size={18} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 bg-white border-t border-brand-brown/5">
              <div className="relative flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Hỏi về mẫu hoa, ý nghĩa..."
                  className="flex-1 pl-4 pr-12 py-4 bg-brand-bg rounded-2xl border-none focus:ring-2 focus:ring-brand-blue/20 outline-none text-sm font-bold text-brand-brown"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 p-3 bg-brand-brown text-white rounded-xl hover:bg-brand-orange transition-all disabled:opacity-50 disabled:hover:bg-brand-brown"
                >
                  <Send size={18} />
                </button>
              </div>
              <p className="text-[8px] text-center mt-3 text-brand-brown/30 font-black uppercase tracking-widest">
                Sức mạnh bởi Gemini AI
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
