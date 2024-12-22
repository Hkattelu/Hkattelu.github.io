
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
  const minWidth = 768; // Minimum width for desktop devices
  return window.innerWidth < minWidth || screen.width < minWidth;
}

function hideOptions() {
  const options = getOptions();
  options.forEach((box) => {
      box.style['transition-delay'] = "0s";
      box.style.transform = isMobile() ? "translateY(-2000px)": "rotate3d(0, 0, 1, 120deg)";
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
  const pages = document.getElementsByClassName('page');
  for (const page of pages) {
    page.classList.remove('visible');
  }

  const page = document.getElementsByClassName(String(pageMap[index]))[0];
  page.style['transition-delay'] = "var(--base-transition-duration)";
  page.classList.add('visible');

  const currentVideo = getCurrentPage().querySelector('video');
  if (currentVideo) {
    currentVideo.play();
  }

  if (index < 0) {
    showOptions();
    if (isMobile()) {
      document.activeElement.blur();
    }
  } else {
    hideOptions();
  }

  history.pushState({pageIndex: index}, '');
}

function backToHome() {
  const pages = document.getElementsByClassName('page');
  for (const page of pages) {
    page.classList.remove('visible');
  }
  showPage(-1);
}

window.addEventListener('popstate', (event) => {
  if (event.state.pageIndex < 0) {
    backToHome();
  } else {
    showPage(event.state.pageIndex);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const options = getOptions();

  options.forEach((box, index) => {
    box.addEventListener('click', function(event) {
      setTimeout(() => showPage(index), isMobile() ? 120 : 0);
    });

    box.addEventListener('keydown', function(event) {
      if (event.key !== 'Enter') {
        return;
      }
      setTimeout(() => showPage(index), isMobile() ? 120 : 0);
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

history.pushState({pageIndex: -1}, '');