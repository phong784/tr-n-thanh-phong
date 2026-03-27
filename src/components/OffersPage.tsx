import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Zap, Clock, ChevronRight, Tag, Star } from 'lucide-react';
import { optimizeImageUrl } from '../utils';

interface OffersPageProps {
  setCurrentView: (view: string) => void;
}

const OffersPage: React.FC<OffersPageProps> = ({ setCurrentView }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="pt-32 pb-20"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20 space-y-6">
          <span className="inline-block px-5 py-2 bg-brand-orange/10 text-brand-orange text-[10px] font-black uppercase tracking-[0.3em] rounded-full">
            Ưu Đãi Đặc Biệt
          </span>
          <h1 className="text-6xl md:text-7xl font-serif font-black text-brand-brown leading-[0.9] tracking-tighter">
            Quà tặng <br />
            <span className="text-brand-blue italic font-normal">Yêu Thương</span>
          </h1>
          <p className="text-lg text-brand-brown/70 leading-relaxed font-medium max-w-2xl mx-auto">
            Khám phá những chương trình khuyến mãi hấp dẫn nhất từ Thanh Ngọc. Đừng bỏ lỡ cơ hội trao gửi yêu thương với mức giá ưu đãi.
          </p>
        </div>

        {/* Main Offer Card */}
        <div className="relative rounded-[4rem] overflow-hidden bg-brand-brown p-12 md:p-20 mb-32 group">
          <div className="absolute inset-0 z-0">
            <img 
              src={optimizeImageUrl("https://images.unsplash.com/photo-1526047932273-341f2a7631f9", 1920)} 
              alt="Main Offer" 
              className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-1000"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-brown via-brand-brown/80 to-transparent"></div>
          </div>
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-center gap-3 text-brand-orange">
                <Zap size={24} fill="currentColor" />
                <span className="text-xs font-black uppercase tracking-[0.3em]">Flash Sale - Chỉ trong hôm nay</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-serif font-black text-white leading-[0.9] tracking-tighter">
                Giảm ngay 20% <br />
                <span className="italic font-normal">Cho đơn hàng đầu tiên</span>
              </h2>
              <p className="text-lg text-white/70 leading-relaxed font-medium max-w-md">
                Nhập mã <span className="text-brand-orange font-black px-3 py-1 bg-white/10 rounded-lg">THANHNGOC20</span> để nhận ưu đãi. Áp dụng cho tất cả các loại hoa tươi.
              </p>
              <button 
                onClick={() => setCurrentView('products')}
                className="px-10 py-5 bg-brand-orange text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white hover:text-brand-brown transition-all shadow-2xl shadow-brand-orange/20 flex items-center gap-3"
              >
                Mua Ngay <ChevronRight size={18} />
              </button>
            </div>
            <div className="hidden lg:block">
              <div className="aspect-square rounded-[3rem] overflow-hidden border-[12px] border-white/10 shadow-2xl relative">
                <img 
                  src={optimizeImageUrl("https://images.unsplash.com/photo-1561181286-d3fee7d55364", 800)} 
                  alt="Promo Flower" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full flex flex-col items-center justify-center shadow-2xl transform rotate-12">
                  <p className="text-[10px] font-black uppercase tracking-widest text-brand-brown">Chỉ từ</p>
                  <p className="text-2xl font-serif font-black text-brand-orange">199k</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Offers */}
        <div className="grid md:grid-cols-2 gap-12 mb-32">
          {[
            {
              title: "Combo Hẹn Hò",
              desc: "Bó hoa hồng + Gấu bông + Thiệp viết tay. Tiết kiệm 15% khi mua trọn bộ.",
              img: "https://images.unsplash.com/photo-1523694559145-804f37934553",
              color: "bg-brand-blue"
            },
            {
              title: "Miễn Phí Giao Hoa",
              desc: "Free ship cho tất cả đơn hàng trên 500k trong nội thành TP.HCM.",
              img: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0",
              color: "bg-brand-orange"
            }
          ].map((offer, idx) => (
            <div key={idx} className="relative rounded-[3rem] overflow-hidden group h-[400px]">
              <img 
                src={optimizeImageUrl(offer.img, 800)} 
                alt={offer.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className={`absolute inset-0 ${offer.color}/80 opacity-90 group-hover:opacity-100 transition-opacity`}></div>
              <div className="absolute inset-0 p-12 flex flex-col justify-end text-white">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md">
                  <Gift size={24} />
                </div>
                <h3 className="text-3xl font-serif font-black uppercase tracking-tighter mb-4">{offer.title}</h3>
                <p className="text-sm text-white/80 leading-relaxed font-medium mb-8 max-w-xs">{offer.desc}</p>
                <button 
                  onClick={() => setCurrentView('products')}
                  className="w-fit px-8 py-4 bg-white text-brand-brown rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-brand-brown hover:text-white transition-all flex items-center gap-2"
                >
                  Khám phá ngay <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Loyalty Section */}
        <div className="bg-brand-paper rounded-[4rem] p-12 md:p-20 text-center space-y-8 border border-brand-brown/5 shadow-xl shadow-brand-brown/5">
          <div className="w-20 h-20 bg-brand-blue rounded-3xl flex items-center justify-center text-white shadow-2xl mx-auto mb-8">
            <Star size={40} fill="currentColor" />
          </div>
          <h2 className="text-5xl font-serif font-black text-brand-brown tracking-tight">Thành Viên Thân Thiết</h2>
          <p className="text-lg text-brand-brown/70 leading-relaxed font-medium max-w-2xl mx-auto">
            Đăng ký thành viên để tích điểm cho mỗi đơn hàng và nhận những ưu đãi độc quyền dành riêng cho bạn.
          </p>
          <div className="flex flex-wrap justify-center gap-6 pt-4">
            <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-2xl shadow-sm border border-brand-brown/5">
              <Tag className="text-brand-orange" size={20} />
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-brown">Tích điểm 5%</span>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-2xl shadow-sm border border-brand-brown/5">
              <Clock className="text-brand-blue" size={20} />
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-brown">Ưu tiên giao hàng</span>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-2xl shadow-sm border border-brand-brown/5">
              <Gift className="text-brand-brown" size={20} />
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-brown">Quà tặng sinh nhật</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OffersPage;
