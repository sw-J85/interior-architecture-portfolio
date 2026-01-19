
// 기존 한화면에서 넘어가는 코드
const panels = document.querySelectorAll('.panel');
let index = 0;
let isMoving = false;

function moveTo(i) {
  if (i < 0 || i >= panels.length) return;
  isMoving = true;
  index = i;
  panels[i].scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => isMoving = false, 700);
}

window.addEventListener('wheel', (e) => {
  if (isMoving) return;
  if (e.deltaY > 0) moveTo(index + 1);
  else moveTo(index - 1);
});

