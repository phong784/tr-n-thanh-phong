import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Search, 
  Menu, 
  X, 
  Plus, 
  Trash2, 
  Upload, 
  Settings,
  ChevronRight,
  ChevronLeft,
  Star,
  Facebook,
  Instagram,
  MessageCircle,
  Flower2,
  Store,
  ShoppingBasket,
  Heart,
  Gem,
  CheckCircle2,
  AlertCircle,
  User,
  Calendar,
  Filter,
  ShoppingBag,
  CreditCard,
  Truck,
  Check
} from 'lucide-react';
import { Product, Category, Blog, CartItem, Order } from './types';
import AIAssistant from './components/AIAssistant';
import { CATEGORIES, CONTACT_INFO, PLACEHOLDER_IMAGE, ABOUT_US, LOGO_URL } from './constants';

// --- Utils ---

const optimizeImageUrl = (url: string, width: number = 800) => {
  if (!url) return PLACEHOLDER_IMAGE;
  
  // Check if it's a local URL (relative or same origin)
  const isLocal = url.startsWith('/') || (typeof window !== 'undefined' && url.startsWith(window.location.origin));
  const isUpload = url.includes('/uploads/');
  const isCommonImage = url.toLowerCase().endsWith('.png') || url.toLowerCase().endsWith('.jpg') || url.toLowerCase().endsWith('.jpeg');

  if (isUpload || (isLocal && isCommonImage)) {
    // Normalize local URL to relative path for the API
    let localPath = url;
    if (typeof window !== 'undefined' && url.startsWith(window.location.origin)) {
      localPath = url.replace(window.location.origin, '');
    }
    return `/api/img-optimize?src=${encodeURIComponent(localPath)}&w=${width}`;
  }

  // Unsplash optimization
  if (url.includes('images.unsplash.com')) {
    const baseUrl = url.split('?')[0];
    return `${baseUrl}?auto=format&fit=crop&q=80&w=${width}&fm=webp`;
  }
  
  // Picsum optimization (limited, but we can set dimensions)
  if (url.includes('picsum.photos')) {
    const baseUrl = url.split('?')[0];
    const parts = baseUrl.split('/');
    // If it's a seed URL like https://picsum.photos/seed/abc/800/600
    if (baseUrl.includes('/seed/')) {
      const seedIndex = parts.indexOf('seed');
      const seed = parts[seedIndex + 1];
      return `https://picsum.photos/seed/${seed}/${width}/${Math.round(width * 0.75)}.webp`;
    }
    return `${baseUrl}/${width}/${Math.round(width * 0.75)}.webp`;
  }

  return url;
};

const HighlightedText = ({ text, highlight }: { text: string, highlight: string }) => {
  if (!highlight.trim()) {
    return <span>{text}</span>;
  }
  // Escape special characters for regex
  const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedHighlight})`, 'gi');
  const parts = text.split(regex);
  return (
    <span>
      {parts.map((part, i) => 
        regex.test(part) ? (
          <mark key={i} className="bg-brand-orange/30 text-brand-brown rounded-sm px-0.5 font-black">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
};

// --- Components ---

const AboutPage = ({ onBack }: { onBack: () => void }) => (
  <motion.div 
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="pt-32 pb-24 bg-brand-bg"
  >
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex items-center gap-4 mb-16">
        <button 
          onClick={onBack}
          className="w-12 h-12 rounded-2xl bg-white border border-brand-brown/5 flex items-center justify-center text-brand-brown hover:bg-brand-blue hover:text-white transition-all shadow-lg"
        >
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-4xl md:text-6xl font-serif font-black text-brand-brown leading-tight">Về Chúng Tôi</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-24">
        <div className="relative">
          <div className="rounded-[4rem] overflow-hidden shadow-2xl border-[12px] border-white transform -rotate-3 aspect-[4/5]">
            <img 
              src={optimizeImageUrl("https://images.unsplash.com/photo-1526047932273-341f2a7631f9", 800)} 
              srcSet={`${optimizeImageUrl("https://images.unsplash.com/photo-1526047932273-341f2a7631f9", 400)} 400w, ${optimizeImageUrl("https://images.unsplash.com/photo-1526047932273-341f2a7631f9", 800)} 800w, ${optimizeImageUrl("https://images.unsplash.com/photo-1526047932273-341f2a7631f9", 1200)} 1200w`}
              sizes="(max-width: 1024px) 100vw, 50vw"
              alt="Our Story" 
              className="w-full h-full object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand-orange/10 rounded-full blur-3xl"></div>
        </div>
        <div>
          <span className="text-brand-orange font-black tracking-[0.3em] uppercase text-[10px] mb-4 block">Câu chuyện của chúng tôi</span>
          <h3 className="text-3xl md:text-5xl font-serif font-black text-brand-brown mb-8 leading-tight">Hành Trình Của Những <br /><span className="text-brand-blue italic font-normal">Cánh Hoa</span></h3>
          <p className="text-brand-brown/60 text-lg leading-relaxed font-medium mb-8 italic serif">
            "{ABOUT_US.story}"
          </p>
          <div className="p-8 bg-brand-paper rounded-3xl border border-brand-brown/5">
            <span className="text-brand-blue font-black tracking-[0.3em] uppercase text-[10px] mb-4 block">Sứ mệnh</span>
            <p className="text-brand-brown font-bold text-xl leading-relaxed">
              {ABOUT_US.mission}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {ABOUT_US.values.map((value, idx) => (
          <div key={idx} className="p-10 bg-white rounded-[2.5rem] border border-brand-brown/5 shadow-xl hover:shadow-2xl transition-all group">
            <div className="w-16 h-16 bg-brand-bg rounded-2xl flex items-center justify-center text-brand-blue mb-8 group-hover:bg-brand-blue group-hover:text-white transition-all">
              <Star size={28} />
            </div>
            <h4 className="text-2xl font-serif font-black text-brand-brown mb-4">{value.title}</h4>
            <p className="text-brand-brown/60 font-medium leading-relaxed">{value.description}</p>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

const ContactPage = ({ onBack }: { onBack: () => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    let isValid = true;
    const newErrors = { name: '', phone: '', email: '', message: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Vui lòng nhập họ và tên';
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
      isValid = false;
    } else if (!/^\d{10,11}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Số điện thoại không hợp lệ (10-11 chữ số)';
      isValid = false;
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Vui lòng nhập lời nhắn';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.');
        setFormData({ name: '', phone: '', email: '', message: '' });
        setIsSubmitting(false);
      }, 1000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="pt-32 pb-24 bg-brand-bg"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-4 mb-16">
          <button 
            onClick={onBack}
            className="w-12 h-12 rounded-2xl bg-white border border-brand-brown/5 flex items-center justify-center text-brand-brown hover:bg-brand-blue hover:text-white transition-all shadow-lg"
          >
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-4xl md:text-6xl font-serif font-black text-brand-brown leading-tight">Liên Hệ</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-12">
            <div>
              <span className="text-brand-orange font-black tracking-[0.3em] uppercase text-[10px] mb-4 block">Thông tin liên lạc</span>
              <h3 className="text-3xl font-serif font-black text-brand-brown mb-8">Ghé Thăm Cửa Hàng <br /><span className="text-brand-blue italic font-normal">Thanh Ngọc</span></h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-6 bg-white rounded-3xl border border-brand-brown/5 shadow-lg">
                  <div className="w-12 h-12 bg-brand-blue/10 rounded-2xl flex items-center justify-center text-brand-blue shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-brand-brown text-sm uppercase tracking-wider mb-1">Địa chỉ</h4>
                    <p className="text-brand-brown/60 font-medium">{CONTACT_INFO.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-white rounded-3xl border border-brand-brown/5 shadow-lg">
                  <div className="w-12 h-12 bg-brand-orange/10 rounded-2xl flex items-center justify-center text-brand-orange shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-brand-brown text-sm uppercase tracking-wider mb-1">Điện thoại</h4>
                    <p className="text-brand-brown/60 font-medium">{CONTACT_INFO.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-white rounded-3xl border border-brand-brown/5 shadow-lg">
                  <div className="w-12 h-12 bg-brand-brown/10 rounded-2xl flex items-center justify-center text-brand-brown shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-brand-brown text-sm uppercase tracking-wider mb-1">Giờ mở cửa</h4>
                    <p className="text-brand-brown/60 font-medium">{CONTACT_INFO.hours}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl h-80">
              <iframe 
                src={CONTACT_INFO.maps_embed} 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          <div className="bg-brand-paper p-10 md:p-16 rounded-[4rem] border border-brand-brown/5 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-serif font-black text-brand-brown mb-4">Gửi Lời Nhắn</h3>
              <p className="text-brand-brown/60 font-medium mb-10">Chúng tôi luôn sẵn sàng lắng nghe và tư vấn cho bạn những mẫu hoa tuyệt vời nhất.</p>
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-brand-brown/40 ml-4">Họ và tên</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Nguyễn Văn A" 
                      className={`w-full px-6 py-4 rounded-2xl bg-white border ${errors.name ? 'border-red-500' : 'border-brand-brown/5'} focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all font-medium`} 
                    />
                    {errors.name && <p className="text-red-500 text-[10px] font-bold ml-4">{errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-brand-brown/40 ml-4">Số điện thoại</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="0934 926 092" 
                      className={`w-full px-6 py-4 rounded-2xl bg-white border ${errors.phone ? 'border-red-500' : 'border-brand-brown/5'} focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all font-medium`} 
                    />
                    {errors.phone && <p className="text-red-500 text-[10px] font-bold ml-4">{errors.phone}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-brand-brown/40 ml-4">Email (không bắt buộc)</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@example.com" 
                    className={`w-full px-6 py-4 rounded-2xl bg-white border ${errors.email ? 'border-red-500' : 'border-brand-brown/5'} focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all font-medium`} 
                  />
                  {errors.email && <p className="text-red-500 text-[10px] font-bold ml-4">{errors.email}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-brand-brown/40 ml-4">Lời nhắn</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4} 
                    placeholder="Tôi muốn tư vấn về hoa sinh nhật..." 
                    className={`w-full px-6 py-4 rounded-2xl bg-white border ${errors.message ? 'border-red-500' : 'border-brand-brown/5'} focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all font-medium resize-none`} 
                  ></textarea>
                  {errors.message && <p className="text-red-500 text-[10px] font-bold ml-4">{errors.message}</p>}
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-5 bg-brand-brown text-brand-bg rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-brand-blue transition-all shadow-xl shadow-brand-brown/20 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Đang gửi...' : 'Gửi Yêu Cầu'} <MessageCircle size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const OffersPage = ({ onBack, onShopNow }: { onBack: () => void, onShopNow: () => void }) => {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 right-4 bg-brand-blue text-white px-6 py-3 rounded-full shadow-2xl z-50 animate-bounce';
    toast.innerText = "Cảm ơn bạn đã đăng ký nhận tin!";
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
    (e.target as HTMLFormElement).reset();
  };

  const handleClaimOffer = () => {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 right-4 bg-brand-orange text-white px-6 py-3 rounded-full shadow-2xl z-50 animate-bounce';
    toast.innerText = "Mã ưu đãi WELCOME20 đã được lưu!";
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="pt-32 pb-24 bg-brand-bg"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-4 mb-16">
          <button 
            onClick={onBack}
            className="w-12 h-12 rounded-2xl bg-white border border-brand-brown/5 flex items-center justify-center text-brand-brown hover:bg-brand-blue hover:text-white transition-all shadow-lg"
          >
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-4xl md:text-6xl font-serif font-black text-brand-brown leading-tight">Ưu Đãi Đặc Biệt</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
          <div className="group relative h-[500px] rounded-[4rem] overflow-hidden shadow-2xl">
            <img 
              src={optimizeImageUrl("https://images.unsplash.com/photo-1523694576729-dc99e9c0f9b4", 800)} 
              srcSet={`${optimizeImageUrl("https://images.unsplash.com/photo-1523694576729-dc99e9c0f9b4", 400)} 400w, ${optimizeImageUrl("https://images.unsplash.com/photo-1523694576729-dc99e9c0f9b4", 800)} 800w, ${optimizeImageUrl("https://images.unsplash.com/photo-1523694576729-dc99e9c0f9b4", 1200)} 1200w`}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
              alt="Special Offer 1" 
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-brown via-brand-brown/20 to-transparent"></div>
            <div className="absolute bottom-12 left-12 right-12">
              <span className="px-4 py-1.5 bg-brand-orange text-white text-[10px] font-black uppercase tracking-widest rounded-full mb-4 inline-block">Giảm 20%</span>
              <h3 className="text-4xl font-serif font-black text-white mb-4">Chào Mừng Thành Viên Mới</h3>
              <p className="text-white/70 font-medium mb-8">Nhận ngay ưu đãi giảm giá cho đơn hàng đầu tiên khi đăng ký thành viên tại Thanh Ngọc.</p>
              <button 
                onClick={handleClaimOffer}
                className="px-8 py-4 bg-white text-brand-brown rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-brand-blue hover:text-white transition-all cursor-pointer"
              >
                Nhận Ưu Đãi
              </button>
            </div>
          </div>

          <div className="group relative h-[500px] rounded-[4rem] overflow-hidden shadow-2xl">
            <img 
              src={optimizeImageUrl("https://images.unsplash.com/photo-1519378018457-4c29a3a2ecdf", 800)} 
              srcSet={`${optimizeImageUrl("https://images.unsplash.com/photo-1519378018457-4c29a3a2ecdf", 400)} 400w, ${optimizeImageUrl("https://images.unsplash.com/photo-1519378018457-4c29a3a2ecdf", 800)} 800w, ${optimizeImageUrl("https://images.unsplash.com/photo-1519378018457-4c29a3a2ecdf", 1200)} 1200w`}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
              alt="Special Offer 2" 
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-blue via-brand-blue/20 to-transparent"></div>
            <div className="absolute bottom-12 left-12 right-12">
              <span className="px-4 py-1.5 bg-white text-brand-blue text-[10px] font-black uppercase tracking-widest rounded-full mb-4 inline-block">Miễn Phí Vận Chuyển</span>
              <h3 className="text-4xl font-serif font-black text-white mb-4">Đơn Hàng Từ 1.000.000đ</h3>
              <p className="text-white/70 font-medium mb-8">Áp dụng cho tất cả các đơn hàng trong khu vực nội thành TP. Hồ Chí Minh.</p>
              <button 
                onClick={onShopNow}
                className="px-8 py-4 bg-white text-brand-blue rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-brand-brown hover:text-white transition-all cursor-pointer"
              >
                Mua Ngay
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white p-12 md:p-20 rounded-[4rem] border border-brand-brown/5 shadow-xl text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-brand-orange/5 rounded-full blur-3xl -ml-32 -mt-32"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="text-brand-orange font-black tracking-[0.3em] uppercase text-[10px] mb-6 block">Đăng ký nhận tin</span>
            <h3 className="text-4xl md:text-5xl font-serif font-black text-brand-brown mb-6">Đừng Bỏ Lỡ Bất Kỳ <br /><span className="text-brand-blue italic font-normal">Ưu Đãi</span> Nào</h3>
            <p className="text-brand-brown/60 font-medium mb-10 text-lg">Chúng tôi sẽ gửi cho bạn những thông tin về bộ sưu tập mới và các chương trình khuyến mãi đặc biệt hàng tháng.</p>
            
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4">
              <input required type="email" placeholder="Email của bạn..." className="flex-1 px-8 py-5 rounded-2xl bg-brand-bg border border-brand-brown/5 focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all font-medium" />
              <button type="submit" className="px-10 py-5 bg-brand-blue text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-brand-brown transition-all shadow-xl shadow-brand-blue/20 cursor-pointer">Đăng Ký Ngay</button>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Logo = ({ className = "", onClick, logoUrl }: { className?: string, onClick?: () => void, logoUrl?: string }) => (
  <div 
    className={`flex items-center gap-3 ${onClick ? 'cursor-pointer' : ''} ${className}`}
    onClick={onClick}
  >
    <div className="relative">
      {logoUrl ? (
        <img 
          src={optimizeImageUrl(logoUrl, 100)} 
          alt="Logo" 
          className="w-10 h-10 md:w-12 md:h-12 object-contain rounded-full border-2 border-white shadow-xl" 
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="w-10 h-10 md:w-12 md:h-12 bg-brand-blue rounded-full flex items-center justify-center text-white font-serif font-black text-xl md:text-2xl shadow-xl border-2 border-white transform -rotate-12">
          TN
        </div>
      )}
      <div className="absolute -bottom-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-brand-orange rounded-full border-2 border-white"></div>
    </div>
    <div className="flex flex-col">
      <div className="flex items-baseline gap-1.5">
        <span className="text-white font-serif font-black leading-none text-lg md:text-2xl tracking-tight drop-shadow-sm">HOA TƯƠI</span>
        <span className="text-brand-blue font-serif font-black leading-none text-lg md:text-2xl tracking-tight drop-shadow-sm">THANH NGỌC</span>
      </div>
      <span className="text-brand-blue text-[8px] md:text-[9px] tracking-[0.3em] font-bold uppercase mt-1">Flower's Artistry</span>
    </div>
  </div>
);

const CategoryIcon = ({ icon, className }: { icon: string, className?: string }) => {
  switch (icon) {
    case 'Flower2': return <Flower2 className={className} />;
    case 'Store': return <Store className={className} />;
    case 'ShoppingBasket': return <ShoppingBasket className={className} />;
    case 'Heart': return <Heart className={className} />;
    case 'Gem': return <Gem className={className} />;
    default: return <Flower2 className={className} />;
  }
};

const BlogDetailPage = ({ slug, onBack }: { slug: string, onBack: () => void }) => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blogs/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setBlog(data);
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (blog) {
      const originalTitle = document.title;
      
      // Update Title
      document.title = `${blog.title} | Hoa Tươi Thanh Ngọc`;

      // Update Meta Description
      let metaDescription = document.querySelector('meta[name="description"]');
      const originalDescription = metaDescription?.getAttribute('content');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', blog.excerpt || blog.title);

      // Update OG Tags
      const ogTags = [
        { property: 'og:title', content: blog.title },
        { property: 'og:description', content: blog.excerpt || blog.title },
        { property: 'og:image', content: blog.image || '' },
        { property: 'og:type', content: 'article' },
        { property: 'og:url', content: window.location.href }
      ];

      const originalOgValues: Record<string, string | null> = {};

      ogTags.forEach(tag => {
        let element = document.querySelector(`meta[property="${tag.property}"]`);
        originalOgValues[tag.property] = element?.getAttribute('content') || null;
        if (!element) {
          element = document.createElement('meta');
          element.setAttribute('property', tag.property);
          document.head.appendChild(element);
        }
        element.setAttribute('content', tag.content);
      });

      return () => {
        document.title = originalTitle;
        if (metaDescription) {
          if (originalDescription) {
            metaDescription.setAttribute('content', originalDescription);
          } else {
            metaDescription.remove();
          }
        }
        ogTags.forEach(tag => {
          let element = document.querySelector(`meta[property="${tag.property}"]`);
          if (element) {
            const originalValue = originalOgValues[tag.property];
            if (originalValue) {
              element.setAttribute('content', originalValue);
            } else {
              element.remove();
            }
          }
        });
      };
    }
  }, [blog]);

  if (loading) {
    return (
      <div className="pt-32 pb-24 flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-brand-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="pt-32 pb-24 flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-black text-brand-brown mb-6">Không tìm thấy bài viết</h2>
        <button 
          onClick={onBack}
          className="bg-brand-brown text-white px-12 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-brand-blue transition-all shadow-xl"
        >
          Quay lại
        </button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="pt-32 pb-24 bg-brand-bg"
    >
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center gap-4 mb-12">
          <button 
            onClick={onBack}
            className="w-12 h-12 rounded-2xl bg-white border border-brand-brown/5 flex items-center justify-center text-brand-brown hover:bg-brand-blue hover:text-white transition-all shadow-lg"
          >
            <ChevronLeft size={24} />
          </button>
          <span className="text-brand-orange font-black tracking-[0.3em] uppercase text-[10px]">Góc Nhìn Nghệ Thuật</span>
        </div>

        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-brand-brown/10">
            <div className="h-80 md:h-[600px] relative">
              <img 
                src={optimizeImageUrl(blog.image || `https://picsum.photos/seed/${blog.id}/1200/800`, 1200)} 
                srcSet={`${optimizeImageUrl(blog.image || `https://picsum.photos/seed/${blog.id}/1200/800`, 400)} 400w, ${optimizeImageUrl(blog.image || `https://picsum.photos/seed/${blog.id}/1200/800`, 800)} 800w, ${optimizeImageUrl(blog.image || `https://picsum.photos/seed/${blog.id}/1200/800`, 1200)} 1200w`}
                sizes="100vw"
                alt={blog.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-brown/90 via-brand-brown/20 to-transparent flex items-end p-10 md:p-16">
              <div className="max-w-3xl">
                <span className="bg-brand-blue text-white text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-widest mb-6 inline-block shadow-xl">
                  {new Date(blog.created_at).toLocaleDateString('vi-VN')}
                </span>
                <h1 className="text-4xl md:text-7xl font-serif font-black text-white leading-tight">{blog.title}</h1>
              </div>
            </div>
          </div>
          
          <div className="p-10 md:p-16">
            <div className="flex flex-wrap items-center gap-8 mb-12 text-brand-brown/40 text-[10px] font-black uppercase tracking-[0.2em]">
              <span className="flex items-center gap-2"><Store size={16} className="text-brand-blue" /> Tác giả: {blog.author}</span>
              <span className="flex items-center gap-2"><Clock size={16} className="text-brand-blue" /> 5 phút đọc</span>
              <span className="flex items-center gap-2"><Calendar size={16} className="text-brand-blue" /> {new Date(blog.created_at).toLocaleDateString('vi-VN')}</span>
            </div>
            
            <div className="prose prose-stone max-w-none text-brand-brown/70 leading-relaxed text-xl font-medium italic serif">
              {blog.content.split('\n').map((para, i) => (
                <p key={i} className="mb-8">{para}</p>
              ))}
            </div>

            <div className="mt-20 pt-10 border-t border-brand-brown/5 flex flex-wrap justify-between items-center gap-8">
              <div className="flex gap-6">
                <button className="text-brand-blue hover:text-brand-orange font-black uppercase tracking-widest text-[10px] flex items-center gap-3 transition-all">
                  <Facebook size={20} /> Chia sẻ
                </button>
                <button className="text-brand-blue hover:text-brand-orange font-black uppercase tracking-widest text-[10px] flex items-center gap-3 transition-all">
                  <Instagram size={20} /> Instagram
                </button>
              </div>
              <button 
                onClick={onBack}
                className="bg-brand-brown text-white px-12 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-brand-blue transition-all shadow-xl shadow-brand-brown/20"
              >
                Quay lại danh sách
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [appliedMinPrice, setAppliedMinPrice] = useState<number | ''>('');
  const [appliedMaxPrice, setAppliedMaxPrice] = useState<number | ''>('');
  const [tempCategory, setTempCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [currentBlogPage, setCurrentBlogPage] = useState(1);
  const [sortBy, setSortBy] = useState<'newest' | 'name-asc'>('newest');
  const [currentView, setCurrentView] = useState<'home' | 'about' | 'contact' | 'offers' | 'blog'>('home');
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [orderForm, setOrderForm] = useState<Partial<Order>>({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    shippingAddress: '',
    deliveryDate: '',
    paymentMethod: 'cod',
  });
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const ITEMS_PER_PAGE = 12;
  const BLOGS_PER_PAGE = 6;

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#about') {
        setCurrentView('about');
      } else if (hash === '#contact') {
        setCurrentView('contact');
      } else if (hash === '#offers') {
        setCurrentView('offers');
      } else if (hash.startsWith('#blog/')) {
        const slug = hash.replace('#blog/', '');
        setSelectedBlogSlug(slug);
        setCurrentView('blog');
      } else if (hash === '#home' || hash === '') {
        setCurrentView('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      document.title = selectedProduct.name;
      
      // Update meta tags for SEO/Social Sharing
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) metaDescription.setAttribute('content', selectedProduct.description || `Mô tả sản phẩm ${selectedProduct.name}, ý nghĩa và màu sắc hoa`);
      
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', selectedProduct.name);
      
      const ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogDescription) ogDescription.setAttribute('content', selectedProduct.description || `Mô tả sản phẩm ${selectedProduct.name}, ý nghĩa và màu sắc hoa`);
      
      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage) ogImage.setAttribute('content', selectedProduct.image || '');
    } else {
      document.title = "Hoa Tươi Thanh Ngọc - Nghệ Thuật Hoa Tươi Bình Thạnh";
    }
  }, [selectedProduct]);

  // Admin State
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    price: undefined,
    category: 'bo-hoa',
    description: '',
    meaning: '',
    color: '',
    size: '',
    alt_text: '',
    image: '',
    images: '[]',
    is_new: 1,
    is_best_seller: 0
  });
  const [newBlog, setNewBlog] = useState<Partial<Blog>>({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    image: '',
    author: 'Admin'
  });
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [activeDetailImage, setActiveDetailImage] = useState<number>(0);
  const [uploading, setUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [bulkFile, setBulkFile] = useState<File | null>(null);
  const [bulkStatus, setBulkStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [showMeaningTooltip, setShowMeaningTooltip] = useState(false);
  const relatedScrollRef = useRef<HTMLDivElement>(null);

  const relatedProducts = selectedProduct 
    ? products
        .filter(p => p.category === selectedProduct.category && p.id !== selectedProduct.id)
        .slice(0, 10)
    : [];

  useEffect(() => {
    fetchProducts();
    fetchBlogs();
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      if (res.ok) {
        const data = await res.json();
        setSettings(data);
      }
    } catch (error) {
      console.error('Fetch settings error:', error);
    }
  };

  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      const filtered = products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery, products]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setActiveDetailImage(0);
  }, [selectedProduct]);

  const fetchProducts = async () => {
    try {
      console.log('Fetching products...');
      const res = await fetch('/api/products');
      console.log('Fetch products response status:', res.status);
      const contentType = res.headers.get('content-type');
      console.log('Fetch products content-type:', contentType);
      
      if (!res.ok) {
        const text = await res.text();
        console.error('Fetch products failed:', res.status, text);
        return;
      }
      
      if (!contentType || !contentType.includes('application/json')) {
        const text = await res.text();
        console.error('Expected JSON but got:', contentType, text.substring(0, 100));
        return;
      }

      const data = await res.json();
      console.log('Fetched products successfully:', data.length);
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blogs');
      if (!res.ok) {
        const text = await res.text();
        console.error('Fetch blogs failed:', res.status, text);
        return;
      }
      const data = await res.json();
      setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    
    // Show toast
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 right-4 bg-brand-blue text-white px-6 py-3 rounded-full shadow-2xl z-50 animate-bounce font-black text-xs uppercase tracking-widest';
    toast.innerText = `Đã thêm ${product.name} vào giỏ hàng`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: number, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + (item.product.price || 0) * item.quantity, 0);
  };

  const formatPrice = (price?: number) => {
    if (!price || price === 0) return 'Liên hệ';
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const scrollRelated = (direction: 'left' | 'right') => {
    if (relatedScrollRef.current) {
      const scrollAmount = 300;
      relatedScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const validateCheckoutStep = (step: number) => {
    const errors: Record<string, string> = {};
    if (step === 2) {
      if (!orderForm.customerName?.trim()) errors.customerName = 'Vui lòng nhập họ tên';
      if (!orderForm.customerPhone?.trim()) errors.customerPhone = 'Vui lòng nhập số điện thoại';
      else if (!/^\d{10,11}$/.test(orderForm.customerPhone.trim())) errors.customerPhone = 'Số điện thoại không hợp lệ';
      if (!orderForm.shippingAddress?.trim()) errors.shippingAddress = 'Vui lòng nhập địa chỉ giao hàng';
      if (!orderForm.deliveryDate) errors.deliveryDate = 'Vui lòng chọn ngày giao hoa';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const submitOrder = async () => {
    setUploading(true);
    try {
      const orderData = {
        customerName: orderForm.name,
        phone: orderForm.phone,
        address: orderForm.address,
        deliveryDate: orderForm.deliveryDate,
        paymentMethod: orderForm.paymentMethod,
        items: cart.map(item => ({
          productId: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity
        })),
        totalAmount: calculateTotal()
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) throw new Error('Failed to place order');
      
      const data = await res.json();
      if (data.success) {
        setCheckoutStep(4); // Success step
        setCart([]); // Clear cart
      }
    } catch (error) {
      alert('Lỗi khi đặt hàng. Vui lòng thử lại.');
      console.error('Order error:', error);
    } finally {
      setUploading(false);
    }
  };


  const uploadFile = async (file: File): Promise<string> => {
    setUploading(true);
    console.log(`Starting upload for file: ${file.name} (${file.size} bytes)`);
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      console.log(`Upload response status: ${res.status} ${res.statusText}`);
      const contentType = res.headers.get('content-type');
      const text = await res.text();
      
      if (!res.ok) {
        console.error(`Upload failed with status ${res.status}:`, text.substring(0, 200));
        let errorMessage = `Upload failed with status ${res.status}`;
        if (contentType && contentType.includes('application/json')) {
          try {
            const errorData = JSON.parse(text);
            errorMessage = errorData.error || errorMessage;
          } catch (e) {
            console.error('Failed to parse error JSON:', text);
          }
        }
        throw new Error(errorMessage);
      }

      if (contentType && contentType.includes('application/json')) {
        try {
          const data = JSON.parse(text);
          if (data.url) {
            console.log('Upload successful, URL:', data.url);
            return data.url;
          } else {
            console.error('Upload response missing URL:', data);
            throw new Error('Server response missing image URL');
          }
        } catch (e) {
          console.error('Failed to parse upload response as JSON:', text);
          throw new Error('Server returned invalid JSON response');
        }
      } else {
        console.error('Server returned non-JSON response:', contentType, text.substring(0, 200));
        throw new Error(`Server returned invalid response format: ${contentType || 'unknown'}`);
      }
    } catch (error: any) {
      console.error('uploadFile error:', error);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isMain: boolean = true) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const uploadedUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const url = await uploadFile(files[i]);
        uploadedUrls.push(url);
      }

      if (isMain) {
        setNewProduct({ ...newProduct, image: uploadedUrls[0] });
        setPreviewImage(uploadedUrls[0]);
      } else {
        const currentImages = JSON.parse(newProduct.images || '[]');
        const updatedImages = [...currentImages, ...uploadedUrls];
        setNewProduct({ ...newProduct, images: JSON.stringify(updatedImages) });
      }
    } catch (error) {
      console.error('Image upload error:', error);
      alert('Lỗi tải ảnh: ' + (error instanceof Error ? error.message : 'Lỗi không xác định'));
    } finally {
      setUploading(false);
    }
  };

  const removeAdditionalImage = (index: number) => {
    const currentImages = JSON.parse(newProduct.images || '[]');
    const updatedImages = currentImages.filter((_: any, i: number) => i !== index);
    setNewProduct({ ...newProduct, images: JSON.stringify(updatedImages) });
  };

  const handleSaveProduct = async () => {
    if (!newProduct.name) {
      alert('Vui lòng nhập tên sản phẩm');
      return;
    }

    try {
      const url = editingProduct ? `/api/products/${editingProduct.id}` : '/api/products';
      const method = editingProduct ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });
      
      if (res.ok) {
        setShowAddModal(false);
        setEditingProduct(null);
        setNewProduct({ 
          name: '', 
          price: undefined, 
          category: 'bo-hoa', 
          description: '', 
          meaning: '',
          color: '',
          size: '',
          image: '', 
          images: '[]', 
          is_new: 1, 
          is_best_seller: 0 
        });
        setPreviewImage(null);
        fetchProducts();
        alert(editingProduct ? 'Cập nhật sản phẩm thành công!' : 'Thêm sản phẩm thành công!');
      } else {
        let errorMessage = 'Không thể lưu sản phẩm';
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await res.json();
          errorMessage = data.error || errorMessage;
        } else {
          const text = await res.text();
          console.error('Non-JSON error response:', text);
          errorMessage = `Lỗi hệ thống (${res.status})`;
        }
        alert(`Lỗi: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Save product error:', error);
      alert('Lỗi kết nối máy chủ');
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description || '',
      meaning: product.meaning || '',
      color: product.color || '',
      size: product.size || '',
      alt_text: product.alt_text || '',
      image: product.image || '',
      images: product.images || '[]',
      is_new: product.is_new,
      is_best_seller: product.is_best_seller
    });
    setPreviewImage(product.image || null);
    setShowAddModal(true);
  };

  const handleDeleteProduct = async (id: number) => {
    if (!confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) return;
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      fetchProducts();
    } catch (error) {
      alert('Lỗi xóa sản phẩm');
    }
  };

  const handleSaveSettings = async (newSettings: Record<string, string>) => {
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSettings),
      });
      if (res.ok) {
        setSettings({ ...settings, ...newSettings });
        alert('Cập nhật cài đặt thành công!');
      }
    } catch (error) {
      console.error('Save settings error:', error);
      alert('Lỗi khi lưu cài đặt');
    }
  };

  const handleSaveBlog = async () => {
    try {
      const method = editingBlog ? 'PUT' : 'POST';
      const url = editingBlog ? `/api/blogs/${editingBlog.id}` : '/api/blogs';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBlog),
      });

      if (res.ok) {
        setShowBlogModal(false);
        setEditingBlog(null);
        setNewBlog({
          title: '',
          slug: '',
          content: '',
          excerpt: '',
          image: '',
          author: 'Admin'
        });
        fetchBlogs();
        alert(editingBlog ? 'Cập nhật bài viết thành công!' : 'Thêm bài viết thành công!');
      } else {
        const data = await res.json();
        alert('Lỗi: ' + (data.error || 'Không thể lưu bài viết'));
      }
    } catch (error) {
      console.error('Save blog error:', error);
      alert('Lỗi khi lưu bài viết');
    }
  };

  const handleBulkUpload = async () => {
    if (!bulkFile) return;
    setUploading(true);
    setBulkStatus(null);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('file', bulkFile);

    // Simulate progress for better UX
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    try {
      const res = await fetch('/api/products/bulk', {
        method: 'POST',
        body: formData,
      });
      
      clearInterval(progressInterval);
      setUploadProgress(100);

      if (res.ok) {
        const data = await res.json();
        setBulkStatus({ type: 'success', message: `Tải lên thành công ${data.count} sản phẩm!` });
        fetchProducts();
        setTimeout(() => {
          setShowBulkModal(false);
          setUploadProgress(0);
          setBulkFile(null);
        }, 2000);
      } else {
        let errorMessage = 'Lỗi xử lý file';
        try {
          const data = await res.json();
          errorMessage = data.error || errorMessage;
        } catch (e) {
          const text = await res.text();
          console.error('Bulk upload error response:', text);
        }
        setBulkStatus({ type: 'error', message: errorMessage });
        setUploadProgress(0);
      }
    } catch (error) {
      clearInterval(progressInterval);
      setBulkStatus({ type: 'error', message: 'Lỗi kết nối server' });
      setUploadProgress(0);
    } finally {
      setUploading(false);
    }
  };

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'name-asc': return a.name.localeCompare(b.name);
      case 'newest':
      default: return b.id - a.id;
    }
  });

  const filteredProducts = sortedProducts.filter(p => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMinPrice = appliedMinPrice === '' || (p.price || 0) >= appliedMinPrice;
    const matchesMaxPrice = appliedMaxPrice === '' || (p.price || 0) <= appliedMaxPrice;
    return matchesCategory && matchesSearch && matchesMinPrice && matchesMaxPrice;
  });

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const totalBlogPages = Math.ceil(blogs.length / BLOGS_PER_PAGE);

  useEffect(() => {
    if (currentBlogPage > totalBlogPages && totalBlogPages > 0) {
      setCurrentBlogPage(totalBlogPages);
    }
  }, [totalBlogPages, currentBlogPage]);

  const getPageNumbers = (current: number, total: number) => {
    const pages = [];
    const maxVisible = 5;
    if (total <= maxVisible) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      let start = Math.max(1, current - 2);
      let end = Math.min(total, start + maxVisible - 1);
      if (end === total) start = Math.max(1, end - maxVisible + 1);
      for (let i = start; i <= end; i++) pages.push(i);
    }
    return pages;
  };
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery, sortBy, appliedMinPrice, appliedMaxPrice]);

  return (
    <div className="min-h-screen text-brand-brown font-sans relative overflow-x-hidden selection:bg-brand-blue/20 selection:text-brand-blue">
      <AIAssistant products={products} />
      
      <div className="relative z-10">
        {/* Top Bar */}
      <div className="bg-brand-brown text-brand-bg py-2.5 px-4 text-[10px] font-bold uppercase tracking-widest flex justify-between items-center">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5"><Phone size={12} className="text-brand-orange" /> {CONTACT_INFO.phone}</span>
          <span className="hidden sm:flex items-center gap-1.5"><MapPin size={12} className="text-brand-orange" /> {CONTACT_INFO.address}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5"><Clock size={12} className="text-brand-orange" /> Mở cửa: {CONTACT_INFO.hours}</span>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-brand-bg/90 backdrop-blur-xl border-b border-brand-brown/5">
        <div className="max-w-7xl mx-auto px-4 h-20 md:h-24 flex items-center justify-between">
          <Logo onClick={() => setCurrentView('home')} logoUrl={settings.logo_url || LOGO_URL} />

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10 text-[11px] font-black uppercase tracking-[0.2em] text-brand-brown/60">
            <a 
              href="#home"
              onClick={() => setCurrentView('home')}
              className={`transition-colors ${currentView === 'home' && !window.location.hash.includes('products') ? 'text-brand-brown border-b-2 border-brand-orange pb-1' : 'hover:text-brand-blue'}`}
            >
              Trang Chủ
            </a>
            <a 
              href="#products" 
              onClick={(e) => {
                if (currentView !== 'home') {
                  setCurrentView('home');
                }
                setTimeout(() => {
                  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }} 
              className="hover:text-brand-blue transition-colors"
            >
              Sản Phẩm
            </a>
            <a 
              href="#offers" 
              onClick={() => setCurrentView('offers')}
              className={`transition-colors ${currentView === 'offers' ? 'text-brand-brown border-b-2 border-brand-orange pb-1' : 'hover:text-brand-blue'}`}
            >
              Khuyến Mãi
            </a>
            <a 
              href="#about"
              onClick={() => setCurrentView('about')}
              className={`transition-colors ${currentView === 'about' ? 'text-brand-brown border-b-2 border-brand-orange pb-1' : 'hover:text-brand-blue'}`}
            >
              Giới Thiệu
            </a>
            <a 
              href="#contact" 
              onClick={() => setCurrentView('contact')}
              className={`transition-colors ${currentView === 'contact' ? 'text-brand-brown border-b-2 border-brand-orange pb-1' : 'hover:text-brand-blue'}`}
            >
              Liên Hệ
            </a>
            {isAdmin && (
              <button 
                onClick={() => {
                  const productsSection = document.getElementById('products');
                  productsSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-brand-blue/10 text-brand-blue px-5 py-2 rounded-full font-black hover:bg-brand-blue hover:text-white transition-all flex items-center gap-2"
              >
                <Settings size={14} /> Quản Lý
              </button>
            )}
          </nav>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                const newAdminState = !isAdmin;
                setIsAdmin(newAdminState);
                const toast = document.createElement('div');
                toast.className = `fixed bottom-4 right-4 ${newAdminState ? 'bg-emerald-600' : 'bg-stone-600'} text-white px-6 py-3 rounded-full shadow-2xl z-50 animate-bounce font-black text-xs uppercase tracking-widest`;
                toast.innerText = newAdminState ? "Đã bật chế độ Quản Trị" : "Đã thoát chế độ Quản Trị";
                document.body.appendChild(toast);
                setTimeout(() => toast.remove(), 2000);
              }}
              className={`hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isAdmin ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 'bg-brand-brown/5 text-brand-brown/40 hover:bg-brand-brown/10'}`}
              title={isAdmin ? "Thoát chế độ Quản Trị" : "Chế độ Quản Trị"}
            >
              <Settings size={14} />
              {isAdmin ? 'Admin' : 'User'}
            </button>
            <button className="p-3 hover:bg-brand-paper rounded-2xl text-brand-brown transition-all">
              <Search size={20} />
            </button>
            <button 
              onClick={() => setShowCart(true)}
              className="relative w-12 h-12 rounded-2xl bg-brand-paper border border-brand-brown/5 flex items-center justify-center text-brand-brown hover:bg-brand-blue hover:text-white transition-all shadow-lg group"
            >
              <ShoppingBag size={20} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-brand-orange text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-lg animate-bounce">
                  {cart.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </button>

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-3 hover:bg-brand-paper rounded-2xl text-brand-brown transition-all"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-xl font-semibold text-brand-brown">
              <div className="mb-8 border-b border-brand-brown/5 pb-8">
                <Logo onClick={() => { setCurrentView('home'); setIsMenuOpen(false); window.location.hash = '#home'; }} logoUrl={settings.logo_url || LOGO_URL} />
              </div>
              <a href="#home" onClick={() => { setCurrentView('home'); setIsMenuOpen(false); }} className="text-left hover:text-brand-blue transition-colors">Trang Chủ</a>
              <a href="#products" onClick={() => { 
                setCurrentView('home'); 
                setIsMenuOpen(false);
                setTimeout(() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }), 100);
              }} className="hover:text-brand-blue transition-colors">Sản Phẩm</a>
              <a href="#offers" onClick={() => { setCurrentView('offers'); setIsMenuOpen(false); }} className="hover:text-brand-blue transition-colors">Khuyến Mãi</a>
              <a href="#about" onClick={() => { setCurrentView('about'); setIsMenuOpen(false); }} className="text-left hover:text-brand-blue transition-colors">Giới Thiệu</a>
              <a href="#contact" onClick={() => { setCurrentView('contact'); setIsMenuOpen(false); }} className="hover:text-brand-blue transition-colors">Liên Hệ</a>
              {isAdmin && (
                <button 
                  onClick={() => {
                    setIsMenuOpen(false);
                    const productsSection = document.getElementById('products');
                    productsSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex items-center justify-between text-brand-blue font-black"
                >
                  Quản Lý Cửa Hàng
                  <Settings size={20} />
                </button>
              )}
              <button 
                onClick={() => { 
                  const newAdminState = !isAdmin;
                  setIsAdmin(newAdminState); 
                  setIsMenuOpen(false); 
                  const toast = document.createElement('div');
                  toast.className = `fixed bottom-4 right-4 ${newAdminState ? 'bg-emerald-600' : 'bg-stone-600'} text-white px-6 py-3 rounded-full shadow-2xl z-50 animate-bounce font-black text-xs uppercase tracking-widest`;
                  toast.innerText = newAdminState ? "Đã bật chế độ Quản Trị" : "Đã thoát chế độ Quản Trị";
                  document.body.appendChild(toast);
                  setTimeout(() => toast.remove(), 2000);
                }}
                className={`flex items-center justify-between p-6 rounded-3xl transition-all ${isAdmin ? 'bg-emerald-50 text-emerald-700' : 'bg-brand-brown/5 text-brand-brown/40'}`}
              >
                <div className="flex items-center gap-3">
                  <Settings size={20} />
                  <span className="font-black uppercase tracking-widest text-xs">{isAdmin ? 'Thoát Quản Trị' : 'Chế độ Quản Trị'}</span>
                </div>
                <div className={`w-12 h-6 rounded-full relative transition-all ${isAdmin ? 'bg-emerald-500' : 'bg-stone-300'}`}>
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isAdmin ? 'left-7' : 'left-1'}`}></div>
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {currentView === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Hero Section */}
            <section className="relative h-[80vh] md:h-[90vh] flex items-center overflow-hidden bg-brand-paper">
              <div className="absolute inset-0 z-0">
                <picture>
                  <source 
                    type="image/webp"
                    srcSet={`${optimizeImageUrl(settings.hero_image_url || "/hero-bg.jpg", 640)} 640w, ${optimizeImageUrl(settings.hero_image_url || "/hero-bg.jpg", 1024)} 1024w, ${optimizeImageUrl(settings.hero_image_url || "/hero-bg.jpg", 1920)} 1920w`}
                    sizes="100vw"
                  />
                  <img 
                    src={optimizeImageUrl(settings.hero_image_url || "/hero-bg.jpg", 1920)} 
                    alt="Hoa Tươi Thanh Ngọc" 
                    className="w-full h-full object-cover opacity-60 mix-blend-multiply"
                    referrerPolicy="no-referrer"
                    loading="eager"
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-b from-brand-bg/20 via-transparent to-brand-bg"></div>
              </div>

              <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <span className="inline-block px-5 py-2 bg-brand-blue text-white text-[10px] font-black uppercase tracking-[0.3em] mb-8 rounded-full shadow-xl">
                      Nghệ Thuật Hoa Tươi
                    </span>
                    <h1 className="text-5xl sm:text-6xl md:text-8xl font-serif font-black mb-8 leading-[0.9] text-brand-brown tracking-tighter">
                      Đánh thức <br />
                      <span className="text-brand-orange italic font-normal">Cảm Xúc</span> <br />
                      từ thiên nhiên
                    </h1>
                    <p className="text-lg text-brand-brown/70 mb-12 max-w-md leading-relaxed font-medium">
                      Thanh Ngọc mang đến những thiết kế hoa độc bản, kết hợp giữa phong cách hiện đại và tâm hồn nghệ sĩ.
                    </p>
                    <div className="flex flex-wrap gap-5">
                      <button 
                        onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                        className="px-10 py-5 bg-brand-brown text-brand-bg rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-brand-blue transition-all shadow-2xl shadow-brand-brown/20 flex items-center gap-3"
                      >
                        Khám phá Catalog <ChevronRight size={18} />
                      </button>
                      <a href="#contact" onClick={() => setCurrentView('contact')} className="px-10 py-5 bg-white text-brand-brown border border-brand-brown/10 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-brand-paper transition-all flex items-center gap-3 shadow-xl">
                        Liên hệ ngay
                      </a>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="hidden lg:block relative"
                  >
                    <div className="relative z-10 rounded-[4rem] overflow-hidden shadow-2xl border-[12px] border-white transform rotate-3 aspect-[4/5]">
                      <img 
                        src={optimizeImageUrl(settings.hero_image_url || "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11", 800)} 
                        srcSet={`${optimizeImageUrl(settings.hero_image_url || "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11", 400)} 400w, ${optimizeImageUrl(settings.hero_image_url || "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11", 800)} 800w, ${optimizeImageUrl(settings.hero_image_url || "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11", 1200)} 1200w`}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        alt="Featured Bouquet" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute -top-10 -right-10 w-64 h-64 bg-brand-orange/10 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-brand-blue/10 rounded-full blur-3xl"></div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Categories */}
            <section className="py-24 bg-white">
              <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                  <div className="max-w-xl">
                    <span className="text-brand-orange font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Bộ sưu tập</span>
                    <h2 className="text-4xl md:text-6xl font-serif font-black text-brand-brown leading-tight">Danh Mục Sản Phẩm</h2>
                  </div>
                  <p className="text-brand-brown/60 font-medium max-w-xs">Lựa chọn phong cách hoa phù hợp với thông điệp bạn muốn gửi gắm.</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6">
                  <button 
                    onClick={() => setActiveCategory('all')}
                    className={`group relative h-60 sm:h-80 rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden transition-all duration-500 ${activeCategory === 'all' ? 'ring-4 ring-brand-orange ring-offset-4 scale-[1.02] shadow-2xl' : 'hover:scale-[1.02] shadow-xl'}`}
                  >
                    <img 
                      src={optimizeImageUrl("https://images.unsplash.com/photo-1526047932273-341f2a7631f9", 400)} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      alt="Tất cả"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-brown/90 via-brand-brown/20 to-transparent"></div>
                    <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 sm:right-8 text-left">
                      <span className="text-white/60 text-[8px] sm:text-[10px] font-black uppercase tracking-widest mb-1 sm:mb-2 block">Cửa hàng</span>
                      <h3 className="text-white text-xl sm:text-2xl font-serif font-black">Tất Cả</h3>
                    </div>
                  </button>

                  {CATEGORIES.map((cat) => (
                    <button 
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`group relative h-60 sm:h-80 rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden transition-all duration-500 ${activeCategory === cat.id ? 'ring-4 ring-brand-orange ring-offset-4 scale-[1.02] shadow-2xl' : 'hover:scale-[1.02] shadow-xl'}`}
                    >
                      <img 
                        src={optimizeImageUrl(settings[`category_image_${cat.id}`] || cat.image || PLACEHOLDER_IMAGE, 400)} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        alt={cat.name}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-brown/90 via-brand-brown/20 to-transparent"></div>
                      <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 sm:right-8 text-left">
                        <span className="text-white/60 text-[8px] sm:text-[10px] font-black uppercase tracking-widest mb-1 sm:mb-2 block">Danh mục</span>
                        <h3 className="text-white text-xl sm:text-2xl font-serif font-black">{cat.name}</h3>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* Products Grid */}
            <section id="products" className="py-24 bg-brand-bg">
              <div className="max-w-7xl mx-auto px-4">
                {/* Category Banner */}
                <AnimatePresence mode="wait">
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    key={activeCategory}
                    className="mb-12 rounded-[3rem] overflow-hidden h-64 sm:h-80 relative shadow-2xl border-8 border-white"
                  >
                    <img 
                      src={optimizeImageUrl(
                        activeCategory === 'all' 
                          ? (settings.all_products_banner || "https://images.unsplash.com/photo-1490750967868-88aa4486c946")
                          : (settings[`category_banner_${activeCategory}`] || CATEGORIES.find(c => c.id === activeCategory)?.image || PLACEHOLDER_IMAGE), 
                        1200
                      )} 
                      srcSet={
                        activeCategory === 'all'
                          ? `${optimizeImageUrl(settings.all_products_banner || "https://images.unsplash.com/photo-1490750967868-88aa4486c946", 400)} 400w, ${optimizeImageUrl(settings.all_products_banner || "https://images.unsplash.com/photo-1490750967868-88aa4486c946", 800)} 800w, ${optimizeImageUrl(settings.all_products_banner || "https://images.unsplash.com/photo-1490750967868-88aa4486c946", 1200)} 1200w`
                          : `${optimizeImageUrl(settings[`category_banner_${activeCategory}`] || CATEGORIES.find(c => c.id === activeCategory)?.image || PLACEHOLDER_IMAGE, 400)} 400w, ${optimizeImageUrl(settings[`category_banner_${activeCategory}`] || CATEGORIES.find(c => c.id === activeCategory)?.image || PLACEHOLDER_IMAGE, 800)} 800w, ${optimizeImageUrl(settings[`category_banner_${activeCategory}`] || CATEGORIES.find(c => c.id === activeCategory)?.image || PLACEHOLDER_IMAGE, 1200)} 1200w`
                      }
                      sizes="100vw"
                      alt={activeCategory === 'all' ? 'Tất cả sản phẩm' : CATEGORIES.find(c => c.id === activeCategory)?.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-brown/80 via-brand-brown/20 to-transparent flex items-center px-12">
                      <div className="max-w-2xl">
                        <span className="text-brand-orange font-black tracking-[0.3em] uppercase text-[10px] mb-4 block">Bộ sưu tập</span>
                        <h2 className="text-white text-4xl md:text-6xl font-serif font-black leading-tight">
                          {activeCategory === 'all' ? 'Tất Cả Sản Phẩm' : CATEGORIES.find(c => c.id === activeCategory)?.name}
                        </h2>
                        <p className="text-white/60 mt-4 font-medium max-w-md">
                          {activeCategory === 'all' 
                            ? 'Khám phá bộ sưu tập hoa tươi nghệ thuật đa dạng tại Thanh Ngọc.' 
                            : `Những mẫu ${CATEGORIES.find(c => c.id === activeCategory)?.name.toLowerCase()} tinh tế và đầy cảm xúc.`}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
                <div className="flex flex-col lg:flex-row gap-12">
                  {/* Sidebar - Desktop */}
                  <aside className="hidden lg:block w-72 shrink-0">
                    <div className="sticky top-32 space-y-10">
                      <div>
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-brand-brown/40 mb-6">Danh Mục</h3>
                        <div className="flex flex-col gap-2">
                          <button 
                            onClick={() => setTempCategory('all')}
                            className={`text-left px-4 py-3 rounded-xl font-bold transition-all ${tempCategory === 'all' ? 'bg-brand-brown text-brand-bg shadow-lg' : 'hover:bg-brand-paper text-brand-brown/60'}`}
                          >
                            Tất Cả Sản Phẩm
                          </button>
                          {CATEGORIES.map((cat) => (
                            <button 
                              key={cat.id}
                              onClick={() => setTempCategory(cat.id)}
                              className={`text-left px-4 py-3 rounded-xl font-bold transition-all ${tempCategory === cat.id ? 'bg-brand-brown text-brand-bg shadow-lg' : 'hover:bg-brand-paper text-brand-brown/60'}`}
                            >
                              {cat.name}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-brand-brown/40 mb-6">Khoảng Giá (VNĐ)</h3>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 gap-4">
                            <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest text-brand-brown/40 ml-2">Từ</label>
                              <input 
                                type="number" 
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value === '' ? '' : Number(e.target.value))}
                                placeholder="0"
                                className="w-full px-4 py-3 rounded-xl bg-white border border-brand-brown/5 outline-none focus:border-brand-blue font-bold text-brand-brown"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest text-brand-brown/40 ml-2">Đến</label>
                              <input 
                                type="number" 
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value === '' ? '' : Number(e.target.value))}
                                placeholder="5.000.000"
                                className="w-full px-4 py-3 rounded-xl bg-white border border-brand-brown/5 outline-none focus:border-brand-blue font-bold text-brand-brown"
                              />
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {[
                              { label: '< 500k', min: '', max: 500000 },
                              { label: '500k - 1tr', min: 500000, max: 1000000 },
                              { label: '> 1tr', min: 1000000, max: '' }
                            ].map((range, idx) => (
                              <button
                                key={idx}
                                onClick={() => {
                                  setMinPrice(range.min);
                                  setMaxPrice(range.max);
                                }}
                                className="px-3 py-1.5 rounded-lg bg-brand-paper border border-brand-brown/5 text-[10px] font-black uppercase tracking-widest text-brand-brown/60 hover:bg-brand-brown hover:text-white transition-all"
                              >
                                {range.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-brand-brown/5 space-y-4">
                        <button 
                          onClick={() => {
                            setActiveCategory(tempCategory);
                            setAppliedMinPrice(minPrice);
                            setAppliedMaxPrice(maxPrice);
                          }}
                          className="w-full bg-brand-brown text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-brand-blue transition-all shadow-xl shadow-brand-brown/20"
                        >
                          Áp Dụng
                        </button>
                        <button 
                          onClick={() => {
                            setMinPrice('');
                            setMaxPrice('');
                            setTempCategory('all');
                            setAppliedMinPrice('');
                            setAppliedMaxPrice('');
                            setActiveCategory('all');
                          }}
                          className="w-full py-2 text-[10px] font-black uppercase tracking-widest text-brand-brown/40 hover:text-brand-orange transition-all"
                        >
                          Đặt lại
                        </button>
                      </div>


                      {isAdmin && (
                        <div className="pt-8 border-t border-brand-brown/5 space-y-3">
                          <button 
                            onClick={() => setShowAddModal(true)}
                            className="w-full py-4 bg-brand-blue text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-brand-blue/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                          >
                            <Plus size={16} /> Thêm Sản Phẩm
                          </button>
                          <button 
                            onClick={() => setShowBulkModal(true)}
                            className="w-full py-4 bg-brand-paper text-brand-brown rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-brand-brown hover:text-white transition-all flex items-center justify-center gap-2"
                          >
                            <Upload size={16} /> Tải Lên Batch
                          </button>
                          <button 
                            onClick={() => setShowSettingsModal(true)}
                            className="w-full py-4 bg-brand-bg text-brand-brown rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-brand-blue hover:text-white transition-all flex items-center justify-center gap-2 border border-brand-brown/5"
                          >
                            <Settings size={16} /> Cài Đặt Trang Web
                          </button>
                        </div>
                      )}
                    </div>
                  </aside>

                  {/* Main Content */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-6">
                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <div className="relative flex-1 sm:w-80" ref={searchRef}>
                          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-brown/30" size={18} />
                          <input 
                            type="text"
                            placeholder="Tìm kiếm mẫu hoa..."
                            value={searchQuery}
                            onChange={(e) => {
                              setSearchQuery(e.target.value);
                              setShowSuggestions(true);
                            }}
                            onFocus={() => setShowSuggestions(true)}
                            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-brand-brown/5 focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all bg-white shadow-sm font-medium text-base"
                          />
                          
                          {/* Auto-suggestions Dropdown */}
                          <AnimatePresence>
                            {showSuggestions && suggestions.length > 0 && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-brand-brown/5 overflow-hidden z-50"
                              >
                                <div className="p-2">
                                  {suggestions.map((product) => (
                                    <button
                                      key={product.id}
                                      onClick={() => {
                                        setSearchQuery(product.name);
                                        setShowSuggestions(false);
                                        setSelectedProduct(product);
                                      }}
                                      className="w-full flex items-center gap-4 p-3 hover:bg-brand-bg rounded-xl transition-all text-left group"
                                    >
                                      <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-brand-brown/5">
                                        <img 
                                          src={optimizeImageUrl(product.image || PLACEHOLDER_IMAGE, 100)} 
                                          srcSet={`${optimizeImageUrl(product.image || PLACEHOLDER_IMAGE, 100)} 100w, ${optimizeImageUrl(product.image || PLACEHOLDER_IMAGE, 200)} 200w`}
                                          sizes="100px"
                                          alt={product.name}
                                          className="w-full h-full object-cover"
                                          referrerPolicy="no-referrer"
                                          loading="lazy"
                                        />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-black text-brand-brown truncate group-hover:text-brand-blue transition-colors">
                                          <HighlightedText text={product.name} highlight={searchQuery} />
                                        </h4>
                                        <p className="text-[10px] text-brand-brown/40 font-bold uppercase tracking-wider">
                                          {CATEGORIES.find(c => c.id === product.category)?.name}
                                        </p>
                                      </div>
                                      <ChevronRight size={14} className="text-brand-brown/20 group-hover:text-brand-blue transition-all" />
                                    </button>
                                  ))}
                                </div>
                                <div className="bg-brand-bg p-3 border-t border-brand-brown/5">
                                  <button 
                                    onClick={() => setShowSuggestions(false)}
                                    className="w-full text-center text-[10px] font-black text-brand-blue uppercase tracking-widest hover:text-brand-orange transition-colors"
                                  >
                                    Xem tất cả kết quả
                                  </button>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                        <button 
                          onClick={() => setIsFilterOpen(true)}
                          className="lg:hidden p-4 bg-white border border-brand-brown/5 rounded-2xl text-brand-brown shadow-sm hover:bg-brand-paper transition-all flex items-center justify-center"
                        >
                          <Filter size={20} />
                        </button>
                      </div>

                      <div className="flex items-center gap-4 w-full sm:w-auto">
                        <span className="text-[10px] font-black uppercase tracking-widest text-brand-brown/40 whitespace-nowrap">Sắp xếp:</span>
                        <select 
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value as any)}
                          className="flex-1 sm:w-48 px-4 py-4 rounded-2xl border border-brand-brown/5 focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all bg-white shadow-sm font-bold text-brand-brown text-base appearance-none cursor-pointer"
                          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%234e342e\' stroke-width=\'2\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' d=\'M19 9l-7 7-7-7\' /%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.2em' }}
                        >
                          <option value="newest">Mới nhất</option>
                          <option value="name-asc">Tên A-Z</option>
                        </select>
                      </div>
                    </div>

                    {loading ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">
                        {[1,2,3,4,5,6].map(i => (
                          <div key={i} className="bg-white rounded-[2.5rem] aspect-[3/4] animate-pulse border border-brand-brown/5"></div>
                        ))}
                      </div>
                    ) : filteredProducts.length === 0 ? (
                      <div className="py-32 text-center bg-white rounded-[3rem] border border-brand-brown/5 shadow-xl">
                        <div className="w-24 h-24 bg-brand-bg rounded-full flex items-center justify-center mx-auto mb-8 text-brand-brown/20">
                          <Search size={48} />
                        </div>
                        <h3 className="text-2xl font-serif font-black text-brand-brown mb-3">Không tìm thấy sản phẩm</h3>
                        <p className="text-brand-brown/50 font-medium mb-8">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm của bạn</p>
                        <button 
                          onClick={() => {
                            setActiveCategory('all');
                            setSearchQuery('');
                            setAppliedMinPrice('');
                            setAppliedMaxPrice('');
                            setMinPrice('');
                            setMaxPrice('');
                            setTempCategory('all');
                          }}
                          className="px-8 py-4 bg-brand-brown text-brand-bg rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-brand-blue transition-all"
                        >
                          Xóa tất cả bộ lọc
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-10">
                          <AnimatePresence mode="popLayout">
                            {paginatedProducts.map((product) => (
                              <motion.div 
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                whileHover={{ y: -10 }}
                                key={product.id}
                                onClick={() => setSelectedProduct(product)}
                                className="group bg-white rounded-[1.25rem] sm:rounded-[2.5rem] overflow-hidden border border-brand-brown/5 hover:shadow-2xl hover:shadow-brand-brown/10 transition-all duration-500 relative cursor-pointer flex flex-col h-full"
                              >
                                <div className="relative aspect-[4/5] overflow-hidden bg-brand-brown/5">
                                  <img 
                                    src={optimizeImageUrl(product.image || PLACEHOLDER_IMAGE, 600)} 
                                    srcSet={`${optimizeImageUrl(product.image || PLACEHOLDER_IMAGE, 400)} 400w, ${optimizeImageUrl(product.image || PLACEHOLDER_IMAGE, 800)} 800w, ${optimizeImageUrl(product.image || PLACEHOLDER_IMAGE, 1200)} 1200w`}
                                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                                    alt={product.alt_text || `${product.name} - ${product.meaning || ''} - Màu ${product.color || ''} - Size ${product.size || ''}`} 
                                    title={`${product.name} - ${product.meaning || ''}`}
                                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:animate-shake opacity-0"
                                    referrerPolicy="no-referrer"
                                    loading="lazy"
                                    onLoad={(e) => {
                                      e.currentTarget.classList.remove('opacity-0');
                                      e.currentTarget.parentElement?.classList.remove('bg-brand-brown/5');
                                    }}
                                  />
                                  
                                  {/* Badges */}
                                  <div className="absolute top-3 sm:top-6 left-3 sm:left-6 flex flex-col gap-1 sm:gap-2 z-10">
                                    {product.is_new === 1 && (
                                      <div className="bg-brand-blue text-white text-[7px] sm:text-[9px] font-black px-2 sm:px-4 py-1 sm:py-2 rounded-full uppercase tracking-[0.2em] shadow-xl backdrop-blur-md border border-white/20">
                                        Mới
                                      </div>
                                    )}
                                    {product.is_best_seller === 1 && (
                                      <div className="bg-brand-orange text-white text-[7px] sm:text-[9px] font-black px-2 sm:px-4 py-1 sm:py-2 rounded-full uppercase tracking-[0.2em] shadow-xl backdrop-blur-md border border-white/20">
                                        Bán Chạy
                                      </div>
                                    )}
                                  </div>

                                  {/* Admin Actions */}
                                  {isAdmin && (
                                    <div className="absolute top-3 sm:top-6 right-3 sm:right-6 flex gap-2 z-20">
                                      <button 
                                        onClick={(e) => { e.stopPropagation(); handleEditProduct(product); }}
                                        className="p-2 sm:p-3 bg-brand-blue text-white rounded-xl transition-all hover:bg-brand-brown shadow-xl backdrop-blur-sm border border-white/20"
                                        title="Chỉnh sửa"
                                      >
                                        <Settings size={14} className="sm:size-[18px]" />
                                      </button>
                                      <button 
                                        onClick={(e) => { e.stopPropagation(); handleDeleteProduct(product.id); }}
                                        className="p-2 sm:p-3 bg-red-600 text-white rounded-xl transition-all hover:bg-red-700 shadow-xl backdrop-blur-sm border border-white/20"
                                        title="Xóa sản phẩm"
                                      >
                                        <Trash2 size={14} className="sm:size-[18px]" />
                                      </button>
                                    </div>
                                  )}

                                  {/* Hover Overlay */}
                                  <div className="absolute inset-0 bg-brand-brown/10 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                                    <div className="bg-white/90 backdrop-blur-md text-brand-brown px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 flex items-center gap-3">
                                      Chi tiết sản phẩm <ChevronRight size={16} />
                                    </div>
                                  </div>
                                </div>

                                <div className="p-3 sm:p-10 flex flex-col flex-1">
                                  <div className="mb-2 sm:mb-6">
                                    <div className="flex justify-between items-start gap-2 sm:gap-4 mb-1 sm:mb-2">
                                      <h3 className="font-serif font-black text-sm sm:text-2xl text-brand-brown group-hover:text-brand-blue transition-colors leading-tight line-clamp-2">
                                        <HighlightedText text={product.name} highlight={searchQuery} />
                                      </h3>
                                      <div className="flex items-center text-brand-orange bg-brand-orange/5 px-1.5 sm:px-3 py-0.5 sm:py-1.5 rounded-lg sm:rounded-xl shrink-0">
                                        <Star size={8} className="sm:size-3" fill="currentColor" />
                                        <span className="text-[8px] sm:text-[10px] font-black ml-1 sm:ml-1.5">5.0</span>
                                      </div>
                                    </div>
                                    <span className="text-[7px] sm:text-[10px] font-black text-brand-brown/30 uppercase tracking-[0.2em]">
                                      {CATEGORIES.find(c => c.id === product.category)?.name || 'Hoa Tươi'}
                                    </span>
                                  </div>

                                  <p className="hidden sm:block text-brand-brown/60 text-xs sm:text-sm mb-6 sm:mb-8 line-clamp-2 leading-relaxed flex-1 font-medium">
                                    <HighlightedText text={product.description || ''} highlight={searchQuery} />
                                  </p>
                                  
                                  <div className="space-y-2 mb-6">
                                    {product.meaning && (
                                      <div className="flex items-center gap-2 text-[10px] font-bold text-brand-blue">
                                        <Heart size={12} />
                                        <span>Ý nghĩa: {product.meaning}</span>
                                      </div>
                                    )}
                                    <div className="flex gap-4">
                                      {product.color && (
                                        <div className="flex items-center gap-2 text-[10px] font-bold text-brand-brown/60">
                                          <div className="w-2 h-2 rounded-full bg-brand-orange" />
                                          <span>Màu: {product.color}</span>
                                        </div>
                                      )}
                                      {product.size && (
                                        <div className="flex items-center gap-2 text-[10px] font-bold text-brand-brown/60">
                                          <Filter size={12} />
                                          <span>Size: {product.size}</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center justify-between pt-3 sm:pt-8 border-t border-brand-brown/5 mt-auto">
                                    <div className="flex flex-col">
                                      <span className="text-[6px] sm:text-[9px] font-black text-brand-brown/30 uppercase tracking-widest mb-0.5 sm:mb-1">Tình trạng</span>
                                      <span className="text-xs sm:text-lg font-serif font-black text-brand-blue tracking-tight">
                                        Liên hệ báo giá
                                      </span>
                                    </div>
                                    <button 
                                      onClick={(e) => { e.stopPropagation(); setCurrentView('contact'); window.location.hash = '#contact'; }}
                                      className="bg-brand-brown text-brand-bg px-3 sm:px-6 py-1.5 sm:py-3 rounded-lg sm:rounded-2xl shadow-2xl shadow-brand-brown/20 hover:bg-brand-blue hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 sm:gap-2"
                                    >
                                      <Phone size={12} className="sm:size-5" />
                                      <span className="text-[9px] sm:text-xs font-black uppercase tracking-widest">Liên hệ</span>
                                    </button>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </div>

                        {totalPages > 1 && (
                          <div className="mt-20 flex justify-center items-center gap-3">
                            <button 
                              disabled={currentPage === 1}
                              onClick={() => {
                                setCurrentPage(prev => Math.max(1, prev - 1));
                                document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                              }}
                              className="p-4 rounded-2xl border border-brand-brown/5 bg-white text-brand-brown disabled:opacity-30 hover:bg-brand-paper transition-all shadow-lg"
                            >
                              <ChevronLeft size={20} />
                            </button>
                            <div className="flex gap-2">
                              {getPageNumbers(currentPage, totalPages).map((pageNum) => (
                                <button 
                                  key={pageNum}
                                  onClick={() => {
                                    setCurrentPage(pageNum);
                                    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                                  }}
                                  className={`w-12 h-12 rounded-2xl font-black text-xs transition-all shadow-lg ${currentPage === pageNum ? 'bg-brand-brown text-brand-bg' : 'bg-white text-brand-brown border border-brand-brown/5 hover:bg-brand-paper'}`}
                                >
                                  {pageNum}
                                </button>
                              ))}
                            </div>
                            <button 
                              disabled={currentPage === totalPages}
                              onClick={() => {
                                setCurrentPage(prev => Math.min(totalPages, prev + 1));
                                document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                              }}
                              className="p-4 rounded-2xl border border-brand-brown/5 bg-white text-brand-brown disabled:opacity-30 hover:bg-brand-paper transition-all shadow-lg"
                            >
                              <ChevronRight size={20} />
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* Blog Section */}
            <section id="blog" className="py-24 bg-brand-bg">
              <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                  <div className="max-w-xl">
                    <span className="text-brand-orange font-black tracking-[0.3em] uppercase text-[10px] mb-4 block">Kiến thức & Cảm hứng</span>
                    <h2 className="text-4xl md:text-6xl font-serif font-black text-brand-brown leading-tight">Góc Nhìn Nghệ Thuật</h2>
                  </div>
                  <div className="flex flex-col items-end gap-6">
                    <p className="text-brand-brown/50 font-medium max-w-md text-lg text-right">
                      Khám phá những bí quyết chăm sóc hoa, ý nghĩa các loài hoa và những câu chuyện đầy cảm hứng từ thế giới hoa tươi.
                    </p>
                    {isAdmin && (
                      <button 
                        onClick={() => {
                          setEditingBlog(null);
                          setNewBlog({
                            title: '',
                            slug: '',
                            content: '',
                            excerpt: '',
                            image: '',
                            author: 'Admin'
                          });
                          setShowBlogModal(true);
                        }}
                        className="px-8 py-4 bg-brand-blue text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-brand-brown transition-all shadow-xl shadow-brand-blue/20 flex items-center gap-3"
                      >
                        <Plus size={18} /> Thêm Bài Viết
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {blogs.slice((currentBlogPage - 1) * BLOGS_PER_PAGE, currentBlogPage * BLOGS_PER_PAGE).map((blog) => (
                    <motion.div 
                      key={blog.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      onClick={() => {
                        window.location.hash = `#blog/${blog.slug}`;
                        setSelectedBlogSlug(blog.slug);
                        setCurrentView('blog');
                      }}
                      className="group bg-white rounded-[2.5rem] overflow-hidden border border-brand-brown/5 hover:shadow-2xl hover:shadow-brand-brown/10 transition-all duration-500 cursor-pointer flex flex-col h-full"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img 
                          src={optimizeImageUrl(blog.image || `https://picsum.photos/seed/${blog.id}/800/600`, 600)} 
                          srcSet={`${optimizeImageUrl(blog.image || `https://picsum.photos/seed/${blog.id}/800/600`, 400)} 400w, ${optimizeImageUrl(blog.image || `https://picsum.photos/seed/${blog.id}/800/600`, 800)} 800w, ${optimizeImageUrl(blog.image || `https://picsum.photos/seed/${blog.id}/800/600`, 1200)} 1200w`}
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          alt={blog.title} 
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                        />
                        <div className="absolute top-6 left-6">
                          <span className="bg-white/90 backdrop-blur-md text-brand-brown text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-xl border border-white/20">
                            {new Date(blog.created_at).toLocaleDateString('vi-VN')}
                          </span>
                        </div>
                        {isAdmin && (
                          <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-all z-10">
                            <button 
                              onClick={(e) => { 
                                e.stopPropagation(); 
                                setEditingBlog(blog);
                                setNewBlog({ ...blog });
                                setShowBlogModal(true);
                              }}
                              className="p-3 bg-brand-blue text-white rounded-xl shadow-xl hover:bg-brand-brown"
                            >
                              <Settings size={18} />
                            </button>
                            <button 
                              onClick={(e) => { 
                                e.stopPropagation(); 
                                if(confirm('Xóa bài viết này?')) {
                                  fetch(`/api/blogs/${blog.id}`, { method: 'DELETE' })
                                    .then(() => fetchBlogs());
                                }
                              }}
                              className="p-3 bg-red-500 text-white rounded-xl shadow-xl hover:bg-red-600"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="p-10 flex flex-col flex-1">
                        <div className="flex items-center gap-6 text-brand-brown/40 text-[10px] font-black uppercase tracking-widest mb-6">
                          <span className="flex items-center gap-2">
                            <User size={14} className="text-brand-blue" />
                            {blog.author}
                          </span>
                          <span className="flex items-center gap-2">
                            <Calendar size={14} className="text-brand-blue" />
                            {new Date(blog.created_at).toLocaleDateString('vi-VN')}
                          </span>
                        </div>
                        <h3 className="text-2xl font-serif font-black text-brand-brown mb-4 group-hover:text-brand-blue transition-colors line-clamp-2 leading-tight">
                          {blog.title}
                        </h3>
                        <p className="text-brand-brown/60 text-sm mb-8 line-clamp-3 leading-relaxed font-medium flex-1">
                          {blog.excerpt}
                        </p>
                        <div className="flex items-center text-brand-blue font-black text-[10px] uppercase tracking-widest group-hover:gap-4 transition-all">
                          Đọc tiếp <ChevronRight size={16} className="ml-2" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {blogs.length === 0 && (
                  <div className="text-center py-20 bg-white rounded-[3rem] border border-brand-brown/5 shadow-sm">
                    <Flower2 size={48} className="mx-auto text-brand-blue/20 mb-6" />
                    <p className="text-brand-brown/40 font-black uppercase tracking-widest text-xs">Chưa có bài viết nào được đăng tải</p>
                  </div>
                )}

                {/* Blog Pagination */}
                {totalBlogPages > 1 && (
                  <div className="mt-20 flex flex-col items-center gap-8">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => {
                          setCurrentBlogPage(prev => Math.max(1, prev - 1));
                          document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        disabled={currentBlogPage === 1}
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all border ${currentBlogPage === 1 ? 'border-brand-brown/5 text-brand-brown/20' : 'border-brand-brown/10 text-brand-brown hover:bg-brand-brown hover:text-white shadow-xl shadow-brand-brown/5'}`}
                      >
                        <ChevronLeft size={20} />
                      </button>
                      
                      <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-brand-brown/5 shadow-sm">
                        {getPageNumbers(currentBlogPage, totalBlogPages).map((pageNum) => (
                          <button
                            key={pageNum}
                            onClick={() => {
                              setCurrentBlogPage(pageNum);
                              document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className={`w-10 h-10 rounded-xl font-black text-[10px] transition-all ${currentBlogPage === pageNum ? 'bg-brand-brown text-brand-bg shadow-lg' : 'text-brand-brown/40 hover:bg-brand-bg hover:text-brand-brown'}`}
                          >
                            {pageNum}
                          </button>
                        ))}
                      </div>

                      <button 
                        onClick={() => {
                          setCurrentBlogPage(prev => Math.min(totalBlogPages, prev + 1));
                          document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        disabled={currentBlogPage === totalBlogPages}
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all border ${currentBlogPage === totalBlogPages ? 'border-brand-brown/5 text-brand-brown/20' : 'border-brand-brown/10 text-brand-brown hover:bg-brand-brown hover:text-white shadow-xl shadow-brand-brown/5'}`}
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
                    <p className="text-[10px] font-black text-brand-brown/30 uppercase tracking-[0.2em]">
                      Trang {currentBlogPage} / {totalBlogPages}
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* Quick Contact Section */}
            <section id="contact-home" className="py-24 bg-white">
              <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                  <div>
                    <span className="text-brand-orange font-black tracking-[0.3em] uppercase text-[10px] mb-4 block">Kết nối với chúng tôi</span>
                    <h2 className="text-4xl md:text-6xl font-serif font-black text-brand-brown mb-8 leading-tight">Ghé Thăm Không Gian Hoa</h2>
                    <p className="text-brand-brown/60 mb-12 leading-relaxed text-lg font-medium">
                      Hoa Tươi Thanh Ngọc tọa lạc tại trung tâm Bình Thạnh, luôn sẵn sàng chào đón quý khách đến tham quan và lựa chọn những mẫu hoa tươi nhất trong ngày.
                    </p>
                    
                    <div className="space-y-8">
                      <div className="flex items-start gap-6 group">
                        <div className="w-16 h-16 bg-brand-bg rounded-2xl flex items-center justify-center text-brand-blue shrink-0 group-hover:bg-brand-blue group-hover:text-white transition-all shadow-lg">
                          <MapPin size={28} />
                        </div>
                        <div>
                          <h4 className="text-[10px] font-black text-brand-brown/40 uppercase tracking-widest mb-1">Địa Chỉ</h4>
                          <p className="text-brand-brown font-bold text-lg">{CONTACT_INFO.address}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-6 group">
                        <div className="w-16 h-16 bg-brand-bg rounded-2xl flex items-center justify-center text-brand-blue shrink-0 group-hover:bg-brand-blue group-hover:text-white transition-all shadow-lg">
                          <Phone size={28} />
                        </div>
                        <div>
                          <h4 className="text-[10px] font-black text-brand-brown/40 uppercase tracking-widest mb-1">Điện Thoại</h4>
                          <p className="text-brand-brown font-bold text-lg">{CONTACT_INFO.phone}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-brand-paper h-[550px] group">
                    <iframe 
                      src={CONTACT_INFO.maps_embed}
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen={true} 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      className="grayscale group-hover:grayscale-0 transition-all duration-1000"
                    ></iframe>
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {currentView === 'about' && <AboutPage onBack={() => { window.location.hash = '#home'; setCurrentView('home'); }} />}
        {currentView === 'contact' && <ContactPage onBack={() => { window.location.hash = '#home'; setCurrentView('home'); }} />}
        {currentView === 'offers' && (
          <OffersPage 
            onBack={() => { window.location.hash = '#home'; setCurrentView('home'); }} 
            onShopNow={() => {
              window.location.hash = '#home';
              setCurrentView('home');
              setTimeout(() => {
                document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
          />
        )}
        {currentView === 'blog' && selectedBlogSlug && (
          <BlogDetailPage 
            slug={selectedBlogSlug} 
            onBack={() => { 
              window.location.hash = '#home'; 
              setCurrentView('home'); 
            }} 
          />
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-brand-brown text-brand-bg pt-24 pb-12 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-blue via-brand-orange to-brand-blue opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <Logo onClick={() => setCurrentView('home')} />
              <p className="mt-8 text-brand-bg/60 leading-relaxed font-medium">
                Nơi hội tụ những tác phẩm hoa nghệ thuật tinh tế, mang đến vẻ đẹp và cảm xúc cho mọi không gian sống.
              </p>
              <div className="flex gap-4 mt-8">
                <a 
                  href="https://www.facebook.com/profile.php?id=61583985245876" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-blue hover:border-brand-blue transition-all group"
                  title="Facebook"
                >
                  <Facebook size={20} />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-blue hover:border-brand-blue transition-all group"
                  title="Instagram"
                >
                  <Instagram size={20} />
                </a>
                <a 
                  href="https://zalo.me/0934926092" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-blue hover:border-brand-blue transition-all group"
                  title="Zalo"
                >
                  <MessageCircle size={20} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-orange mb-8">Liên Kết</h4>
              <ul className="space-y-4">
                <li>
                  <a href="#home" onClick={() => setCurrentView('home')} className="text-brand-bg/60 hover:text-brand-blue transition-all font-bold flex items-center gap-2 group">
                    <div className="w-1 h-1 rounded-full bg-brand-blue opacity-0 group-hover:opacity-100 transition-all"></div>
                    Trang Chủ
                  </a>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      setCurrentView('home');
                      setTimeout(() => {
                        document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }} 
                    className="text-brand-bg/60 hover:text-brand-blue transition-all font-bold flex items-center gap-2 group cursor-pointer"
                  >
                    <div className="w-1 h-1 rounded-full bg-brand-blue opacity-0 group-hover:opacity-100 transition-all"></div>
                    Sản Phẩm
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      setCurrentView('home');
                      setTimeout(() => {
                        document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }} 
                    className="text-brand-bg/60 hover:text-brand-blue transition-all font-bold flex items-center gap-2 group cursor-pointer"
                  >
                    <div className="w-1 h-1 rounded-full bg-brand-blue opacity-0 group-hover:opacity-100 transition-all"></div>
                    Blog
                  </button>
                </li>
                <li>
                  <a href="#offers" onClick={() => setCurrentView('offers')} className="text-brand-bg/60 hover:text-brand-blue transition-all font-bold flex items-center gap-2 group">
                    <div className="w-1 h-1 rounded-full bg-brand-blue opacity-0 group-hover:opacity-100 transition-all"></div>
                    Khuyến Mãi
                  </a>
                </li>
                <li>
                  <a href="#about" onClick={() => setCurrentView('about')} className="text-brand-bg/60 hover:text-brand-blue transition-all font-bold flex items-center gap-2 group">
                    <div className="w-1 h-1 rounded-full bg-brand-blue opacity-0 group-hover:opacity-100 transition-all"></div>
                    Giới Thiệu
                  </a>
                </li>
                <li>
                  <a href="#contact" onClick={() => setCurrentView('contact')} className="text-brand-bg/60 hover:text-brand-blue transition-all font-bold flex items-center gap-2 group">
                    <div className="w-1 h-1 rounded-full bg-brand-blue opacity-0 group-hover:opacity-100 transition-all"></div>
                    Liên Hệ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-orange mb-8">Danh Mục</h4>
              <ul className="space-y-4">
                {CATEGORIES.map(cat => (
                  <li key={cat.id}>
                    <button 
                      onClick={() => {
                        setActiveCategory(cat.id);
                        setCurrentView('home');
                        setTimeout(() => {
                          document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      }}
                      className="text-brand-bg/60 hover:text-brand-blue transition-all font-bold flex items-center gap-2 group cursor-pointer"
                    >
                      <div className="w-1 h-1 rounded-full bg-brand-blue opacity-0 group-hover:opacity-100 transition-all"></div>
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-orange mb-8">Bản Tin</h4>
              <p className="text-[10px] font-black uppercase tracking-widest text-brand-bg/40 mb-4">Nhận thông tin về các mẫu hoa mới và ưu đãi đặc biệt.</p>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Email của bạn" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-brand-blue transition-all font-medium"
                />
                <button className="absolute right-2 top-2 bottom-2 px-6 bg-brand-blue text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-brand-orange transition-all">
                  Gửi
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-widest text-brand-bg/40">
            <p>© 2024 HOA TƯƠI THANH NGỌC. ALL RIGHTS RESERVED.</p>
            <div className="flex items-center gap-8">
              <a href="#" className="hover:text-brand-blue transition-all">Điều khoản dịch vụ</a>
              <a href="#" className="hover:text-brand-blue transition-all">Chính sách bảo mật</a>
              <button 
                onClick={() => {
                  const newAdminState = !isAdmin;
                  setIsAdmin(newAdminState);
                  const toast = document.createElement('div');
                  toast.className = `fixed bottom-4 right-4 ${newAdminState ? 'bg-emerald-600' : 'bg-stone-600'} text-white px-6 py-3 rounded-full shadow-2xl z-50 animate-bounce font-black text-xs uppercase tracking-widest`;
                  toast.innerText = newAdminState ? "Đã bật chế độ Quản Trị" : "Đã thoát chế độ Quản Trị";
                  document.body.appendChild(toast);
                  setTimeout(() => toast.remove(), 2000);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${isAdmin ? 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20' : 'hover:text-brand-blue'}`}
              >
                <Settings size={12} /> {isAdmin ? 'Thoát Quản Trị' : 'Quản Trị'}
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Add Product Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="absolute inset-0 bg-brand-brown/60 backdrop-blur-sm"
            ></motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-brand-bg rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-hidden border border-brand-brown/10"
            >
              <div className="p-8 border-b border-brand-brown/5 flex justify-between items-center bg-brand-paper">
                <h3 className="text-2xl font-black text-brand-brown uppercase tracking-widest">
                  {editingProduct ? 'Chỉnh Sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới'}
                </h3>
                <button 
                  onClick={() => { setShowAddModal(false); setEditingProduct(null); }} 
                  className="p-3 hover:bg-white rounded-2xl transition-all text-brand-brown/40 hover:text-brand-orange"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-8 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-brand-brown/40 mb-3">Tên Sản Phẩm</label>
                      <input 
                        type="text" 
                        value={newProduct.name}
                        onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                        className="w-full px-5 py-4 rounded-2xl border border-brand-brown/10 bg-white focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all font-bold text-brand-brown"
                        placeholder="Ví dụ: Bó Hoa Hồng Đỏ"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-brand-brown/40 mb-3">Ý Nghĩa Của Hoa</label>
                      <input 
                        type="text" 
                        value={newProduct.meaning || ''}
                        onChange={e => setNewProduct({...newProduct, meaning: e.target.value})}
                        className="w-full px-5 py-4 rounded-2xl border border-brand-brown/10 bg-white focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all font-bold text-brand-brown"
                        placeholder="Ví dụ: Tình yêu vĩnh cửu"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-brand-brown/40 mb-3">Màu Sắc</label>
                        <input 
                          type="text" 
                          value={newProduct.color || ''}
                          onChange={e => setNewProduct({...newProduct, color: e.target.value})}
                          className="w-full px-5 py-4 rounded-2xl border border-brand-brown/10 bg-white focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all font-bold text-brand-brown"
                          placeholder="Đỏ, Trắng..."
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-brand-brown/40 mb-3">Kích Thước</label>
                        <input 
                          type="text" 
                          value={newProduct.size || ''}
                          onChange={e => setNewProduct({...newProduct, size: e.target.value})}
                          className="w-full px-5 py-4 rounded-2xl border border-brand-brown/10 bg-white focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all font-bold text-brand-brown"
                          placeholder="40x60cm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-brand-brown/40 mb-3">Alt Text SEO (Tùy chọn)</label>
                      <input 
                        type="text" 
                        value={newProduct.alt_text || ''}
                        onChange={e => setNewProduct({...newProduct, alt_text: e.target.value})}
                        className="w-full px-5 py-4 rounded-2xl border border-brand-brown/10 bg-white focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all font-bold text-brand-brown"
                        placeholder="Ví dụ: Bó hoa hồng đỏ tặng sinh nhật sang trọng"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-brand-brown/40 mb-3">Danh Mục</label>
                      <select 
                        value={newProduct.category}
                        onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                        className="w-full px-5 py-4 rounded-2xl border border-brand-brown/10 bg-white focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all font-bold text-brand-brown appearance-none"
                      >
                        {CATEGORIES.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-brand-brown/40 mb-3">Hình Ảnh Chính</label>
                      <div className="relative group">
                        <div className={`w-full h-52 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center transition-all ${previewImage ? 'border-brand-blue bg-brand-blue/5' : 'border-brand-brown/10 bg-brand-paper hover:border-brand-blue/30'}`}>
                          {previewImage ? (
                            <img 
                              src={optimizeImageUrl(previewImage, 600)} 
                              className="w-full h-full object-cover rounded-[1.4rem]" 
                              alt="Preview"
                              loading="lazy"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <>
                              <Upload className="text-brand-brown/20 mb-3" size={32} />
                              <span className="text-[10px] font-black uppercase tracking-widest text-brand-brown/40">Tải ảnh chính</span>
                            </>
                          )}
                          <input 
                            type="file" 
                            onChange={(e) => handleImageUpload(e, true)}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            accept="image/*"
                          />
                        </div>
                        {uploading && (
                          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-3xl">
                            <div className="w-10 h-10 border-4 border-brand-blue border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-brand-brown/40 mb-3">Hình Ảnh Bổ Sung</label>
                      <div className="grid grid-cols-3 gap-4">
                        {JSON.parse(newProduct.images || '[]').map((img: string, idx: number) => (
                          <div key={idx} className="relative group aspect-square rounded-2xl overflow-hidden border border-brand-brown/10">
                            <img 
                              src={optimizeImageUrl(img, 200)} 
                              className="w-full h-full object-cover" 
                              alt={`Additional ${idx}`}
                              loading="lazy"
                              referrerPolicy="no-referrer"
                            />
                            <button 
                              onClick={() => removeAdditionalImage(idx)}
                              className="absolute top-1 right-1 p-1.5 bg-brand-orange text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                        <div className="relative aspect-square rounded-2xl border-2 border-dashed border-brand-brown/10 bg-brand-paper hover:border-brand-blue/30 flex flex-col items-center justify-center transition-all cursor-pointer">
                          <Plus className="text-brand-brown/20" size={24} />
                          <input 
                            type="file" 
                            multiple
                            onChange={(e) => handleImageUpload(e, false)}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            accept="image/*"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative">
                          <input 
                            type="checkbox" 
                            checked={!!newProduct.is_new}
                            onChange={e => setNewProduct({...newProduct, is_new: e.target.checked ? 1 : 0})}
                            className="w-6 h-6 rounded-lg border-brand-brown/10 text-brand-blue focus:ring-brand-blue transition-all cursor-pointer"
                          />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-brand-brown/60 group-hover:text-brand-blue transition-all">Mới</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative">
                          <input 
                            type="checkbox" 
                            checked={!!newProduct.is_best_seller}
                            onChange={e => setNewProduct({...newProduct, is_best_seller: e.target.checked ? 1 : 0})}
                            className="w-6 h-6 rounded-lg border-brand-brown/10 text-brand-blue focus:ring-brand-blue transition-all cursor-pointer"
                          />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-brand-brown/60 group-hover:text-brand-orange transition-all">Bán chạy</span>
                      </label>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-brand-brown/40 mb-3">Ảnh Bổ Sung (URL, cách nhau bởi dấu phẩy)</label>
                      <textarea 
                        rows={2}
                        value={JSON.parse(newProduct.images || '[]').join(', ')}
                        onChange={e => {
                          const urls = e.target.value.split(',').map(u => u.trim()).filter(u => u);
                          setNewProduct({...newProduct, images: JSON.stringify(urls)});
                        }}
                        className="w-full px-5 py-4 rounded-2xl border border-brand-brown/10 bg-white focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all font-bold text-brand-brown text-xs"
                        placeholder="https://image1.jpg, https://image2.jpg"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-brand-brown/40 mb-3">Mô Tả</label>
                  <textarea 
                    rows={4}
                    value={newProduct.description}
                    onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                    className="w-full px-5 py-4 rounded-2xl border border-brand-brown/10 bg-white focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all font-bold text-brand-brown"
                    placeholder="Mô tả ngắn về sản phẩm..."
                  ></textarea>
                </div>
              </div>
              <div className="p-8 bg-brand-paper flex justify-end gap-6 border-t border-brand-brown/5">
                <button 
                  onClick={() => { setShowAddModal(false); setEditingProduct(null); }}
                  className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-brand-brown/40 hover:text-brand-orange transition-all"
                >
                  Hủy
                </button>
                <button 
                  onClick={handleSaveProduct}
                  disabled={uploading || !newProduct.name}
                  className="px-12 py-4 bg-brand-blue text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-brand-orange transition-all shadow-xl shadow-brand-blue/20 disabled:opacity-50"
                >
                  Lưu Sản Phẩm
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isFilterOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-start">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="absolute inset-0 bg-brand-brown/60 backdrop-blur-sm"
            ></motion.div>
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative bg-brand-bg h-full w-full max-w-xs shadow-2xl flex flex-col border-r border-brand-brown/10"
            >
              <div className="p-8 border-b border-brand-brown/5 flex justify-between items-center bg-brand-paper">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-orange/10 flex items-center justify-center text-brand-orange">
                    <Filter size={24} />
                  </div>
                  <h3 className="text-xl font-black text-brand-brown uppercase tracking-widest">Bộ Lọc</h3>
                </div>
                <button onClick={() => setIsFilterOpen(false)} className="p-3 hover:bg-white rounded-2xl transition-all text-brand-brown/40 hover:text-brand-orange">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-10">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-brand-brown/40 mb-6">Danh Mục</h3>
                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={() => setTempCategory('all')}
                      className={`text-left px-4 py-3 rounded-xl font-bold transition-all ${tempCategory === 'all' ? 'bg-brand-brown text-brand-bg shadow-lg' : 'hover:bg-brand-paper text-brand-brown/60'}`}
                    >
                      Tất Cả Sản Phẩm
                    </button>
                    {CATEGORIES.map((cat) => (
                      <button 
                        key={cat.id}
                        onClick={() => setTempCategory(cat.id)}
                        className={`text-left px-4 py-3 rounded-xl font-bold transition-all ${tempCategory === cat.id ? 'bg-brand-brown text-brand-bg shadow-lg' : 'hover:bg-brand-paper text-brand-brown/60'}`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-brand-brown/40 mb-6">Khoảng Giá (VNĐ)</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-brand-brown/40 ml-2">Từ</label>
                        <input 
                          type="number" 
                          value={minPrice}
                          onChange={(e) => setMinPrice(e.target.value === '' ? '' : Number(e.target.value))}
                          placeholder="0"
                          className="w-full px-4 py-3 rounded-xl bg-white border border-brand-brown/5 outline-none focus:border-brand-blue font-bold text-brand-brown"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-brand-brown/40 ml-2">Đến</label>
                        <input 
                          type="number" 
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(e.target.value === '' ? '' : Number(e.target.value))}
                          placeholder="5.000.000"
                          className="w-full px-4 py-3 rounded-xl bg-white border border-brand-brown/5 outline-none focus:border-brand-blue font-bold text-brand-brown"
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { label: '< 500k', min: '', max: 500000 },
                        { label: '500k - 1tr', min: 500000, max: 1000000 },
                        { label: '> 1tr', min: 1000000, max: '' }
                      ].map((range, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setMinPrice(range.min);
                            setMaxPrice(range.max);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-brand-paper border border-brand-brown/5 text-[10px] font-black uppercase tracking-widest text-brand-brown/60 hover:bg-brand-brown hover:text-white transition-all"
                        >
                          {range.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 border-t border-brand-brown/5 bg-brand-paper space-y-4">
                <button 
                  onClick={() => {
                    setActiveCategory(tempCategory);
                    setAppliedMinPrice(minPrice);
                    setAppliedMaxPrice(maxPrice);
                    setIsFilterOpen(false);
                  }}
                  className="w-full bg-brand-brown text-white py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-brand-blue transition-all shadow-xl shadow-brand-brown/20"
                >
                  Áp Dụng
                </button>
                <button 
                  onClick={() => {
                    setMinPrice('');
                    setMaxPrice('');
                    setTempCategory('all');
                    setAppliedMinPrice('');
                    setAppliedMaxPrice('');
                    setActiveCategory('all');
                  }}
                  className="w-full py-4 text-[10px] font-black uppercase tracking-widest text-brand-brown/40 hover:text-brand-orange transition-all"
                >
                  Đặt lại
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Product Details Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-brand-brown/60 backdrop-blur-sm"
            ></motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-brand-bg rounded-[2rem] sm:rounded-[3rem] shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col md:flex-row border border-brand-brown/10"
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-10 p-2 md:p-3 bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl hover:bg-white transition-all shadow-lg text-brand-brown/40 hover:text-brand-orange"
              >
                <X size={20} className="md:size-6" />
              </button>
              
              <div className="w-full md:w-1/2 h-[300px] md:h-auto relative flex flex-col">
                <div className="flex-1 relative overflow-hidden group/main">
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={activeDetailImage}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      src={optimizeImageUrl([selectedProduct.image, ...JSON.parse(selectedProduct.images || '[]')][activeDetailImage] || PLACEHOLDER_IMAGE, 1200)} 
                      srcSet={`${optimizeImageUrl([selectedProduct.image, ...JSON.parse(selectedProduct.images || '[]')][activeDetailImage] || PLACEHOLDER_IMAGE, 400)} 400w, ${optimizeImageUrl([selectedProduct.image, ...JSON.parse(selectedProduct.images || '[]')][activeDetailImage] || PLACEHOLDER_IMAGE, 800)} 800w, ${optimizeImageUrl([selectedProduct.image, ...JSON.parse(selectedProduct.images || '[]')][activeDetailImage] || PLACEHOLDER_IMAGE, 1200)} 1200w, ${optimizeImageUrl([selectedProduct.image, ...JSON.parse(selectedProduct.images || '[]')][activeDetailImage] || PLACEHOLDER_IMAGE, 1600)} 1600w`}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      alt={selectedProduct.alt_text || `${selectedProduct.name} - ${selectedProduct.meaning || ''} - Màu ${selectedProduct.color || ''} - Size ${selectedProduct.size || ''}`}
                      title={`${selectedProduct.name} - ${selectedProduct.meaning || ''}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                  </AnimatePresence>

                  {/* Carousel Navigation */}
                  {[selectedProduct.image, ...JSON.parse(selectedProduct.images || '[]')].length > 1 && (
                    <>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          const allImages = [selectedProduct.image, ...JSON.parse(selectedProduct.images || '[]')];
                          setActiveDetailImage((prev) => (prev - 1 + allImages.length) % allImages.length);
                        }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 backdrop-blur-sm rounded-2xl hover:bg-white transition-all shadow-lg text-brand-brown/40 hover:text-brand-blue opacity-0 group-hover/main:opacity-100"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          const allImages = [selectedProduct.image, ...JSON.parse(selectedProduct.images || '[]')];
                          setActiveDetailImage((prev) => (prev + 1) % allImages.length);
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 backdrop-blur-sm rounded-2xl hover:bg-white transition-all shadow-lg text-brand-brown/40 hover:text-brand-blue opacity-0 group-hover/main:opacity-100"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </>
                  )}

                  <div className="absolute top-8 left-8 flex flex-col gap-3">
                    {selectedProduct.is_new && (
                      <span className="bg-brand-blue text-white text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-widest shadow-xl">Mới</span>
                    )}
                    {selectedProduct.is_best_seller && (
                      <span className="bg-brand-orange text-white text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-widest shadow-xl">Bán Chạy</span>
                    )}
                  </div>
                </div>
                
                {/* Image Gallery Thumbnails */}
                {JSON.parse(selectedProduct.images || '[]').length > 0 && (
                  <div className="p-4 bg-brand-paper flex gap-3 overflow-x-auto border-t border-brand-brown/5">
                    {[selectedProduct.image, ...JSON.parse(selectedProduct.images || '[]')].map((img, idx) => (
                      <button 
                        key={idx}
                        onClick={() => setActiveDetailImage(idx)}
                        className={`w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${activeDetailImage === idx ? 'border-brand-blue scale-110 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'}`}
                      >
                        <img 
                          src={optimizeImageUrl(img, 200)} 
                          className="w-full h-full object-cover" 
                          alt={selectedProduct.alt_text ? `${selectedProduct.alt_text} - Ảnh ${idx + 1}` : `${selectedProduct.name} - ${selectedProduct.meaning || ''} - Màu ${selectedProduct.color || ''} - Size ${selectedProduct.size || ''} - Ảnh ${idx + 1}`}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="w-full md:w-1/2 p-6 md:p-16 flex flex-col overflow-y-auto max-h-[90vh] md:max-h-none">
                <header className="mb-6 md:mb-10">
                  <span className="text-brand-blue font-black text-[9px] md:text-[10px] uppercase tracking-[0.3em] mb-2 md:mb-4 block">
                    {CATEGORIES.find(c => c.id === selectedProduct.category)?.name || 'Sản phẩm'}
                  </span>
                  <h1 className="text-2xl md:text-5xl font-black text-brand-brown mb-4 md:mb-6 leading-tight">{selectedProduct.name}</h1>
                  <div className="flex items-center text-brand-orange bg-brand-orange/5 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-brand-orange/10 w-fit">
                    <Star size={14} className="md:size-4" fill="currentColor" />
                    <span className="text-[10px] md:text-xs font-black ml-2 tracking-widest">5.0 (24 Đánh giá)</span>
                  </div>
                </header>

                <section id="product-details" className="space-y-8 md:space-y-10">
                  <div className="group relative">
                    <h2 
                      onMouseEnter={() => setShowMeaningTooltip(true)}
                      onMouseLeave={() => setShowMeaningTooltip(false)}
                      className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-brand-orange mb-3 md:mb-4 flex items-center gap-3 cursor-help w-fit"
                    >
                      <div className="w-6 md:w-8 h-px bg-brand-orange/30"></div>
                      Ý Nghĩa Của Hoa
                      <AlertCircle size={10} className="md:size-3 text-brand-orange/40" />
                    </h2>
                    
                    <AnimatePresence>
                      {showMeaningTooltip && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute bottom-full left-0 mb-4 w-64 md:w-72 p-5 md:p-6 bg-brand-brown text-white rounded-[1.5rem] md:rounded-[2rem] shadow-2xl z-50 pointer-events-none border border-white/10"
                        >
                          <div className="relative">
                            <div className="absolute -bottom-7 md:-bottom-8 left-6 w-3 h-3 md:w-4 md:h-4 bg-brand-brown rotate-45 border-r border-b border-white/10"></div>
                            <span className="text-brand-orange font-black tracking-[0.2em] uppercase text-[7px] md:text-[8px] mb-2 block">Thông điệp từ hoa</span>
                            <p className="font-medium leading-relaxed text-xs md:text-sm italic serif">
                              {selectedProduct.meaning || "Loài hoa này mang trong mình thông điệp về sự chân thành và tình yêu thuần khiết."}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <p className="text-brand-brown font-serif italic text-lg md:text-xl leading-relaxed">
                      {selectedProduct.meaning || "Loài hoa này mang trong mình thông điệp về sự chân thành và tình yêu thuần khiết."}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-6 md:gap-8">
                    <div>
                      <h3 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-brand-brown/40 mb-2 md:mb-3">Màu Sắc</h3>
                      <p className="text-brand-brown font-bold text-base md:text-lg">{selectedProduct.color || "Đa dạng"}</p>
                    </div>
                    <div>
                      <h3 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-brand-brown/40 mb-2 md:mb-3">Kích Thước</h3>
                      <p className="text-brand-brown font-bold text-base md:text-lg">{selectedProduct.size || "Tiêu chuẩn"}</p>
                    </div>
                  </div>

                  {isAdmin && (
                    <div>
                      <h3 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-brand-brown/40 mb-2 md:mb-3">Alt Text SEO</h3>
                      <p className="text-brand-brown/60 font-mono text-[10px] bg-brand-paper p-3 rounded-xl border border-brand-brown/5">
                        {selectedProduct.alt_text || `${selectedProduct.name} - Hoa tươi chất lượng cao tại Thanh Ngọc`}
                      </p>
                    </div>
                  )}

                  <div>
                    <h3 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-brand-brown/40 mb-3 md:mb-4">Mô Tả</h3>
                    <div className="text-brand-brown/70 leading-relaxed text-base md:text-lg font-medium space-y-4">
                      <p>{selectedProduct.description || "Sản phẩm được thiết kế tỉ mỉ bởi các nghệ nhân tại Thanh Ngọc, sử dụng những bông hoa tươi nhất được tuyển chọn trong ngày."}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-brown/40 mb-4">Thông tin thêm</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 text-sm font-medium text-brand-brown/60">
                        <CheckCircle2 size={16} className="text-brand-blue" />
                        Tặng kèm thiệp chúc mừng và banner miễn phí
                      </li>
                      <li className="flex items-center gap-3 text-sm font-medium text-brand-brown/60">
                        <CheckCircle2 size={16} className="text-brand-blue" />
                        Giao hoa hỏa tốc trong vòng 60-90 phút
                      </li>
                      <li className="flex items-center gap-3 text-sm font-medium text-brand-brown/60">
                        <CheckCircle2 size={16} className="text-brand-blue" />
                        Cam kết hoa tươi như hình mẫu
                      </li>
                    </ul>
                  </div>

                  {/* Related Products Section */}
                  {relatedProducts.length > 0 && (
                    <div className="pt-10 border-t border-brand-brown/5">
                      <div className="flex items-center justify-between mb-8">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-orange">Sản phẩm liên quan</h4>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => scrollRelated('left')}
                            className="w-8 h-8 rounded-full bg-white border border-brand-brown/5 flex items-center justify-center text-brand-brown hover:bg-brand-blue hover:text-white transition-all shadow-md"
                          >
                            <ChevronLeft size={16} />
                          </button>
                          <button 
                            onClick={() => scrollRelated('right')}
                            className="w-8 h-8 rounded-full bg-white border border-brand-brown/5 flex items-center justify-center text-brand-brown hover:bg-brand-blue hover:text-white transition-all shadow-md"
                          >
                            <ChevronRight size={16} />
                          </button>
                        </div>
                      </div>
                      
                      <div 
                        ref={relatedScrollRef}
                        className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                      >
                        {relatedProducts.map((p) => (
                          <div 
                            key={p.id} 
                            onClick={() => {
                              setSelectedProduct(p);
                              setActiveDetailImage(0);
                              if (relatedScrollRef.current) {
                                relatedScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                              }
                            }}
                            className="min-w-[140px] sm:min-w-[180px] group cursor-pointer snap-start"
                          >
                            <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-3 bg-brand-paper">
                              <img 
                                src={optimizeImageUrl(p.image, 300)} 
                                alt={p.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:animate-shake"
                                loading="lazy"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <h5 className="text-[10px] font-bold text-brand-brown truncate group-hover:text-brand-blue transition-colors">{p.name}</h5>
                            <p className="text-[9px] font-black text-brand-orange mt-1">{formatPrice(p.price)}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </section>
                
                <footer className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-brand-brown/5">
                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6 md:mb-8">
                    <button 
                      onClick={() => {
                        addToCart(selectedProduct);
                        setShowCart(true);
                        setSelectedProduct(null);
                      }}
                      className="flex-1 bg-brand-orange text-white py-4 md:py-5 rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-[9px] md:text-[10px] hover:bg-brand-blue transition-all shadow-xl shadow-brand-orange/20 flex items-center justify-center gap-2 md:gap-3"
                    >
                      <ShoppingBag size={18} className="md:size-5" />
                      Mua ngay
                    </button>
                    <button 
                      onClick={() => {
                        addToCart(selectedProduct);
                      }}
                      className="flex-1 bg-brand-blue text-white py-4 md:py-5 rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-[9px] md:text-[10px] hover:bg-brand-orange transition-all shadow-xl shadow-brand-blue/20 flex items-center justify-center gap-2 md:gap-3"
                    >
                      <Plus size={18} className="md:size-5" />
                      Thêm vào giỏ
                    </button>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <button 
                      onClick={() => {
                        setCurrentView('contact');
                        window.location.hash = '#contact';
                        setSelectedProduct(null);
                      }}
                      className="flex-1 bg-brand-paper text-brand-brown py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-brand-brown hover:text-white transition-all shadow-xl border border-brand-brown/5 flex items-center justify-center gap-3"
                    >
                      <Phone size={20} />
                      Liên hệ tư vấn
                    </button>
                  </div>
                  <p className="text-[9px] font-black text-brand-brown/20 uppercase tracking-widest text-center">
                    &copy; {new Date().getFullYear()} - HOA TƯƠI THANH NGỌC
                  </p>
                </footer>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bulk Upload Modal */}
      <AnimatePresence>
        {showBulkModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowBulkModal(false)}
              className="absolute inset-0 bg-brand-brown/60 backdrop-blur-sm"
            ></motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-brand-bg rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden border border-brand-brown/10"
            >
              <div className="p-8 border-b border-brand-brown/5 flex justify-between items-center bg-brand-paper">
                <h3 className="text-2xl font-black text-brand-brown uppercase tracking-widest">Tải Lên Hàng Loạt</h3>
                <button onClick={() => setShowBulkModal(false)} className="p-3 hover:bg-white rounded-2xl transition-all text-brand-brown/40 hover:text-brand-orange">
                  <X size={24} />
                </button>
              </div>
              <div className="p-8">
                <div className="bg-brand-blue/5 border border-brand-blue/10 rounded-3xl p-8 mb-8">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-blue mb-4 flex items-center gap-2">
                    <AlertCircle size={18} /> Hướng dẫn file CSV
                  </h4>
                  <p className="text-sm text-brand-brown/60 leading-relaxed mb-6 font-medium italic serif">
                    File CSV cần có các cột: <code className="bg-white px-1 rounded not-italic serif">name</code>, <code className="bg-white px-1 rounded not-italic serif">price</code>, <code className="bg-white px-1 rounded not-italic serif">category</code>, <code className="bg-white px-1 rounded not-italic serif">description</code>, <code className="bg-white px-1 rounded not-italic serif">image</code>, <code className="bg-white px-1 rounded not-italic serif">is_new</code>, <code className="bg-white px-1 rounded not-italic serif">is_best_seller</code>.
                  </p>
                  <button 
                    onClick={() => {
                      const csvContent = "name,price,category,description,image,is_new,is_best_seller\nBó Hoa Hồng Đỏ,500000,bo-hoa,Mô tả sản phẩm,,1,0";
                      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                      const link = document.createElement("a");
                      const url = URL.createObjectURL(blob);
                      link.setAttribute("href", url);
                      link.setAttribute("download", "template_san_pham.csv");
                      link.style.visibility = 'hidden';
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="text-[10px] font-black uppercase tracking-widest text-brand-blue hover:text-brand-orange flex items-center gap-2 transition-all"
                  >
                    <Upload size={14} className="rotate-180" /> Tải xuống tệp mẫu CSV
                  </button>
                </div>

                <div className="relative group">
                  <div className={`w-full h-52 rounded-[2rem] border-2 border-dashed flex flex-col items-center justify-center transition-all ${bulkFile ? 'border-brand-blue bg-brand-blue/5' : 'border-brand-brown/10 bg-brand-paper hover:border-brand-blue/30'}`}>
                    {bulkFile ? (
                      <div className="flex flex-col items-center p-8 text-center">
                        <div className="w-20 h-20 bg-brand-blue/10 text-brand-blue rounded-3xl flex items-center justify-center mb-4 shadow-inner">
                          <CheckCircle2 size={32} />
                        </div>
                        <h4 className="font-black text-brand-brown uppercase tracking-widest text-[10px] mb-2 truncate max-w-[250px]">{bulkFile.name}</h4>
                        <p className="text-[10px] font-black uppercase tracking-widest text-brand-blue/60 mb-6">
                          Kích thước: {(bulkFile.size / 1024).toFixed(1)} KB
                        </p>
                        <button 
                          onClick={(e) => { e.stopPropagation(); setBulkFile(null); setBulkStatus(null); }}
                          className="text-[10px] font-black uppercase tracking-widest text-brand-orange hover:text-brand-blue transition-all underline"
                        >
                          Thay đổi tệp
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="text-brand-brown/20 mb-4" size={40} />
                        <span className="text-[10px] font-black uppercase tracking-widest text-brand-brown/40">Chọn file CSV</span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-brand-brown/20 mt-2">Click hoặc kéo thả file vào đây</span>
                      </>
                    )}
                    <input 
                      type="file" 
                      accept=".csv"
                      onChange={e => {
                        const file = e.target.files?.[0] || null;
                        setBulkFile(file);
                        setBulkStatus(null);
                      }}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                </div>

                {uploading && (
                  <div className="mt-8">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-brand-blue mb-3">
                      <span>Đang xử lý...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full h-3 bg-brand-paper rounded-full overflow-hidden border border-brand-brown/5">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${uploadProgress}%` }}
                        className="h-full bg-brand-blue"
                      ></motion.div>
                    </div>
                  </div>
                )}

                {bulkStatus && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-8 p-6 rounded-2xl flex items-center gap-4 border ${bulkStatus.type === 'success' ? 'bg-brand-blue/5 border-brand-blue/10 text-brand-blue' : 'bg-brand-orange/5 border-brand-orange/10 text-brand-orange'}`}
                  >
                    {bulkStatus.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                    <span className="text-[10px] font-black uppercase tracking-widest">{bulkStatus.message}</span>
                  </motion.div>
                )}
              </div>
              <div className="p-8 bg-brand-paper flex justify-end gap-6 border-t border-brand-brown/5">
                <button 
                  onClick={() => setShowBulkModal(false)}
                  className="px-8 py-4 text-brand-brown/40 hover:text-brand-brown font-black uppercase tracking-widest text-[10px] transition-all"
                >
                  Hủy
                </button>
                <button 
                  onClick={handleBulkUpload}
                  disabled={uploading || !bulkFile}
                  className="px-10 py-4 bg-brand-brown text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-brand-blue transition-all shadow-xl shadow-brand-brown/20 disabled:opacity-50 flex items-center gap-3"
                >
                  {uploading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : <Upload size={18} />}
                  {uploading ? 'Đang tải lên...' : 'Bắt đầu tải lên'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Blog Modal */}
      <AnimatePresence>
        {showBlogModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setShowBlogModal(false); setEditingBlog(null); }}
              className="absolute inset-0 bg-brand-brown/60 backdrop-blur-sm"
            ></motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-brand-bg rounded-[2.5rem] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden border border-brand-brown/10 flex flex-col"
            >
              <div className="p-8 border-b border-brand-brown/5 flex justify-between items-center bg-brand-paper">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-blue rounded-2xl flex items-center justify-center text-white shadow-xl shadow-brand-blue/20">
                    {editingBlog ? <Settings size={24} /> : <Plus size={24} />}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-brand-brown uppercase tracking-widest">{editingBlog ? 'Sửa Bài Viết' : 'Thêm Bài Viết Mới'}</h3>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-brown/40 mt-1">Chia sẻ kiến thức & cảm hứng về hoa</p>
                  </div>
                </div>
                <button onClick={() => { setShowBlogModal(false); setEditingBlog(null); }} className="p-3 hover:bg-white rounded-2xl transition-all text-brand-brown/40 hover:text-brand-orange">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-brown/40 ml-4">Tiêu đề bài viết</label>
                      <input 
                        type="text" 
                        value={newBlog.title}
                        onChange={(e) => {
                          const title = e.target.value;
                          const slug = title.toLowerCase()
                            .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
                            .replace(/[đĐ]/g, 'd')
                            .replace(/([^0-9a-z-\s])/g, '')
                            .replace(/(\s+)/g, '-')
                            .replace(/-+/g, '-')
                            .replace(/^-+|-+$/g, '');
                          setNewBlog({ ...newBlog, title, slug });
                        }}
                        placeholder="VD: Cách giữ hoa tươi lâu..." 
                        className="w-full px-6 py-4 rounded-2xl bg-white border border-brand-brown/5 focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all font-medium" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-brown/40 ml-4">Đường dẫn (Slug)</label>
                      <input 
                        type="text" 
                        value={newBlog.slug}
                        onChange={(e) => setNewBlog({ ...newBlog, slug: e.target.value })}
                        placeholder="VD: cach-giu-hoa-tuoi-lau" 
                        className="w-full px-6 py-4 rounded-2xl bg-white border border-brand-brown/5 focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all font-medium" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-brown/40 ml-4">Tác giả</label>
                      <input 
                        type="text" 
                        value={newBlog.author}
                        onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
                        placeholder="VD: Admin" 
                        className="w-full px-6 py-4 rounded-2xl bg-white border border-brand-brown/5 focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all font-medium" 
                      />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <label className="text-[10px] font-black uppercase tracking-widest text-brand-brown/40 ml-4 block">Hình ảnh đại diện</label>
                    <div className="relative aspect-video rounded-3xl bg-white border border-brand-brown/5 overflow-hidden group">
                      {newBlog.image ? (
                        <>
                          <img src={optimizeImageUrl(newBlog.image, 800)} alt="Preview" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-brand-brown/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button 
                              onClick={() => setNewBlog({ ...newBlog, image: '' })}
                              className="p-4 bg-red-500 text-white rounded-2xl shadow-xl hover:bg-red-600 transition-all"
                            >
                              <Trash2 size={24} />
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                          <div className="w-16 h-16 bg-brand-bg rounded-2xl flex items-center justify-center text-brand-brown/20">
                            <Upload size={32} />
                          </div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-brand-brown/40">Kéo thả hoặc click để tải ảnh</p>
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                try {
                                  const url = await uploadFile(file);
                                  setNewBlog({ ...newBlog, image: url });
                                } catch (error) {
                                  alert('Lỗi tải ảnh: ' + (error instanceof Error ? error.message : 'Lỗi không xác định'));
                                }
                              }
                            }}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-brand-brown/40 ml-4">Tóm tắt ngắn</label>
                  <textarea 
                    value={newBlog.excerpt}
                    onChange={(e) => setNewBlog({ ...newBlog, excerpt: e.target.value })}
                    rows={2}
                    placeholder="Mô tả ngắn gọn nội dung bài viết..." 
                    className="w-full px-6 py-4 rounded-2xl bg-white border border-brand-brown/5 focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all font-medium resize-none"
                  ></textarea>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-brand-brown/40 ml-4">Nội dung bài viết</label>
                  <textarea 
                    value={newBlog.content}
                    onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                    rows={10}
                    placeholder="Viết nội dung bài viết tại đây..." 
                    className="w-full px-6 py-4 rounded-2xl bg-white border border-brand-brown/5 focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all font-medium resize-none"
                  ></textarea>
                </div>
              </div>

              <div className="p-8 bg-brand-paper flex justify-end gap-6 border-t border-brand-brown/5">
                <button 
                  onClick={() => { setShowBlogModal(false); setEditingBlog(null); }}
                  className="px-8 py-4 text-brand-brown/40 hover:text-brand-brown font-black uppercase tracking-widest text-[10px] transition-all"
                >
                  Hủy
                </button>
                <button 
                  onClick={handleSaveBlog}
                  className="px-12 py-4 bg-brand-brown text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-brand-blue transition-all shadow-xl shadow-brand-brown/20"
                >
                  {editingBlog ? 'Lưu Thay Đổi' : 'Đăng Bài Viết'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettingsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSettingsModal(false)}
              className="absolute inset-0 bg-brand-brown/60 backdrop-blur-sm"
            ></motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-brand-bg rounded-[2.5rem] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden border border-brand-brown/10 flex flex-col"
            >
              <div className="p-8 border-b border-brand-brown/5 flex justify-between items-center bg-brand-paper">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-blue rounded-2xl flex items-center justify-center text-white shadow-xl shadow-brand-blue/20">
                    <Settings size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-brand-brown uppercase tracking-widest">Cài Đặt Trang Web</h3>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-brown/40 mt-1">Quản lý hình ảnh giao diện & logo</p>
                  </div>
                </div>
                <button onClick={() => setShowSettingsModal(false)} className="p-3 hover:bg-white rounded-2xl transition-all text-brand-brown/40 hover:text-brand-orange">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-12">
                {/* Logo & Hero Section */}
                <section>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-blue mb-8 flex items-center gap-2">
                    <Store size={18} /> Giao Diện Chính
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Logo Upload */}
                    <div className="space-y-4">
                      <label className="text-xs font-black text-brand-brown uppercase tracking-widest block">Logo Website</label>
                      <div className="flex items-center gap-6 p-6 bg-white rounded-3xl border border-brand-brown/5 shadow-sm">
                        <div className="w-24 h-24 rounded-2xl overflow-hidden bg-brand-bg border border-brand-brown/10 flex-shrink-0 flex items-center justify-center p-2">
                          <img 
                            src={optimizeImageUrl(settings.logo_url || LOGO_URL, 100)} 
                            alt="Logo Preview" 
                            className="max-w-full max-h-full object-contain"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="flex-1 space-y-3">
                          <p className="text-[10px] text-brand-brown/40 font-bold uppercase tracking-wider leading-relaxed">Kích thước khuyên dùng: 200x200px (PNG trong suốt)</p>
                          <div className="relative">
                            <input 
                              type="file" 
                              accept="image/*"
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  try {
                                    const url = await uploadFile(file);
                                    handleSaveSettings({ logo_url: url });
                                  } catch (error) {
                                    console.error('Logo upload error:', error);
                                    alert('Lỗi tải logo: ' + (error instanceof Error ? error.message : 'Lỗi không xác định'));
                                  }
                                }
                              }}
                              className="absolute inset-0 opacity-0 cursor-pointer z-10"
                            />
                            <button className="w-full py-3 bg-brand-paper text-brand-brown rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-brand-brown hover:text-white transition-all flex items-center justify-center gap-2">
                              <Upload size={14} /> Thay đổi Logo
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Hero Image Upload */}
                    <div className="space-y-4">
                      <label className="text-xs font-black text-brand-brown uppercase tracking-widest block">Ảnh Hero (Trang chủ)</label>
                      <div className="flex items-center gap-6 p-6 bg-white rounded-3xl border border-brand-brown/5 shadow-sm">
                        <div className="w-24 h-24 rounded-2xl overflow-hidden bg-brand-bg border border-brand-brown/10 flex-shrink-0">
                          <img 
                            src={optimizeImageUrl(settings.hero_image_url || PLACEHOLDER_IMAGE, 200)} 
                            alt="Hero Preview" 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="flex-1 space-y-3">
                          <p className="text-[10px] text-brand-brown/40 font-bold uppercase tracking-wider leading-relaxed">Kích thước khuyên dùng: 1920x1080px</p>
                          <div className="relative">
                            <input 
                              type="file" 
                              accept="image/*"
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  try {
                                    const url = await uploadFile(file);
                                    handleSaveSettings({ hero_image_url: url });
                                  } catch (error) {
                                    console.error('Hero upload error:', error);
                                  }
                                }
                              }}
                              className="absolute inset-0 opacity-0 cursor-pointer z-10"
                            />
                            <button className="w-full py-3 bg-brand-paper text-brand-brown rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-brand-brown hover:text-white transition-all flex items-center justify-center gap-2">
                              <Upload size={14} /> Thay đổi Ảnh Hero
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Category Images Section */}
                <section>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-blue mb-8 flex items-center gap-2">
                    <ShoppingBasket size={18} /> Ảnh & Banner Danh Mục Sản Phẩm
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {CATEGORIES.map(cat => (
                      <div key={cat.id} className="p-8 bg-white rounded-[2.5rem] border border-brand-brown/5 shadow-sm space-y-6 group">
                        <div className="flex justify-between items-center">
                          <h5 className="text-xs font-black uppercase tracking-widest text-brand-brown">{cat.name}</h5>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-6">
                          {/* Thumbnail Image */}
                          <div className="space-y-3">
                            <label className="text-[10px] font-black text-brand-brown/40 uppercase tracking-widest block">Ảnh Đại Diện</label>
                            <div className="aspect-square rounded-2xl overflow-hidden bg-brand-bg border border-brand-brown/10 relative group/thumb">
                              <img 
                                src={optimizeImageUrl(settings[`category_image_${cat.id}`] || cat.image || PLACEHOLDER_IMAGE, 400)} 
                                alt={cat.name} 
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute inset-0 bg-brand-brown/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center p-4">
                                <div className="relative w-full">
                                  <input 
                                    type="file" 
                                    accept="image/*"
                                    onChange={async (e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        try {
                                          const url = await uploadFile(file);
                                          handleSaveSettings({ [`category_image_${cat.id}`]: url });
                                        } catch (error) {
                                          console.error('Category image upload error:', error);
                                          alert('Lỗi tải ảnh danh mục: ' + (error instanceof Error ? error.message : 'Lỗi không xác định'));
                                        }
                                      }
                                    }}
                                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                  />
                                  <button className="w-full py-2 bg-white text-brand-brown rounded-lg font-black uppercase tracking-widest text-[8px] shadow-xl flex items-center justify-center gap-2">
                                    <Upload size={12} /> Thay đổi
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Banner Image */}
                          <div className="space-y-3">
                            <label className="text-[10px] font-black text-brand-brown/40 uppercase tracking-widest block">Ảnh Banner</label>
                            <div className="aspect-square rounded-2xl overflow-hidden bg-brand-bg border border-brand-brown/10 relative group/banner">
                              <img 
                                src={optimizeImageUrl(settings[`category_banner_${cat.id}`] || PLACEHOLDER_IMAGE, 400)} 
                                alt={`${cat.name} Banner`} 
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute inset-0 bg-brand-brown/40 opacity-0 group-hover/banner:opacity-100 transition-opacity flex items-center justify-center p-4">
                                <div className="relative w-full">
                                  <input 
                                    type="file" 
                                    accept="image/*"
                                    onChange={async (e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        try {
                                          const url = await uploadFile(file);
                                          handleSaveSettings({ [`category_banner_${cat.id}`]: url });
                                        } catch (error) {
                                          console.error('Category banner upload error:', error);
                                          alert('Lỗi tải banner danh mục: ' + (error instanceof Error ? error.message : 'Lỗi không xác định'));
                                        }
                                      }
                                    }}
                                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                  />
                                  <button className="w-full py-2 bg-white text-brand-brown rounded-lg font-black uppercase tracking-widest text-[8px] shadow-xl flex items-center justify-center gap-2">
                                    <Upload size={12} /> Thay đổi
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="p-8 border-t border-brand-brown/5 bg-brand-paper flex justify-end">
                <button 
                  onClick={() => setShowSettingsModal(false)}
                  className="px-12 py-4 bg-brand-brown text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-brand-blue transition-all shadow-xl shadow-brand-brown/20"
                >
                  Đóng
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Checkout Modal */}
      <AnimatePresence>
        {showCart && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                if (checkoutStep !== 4) setShowCart(false);
                else {
                  setShowCart(false);
                  setCheckoutStep(1);
                }
              }}
              className="absolute inset-0 bg-brand-brown/60 backdrop-blur-sm"
            ></motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-brand-bg rounded-[3rem] shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col border border-brand-brown/10 max-h-[90vh]"
            >
              <div className="p-8 border-b border-brand-brown/5 flex justify-between items-center bg-brand-paper">
                <div>
                  <h2 className="text-2xl font-serif font-black text-brand-brown">Giỏ Hàng & Thanh Toán</h2>
                  <p className="text-[10px] font-black uppercase tracking-widest text-brand-brown/40 mt-1">Hoàn tất đơn hàng của bạn</p>
                </div>
                {checkoutStep !== 4 && (
                  <button 
                    onClick={() => setShowCart(false)}
                    className="p-3 bg-white rounded-2xl hover:bg-brand-orange hover:text-white transition-all shadow-lg text-brand-brown/40"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>

              {/* Progress Indicator */}
              {checkoutStep < 4 && (
                <div className="bg-white px-8 py-6 border-b border-brand-brown/5">
                  <div className="flex items-center justify-between max-w-2xl mx-auto relative">
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-brand-brown/5 -translate-y-1/2 z-0"></div>
                    <div 
                      className="absolute top-1/2 left-0 h-0.5 bg-brand-blue -translate-y-1/2 z-0 transition-all duration-500"
                      style={{ width: `${((checkoutStep - 1) / 2) * 100}%` }}
                    ></div>
                    
                    {[
                      { step: 1, icon: ShoppingBag, label: 'Giỏ hàng' },
                      { step: 2, icon: Truck, label: 'Giao hàng' },
                      { step: 3, icon: CreditCard, label: 'Xác nhận' }
                    ].map((item) => (
                      <div key={item.step} className="relative z-10 flex flex-col items-center gap-2">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${checkoutStep >= item.step ? 'bg-brand-blue text-white shadow-lg scale-110' : 'bg-brand-paper text-brand-brown/20 border border-brand-brown/5'}`}>
                          <item.icon size={18} />
                        </div>
                        <span className={`text-[8px] font-black uppercase tracking-widest transition-all ${checkoutStep >= item.step ? 'text-brand-blue' : 'text-brand-brown/20'}`}>
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex-1 overflow-y-auto p-8">
                {checkoutStep === 1 && (
                  <div className="space-y-8">
                    {cart.length === 0 ? (
                      <div className="py-20 text-center">
                        <div className="w-20 h-20 bg-brand-paper rounded-full flex items-center justify-center mx-auto mb-6 text-brand-brown/20">
                          <ShoppingBag size={40} />
                        </div>
                        <h3 className="text-xl font-serif font-black text-brand-brown mb-2">Giỏ hàng trống</h3>
                        <p className="text-brand-brown/40 text-xs font-bold uppercase tracking-widest mb-8">Hãy chọn cho mình những bó hoa thật đẹp nhé!</p>
                        <button 
                          onClick={() => setShowCart(false)}
                          className="px-10 py-4 bg-brand-brown text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-brand-blue transition-all shadow-xl"
                        >
                          Tiếp tục mua sắm
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {cart.map((item) => (
                          <div key={item.product.id} className="flex items-center gap-6 p-4 bg-white rounded-3xl border border-brand-brown/5 shadow-sm group hover:shadow-md transition-all">
                            <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border border-brand-brown/5">
                              <img 
                                src={optimizeImageUrl(item.product.image, 200)} 
                                srcSet={`${optimizeImageUrl(item.product.image, 200)} 200w, ${optimizeImageUrl(item.product.image, 400)} 400w`}
                                sizes="100px"
                                alt={item.product.name} 
                                className="w-full h-full object-cover" 
                                loading="lazy"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-black text-brand-brown truncate">{item.product.name}</h4>
                              <p className="text-[10px] text-brand-brown/40 font-bold uppercase tracking-widest mt-1">
                                {CATEGORIES.find(c => c.id === item.product.category)?.name}
                              </p>
                              <div className="flex items-center gap-4 mt-4">
                                <div className="flex items-center bg-brand-paper rounded-xl p-1 border border-brand-brown/5">
                                  <button 
                                    onClick={() => updateCartQuantity(item.product.id, -1)}
                                    className="w-8 h-8 flex items-center justify-center text-brand-brown hover:bg-white rounded-lg transition-all"
                                  >
                                    -
                                  </button>
                                  <span className="w-10 text-center font-black text-xs">{item.quantity}</span>
                                  <button 
                                    onClick={() => updateCartQuantity(item.product.id, 1)}
                                    className="w-8 h-8 flex items-center justify-center text-brand-brown hover:bg-white rounded-lg transition-all"
                                  >
                                    +
                                  </button>
                                </div>
                                <button 
                                  onClick={() => removeFromCart(item.product.id)}
                                  className="text-[10px] font-black text-red-500 uppercase tracking-widest hover:underline"
                                >
                                  Xóa
                                </button>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-xs font-black text-brand-brown/30 uppercase tracking-widest mb-1">Giá</p>
                              <p className="font-serif font-black text-brand-blue text-lg">{formatPrice(item.product.price)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {checkoutStep === 2 && (
                  <div className="max-w-2xl mx-auto space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-brand-brown/40 ml-4">Họ và tên *</label>
                        <input 
                          type="text" 
                          value={orderForm.customerName}
                          onChange={(e) => {
                            setOrderForm({ ...orderForm, customerName: e.target.value });
                            if (validationErrors.customerName) setValidationErrors(prev => ({ ...prev, customerName: '' }));
                          }}
                          placeholder="Nguyễn Văn A"
                          className={`w-full px-6 py-4 rounded-2xl bg-white border ${validationErrors.customerName ? 'border-red-500 ring-4 ring-red-500/5' : 'border-brand-brown/10'} focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all font-bold text-brand-brown`}
                        />
                        {validationErrors.customerName && <p className="text-[10px] text-red-500 font-black uppercase tracking-widest ml-4">{validationErrors.customerName}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-brand-brown/40 ml-4">Số điện thoại *</label>
                        <input 
                          type="tel" 
                          value={orderForm.customerPhone}
                          onChange={(e) => {
                            setOrderForm({ ...orderForm, customerPhone: e.target.value });
                            if (validationErrors.customerPhone) setValidationErrors(prev => ({ ...prev, customerPhone: '' }));
                          }}
                          placeholder="0934 926 092"
                          className={`w-full px-6 py-4 rounded-2xl bg-white border ${validationErrors.customerPhone ? 'border-red-500 ring-4 ring-red-500/5' : 'border-brand-brown/10'} focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all font-bold text-brand-brown`}
                        />
                        {validationErrors.customerPhone && <p className="text-[10px] text-red-500 font-black uppercase tracking-widest ml-4">{validationErrors.customerPhone}</p>}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-brown/40 ml-4">Địa chỉ giao hàng *</label>
                      <textarea 
                        rows={3}
                        value={orderForm.shippingAddress}
                        onChange={(e) => {
                          setOrderForm({ ...orderForm, shippingAddress: e.target.value });
                          if (validationErrors.shippingAddress) setValidationErrors(prev => ({ ...prev, shippingAddress: '' }));
                        }}
                        placeholder="Số nhà, tên đường, phường/xã, quận/huyện..."
                        className={`w-full px-6 py-4 rounded-2xl bg-white border ${validationErrors.shippingAddress ? 'border-red-500 ring-4 ring-red-500/5' : 'border-brand-brown/10'} focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all font-bold text-brand-brown resize-none`}
                      ></textarea>
                      {validationErrors.shippingAddress && <p className="text-[10px] text-red-500 font-black uppercase tracking-widest ml-4">{validationErrors.shippingAddress}</p>}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-brand-brown/40 ml-4">Ngày giao hoa *</label>
                        <input 
                          type="date" 
                          value={orderForm.deliveryDate}
                          onChange={(e) => {
                            setOrderForm({ ...orderForm, deliveryDate: e.target.value });
                            if (validationErrors.deliveryDate) setValidationErrors(prev => ({ ...prev, deliveryDate: '' }));
                          }}
                          className={`w-full px-6 py-4 rounded-2xl bg-white border ${validationErrors.deliveryDate ? 'border-red-500 ring-4 ring-red-500/5' : 'border-brand-brown/10'} focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all font-bold text-brand-brown`}
                        />
                        {validationErrors.deliveryDate && <p className="text-[10px] text-red-500 font-black uppercase tracking-widest ml-4">{validationErrors.deliveryDate}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-brand-brown/40 ml-4">Email (không bắt buộc)</label>
                        <input 
                          type="email" 
                          value={orderForm.customerEmail}
                          onChange={(e) => setOrderForm({ ...orderForm, customerEmail: e.target.value })}
                          placeholder="email@example.com"
                          className="w-full px-6 py-4 rounded-2xl bg-white border border-brand-brown/10 focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all font-bold text-brand-brown"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {checkoutStep === 3 && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-xs font-black uppercase tracking-widest text-brand-brown/40 mb-6 flex items-center gap-3">
                          <div className="w-8 h-px bg-brand-brown/10"></div>
                          Phương thức thanh toán
                        </h3>
                        <div className="space-y-4">
                          <button 
                            onClick={() => setOrderForm({ ...orderForm, paymentMethod: 'cod' })}
                            className={`w-full p-6 rounded-3xl border-2 transition-all flex items-center gap-4 ${orderForm.paymentMethod === 'cod' ? 'border-brand-blue bg-brand-blue/5' : 'border-brand-brown/5 bg-white hover:border-brand-blue/30'}`}
                          >
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${orderForm.paymentMethod === 'cod' ? 'border-brand-blue bg-brand-blue' : 'border-brand-brown/20'}`}>
                              {orderForm.paymentMethod === 'cod' && <Check size={14} className="text-white" />}
                            </div>
                            <div className="text-left">
                              <p className="font-black text-brand-brown uppercase tracking-widest text-[10px]">Thanh toán khi nhận hoa (COD)</p>
                              <p className="text-[10px] text-brand-brown/40 font-bold mt-1">Trả tiền mặt khi shipper giao hoa tới</p>
                            </div>
                          </button>
                          <button 
                            onClick={() => setOrderForm({ ...orderForm, paymentMethod: 'bank_transfer' })}
                            className={`w-full p-6 rounded-3xl border-2 transition-all flex items-center gap-4 ${orderForm.paymentMethod === 'bank_transfer' ? 'border-brand-blue bg-brand-blue/5' : 'border-brand-brown/5 bg-white hover:border-brand-blue/30'}`}
                          >
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${orderForm.paymentMethod === 'bank_transfer' ? 'border-brand-blue bg-brand-blue' : 'border-brand-brown/20'}`}>
                              {orderForm.paymentMethod === 'bank_transfer' && <Check size={14} className="text-white" />}
                            </div>
                            <div className="text-left">
                              <p className="font-black text-brand-brown uppercase tracking-widest text-[10px]">Chuyển khoản ngân hàng</p>
                              <p className="text-[10px] text-brand-brown/40 font-bold mt-1">Nhận thông tin STK sau khi đặt hàng</p>
                            </div>
                          </button>
                        </div>
                      </div>

                      <div className="bg-brand-paper rounded-[2rem] p-8 border border-brand-brown/5">
                        <h3 className="text-xs font-black uppercase tracking-widest text-brand-brown/40 mb-6">Thông tin nhận hàng</h3>
                        <div className="space-y-4">
                          <div className="flex justify-between">
                            <span className="text-[10px] font-black text-brand-brown/30 uppercase tracking-widest">Người nhận:</span>
                            <span className="text-sm font-bold text-brand-brown">{orderForm.customerName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[10px] font-black text-brand-brown/30 uppercase tracking-widest">Điện thoại:</span>
                            <span className="text-sm font-bold text-brand-brown">{orderForm.customerPhone}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[10px] font-black text-brand-brown/30 uppercase tracking-widest">Ngày giao:</span>
                            <span className="text-sm font-bold text-brand-brown">{orderForm.deliveryDate}</span>
                          </div>
                          <div className="pt-4 border-t border-brand-brown/5">
                            <span className="text-[10px] font-black text-brand-brown/30 uppercase tracking-widest block mb-2">Địa chỉ:</span>
                            <p className="text-sm font-medium text-brand-brown leading-relaxed">{orderForm.shippingAddress}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-8">
                      <div className="bg-white rounded-[2rem] p-8 border border-brand-brown/5 shadow-xl">
                        <h3 className="text-xs font-black uppercase tracking-widest text-brand-brown/40 mb-6">Tóm tắt đơn hàng</h3>
                        <div className="space-y-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                          {cart.map((item) => (
                            <div key={item.product.id} className="flex justify-between items-center gap-4">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl overflow-hidden border border-brand-brown/5">
                                  <img 
                                    src={optimizeImageUrl(item.product.image, 100)} 
                                    srcSet={`${optimizeImageUrl(item.product.image, 100)} 100w, ${optimizeImageUrl(item.product.image, 200)} 200w`}
                                    sizes="50px"
                                    alt={item.product.name} 
                                    className="w-full h-full object-cover" 
                                    loading="lazy"
                                    referrerPolicy="no-referrer"
                                  />
                                </div>
                                <div>
                                  <p className="text-xs font-black text-brand-brown truncate max-w-[150px]">{item.product.name}</p>
                                  <p className="text-[10px] text-brand-brown/40 font-bold">x{item.quantity}</p>
                                </div>
                              </div>
                              <p className="text-xs font-serif font-black text-brand-blue">{formatPrice(item.product.price)}</p>
                            </div>
                          ))}
                        </div>
                        <div className="mt-8 pt-8 border-t-2 border-dashed border-brand-brown/10 space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-black text-brand-brown/30 uppercase tracking-widest">Tổng cộng:</span>
                            <span className="text-2xl font-serif font-black text-brand-blue">{formatPrice(calculateTotal())}</span>
                          </div>
                          <p className="text-[10px] text-brand-brown/40 font-bold italic text-center">Nhân viên sẽ gọi điện xác nhận và báo giá chính xác cho bạn</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {checkoutStep === 4 && (
                  <div className="py-20 text-center max-w-lg mx-auto">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', damping: 12, stiffness: 200 }}
                      className="w-24 h-24 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-emerald-500/20"
                    >
                      <Check size={48} />
                    </motion.div>
                    <h3 className="text-3xl font-serif font-black text-brand-brown mb-4">Đặt hàng thành công!</h3>
                    <p className="text-brand-brown/60 font-medium mb-12 leading-relaxed">
                      Cảm ơn bạn đã tin tưởng Thanh Ngọc. Chúng tôi đã nhận được đơn hàng và sẽ liên hệ với bạn qua số điện thoại <span className="text-brand-blue font-black">{orderForm.customerPhone}</span> trong vòng 15-30 phút để xác nhận.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <button 
                        onClick={() => {
                          setShowCart(false);
                          setCheckoutStep(1);
                        }}
                        className="px-10 py-5 bg-brand-brown text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-brand-blue transition-all shadow-xl"
                      >
                        Tiếp tục mua sắm
                      </button>
                      <button 
                        onClick={() => {
                          setShowCart(false);
                          setCheckoutStep(1);
                          setCurrentView('contact');
                          window.location.hash = '#contact';
                        }}
                        className="px-10 py-5 bg-brand-paper text-brand-brown border border-brand-brown/10 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-brand-brown hover:text-white transition-all shadow-lg"
                      >
                        Hỗ trợ qua Zalo
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {checkoutStep < 4 && (
                <div className="p-8 bg-brand-paper border-t border-brand-brown/5 flex justify-between items-center">
                  <button 
                    onClick={() => {
                      if (checkoutStep === 1) setShowCart(false);
                      else setCheckoutStep(prev => prev - 1);
                    }}
                    className="px-8 py-4 text-brand-brown/40 hover:text-brand-brown font-black uppercase tracking-widest text-[10px] transition-all flex items-center gap-2"
                  >
                    <ChevronLeft size={16} />
                    {checkoutStep === 1 ? 'Tiếp tục mua sắm' : 'Quay lại'}
                  </button>
                  
                  <button 
                    onClick={() => {
                      if (checkoutStep === 1) {
                        if (cart.length > 0) setCheckoutStep(2);
                      } else if (checkoutStep === 2) {
                        if (validateCheckoutStep(2)) {
                          setCheckoutStep(3);
                        }
                      } else if (checkoutStep === 3) {
                        submitOrder();
                      }
                    }}
                    disabled={checkoutStep === 1 && cart.length === 0 || uploading}
                    className="px-12 py-5 bg-brand-brown text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-brand-blue transition-all shadow-xl shadow-brand-brown/20 flex items-center gap-3 disabled:opacity-50"
                  >
                    {uploading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        {checkoutStep === 1 ? 'Tiến hành đặt hàng' : checkoutStep === 2 ? 'Tiếp theo' : 'Xác nhận đặt hàng'}
                        <ChevronRight size={16} />
                      </>
                    )}
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
}
