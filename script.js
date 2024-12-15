document.addEventListener("DOMContentLoaded", () => {
    const boxes = document.querySelectorAll(".box");
  
    boxes.forEach((box, index) => {
      setTimeout(() => {
        box.style.transform = "translateY(0)";
        box.style.opacity = "1";
        box.style.transition = "transform 1s ease-out, opacity 1s ease-out";
      }, index * 500); // Delay each box's animation
    });
  
    // Initial offset
    boxes.forEach(box => {
        box.style.transform = "translateY(-200vh)";
    });
});
