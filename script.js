// Constants
const CONSTANTS = {
  PAGES: {
    "-1": "home",
    "0": "about-me",
    "1": "what-i-value",
    "2": "projects",
    "3": "contact",
    "4": "blog",
    "5": "credits",
  },
  INITIAL_ANIMATION_MS: 750,
  LETTERS: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  MOBILE_DELAY: 120,
  MASKS: 9,
  MAX_SCRAMBLE: 6,
  PROJECTS: 4,
  MOBILE_BREAKPOINT: 768
};

// State
let state = {
  scrambleInterval: null,
  backgroundInterval: null,
  touchCoords: {
    xDown: null,
    yDown: null
  }
};

// DOM Helpers
const dom = {
  getOptions: () => document.querySelectorAll('.left-options .option'),
  focusFirstOption: () => document.querySelector('.option:not(:focus)').focus(),
  getOptionTexts: () => document.querySelectorAll('.left-options .option span'),
  getCurrentPage: () => document.querySelector('.visible'),
  isMobile: () => window.innerWidth < CONSTANTS.MOBILE_BREAKPOINT || screen.width < CONSTANTS.MOBILE_BREAKPOINT
};

// Animation Functions
const animations = {
  scrambleText: (element, tickMs) => {
    let iteration = 0;
    clearInterval(state.scrambleInterval);
    
    state.scrambleInterval = setInterval(() => {
      element.innerText = element.innerText
        .split("")
        .map(() => CONSTANTS.LETTERS[Math.floor(Math.random() * CONSTANTS.LETTERS.length)])
        .join("");
        
      if(iteration >= CONSTANTS.MAX_SCRAMBLE){ 
        element.innerText = element.dataset.value;
        clearInterval(state.scrambleInterval);
      }
      iteration++;
    }, tickMs);
  },

  flyInLetters: (element, durationMs) => {
    let resolvedPromise = () => {};
    const isDesktopUi = !dom.isMobile();
    const resolved = new Promise(resolve => resolvedPromise = resolve);
    const text = element.innerText;
    const newEls = text.split('').map(letter => {
      const wrapped = document.createElement('span');
      wrapped.textContent = letter.trim() || '\u00A0';
      wrapped.style.transition = `${durationMs}ms all ease-out`;

      // Contstruct a random start point for the letter.
      // For desktop, the letters all come from generally the left.
      // For mobile, the letters all come from generally the top.
      const randomX = isDesktopUi ? Math.random() * 100 - 200 : Math.random() * 200 - 100;
      const randomY = isDesktopUi ? Math.random() * 200 - 100 : Math.random() * 100 - 200  ;
      const randomRotation = Math.random() * 360 - 180;
      wrapped.style.transform = `translate(${randomX}vw, ${randomY}vh) rotate(${randomRotation}deg)`;
      return wrapped;
    });
    element.replaceChildren(...newEls);
    requestAnimationFrame(() => {
      newEls.forEach(el => el.style.transform = '');

      setTimeout(() => {
        element.innerText = text;
        resolvedPromise();
      }, durationMs + 100);
    });
    return resolved;
  },

  changeBackground: (element) => {
    clearInterval(state.backgroundInterval);
    let iteration = 0;
    
    const updateBackground = () => {
      element.style.backgroundImage = `url(images/masks${mod(iteration, CONSTANTS.MASKS)}.png)`;
      iteration = mod(iteration + 1, CONSTANTS.MASKS);
    };

    element.style.transition = 'none';
    updateBackground();
    state.backgroundInterval = setInterval(updateBackground, 250);
  }
};

// Navigation Functions
const navigation = {
  showPage: (index) => {
    const pages = document.getElementsByClassName('page');
    Array.from(pages).forEach(page => page.classList.remove('visible'));

    const page = document.getElementsByClassName(CONSTANTS.PAGES[index])[0];
    page.style.setProperty('transition-delay', 'var(--base-transition-duration)');
    page.classList.add('visible');

    const currentVideo = dom.getCurrentPage().querySelector('video');
    if (currentVideo) currentVideo.play();

    if (index < 0) {
      navigation.showOptions();
      if (dom.isMobile()) document.activeElement.blur();
    } else {
      navigation.hideOptions();
    }

    history.pushState({pageIndex: index}, '');
  },

  hideOptions: () => {
    const options = dom.getOptions();
    options.forEach((box) => {
      box.style.setProperty('transition-delay', '0s');
      box.style.setProperty(
        'transform',
        dom.isMobile() ? 
          'translateY(-2000px)': 
          'rotate3d(0, -1, 0, -180deg) translateZ(-1500px)'
      );
    });

    document.querySelector(".home").classList.remove('visible');
  },

  showOptions: () => {
    const options = dom.getOptions();
    options.forEach((box) => {
      box.style['transition-delay'] = "var(--base-transition-duration)";
      box.style.transform = '';
    });
  },

  backToHome: () => {
    const pages = document.getElementsByClassName('page');
    Array.from(pages).forEach(page => page.classList.remove('visible'));
    navigation.showPage(-1);
  }
};

// Projects Carousel
const carousel = {
  instance: null,
  
  setup: () => {
    carousel.instance = new Glide('.glide', {
      startAt: 0,
      dots: '#dots',
      draggable: true,
      arrows: {
        prev: '.glider-prev',
        next: '.glider-next'
      }
    });

    carousel.instance.mount();
    carousel.instance.on('run.before', carousel.handleSlideChange);
  },

  handleSlideChange: (item) => {
    const page = document.querySelector('.projects');
    const video = page.querySelector('video');
    const source = video.querySelector('source');
    const mobileUi = dom.isMobile();
    const toRight = item.direction === '>';

    // Update video transition
    video.style.setProperty('transition', '0s all ease');
    video.style.setProperty('opacity', '0');
    const translateDistance = toRight ? '100' : '-100';
    video.style.setProperty(
      'transform',
      mobileUi ? 
        `translateX(${translateDistance}vw) rotateY(-45deg)` : 
        `translateY(${translateDistance}vh) rotateX(-45deg)`
    );

    // Update video content
    const nextIndex = toRight ? (carousel.instance.index + 1) : (carousel.instance.index - 1);
    const newIndex = mod(nextIndex, CONSTANTS.PROJECTS);
    video.setAttribute('data-index', String(newIndex));
    source.setAttribute('src', `videos/projects_${newIndex}.mp4`);

    if (dom.isMobile()) {
      page.querySelector('.controls').style.display = 'none';
    }

    // Update theme
    carousel.updateTheme(page, newIndex);
    
    // Handle video transition
    video.load();
    setTimeout(() => {
      video.style.setProperty('transition', '0.3s all ease-out');
      video.style.setProperty('opacity', '1');
      video.style.setProperty('transform', mobileUi ? 'rotateX(-5deg)' : 'rotateY(10deg)');
      setTimeout(() => video.play(), 300);
    }, 0);
  },

  updateTheme: (page, index) => {
    const themes = {
      0: ['purple', 'black'],      // Youtube ai tool
      1: ['grey', 'black'],        // Youtube quizzes
      2: ['darkgrey', 'grey'],     // Logs Viewer
      3: ['grey', 'black'],        // Youtube Courses
    };
    
    const [gradient1, gradient2] = themes[index] || themes[0];
    page.style.setProperty('--gradient1', gradient1);
    page.style.setProperty('--gradient2', gradient2);
  }
};

// Utility Functions
function mod(n, m) {
  return ((n % m) + m) % m;
}

// Event Handlers
const handlers = {
  touch: {
    start: (evt) => {
      const firstTouch = getTouches(evt)[0];
      state.touchCoords = {
        xDown: firstTouch.clientX,
        yDown: firstTouch.clientY
      };
    },

    move: (evt) => {
      if (!state.touchCoords.xDown || !state.touchCoords.yDown) return;

      const xUp = evt.touches[0].clientX;
      const yUp = evt.touches[0].clientY;
      const xDiff = state.touchCoords.xDown - xUp;
      const yDiff = state.touchCoords.yDown - yUp;

      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        carousel.instance.go(xDiff > 0 ? '>' : '<');
      }

      state.touchCoords = { xDown: null, yDown: null };
    }
  },

  keyboard: (event) => {
    switch (event.code) {
      case 'Backspace':
      case 'Escape':
        navigation.backToHome();
        event.preventDefault();
        break;
      case 'ArrowUp':
      case 'ArrowDown':
        handlers.handleVerticalNavigation(event);
        break;
      case 'ArrowLeft':
      case 'ArrowRight':
        carousel.instance.go(event.code === 'ArrowLeft' ? '<' : '>');
        event.preventDefault();
        break;
    }
  },

  handleVerticalNavigation: (event) => {
    const activeEl = document.activeElement;
    if (!activeEl.classList.contains('option')) {
      dom.focusFirstOption();
      event.preventDefault();
    } else if (!dom.getCurrentPage().classList.contains('home')) {
      event.preventDefault();
    } else {
      const allOptions = Array.from(document.querySelectorAll('.option[tabindex="0"]'));
      const currentIndex = allOptions.findIndex((el) => el === activeEl);
      const newIndex = event.code === 'ArrowDown' ? currentIndex + 1 : currentIndex - 1;
      allOptions[mod(newIndex, allOptions.length)].focus();
      event.preventDefault();
    }
  }
};

// Tear down the loader and kick off the welcome animations.
function startApp() {
  const loader = document.querySelector('.loader-container');
  if (!loader) return;
  
  loader.remove();
  document.querySelector('.container').style.opacity = '1';

  history.pushState({pageIndex: -1}, '');

  // This requestAnimationFrame double ensures that the DOM content is fully loaded.
  requestAnimationFrame(() => {
    const optionTexts = Array.from(dom.getOptionTexts());
    const promises = optionTexts.map(textEl => animations.flyInLetters(textEl, CONSTANTS.INITIAL_ANIMATION_MS));

    Promise.all(promises).then(() => {
      if (!dom.isMobile()) {
        const firstOption = document.activeElement;
        const background = firstOption.querySelector('.focus-only-background');
        animations.changeBackground(background);
      } else {
        const video = document.querySelector('.projects video');
        video.addEventListener('touchstart', handlers.touch.start);
        video.addEventListener('touchmove', handlers.touch.move);
      }
      dom.focusFirstOption();
    });
  });
}

// Initialization
function init() {
  // Set up event listeners
  document.addEventListener('keydown', handlers.keyboard);
  window.addEventListener('popstate', (event) => {
    event.state.pageIndex < 0 ? navigation.backToHome() : navigation.showPage(event.state.pageIndex);
  });

  // Set up options
  const options = dom.getOptions();
  options.forEach((box, index) => {
    box.addEventListener('click', () => {
      setTimeout(
        () => navigation.showPage(index), 
        dom.isMobile() ? CONSTANTS.MOBILE_DELAY : 0
      );
    });

    box.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter') {
        return;
      }
      setTimeout(
        () => navigation.showPage(index), 
        dom.isMobile() ? CONSTANTS.MOBILE_DELAY : 0
      );
      event.preventDefault();
    });

    box.addEventListener('focus', (event) => { 
      const span = event.target.querySelector('span');
      // animations.scrambleText(span, 30);

      const background = event.target.querySelector('.focus-only-background');
      animations.changeBackground(background);
      event.preventDefault();
    });

    box.addEventListener('blur', (event) => { 
      clearInterval(state.scrambleInterval);
      clearInterval(state.backgroundInterval);

      const span = event.target.querySelector('span');
      span.innerText = span.dataset.value;

      const background = event.target.querySelector('.focus-only-background');
      background.style.backgroundImage = 'none';
      event.preventDefault();
    });
  });

  carousel.setup();

  // Video loading check
  const videos = document.querySelectorAll('video');
  const checkVideosLoaded = () => {
    const allLoaded = Array.from(videos)
      .every(video => video.readyState >= 4);
      
    if (allLoaded) startApp();
  };
  
// Start app once videos are loaded
  if (Array.from(videos).every(video => video.readyState >= 4)) {
    startApp();
  } else {
    videos.forEach(video => video.addEventListener('canplaythrough', checkVideosLoaded));
  }
}

// Initialize once DOM is loaded
if (document.readyState === 'complete' || document.readyState === 'loaded') {
  init();
} else {
  document.addEventListener("DOMContentLoaded", init);
}
