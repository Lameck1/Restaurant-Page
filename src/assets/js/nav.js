import createElem from './createElem';

export default () => {
  const content = document.getElementById('content');

  const menu = createElem('MENU', { class: 'menu' });
  const homePage = createElem('MENUITEM', { class: 'home-page' }, 'HOME');
  const foodMenu = createElem('MENUITEM', { class: 'food-menu' }, 'MENU');
  const contactPage = createElem('MENUITEM', { class: 'contact-page' }, 'CONTACT');
  menu.append(homePage, foodMenu, contactPage);

  document.body.insertBefore(menu, content);
};
