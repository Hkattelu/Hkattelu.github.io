
function getOptions() {
    return document.querySelectorAll(".option");
}

document.addEventListener("DOMContentLoaded", () => {
    const options = getOptions();
  
    options.forEach((box) => {
      box.addEventListener('click', function(event) {
        hideOptions();
      });

      box.addEventListener('keypress', function(event) {
        hideOptions();
      });
    });


    // Render the controls.
    const controls = document.querySelector(".controls");
});

function hideOptions() {
    const options = getOptions();
    options.forEach((box) => {
        box.style['transition-delay'] = "0s";
        box.style.transform = "rotate3d(0, 0, 1, 90deg)";
    });

    const background = document.querySelector(".background");
    background.style['transition-delay'] = "var(--base-transition-duration)";
    background.style.transform = "rotate3d(0, 0, 1, 90deg)";

    const controls = document.querySelector(".controls");
    controls.style.display = "none";
}

function showOptions() {
    const background = document.querySelector(".background");
    background.style['transition-delay'] = "0s";
    background.style.transform = '';

    const options = getOptions();
    options.forEach((box) => {
        box.style['transition-delay'] = "var(--base-transition-duration)";
        box.style.transform = '';
    });
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Backspace' || event.key === 'Escape') {
      // Do something here
      showOptions();
    }
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      if (!document.activeElement.classList.contains('option')) {
        document.querySelector('.option:not(:focus)').focus();
      }
    }
  });