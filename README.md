# 💍 Wedding Invitation Website

Website thiệp cưới online — Luxury / Minimal / Elegant.
100% Frontend tĩnh (HTML5 + CSS3 + JavaScript ES6), không cần server, không cần backend, deploy trực tiếp lên **GitHub Pages**.

---

## 📁 Cấu trúc thư mục

```
wedding/
│── index.html
│
├── css/
│     style.css          # Style nền tảng (mobile-first)
│     responsive.css     # Override theo breakpoint (tablet/desktop)
│
├── js/
│     config.js          # ⭐ TOÀN BỘ NỘI DUNG WEBSITE NẰM Ở ĐÂY
│     main.js            # Render dữ liệu + xử lý tương tác
│     countdown.js       # Logic đếm ngược
│     animation.js       # AOS, typing, petals, parallax
│
├── assets/
│     images/            # Ảnh hero, timeline, album
│     icons/             # favicon, SVG
│     music/             # Nhạc nền (mp3)
│     qr/                # Ảnh QR chuyển khoản
│
└── README.md
```

> ⭐ **Nguyên tắc quan trọng nhất:** Bạn **chỉ cần sửa file `js/config.js`** để thay đổi gần như toàn bộ nội dung trên website — tên cô dâu chú rể, ngày cưới, timeline, album, thông tin nhà trai/nhà gái, bản đồ, QR, nhạc, guestbook, social links. Không cần đụng vào HTML/CSS/JS khác.

---

## 🖼️ 1. Đổi ảnh

| Vị trí | Đường dẫn file | Ghi chú |
|---|---|---|
| Ảnh nền Hero | `assets/images/hero-bg.jpg` | Nên dùng ảnh ngang, tối thiểu 1600×1000px, dung lượng < 500KB |
| Ảnh nền Opening Overlay | `assets/images/hero-bg.jpg` | Dùng chung ảnh Hero (khai báo trong `css/style.css` mục `.opening-overlay`, có thể đổi sang ảnh khác nếu muốn) |
| Ảnh Timeline (Love Story) | `assets/images/timeline-01.jpg` → `timeline-04.jpg` | Khai báo & đổi tên file trong `config.js` → mảng `timeline` |
| Ảnh Album | `assets/images/gallery-XX-thumb.jpg` (ảnh nhỏ) và `gallery-XX.jpg` (ảnh gốc) | Khai báo trong `config.js` → mảng `gallery`. Nên nén ảnh thumb (~800px) để tải nhanh, ảnh full giữ chất lượng cao hơn cho lightbox |

**Cách thêm/xoá ảnh album:** mở `js/config.js`, tìm mục `gallery: [...]`, thêm hoặc xoá object dạng:
```js
{ thumb: "assets/images/gallery-09-thumb.jpg", full: "assets/images/gallery-09.jpg", alt: "Mô tả ảnh" }
```
Số lượng ảnh không giới hạn — `main.js` sẽ tự render toàn bộ mảng.

---

## 🎵 2. Đổi nhạc nền

1. Đặt file nhạc (định dạng `.mp3`) vào `assets/music/`.
2. Mở `js/config.js`, tìm mục `music`, sửa:
```js
music: {
  src: "assets/music/ten-file-nhac-cua-ban.mp3",
  title: "Tên bài hát",
  autoplayAfterOpen: true, // true = tự phát nhạc ngay khi bấm "Mở Thiệp Mời"
},
```
> Lưu ý: Hầu hết trình duyệt hiện đại chặn autoplay có âm thanh nếu chưa có tương tác từ người dùng. Vì vậy nhạc chỉ thực sự phát sau khi khách bấm nút **"Mở Thiệp Mời"** — đây là hành vi mong muốn, không phải lỗi.

---

## 🎨 3. Đổi màu sắc

Toàn bộ màu sắc được khai báo tập trung tại đầu file `css/style.css`, trong khối `:root`:

```css
:root {
  --color-cream: #FDF8F3;
  --color-white: #FFFFFF;
  --color-gold: #C9A66B;
  --color-gold-light: #E8D9BE;
  --color-gold-dark: #A6813E;
  --color-sage: #A8B5A0;
  --color-sage-dark: #7C8B74;
  --color-text-dark: #3A362F;
  --color-text-light: #7D7565;
}
```

Chỉ cần đổi mã màu (hex) tương ứng — toàn bộ website (button, border, icon, background...) sẽ tự động cập nhật theo vì mọi component đều tham chiếu tới các biến này.

---

## 🔤 4. Đổi font chữ

Font hiện tại: **Cormorant Garamond** (tên cô dâu chú rể), **Playfair Display** (tiêu đề section), **Poppins** (nội dung/form).

**Bước 1:** Vào [Google Fonts](https://fonts.google.com), chọn font mới, nhớ chọn **subset Vietnamese** để hiển thị đúng dấu tiếng Việt.

**Bước 2:** Thay link Google Fonts trong `index.html` (trong thẻ `<head>`):
```html
<link href="https://fonts.googleapis.com/css2?family=TenFontMoi&subset=vietnamese&display=swap" rel="stylesheet">
```

**Bước 3:** Cập nhật tên font trong `css/style.css`:
```css
:root {
  --font-display: 'Ten Font Moi', serif;
  --font-heading: 'Ten Font Moi 2', serif;
  --font-body: 'Ten Font Moi 3', sans-serif;
}
```

---

## 💕 5. Đổi Love Story Timeline

Mở `js/config.js`, tìm mảng `timeline`, sửa/thêm/xoá từng mốc:
```js
timeline: [
  {
    image: "assets/images/timeline-01.jpg",
    title: "First Meet",
    description: "Nội dung mô tả...",
  },
  // Thêm mốc mới tại đây, VD: "Engagement", "Honeymoon"...
]
```
Số lượng mốc không giới hạn, website sẽ tự chia layout zig-zag (trái/phải) trên desktop và xếp dọc trên mobile.

---

## 📸 6. Đổi Album ảnh

Xem mục **1. Đổi ảnh** phía trên — chỉnh trong mảng `gallery` của `config.js`.

Nếu muốn hiển thị dạng **slider** thay vì lưới ảnh (grid), thêm class `wedding-swiper` bao quanh container trong `index.html` — `main.js` đã có sẵn logic tự động khởi tạo Swiper nếu phát hiện phần tử này.

---

## 🗺️ 7. Đổi Google Maps

**Bước 1 — Lấy mã nhúng (Embed):**
1. Mở [Google Maps](https://maps.google.com), tìm địa điểm tổ chức tiệc cưới.
2. Bấm **Chia sẻ** → **Nhúng bản đồ** → **Sao chép HTML**.
3. Trong đoạn mã đó, chỉ lấy phần giá trị `src="..."` của thẻ `<iframe>`.

**Bước 2 — Lấy link chỉ đường:**
- Cách 1: Bấm **Chia sẻ** → **Sao chép liên kết**.
- Cách 2 (khuyên dùng, mở thẳng app chỉ đường): dùng định dạng
  `https://www.google.com/maps/dir/?api=1&destination=VĨ_ĐỘ,KINH_ĐỘ`
  (lấy vĩ độ/kinh độ bằng cách chuột phải vào đúng điểm trên Google Maps).

**Bước 3 — Cập nhật `config.js`:**
```js
map: {
  embedSrc: "https://www.google.com/maps/embed?pb=...",
  directionUrl: "https://www.google.com/maps/dir/?api=1&destination=10.762622,106.660172",
},
```

---

## 💳 8. Đổi QR chuyển khoản (Gift)

1. Tạo ảnh QR chuyển khoản (từ app ngân hàng, hoặc dùng [VietQR](https://vietqr.io)).
2. Đặt ảnh vào `assets/qr/` (VD: `qr-bride.jpg`, `qr-groom.jpg`).
3. Cập nhật `config.js` → mảng `bankAccounts`:
```js
bankAccounts: [
  {
    owner: "bride",
    ownerLabel: "Cô Dâu — Tên",
    qr: "assets/qr/qr-bride.jpg",
    bankName: "Tên ngân hàng - Chi nhánh",
    accountName: "TEN CHU TAI KHOAN",
    accountNumber: "0123456789",
  },
  // Thêm object tương tự cho "groom"
]
```
Có thể thêm nhiều hơn 2 tài khoản (VD: thêm tài khoản bố mẹ) — chỉ cần thêm object mới vào mảng.

---

## 📅 9. Đổi ngày cưới

Mở `js/config.js`, mục `schedule`:
```js
schedule: {
  weddingDate: "2026-12-12T09:00:00", // Dùng cho Countdown — định dạng YYYY-MM-DDTHH:mm:ss
  displayDate: "12 . 12 . 2026",       // Chuỗi hiển thị ở Hero/Opening/Footer
  ...
}
```
> Lưu ý: `weddingDate` phải đúng định dạng ISO (`YYYY-MM-DDTHH:mm:ss`) để Countdown hoạt động chính xác. `displayDate` chỉ là chuỗi hiển thị, có thể tuỳ chỉnh tự do (VD: "Thứ Bảy, 12 Tháng 12, 2026").

Đồng thời cập nhật giờ giấc chi tiết của nhà trai/nhà gái/tiệc cưới trong cùng mục `schedule`.

---

## 🚀 10. Deploy lên GitHub Pages

**Cách 1 — Deploy nhanh qua giao diện web:**
1. Tạo repository mới trên GitHub (VD: `wedding-invitation`).
2. Upload toàn bộ nội dung thư mục `wedding/` vào repository (kéo-thả hoặc **Add file → Upload files**).
3. Vào **Settings → Pages**.
4. Ở mục **Branch**, chọn `main` (hoặc `master`) và thư mục `/ (root)` → **Save**.
5. Đợi 1–2 phút, GitHub sẽ cấp link dạng:
   `https://ten-user-cua-ban.github.io/wedding-invitation/`

**Cách 2 — Deploy qua Git CLI:**
```bash
cd wedding
git init
git add .
git commit -m "Initial wedding invitation website"
git branch -M main
git remote add origin https://github.com/ten-user/wedding-invitation.git
git push -u origin main
```
Sau đó bật GitHub Pages như hướng dẫn ở Cách 1, bước 3–4.

> 💡 Mẹo: Nếu muốn dùng tên miền riêng (VD: `khang-truc-wedding.com`), thêm file `CNAME` (không có phần mở rộng) chứa tên miền vào thư mục gốc, và trỏ DNS domain đó về GitHub Pages theo [hướng dẫn chính thức của GitHub](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site).

---

## 📋 11. Kết nối RSVP với Google Forms

Cách đơn giản nhất nếu không cần giao diện form tuỳ chỉnh:

1. Tạo một Google Form với các câu hỏi tương ứng (Họ tên, SĐT, Số khách, Tham dự, Lời nhắn).
2. Lấy link Form, có thể **nhúng trực tiếp** vào section RSVP bằng iframe (thay thế form HTML hiện tại), hoặc đơn giản là thêm nút "Điền Google Form" dẫn link ra ngoài.
3. Cách nhúng: vào Google Form → **Gửi** → chọn biểu tượng `<>` → copy đoạn mã `<iframe>` → dán thay vào vị trí `<form id="rsvp-form">...</form>` trong `index.html`.

> Cách này đơn giản nhưng giao diện form sẽ mang phong cách mặc định của Google, không đồng bộ hoàn toàn với thiết kế luxury của website.

---

## 📊 12. Kết nối RSVP với Google Sheets qua Google Apps Script (khuyên dùng)

Cách này giữ nguyên giao diện form đẹp hiện có, đồng thời lưu dữ liệu RSVP trực tiếp vào Google Sheets.

**Bước 1 — Tạo Google Sheet:**
1. Tạo một Google Sheet mới, đặt tên cột dòng đầu tiên: `Timestamp | Name | Phone | Guests | Attendance | Message`.

**Bước 2 — Tạo Apps Script:**
1. Trong Google Sheet, vào **Tiện ích mở rộng (Extensions) → Apps Script**.
2. Xoá code mặc định, dán đoạn code sau:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    data.submittedAt || new Date().toISOString(),
    data.name || "",
    data.phone || "",
    data.guests || "",
    data.attendance || "",
    data.message || "",
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ status: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Bấm **Deploy → New deployment**.
4. Chọn loại **Web app**.
5. Cấu hình:
   - **Execute as:** Me
   - **Who has access:** Anyone
6. Bấm **Deploy**, copy **Web app URL** được cấp (dạng `https://script.google.com/macros/s/XXXXXXXX/exec`).

**Bước 3 — Kết nối vào website:**
Mở `js/config.js`, mục `rsvp`, dán URL vừa copy vào:
```js
rsvp: {
  endpoint: "https://script.google.com/macros/s/XXXXXXXXXXXXXXXX/exec",
},
```

Vậy là xong — mỗi khi khách gửi form RSVP trên website, dữ liệu sẽ tự động được thêm vào Google Sheet của bạn theo thời gian thực.

> ⚠️ Lưu ý kỹ thuật: Do giới hạn CORS của Google Apps Script, request được gửi ở chế độ `no-cors`, nghĩa là trình duyệt sẽ **không đọc được phản hồi** trả về (nhưng dữ liệu vẫn được ghi vào Sheet bình thường). Website xử lý việc này bằng cách hiển thị thông báo "Cảm ơn bạn đã xác nhận" ngay sau khi gửi thành công về mặt network, không chờ phản hồi nội dung.

---

## ⚙️ 13. Các thông tin khác có thể chỉnh trong `config.js`

| Mục | Ý nghĩa |
|---|---|
| `couple` | Tên cô dâu/chú rể, câu subtitle hiệu ứng typing ở Hero |
| `schedule.groomFamily` / `brideFamily` | Tên phụ huynh, địa chỉ, giờ lễ của hai gia đình |
| `schedule.reception` | Địa điểm & giờ tiệc cưới |
| `guestbook` | Danh sách lời chúc demo (UI only, chưa có backend lưu trữ thật) |
| `social` | Link mạng xã hội hiển thị ở Footer (icon dùng class Font Awesome) |

---

## 🛠️ Công nghệ & thư viện sử dụng

- HTML5 / CSS3 / JavaScript ES6 (thuần, không framework)
- [Bootstrap 5](https://getbootstrap.com) — hệ grid & utility class
- [AOS](https://michalsnik.github.io/aos/) — hiệu ứng Animate On Scroll
- [GLightbox](https://biati-digital.github.io/glightbox/) — lightbox cho album ảnh
- [SwiperJS](https://swiperjs.com) — slider (dự phòng, tuỳ chọn)
- [Font Awesome](https://fontawesome.com) — icon
- [Google Fonts](https://fonts.google.com) — Cormorant Garamond, Playfair Display, Poppins

Tất cả được load qua CDN, không cần cài đặt (`npm install`) hay build tool.

---

## ✅ Checklist trước khi gửi thiệp cho khách

- [ ] Đã thay ảnh Hero, Timeline, Album bằng ảnh thật
- [ ] Đã cập nhật tên, ngày cưới, giờ giấc chính xác trong `config.js`
- [ ] Đã đổi mã nhúng Google Maps đúng địa điểm tiệc cưới
- [ ] Đã thay QR chuyển khoản đúng thông tin tài khoản
- [ ] Đã test website trên điện thoại thật (không chỉ trên máy tính)
- [ ] Đã test form RSVP (kiểm tra dữ liệu có vào Google Sheet không, nếu có kết nối)
- [ ] Đã deploy lên GitHub Pages và test link công khai trước khi gửi

---

Made with 🤍 — Chúc bạn có một website thiệp cưới thật đẹp và một đám cưới thật hạnh phúc!
