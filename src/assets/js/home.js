import createElem from './createElem';

export default () => {
  const content = document.getElementById('content');
  const header = createElem('h1', {}, 'Pendo Dishes');
  const phrase = createElem('p', { class: 'phrase' }, 'Hasty and tasty!');
  const time = createElem('p', { class: 'time' }, 'Opening Hours - 24/7');
  const about = createElem('p', { class: 'about' }, 'We are all about good food. But, besides that, we also offer top notch customer service. If you feel like this is not the best day for you to visit us but still need that good food, please go to our contact page and leave us a message or call us. You are always welcome.');
  content.append(header, phrase, time, about);
};
