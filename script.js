
const pageMap = {
  "-1": "home",
  "0": "about-me",
  "1": "what-i-value",
  "2": "projects",
  "3": "contact",
  "4": "blog",
  "5": "credits",
};
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

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

function mod(n, m) {
  return ((n % m) + m) % m;
}

let scrambledTextInterval = null;
let backgroundChangingInterval = null;
const MAX_SCRAMBLE_ITERATIONS = 6;
const NUM_BACKGROUND_MASKS = 9;
function applyScrambleTextEffect(element, tickMs) {
  let iteration = 0;
  clearInterval(scrambledTextInterval);
  
  scrambledTextInterval = setInterval(() => {
    element.innerText = element.innerText
      .split("")
      .map((letter, index) => {
        return letters[Math.floor(Math.random() * letters.length)]
      })
      .join("");
    if(iteration >= MAX_SCRAMBLE_ITERATIONS){ 
      element.innerText = element.dataset.value;
      clearInterval(scrambledTextInterval);
    }
    
    iteration++;
  }, tickMs);
}
function applyBackgroundChangingInterval(element) {
  clearInterval(backgroundChangingInterval);
  let iteration = 0;
  element.style.transition = 'none';
  element.style.backgroundImage = `url(images/masks${mod(iteration, NUM_BACKGROUND_MASKS)}.png)`;
  iteration = mod(iteration + 1, NUM_BACKGROUND_MASKS);
  backgroundChangingInterval = setInterval(() => {
    element.style.backgroundImage = `url(images/masks${mod(iteration, NUM_BACKGROUND_MASKS)}.png)`;
    iteration = mod(iteration + 1, NUM_BACKGROUND_MASKS);
  }, 250);
}

document.addEventListener("DOMContentLoaded", () => {
  const options = getOptions();

  const MOBILE_PAGE_TRANSITION_DELAY = 120;
  // Assign click and enter handlers
  options.forEach((box, index) => {
    box.addEventListener('click', () => {
      setTimeout(() => showPage(index), isMobile() ? MOBILE_PAGE_TRANSITION_DELAY : 0);
    });

    box.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter') {
        return;
      }
      setTimeout(() => showPage(index), isMobile() ? MOBILE_PAGE_TRANSITION_DELAY : 0);
      event.preventDefault();
    });

    const span = box.querySelector('span');
    span.addEventListener('focus', (event) => { 
      event.target.style.transition = 'none';
      applyScrambleTextEffect(event.target, 30);
      applyBackgroundChangingInterval(event.target);
    });
    span.addEventListener('blur', (event) => { 
      clearInterval(scrambledTextInterval);
      clearInterval(backgroundChangingInterval);
      event.target.innerText = event.target.dataset.value;
      event.target.style.backgroundImage = 'none';
      event.target.style.transition = 'none';
    });
  });

  // Initialize projects carousel
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
  glide.on('run.before', (item) => {
    const page = document.querySelector('.projects');
    const video = page.querySelector('video');
    const source = video.querySelector('source');

    video.style.transition = '0s all ease';
    video.style.opacity = '0';
    const nextIndex = item.direction === '>' ? (glide.index + 1) : (glide.index - 1);
    const newIndex = mod(nextIndex, 4);
    source.setAttribute('src', `videos/projects_${newIndex}.mp4`);
    const mobileUi = isMobile();
    if (mobileUi) {
      page.querySelector('.controls').style.display = 'none';
    }
    switch (newIndex) {
      case 0:
        // Youtube ai tool
        page.style.background = 'linear-gradient(to right, purple, black)';
        video.style.height = '100%';
        video.style.width = mobileUi ? 'auto' : '100%';
        video.style.left = mobileUi ? '-8vw' : '20vw';
        video.style.transform = 'scale(1)';
        break;
      case 1:
        // Youtube quizzes
        page.style.background = mobileUi ? 'black' : 'linear-gradient(to right, grey, black)';
        video.style.height = mobileUi ? '275px' : '100%';
        video.style.width = mobileUi ? '100%' : 'auto';
        video.style.left = mobileUi ? '-5vw' : '5vw';
        video.style.transform = mobileUi ? 'scale(1)' : 'scale(1.15)';
        break;
      case 2:
        // Logs Viewer
        page.style.background = mobileUi ? 'black' : 'linear-gradient(to right, grey, white)';
        video.style.height = mobileUi ? '275px' : '100%';
        video.style.width = mobileUi ? '100%' : 'auto';
        video.style.left = mobileUi ? '0vw' : '5vw';
        video.style.transform = mobileUi ? 'scale(1)' : 'scale(1.15)';
        break;
      case 3:
        // Youtube Courses
        page.style.background = mobileUi ? 'black' : 'linear-gradient(to right, grey, black)';
        video.style.height = mobileUi ? '275px' : '100%';
        video.style.width = mobileUi ? '100%' : 'auto';
        video.style.left = mobileUi ? '0vw' : '5vw';
        video.style.transform = mobileUi ? 'scale(1)' : 'scale(1.15)';
        break;
      default:
        break;
    }
    video.load();
    setTimeout(() => {
      video.style.transition = '0.3s all ease';
      video.style.opacity = '1';
      video.play();
    }, 300);
  });
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

// Initiate the changing background on the "About me" button.
// document.activeElement.style.transition = 'none';
applyBackgroundChangingInterval(document.activeElement);

document.querySelector('#metaphor-video').playbackRate = 0.5;
history.pushState({pageIndex: -1}, '');