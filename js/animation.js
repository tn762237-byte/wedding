/* =====================================================
   WEDDING INVITATION — animation.js
   Vai trò: khởi tạo và điều khiển toàn bộ hiệu ứng chuyển động
   - AOS (Animate On Scroll)
   - Typing effect (Hero subtitle)
   - Floating petals / flowers
   - Parallax nhẹ cho Hero background
   - Hook xử lý khi overlay mở thiệp được đóng lại

   Public API: window.WeddingAnimation.init(data)
                window.WeddingAnimation.onInvitationOpened()

   Tất cả hiệu ứng đều tôn trọng `prefers-reduced-motion`:
   nếu người dùng bật cài đặt giảm chuyển động, các hiệu ứng
   nặng (petals, parallax, typing) sẽ được bỏ qua hoặc rút gọn.
   ===================================================== */

(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* -----------------------------------------------------
     1. AOS INIT
     ----------------------------------------------------- */
  function initAOS() {
    if (!window.AOS) return;

    window.AOS.init({
      duration: 900,
      easing: "ease-in-out",
      once: true,
      offset: 60,
      disable: prefersReducedMotion ? true : false,
    });
  }

  /* -----------------------------------------------------
     2. TYPING EFFECT (Hero subtitle)
     ----------------------------------------------------- */
  function typeText(el, text, speed) {
    if (!el || !text) return;

    if (prefersReducedMotion) {
      el.textContent = text;
      return;
    }

    let index = 0;
    el.textContent = "";
    el.classList.add("is-typing");

    function step() {
      if (index <= text.length) {
        el.textContent = text.slice(0, index);
        index += 1;
        setTimeout(step, speed);
      } else {
        el.classList.remove("is-typing");
      }
    }

    step();
  }

  function initTyping(data) {
    const el = document.getElementById("hero-typing");
    const text = data && data.couple && data.couple.heroSubtitle;
    // Delay nhẹ để đồng bộ với AOS fade-down của chính element này (data-aos-delay="200")
    setTimeout(() => typeText(el, text || "We are getting married", 70), 350);
  }

  /* -----------------------------------------------------
     3. FLOATING PETALS / FLOWERS
     ----------------------------------------------------- */
  function createPetal(container) {
    const petal = document.createElement("span");
    petal.className = "petal";

    const left = Math.random() * 100; // vị trí ngang (%)
    const size = 8 + Math.random() * 10; // 8px - 18px
    const duration = 8 + Math.random() * 8; // 8s - 16s
    const delay = Math.random() * -16; // bắt đầu ở giữa chu kỳ để tránh rơi đồng loạt
    const opacity = 0.5 + Math.random() * 0.4;
    const hue = Math.random() > 0.5; // luân phiên màu gold-light / sage nhạt

    petal.style.left = `${left}%`;
    petal.style.width = `${size}px`;
    petal.style.height = `${size}px`;
    petal.style.animationDuration = `${duration}s`;
    petal.style.animationDelay = `${delay}s`;
    petal.style.opacity = String(opacity);
    if (hue) {
      petal.style.backgroundColor = "var(--color-sage)";
    }

    container.appendChild(petal);
  }

  function initPetals(containerId, count) {
    const container = document.getElementById(containerId);
    if (!container || prefersReducedMotion) return;

    // Xoá petal cũ nếu có (tránh trùng khi init lại)
    container.innerHTML = "";

    for (let i = 0; i < count; i += 1) {
      createPetal(container);
    }
  }

  /* -----------------------------------------------------
     4. PARALLAX NHẸ CHO HERO BACKGROUND
     -----------------------------------------------------
     Dùng transform (thay vì background-position) để tận dụng
     GPU compositing, mượt hơn trên mobile. Chỉ áp dụng khi
     người dùng không bật prefers-reduced-motion.
     ----------------------------------------------------- */
  function initParallax() {
    const heroBg = document.getElementById("hero-bg");
    if (!heroBg || prefersReducedMotion) return;

    // Nếu breakpoint desktop đã dùng background-attachment: fixed (CSS),
    // JS parallax transform vẫn có thể chồng nhẹ nhàng trên mobile/tablet
    // nơi background-attachment: fixed không được hỗ trợ tốt (iOS Safari).
    let ticking = false;

    function updateParallax() {
      const scrollY = window.scrollY;
      const heroHeight = heroBg.parentElement ? heroBg.parentElement.offsetHeight : window.innerHeight;

      if (scrollY <= heroHeight) {
        const offset = scrollY * 0.35;
        heroBg.style.transform = `translate3d(0, ${offset}px, 0) scale(1.08)`;
      }
      ticking = false;
    }

    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });
  }

  /* -----------------------------------------------------
     5. OPENING OVERLAY HOOK
     -----------------------------------------------------
     Được gọi từ main.js ngay sau khi người dùng bấm
     "Mở Thiệp Mời". Nhiệm vụ ở đây thuần về animation:
     kích hoạt fade-in cho Hero (đề phòng AOS chưa refresh kịp)
     và dừng hẳn petal layer của overlay mở thiệp (đã ẩn theo CSS
     nhưng dọn DOM để tối ưu bộ nhớ).
     ----------------------------------------------------- */
  function onInvitationOpened() {
    // Refresh lại AOS để các section phía dưới (vốn có thể đã nằm
    // trong viewport ngay từ đầu do overlay che khuất) được kích hoạt đúng
    if (window.AOS) {
      window.AOS.refreshHard();
    }

    // Dọn petal layer của overlay mở thiệp sau khi overlay đã ẩn hẳn
    setTimeout(() => {
      const openingPetals = document.getElementById("opening-petals");
      if (openingPetals) openingPetals.innerHTML = "";
    }, 1000);
  }

  /* -----------------------------------------------------
     6. INIT TỔNG
     ----------------------------------------------------- */
  function init(data) {
    initAOS();
    initTyping(data);
    initPetals("opening-petals", 14);
    initPetals("petals-layer", 10);
    initParallax();
  }

  window.WeddingAnimation = { init, onInvitationOpened };

})();
