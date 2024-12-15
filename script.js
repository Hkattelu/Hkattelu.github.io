
function getOptions() {
    return document.querySelectorAll(".option");
}

document.addEventListener("DOMContentLoaded", () => {
    const options = getOptions();
  
    options.forEach((box, index) => {
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
    options.forEach((box, index) => {
        box.style.transform = "rotate3d(0, 0, 1, 90deg)";
    });
}

function showOptions() {
    const options = getOptions();
    options.forEach((box, index) => {
        box.removeAttribute('style');
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