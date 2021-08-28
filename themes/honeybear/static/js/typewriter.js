(function () {
  const text = [
    "Everyday Family Meals",
    "Everyday Quality Ingredients",
    "Everyday Quick-E-Recipes",
  ];
  const subtitle = document.getElementById("subtitle");
  const cursor = document.getElementById("cursor");
  let charIndex = 0;
  let arrayIndex = 0;
  let delay = 25;
  let eraseDelay = 25;
  let resetDelay = 2000;

  function setCursor() {
    setInterval(() => {
      cursor.classList.toggle("active");
    }, 500);
  }

  function type() {
    let textArray = text[arrayIndex].split("");
    if (charIndex < textArray.length) {
      subtitle.innerHTML += textArray[charIndex];
      charIndex++;
      if (charIndex >= textArray.length) {
        return setTimeout(erase, resetDelay);
      }
    }
    setTimeout(type, delay);
  }

  function erase() {
    let textArray = text[arrayIndex];
    if (charIndex > 0) {
      subtitle.innerHTML = textArray.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex <= 0) {
        arrayIndex >= text.length - 1 ? (arrayIndex = 0) : arrayIndex++;
        return setTimeout(type, resetDelay);
      }
      setTimeout(erase, eraseDelay);
    }
  }

  type();
  setCursor();
})();

const resetSlides = (slides) => {
    slides.forEach(slide => {slide.classList.remove('active')})
}

const slider = () => {
    let slides = document.querySelectorAll('.bgImg')
    let slideIndex = slides.length - 1;
    let duration = 7000
    setInterval(() => {
    resetSlides(slides);
    if (slideIndex > slides.length - 1) {
        slideIndex = 0;
        slides[slideIndex].classList.add('active')
    } else {
        slides[slideIndex].classList.add('active')
        slideIndex++;
    }
    }, duration) 
}

window.addEventListener('load', () => {
  slider()
})


