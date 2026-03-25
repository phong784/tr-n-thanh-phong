import { Category } from './types';

export const LOGO_URL = '/logo.png'; // Đường dẫn đến logo trong thư mục public

export const CATEGORIES: Category[] = [
  { id: 'bo-hoa', name: 'Bó Hoa', icon: 'Gift', image: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&q=80&w=400&fm=webp' },
  { id: 'hoa-khai-truong', name: 'Hoa Khai Trương', icon: 'Award', image: 'https://images.unsplash.com/photo-1519378018457-4c29a3a2ecdf?auto=format&fit=crop&q=80&w=400&fm=webp' },
  { id: 'gio-hoa', name: 'Giỏ Hoa', icon: 'ShoppingBasket', image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=400&fm=webp' },
  { id: 'hoa-chia-buon', name: 'Hoa Chia Buồn', icon: 'HeartHandshake', image: 'https://images.unsplash.com/photo-1516589174184-c685266e430c?auto=format&fit=crop&q=80&w=400&fm=webp' },
  { id: 'hoa-cuoi', name: 'Hoa Cưới', icon: 'Heart', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=400&fm=webp' },
];

export const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1523694576729-dc99e9c0f9b4?auto=format&fit=crop&q=80&w=800&fm=webp';

export const CONTACT_INFO = {
  address: '8 Phan Văn Hân, Phường 19, Bình Thạnh, TP. Hồ Chí Minh',
  phone: '0934 926 092',
  hours: '07:00 - 21:00',
  maps_embed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.2428581355575!2d106.7049357758688!3d10.792702458891574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529002e9f54cf%3A0xb0684463b666e644!2zSG9hIFTGsMahaSBUaGFuaCBOZ-G7jWMg4oCTIFBoYW4gVsSDbiBIw6Ju!5e0!3m2!1svi!2s!4v1773026913887!5m2!1svi!2s'
};

export const ABOUT_US = {
  story: "Hoa Tươi Thanh Ngọc được thành lập từ tình yêu mãnh liệt với vẻ đẹp của thiên nhiên và khát khao mang nghệ thuật hoa tươi đến gần hơn với mọi người. Bắt đầu từ một cửa hàng nhỏ tại Bình Thạnh, chúng tôi đã không ngừng sáng tạo và đổi mới để trở thành địa chỉ tin cậy cho những ai tìm kiếm sự tinh tế và cảm xúc trong từng bó hoa.",
  mission: "Sứ mệnh của chúng tôi là truyền tải những thông điệp yêu thương và cảm xúc chân thành thông qua những thiết kế hoa độc bản, mang lại niềm vui và sự an nhiên cho khách hàng.",
  values: [
    { title: "Tận Tâm", description: "Mỗi sản phẩm đều được chăm chút tỉ mỉ từ khâu chọn hoa đến khi trao tận tay khách hàng." },
    { title: "Sáng Tạo", description: "Luôn tìm tòi và cập nhật những xu hướng thiết kế mới nhất, mang đậm dấu ấn nghệ thuật." },
    { title: "Chất Lượng", description: "Cam kết sử dụng hoa tươi nhất trong ngày, đảm bảo độ bền và vẻ đẹp rực rỡ." }
  ]
};
