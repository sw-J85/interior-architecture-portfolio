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
