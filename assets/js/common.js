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

