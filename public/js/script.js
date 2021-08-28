// Toggle the Navigation Menu


const navToggle = document.querySelector('.nav-toggle');
function toggleMenu() {
const navMenu = document.querySelector('.main-nav');
const menuItems = document.querySelectorAll('nav.main-nav ul li a')

navMenu.classList.toggle('active');
    navMenu.classList.contains('active') ? navMenu.style.height = navMenu.scrollHeight + 'px' : navMenu.style.height = 0;
    menuItems.forEach((item, index) => {
        setTimeout(() => {
            navMenu.classList.contains('active') ? item.style.opacity = 1 : item.style.opacity = 0
        }, 250 * index)
    })

}

navToggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.target.classList.toggle('active')
    toggleMenu();
})




//disable preloader


window.addEventListener('load', (e) => {
   const preloader = document.querySelector('.preloader')
   preloader.style.opacity = 0;
       setTimeout(() => {
        preloader.style.display = "none";
       }, 300)
   
})