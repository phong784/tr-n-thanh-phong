import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Dữ liệu mẫu (Seed Data)
const seedProducts = [
  {
    id: 1,
    name: "Bó hoa hồng đỏ Đà Lạt",
    price: 550000,
    category: "bo-hoa",
    image: "https://images.unsplash.com/photo-1548622350-dd949d9dabe2?w=800",
    is_new: 1,
    is_best_seller: 1
  }
];

// API Routes
app.get('/api/products', (req, res) => res.json(seedProducts));
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// PHỤC VỤ GIAO DIỆN (Đây là phần sửa lỗi trắng trang)
// Vercel sẽ tìm file index.html ngay tại thư mục gốc của bạn
app.use(express.static(__dirname)); 

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;