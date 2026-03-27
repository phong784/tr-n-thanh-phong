import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ChevronLeft, 
  Store, 
  Clock, 
  Calendar, 
  Facebook, 
  Instagram 
} from 'lucide-react';
import { Blog } from '../types';
import { optimizeImageUrl } from '../utils';

interface BlogDetailPageProps {
  slug: string;
  onBack: () => void;
}

const BlogDetailPage: React.FC<BlogDetailPageProps> = ({ slug, onBack }) => {
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

export default BlogDetailPage;
