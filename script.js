
const pageMap = {
  "-1": "home",
  "0": "about-me",
  "1": "what-i-value",
  "2": "projects",
  "3": "contact",
  "4": "blog",
  "5": "credits",
}

function getOptions() {
  return document.querySelectorAll(".option");
}

function getCurrentPage() {
  return document.querySelector('.visible');
}

function isMobile() {
  const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i
  ];
  
  return toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem);
  });
}

function hideOptions() {
  const options = getOptions();
  options.forEach((box) => {
      box.style['transition-delay'] = "0s";
      box.style.transform = isMobile() ? "translateY(-1000px)": "rotate3d(0, 0, 1, 120deg)";
  });

  const home = document.querySelector(".home");
  home.classList.remove('visible');
}

function showOptions() {
  const options = getOptions();
  options.forEach((box) => {
      box.style['transition-delay'] = "var(--base-transition-duration)";
      box.style.transform = '';
  });
}

function showPage(index) {
  const page = document.getElementsByClassName(String(pageMap[index]))[0];
  page.style['transition-delay'] = "var(--base-transition-duration)";
  page.classList.add('visible');

  const currentVideo = getCurrentPage().querySelector('video');
  if (currentVideo) {
    currentVideo.play();
  }
}

function backToHome() {
  const pages = document.getElementsByClassName('page');
  for (const page of pages) {
    page.classList.remove('visible');
  }
  showPage(-1);
}

document.addEventListener("DOMContentLoaded", () => {
  const options = getOptions();

  options.forEach((box, index) => {
    box.addEventListener('click', function(event) {
      hideOptions();
      showPage(index);
    });

    box.addEventListener('keydown', function(event) {
      if (event.key !== 'Enter') {
        return;
      }
      hideOptions();
      showPage(index);
      event.preventDefault();
    });
  });

  setupGlider();
});

let glide;
function setupGlider() {
  glide = new Glide('.glide', {
      startAt: 0,
      dots: '#dots',
      draggable: true,
      arrows: {
          prev: '.glider-prev',
          next: '.glider-next'
      }
  });
  glide.mount();
}

document.addEventListener('keydown', function(event) {
  switch (event.code) {
    case 'Backspace':
    case 'Escape':
      showOptions();
      backToHome();
      event.preventDefault();
      break;
    case 'ArrowUp':
    case 'ArrowDown':
      const activeEl = document.activeElement;
      if (activeEl.tagName.toLowerCase() !== 'span') {
        document.querySelector('span:not(:focus)').focus();
        event.preventDefault();
      } else if (!getCurrentPage().classList.contains('home')) {
        event.preventDefault();
      } else {
        const allOptions = Array.from(document.querySelectorAll('span[tabindex="0"]'));
        const currentIndex = allOptions.findIndex((el) => el === activeEl);
        const newIndex = event.code === 'ArrowDown' ? currentIndex + 1 : currentIndex - 1;
        allOptions[newIndex % allOptions.length].focus();
        event.preventDefault();
      }
      break;
    case 'ArrowLeft':
    case 'ArrowRight':
      glide.go(event.code === 'ArrowLeft' ? '<' : '>');
      event.preventDefault();
    default:
      break;
  }
});