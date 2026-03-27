import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, ChevronRight } from 'lucide-react';

const ContactPage: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="pt-32 pb-20"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Info */}
          <div className="space-y-12">
            <div className="space-y-6">
              <span className="inline-block px-5 py-2 bg-brand-blue/10 text-brand-blue text-[10px] font-black uppercase tracking-[0.3em] rounded-full">
                Liên Hệ Với Chúng Tôi
              </span>
              <h1 className="text-6xl md:text-7xl font-serif font-black text-brand-brown leading-[0.9] tracking-tighter">
                Hãy cùng <br />
                <span className="text-brand-orange italic font-normal">Kết Nối</span>
              </h1>
              <p className="text-lg text-brand-brown/70 leading-relaxed font-medium max-w-lg">
                Chúng tôi luôn sẵn lòng lắng nghe và tư vấn để bạn có được những bó hoa tuyệt vời nhất.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              {[
                { icon: <MapPin className="text-brand-orange" />, title: "Địa Chỉ", info: "123 Đường Hoa, Quận 1, TP.HCM" },
                { icon: <Phone className="text-brand-blue" />, title: "Điện Thoại", info: "090 123 4567" },
                { icon: <Mail className="text-brand-brown" />, title: "Email", info: "hello@thanhngoc.vn" },
                { icon: <Clock className="text-brand-orange" />, title: "Giờ Mở Cửa", info: "08:00 - 20:00 (Hàng ngày)" }
              ].map((item, idx) => (
                <div key={idx} className="p-8 bg-white rounded-[2.5rem] border border-brand-brown/5 shadow-xl shadow-brand-brown/5 space-y-4 hover:translate-y-[-5px] transition-all duration-500">
                  <div className="w-12 h-12 bg-brand-bg rounded-2xl flex items-center justify-center shadow-inner">
                    {item.icon}
                  </div>
                  <h3 className="text-sm font-black text-brand-brown uppercase tracking-widest">{item.title}</h3>
                  <p className="text-xs text-brand-brown/60 leading-relaxed font-medium">{item.info}</p>
                </div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="aspect-video rounded-[3rem] overflow-hidden border-[12px] border-white shadow-2xl bg-brand-bg relative group">
              <div className="absolute inset-0 bg-brand-brown/10 backdrop-blur-sm group-hover:backdrop-blur-0 transition-all duration-500"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="p-6 bg-white rounded-3xl shadow-2xl text-center">
                  <MapPin className="text-brand-orange mx-auto mb-3" size={32} />
                  <p className="text-[10px] font-black uppercase tracking-widest text-brand-brown">Bản đồ đang tải...</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-12 rounded-[4rem] shadow-2xl border border-brand-brown/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-blue/5 rounded-full -ml-16 -mb-16"></div>
            
            <div className="relative z-10 space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-serif font-black text-brand-brown uppercase tracking-tighter">Gửi Lời Nhắn</h2>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-brown/40 mt-2">Phản hồi trong vòng 2 giờ làm việc</p>
              </div>

              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-brand-brown/40 ml-4">Họ và Tên</label>
                    <input type="text" className="w-full px-6 py-4 rounded-2xl bg-brand-bg border border-brand-brown/5 focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all font-medium" placeholder="Nguyễn Văn A" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-brand-brown/40 ml-4">Số Điện Thoại</label>
                    <input type="tel" className="w-full px-6 py-4 rounded-2xl bg-brand-bg border border-brand-brown/5 focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all font-medium" placeholder="090 123 4567" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-brand-brown/40 ml-4">Địa Chỉ Email</label>
                  <input type="email" className="w-full px-6 py-4 rounded-2xl bg-brand-bg border border-brand-brown/5 focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all font-medium" placeholder="hello@thanhngoc.vn" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-brand-brown/40 ml-4">Nội Dung</label>
                  <textarea rows={4} className="w-full px-6 py-4 rounded-2xl bg-brand-bg border border-brand-brown/5 focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all font-medium resize-none" placeholder="Bạn cần tư vấn về loại hoa nào?"></textarea>
                </div>
                <button className="w-full py-5 bg-brand-brown text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-brand-blue transition-all shadow-2xl shadow-brand-brown/20 flex items-center justify-center gap-3 group">
                  Gửi Yêu Cầu <Send size={18} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactPage;
