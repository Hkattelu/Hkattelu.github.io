const pageMap = {
    "-1": "home",
    "0": "welcome",
    "1": "about-me",
    "2": "what-i-value",
    "3": "projects",
    "4": "contact",
    "5": "blog",
    "6": "credits",
}

function getOptions() {
    return document.querySelectorAll(".option");
}

function hideOptions() {
    const options = getOptions();
    options.forEach((box) => {
        box.style['transition-delay'] = "0s";
        box.style.transform = "rotate3d(0, 0, 1, 90deg)";
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

      box.addEventListener('keypress', function(event) {
        hideOptions();
        showPage(index);
      });
    });
});
document.addEventListener('keydown', function(event) {
    if (event.key === 'Backspace' || event.key === 'Escape') {
      showOptions();
      backToHome();
    }
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      if (!document.activeElement.tagName === 'span') {
        document.querySelector('span:not(:focus)').focus();
      } else {
        event.preventDefault();
      }
    }
  });