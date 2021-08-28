const boxes = document.querySelectorAll(".blog-card");
const recipes = document.querySelectorAll(".card");

document.body.addEventListener("scroll", checkBoxes);

// checkBoxes()

function checkBoxes() {
  const triggerBottom = (window.innerHeight / 3) * 5;

  boxes.forEach((box) => {
    const boxTop = box.getBoundingClientRect().top;

    if (boxTop < triggerBottom) {
      box.classList.add("active");
    } else {
      box.classList.remove("active");
    }
  });

  // Recipes
  recipes.forEach((box) => {
    const boxTop = box.getBoundingClientRect().top;

    if (boxTop < triggerBottom) {
      box.classList.add("active");
    } else {
      box.classList.remove("active");
    }
  });
}

// Toggle the Navigation Menu

const navToggle = document.querySelector(".nav-toggle");
function toggleMenu() {
  const navMenu = document.querySelector(".main-nav");
  const menuItems = document.querySelectorAll("nav.main-nav ul li a");

  navMenu.classList.toggle("active");
  navToggle.parentElement.classList.toggle("active");
  navMenu.classList.contains("active")
    ? (navMenu.style.height = navMenu.scrollHeight + "px")
    : (navMenu.style.height = 0);
  menuItems.forEach((item, index) => {
    setTimeout(() => {
      navMenu.classList.contains("active")
        ? (item.style.opacity = 1)
        : (item.style.opacity = 0);
    }, 250 * index);
  });
}

navToggle.addEventListener("click", (e) => {
  e.preventDefault();
  e.target.classList.toggle("active");
  toggleMenu();
});

// adjust card height

const recipeHeight = () => {
  let cardHeight = 0;
  document.querySelectorAll(".card").forEach((card) => {
    card.scrollHeight > cardHeight ? (cardHeight = card.scrollHeight) : "";
  });

  document.querySelectorAll(".card").forEach((card) => {
    card.style.height = `${cardHeight}px`;
  });
};

// adjust blog card height

const blogCardHeight = () => {
  let boxHeight = 0;
  boxes.forEach((box) => {
    box.scrollHeight > boxHeight ? (boxHeight = box.scrollHeight) : "";
  });
  boxes.forEach((box) => {
    box.style.height = `${boxHeight}px`;
  });
};

//disable preloader

window.addEventListener("load", (e) => {
  const preloader = document.querySelector(".preloader");
  setTimeout(() => {
    preloader.style.opacity = 0;
    preloader.style.display = "none";
  }, 1000);
});

// Lazyload Images
let options = {
  rootMargin: "0px",
  threshold: 1.0,
};

let observer = new IntersectionObserver(async (entries, options) => {
  entries.forEach(async (entry, index) => {
    if (entry.intersectionRatio > 0) {
      entry.target.src = await entry.target.getAttribute("data-src");
      setTimeout(() => {
        entry.target.classList.add("fadeIn");
        observer.unobserve(entry.target);
        recipeHeight();
        blogCardHeight();
      }, 750);
    } else {
      entry.target.classList.remove("fadeIn");
    }
  });
});

let images = document.querySelectorAll(".lazy");
images.forEach((image) => {
  observer.observe(image);
});

//shrink desktop nav on scroll

if (window.innerWidth >= 968) {
  document.body.addEventListener("scroll", () => {
    const navBar = document.querySelector(".main-nav");
    const navBarImg = document.querySelector(".main-nav img");
    if (document.body.scrollTop > 100 || window.pageYOffset > 100) {
      navBar.style.padding = "0 1.5em";
      navBar.style.fontSize = ".95em";
      navBarImg.style.height = "40px";
      navBarImg.style.marginLeft = "auto";
    } else {
      navBar.style.padding = "1em 1.5em";
      navBar.style.fontSize = "1em";
      navBarImg.style.height = "50px";
    }
  });
}

let parallax = (id, rate) => {
  const parallaxObject = document.querySelector(id);

  // check to see if there is something to add parallax too
  if (!parallaxObject) {
    return;
  }

  // to calculate what the bg position should be
  const init = () => {
    const x = parallaxObject.getBoundingClientRect().top / rate;
    const y = Math.round((x * 100) / 100);
    parallaxObject.style.backgroundPosition = "center " + y + "px";
  };
  // you need to call init once when the function initializes or else you will get a jumping effect when it recalculates the y position.
  init();
  // you need to add this event listener so it will continually update your background positions
  document.body.addEventListener("scroll", () => {
    init();
  });
};

// call parallax to initialize it
parallax(".hero", 5);
