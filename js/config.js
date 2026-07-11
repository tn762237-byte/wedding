/* =====================================================
   WEDDING INVITATION — config.js
   ĐÂY LÀ FILE DUY NHẤT BẠN CẦN CHỈNH SỬA
   để thay đổi toàn bộ nội dung của website.

   TUYỆT ĐỐI KHÔNG hard-code dữ liệu ở bất kỳ file JS/HTML nào khác.
   Mọi section trên trang đều đọc dữ liệu từ object `weddingData` này
   thông qua js/main.js.

   Hướng dẫn chỉnh sửa chi tiết từng phần: xem README.md
   ===================================================== */

const weddingData = {

  /* ---------------------------------------------------
     1. THÔNG TIN CẶP ĐÔI
     --------------------------------------------------- */
  couple: {
    groomName: "Minh Khang",          // Tên chú rể (hiển thị ngắn gọn)
    brideName: "Thanh Trúc",          // Tên cô dâu (hiển thị ngắn gọn)
    groomFullName: "Nguyễn Minh Khang",
    brideFullName: "Trần Thanh Trúc",
    heroSubtitle: "We are getting married", // Câu hiển thị hiệu ứng typing ở Hero
  },

  /* ---------------------------------------------------
     2. LỊCH TRÌNH / SCHEDULE
     - weddingDate: dùng cho Countdown. Định dạng: "YYYY-MM-DDTHH:mm:ss"
     - displayDate: chuỗi hiển thị ngày cưới ở Hero / Opening / Footer
     --------------------------------------------------- */
  schedule: {
    weddingDate: "2026-12-12T09:00:00", // Ngày giờ tổ chức chính -> Countdown đếm tới mốc này
    displayDate: "12 . 12 . 2026",

    groomFamily: {
      parentsName: "Ông Nguyễn Văn A & Bà Lê Thị B",
      address: "123 Đường Hoa Lan, Quận 3, TP. Hồ Chí Minh",
      time: "Lễ đón dâu: 08:00, Thứ Bảy, 12/12/2026",
    },

    brideFamily: {
      parentsName: "Ông Trần Văn C & Bà Phạm Thị D",
      address: "456 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh",
      time: "Lễ vu quy: 07:00, Thứ Bảy, 12/12/2026",
    },

    reception: {
      place: "Trung tâm Hội nghị Tiệc cưới Adora, 431 Hoàng Văn Thụ, Q. Tân Bình, TP.HCM",
      time: "Tiệc chính thức: 18:00, Thứ Bảy, 12/12/2026",
    },
  },

  /* ---------------------------------------------------
     3. LOVE STORY TIMELINE
     - Mỗi phần tử: image, title, description
     - Thêm/bớt phần tử tùy ý, main.js sẽ tự render toàn bộ mảng
     --------------------------------------------------- */
  timeline: [
    {
      image: "assets/images/timeline-01.jpg",
      title: "First Meet",
      description: "Chúng tôi gặp nhau lần đầu tại một quán cà phê nhỏ vào một buổi chiều mùa thu năm 2020, khởi đầu cho một hành trình dài phía trước.",
    },
    {
      image: "assets/images/timeline-02.jpg",
      title: "Dating",
      description: "Những buổi hẹn hò đầu tiên, những chuyến đi cùng nhau và vô vàn kỷ niệm đẹp đã giúp chúng tôi hiểu và gắn bó với nhau hơn mỗi ngày.",
    },
    {
      image: "assets/images/timeline-03.jpg",
      title: "Proposal",
      description: "Lời cầu hôn bất ngờ dưới ánh hoàng hôn đã đánh dấu một cột mốc không thể nào quên trong hành trình tình yêu của chúng tôi.",
    },
    {
      image: "assets/images/timeline-04.jpg",
      title: "Wedding",
      description: "Và giờ đây, chúng tôi chuẩn bị bước vào một chương mới của cuộc đời — chính thức trở thành vợ chồng, cùng nhau xây dựng mái ấm hạnh phúc.",
    },
  ],

  /* ---------------------------------------------------
     4. ALBUM / GALLERY
     - Mỗi phần tử: thumb (ảnh nhỏ hiển thị lưới), full (ảnh gốc mở lightbox), alt
     --------------------------------------------------- */
  gallery: [
    { thumb: "assets/images/gallery-01-thumb.jpg", full: "assets/images/gallery-01.jpg", alt: "Ảnh cưới 1" },
    { thumb: "assets/images/gallery-02-thumb.jpg", full: "assets/images/gallery-02.jpg", alt: "Ảnh cưới 2" },
    { thumb: "assets/images/gallery-03-thumb.jpg", full: "assets/images/gallery-03.jpg", alt: "Ảnh cưới 3" },
    { thumb: "assets/images/gallery-04-thumb.jpg", full: "assets/images/gallery-04.jpg", alt: "Ảnh cưới 4" },
    { thumb: "assets/images/gallery-05-thumb.jpg", full: "assets/images/gallery-05.jpg", alt: "Ảnh cưới 5" },
    { thumb: "assets/images/gallery-06-thumb.jpg", full: "assets/images/gallery-06.jpg", alt: "Ảnh cưới 6" },
    { thumb: "assets/images/gallery-07-thumb.jpg", full: "assets/images/gallery-07.jpg", alt: "Ảnh cưới 7" },
    { thumb: "assets/images/gallery-08-thumb.jpg", full: "assets/images/gallery-08.jpg", alt: "Ảnh cưới 8" },
  ],

  /* ---------------------------------------------------
     5. GOOGLE MAPS
     - embedSrc: lấy từ Google Maps > Chia sẻ > Nhúng bản đồ > copy thuộc tính src trong iframe
     - directionUrl: link "Chỉ đường" (Google Maps > Chia sẻ > Sao chép đường liên kết,
       hoặc dùng dạng https://www.google.com/maps/dir/?api=1&destination=LAT,LNG)
     --------------------------------------------------- */
  map: {
    embedSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.395!2d106.660172!3d10.762622!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDQ1JzQ1LjQiTiAxMDbCsDM5JzM2LjYiRQ!5e0!3m2!1svi!2s!4v1700000000000",
    directionUrl: "https://www.google.com/maps/dir/?api=1&destination=10.762622,106.660172",
  },

  /* ---------------------------------------------------
     6. GIFT / MỪNG CƯỚI — QR CHUYỂN KHOẢN
     - qr: đường dẫn ảnh QR trong assets/qr/
     --------------------------------------------------- */
  bankAccounts: [
    {
      owner: "bride",
      ownerLabel: "Cô Dâu — Thanh Trúc",
      qr: "assets/qr/qr-bride.jpg",
      bankName: "Vietcombank - CN TP.HCM",
      accountName: "TRAN THANH TRUC",
      accountNumber: "0123456789",
    },
    {
      owner: "groom",
      ownerLabel: "Chú Rể — Minh Khang",
      qr: "assets/qr/qr-groom.jpg",
      bankName: "Techcombank - CN TP.HCM",
      accountName: "NGUYEN MINH KHANG",
      accountNumber: "9876543210",
    },
  ],

  /* ---------------------------------------------------
     7. NHẠC NỀN
     --------------------------------------------------- */
  music: {
    src: "assets/music/wedding-theme.mp3",
    title: "Our Wedding Song",
    autoplayAfterOpen: true, // true = tự bật nhạc ngay sau khi bấm "Mở Thiệp Mời"
  },

  /* ---------------------------------------------------
     8. RSVP — CẤU HÌNH KẾT NỐI GOOGLE FORMS / APPS SCRIPT
     - endpoint: URL Web App sau khi deploy Google Apps Script (xem README.md)
     - Nếu để trống (""), form sẽ chỉ hiển thị thông báo xác nhận cục bộ (demo mode),
       KHÔNG gửi dữ liệu đi đâu cả.
     --------------------------------------------------- */
  rsvp: {
    endpoint: "", // VD: "https://script.google.com/macros/s/XXXXXXXXXXXXXXXX/exec"
  },

  /* ---------------------------------------------------
     9. GUESTBOOK — DỮ LIỆU DEMO (UI ONLY, CHƯA LƯU TRỮ THẬT)
     --------------------------------------------------- */
  guestbook: [
    {
      name: "Gia Hân",
      message: "Chúc mừng hạnh phúc hai bạn! Chúc cho tình yêu của Khang và Trúc luôn nồng nàn như ngày đầu.",
    },
    {
      name: "Quốc Bảo",
      message: "Chúc hai bạn trăm năm hạnh phúc, sớm có tin vui nhé!",
    },
    {
      name: "Ngọc Anh",
      message: "Đám cưới đẹp quá, chúc anh chị luôn yêu thương và trân trọng nhau như bây giờ.",
    },
  ],

  /* ---------------------------------------------------
     10. SOCIAL LINKS (Footer)
     - icon: class Font Awesome
     --------------------------------------------------- */
  social: [
    { icon: "fa-brands fa-facebook-f", url: "https://facebook.com/", label: "Facebook" },
    { icon: "fa-brands fa-instagram", url: "https://instagram.com/", label: "Instagram" },
    { icon: "fa-solid fa-envelope", url: "mailto:wedding@example.com", label: "Email" },
  ],

};

/* -----------------------------------------------------
   EXPORT (dùng biến toàn cục window để các file JS khác
   trong thẻ <script> thuần có thể truy cập trực tiếp
   qua biến `weddingData`, không cần module bundler)
   ----------------------------------------------------- */
window.weddingData = weddingData;
