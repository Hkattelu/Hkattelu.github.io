
const PAGE_MAP = {
  "-1": "home",
  "0": "about-me",
  "1": "what-i-value",
  "2": "projects",
  "3": "contact",
  "4": "blog",
  "5": "credits",
};
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const MOBILE_PAGE_TRANSITION_DELAY = 120;
const NUM_BACKGROUND_MASKS = 9;
const MAX_SCRAMBLE_ITERATIONS = 6;
const NUM_PROJECTS = 4;

let scrambledTextInterval = null;
let backgroundChangingInterval = null;

function getOptionsContainer() {
  return document.querySelector('.left-options');
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
      box.style.setProperty('transition-delay', '0s');
      box.style.setProperty('transform',
        isMobile() ? 'translateY(-2000px)': 'rotate3d(0, -1, 0, -180deg) translateZ(-1500px)');
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

  const page = document.getElementsByClassName(String(PAGE_MAP[index]))[0];
  page.style.setProperty('transition-delay', 'var(--base-transition-duration)');
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

function applyScrambleTextEffect(element, tickMs) {
  let iteration = 0;
  clearInterval(scrambledTextInterval);
  
  scrambledTextInterval = setInterval(() => {
    element.innerText = element.innerText
      .split("")
      .map((letter, index) => {
        return LETTERS[Math.floor(Math.random() * LETTERS.length)]
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
      event.preventDefault();
    });
    span.addEventListener('blur', (event) => { 
      clearInterval(scrambledTextInterval);
      clearInterval(backgroundChangingInterval);
      event.target.innerText = event.target.dataset.value;
      event.target.style.backgroundImage = 'none';
      event.target.style.transition = 'none';
      event.preventDefault();
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
    const mobileUi = isMobile();
    const toRight = item.direction === '>';

    // First, immediately make the current video disappear
    video.style.setProperty('transition', '0s all ease');
    video.style.setProperty('opacity', '0');
    // This will make it so when we show the video again, it slides in from the right.
    const translateDistance = toRight ? '100' : '-100';
    video.style.setProperty(
      'transform',
      mobileUi ? `translateX(${translateDistance}vw) rotateY(-45deg)` : `translateY(${translateDistance}vh) rotateX(-45deg)`);

    // Update the video element to the new video
    const nextIndex = toRight ? (glide.index + 1) : (glide.index - 1);
    const newIndex = mod(nextIndex, NUM_PROJECTS);
    video.setAttribute('data-index', String(newIndex));
    source.setAttribute('src', `videos/projects_${newIndex}.mp4`);

    // Hide the controls. We assume the user doesn't need them anymore.
    if (isMobile()) {
      page.querySelector('.controls').style.display = 'none';
    }

    // Update the page to match the new video theme. 
    // As far as I know, there is no cleaner way to do this.
    switch (newIndex) {
      case 0: // Youtube ai tool
        page.style.setProperty('--gradient1', 'purple');
        page.style.setProperty('--gradient2', 'black');
        break;
      case 1: // Youtube quizzes
        page.style.setProperty('--gradient1', 'grey');
        page.style.setProperty('--gradient2', 'black');
        break;
      case 2: // Logs Viewer
        page.style.setProperty('--gradient1', 'darkgrey');
        page.style.setProperty('--gradient2', 'grey');
        break;
      case 3: // Youtube Courses
        page.style.setProperty('--gradient1', 'grey');
        page.style.setProperty('--gradient2', 'black');
        break;
      default:
        break;
    }
    video.load();

    // Assume the video takes < 0.3s to load.
    // Once it loads, prepare the new animation.
    setTimeout(() => {
      video.style.setProperty('transition', '0.3s all ease-out');
      video.style.setProperty('opacity', '1');
      video.style.setProperty('transform', mobileUi ? 'rotateX(-5deg)' : 'rotateY(10deg)');
      setTimeout(() => video.play(), 300);
    }, 0);
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
        allOptions[mod(newIndex, allOptions.length)].focus();
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

function onInit() {
  // Destroy the loader
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.remove();
  } else {
    return;
  }

  // Fade in the page
  const container = document.querySelector('.container');
  container.style.opacity = '1';  
  
  // Initiate the changing background on the "About me" button.
  if (!isMobile()) {
    applyBackgroundChangingInterval(document.activeElement);
  }

  // Add a history entry. Needed for back button support.
  history.pushState({pageIndex: -1}, '');
}

// Validate that all videos have fully loaded. Only then, drop the loader
const videos = document.querySelectorAll('video');
function checkAllVideosLoaded() {
  const allLoaded =  Array.from(videos).reduce((tempLoaded, video) => tempLoaded && video.readyState >=4, true);
  if (!allLoaded) {
    return;
  }

  // All videos have loaded
  onInit();
}

const allLoaded = Array.from(videos).reduce((tempLoaded, video) => tempLoaded && video.readyState >=4, true);
if (allLoaded) {
  onInit();
} else {
  videos.forEach(video => {
    video.addEventListener('canplaythrough', () => checkAllVideosLoaded());
  });
}
