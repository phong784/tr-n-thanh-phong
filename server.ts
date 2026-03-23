import express from 'express';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Dữ liệu mẫu để web luôn có nội dung khi chạy trên Vercel
const seedProducts = [
  {
    id: 1,
    name: "Bó hoa hồng đỏ Đà Lạt tình yêu vĩnh cửu",
    price: 550000,
    category: "bo-hoa",
    description: "Bó hoa hồng đỏ Đà Lạt tươi thắm...",
    image: "https://images.unsplash.com/photo-1548622350-dd949d9dabe2?auto=format&fit=crop&q=80&w=800",
    is_new: 1,
    is_best_seller: 1
  },
  {
    id: 2,
    name: "Giỏ hoa hướng dương rực rỡ nắng mai",
    price: 450000,
    category: "gio-hoa",
    description: "Giỏ hoa hướng dương kết hợp cùng hoa baby trắng...",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=800",
    is_new: 1,
    is_best_seller: 0
  }
];

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', api_key_status: process.env.GEMINI_API_KEY ? "Connected" : "Missing" });
});

app.get('/api/products', (req, res) => {
  res.json(seedProducts);
});

// Phục vụ giao diện người dùng
const __dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;