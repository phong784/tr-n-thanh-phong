import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Flower2, Users, Star, ChevronRight, Play } from 'lucide-react';
import { optimizeImageUrl } from '../utils';

interface AboutPageProps {
  setCurrentView: (view: string) => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ setCurrentView }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="pt-32 pb-20"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="space-y-8">
            <span className="inline-block px-5 py-2 bg-brand-orange/10 text-brand-orange text-[10px] font-black uppercase tracking-[0.3em] rounded-full">
              Câu Chuyện Của Chúng Tôi
            </span>
            <h1 className="text-6xl md:text-7xl font-serif font-black text-brand-brown leading-[0.9] tracking-tighter">
              Nơi tình yêu <br />
              <span className="text-brand-blue italic font-normal">Nở Rộ</span>
            </h1>
            <p className="text-lg text-brand-brown/70 leading-relaxed font-medium max-w-lg">
              Thanh Ngọc không chỉ là một tiệm hoa. Đó là nơi chúng tôi gửi gắm tâm hồn vào từng cánh hoa, biến những khoảnh khắc bình thường trở nên diệu kỳ và đáng nhớ.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => setCurrentView('products')}
                className="px-8 py-4 bg-brand-brown text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-brand-blue transition-all flex items-center gap-2"
              >
                Xem Sản Phẩm <ChevronRight size={16} />
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl border-[12px] border-white transform -rotate-3">
              <img 
                src={optimizeImageUrl("https://images.unsplash.com/photo-1519337265831-281ec6cc8514", 1200)} 
                alt="Our Story" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-brand-orange rounded-full flex items-center justify-center text-white shadow-2xl transform rotate-12">
              <div className="text-center">
                <p className="text-4xl font-serif font-black">10+</p>
                <p className="text-[10px] font-black uppercase tracking-widest">Năm Kinh Nghiệm</p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-32">
          {[
            {
              icon: <Heart className="text-brand-orange" size={32} />,
              title: "Tận Tâm",
              desc: "Mỗi sản phẩm đều được chăm chút tỉ mỉ từ khâu chọn hoa đến khi trao tận tay khách hàng."
            },
            {
              icon: <Flower2 className="text-brand-blue" size={32} />,
              title: "Sáng Tạo",
              desc: "Chúng tôi luôn cập nhật những xu hướng thiết kế hoa mới nhất trên thế giới."
            },
            {
              icon: <Users className="text-brand-brown" size={32} />,
              title: "Kết Nối",
              desc: "Hoa là ngôn ngữ của cảm xúc, giúp mọi người xích lại gần nhau hơn."
            }
          ].map((value, idx) => (
            <div key={idx} className="p-10 bg-white rounded-[3rem] border border-brand-brown/5 shadow-xl shadow-brand-brown/5 space-y-6 hover:translate-y-[-10px] transition-all duration-500">
              <div className="w-16 h-16 bg-brand-bg rounded-2xl flex items-center justify-center shadow-inner">
                {value.icon}
              </div>
              <h3 className="text-xl font-black text-brand-brown uppercase tracking-widest">{value.title}</h3>
              <p className="text-sm text-brand-brown/60 leading-relaxed font-medium">{value.desc}</p>
            </div>
          ))}
        </div>

        {/* Video Showcase Section */}
        <div className="mb-32 relative group">
          <div className="absolute inset-0 bg-brand-brown/5 rounded-[4rem] -rotate-1 scale-105 group-hover:rotate-0 transition-all duration-700"></div>
          <div className="relative aspect-video rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white">
            <img 
              src={optimizeImageUrl("https://images.unsplash.com/photo-1516627145497-ae6968895b74", 1920)} 
              alt="Shop Ambiance" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-brand-brown/40 flex flex-col items-center justify-center text-white p-8 text-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-24 h-24 bg-brand-orange rounded-full flex items-center justify-center mb-8 shadow-2xl group/play"
              >
                <Play size={40} className="fill-current ml-2 group-hover/play:scale-110 transition-transform" />
              </motion.button>
              <h2 className="text-4xl md:text-5xl font-serif font-black mb-4 tracking-tight">Hành Trình Của Những Cánh Hoa</h2>
              <p className="text-lg font-medium text-white/80 max-w-xl mb-8">Khám phá nghệ thuật cắm hoa tinh tế và không gian ấm cúng tại Thanh Ngọc.</p>
              <button className="px-8 py-4 bg-white text-brand-brown rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-brand-blue hover:text-white transition-all">
                Xem Câu Chuyện Của Chúng Tôi
              </button>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-16">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-blue mb-4 block">Đội Ngũ Nghệ Nhân</span>
          <h2 className="text-5xl font-serif font-black text-brand-brown tracking-tight">Những người thổi hồn vào hoa</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { name: "Thanh Ngọc", role: "Founder & Lead Florist", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2" },
            { name: "Minh Anh", role: "Creative Director", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80" },
            { name: "Hoàng Nam", role: "Senior Florist", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e" },
            { name: "Lan Phương", role: "Customer Experience", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330" }
          ].map((member, idx) => (
            <div key={idx} className="group">
              <div className="aspect-[3/4] rounded-[2.5rem] overflow-hidden mb-6 shadow-xl border-4 border-white group-hover:border-brand-blue transition-all duration-500">
                <img 
                  src={optimizeImageUrl(member.img, 400)} 
                  alt={member.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h4 className="text-lg font-black text-brand-brown uppercase tracking-widest">{member.name}</h4>
              <p className="text-[10px] font-black uppercase tracking-widest text-brand-orange mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AboutPage;
