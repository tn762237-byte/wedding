/* =====================================================
   WEDDING INVITATION — countdown.js
   Vai trò: tính toán và cập nhật thời gian đếm ngược
   tới ngày cưới (lấy mốc thời gian từ weddingData.schedule.weddingDate
   trong config.js).

   Public API: window.WeddingCountdown.init(targetDateString, elementIds)
   - targetDateString: chuỗi ISO, VD "2026-12-12T09:00:00"
   - elementIds: {
       days, hours, minutes, seconds : id của các span hiển thị số
       container : id của khối countdown (ẩn khi hết giờ)
       finishedMsg : id của thông báo hiển thị khi đã tới/qua ngày cưới
     }
   ===================================================== */

(function () {
  "use strict";

  let intervalId = null;

  /**
   * Định dạng số về 2 chữ số, VD: 5 -> "05"
   */
  function pad(num) {
    return String(Math.max(num, 0)).padStart(2, "0");
  }

  /**
   * Tính toán phần Days/Hours/Minutes/Seconds còn lại từ hiệu số mili-giây
   */
  function computeRemaining(diffMs) {
    const totalSeconds = Math.floor(diffMs / 1000);

    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    return { days, hours, minutes, seconds };
  }

  function updateDOM(elements, values) {
    const daysEl = document.getElementById(elements.days);
    const hoursEl = document.getElementById(elements.hours);
    const minutesEl = document.getElementById(elements.minutes);
    const secondsEl = document.getElementById(elements.seconds);

    if (daysEl) daysEl.textContent = pad(values.days);
    if (hoursEl) hoursEl.textContent = pad(values.hours);
    if (minutesEl) minutesEl.textContent = pad(values.minutes);
    if (secondsEl) secondsEl.textContent = pad(values.seconds);
  }

  function showFinishedState(elements) {
    const container = document.getElementById(elements.container);
    const finishedMsg = document.getElementById(elements.finishedMsg);

    if (container) container.hidden = true;
    if (finishedMsg) finishedMsg.hidden = false;
  }

  /**
   * Khởi tạo đếm ngược.
   * @param {string} targetDateString - Mốc thời gian đích (ISO string)
   * @param {object} elementIds - Map id các phần tử DOM cần cập nhật
   */
  function init(targetDateString, elementIds) {
    if (!targetDateString || !elementIds) {
      console.error("WeddingCountdown.init: thiếu targetDateString hoặc elementIds.");
      return;
    }

    const targetDate = new Date(targetDateString);

    if (isNaN(targetDate.getTime())) {
      console.error("WeddingCountdown.init: weddingDate không hợp lệ trong config.js ->", targetDateString);
      return;
    }

    // Dừng interval cũ nếu init được gọi lại (tránh chạy trùng)
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }

    function tick() {
      const now = new Date();
      const diffMs = targetDate.getTime() - now.getTime();

      if (diffMs <= 0) {
        updateDOM(elementIds, { days: 0, hours: 0, minutes: 0, seconds: 0 });
        showFinishedState(elementIds);
        clearInterval(intervalId);
        intervalId = null;
        return;
      }

      const remaining = computeRemaining(diffMs);
      updateDOM(elementIds, remaining);
    }

    // Chạy ngay lần đầu để tránh chờ 1 giây mới hiển thị số
    tick();
    intervalId = setInterval(tick, 1000);

    // Tạm dừng cập nhật khi tab ẩn để tiết kiệm tài nguyên,
    // và đồng bộ lại ngay khi quay lại tab (tránh lệch giờ)
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        tick();
      }
    });
  }

  window.WeddingCountdown = { init };

})();
