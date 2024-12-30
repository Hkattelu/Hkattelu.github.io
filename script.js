// Constants
const CONSTANTS = {
  PAGES: {
    "-1": "home",
    "0": "about-me",
    "1": "skills",
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
  MOBILE_BREAKPOINT: 768,
  SKILL_TREE: {
    "Frontend Development": {
      icon: "images/icons/frontend.svg",
      // description: "Building intuitive and performant user interfaces",
      branches: {
        "Web UI": {
          icon: "images/icons/web.svg",
          // description: "Modern web development",
          skills: [
            {
              title: "Angular",
              icon: "images/icons/angular.svg",
              // description: "GCP Logging UI development"
            },
            {
              title: "Web Components",
              icon: "images/icons/webcomponents.svg",
              // description: "YouTube custom elements"
            },
            {
              title: "Responsive Design",
              icon: "images/icons/responsive.svg",
              // description: "Mobile-first approaches"
            }
          ]
        },
        "Mobile Development": {
          icon: "images/icons/mobile.svg",
          // description: "Cross-platform mobile solutions",
          skills: [
            {
              title: "Android",
              icon: "images/icons/android.svg",
              // description: "Native Android development"
            },
            {
              title: "iOS",
              icon: "images/icons/ios.svg",
              // description: "Cross-platform integration"
            }
          ]
        }
      }
    },
    // ... similar structure for other categories
  }
};

// State
let state = {
  scrambleInterval: null,
  backgroundInterval: null,
  touchCoords: {
    xDown: null,
    yDown: null
  },
  audioEnabled: false,
};

// DOM Helpers
const dom = {
  getOptions: () => document.querySelectorAll('.left-options .option'),
  focusFirstOption: () => document.querySelector('.option:not(:focus)').focus(),
  getOptionTexts: () => document.querySelectorAll('.left-options .option span'),
  getCurrentPage: () => document.querySelector('.visible'),
  getAudioToggle: () => document.querySelector('.audio-toggle'),
  getDarkModeToggle: () => document.querySelector('.dark-toggle'),
  playSound: (soundName, reverse = false) => {
    if (!state.audioEnabled) {
      return;
    }
    const path = `audio/${soundName}${reverse ? '-reverse' : ''}.mp3`
    const audio = new Audio(path);
    audio.volume = 0.5;
    audio.play();
  },
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

    if (index === 1 && !document.querySelector('.skill-tree')) {
      console.log("instantiated tree");
      setTimeout(() => createSkillTree(), 700);
    }

    dom.playSound('select', index < 0);

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
      draggable: true,
    });

    carousel.instance.mount();
    carousel.instance.on('run.before', carousel.handleSlideChange);

    if (dom.isMobile()) {
      const video = document.querySelector('.projects video');
      video.addEventListener('touchstart', (evt) => handlers.touch.start(evt));
      video.addEventListener('touchmove', (evt) => handlers.touch.move(evt));
    }
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

    // Play the swipe sound
    dom.playSound('menu');
    
    // Handle video transition
    video.load();
    setTimeout(() => {
      video.style.setProperty('transition', '0.3s all ease-out');
      video.style.setProperty('opacity', '1');
      video.style.setProperty('transform', mobileUi ? 'rotateX(-5deg)' : 'rotateY(10deg)');
      setTimeout(() => video.play(), 300);
    }, 0);
  },
};

// Utility Functions
function mod(n, m) {
  return ((n % m) + m) % m;
}

function getTouches(evt) {
  return evt.touches || evt.originalEvent.touches;
}

function createNode(title, data) {
  const node = document.createElement('div');
  node.className = 'skill-node';

  // Create icon if provided
  // if (data.icon) {
  //   const icon = document.createElement('img');
  //   icon.src = data.icon;
  //   icon.className = 'skill-node-icon';
  //   icon.alt = `${title} icon`;
  //   node.appendChild(icon);
  // }

  const content = document.createElement('div');
  content.className = 'skill-node-content';

  const titleEl = document.createElement('div');
  titleEl.className = 'skill-node-title';
  titleEl.textContent = title;
  content.appendChild(titleEl);

  if (data.description) {
    const descEl = document.createElement('div');
    descEl.className = 'skill-node-description';
    descEl.textContent = data.description;
    content.appendChild(descEl);
  }

  node.appendChild(content);
  return node;
}

function createSkillTree() {
  const container = document.getElementById('tree');
  container.innerHTML = '';
  const treeElement = document.createElement('div');
  treeElement.className = 'skill-tree';

  // Create nodes for each category
  for (const [category, categoryData] of Object.entries(CONSTANTS.SKILL_TREE)) {
    const categoryElement = createNode(category, categoryData);
    categoryElement.className += ' skill-category';

    // Create branch container
    const branchesContainer = document.createElement('div');
    branchesContainer.className = 'skill-branches';

    // Create nodes for each branch
    for (const [branchName, branchData] of Object.entries(categoryData.branches)) {
      // Create a container for each branch and its skills
      const branchContainer = document.createElement('div');
      branchContainer.className = 'branch-container';

      const branchElement = createNode(branchName, branchData);
      branchContainer.appendChild(branchElement);
      
      // Create skills container
      const skillsContainer = document.createElement('div');
      skillsContainer.className = 'skill-items';

      // Create nodes for each skill
      branchData.skills.forEach(skillData => {
        const skillElement = createNode(skillData.title, {
          icon: skillData.icon,
          description: skillData.description
        });
        skillsContainer.appendChild(skillElement);
      });

      branchContainer.appendChild(skillsContainer);
      branchesContainer.appendChild(branchContainer);
    }

    categoryElement.appendChild(branchesContainer);
    treeElement.appendChild(categoryElement);
  }

  container.appendChild(treeElement);
  
  // Wait for next frame to ensure DOM is updated
  requestAnimationFrame(() => drawConnections());
}

function drawConnections() {
  // Remove existing lines
  document.querySelectorAll('.tree-line').forEach(line => line.remove());

  // Draw lines for each category
  document.querySelectorAll('.skill-category').forEach(category => {
    const categoryNode = category.querySelector('.skill-node-content');
    // const categoryNode = category;
    const branchContainers = category.querySelectorAll('.branch-container');
    
    // If there are multiple branches, draw T-shaped connection from category
    if (branchContainers.length > 1) {
      // Get first and last branch to determine width of horizontal line
      const firstBranch = branchContainers[0].querySelector('.skill-node');
      const lastBranch = branchContainers[branchContainers.length - 1].querySelector('.skill-node');
      drawTConnection(categoryNode, firstBranch, lastBranch);
    }
    
    // Draw individual lines from category to each branch
    branchContainers.forEach(branchContainer => {
      const branchNode = branchContainer.querySelector('.skill-node');
      
      // Draw lines from branch to each skill (leaf nodes)
      const skills = branchContainer.querySelectorAll('.skill-items > .skill-node');
      skills.forEach(skill => {
        drawLine(branchNode, skill);
      });
    });
  });
}

function drawTConnection(startNode, firstEndNode, lastEndNode) {
  const startRect = startNode.getBoundingClientRect();
  const firstEndRect = firstEndNode.getBoundingClientRect();
  const lastEndRect = lastEndNode.getBoundingClientRect();
  const container = document.querySelector('.skill-tree');
  const containerRect = container.getBoundingClientRect();

  // Calculate positions relative to the container
  const startX = startRect.left + (startRect.width / 2) - containerRect.left;
  const startY = startRect.bottom - containerRect.top;
  const firstEndX = firstEndRect.left + (firstEndRect.width / 2) - containerRect.left;
  const lastEndX = lastEndRect.left + (lastEndRect.width / 2) - containerRect.left;
  const endY = firstEndRect.top - containerRect.top;

  // 1. Vertical line from start to horizontal
  const verticalLine = document.createElement('div');
  verticalLine.className = 'tree-line tree-line-vertical';
  verticalLine.style.left = `${startX}px`;
  verticalLine.style.top = `${startY}px`;
  verticalLine.style.height = `${(endY - startY) / 2}px`;
  container.appendChild(verticalLine);

  // 2. Horizontal line connecting all branches
  const horizontalLine = document.createElement('div');
  horizontalLine.className = 'tree-line tree-line-horizontal';
  horizontalLine.style.top = `${startY + (endY - startY) / 2}px`;
  horizontalLine.style.left = `${firstEndX}px`;
  horizontalLine.style.width = `${lastEndX - firstEndX}px`;
  container.appendChild(horizontalLine);

  // 3. Vertical lines from horizontal to each branch
  document.querySelectorAll('.branch-container').forEach(branch => {
    const branchNode = branch.querySelector('.skill-node');
    const branchRect = branchNode.getBoundingClientRect();
    const branchX = branchRect.left + (branchRect.width / 2) - containerRect.left;

    const verticalLine2 = document.createElement('div');
    verticalLine2.className = 'tree-line tree-line-vertical';
    verticalLine2.style.left = `${branchX}px`;
    verticalLine2.style.top = `${startY + (endY - startY) / 2}px`;
    verticalLine2.style.height = `${(endY - startY) / 2}px`;
    container.appendChild(verticalLine2);
  });
}

function drawLine(startNode, endNode) {
  const startRect = startNode.getBoundingClientRect();
  const endRect = endNode.getBoundingClientRect();
  const container = document.querySelector('.skill-tree');
  const containerRect = container.getBoundingClientRect();

  // Calculate positions relative to the container
  const startX = startRect.left + (startRect.width / 2) - containerRect.left;
  const startY = startRect.bottom - containerRect.top;
  const endX = endRect.left + (endRect.width / 2) - containerRect.left;
  const endY = endRect.top - containerRect.top;

  // Create main vertical line from start node
  const verticalLine = document.createElement('div');
  verticalLine.className = 'tree-line tree-line-vertical';
  verticalLine.style.left = `${startX}px`;
  verticalLine.style.top = `${startY}px`;
  
  // If nodes are vertically aligned
  if (Math.abs(startX - endX) < 1) {
    verticalLine.style.height = `${endY - startY}px`;
    container.appendChild(verticalLine);
  } else {
    // For T-shaped connections:
    // 1. Vertical line from start to horizontal
    verticalLine.style.height = `${(endY - startY) / 2}px`;
    container.appendChild(verticalLine);

    // 2. Horizontal line
    const horizontalLine = document.createElement('div');
    horizontalLine.className = 'tree-line tree-line-horizontal';
    horizontalLine.style.top = `${startY + (endY - startY) / 2}px`;
    horizontalLine.style.left = `${Math.min(startX, endX)}px`;
    horizontalLine.style.width = `${Math.abs(endX - startX)}px`;
    container.appendChild(horizontalLine);

    // 3. Vertical line from horizontal to end
    const verticalLine2 = document.createElement('div');
    verticalLine2.className = 'tree-line tree-line-vertical';
    verticalLine2.style.left = `${endX}px`;
    verticalLine2.style.top = `${startY + (endY - startY) / 2}px`;
    verticalLine2.style.height = `${(endY - startY) / 2}px`;
    container.appendChild(verticalLine2);
  }
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Add resize handler
window.addEventListener('resize', debounce(() => drawConnections()));

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

      const xUp = getTouches(evt)[0].clientX;
      const yUp = getTouches(evt)[0].clientY;
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
      }
      carousel.setup();
      Array.from(dom.getOptions()).forEach(el => el.style.setProperty('background-color', 'var(--secondary-color)'));
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
      animations.scrambleText(span, 30);

      const background = event.target.querySelector('.focus-only-background');
      animations.changeBackground(background);
      dom.playSound('button');
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

  // Add audio toggle handler
  const audioToggle = dom.getAudioToggle();
  audioToggle.addEventListener('click', () => {
    state.audioEnabled = !state.audioEnabled;
    const speakerOn = audioToggle.querySelector('.speaker-on');
    const speakerOff = audioToggle.querySelector('.speaker-off');
    speakerOn.style.display = state.audioEnabled ? 'block' : 'none';
    speakerOff.style.display = state.audioEnabled ? 'none' : 'block';
  });

  // Add dark mode toggle handler
  const darkToggle = dom.getDarkModeToggle();
  const root = document.documentElement;
  const toggleDark = () => {
    root.classList.toggle('dark');
    const darkOn = root.querySelector('.dark-on');
    const darkOff = root.querySelector('.dark-off');
    const newMode = root.classList.contains('dark');
    darkOn.style.display = newMode ? 'block' : 'none';
    darkOff.style.display = newMode ? 'none' : 'block';
  }
  const darkModeEnabled = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (darkModeEnabled) {
    toggleDark();
  }
  darkToggle.addEventListener('click', () => {
    toggleDark();
  });

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
