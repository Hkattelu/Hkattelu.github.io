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
  // Create and render the skill tree in the skills page
  SKILL_TREE_DATA: {
    "Core Engineering Mastery": {
      icon: "images/icons/engineering.svg",
      color: "#4e54c8",
      skills: [
        {
          title: "System Architecture & Scalability",
          icon: "🛠",
          points: "9/10",
          description: "Designing and optimizing high-performance, distributed systems that don't collapse under pressure."
        },
        {
          title: "Backend Engineering",
          icon: "⚡",
          points: "10/10",
          description: "Building APIs, microservices, and scalable backend solutions that developers actually enjoy working with."
        },
        {
          title: "Debugging & Optimization",
          icon: "🔍",
          points: "9/10",
          bonus: "+2 Bonus under pressure",
          description: "Hunting down elusive bugs and squeezing every last drop of performance out of systems."
        },
        {
          title: "Data Engineering & Storage",
          icon: "📊",
          points: "8/10",
          description: "Designing efficient data pipelines, managing databases, and making sure things don't catch fire under high load."
        }
      ]
    },
    "Frontend & Mobile Development": {
      icon: "images/icons/frontend.svg",
      color: "#ff6b6b",
      skills: [
        {
          title: "React & Next.js",
          icon: "💻",
          points: "9/10",
          description: "Crafting sleek, responsive, and maintainable frontends that don't make designers cry."
        },
        {
          title: "Mobile App Development",
          icon: "📱",
          points: "8/10",
          bonus: "+1 bonus for rapid prototyping",
          description: "Bringing ideas to life on iOS & Android with smooth, performant mobile experiences using React Native and Flutter."
        },
        {
          title: "UI/UX Engineering",
          icon: "🎭",
          points: "8/10",
          bonus: "+2 intuition boost for pixel-perfect designs",
          description: "Striking the perfect balance between aesthetics and usability without falling into CSS purgatory."
        },
        {
          title: "Web Performance Optimization",
          icon: "🕸",
          points: "8/10",
          bonus: "+2 when armed with DevTools",
          description: "Making sites load fast, stay responsive, and avoid janky animations."
        }
      ]
    },
    "AI Integration & Applied ML": {
      icon: "images/icons/ai.svg",
      color: "#5f27cd",
      skills: [
        {
          title: "Large Language Model (LLM) APIs",
          icon: "🧠",
          points: "8/10",
          bonus: "+2 for fine-tuning prompts",
          description: "Integrating AI into products to make them smarter, more intuitive, and just a little bit magical."
        },
        {
          title: "AI-Powered Features",
          icon: "🎯",
          points: "7/10",
          bonus: "Boosted when paired with strong UX intuition",
          description: "Building chatbots, recommendation engines, and intelligent automation using AI/ML models."
        },
        {
          title: "AI API Optimization & Cost Control",
          icon: "📡",
          points: "7/10",
          bonus: "+1 when dealing with high-traffic apps",
          description: "Keeping AI costs reasonable while ensuring low-latency, high-accuracy responses."
        }
      ]
    },
    "Service Reliability & DevOps": {
      icon: "images/icons/devops.svg",
      color: "#20bf6b",
      skills: [
        {
          title: "Site Reliability Engineering",
          icon: "🛡",
          points: "9/10",
          bonus: "Extra resilience against on-call fatigue",
          description: "Ensuring systems are up, running, and not waking people up at 3 AM."
        },
        {
          title: "Monitoring & Observability",
          icon: "📊",
          points: "8/10",
          bonus: "+2 foresight with proper dashboards",
          description: "Seeing into the matrix of production systems to catch issues before they explode."
        },
        {
          title: "Chaos Engineering & Load Testing",
          icon: "🌀",
          points: "7/10",
          bonus: "+2 bonus from past outage lessons",
          description: "Breaking things (on purpose) to make services resilient under real-world conditions."
        },
        {
          title: "CI/CD & DevOps",
          icon: "🚀",
          points: "8/10",
          bonus: "+1 agility for multiple daily deploys",
          description: "Automating deployments, managing infrastructure as code, and keeping pipelines smooth."
        }
      ]
    },
    "Startup & Leadership": {
      icon: "images/icons/leadership.svg",
      color: "#f7b731",
      skills: [
        {
          title: "Fast Iteration & Execution",
          icon: "🎯",
          points: "10/10",
          description: "Balancing speed and quality while shipping products at a startup pace without losing sanity."
        },
        {
          title: "Product Thinking",
          icon: "🧩",
          points: "9/10",
          bonus: "+1 buff with caffeine",
          description: "Asking the right questions to ensure engineering decisions align with business goals and user needs."
        },
        {
          title: "Cross-Team Collaboration",
          icon: "🤝",
          points: "8/10",
          description: "Bridging the gap between engineers, designers, and product folks like a true diplomatic envoy."
        },
        {
          title: "Tech Direction & Strategy",
          icon: "📢",
          points: "9/10",
          description: "Helping teams navigate technical decisions with clarity and conviction."
        },
        {
          title: "Mentorship & Team Growth",
          icon: "🧑‍🏫",
          points: "9/10",
          bonus: "Bonus charisma for pair programming",
          description: "Guiding junior engineers and fostering a culture of learning without making them fear code reviews."
        }
      ]
    },
    "Bonus Talents": {
      icon: "images/icons/bonus.svg", 
      color: "#eb3b5a",
      skills: [
        {
          title: "CrossFit Endurance",
          icon: "💪",
          points: "7/10",
          bonus: "+2 stamina when caffeinated",
          description: "Surviving intense workouts that somehow feel harder than debugging race conditions."
        },
        {
          title: "Poi Spinning Mastery",
          icon: "🌀",
          points: "8/10",
          bonus: "Extra dexterity at music festivals",
          description: "Juggling fire (literally) and LED poi like a performance artist-slash-software engineer hybrid."
        },
        {
          title: "Content Creation",
          icon: "🎥",
          points: "7/10",
          bonus: "+3 boost for late-night creative sprints",
          description: "Breaking down technical topics and storytelling with the enthusiasm of a game trailer narrator."
        }
      ]
    }
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
      }, durationMs + 200);
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

// Create and render the skill tree in the skills page
function createSkillTree() {
  const skillsContainer = document.querySelector('.skills .content');
  if (!skillsContainer || document.querySelector('.skill-tree')) return;

  // Create the main skill tree container
  const skillTree = document.createElement('div');
  skillTree.className = 'skill-tree';
  
  // Create category tabs for navigation
  const categoryTabs = document.createElement('div');
  categoryTabs.className = 'skill-tree-tabs';
  
  // Create tabs for each skill category
  Object.keys(CONSTANTS.SKILL_TREE_DATA).forEach((category, index) => {
    const tab = document.createElement('div');
    tab.className = `skill-tab ${index === 0 ? 'active' : ''}`;
    tab.dataset.category = category;
    
    const categoryData = CONSTANTS.SKILL_TREE_DATA[category];
    
    // Use an emoji or an icon
    const iconElem = document.createElement('span');
    iconElem.className = 'tab-icon';
    if (categoryData.icon.includes('images/')) {
      iconElem.innerHTML = `<img src="${categoryData.icon}" alt="${category}">`;
    } else {
      iconElem.textContent = categoryData.icon;
    }
    
    const labelElem = document.createElement('span');
    labelElem.className = 'tab-label';
    labelElem.textContent = category;
    
    tab.appendChild(iconElem);
    tab.appendChild(labelElem);
    
    tab.addEventListener('click', () => {
      // Remove active class from all tabs
      document.querySelectorAll('.skill-tab').forEach(t => t.classList.remove('active'));
      // Add active class to clicked tab
      tab.classList.add('active');
      // Update the displayed skill tree
      renderSkillTree(category, CONSTANTS.SKILL_TREE_DATA[category]);
      // Play a selection sound
      dom.playSound('select');
    });
    
    categoryTabs.appendChild(tab);
  });
  
  skillTree.appendChild(categoryTabs);
  
  // Create the skill tree visualization container
  const treeVisualization = document.createElement('div');
  treeVisualization.className = 'skill-tree-visualization';
  skillTree.appendChild(treeVisualization);
  
  // Create the skill detail panel
  const skillDetail = document.createElement('div');
  skillDetail.className = 'skill-detail';
  skillDetail.innerHTML = '<div class="skill-detail-content">' + 
    '<h3>Select a skill to view details</h3>' +
    '<p>Click on any skill node to see more information about that skill.</p>' +
    '</div>';
  skillTree.appendChild(skillDetail);
  
  // Add the skill tree to the page
  skillsContainer.appendChild(skillTree);
  
  // Render the first skill tree by default
  renderSkillTree(Object.keys(CONSTANTS.SKILL_TREE_DATA)[0], CONSTANTS.SKILL_TREE_DATA[Object.keys(CONSTANTS.SKILL_TREE_DATA)[0]]);
  
  // Function to render a specific skill tree
  function renderSkillTree(category, categoryData) {
    const treeContainer = document.querySelector('.skill-tree-visualization');
    treeContainer.innerHTML = '';
    treeContainer.style.setProperty('--tree-color', categoryData.color);
    
    const treeTitle = document.createElement('h2');
    treeTitle.className = 'tree-title';
    treeTitle.textContent = category;
    treeContainer.appendChild(treeTitle);
    
    const skillNodes = document.createElement('div');
    skillNodes.className = 'skill-nodes';
    
    // Create skill nodes in the tree
    categoryData.skills.forEach((skill, index) => {
      const node = document.createElement('div');
      node.className = 'skill-node';
      node.style.setProperty('--delay', `${index * 0.1}s`);
      
      // Add the skill icon
      const iconElem = document.createElement('div');
      iconElem.className = 'skill-icon';
      iconElem.textContent = skill.icon;
      
      // Add skill level indicator (like a progress bar or stars)
      const levelElem = document.createElement('div');
      levelElem.className = 'skill-level';
      const points = parseInt(skill.points.split('/')[0]);
      for (let i = 0; i < 10; i++) {
        const levelPoint = document.createElement('div');
        levelPoint.className = `level-point ${i < points ? 'filled' : ''}`;
        levelElem.appendChild(levelPoint);
      }
      
      // Add skill title
      const titleElem = document.createElement('div');
      titleElem.className = 'skill-title';
      titleElem.textContent = skill.title;
      
      node.appendChild(iconElem);
      node.appendChild(titleElem);
      node.appendChild(levelElem);
      
      // Handle node click to show skill details
      node.addEventListener('click', () => {
        // Remove active class from all nodes
        document.querySelectorAll('.skill-node').forEach(n => n.classList.remove('active'));
        // Add active class to clicked node
        node.classList.add('active');
        
        // Update the skill detail panel
        const detailContent = document.querySelector('.skill-detail-content');
        detailContent.innerHTML = `
          <h3>${skill.title} <span class="skill-icon">${skill.icon}</span></h3>
          <div class="skill-rating">
            <span class="points">Skill Points: ${skill.points}</span>
            ${skill.bonus ? `<span class="bonus">${skill.bonus}</span>` : ''}
          </div>
          <p>${skill.description}</p>
        `;
        
        // Show connected skill lines by adding a class
        node.classList.add('selected');
        
        // Play a selection sound
        dom.playSound('button');
      });
      
      skillNodes.appendChild(node);
    });
    
    treeContainer.appendChild(skillNodes);
    
    // Add connecting lines between nodes
    const lineContainer = document.createElement('div');
    lineContainer.className = 'skill-lines';
    treeContainer.appendChild(lineContainer);
    
    // Animate the skill tree entrance
    setTimeout(() => {
      treeContainer.classList.add('visible');
    }, 100);
  }
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
      .every(video => video.readyState >= 2);
      
    if (allLoaded) startApp();
  };
  
  // Start app once videos are loaded
  if (Array.from(videos).every(video => video.readyState >= 2)) {
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
