import express from 'express';
console.log('Server script starting...');
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import Database from 'better-sqlite3';
import { parse } from 'csv-parse/sync';
import dotenv from 'dotenv';
import sharp from 'sharp';

import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, 'database.sqlite');
const db = (() => {
  try {
    console.log('Using database at:', dbPath);
    return new Database(dbPath);
  } catch (error) {
    console.error('Failed to open database:', error);
    process.exit(1);
  }
})();

// Initialize database
console.log('Initializing database schema...');
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price INTEGER,
    category TEXT NOT NULL,
    description TEXT,
    meaning TEXT,
    color TEXT,
    size TEXT,
    alt_text TEXT,
    image TEXT,
    images TEXT, -- JSON string of additional image URLs
    is_new INTEGER DEFAULT 0,
    is_best_seller INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS blogs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    content TEXT NOT NULL,
    excerpt TEXT,
    image TEXT,
    author TEXT DEFAULT 'Admin',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Migration: Add new columns to products if they don't exist
try {
  const columns = db.prepare("PRAGMA table_info(products)").all() as any[];
  const hasImages = columns.some(col => col.name === 'images');
  if (!hasImages) {
    console.log('Migrating database: adding images column to products table...');
    db.exec("ALTER TABLE products ADD COLUMN images TEXT;");
  }
  
  const hasMeaning = columns.some(col => col.name === 'meaning');
  if (!hasMeaning) {
    console.log('Migrating database: adding meaning, color, size columns to products table...');
    db.exec("ALTER TABLE products ADD COLUMN meaning TEXT;");
    db.exec("ALTER TABLE products ADD COLUMN color TEXT;");
    db.exec("ALTER TABLE products ADD COLUMN size TEXT;");
  }

  const hasAltText = columns.some(col => col.name === 'alt_text');
  if (!hasAltText) {
    console.log('Migrating database: adding alt_text column to products table...');
    db.exec("ALTER TABLE products ADD COLUMN alt_text TEXT;");
  }

  db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_name TEXT NOT NULL,
      phone TEXT NOT NULL,
      address TEXT NOT NULL,
      delivery_date TEXT NOT NULL,
      payment_method TEXT NOT NULL,
      items TEXT NOT NULL, -- JSON string of cart items
      total_amount INTEGER NOT NULL,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT
    );
  `);

  // Initialize default settings if they don't exist
  const defaultSettings = [
    { key: 'logo_url', value: '/logo.png' },
    { key: 'hero_image_url', value: 'https://images.unsplash.com/photo-1523694576729-dc99e9c0f9b4?auto=format&fit=crop&q=80&w=1920&fm=webp' },
    { key: 'category_image_bo-hoa', value: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&q=80&w=400&fm=webp' },
    { key: 'category_image_hoa-khai-truong', value: 'https://images.unsplash.com/photo-1519378018457-4c29a3a2ecdf?auto=format&fit=crop&q=80&w=400&fm=webp' },
    { key: 'category_image_gio-hoa', value: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=400&fm=webp' },
    { key: 'category_image_hoa-chia-buon', value: 'https://images.unsplash.com/photo-1516589174184-c685266e430c?auto=format&fit=crop&q=80&w=400&fm=webp' },
    { key: 'category_image_hoa-cuoi', value: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=400&fm=webp' },
    { key: 'all_products_banner', value: 'https://images.unsplash.com/photo-1519378018457-4c29a3a2ecdf' }
  ];

  const insertSetting = db.prepare('INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)');
  defaultSettings.forEach(setting => insertSetting.run(setting.key, setting.value));

  // Make price nullable if it's not already (SQLite doesn't support ALTER COLUMN easily, 
  // but we can just allow nulls in our queries and the schema above handles new tables)
} catch (error) {
  console.error('Migration error:', error);
}

// Seed data
const seedProducts = [
  {
    name: "Bó hoa hồng đỏ Đà Lạt tình yêu vĩnh cửu",
    price: 550000,
    category: "bo-hoa",
    description: "Bó hoa hồng đỏ Đà Lạt tươi thắm, biểu tượng cho tình yêu nồng cháy và vĩnh cửu. Phù hợp tặng người yêu, kỷ niệm ngày cưới.",
    image: "https://images.unsplash.com/photo-1548622350-dd949d9dabe2?auto=format&fit=crop&q=80&w=800",
    is_new: 1,
    is_best_seller: 1
  },
  {
    name: "Giỏ hoa hướng dương rực rỡ nắng mai",
    price: 450000,
    category: "gio-hoa",
    description: "Giỏ hoa hướng dương kết hợp cùng hoa baby trắng, mang lại cảm giác ấm áp và hy vọng. Món quà ý nghĩa cho ngày khai trương, chúc mừng.",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=800",
    is_new: 1,
    is_best_seller: 0
  },
  {
    name: "Lẵng hoa lan hồ điệp trắng sang trọng",
    price: 1200000,
    category: "ke-hoa",
    description: "Lẵng hoa lan hồ điệp trắng tinh khôi, sang trọng, thích hợp cho các dịp lễ quan trọng, trang trí phòng khách hoặc tặng đối tác.",
    image: "https://images.unsplash.com/photo-1567606117948-c2a532593250?auto=format&fit=crop&q=80&w=800",
    is_new: 0,
    is_best_seller: 1
  }
];

const seedBlogs = [
  {
    title: "Cách giữ hoa tươi lâu tại nhà đơn giản",
    slug: "cach-giu-hoa-tuoi-lau-tai-nha",
    excerpt: "Bạn muốn những bó hoa tươi thắm của mình giữ được vẻ đẹp lâu hơn? Hãy cùng khám phá những mẹo nhỏ cực kỳ hiệu quả sau đây.",
    content: "Giữ hoa tươi lâu không khó nếu bạn biết cách chăm sóc đúng. Đầu tiên, hãy cắt gốc hoa theo đường chéo để tăng diện tích tiếp xúc với nước. Thứ hai, hãy thay nước mỗi ngày và thêm một chút đường hoặc thuốc dưỡng hoa. Thứ ba, tránh để hoa ở nơi có ánh nắng trực tiếp hoặc gần quạt gió...",
    image: "https://images.unsplash.com/photo-1519378304606-27b43f50229f?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Ý nghĩa của các loài hoa trong tình yêu",
    slug: "y-nghia-cac-loai-hoa-trong-tinh-yeu",
    excerpt: "Mỗi loài hoa mang một thông điệp riêng. Hãy cùng tìm hiểu ý nghĩa của hoa hồng, hoa hướng dương, hoa cẩm chướng trong tình yêu nhé.",
    content: "Hoa hồng đỏ tượng trưng cho tình yêu nồng cháy, hoa hồng trắng là sự tinh khôi, hoa hướng dương là sự thủy chung luôn hướng về nhau. Khi tặng hoa, việc hiểu ý nghĩa sẽ giúp món quà của bạn trở nên tinh tế và sâu sắc hơn bao giờ hết...",
    image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "5 Bí Kíp Giữ Hoa Tươi Lâu Tại Nhà",
    slug: "5-bi-kip-giu-hoa-tuoi-lau-tai-nha",
    excerpt: "Hướng dẫn chi tiết cách bảo quản hoa tươi lâu hơn tại nhà với những mẹo đơn giản mà hiệu quả.",
    author: "Thanh Ngọc",
    created_at: "2024-01-15 00:00:00",
    content: `Khi nhận được một bó hoa tươi thắm, ai cũng muốn giữ được vẻ đẹp rạng rỡ của chúng càng lâu càng tốt. Dưới đây là 5 bí kíp đơn giản nhưng cực kỳ hiệu quả giúp hoa của bạn luôn tươi tắn suốt cả tuần.

1. Cắt Cành Hoa Đúng Cách
Tại sao cần cắt cành? Khi hoa được cắt khỏi gốc, phần cành bị dập sẽ nhanh chóng bịt kín, ngăn cản việc hút nước.

Cách cắt đúng:
- Dùng kéo sắc, cắt chéo 45 độ
- Cắt bỏ khoảng 2-3cm phần cành bị dập
- Cắt dưới nước để tránh bọt khí vào mạch gỗ

2. Thay Nước Thường Xuyên
Tần suất lý tưởng: Thay nước mỗi ngày vào buổi sáng.

Lưu ý quan trọng:
- Rửa sạch bình hoa trước khi thay nước
- Loại bỏ những cánh hoa héo úa
- Cắt lại cành hoa mỗi lần thay nước

3. Sử Dụng Chất Dinh Dưỡng Cho Hoa
Các loại chất dinh dưỡng tự nhiên:
- 1 thìa đường + 1 thìa giấm táo
- 1 viên aspirin hòa tan
- 1 thìa nước cốt chanh

Công dụng: Cung cấp dinh dưỡng, diệt khuẩn, kéo dài tuổi thọ của hoa.

4. Tránh Ánh Nắng Trực Tiếp
Vị trí lý tưởng:
- Phòng có ánh sáng dịu
- Tránh ánh nắng mặt trời chiếu trực tiếp
- Tránh các thiết bị phát nhiệt (TV, lò sưởi, bếp)

Lý do: Ánh nắng và nhiệt độ cao làm hoa héo nhanh hơn.

5. Cắt Bỏ Lá Chìm Trong Nước
Tại sao cần làm? Lá ngập trong nước sẽ thối rữa, làm ô nhiễm nước và gây hại cho hoa.

Cách thực hiện:
- Loại bỏ tất cả lá nằm dưới mực nước
- Chỉ giữ lại phần lá trên mặt nước
- Lau sạch cành hoa nếu có nhựa

Mẹo Nhỏ Thêm
- Ban đêm: Đặt hoa vào tủ lạnh (nếu có thể) để kéo dài thời gian tươi
- Sáng sớm: Lấy hoa ra khỏi tủ lạnh, thay nước và cắt lại cành
- Xịt sương: Dùng bình xịt phun sương nhẹ lên cánh hoa vào buổi sáng

Với 5 bí kíp đơn giản này, bó hoa của bạn sẽ luôn rực rỡ và tươi tắn suốt cả tuần. Hãy thử áp dụng và cảm nhận sự khác biệt nhé!

Bài viết được cung cấp bởi Hoa Tươi Thanh Ngọc - Chuyên cung cấp hoa tươi chất lượng cao tại TP.HCM`,
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Chọn Hoa Sinh Nhật Ý Nghĩa Theo Tuổi Và Sở Thích",
    slug: "chon-hoa-sinh-nhat-y-nghia-theo-tuoi-va-so-thich",
    excerpt: "Hướng dẫn chọn hoa sinh nhật phù hợp với độ tuổi, tính cách và sở thích của người nhận.",
    author: "Thanh Ngọc",
    created_at: "2024-01-25 00:00:00",
    content: `Hoa sinh nhật không chỉ là món quà đẹp mắt mà còn thể hiện tấm lòng và sự tinh tế của người tặng. Việc chọn đúng loại hoa, màu sắc phù hợp với độ tuổi và tính cách sẽ làm tăng thêm ý nghĩa và giá trị tinh thần của món quà.

Chọn Hoa Theo Độ Tuổi

1. Trẻ Em (Dưới 12 Tuổi)
Gợi ý: Hoa hướng dương, hoa cúc nhiều màu, hoa tulip
Lý do: Màu sắc rực rỡ, hình dáng đáng yêu, thu hút sự chú ý của trẻ nhỏ
Thông điệp: Mong ước về một tuổi thơ hạnh phúc, hồn nhiên và đầy ắp tiếng cười

2. Vị Thành Niên (13-18 Tuổi)
Gợi ý: Hoa oải hương, hoa cẩm chướng, hoa lan hồ điệp mini
Lý do: Thể hiện sự trưởng thành, cá tính riêng biệt
Thông điệp: Chúc mừng sự trưởng thành, mong ước về một tương lai tươi sáng

3. Người Trẻ (19-30 Tuổi)
Gợi ý: Hoa hồng, hoa ly, hoa cát tường, hoa lan hồ điệp
Lý do: Sang trọng, tinh tế, phù hợp với gu thẩm mỹ hiện đại
Thông điệp: Chúc mừng tuổi trẻ rực rỡ, thành công và hạnh phúc

4. Người Trung Niên (31-50 Tuổi)
Gợi ý: Hoa lan, hoa cúc, hoa đồng tiền, cây cảnh
Lý do: Tinh tế, sang trọng, thể hiện sự chín chắn
Thông điệp: Chúc sức khỏe, hạnh phúc gia đình, thành công sự nghiệp

5. Người Cao Tuổi (Trên 50 Tuổi)
Gợi ý: Hoa cúc vàng, hoa lan, cây cảnh, chậu cây bonsai
Lý do: Tượng trưng cho sự trường thọ, may mắn
Thông điệp: Chúc sức khỏe dồi dào, sống lâu trăm tuổi

Chọn Hoa Theo Tính Cách

1. Người Hướng Ngoại, Năng Động
Gợi ý: Hoa hướng dương, hoa cúc vạn thọ, hoa đồng tiền
Màu sắc: Vàng, cam, đỏ rực rỡ
Lý do: Phù hợp với tính cách sôi nổi, nhiệt huyết

2. Người Hướng Nội, Tinh Tế
Gợi ý: Hoa oải hương, hoa lan, hoa cẩm chướng
Màu sắc: Tím, trắng, hồng pastel
Lý do: Thể hiện sự nhẹ nhàng, tinh tế và sâu sắc

3. Người Mạnh Mẽ, Quyết Đoán
Gợi ý: Hoa hồng đỏ, hoa ly, hoa lan hồ điệp
Màu sắc: Đỏ, trắng, tím đậm
Lý do: Thể hiện sự mạnh mẽ, quyền lực và quyết đoán

4. Người Nhẹ Nhàng, Dịu Dàng
Gợi ý: Hoa baby, hoa cẩm chướng, hoa hồng pastel
Màu sắc: Hồng, trắng, kem
Lý do: Phù hợp với tính cách dịu dàng, nữ tính

Chọn Hoa Theo Sở Thích

1. Người Yêu Thiên Nhiên
Gợi ý: Cây cảnh, chậu cây xanh, hoa lan rừng
Lý do: Phù hợp với sở thích chăm sóc cây cối

2. Người Yêu Nghệ Thuật
Gợi ý: Hoa lan hồ điệp, hoa cát tường, hoa nhập khẩu
Lý do: Tinh tế, độc đáo, mang tính nghệ thuật cao

3. Người Yêu Du Lịch
Gợi ý: Cây xương rồng, cây sen đá, hoa dễ chăm sóc
Lý do: Dễ chăm sóc, phù hợp với người hay đi xa

4. Người Yêu Ẩm Thực
Gợi ý: Hoa ăn được như hoa hồng, hoa cúc, hoa oải hương
Lý do: Vừa trang trí, vừa có thể dùng trong ẩm thực

Ý Nghĩa Màu Sắc Hoa Sinh Nhật
- Màu Đỏ: Tình yêu, đam mê, năng lượng. Phù hợp: Người trẻ, người yêu nhau, người năng động.
- Màu Vàng: Niềm vui, hạnh phúc, may mắn. Phù hợp: Mọi lứa tuổi, đặc biệt là trẻ em.
- Màu Hồng: Tình bạn, sự dịu dàng, nhẹ nhàng. Phù hợp: Bạn bè, người lớn tuổi.
- Màu Tím: Sự chung thủy, thủy chung, sang trọng. Phù hợp: Người trung niên, người yêu nhau lâu năm.
- Màu Trắng: Sự tinh khiết, trong sáng, thanh cao. Phù hợp: Người lớn tuổi, người có tính cách tinh tế.

Cách Tặng Hoa Sinh Nhật Ý Nghĩa
1. Kết Hợp Với Quà Tặng: Gấu bông, bánh kem hoặc thiệp chúc mừng.
2. Tặng Vào Thời Điểm Phù Hợp: Buổi sáng tạo sự vui tươi, buổi tối tạo sự lãng mạn.
3. Gửi Lời Chúc Ý Nghĩa: Tùy theo đối tượng mà gửi những lời chúc phù hợp nhất.

Bài viết được cung cấp bởi Hoa Tươi Thanh Ngọc - Tư vấn chọn hoa theo từng đối tượng chuyên nghiệp`,
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Tặng Hoa Khai Trương Rước Tài Lộc",
    slug: "tang-hoa-khai-truong-ruoc-tai-loc",
    excerpt: "Hướng dẫn chọn hoa khai trương mang lại may mắn, tài lộc cho doanh nghiệp mới.",
    author: "Thanh Ngọc",
    created_at: "2024-01-20 00:00:00",
    content: `Khai trương là dịp trọng đại đánh dấu sự khởi đầu mới mẻ và hứa hẹn. Một lẵng hoa chúc mừng không chỉ thể hiện sự quan tâm mà còn mang ý nghĩa phong thủy sâu sắc, góp phần mang lại may mắn và thành công cho gia chủ.

Ý Nghĩa Của Hoa Khai Trương
Theo quan niệm Á Đông, hoa tươi tượng trưng cho sự sinh sôi, nảy nở và phát triển. Việc tặng hoa trong ngày khai trương thể hiện:
- Lời chúc tốt đẹp cho sự nghiệp mới
- Mong ước về sự phát đạt, thịnh vượng
- Tạo không khí vui tươi, ấm áp
- Hút tài lộc theo phong thủy

Các Loại Hoa Phong Thủy Cho Khai Trương

1. Hoa Hướng Dương
Ý nghĩa: Mặt trời, ánh sáng, sự kiên cường và thành công rực rỡ.
Lý do chọn: Hướng dương luôn hướng về ánh sáng, tượng trưng cho tinh thần tiến thủ, hướng tới thành công.

2. Hoa Cúc Vạn Thọ
Ý nghĩa: Trường thọ, may mắn, tài lộc dồi dào.
Lý do chọn: Màu vàng rực rỡ tượng trưng cho vàng bạc, tiền tài. Cúc vạn thọ còn có khả năng thanh lọc không khí.

3. Hoa Đồng Tiền
Ý nghĩa: Tài lộc, may mắn, hạnh phúc.
Lý do chọn: Tên gọi đã nói lên tất cả - mang lại tiền tài, phú quý cho gia chủ.

4. Cây Kim Tiền
Ý nghĩa: Tài vận hanh thông, tiền vào như nước.
Lý do chọn: Lá xanh quanh năm, dễ chăm sóc, rất hợp để bàn làm việc.

5. Cây Phát Tài
Ý nghĩa: Phát tài phát lộc, thịnh vượng.
Lý do chọn: Tượng trưng cho sự phát triển mạnh mẽ, thuận lợi trong kinh doanh.

Màu Sắc May Mắn Cho Khai Trương
- Màu Vàng & Vàng Cam: Đại diện cho vàng bạc, tiền tài. Phù hợp với các ngành kinh doanh, tài chính, thương mại.
- Màu Đỏ & Hồng: Đại diện cho may mắn, nhiệt huyết, đam mê. Phù hợp với các ngành sáng tạo, nghệ thuật, ẩm thực.
- Màu Xanh Lá: Đại diện cho sinh sôi, phát triển, bình an. Phù hợp với các ngành y tế, giáo dục, môi trường.

Cách Chọn Lẵng Hoa Khai Trương
1. Chọn Kích Cỡ Phù Hợp: Cửa hàng nhỏ chọn lẵng vừa (50-70cm), văn phòng chọn giỏ để bàn, cửa hàng lớn chọn lẵng đại (80-120cm).
2. Chọn Phong Cách Trang Trí: Truyền thống (hoa tươi + lá xanh), hiện đại (hoa nhập khẩu), hoặc tối giản (chậu cây cảnh).
3. Chọn Thời Điểm Tặng: Tốt nhất là gửi trước 1-2 ngày hoặc sáng sớm ngày khai trương.

Lời Chúc Kèm Theo Hoa
- "Chúc mừng khai trương! Mong cửa hàng luôn đông khách, buôn may bán đắt!"
- "Chúc quý công ty làm ăn phát đạt, tài lộc dồi dào!"
- "Chúc mừng ngày vui! Mong sự nghiệp mới luôn thuận buồm xuôi gió!"

Lưu Ý Khi Chọn Hoa Khai Trương
- Tránh hoa có gai như hoa hồng (theo phong thủy không tốt cho kinh doanh).
- Không chọn hoa trắng (thường dùng trong tang lễ).
- Chọn hoa có hương thơm nhẹ.
- Chú ý đến sở thích của người nhận.

Bài viết được cung cấp bởi Hoa Tươi Thanh Ngọc - Tư vấn chọn hoa theo phong thủy chuyên nghiệp`,
    image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&q=80&w=800"
  }
];

const productCount = db.prepare('SELECT COUNT(*) as count FROM products').get().count;
if (productCount === 0) {
  const insertProduct = db.prepare(`
    INSERT INTO products (name, price, category, description, image, images, is_new, is_best_seller)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  seedProducts.forEach(p => {
    insertProduct.run(p.name, p.price ?? 0, p.category, p.description, p.image, '[]', p.is_new, p.is_best_seller);
  });
}

const blogCount = db.prepare('SELECT COUNT(*) as count FROM blogs').get().count;
if (blogCount === 0) {
  const insertBlog = db.prepare(`
    INSERT INTO blogs (title, slug, content, excerpt, image, author, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  seedBlogs.forEach(b => {
    insertBlog.run(b.title, b.slug, b.content, b.excerpt, b.image, b.author || 'Admin', b.created_at || new Date().toISOString());
  });
}

// Ensure upload directory exists
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}
const uploadDir = path.join(publicDir, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

async function startServer() {
  const PORT = 3000;
  console.log('Starting server in', process.env.NODE_ENV || 'development', 'mode');
  
  const app = express();
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // Request logger
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
  });

  console.log('Registering API routes...');
  // Static files for uploads
  app.use('/uploads', express.static(uploadDir));

  app.get('/api/health', (req, res) => {
    console.log('Health check requested');
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  app.get('/api/products', (req, res) => {
    console.log('GET /api/products request received');
    try {
      const products = db.prepare('SELECT * FROM products ORDER BY created_at DESC').all();
      console.log(`Fetched ${products.length} products`);
      res.json(products);
    } catch (error) {
      console.error('Fetch products error:', error);
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  });

  app.post('/api/products', (req, res) => {
    console.log('Adding product:', req.body);
    const { name, price, category, description, meaning, color, size, alt_text, image, images, is_new, is_best_seller } = req.body;
    try {
      const info = db.prepare(`
        INSERT INTO products (name, price, category, description, meaning, color, size, alt_text, image, images, is_new, is_best_seller)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(name, price ?? 0, category, description, meaning, color, size, alt_text, image, images, is_new ? 1 : 0, is_best_seller ? 1 : 0);
      console.log('Product added with ID:', info.lastInsertRowid);
      res.json({ id: info.lastInsertRowid });
    } catch (error) {
      console.error('Add product error:', error);
      res.status(500).json({ error: 'Failed to add product' });
    }
  });

  app.put('/api/products/:id', (req, res) => {
    console.log('Updating product:', req.params.id, req.body);
    const { name, price, category, description, meaning, color, size, alt_text, image, images, is_new, is_best_seller } = req.body;
    try {
      db.prepare(`
        UPDATE products 
        SET name = ?, price = ?, category = ?, description = ?, meaning = ?, color = ?, size = ?, alt_text = ?, image = ?, images = ?, is_new = ?, is_best_seller = ?
        WHERE id = ?
      `).run(name, price ?? 0, category, description, meaning, color, size, alt_text, image, images, is_new ? 1 : 0, is_best_seller ? 1 : 0, req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error('Update product error:', error);
      res.status(500).json({ error: 'Failed to update product' });
    }
  });

  app.delete('/api/products/:id', (req, res) => {
    try {
      db.prepare('DELETE FROM products WHERE id = ?').run(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete product' });
    }
  });

  // Blog Routes
  app.get('/api/blogs', (req, res) => {
    try {
      const blogs = db.prepare('SELECT * FROM blogs ORDER BY created_at DESC').all();
      res.json(blogs);
    } catch (error) {
      console.error('Fetch blogs error:', error);
      res.status(500).json({ error: 'Failed to fetch blogs' });
    }
  });

  app.get('/api/blogs/:slug', (req, res) => {
    try {
      const blog = db.prepare('SELECT * FROM blogs WHERE slug = ?').get(req.params.slug);
      if (!blog) {
        return res.status(404).json({ error: 'Blog not found' });
      }
      res.json(blog);
    } catch (error) {
      console.error('Fetch blog error:', error);
      res.status(500).json({ error: 'Failed to fetch blog' });
    }
  });

  app.post('/api/blogs', (req, res) => {
    const { title, slug, content, excerpt, image } = req.body;
    try {
      const info = db.prepare(`
        INSERT INTO blogs (title, slug, content, excerpt, image)
        VALUES (?, ?, ?, ?, ?)
      `).run(title, slug, content, excerpt, image);
      res.json({ id: info.lastInsertRowid });
    } catch (error) {
      console.error('Add blog error:', error);
      res.status(500).json({ error: 'Failed to add blog' });
    }
  });

  app.post('/api/orders', (req, res) => {
    const { customerName, phone, address, deliveryDate, paymentMethod, items, totalAmount } = req.body;
    try {
      const info = db.prepare(`
        INSERT INTO orders (customer_name, phone, address, delivery_date, payment_method, items, total_amount)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).run(customerName, phone, address, deliveryDate, paymentMethod, JSON.stringify(items), totalAmount);
      res.json({ id: info.lastInsertRowid, success: true });
    } catch (error) {
      console.error('Add order error:', error);
      res.status(500).json({ error: 'Failed to place order' });
    }
  });

  app.delete('/api/blogs/:id', (req, res) => {
    try {
      db.prepare('DELETE FROM blogs WHERE id = ?').run(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error('Delete blog error:', error);
      res.status(500).json({ error: 'Failed to delete blog' });
    }
  });

  app.put('/api/blogs/:id', (req, res) => {
    const { title, slug, content, excerpt, image, author } = req.body;
    try {
      db.prepare(`
        UPDATE blogs 
        SET title = ?, slug = ?, content = ?, excerpt = ?, image = ?, author = ?
        WHERE id = ?
      `).run(title, slug, content, excerpt, image, author || 'Admin', req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error('Update blog error:', error);
      res.status(500).json({ error: 'Failed to update blog' });
    }
  });

  // Image upload endpoint with trailing slash support and improved error handling
  app.post(['/api/upload', '/api/upload/'], (req, res) => {
    console.log('Upload request received at /api/upload');
    upload.single('image')(req, res, async (err) => {
      if (err) {
        console.error('Multer upload error:', err);
        return res.status(400).json({ 
          error: `Upload error: ${err.message}`,
          code: 'MULTER_ERROR'
        });
      }

      if (!req.file) {
        console.error('No file found in request');
        return res.status(400).json({ 
          error: 'No file uploaded',
          code: 'NO_FILE'
        });
      }

      try {
        const filePath = req.file.path;
        const fileName = path.parse(req.file.filename).name;
        const webpFileName = `optimized-${Date.now()}-${fileName}.webp`;
        const webpFilePath = path.join(uploadDir, webpFileName);

        console.log('Optimizing image with sharp:', filePath);
        // Process image with sharp: max width 1200px for hero images, convert to WebP
        await sharp(filePath)
          .resize({ width: 1200, withoutEnlargement: true })
          .webp({ quality: 80, effort: 6 }) 
          .toFile(webpFilePath);

        // Delete original file
        if (fs.existsSync(filePath)) {
          try {
            fs.unlinkSync(filePath);
            console.log('Original file deleted:', filePath);
          } catch (unlinkErr) {
            console.warn('Failed to delete original file:', unlinkErr);
          }
        }

        console.log('Image optimized successfully:', webpFileName);
        return res.json({ url: `/uploads/${webpFileName}` });
      } catch (error: any) {
        console.error('Image optimization error (falling back to original):', error);
        // Fallback: return the original uploaded file if optimization fails
        console.log('Falling back to original file:', req.file.filename);
        return res.json({ url: `/uploads/${req.file.filename}` });
      }
    });
  });

  // Settings endpoints
  app.get('/api/settings', (req, res) => {
    try {
      const settings = db.prepare('SELECT * FROM settings').all() as { key: string, value: string }[];
      const settingsMap = settings.reduce((acc, curr) => {
        acc[curr.key] = curr.value;
        return acc;
      }, {} as Record<string, string>);
      res.json(settingsMap);
    } catch (error) {
      console.error('Fetch settings error:', error);
      res.status(500).json({ error: 'Failed to fetch settings' });
    }
  });

  app.post('/api/settings', (req, res) => {
    const settings = req.body;
    try {
      const upsertSetting = db.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)');
      
      const transaction = db.transaction((settingsObj) => {
        for (const [key, value] of Object.entries(settingsObj)) {
          upsertSetting.run(key, value as string);
        }
      });

      transaction(settings);
      res.json({ success: true });
    } catch (error) {
      console.error('Update settings error:', error);
      res.status(500).json({ error: 'Failed to update settings' });
    }
  });

  // Dynamic image optimization for accessed images
  app.get('/api/img-optimize', async (req, res) => {
    const { src, w } = req.query;
    if (!src || typeof src !== 'string') return res.status(400).send('Missing src');
    
    const width = parseInt(w as string) || 600;
    
    // Only optimize local files
    if (src.startsWith('/')) {
      // Prevent directory traversal attacks and normalize path
      // Remove leading slash for path.join to work correctly with publicDir
      const normalizedPath = path.normalize(src).replace(/^(\.\.[\/\\])+/, '').replace(/^[\/\\]+/, '');
      const filePath = path.join(publicDir, normalizedPath);
      
      console.log(`Optimizing local image: ${src} -> ${filePath}`);
      
      if (fs.existsSync(filePath) && fs.lstatSync(filePath).isFile()) {
        try {
          const optimized = await sharp(filePath)
            .resize({ width, withoutEnlargement: true })
            .webp({ quality: 80 })
            .toBuffer();
          
          res.set('Content-Type', 'image/webp');
          res.set('Cache-Control', 'public, max-age=31536000, immutable');
          return res.send(optimized);
        } catch (e) {
          console.error('Dynamic optimization error:', e);
        }
      }
    }
    
    res.redirect(src);
  });

  app.post(['/api/products/bulk', '/api/products/bulk/'], upload.single('file'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
      const fileContent = fs.readFileSync(req.file.path, 'utf8');
      const records = parse(fileContent, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
        relax_column_count: true,
        bom: true
      });

      const insert = db.prepare(`
        INSERT INTO products (name, price, category, description, meaning, color, size, alt_text, image, images, is_new, is_best_seller)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      const transaction = db.transaction((products) => {
        for (const p of products) {
          if (!p.name) continue;
          insert.run(
            p.name,
            p.price ? parseInt(p.price) : 0,
            p.category || 'other',
            p.description || '',
            p.meaning || '',
            p.color || '',
            p.size || '',
            p.alt_text || '',
            p.image || '',
            p.images || '[]',
            (p.is_new === '1' || p.is_new === 'true') ? 1 : 0,
            (p.is_best_seller === '1' || p.is_best_seller === 'true') ? 1 : 0
          );
        }
      });

      transaction(records);
      fs.unlinkSync(req.file.path); // Clean up
      res.json({ success: true, count: records.length });
    } catch (error: any) {
      console.error('Bulk upload error:', error);
      res.status(500).json({ error: `Failed to process CSV file: ${error.message}` });
    }
  });

  // API 404 Handler - MUST be after all other API routes
  app.all('/api/*', (req, res) => {
    console.log(`API 404: ${req.method} ${req.url}`);
    res.status(404).json({ error: `API route ${req.method} ${req.url} not found` });
  });

  // Global error handler
  app.use((err: any, req: any, res: any, next: any) => {
    console.error('Global Server Error:', err);
    if (res.headersSent) {
      return next(err);
    }
    if (req.path.startsWith('/api')) {
      return res.status(err.status || 500).json({ 
        error: err.message || 'Internal Server Error',
        details: process.env.NODE_ENV === 'development' ? err.stack : undefined
      });
    }
    next(err);
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
