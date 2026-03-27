import requests
import os
import time

# Cấu hình
BASE_URL = "https://ais-dev-lln73vyv7yhovxupsxqyt4-33622044307.asia-southeast1.run.app"
UPLOAD_API = f"{BASE_URL}/api/upload"
PRODUCT_API = f"{BASE_URL}/api/products"
IMAGE_FOLDER = "images_to_upload"

def upload_and_sync():
    if not os.path.exists(IMAGE_FOLDER):
        print(f"❌ Thư mục '{IMAGE_FOLDER}' không tồn tại. Vui lòng tạo thư mục và bỏ ảnh vào đó.")
        return

    files = [f for f in os.listdir(IMAGE_FOLDER) if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp'))]
    
    if not files:
        print(f"⚠️ Không tìm thấy ảnh nào trong thư mục '{IMAGE_FOLDER}'.")
        return

    print(f"🚀 Bắt đầu xử lý {len(files)} ảnh...")

    for filename in files:
        filepath = os.path.join(IMAGE_FOLDER, filename)
        
        # 1. Tải ảnh lên Server để nén và lấy URL WebP
        print(f"📸 Đang tải lên & nén: {filename}...")
        try:
            with open(filepath, 'rb') as f:
                upload_res = requests.post(UPLOAD_API, files={'image': f})
                
            if upload_res.status_code != 200:
                print(f"❌ Lỗi tải ảnh {filename}: {upload_res.text}")
                continue
                
            image_url = upload_res.json().get('url')
            
            # 2. Phân tích thông tin từ tên file (nếu có dấu __) hoặc mặc định
            # Quy tắc: Ten-San-Pham__Gia__Danh-Muc.jpg
            parts = os.path.splitext(filename)[0].split('__')
            name = parts[0].replace('-', ' ')
            price = int(parts[1]) if len(parts) > 1 and parts[1].isdigit() else 500000
            category = parts[2] if len(parts) > 2 else "bo-hoa"

            # 3. Tạo sản phẩm trên Web
            product_data = {
                "name": name,
                "price": price,
                "category": category,
                "description": f"Sản phẩm {name} chất lượng cao, thiết kế thủ công tinh tế.",
                "image": image_url,
                "is_new": 1,
                "is_best_seller": 0,
                "meaning": "Mang lại niềm vui và sự an nhiên.",
                "color": "Đa dạng",
                "size": "Tiêu chuẩn",
                "images": "[]"
            }
            
            prod_res = requests.post(PRODUCT_API, json=product_data)
            if prod_res.status_code == 200:
                print(f"✅ Đã thêm sản phẩm: {name}")
            else:
                print(f"❌ Lỗi tạo sản phẩm {name}: {prod_res.text}")
                
            # Nghỉ một chút để tránh quá tải server
            time.sleep(0.5)

        except Exception as e:
            print(f"🔥 Lỗi hệ thống với file {filename}: {str(e)}")

    print("\n✨ Hoàn tất quá trình đồng bộ ảnh thật!")

if __name__ == "__main__":
    upload_and_sync()
