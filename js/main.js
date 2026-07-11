/* =====================================================
   WEDDING INVITATION — main.js
   Vai trò:
   - Đọc dữ liệu từ `weddingData` (config.js)
   - Render toàn bộ nội dung động vào DOM
   - Xử lý sự kiện: mở thiệp, toggle nhạc, copy STK,
     submit RSVP, khởi tạo GLightbox/Swiper
   - Gọi các hàm tiện ích được cung cấp bởi countdown.js
     (window.WeddingCountdown) và animation.js (window.WeddingAnimation)

   Thứ tự load (xem index.html):
   config.js -> countdown.js -> animation.js -> main.js
   ===================================================== */

(function () {
  "use strict";

  /* -----------------------------------------------------
     0. HELPERS
     ----------------------------------------------------- */
  const $ = (selector, scope) => (scope || document).querySelector(selector);
  const $all = (selector, scope) => Array.from((scope || document).querySelectorAll(selector));

  function setText(id, value) {
    const el = document.getElementById(id);
    if (el && value !== undefined && value !== null) {
      el.textContent = value;
    }
  }

  /* -----------------------------------------------------
     1. RENDER: HERO / OPENING / FOOTER (thông tin cặp đôi)
     ----------------------------------------------------- */
  function renderCoupleInfo(data) {
    const { couple, schedule } = data;

    // Opening overlay
    setText("opening-groom-name", couple.groomName);
    setText("opening-bride-name", couple.brideName);
    setText("opening-date", schedule.displayDate);

    // Hero
    setText("hero-groom-name", couple.groomName);
    setText("hero-bride-name", couple.brideName);
    setText("hero-date", schedule.displayDate);

    // Footer
    setText("footer-groom-name", couple.groomName);
    setText("footer-bride-name", couple.brideName);
    setText("footer-date", schedule.displayDate);

    // Document title
    document.title = `${couple.groomName} & ${couple.brideName} | Thiệp Cưới Online`;
  }

  /* -----------------------------------------------------
     2. RENDER: LOVE STORY TIMELINE
     ----------------------------------------------------- */
  function renderTimeline(data) {
    const container = document.getElementById("timeline-container");
    if (!container || !Array.isArray(data.timeline)) return;

    const html = data.timeline.map((item, index) => `
      <div class="timeline-item" data-aos="${index % 2 === 0 ? 'fade-right' : 'fade-left'}" data-aos-delay="${index * 100}">
        <span class="timeline-dot" aria-hidden="true"></span>
        <div class="timeline-card">
          <img class="timeline-image" src="${item.image}" alt="${item.title}" loading="lazy" width="600" height="375">
          <div class="timeline-body">
            <h3 class="timeline-title">${item.title}</h3>
            <p class="timeline-desc">${item.description}</p>
          </div>
        </div>
      </div>
    `).join("");

    container.innerHTML = html;
  }

  /* -----------------------------------------------------
     3. RENDER: ALBUM / GALLERY (+ chuẩn bị cho GLightbox)
     ----------------------------------------------------- */
  function renderGallery(data) {
    const container = document.getElementById("album-grid");
    if (!container || !Array.isArray(data.gallery)) return;

    const html = data.gallery.map((item, index) => `
      <a
        href="${item.full}"
        class="album-item glightbox"
        data-gallery="wedding-album"
        data-aos="zoom-in"
        data-aos-delay="${(index % 4) * 80}"
        aria-label="Xem ảnh: ${item.alt}"
      >
        <img src="${item.thumb}" alt="${item.alt}" loading="lazy" width="400" height="400">
        <span class="album-overlay" aria-hidden="true">
          <i class="fa-solid fa-magnifying-glass-plus"></i>
        </span>
      </a>
    `).join("");

    container.innerHTML = html;
  }

  /* -----------------------------------------------------
     4. RENDER: WEDDING INFORMATION
     ----------------------------------------------------- */
  function renderWeddingInfo(data) {
    const { schedule } = data;

    setText("groom-family-name", schedule.groomFamily.parentsName);
    setText("groom-family-address", schedule.groomFamily.address);
    setText("groom-family-time", schedule.groomFamily.time);

    setText("bride-family-name", schedule.brideFamily.parentsName);
    setText("bride-family-address", schedule.brideFamily.address);
    setText("bride-family-time", schedule.brideFamily.time);

    setText("reception-place", schedule.reception.place);
    setText("reception-time", schedule.reception.time);
  }

  /* -----------------------------------------------------
     5. RENDER: GOOGLE MAPS (lazy-load khi vào viewport)
     ----------------------------------------------------- */
  function renderMap(data) {
    const iframe = document.getElementById("map-iframe");
    const directionBtn = document.getElementById("map-direction-btn");

    if (directionBtn && data.map.directionUrl) {
      directionBtn.setAttribute("href", data.map.directionUrl);
    }

    if (!iframe || !data.map.embedSrc) return;

    iframe.setAttribute("data-src", data.map.embedSrc);

    // Lazy-load bằng IntersectionObserver để tối ưu hiệu năng
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            iframe.setAttribute("src", iframe.getAttribute("data-src"));
            obs.unobserve(iframe);
          }
        });
      }, { rootMargin: "200px" });

      observer.observe(iframe);
    } else {
      // Fallback cho trình duyệt cũ
      iframe.setAttribute("src", iframe.getAttribute("data-src"));
    }
  }

  /* -----------------------------------------------------
     6. RENDER: GIFT / QR
     ----------------------------------------------------- */
  function renderGift(data) {
    const container = document.getElementById("gift-container");
    if (!container || !Array.isArray(data.bankAccounts)) return;

    const html = data.bankAccounts.map((acc, index) => `
      <div class="col-12 col-sm-6" data-aos="fade-up" data-aos-delay="${index * 100}">
        <div class="gift-card">
          <img class="gift-qr-img" src="${acc.qr}" alt="Mã QR chuyển khoản mừng cưới - ${acc.ownerLabel}" loading="lazy" width="160" height="160">
          <p class="gift-owner-name">${acc.ownerLabel}</p>
          <p class="gift-bank-name">${acc.bankName}</p>
          <p class="gift-account-number">${acc.accountNumber}</p>
          <button type="button" class="gift-copy-btn" data-copy="${acc.accountNumber}">
            <i class="fa-regular fa-copy" aria-hidden="true"></i>
            <span>Sao chép số TK</span>
          </button>
        </div>
      </div>
    `).join("");

    container.innerHTML = html;

    // Gắn sự kiện copy sau khi render xong
    $all(".gift-copy-btn", container).forEach((btn) => {
      btn.addEventListener("click", handleCopyAccountNumber);
    });
  }

  function handleCopyAccountNumber(e) {
    const btn = e.currentTarget;
    const value = btn.getAttribute("data-copy");
    const originalHTML = btn.innerHTML;

    const showCopiedState = () => {
      btn.classList.add("is-copied");
      btn.innerHTML = `<i class="fa-solid fa-check" aria-hidden="true"></i><span>Đã sao chép</span>`;
      setTimeout(() => {
        btn.classList.remove("is-copied");
        btn.innerHTML = originalHTML;
      }, 2000);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(value).then(showCopiedState).catch(() => {
        fallbackCopy(value);
        showCopiedState();
      });
    } else {
      fallbackCopy(value);
      showCopiedState();
    }
  }

  function fallbackCopy(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    try {
      document.execCommand("copy");
    } catch (err) {
      console.warn("Copy failed:", err);
    }
    document.body.removeChild(textarea);
  }

  /* -----------------------------------------------------
     7. RSVP FORM SUBMIT
     -----------------------------------------------------
     Nếu weddingData.rsvp.endpoint được cấu hình (URL Google Apps
     Script Web App), dữ liệu sẽ được gửi tới đó (mode: no-cors,
     nên không đọc được response — coi như thành công nếu không
     có lỗi mạng). Nếu để trống, chạy demo mode (không gửi đi đâu).
     Xem README.md để biết cách deploy Apps Script.
     ----------------------------------------------------- */
  function setupRsvpForm(data) {
    const form = document.getElementById("rsvp-form");
    if (!form) return;

    const statusMsg = document.getElementById("rsvp-status-msg");
    const submitBtn = document.getElementById("rsvp-submit-btn");

    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const formData = new FormData(form);
      const payload = {
        name: formData.get("name"),
        phone: formData.get("phone"),
        guests: formData.get("guests"),
        attendance: formData.get("attendance"),
        message: formData.get("message"),
        submittedAt: new Date().toISOString(),
      };

      submitBtn.disabled = true;
      submitBtn.style.opacity = "0.6";

      try {
        const endpoint = data.rsvp && data.rsvp.endpoint;

        if (endpoint) {
          await fetch(endpoint, {
            method: "POST",
            mode: "no-cors", // Google Apps Script Web App thường không trả CORS header
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
        } else {
          // DEMO MODE: chưa cấu hình endpoint -> chỉ giả lập độ trễ gửi
          await new Promise((resolve) => setTimeout(resolve, 600));
          console.info("[RSVP demo mode] Chưa cấu hình endpoint trong config.js -> weddingData.rsvp.endpoint. Dữ liệu:", payload);
        }

        showRsvpStatus(statusMsg, "Cảm ơn bạn đã xác nhận! Chúng tôi rất mong được gặp bạn trong ngày cưới. 💛", false);
        form.reset();
      } catch (err) {
        console.error("RSVP submit error:", err);
        showRsvpStatus(statusMsg, "Có lỗi xảy ra khi gửi xác nhận. Vui lòng thử lại sau.", true);
      } finally {
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";
      }
    });
  }

  function showRsvpStatus(el, message, isError) {
    if (!el) return;
    el.textContent = message;
    el.hidden = false;
    el.classList.toggle("is-error", !!isError);
  }

  /* -----------------------------------------------------
     8. GUESTBOOK (demo data — UI only)
     ----------------------------------------------------- */
  function renderGuestbook(data) {
    const container = document.getElementById("guestbook-grid");
    if (!container || !Array.isArray(data.guestbook)) return;

    const html = data.guestbook.map((item, index) => {
      const initial = item.name ? item.name.trim().charAt(0).toUpperCase() : "?";
      return `
        <div class="guestbook-card" data-aos="fade-up" data-aos-delay="${index * 80}">
          <div class="guestbook-card-header">
            <span class="guestbook-avatar" aria-hidden="true">${initial}</span>
            <p class="guestbook-name">${item.name}</p>
          </div>
          <p class="guestbook-message">“${item.message}”</p>
        </div>
      `;
    }).join("");

    container.innerHTML = html;
  }

  /* -----------------------------------------------------
     9. FOOTER SOCIAL LINKS + YEAR
     ----------------------------------------------------- */
  function renderFooterExtras(data) {
    const socialContainer = document.getElementById("footer-social");
    if (socialContainer && Array.isArray(data.social)) {
      socialContainer.innerHTML = data.social.map((item) => `
        <a href="${item.url}" target="_blank" rel="noopener noreferrer" aria-label="${item.label}">
          <i class="${item.icon}" aria-hidden="true"></i>
        </a>
      `).join("");
    }

    setText("footer-year", new Date().getFullYear());
  }

  /* -----------------------------------------------------
     10. MUSIC TOGGLE
     ----------------------------------------------------- */
  function setupMusicToggle(data) {
    const audio = document.getElementById("bg-music");
    const btn = document.getElementById("music-toggle");
    if (!audio || !btn) return;

    if (data.music && data.music.src) {
      audio.querySelector("source").setAttribute("src", data.music.src);
      audio.load();
    }

    let isPlaying = false;

    function updateBtnState(playing) {
      isPlaying = playing;
      btn.classList.toggle("is-playing", playing);
      btn.setAttribute("aria-pressed", String(playing));
      btn.setAttribute("aria-label", playing ? "Tắt nhạc nền" : "Bật nhạc nền");
    }

    btn.addEventListener("click", () => {
      if (isPlaying) {
        audio.pause();
        updateBtnState(false);
      } else {
        audio.play().then(() => updateBtnState(true)).catch((err) => {
          console.warn("Không thể tự động phát nhạc:", err);
        });
      }
    });

    // Expose ra ngoài để opening overlay (invitation open) có thể tự bật nhạc
    window.WeddingMusic = {
      play: () => audio.play().then(() => updateBtnState(true)).catch(() => {}),
      pause: () => { audio.pause(); updateBtnState(false); },
      isPlaying: () => isPlaying,
    };
  }

  /* -----------------------------------------------------
     11. OPENING OVERLAY — nút "Mở Thiệp Mời"
     -----------------------------------------------------
     Hiệu ứng đóng overlay (animation) được xử lý ở animation.js
     thông qua window.WeddingAnimation.closeOpeningOverlay().
     main.js chỉ điều phối: đóng overlay + bật nhạc (nếu cấu hình)
     + cho phép scroll lại body.
     ----------------------------------------------------- */
  function setupOpeningOverlay(data) {
    const btn = document.getElementById("btn-open-invitation");
    const overlay = document.getElementById("opening-overlay");
    if (!btn || !overlay) return;

    // Khóa scroll khi overlay đang hiển thị
    document.body.style.overflow = "hidden";

    btn.addEventListener("click", () => {
      overlay.classList.add("is-closed");
      document.body.style.overflow = "";

      if (window.WeddingAnimation && typeof window.WeddingAnimation.onInvitationOpened === "function") {
        window.WeddingAnimation.onInvitationOpened();
      }

      if (data.music && data.music.autoplayAfterOpen && window.WeddingMusic) {
        window.WeddingMusic.play();
      }

      // Sau khi overlay đóng hẳn, gỡ khỏi DOM flow để tránh chặn tương tác
      setTimeout(() => {
        overlay.setAttribute("aria-hidden", "true");
      }, 900);
    });
  }

  /* -----------------------------------------------------
     12. SCROLL-TO-TOP BUTTON
     ----------------------------------------------------- */
  function setupScrollTopButton() {
    const btn = document.getElementById("scroll-top");
    if (!btn) return;

    const heroHeight = window.innerHeight;

    window.addEventListener("scroll", () => {
      btn.classList.toggle("is-visible", window.scrollY > heroHeight * 0.8);
    }, { passive: true });

    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* -----------------------------------------------------
     13. INIT GLIGHTBOX + SWIPER
     ----------------------------------------------------- */
  function initGalleryLibraries() {
    if (window.GLightbox) {
      window.GLightbox({
        selector: ".glightbox",
        touchNavigation: true,
        loop: true,
        zoomable: true,
      });
    }

    // Swiper dự phòng: kích hoạt nếu có phần tử .wedding-swiper trong DOM
    // (mặc định album dùng CSS Grid; bật Swiper nếu muốn dạng slider)
    const swiperEl = document.querySelector(".wedding-swiper");
    if (swiperEl && window.Swiper) {
      // eslint-disable-next-line no-new
      new window.Swiper(swiperEl, {
        slidesPerView: 1.2,
        spaceBetween: 16,
        centeredSlides: true,
        loop: true,
        breakpoints: {
          768: { slidesPerView: 2.2 },
          992: { slidesPerView: 3.2 },
        },
      });
    }
  }

  /* -----------------------------------------------------
     14. LOADING SCREEN
     ----------------------------------------------------- */
  function hideLoadingScreen() {
    const loader = document.getElementById("loading-screen");
    if (!loader) return;
    loader.classList.add("is-hidden");
    setTimeout(() => loader.setAttribute("aria-hidden", "true"), 900);
  }

  /* -----------------------------------------------------
     15. BOOTSTRAP / INIT ALL
     ----------------------------------------------------- */
  function init() {
    const data = window.weddingData;

    if (!data) {
      console.error("weddingData không tồn tại. Kiểm tra js/config.js đã được load trước main.js chưa.");
      return;
    }

    // Render nội dung động
    renderCoupleInfo(data);
    renderTimeline(data);
    renderGallery(data);
    renderWeddingInfo(data);
    renderMap(data);
    renderGift(data);
    renderGuestbook(data);
    renderFooterExtras(data);

    // Thiết lập tương tác
    setupMusicToggle(data);
    setupOpeningOverlay(data);
    setupScrollTopButton();
    setupRsvpForm(data);

    // Thư viện bên thứ ba
    initGalleryLibraries();

    // Animation (typing, AOS, petals, parallax) — cung cấp bởi animation.js
    if (window.WeddingAnimation && typeof window.WeddingAnimation.init === "function") {
      window.WeddingAnimation.init(data);
    }

    // Countdown — cung cấp bởi countdown.js
    if (window.WeddingCountdown && typeof window.WeddingCountdown.init === "function") {
      window.WeddingCountdown.init(data.schedule.weddingDate, {
        days: "cd-days",
        hours: "cd-hours",
        minutes: "cd-minutes",
        seconds: "cd-seconds",
        container: "countdown-container",
        finishedMsg: "countdown-finished",
      });
    }
  }

  document.addEventListener("DOMContentLoaded", init);
  window.addEventListener("load", hideLoadingScreen);

})();
