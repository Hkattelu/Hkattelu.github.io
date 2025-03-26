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
          description: "<b>System Architecture & Scalability</b> involves designing robust systems that can handle massive user loads without faltering. At YouTube, I played a pivotal role in architecting distributed systems that support millions of concurrent users, ensuring seamless video streaming experiences. My work focused on optimizing system performance and scalability, allowing YouTube to deliver high-quality content globally."
        },
        {
          title: "Backend Engineering",
          icon: "⚡",
          points: "10/10",
          description: "<b>Backend Engineering</b> is the backbone of any application, and my expertise lies in building APIs and microservices that are both scalable and developer-friendly. At YouTube, I contributed to the development of backend solutions that power features like video recommendations and user interactions, ensuring they are fast, reliable, and easy to maintain."
        },
        {
          title: "Debugging & Optimization",
          icon: "🔍",
          points: "9/10",
          bonus: "+2 Bonus under pressure",
          description: "<b>Debugging & Optimization</b> is about identifying and resolving performance bottlenecks. My experience at YouTube taught me to hunt down elusive bugs and optimize code for maximum efficiency. Whether it's improving load times or reducing server response times, I excel at squeezing every last drop of performance out of complex systems."
        },
        {
          title: "Data Engineering & Storage",
          icon: "📊",
          points: "8/10",
          description: "<b>Data Engineering & Storage</b> involves managing vast amounts of data efficiently. At YouTube, I designed data pipelines and storage solutions that handle terabytes of data daily, ensuring data integrity and accessibility. My work ensures that data-driven features like analytics and recommendations are both accurate and timely."
        }
      ]
    },
    "Frontend & Mobile Development": {
      icon: "images/icons/frontend.svg",
      color: "var(--tree-frontend)",
      colorRgb: "var(--tree-frontend-rgb)",
      skills: [
        {
          title: "React & Next.js",
          icon: "💻",
          points: "9/10",
          description: "<b>React & Next.js</b> are my go-to tools for building sleek, responsive frontends. At YouTube, I crafted user interfaces that are not only visually appealing but also highly functional. My work ensures that users have a seamless experience, whether they're watching videos or interacting with the platform's features."
        },
        {
          title: "Mobile App Development",
          icon: "📱",
          points: "8/10",
          bonus: "+1 bonus for rapid prototyping",
          description: "<b>Mobile App Development</b> is about bringing ideas to life on iOS and Android. At YouTube, I developed mobile experiences that are smooth and performant, using technologies like React Native and Flutter. My focus is on creating apps that are intuitive and engaging, enhancing the overall user experience."
        },
        {
          title: "UI/UX Engineering",
          icon: "🎭",
          points: "8/10",
          bonus: "+2 intuition boost for pixel-perfect designs",
          description: "<b>UI/UX Engineering</b> is the art of balancing aesthetics and usability. At YouTube, I worked closely with designers to create interfaces that are both beautiful and functional. My goal is to ensure that every user interaction is intuitive and enjoyable, avoiding the pitfalls of complex or confusing designs."
        },
        {
          title: "Web Performance Optimization",
          icon: "🕸",
          points: "8/10",
          bonus: "+2 when armed with DevTools",
          description: "<b>Web Performance Optimization</b> is crucial for delivering fast, responsive websites. At YouTube, I optimized web performance to ensure that pages load quickly and animations are smooth. My work involves using tools like DevTools to identify and resolve performance issues, providing users with a seamless browsing experience."
        }
      ]
    },
    "AI Integration & Applied ML": {
      icon: "images/icons/ai.svg",
      color: "var(--tree-ai)",
      colorRgb: "var(--tree-ai-rgb)",
      skills: [
        {
          title: "LLMs",
          icon: "🧠",
          points: "8/10",
          bonus: "+2 for fine-tuning prompts",
          description: "<b>LLMs</b> (Large Language Models) are at the forefront of AI innovation. At YouTube, I integrated AI into products to make them smarter and more intuitive. My work involves fine-tuning prompts to ensure that AI features like chatbots and recommendation engines deliver accurate and helpful responses, enhancing user engagement."
        },
        {
          title: "AI-Powered Features",
          icon: "🎯",
          points: "7/10",
          bonus: "Boosted when paired with strong UX intuition",
          description: "<b>AI-Powered Features</b> are transforming the way users interact with technology. At YouTube, I built features like intelligent automation and recommendation engines that leverage AI/ML models. My focus is on creating AI solutions that are both powerful and user-friendly, providing value to users while maintaining a seamless experience."
        },
        {
          title: "AI API Optimization & Cost Control",
          icon: "📡",
          points: "7/10",
          bonus: "+1 when dealing with high-traffic apps",
          description: "<b>AI API Optimization & Cost Control</b> is about balancing performance and cost. At YouTube, I optimized AI APIs to ensure low-latency, high-accuracy responses while keeping costs reasonable. My work involves monitoring and adjusting API usage to meet the demands of high-traffic applications without compromising on quality."
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
          description: "<b>Site Reliability Engineering</b> ensures that systems are up and running 24/7. At YouTube, I implemented reliability frameworks that prevent downtime and minimize disruptions. My work involves proactive monitoring and incident response, ensuring that users have a consistent and reliable experience."
        },
        {
          title: "Monitoring & Observability",
          icon: "📊",
          points: "8/10",
          bonus: "+2 foresight with proper dashboards",
          description: "<b>Monitoring & Observability</b> provide insights into system performance. At YouTube, I developed dashboards and alerts that help identify issues before they impact users. My focus is on creating tools that provide real-time visibility into system health, enabling quick and effective responses to potential problems."
        },
        {
          title: "Chaos Engineering & Load Testing",
          icon: "🌀",
          points: "7/10",
          bonus: "+2 bonus from past outage lessons",
          description: "<b>Chaos Engineering & Load Testing</b> involve testing systems under stress to ensure resilience. At YouTube, I conducted experiments that simulate real-world conditions, identifying weaknesses and improving system robustness. My work helps ensure that services remain stable and performant, even under unexpected loads."
        },
        {
          title: "CI/CD & DevOps",
          icon: "🚀",
          points: "8/10",
          bonus: "+1 agility for multiple daily deploys",
          description: "<b>CI/CD & DevOps</b> streamline the development and deployment process. At YouTube, I automated pipelines to enable rapid, reliable releases. My work involves managing infrastructure as code and ensuring that deployments are smooth and error-free, allowing teams to focus on innovation rather than manual processes."
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
          description: "<b>Fast Iteration & Execution</b> is about delivering results quickly without sacrificing quality. At YouTube, I led projects that required rapid prototyping and deployment, balancing speed with precision. My approach ensures that products are delivered on time and meet the highest standards of excellence."
        },
        {
          title: "Product Thinking",
          icon: "🧩",
          points: "9/10",
          bonus: "+1 buff with caffeine",
          description: "<b>Product Thinking</b> involves aligning engineering decisions with business goals. At YouTube, I asked the right questions to ensure that features meet user needs and drive business success. My focus is on creating products that are not only technically sound but also strategically valuable."
        },
        {
          title: "Cross-Team Collaboration",
          icon: "🤝",
          points: "8/10",
          description: "<b>Cross-Team Collaboration</b> is key to successful project delivery. At YouTube, I bridged the gap between engineers, designers, and product managers, fostering a collaborative environment. My work ensures that all stakeholders are aligned and working towards a common goal, resulting in cohesive and effective solutions."
        },
        {
          title: "Tech Direction & Strategy",
          icon: "📢",
          points: "9/10",
          description: "<b>Tech Direction & Strategy</b> guide teams through complex technical decisions. At YouTube, I provided leadership and vision, helping teams navigate challenges with clarity and confidence. My focus is on setting a strategic direction that aligns with organizational goals and drives innovation."
        },
        {
          title: "Mentorship & Team Growth",
          icon: "🧑‍🏫",
          points: "9/10",
          bonus: "Bonus charisma for pair programming",
          description: "<b>Mentorship & Team Growth</b> are about nurturing talent and fostering a culture of learning. At YouTube, I guided junior engineers, providing support and encouragement. My approach is to create an environment where team members feel empowered to grow and succeed, without fear of failure."
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
          description: "<b>CrossFit Endurance</b> is about pushing physical limits, much like tackling challenging engineering problems. My dedication to fitness mirrors my approach to work: persistent, disciplined, and always striving for improvement. This mindset helps me maintain focus and energy, even during the most demanding projects."
        },
        {
          title: "Poi Spinning Mastery",
          icon: "🌀",
          points: "8/10",
          bonus: "Extra dexterity at music festivals",
          description: "<b>Poi Spinning Mastery</b> combines creativity and precision, much like software engineering. My passion for poi spinning reflects my ability to balance technical skills with artistic expression, bringing a unique perspective to problem-solving and innovation in my engineering career."
        },
        {
          title: "Content Creation",
          icon: "🎥",
          points: "7/10",
          bonus: "+3 boost for late-night creative sprints",
          description: "<b>Content Creation</b> is about storytelling and sharing knowledge. At YouTube, I leveraged my skills to break down complex technical topics into engaging content. My focus is on making technology accessible and inspiring others to explore and learn, much like a game trailer narrator captivates an audience."
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
          
          // Make sure each node in this row has at least one connection to the row above
          currentRow.forEach((node, nodeIndex) => {
            // Find the closest node in the previous row
            const prevRow = rows[r-1];
            
            // Default to connecting to the middle node of the previous row
            let closestPrevNode = prevRow[Math.floor(prevRow.length / 2)];
            let closestDistance = Infinity;
            
            // But try to find a better match based on X-position
            prevRow.forEach(prevNode => {
              const xDistance = Math.abs(prevNode.center.x - node.center.x);
              if (xDistance < closestDistance) {
                closestDistance = xDistance;
                closestPrevNode = prevNode;
              }
            });
            
            // Create the connection
            createConnection(closestPrevNode, node, connIndex++, containerRect);
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
