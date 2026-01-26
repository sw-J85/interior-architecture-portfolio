document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.zoomable').forEach(img => {
    img.addEventListener('click', () => {
      const modal = document.createElement('div');
      modal.className = 'image-modal';

      const big = document.createElement('img');
      big.src = img.src;

      modal.appendChild(big);
      document.body.appendChild(modal);

      modal.addEventListener('click', () => modal.remove());
    });
  });
});





// Email copy to clipboard
document.querySelectorAll('.copy-email').forEach(btn => {
  btn.addEventListener('click', async () => {
    const email = btn.dataset.email;
    const feedback = document.querySelector('.copy-feedback');

    try {
      await navigator.clipboard.writeText(email);
      if (feedback) {
        feedback.textContent = '이메일 주소가 복사되었습니다.';
        setTimeout(() => (feedback.textContent = ''), 2000);
      }
    } catch (e) {
      // fallback
      const temp = document.createElement('textarea');
      temp.value = email;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand('copy');
      document.body.removeChild(temp);
      if (feedback) {
        feedback.textContent = '이메일 주소를 복사했습니다.';
        setTimeout(() => (feedback.textContent = ''), 2000);
      }
    }
  });
});




/* =========================================
   IMAGE LIGHTBOX (OPEN / CLOSE)
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* -----------------------------------------
     1. 썸네일 이미지 클릭 → 라이트박스 열기
     ----------------------------------------- */
  document.querySelectorAll('.zoom-img').forEach(img => {
    img.addEventListener('click', (e) => {
      e.stopPropagation(); // 부모 클릭 이벤트 방지

      const lightbox = document.getElementById('lightbox');
      if (!lightbox) return; // 라이트박스 없으면 중단

      const lightboxImg = lightbox.querySelector('img');

      // data-full에 지정한 원본 이미지로 교체
      lightboxImg.src = img.dataset.full;

      // 라이트박스 표시
      lightbox.style.display = 'flex';
    });
  });

  /* -----------------------------------------
     2. 라이트박스 클릭 → 닫기
     ----------------------------------------- */
  const lightbox = document.getElementById('lightbox');

  if (lightbox) {
    lightbox.addEventListener('click', () => {
      const lightboxImg = lightbox.querySelector('img');

      // 라이트박스 숨김
      lightbox.style.display = 'none';

      // 이미지 초기화 (잔상 방지)
      lightboxImg.src = '';
    });
  }

});



/* =========================================
   PROJECT HERO IMAGE → LIGHTBOX
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* -----------------------------------------
     Hero 영역 클릭 시 원본 이미지 확대
     ----------------------------------------- */
  document.querySelectorAll('.zoom-hero').forEach(hero => {
    hero.addEventListener('click', () => {

      // 라이트박스 요소 확인
      const lightbox = document.getElementById('lightbox');
      if (!lightbox) return;

      const lightboxImg = lightbox.querySelector('img');

      // data-full에 지정된 원본 이미지 사용
      lightboxImg.src = hero.dataset.full;

      // 라이트박스 표시
      lightbox.style.display = 'flex';
    });
  });

});


// 푸터 하단
 document.getElementById('copyright-year').textContent = new Date().getFullYear();



