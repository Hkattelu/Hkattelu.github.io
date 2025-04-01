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
      color: "var(--tree-core)",
      colorRgb: "var(--tree-core-rgb)",
      skills: [
        {
          title: "System Architecture & Scalability",
          icon: "🛠",
          points: "9/10",
          description: "Architecting distributed systems that scale from zero to millions. Expert in event-driven architectures, database design, and building systems that gracefully handle 10x traffic spikes. <br><br> Battle-tested experience with google scale features and deployments."
        },
        {
          title: "Backend Engineering",
          icon: "⚡",
          points: "10/10",
          description: "Crafting high-performance APIs that handle millions of requests while maintaining sub-100ms response times. Deep expertise in Node.js/TypeScript optimization, async patterns, and building developer-first platforms. <br><br> Known for turning spaghetti code into maintainable systems that spark joy."
        },
        {
          title: "Debugging & Optimization",
          icon: "🔍",
          points: "9/10",
          bonus: "+2 Bonus under pressure",
          description: "The person you want on-call when production is burning. <br><br> Expert at profiling memory leaks, optimizing hot paths, and diving deep into core dumps. <br><br> Have owned incident response for 10+ outages at Youtube."
        },
        {
          title: "Data Engineering & Storage",
          icon: "📊",
          points: "8/10",
          description: "Experience with data modeling to optimize latency for client-facing features. Worked on streaming logs from petabyte-scale storage to google cloud logging customers."
        }
      ]
    },
    "Frontend & Mobile Development": {
      icon: "images/icons/frontend.svg",
      color: "var(--tree-frontend)",
      colorRgb: "var(--tree-frontend-rgb)",
      skills: [
        {
          title: "React & Angular",
          icon: "💻",
          points: "9/10",
          description: "Architecting blazing-fast React applications with sub-second page loads. Expert in Angular/React Components and data store architecture. <br><br> Made this website."
        },
        {
          title: "Mobile App Development",
          icon: "📱",
          points: "8/10",
          bonus: "+1 bonus for rapid prototyping",
          description: "Shipping polished mobile experiences using React Native and Flutter. Expertise in native module development, platform-specific optimizations, and smooth 60fps animations. <br><br> Built and launched features for Youtube on the android and iOS apps with 10k+ active users."
        },
        {
          title: "UI/UX Engineering",
          icon: "🎭",
          points: "8/10",
          bonus: "+2 intuition boost for pixel-perfect designs",
          description: "Bridging the gap between design and engineering with pixel-perfect precision. Expert in advanced CSS animations, WebGL effects, and building design systems that scale. <br><br> Produced detail oriented designs that designers actually approve of on the first try."
        },
        {
          title: "Web Performance Optimization",
          icon: "🕸",
          points: "8/10",
          bonus: "+2 when armed with DevTools",
          description: "Performance optimization wizard who treats 'Latency' as a personal challenge. Experienced with profiling, tracing, bundle size reduction, and progressive enhancement."
        }
      ]
    },
    "AI Integration & Applied ML": {
      icon: "images/icons/ai.svg",
      color: "var(--tree-ai)",
      colorRgb: "var(--tree-ai-rgb)",
      skills: [
        {
          title: "AI-Powered Features",
          icon: "🎯",
          points: "8/10",
          bonus: "Boosted when paired with strong UX intuition",
          description: "Pioneering the integration of LLMs into production applications. Expert in prompt engineering, context window optimization, and building AI-powered features that feel magical yet reliable."
        },
        {
          title: "ML Quality",
          icon: "🧠",
          points: "7/10",
          bonus: "+2 for fine-tuning prompts",
          description: "Transforming raw AI capabilities into polished product features. <br><br> Worked on ML quality for a major user facing feature on Youtube. <br><br> Can make LLMs put out natural responses that are actually helpful instead of robotic."
        },
        {
          title: "AI API Optimization & Cost Control",
          icon: "📡",
          points: "7/10",
          bonus: "+1 when dealing with high-traffic apps",
          description: "Expertise in AI cost optimization. Implemented clever caching strategies and request batching to make AI cost actually cost efficient, instead of a money sink."
        }
      ]
    },
    "Service Reliability & DevOps": {
      icon: "images/icons/devops.svg",
      color: "var(--tree-devops)",
      colorRgb: "var(--tree-devops-rgb)",
      skills: [
        {
          title: "Site Reliability Engineering",
          icon: "🛡",
          points: "9/10",
          bonus: "Extra resilience against on-call fatigue",
          description: "I live for those 3 AM production incidents where everything's on fire and someone needs to stay cool. <br><br> I really enjoy making sure everything is monitored and has configured alerting. When systems break, I don't just fix them - I make sure they never break the same way twice."
        },
        {
          title: "Root cause analysis",
          icon: "🌀",
          points: "7/10",
          bonus: "+2 bonus from past outage lessons",
          description: "I like breaking things! It really helps with designing things that don't break. <br><br> Expert in failure injection, resilience testing, and building systems that gracefully degrade instead of crash."
        },
        {
          title: "CI/CD & DevOps",
          icon: "🚀",
          points: "8/10",
          bonus: "+1 agility for multiple daily deploys",
          description: "If it moves, I automate it. If it doesn't move, I automate it anyway. <br><br> A good pipeline is one that is so smooth you forget its even running. 
        }
      ]
    },
    "Leadership & Soft Skills": {
      icon: "images/icons/leadership.svg",
      color: "var(--tree-leadership)",
      colorRgb: "var(--tree-leadership-rgb)",
      skills: [
        {
          title: "Fast Iteration & Execution",
          icon: "🎯",
          points: "10/10",
          description: "Speed isn't about rushing - it's about knowing where to focus. <br><br> I've broken down many impossible projects into roadmaps with progressive bite-sized wins. <br><br> I work with decision makers to prioritize to know exactly which corners are safe to cut, and which ones will come back to haunt you at 3 AM."
        },
        {
          title: "Product Thinking",
          icon: "🧩",
          points: "9/10",
          bonus: "+1 buff with caffeine",
          description: "I'm a product-minded engineer who thinks in user stories, not just in technical specs. <br><br> My superpower is finding the sweet spot between technical excellence and business value. <br><br> Build solutions, not features."
        },
        {
          title: "Cross-Team Collaboration",
          icon: "🤝",
          points: "8/10",
          description: "Need someone to get design, engineering, and product teams speaking the same language? That's me. <br><br> I turn cross-team projects from coordination nightmares into smooth collaborations. <br><br> It's impossible to get everyone to agree on a direction, but i can get pretty close."
        },
        {
          title: "Tech Direction & Strategy",
          icon: "📢",
          points: "9/10",
          description: "I've got a knack for seeing around technical corners. <br><br> My architectural decisions aren't just about solving today's problems - they're about being ready for tomorrow's challenges. <br><br> I help teams dodge over-engineering while still building for scale."
        },
        {
          title: "Mentorship & Team Growth",
          icon: "🧑‍🏫",
          points: "9/10",
          bonus: "Bonus charisma for pair programming",
          description: "Teaching is my secret addiction. <br><br> I create environments where junior engineers can safely make mistakes and learn from them. <br><br> My code reviews are like mini-mentoring sessions, and somehow I manage to keep technical discussions both educational and entertaining."
        }
      ]
    },
    "Bonus Talents": {
      icon: "images/icons/bonus.svg", 
      color: "var(--tree-bonus)",
      colorRgb: "var(--tree-bonus-rgb)",
      skills: [
        {
          title: "CrossFit Endurance",
          icon: "💪",
          points: "7/10",
          bonus: "+2 stamina when caffeinated",
          description: "Who says engineers can't do double-unders? <br><br> I bring the same obsessive optimization mindset from coding to CrossFit. <br><br> The endorphins actually help with coding and debugging."
        },
        {
          title: "Poi Spinning Mastery",
          icon: "🌀",
          points: "8/10",
          bonus: "Extra dexterity at music festivals",
          description: "Flow arts aren't just pretty lights - they're physics in motion. <br><br> I approach poi spinning like I approach coding: break down complex patterns, practice the fundamentals, then add your own style. <br><br> Yes, I can code and spin fire. No, I haven't tried doing both at once."
        },
        {
          title: "Content Creation",
          icon: "🎥",
          points: "7/10",
          bonus: "+3 boost for late-night creative sprints",
          description: "Tech storyteller who makes complex concepts accessible and entertaining. I love talking about video games, but I also dabble in math tutorials"
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
    
    tab.appendChild(iconElem);
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
  // Add the skill tree to the page
  skillsContainer.appendChild(skillTree);
  
  // Render the first skill tree by default
  renderSkillTree(Object.keys(CONSTANTS.SKILL_TREE_DATA)[0], CONSTANTS.SKILL_TREE_DATA[Object.keys(CONSTANTS.SKILL_TREE_DATA)[0]]);
  
  // Function to render a specific skill tree
  function renderSkillTree(category, categoryData) {
    const treeContainer = document.querySelector('.skill-tree-visualization');
    treeContainer.innerHTML = '';
    treeContainer.className = 'skill-tree-visualization visible';
    
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
      
      // Create the node circle
      const nodeCircle = document.createElement('div');
      nodeCircle.className = 'node-circle';
      
      // Add the skill icon
      const iconElem = document.createElement('div');
      iconElem.className = 'skill-icon';
      iconElem.textContent = skill.icon;
      
      // Add skill title
      const titleElem = document.createElement('div');
      titleElem.className = 'skill-title';
      titleElem.textContent = skill.title;
      
      // Assemble the node circle
      nodeCircle.appendChild(iconElem);
      nodeCircle.appendChild(titleElem);
      
      // Add skill level indicator (outside the circle)
      const levelElem = document.createElement('div');
      levelElem.className = 'skill-level';
      const points = parseInt(skill.points.split('/')[0]);
      for (let i = 0; i < 10; i++) {
        const levelPoint = document.createElement('div');
        levelPoint.className = `level-point ${i < points ? 'filled' : ''}`;
        levelElem.appendChild(levelPoint);
      }
      
      // Assemble the complete node
      node.appendChild(nodeCircle);
      node.appendChild(levelElem);
      
      // Handle node click to show skill details
      nodeCircle.addEventListener('click', () => {
        // Remove active class from all nodes
        document.querySelectorAll('.skill-node').forEach(n => n.classList.remove('active'));
        // Add active class to clicked node
        node.classList.add('active');
        
        // Update the skill detail panel
        const detailContent = document.querySelector('.skills .text-section');
        detailContent.innerHTML = `
          <h3>${skill.title} <span class="skill-icon">${skill.icon}</span></h3>
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
    skillNodes.appendChild(lineContainer);

    // Wait longer for rendering and use a more robust approach for connections
    setTimeout(() => {
      const nodeCircles = skillNodes.querySelectorAll('.node-circle');
      if (nodeCircles.length <= 1) return;
      
      // Get positions of all nodes first
      const nodePositions = Array.from(nodeCircles).map(node => {
        const rect = node.getBoundingClientRect();
        return {
          node: node,
          rect: rect,
          center: {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
          }
        };
      });
      
      // Sort nodes by their vertical position first, then horizontal
      // This helps identify rows in the layout
      nodePositions.sort((a, b) => {
        // If nodes are roughly in the same row (within 30px), sort by X
        if (Math.abs(a.center.y - b.center.y) < 30) {
          return a.center.x - b.center.x;
        }
        // Otherwise sort by Y to group rows
        return a.center.y - b.center.y;
      });
      
      // Get container rect for relative positioning
      const containerRect = skillNodes.getBoundingClientRect();
      
      // Group nodes into rows based on Y position
      const rows = [];
      let currentRow = [nodePositions[0]];
      
      for (let i = 1; i < nodePositions.length; i++) {
        const prevNode = nodePositions[i-1];
        const currNode = nodePositions[i];
        
        // If Y position is similar, add to same row
        if (Math.abs(currNode.center.y - prevNode.center.y) < 30) {
          currentRow.push(currNode);
        } else {
          // Start a new row
          rows.push([...currentRow]);
          currentRow = [currNode];
        }
      }
      
      // Add the last row
      if (currentRow.length > 0) {
        rows.push(currentRow);
      }
      
      let connIndex = 0;
      
      // Connect nodes within each row
      rows.forEach(row => {
        for (let i = 0; i < row.length - 1; i++) {
          createConnection(row[i], row[i + 1], connIndex++, containerRect);
        }
      });
      
      // Improved inter-row connections - ensure every node in second row has a connection
      if (rows.length > 1) {
        const firstRow = rows[0];
        
        // For each row after the first
        for (let r = 1; r < rows.length; r++) {
          const currentRow = rows[r];
          const prevRow = rows[r-1];
          
          // Make sure each node in this row has at least one connection to the row above
          currentRow.forEach((node, nodeIndex) => {
            // Find the closest node in the previous row
            let bestPrevNode = null;
            let bestScore = Infinity;
            
            prevRow.forEach(prevNode => {
              // Calculate slope between nodes
              const xDiff = node.center.x - prevNode.center.x;
              const yDiff = node.center.y - prevNode.center.y;
              const slope = yDiff !== 0 ? xDiff / yDiff : 0;
              
              // Only consider connections with negative or zero slope
              // (going down-left, straight down, or down-right)
              if (yDiff > 0) {  // Ensures we're going downward
                // Score based on horizontal distance, preferring closer nodes
                const score = Math.abs(xDiff);
                if (score < bestScore) {
                  bestScore = score;
                  bestPrevNode = prevNode;
                }
              }
            });
            
            // Create the connection if we found a valid previous node
            if (bestPrevNode) {
              createConnection(bestPrevNode, node, connIndex++, containerRect);
            }
          });
        }
      }
      
      // Helper function to create a connection between node positions
      function createConnection(pos1, pos2, index, containerRect) {
        const startX = pos1.center.x - containerRect.left;
        const startY = pos1.center.y - containerRect.top;
        const endX = pos2.center.x - containerRect.left;
        const endY = pos2.center.y - containerRect.top;
        
        const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
        const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;
        
        const line = document.createElement('div');
        line.className = 'skill-connection';
        line.style.left = `${startX}px`;
        line.style.top = `${startY}px`;
        line.style.width = `${length}px`;
        line.style.transform = `rotate(${angle}deg)`;
        line.style.setProperty('--index', index);
        
        lineContainer.appendChild(line);
      }
    }, 200); // Longer timeout to ensure rendering completes
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
