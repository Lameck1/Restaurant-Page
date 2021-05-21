import createElem from './createElem';

export default () => {
  // renders menu section
  const content = document.getElementById('content');
  const foodMenu = [
    {
      name: 'Chapati',
      description: 'Pan-Fried Swahili Bread Made Out Of Whole Wheat Flour; Similar To Naan',
      price: 'KES 300.00',
    },
    {
      name: 'Kachumbari Salad',
      description: 'Finely Cut Juliennes Of Onions, De-Seeded Tomatoes, Gree Capsicum Washed In Fresh Lemon Juice And Served On A Bed Of Fresh Garden Lettuce',
      price: 'KES 500.00',
    },
    {
      name: 'Matoke',
      description: 'Green Bananas Steamed The African Way By Cobvering In Banana Leaves; Stewed With Leeks And Spring Onions',
      price: 'KES 300.00',
    },
    {
      name: 'Ngwacii(Sweet Potatoes)',
      description: 'Traditionally Boiled In The African Pot; Served Off The Skin',
      price: 'KES 500.00',
    },
    {
      name: 'Peanut Soup',
      description: 'Locally Harvested Red Peanuts Blended With Soy Sauce, Garlic, Lime, Coconut Cream Deriving A Very Rich African Soup;Served With Garlic Bread',
      price: 'KES 850.00',
    },
    {
      name: 'Sweet Potatoe Salad',
      description: 'Macedoine Of Sweet Potato Mixed With Finely Chopped Red Onions And Garnished With Paysanne Of Colored Peppers',
      price: 'KES 750.00',
    },
    {
      name: 'Tsimbapachiro(Chicken Wings-8pcs)',
      description: 'Well Marinated In Ginger, Garlic, Soy Sauce; Pan Fried With A Sprinkle Of Spring Onions : Served Either With Or Without Chil­lies',
      price: 'KES 750.00',
    },
    {
      name: 'Usuu(Porridge)',
      description: 'Fermented Finger Millet Porridge Made In Our African Pot; Served In Grandma’s Traditional Calabash',
      price: 'KES 400.00',
    },
  ];
  const menu = createElem('section', { class: 'food-menu' });
  const ul = createElem('ul');
  foodMenu.forEach((item) => {
    const listItem = createElem('li');
    const imgDiv = createElem('div', { class: 'img-div' });
    const foodDetailDiv = createElem('div', { class: 'food-detail-div' });
    const foodName = createElem('h3', { class: 'food-name' }, item.name);
    const foodPrice = createElem('p', { class: 'food-price' }, item.price);
    const description = createElem('p', { class: 'description' }, item.description);
    foodDetailDiv.append(foodName, foodPrice, description);
    listItem.append(imgDiv, foodDetailDiv);
    ul.appendChild(listItem);
  });
  menu.appendChild(ul);
  content.appendChild(menu);
};
