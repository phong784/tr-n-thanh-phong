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
  Filter
} from 'lucide-react';
import { Product, Category, Blog } from './types';
import AIAssistant from './components/AIAssistant';
import { CATEGORIES, CONTACT_INFO, PLACEHOLDER_IMAGE, ABOUT_US, LOGO_URL } from './constants';

// --- Utils ---

const optimizeImageUrl = (url: string, width: number = 800) => {
  if (!url) return PLACEHOLDER_IMAGE;
  
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
      return `https://picsum.photos/seed/${seed}/${width}/${Math.round(width * 0.75)}`;
    }
    return `${baseUrl}/${width}/${Math.round(width * 0.75)}`;
  }

  // Local uploads are already converted to WebP on the server
  return url;
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

const ContactPage = ({ onBack }: { onBack: () => void }) => (
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
            
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.'); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-brand-brown/40 ml-4">Họ và tên</label>
                  <input type="text" placeholder="Nguyễn Văn A" className="w-full px-6 py-4 rounded-2xl bg-white border border-brand-brown/5 focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all font-medium" required />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-brand-brown/40 ml-4">Số điện thoại</label>
                  <input type="tel" placeholder="090 123 4567" className="w-full px-6 py-4 rounded-2xl bg-white border border-brand-brown/5 focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all font-medium" required />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-brand-brown/40 ml-4">Email (không bắt buộc)</label>
                <input type="email" placeholder="email@example.com" className="w-full px-6 py-4 rounded-2xl bg-white border border-brand-brown/5 focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all font-medium" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-brand-brown/40 ml-4">Lời nhắn</label>
                <textarea rows={4} placeholder="Tôi muốn tư vấn về hoa sinh nhật..." className="w-full px-6 py-4 rounded-2xl bg-white border border-brand-brown/5 focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all font-medium resize-none" required></textarea>
              </div>
              <button type="submit" className="w-full py-5 bg-brand-brown text-brand-bg rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-brand-blue transition-all shadow-xl shadow-brand-brown/20 flex items-center justify-center gap-3">
                Gửi Yêu Cầu <MessageCircle size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

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
        <img src={logoUrl} alt="Logo" className="w-10 h-10 md:w-12 md:h-12 object-contain rounded-full border-2 border-white shadow-xl" />
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<'newest' | 'name-asc'>('newest');
  const [currentView, setCurrentView] = useState<'home' | 'about' | 'contact' | 'offers'>('home');
  const ITEMS_PER_PAGE = 12;

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#about') {
        setCurrentView('about');
      } else if (hash === '#contact') {
        setCurrentView('contact');
      } else if (hash === '#offers') {
        setCurrentView('offers');
      } else if (hash === '#home' || hash === '') {
        setCurrentView('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Admin State
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
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
  const [activeDetailImage, setActiveDetailImage] = useState<number>(0);
  const [uploading, setUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [bulkFile, setBulkFile] = useState<File | null>(null);
  const [bulkStatus, setBulkStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    fetchProducts();
    fetchBlogs();
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


  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isMain: boolean = true) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const uploadedUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append('image', files[i]);
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        uploadedUrls.push(data.url);
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
      alert('Lỗi tải ảnh');
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
        const data = await res.json();
        alert(`Lỗi: ${data.error || 'Không thể lưu sản phẩm'}`);
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
      const data = await res.json();
      
      clearInterval(progressInterval);
      setUploadProgress(100);

      if (res.ok) {
        setBulkStatus({ type: 'success', message: `Tải lên thành công ${data.count} sản phẩm!` });
        fetchProducts();
        setTimeout(() => {
          setShowBulkModal(false);
          setUploadProgress(0);
          setBulkFile(null);
        }, 2000);
      } else {
        setBulkStatus({ type: 'error', message: data.error || 'Lỗi xử lý file' });
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
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery, sortBy]);

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
          <Logo onClick={() => setCurrentView('home')} logoUrl={LOGO_URL} />

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
            <button className="p-3 hover:bg-brand-paper rounded-2xl text-brand-brown transition-all">
              <Search size={20} />
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
                <Logo onClick={() => { setCurrentView('home'); setIsMenuOpen(false); window.location.hash = '#home'; }} logoUrl={LOGO_URL} />
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
                  toast.className = `fixed bottom-4 right-4 ${newAdminState ? 'bg-emerald-600' : 'bg-stone-600'} text-white px-6 py-3 rounded-full shadow-2xl z-50 animate-bounce`;
                  toast.innerText = newAdminState ? "Đã bật chế độ Quản Trị" : "Đã thoát chế độ Quản Trị";
                  document.body.appendChild(toast);
                  setTimeout(() => toast.remove(), 2000);
                }}
                className="flex items-center gap-2 text-stone-400 text-sm pt-6 border-t border-stone-100"
              >
                <Settings size={16} /> {isAdmin ? 'Thoát Quản Trị' : 'Chế độ Quản Trị'}
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
                <img 
                  src={optimizeImageUrl("https://images.unsplash.com/photo-1526047932273-341f2a7631f9", 1920)} 
                  alt="Flower Shop" 
                  className="w-full h-full object-cover opacity-60 mix-blend-multiply"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
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
                        src="https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&q=80&w=800" 
                        alt="Featured Bouquet" 
                        className="w-full h-full object-cover"
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
                      src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=400" 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      alt="Tất cả"
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
                        src={optimizeImageUrl(cat.image || PLACEHOLDER_IMAGE, 400)} 
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
                <div className="flex flex-col lg:flex-row gap-12">
                  {/* Sidebar - Desktop */}
                  <aside className="hidden lg:block w-72 shrink-0">
                    <div className="sticky top-32 space-y-10">
                      <div>
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-brand-brown/40 mb-6">Danh Mục</h3>
                        <div className="flex flex-col gap-2">
                          <button 
                            onClick={() => setActiveCategory('all')}
                            className={`text-left px-4 py-3 rounded-xl font-bold transition-all ${activeCategory === 'all' ? 'bg-brand-brown text-brand-bg shadow-lg' : 'hover:bg-brand-paper text-brand-brown/60'}`}
                          >
                            Tất Cả Sản Phẩm
                          </button>
                          {CATEGORIES.map((cat) => (
                            <button 
                              key={cat.id}
                              onClick={() => setActiveCategory(cat.id)}
                              className={`text-left px-4 py-3 rounded-xl font-bold transition-all ${activeCategory === cat.id ? 'bg-brand-brown text-brand-bg shadow-lg' : 'hover:bg-brand-paper text-brand-brown/60'}`}
                            >
                              {cat.name}
                            </button>
                          ))}
                        </div>
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
                        </div>
                      )}
                    </div>
                  </aside>

                  {/* Main Content */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-6">
                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <div className="relative flex-1 sm:w-80">
                          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-brown/30" size={18} />
                          <input 
                            type="text"
                            placeholder="Tìm kiếm mẫu hoa..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-brand-brown/5 focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all bg-white shadow-sm font-medium text-base"
                          />
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
                                className="group bg-white rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden border border-brand-brown/5 hover:shadow-2xl hover:shadow-brand-brown/10 transition-all duration-500 relative cursor-pointer flex flex-col h-full"
                              >
                                <div className="relative aspect-[4/5] overflow-hidden">
                                  <img 
                                    src={optimizeImageUrl(product.image || PLACEHOLDER_IMAGE, 600)} 
                                    alt={product.alt_text || `${product.name} - ${product.meaning || ''} - Màu ${product.color || ''} - Size ${product.size || ''}`} 
                                    title={`${product.name} - ${product.meaning || ''}`}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    referrerPolicy="no-referrer"
                                    loading="lazy"
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
                                    <div className="absolute top-6 right-6 flex gap-2 z-20">
                                      <button 
                                        onClick={(e) => { e.stopPropagation(); handleEditProduct(product); }}
                                        className="p-3 bg-white/90 text-brand-brown rounded-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-brand-blue hover:text-white shadow-xl backdrop-blur-sm"
                                      >
                                        <Settings size={18} />
                                      </button>
                                      <button 
                                        onClick={(e) => { e.stopPropagation(); handleDeleteProduct(product.id); }}
                                        className="p-3 bg-white/90 text-red-600 rounded-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 hover:text-white shadow-xl backdrop-blur-sm"
                                      >
                                        <Trash2 size={18} />
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

                                <div className="p-4 sm:p-10 flex flex-col flex-1">
                                  <div className="mb-3 sm:mb-6">
                                    <div className="flex justify-between items-start gap-2 sm:gap-4 mb-1 sm:mb-2">
                                      <h3 className="font-serif font-black text-base sm:text-2xl text-brand-brown group-hover:text-brand-blue transition-colors leading-tight line-clamp-2">{product.name}</h3>
                                      <div className="flex items-center text-brand-orange bg-brand-orange/5 px-1.5 sm:px-3 py-0.5 sm:py-1.5 rounded-lg sm:rounded-xl shrink-0">
                                        <Star size={8} className="sm:size-3" fill="currentColor" />
                                        <span className="text-[8px] sm:text-[10px] font-black ml-1 sm:ml-1.5">5.0</span>
                                      </div>
                                    </div>
                                    <span className="text-[8px] sm:text-[10px] font-black text-brand-brown/30 uppercase tracking-[0.2em]">
                                      {CATEGORIES.find(c => c.id === product.category)?.name || 'Hoa Tươi'}
                                    </span>
                                  </div>

                                  <p className="hidden sm:block text-brand-brown/60 text-xs sm:text-sm mb-6 sm:mb-8 line-clamp-2 leading-relaxed flex-1 font-medium">{product.description}</p>
                                  
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
                                  
                                  <div className="flex items-center justify-between pt-4 sm:pt-8 border-t border-brand-brown/5 mt-auto">
                                    <div className="flex flex-col">
                                      <span className="text-[7px] sm:text-[9px] font-black text-brand-brown/30 uppercase tracking-widest mb-0.5 sm:mb-1">Tình trạng</span>
                                      <span className="text-sm sm:text-lg font-serif font-black text-brand-blue tracking-tight">
                                        Liên hệ báo giá
                                      </span>
                                    </div>
                                    <button 
                                      onClick={(e) => { e.stopPropagation(); setCurrentView('contact'); window.location.hash = '#contact'; }}
                                      className="bg-brand-brown text-brand-bg px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl shadow-2xl shadow-brand-brown/20 hover:bg-brand-blue hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                                    >
                                      <Phone size={14} className="sm:size-5" />
                                      <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest">Liên hệ</span>
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
                              onClick={() => setCurrentPage(prev => prev - 1)}
                              className="p-4 rounded-2xl border border-brand-brown/5 bg-white text-brand-brown disabled:opacity-30 hover:bg-brand-paper transition-all shadow-lg"
                            >
                              <ChevronLeft size={20} />
                            </button>
                            <div className="flex gap-2">
                              {[...Array(totalPages)].map((_, i) => (
                                <button 
                                  key={i}
                                  onClick={() => setCurrentPage(i + 1)}
                                  className={`w-12 h-12 rounded-2xl font-black text-xs transition-all shadow-lg ${currentPage === i + 1 ? 'bg-brand-brown text-brand-bg' : 'bg-white text-brand-brown border border-brand-brown/5 hover:bg-brand-paper'}`}
                                >
                                  {i + 1}
                                </button>
                              ))}
                            </div>
                            <button 
                              disabled={currentPage === totalPages}
                              onClick={() => setCurrentPage(prev => prev + 1)}
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
                  <p className="text-brand-brown/50 font-medium max-w-md text-lg">
                    Khám phá những bí quyết chăm sóc hoa, ý nghĩa các loài hoa và những câu chuyện đầy cảm hứng từ thế giới hoa tươi.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {blogs.map((blog) => (
                    <motion.div 
                      key={blog.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      onClick={() => setSelectedBlog(blog)}
                      className="group bg-white rounded-[2.5rem] overflow-hidden border border-brand-brown/5 hover:shadow-2xl hover:shadow-brand-brown/10 transition-all duration-500 cursor-pointer flex flex-col h-full"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img 
                          src={optimizeImageUrl(blog.image || `https://picsum.photos/seed/${blog.id}/800/600`, 600)} 
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
                          <button 
                            onClick={(e) => { 
                              e.stopPropagation(); 
                              if(confirm('Xóa bài viết này?')) {
                                fetch(`/api/blogs/${blog.id}`, { method: 'DELETE' })
                                  .then(() => fetchBlogs());
                              }
                            }}
                            className="absolute top-6 right-6 p-3 bg-red-500 text-white rounded-xl opacity-0 group-hover:opacity-100 transition-all shadow-xl z-10 hover:bg-red-600"
                          >
                            <Trash2 size={18} />
                          </button>
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

        {currentView === 'about' && <AboutPage onBack={() => setCurrentView('home')} />}
        {currentView === 'contact' && <ContactPage onBack={() => setCurrentView('home')} />}
        {currentView === 'offers' && (
          <OffersPage 
            onBack={() => setCurrentView('home')} 
            onShopNow={() => {
              setCurrentView('home');
              setTimeout(() => {
                document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
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
                  href="https://facebook.com" 
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
                  href="https://zalo.me" 
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
                  toast.className = `fixed bottom-4 right-4 ${newAdminState ? 'bg-brand-blue' : 'bg-brand-brown'} text-white px-6 py-3 rounded-full shadow-2xl z-50 animate-bounce font-black uppercase tracking-widest text-[10px]`;
                  toast.innerText = newAdminState ? "Đã bật chế độ Quản Trị" : "Đã thoát chế độ Quản Trị";
                  document.body.appendChild(toast);
                  setTimeout(() => toast.remove(), 2000);
                }}
                className="hover:text-brand-blue transition-all flex items-center gap-2"
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
                      onClick={() => { setActiveCategory('all'); setIsFilterOpen(false); }}
                      className={`text-left px-4 py-3 rounded-xl font-bold transition-all ${activeCategory === 'all' ? 'bg-brand-brown text-brand-bg shadow-lg' : 'hover:bg-brand-paper text-brand-brown/60'}`}
                    >
                      Tất Cả Sản Phẩm
                    </button>
                    {CATEGORIES.map((cat) => (
                      <button 
                        key={cat.id}
                        onClick={() => { setActiveCategory(cat.id); setIsFilterOpen(false); }}
                        className={`text-left px-4 py-3 rounded-xl font-bold transition-all ${activeCategory === cat.id ? 'bg-brand-brown text-brand-bg shadow-lg' : 'hover:bg-brand-paper text-brand-brown/60'}`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              <div className="p-8 border-t border-brand-brown/5 bg-brand-paper">
                <button 
                  onClick={() => setIsFilterOpen(false)}
                  className="w-full bg-brand-brown text-white py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-brand-blue transition-all shadow-xl shadow-brand-brown/20"
                >
                  Áp Dụng
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
              className="relative bg-brand-bg rounded-[3rem] shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col md:flex-row border border-brand-brown/10"
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 z-10 p-3 bg-white/80 backdrop-blur-sm rounded-2xl hover:bg-white transition-all shadow-lg text-brand-brown/40 hover:text-brand-orange"
              >
                <X size={24} />
              </button>
              
              <div className="w-full md:w-1/2 h-[350px] md:h-auto relative flex flex-col">
                <div className="flex-1 relative overflow-hidden group/main">
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={activeDetailImage}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      src={optimizeImageUrl([selectedProduct.image, ...JSON.parse(selectedProduct.images || '[]')][activeDetailImage] || PLACEHOLDER_IMAGE, 1000)} 
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
              
              <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col">
                <div className="mb-10">
                  <span className="text-brand-blue font-black text-[10px] uppercase tracking-[0.3em] mb-4 block">
                    {CATEGORIES.find(c => c.id === selectedProduct.category)?.name || 'Sản phẩm'}
                  </span>
                  <h3 className="text-3xl md:text-5xl font-black text-brand-brown mb-6 leading-tight">{selectedProduct.name}</h3>
                  <div className="flex flex-col gap-6 mb-8">
                    <div className="flex items-center gap-6">
                      <span className="text-3xl font-black text-brand-blue">
                        Liên hệ báo giá
                      </span>
                      <div className="flex items-center text-brand-orange bg-brand-orange/5 px-4 py-2 rounded-full border border-brand-orange/10">
                        <Star size={16} fill="currentColor" />
                        <span className="text-xs font-black ml-2 tracking-widest">5.0 (24)</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {selectedProduct.meaning && (
                        <div className="p-4 bg-brand-paper rounded-2xl border border-brand-brown/5">
                          <span className="text-[8px] font-black uppercase tracking-widest text-brand-brown/40 block mb-1">Ý nghĩa</span>
                          <span className="text-xs font-bold text-brand-brown">{selectedProduct.meaning}</span>
                        </div>
                      )}
                      {selectedProduct.color && (
                        <div className="p-4 bg-brand-paper rounded-2xl border border-brand-brown/5">
                          <span className="text-[8px] font-black uppercase tracking-widest text-brand-brown/40 block mb-1">Màu sắc</span>
                          <span className="text-xs font-bold text-brand-brown">{selectedProduct.color}</span>
                        </div>
                      )}
                      {selectedProduct.size && (
                        <div className="p-4 bg-brand-paper rounded-2xl border border-brand-brown/5">
                          <span className="text-[8px] font-black uppercase tracking-widest text-brand-brown/40 block mb-1">Kích thước</span>
                          <span className="text-xs font-bold text-brand-brown">{selectedProduct.size}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="h-px bg-brand-brown/5 w-full mb-8"></div>
                  <p className="text-brand-brown/60 leading-relaxed mb-10 text-lg font-medium italic serif">
                    {selectedProduct.description || "Chưa có mô tả cho sản phẩm này. Liên hệ với chúng tôi để biết thêm chi tiết về mẫu hoa này."}
                  </p>
                </div>
                
                <div className="mt-auto flex flex-col sm:flex-row gap-6">
                  <button 
                    onClick={() => {
                      setCurrentView('contact');
                      window.location.hash = '#contact';
                      setSelectedProduct(null);
                    }}
                    className="flex-1 bg-brand-blue text-white py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-brand-orange transition-all shadow-xl shadow-brand-blue/20 flex items-center justify-center gap-3"
                  >
                    <Phone size={20} />
                    Liên hệ ngay
                  </button>
                  <button 
                    onClick={() => {
                      setCurrentView('contact');
                      window.location.hash = '#contact';
                      setSelectedProduct(null);
                    }}
                    className="flex-1 bg-brand-brown text-white py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-brand-blue transition-all shadow-xl shadow-brand-brown/20 flex items-center justify-center gap-3"
                  >
                    <MessageCircle size={20} />
                    Tư vấn Zalo
                  </button>
                </div>
                
                <div className="mt-10 flex items-center gap-8 text-brand-brown/40">
                  <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest">
                    <CheckCircle2 size={16} className="text-brand-blue" />
                    Hoa tươi 100%
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

        {selectedBlog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBlog(null)}
              className="absolute inset-0 bg-brand-brown/60 backdrop-blur-sm"
            ></motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-brand-bg rounded-[3rem] shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col max-h-[90vh] border border-brand-brown/10"
            >
              <button 
                onClick={() => setSelectedBlog(null)}
                className="absolute top-6 right-6 z-10 p-3 bg-white/80 backdrop-blur-sm rounded-2xl hover:bg-white transition-all shadow-lg text-brand-brown/40 hover:text-brand-orange"
              >
                <X size={24} />
              </button>
              
              <div className="h-80 md:h-[500px] relative shrink-0">
                <img 
                  src={optimizeImageUrl(selectedBlog.image || `https://picsum.photos/seed/${selectedBlog.id}/1200/800`, 1200)} 
                  alt={selectedBlog.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-brown/90 via-brand-brown/20 to-transparent flex items-end p-10 md:p-16">
                  <div className="max-w-3xl">
                    <span className="bg-brand-blue text-white text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-widest mb-6 inline-block shadow-xl">
                      {new Date(selectedBlog.created_at).toLocaleDateString('vi-VN')}
                    </span>
                    <h3 className="text-4xl md:text-6xl font-black text-white leading-tight">{selectedBlog.title}</h3>
                  </div>
                </div>
              </div>
              
              <div className="p-10 md:p-16 overflow-y-auto">
                <div className="flex items-center gap-8 mb-12 text-brand-brown/40 text-[10px] font-black uppercase tracking-[0.2em]">
                  <span className="flex items-center gap-2"><Store size={16} className="text-brand-blue" /> Tác giả: {selectedBlog.author}</span>
                  <span className="flex items-center gap-2"><Clock size={16} className="text-brand-blue" /> 5 phút đọc</span>
                </div>
                <div className="prose prose-stone max-w-none text-brand-brown/70 leading-relaxed text-lg font-medium italic serif">
                  {selectedBlog.content.split('\n').map((para, i) => (
                    <p key={i} className="mb-6">{para}</p>
                  ))}
                </div>
                <div className="mt-16 pt-10 border-t border-brand-brown/5 flex justify-between items-center">
                  <div className="flex gap-6">
                    <button className="text-brand-blue hover:text-brand-orange font-black uppercase tracking-widest text-[10px] flex items-center gap-3 transition-all">
                      <Facebook size={20} /> Chia sẻ
                    </button>
                  </div>
                  <button 
                    onClick={() => setSelectedBlog(null)}
                    className="bg-brand-brown text-white px-12 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-brand-blue transition-all shadow-xl shadow-brand-brown/20"
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}


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
      </div>
    </div>
  );
}
