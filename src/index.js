import './assets/css/style.css';

import renderNav from './assets/js/nav';
import renderHomePage from './assets/js/home';
import renderFoodMenu from './assets/js/menu';
import renderContact from './assets/js/contact';

renderNav();
renderHomePage();

const homePage = document.querySelector('.home-page');
const foodMenu = document.querySelector('.food-menu');
const contactPage = document.querySelector('.contact-page');
const content = document.getElementById('content');

homePage.addEventListener('click', () => {
  content.innerHTML = '';
  renderHomePage();
});
foodMenu.addEventListener('click', () => {
  content.innerHTML = '';
  renderFoodMenu();
});

contactPage.addEventListener('click', () => {
  content.innerHTML = '';
  renderContact();
});
