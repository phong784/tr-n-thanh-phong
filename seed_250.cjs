const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new Database(dbPath);

const CATEGORIES = ['bo-hoa', 'hoa-khai-truong', 'gio-hoa', 'hoa-chia-buon', 'hoa-cuoi'];
const FLOWER_TYPES = ["Hoa Hồng", "Hoa Lan Hồ Điệp", "Hoa Cúc mẫu đơn", "Hoa Ly", "Hoa Hướng Dương", "Hoa Cẩm Chướng", "Hoa Tú Cầu", "Hoa Baby Hà Lan"];
const STYLES = ["Bó hoa", "Giỏ hoa", "Lẵng hoa", "Kệ hoa", "Hộp hoa"];
const ADJECTIVES = ["Rực Rỡ", "Tinh Khôi", "Sang Trọng", "Quý Phái", "Dịu Dàng", "Nồng Nàn", "Thanh Khiết", "Ấm Áp", "Kiêu Sa"];

const image_ids = [
    "1582794543139-8ac9cb0f7b11", "1519378018457-4c29a3a2ecdf", "1526047932273-341f2a7631f9",
    "1516589174184-c685266e430c", "1511795409834-ef04bbd61622", "1523694576729-dc99e9c0f9b4",
    "1548622350-dd949d9dabe2", "1490750967868-88aa4486c946", "1567606117948-c2a532593250",
    "1530103862676-de8c9debad1d", "1519378304606-27b43f50229f", "1523348837708-15d4a09cfac2"
];

function generateProducts(count = 250) {
    const products = [];
    for (let i = 0; i < count; i++) {
        const flower = FLOWER_TYPES[Math.floor(Math.random() * FLOWER_TYPES.length)];
        const style = STYLES[Math.floor(Math.random() * STYLES.length)];
        const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
        
        const name = `${style} ${flower} ${adj} TN-${i + 100}`;
        const price = (Math.floor(Math.random() * (3500 - 250 + 1)) + 250) * 1000;
        let category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
        
        if (style.includes("Kệ")) category = "hoa-khai-truong";
        else if (style.includes("Giỏ")) category = "gio-hoa";
        
        const description = `Mẫu ${name} được thiết kế bởi các nghệ nhân tại Thanh Ngọc. Sử dụng hoa tươi nhập khẩu kết hợp hoa nội địa chất lượng cao, mang lại vẻ đẹp hoàn hảo cho không gian của bạn.`;
        const img_id = image_ids[Math.floor(Math.random() * image_ids.length)];
        const image_url = `https://images.unsplash.com/photo-${img_id}?auto=format&fit=crop&q=80&w=800`;
        
        products.push({
            name,
            price,
            category,
            description,
            image: image_url,
            is_new: Math.random() > 0.5 ? 1 : 0,
            is_best_seller: Math.random() > 0.5 ? 1 : 0,
            meaning: `Tượng trưng cho sự ${adj.toLowerCase()} và lòng chân thành.`,
            color: ["Đỏ", "Vàng", "Trắng", "Hồng", "Tím", "Xanh", "Cam"][Math.floor(Math.random() * 7)],
            size: ["Tiêu chuẩn", "Vừa", "Lớn", "Đặc biệt"][Math.floor(Math.random() * 4)],
            alt_text: name,
            images: '[]'
        });
    }
    return products;
}

const insert = db.prepare(`
    INSERT INTO products (name, price, category, description, meaning, color, size, alt_text, image, images, is_new, is_best_seller)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const transaction = db.transaction((products) => {
    for (const p of products) {
        insert.run(
            p.name,
            p.price,
            p.category,
            p.description,
            p.meaning,
            p.color,
            p.size,
            p.alt_text,
            p.image,
            p.images,
            p.is_new,
            p.is_best_seller
        );
    }
});

console.log('Đang xóa dữ liệu cũ...');
db.prepare('DELETE FROM products').run();

console.log('Đang khởi tạo 250 sản phẩm mới...');
const products = generateProducts(250);
transaction(products);

console.log('Hoàn thành! Đã thêm 250 sản phẩm vào database.');
db.close();
