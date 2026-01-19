// document.addEventListener("DOMContentLoaded", () => {
//   const navLinks = document.querySelectorAll(".top-nav a");
//   const sections = Array.from(navLinks)
//     .map(link => document.querySelector(link.getAttribute("href")))
//     .filter(Boolean);

//   navLinks.forEach((link, i) => {
//     link.addEventListener("click", e => {
//       e.preventDefault();
//       if (window.__HIVEWORKS_MOVE_TO__) {
//         window.__HIVEWORKS_MOVE_TO__(i);
//       }
//     });
//   });

//   // active 표시 (index 기준)
//   function updateActive(i) {
//     navLinks.forEach((link, idx) => {
//       link.classList.toggle("active", idx === i);
//     });
//   }

//   // scroll.js와 동기화
//   let currentIndex = 0;
//   window.addEventListener("scroll", () => {
//     sections.forEach((section, i) => {
//       if (window.scrollY >= section.offsetTop - 100) {
//         currentIndex = i;
//       }
//     });
//     updateActive(currentIndex);
//   });

//   updateActive(0);
// });


document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".top-nav a");

  function updateActive(i) {
    navLinks.forEach((link, idx) => {
      link.classList.toggle("active", idx === i);
    });
  }

  // nav 클릭 → index 이동
  navLinks.forEach((link, i) => {
    link.addEventListener("click", e => {
      e.preventDefault();
      if (window.__HIVEWORKS_MOVE_TO__) {
        window.__HIVEWORKS_MOVE_TO__(i);
        updateActive(i); // 🔥 즉시 반영
      }
    });
  });

  // scroll.js가 현재 index를 알려줄 수 있도록 훅 준비
  window.__HIVEWORKS_UPDATE_NAV__ = updateActive;

  updateActive(0);
});
