import { MenuItem } from "../App";

export const MENU_DATA: MenuItem[] = [
  // 🍔 Burgers
    {
    id: '201',
    name: 'Quarter Pounder',
    description: 'Juicy quarter pound beef burger',
      image: 'https://hellers.co.nz/wp-content/uploads/2020/09/HL_BeefBurger_3.jpg',
    category: 'Burgers',
    basePrice: 4.99,
    addOns: [
      { name: 'Cheese', price: 0.7 },
      { name: 'Make it a Meal Deal', price: 2.49 }
    ]
  },
  {
    id: '202',
    name: 'Half Pounder',
    description: 'Juicy half pound beef burger',
    image: 'https://plus.unsplash.com/premium_photo-1683619761492-639240d29bb5?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YnVyZ2VyfGVufDB8fDB8fHww',  
    category: 'Burgers',
    basePrice: 6.49,
    addOns: [
      { name: 'Cheese', price: 0.7 },
      { name: 'Make it a Meal Deal', price: 2.49 }
    ]
  },
  {
    id: '203',
    name: 'Veggie Burger',
    description: 'Vegetarian burger patty with fresh salad',
    image: 'https://www.fooodlove.com/images/jcogs_img/cache/Veggie-Burger-Patties-08_-_28de80_-_6e998e32564657d98615fa3eb7a1d080799fbdd5.jpg',
     category: 'Burgers',
    basePrice: 3.99,
    addOns: [
      { name: 'Cheese', price: 0.7 },
      { name: 'Make it a Meal Deal', price: 2.49 }
    ]
  },
  {
    id: '204',
    name: 'Fish Burger',
    description: 'Crispy fish fillet burger',
    image: 'https://t3.ftcdn.net/jpg/00/40/24/60/360_F_40246031_zWZoDrKKr4jusGNtSpKV7Zvy9VdeIi88.jpg',
     category: 'Burgers',

    basePrice: 4.49,
    addOns: [
      { name: 'Cheese', price: 0.7 },
      { name: 'Make it a Meal Deal', price: 2.49 }
    ]
  },
  {
    id: '205',
    name: 'Grill Chicken Burger',
    description: 'Grilled chicken breast burger',
    image: 'https://images.unsplash.com/photo-1688246780164-00c01647e78c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBmb29kfGVufDF8fHx8MTc2NTQ0NTg5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Burgers',

    basePrice: 4.49,
    addOns: [
      { name: 'Cheese', price: 0.7 },
      { name: 'Make it a Meal Deal', price: 2.49 }
    ]
  },

  // 🌯 Wraps
  {
    id: '301',
    name: 'Crispy Chicken Wrap',
    description: 'Crispy fried chicken wrap with fresh salad',
        image: 'https://www.momables.com/wp-content/uploads/2024/03/Crispy-chicken-wrap_SQ-500x500.jpg',  category: 'Wraps',
    basePrice: 4.49,
    addOns: [
      { name: 'Cheese', price: 0.7 },
      { name: 'Make it a Meal Deal', price: 2.49 }
    ]
  },
  {
    id: '302',
    name: 'Grilled Chicken Wrap',
    description: 'Grilled chicken wrap with fresh salad',
        image: 'https://tastesbetterfromscratch.com/wp-content/uploads/2020/03/Buffalo-Chicken-Wrap-3.jpg', category: 'Wraps',
    basePrice: 5.49,
    addOns: [
      { name: 'Cheese', price: 0.7 },
      { name: 'Make it a Meal Deal', price: 2.49 }
    ]
  },
  {
    id: '303',
    name: 'Falafel Wrap',
    description: 'Crispy falafel wrap with salad and sauce',
        image: 'https://www.liveeatlearn.com/wp-content/uploads/2025/03/sheet-pan-freezer-falafel-11-500x375.jpg', category: 'Wraps',
    basePrice: 4.99,
    addOns: [
      { name: 'Cheese', price: 0.7 },
      { name: 'Make it a Meal Deal', price: 2.49 }
    ]
  },
  {
    id: '304',
    name: 'Veggie Wrap',
    description: 'Vegetarian wrap with fresh vegetables',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb-v-_cPaa4zlznhp7nAfeX3dERl6Y2mEe4w&s',
    category: 'Wraps',
    basePrice: 4.99,
    addOns: [
      { name: 'Cheese', price: 0.7 },
      { name: 'Make it a Meal Deal', price: 2.49 }
    ]
  },
  {
    id: '305',
    name: 'Vegan Wrap',
    description: 'Large wrap with extra filling',
        image: 'https://images.unsplash.com/photo-1562059390-a761a084768e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d3JhcHxlbnwwfHwwfHx8MA%3D%3D',
    category: 'Wraps',
    basePrice: 4.99,
    addOns: [
      { name: 'Cheese', price: 0.7 },
      { name: 'Make it a Meal Deal', price: 2.49 }
    ]
  },

  // 🍕 Pizzas
  {
    id: '401',
    name: 'Margherita Pizza',
    description: 'Tomato base with 100% mozzarella cheese',
    category: 'Pizzas',
    basePrice: 10.49,
  image: '/assets/pizza1.png',
   sizes: [
    { name: 'Regular 12"', price: 0 },
    ],
    addOns: [
      { name: 'Extra Cheese', price: 2 },
      { name: 'Pepperoni', price: 2 },
      { name: 'Mushrooms', price: 2 },
      { name: 'Olives', price: 1.5 }
    ]
  },
  {
    id: '402',
    name: 'Vegetarian Supreme Pizza',
    description: 'Mushrooms, onions, peppers and sweetcorn',
    category: 'Pizzas',
    basePrice: 11.49,
    image: '/assets/pizza2.png',
    sizes: [
    { name: 'Regular 12"', price: 0 },
    ],
    addOns: [
      { name: 'Extra Cheese', price: 2 },
      { name: 'Pepperoni', price: 2 },
      { name: 'Mushrooms', price: 2 },
      { name: 'Olives', price: 1.5 }
    ]
  },
  {
    id: '403',
    name: 'Tandoori Chicken Pizza',
    description: 'Tandoori chicken, chillies, peppers and red onions',
    category: 'Pizzas',
    basePrice: 11.99,
    image:  '/assets/pizza3.png',
    sizes: [
    { name: 'Regular 12"', price: 0 },
    ],
    addOns: [
      { name: 'Extra Cheese', price: 2 },
      { name: 'Pepperoni', price: 2},
      { name: 'Mushrooms', price: 2 },
      { name: 'Olives', price: 1.5 }
    ]
  },
  {
    id: '404',
    name: 'Chicken Supreme Pizza',
    description: 'Chicken, mushrooms and sweetcorn',
    category: 'Pizzas',
    basePrice: 11.99,
    image: '/assets/pizza4.png',
    sizes: [
    { name: 'Regular 12"', price: 0 },
    ],
    addOns: [
      { name: 'Extra Cheese', price: 2 },
      { name: 'Pepperoni', price: 2 },
      { name: 'Mushrooms', price: 2 },
      { name: 'Olives', price: 1.5 }
    ]
  },
  {
    id: '405',
    name: 'Pepperoni Pizza',
    description: 'Tomato base, mozzarella and extra pepperoni',
    category: 'Pizzas',
    basePrice: 11.99,
    image: '/assets/pizza5.png',
    sizes: [
    { name: 'Regular 12"', price: 0 },
    ],
    addOns: [
      { name: 'Extra Cheese', price: 2 },
      { name: 'Pepperoni', price: 2 },
      { name: 'Mushrooms', price: 2 },
      { name: 'Olives', price: 1.5 }
    ]
  },
  {
    id: '406',
    name: 'Special Meat Feast Pizza',
    description: 'Meatballs, chicken, pepperoni, chillies, peppers and red onions',
    category: 'Pizzas',
    basePrice: 12.99,
    image: '/assets/pizza6.png',
    sizes: [
    { name: 'Regular 12"', price: 0 },
    ],
    addOns: [
      { name: 'Extra Cheese', price: 2 },
      { name: 'Pepperoni', price: 2 },
      { name: 'Mushrooms', price: 2 },
      { name: 'Olives', price: 1.5 }
    ]
  },
  {
    id: '407',
    name: 'Mexicano Pizza',
    description: 'Sausages, onions, jalapenos and mushrooms',
    category: 'Pizzas',
    basePrice: 12.99,
    image: '/assets/pizza7.png',
    sizes: [
    { name: 'Regular 12"', price: 0 },
    ],
    addOns: [
      { name: 'Extra Cheese', price: 2 },
      { name: 'Pepperoni', price: 2 },
      { name: 'Mushrooms', price: 2 },
      { name: 'Olives', price: 1.5 }
    ]
  },
  {
    id: '408',
    name: 'Tuna Haven Pizza',
    description: 'Tuna, peppers, red onions and black olives',
    category: 'Pizzas',
    basePrice: 12.99,
    image: '/assets/pizza8.png',
    sizes: [
       { name: 'Regular 12"', price: 0 },

    ],
    addOns: [
      { name: 'Extra Cheese', price: 2 },
      { name: 'Pepperoni', price: 2 },
      { name: 'Mushrooms', price: 2 },
      { name: 'Olives', price: 1.5 }
    ]
  },
  {
    id: '409',
    name: 'Pesto Chicken Pizza',
    description: 'Pesto base, pepper chicken, mushrooms and black olives',
    category: 'Pizzas',
    basePrice: 12.99,
    image: '/assets/pizza9.png',
    sizes: [
    { name: 'Regular 12"', price: 0 },
    ],
    addOns: [
      { name: 'Extra Cheese', price: 2 },
      { name: 'Pepperoni', price: 2 },
      { name: 'Mushrooms', price: 2 },
      { name: 'Olives', price: 1.5 }
    ]
  },
        // 🥗 Salads, Sandwiches & Sides
   {
    id: '11',
    name: 'Kids Meal 1',
    description: '4 chicken nuggets, fries & fruit shoot',
    category: 'Kids',
    basePrice: 4.99,
    image: 'https://plus.unsplash.com/premium_photo-1683657860500-36c53be84668?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZnJpZWQlMjBjaGlja2VuJTIwd2luZ3N8ZW58MHx8MHx8fDA%3D',
     addOns: [
      { name: 'Extra chicken nuggets', price: 3 },
      { name: 'Garlic Bread', price: 1.5 },
      { name: 'Parmesan', price: 1 }
    ]
  },
  {
    id: '4',
    name: 'Caesar Salad',
    description: 'Crisp romaine with Caesar dressing, croutons, and parmesan',
    category: 'Salads',
    basePrice: 9.99,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxhZCUyMGJvd2x8ZW58MXx8fHwxNzY1NDk0NTIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    sizes: [
      { name: 'Regular', price: 0 },
      { name: 'Large', price: 3 }
    ],
    addOns: [
      { name: 'Grilled Chicken', price: 4 },
      { name: 'Shrimp', price: 5 },
      { name: 'Avocado', price: 2 }
    ]
  },
  {
    id: '5',
    name: 'Club Sandwich',
    description: 'Triple-decker with turkey, bacon, lettuce, and tomato',
    category: 'Sandwiches',
    basePrice: 11.99,
    image: 'https://images.unsplash.com/photo-1721980743519-01f627e7b4b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW5kd2ljaCUyMGZvb2R8ZW58MXx8fHwxNzY1NDk2MTMyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    addOns: [
      { name: 'Extra Bacon', price: 2 },
      { name: 'Cheese', price: 1.5 },
      { name: 'Avocado', price: 2 }
    ]
  },
      // 🍟 Fries
  {
    id: '60',
    name: 'French Fries',
    description: 'Crispy golden fries with sea salt',
    category: 'Sides',
    basePrice: 1.79,
    image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjBmcmllc3xlbnwxfHx8fDE3NjU0NzUyMDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    sizes: [
      { name: 'Regular', price: 0 },
      { name: 'Large', price: 0.7 }
    ],
    addOns: [
      { name: 'Cheese Sauce', price: 1 },    ]
  },
   {
    id: '61',
    name: 'Peri Peri Fries',
    description: 'Spicy peri peri seasoned fries',
    category: 'Sides',
    basePrice: 2.49,
    image: 'https://cookingwithparita.com/wp-content/uploads/2022/10/image-of-baked-crispy-peri-peri-fries-recipe-2.jpg',
     sizes: [
      { name: 'Regular', price: 0 },
      { name: 'Large', price: 0.5 }
    ],
    addOns: [
      { name: 'Cheese Sauce', price: 1 },
    ]
  }, {
    id: '62',
    name: 'Sweet Potato Fries',
    description:'Crispy sweet potato fries',
    category: 'Sides',
    basePrice: 3.99,
    image: 'https://simplehomeedit.com/wp-content/uploads/2025/02/Sweet-Potato-Fries-1.webp',
     sizes: [
      { name: 'Regular', price: 0 },
      { name: 'Large', price: 1 }
    ],
    addOns: [
      { name: 'Cheese Sauce', price: 1 },
    ]
  },
   {
    id: '63',
    name: 'Onion Rings',
    description:  'Golden fried onion rings',
    category: 'Sides',
    basePrice: 3.99,
    image: 'https://houseofnasheats.com/wp-content/uploads/2023/03/Homemade-Onion-Rings-Square-1.jpg',
      sizes: [
      { name: 'Regular', price: 0 },
    ],
    addOns: [
      { name: 'Cheese Sauce', price: 1 },
    ]
  }, {
    id: '64',
    name: 'Mozzarella Sticks',
    description: '8 breaded mozzarella sticks',
    category: 'Sides',
    basePrice: 4.99,
    image: 'https://images.themodernproper.com/production/posts/2021/Homemade-Mozzarella-Sticks-9.jpeg?w=1200&h=1200&q=60&fm=jpg&fit=crop&dm=1638935116&s=5ffd210ac3bc61d43ed6cf3ef253bcbb',
     sizes: [
      { name: 'Regular', price: 0 },
    ],
    addOns: [
      { name: 'Cheese Sauce', price: 1 },
    ]
  }, {
    id: '65',
    name: 'Jalapeno Cream Cheese Bites',
    description: '6 jalapeno cream cheese bites',
    category: 'Sides',
    basePrice: 5.49,
    image: 'https://spicysouthernkitchen.com/wp-content/uploads/Fried-Jalapeno-Popper-Bites-9.jpg',
     sizes: [
      { name: 'Regular', price: 0 },
      { name: 'Large', price: 2 }
    ],
    addOns: [
      { name: 'Cheese Sauce', price: 1 },
    ]
  }, {
    id: '66',
    name: 'Corn on the Cob',
    description: 'Crispy Corn on the Cob',
    category: 'Sides',
    basePrice: 1.99,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReWqz7Rdv0XsopePKoIsG7p6a3rW1RqPPqow&s',
       sizes: [
      { name: 'Regular', price: 0 },
    ],
    addOns: [
      { name: 'Cheese Sauce', price: 1.5 },
      { name: 'Truffle Oil', price: 2 }
    ]
  }, {
    id: '67',
    name: 'Coleslaw',
    description: 'Crispy Coleslaw',
    category: 'Sides',
    basePrice: 1.99,
    image: 'https://assets.bonappetit.com/photos/647f450e29083daa1eff589e/1:1/w_2970,h_2970,c_limit/20230524-SEO-RECIPES-BON-APP24155.jpg',
      sizes: [
      { name: 'Regular', price: 0 },
    ],
    addOns: [
      { name: 'Cheese Sauce', price: 1.5 },
      { name: 'Truffle Oil', price: 2 }
    ]
  },
  // 🍔 Burger Deals
   {
    id: '101',
    name: 'Chicken Tower Burger',
    description: 'Juicy double chicken patty and special sauce plus crispy fries and Drink',
    category: 'Burgers',
    basePrice: 5.99,
    image: '/assets/image5.png',
    sizes: [
      { name: 'Regular', price: 0 },

      { name: 'Make a Meal Deal', price: 2.49 }],
    addOns: [
      { name: 'Extra Cheese', price: 0.5 },
      { name: 'Avocado', price: 0.5 }
    ]
  },
   {
    id: '102',
    name: 'Chicken Fillet Burger Meal 1',
    description: 'Chicken fillet burger served with fries and a drink',
    category: 'Burger Deals',
    basePrice: 6.49,
    image: '/assets/image6.png',
    sizes: [
      { name: 'Regular', price: 0 },
    ],
    addOns: [
      { name: 'Extra Cheese', price: 0.5 },
      { name: 'Avocado', price: 0.5 }
    ]
  }, {
    id: '103',
    name: 'Chicken Fillet Burger Meal 2',
    description:'Chicken fillet burger served with 1 piece of chicken,fries and a drink',
    category: 'Burger Deals',
    basePrice: 7.99,
    image: '/assets/meal2.png',
    sizes: [
      { name: 'Regular', price: 0 },
    ],
    addOns: [
      { name: 'Extra Cheese', price: 0.5 },
      { name: 'Avocado', price: 0.5 }
    ]
  }, {
    id: '104',
    name: 'Chicken Strip Burger',
    description:  'Chicken strip burger with fries and a drink',
    category: 'Burgers',
    basePrice: 6.99,
    image: '/assets/meal3.png',
      sizes: [
      { name: 'Regular', price: 0 },
],
    addOns: [
      { name: 'Extra Cheese', price: 0.5 },
      { name: 'Avocado', price: 0.5 }
    ]
  },
  {
    id: '105',
    name: 'Chicken Fillet Burger Meal 3',
    description: 'Chicken fillet burger served with 2 piece of spicy chicken,fries and a drink',
     category: 'Burger Deals',
    basePrice: 7.99,
    image: '/assets/meal4.png',
    sizes: [
      { name: 'Regular', price: 0 },

      { name: 'Make a Meal Deal', price: 2.49 }],
    addOns: [
      { name: 'Extra Cheese', price: 0.5 },
      { name: 'Avocado', price: 0.5 }
    ]
  },
  
  {
    id: '1701',
    name: 'BBQ Chicken Wings',
    description: '5 pieces BBQ chicken wings',
    category: 'Grill Chicken deals',
    basePrice: 4.49,
    image: 'https://www.loveandotherspices.com/wp-content/uploads/2023/06/air-fryer-bbq-chicken-wings-featured.jpg',
  },
   {
    id: '1702',
    name: 'Chicken Strips',
    description:'5 pieces chicken strips',
    category: 'Grill Chicken deals',
    basePrice:3.99,
    image: 'https://images.unsplash.com/photo-1683701504046-3becdafbdf0c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2hpY2tlbiUyMHN0cmlwc3xlbnwwfHwwfHx8MA%3D%3D',
    addOns: [{ name: 'No Sugar Drink', price: 1.49 }]
  },
  {
    id: '1703',
    name: '5 Hot Wings',
    description: 'Crispy spicy chicken wings',
    image: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG90JTIwY2hpY2tlbnxlbnwwfHwwfHx8MA%3D%3D',
    category: 'Grill Chicken deals',
    basePrice: 3.49
  },
  {
    id: '1704',
    name: '2 Pieces Chicken',
    description: 'Crispy fried chicken pieces',
    image:'https://townsquare.media/site/394/files/2023/03/attachment-shardar-tarikul-islam-RWAToPPP9RY-unsplash.jpg?w=1200',
    category: 'Grill Chicken deals',
    basePrice: 3.49
  },
  {
    id: '1705',
    name: '8 Hot Wings',
    description: 'Crispy spicy chicken wings',
    image: 'https://plus.unsplash.com/premium_photo-1683657860968-7474e7ea2d80?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y2hpY2tlbiUyMHdpbmd8ZW58MHx8MHx8fDA%3D',
     category: 'Grill Chicken deals',
    basePrice: 4.49
  },
  {
    id: '1706',
    name: '3 Pieces Chicken',
    description: 'Crispy fried chicken pieces',
    image: 'https://images.unsplash.com/photo-1730900737724-5b752e1ed3dd?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJpZWQlMjBjaGlja2VuJTIwd2luZ3N8ZW58MHx8MHx8fDA%3D',
    category: 'Grill Chicken deals',
    basePrice: 4.99
  },
  {
    id: '1707',
    name: '10 Hot Wings',
    description: 'Crispy spicy chicken wings',
    image:'https://images.unsplash.com/photo-1566918214014-a3b3e0132267?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Grill Chicken deals',
    basePrice: 5.49
  },
  {
    id: '1708',
    name: '4 Pieces Chicken',
    description: 'Crispy fried chicken pieces',
    image: 'https://thumbs.dreamstime.com/b/crispy-fried-chicken-wings-wooden-table-kentucky-88919528.jpg',
      category: 'Grill Chicken deals',
    basePrice: 6.49
  },
  // Peri Peri Chicken Deals
 {
    id: '1101',
    name: 'Peri Peri Grill Chicken – 5 Wings',
    description: 'Grilled peri peri wings',
    category: 'Peri Peri',
         image:'https://www.thecookingdoc.co/wp-content/uploads/2024/12/Baked-Peri-Peri-Chicken-Wings-scaled-e1736100953498-809x1024.jpg',

    basePrice: 3.99,
    addOns: [
      { name: 'Medium', price: 0 },
      { name: 'Hot', price: 0 },
      { name: 'Extra Hot', price: 0 },
      { name: 'Lemon & Herb', price: 0 },
      { name: 'Garlic & Herb', price: 0 },
      { name: 'Make it a Meal Deal', price: 2.49 }
    ]
  },
  {
    id: '1102',
    name: 'Peri Peri Grill Chicken – 8 Wings',
    description: 'Grilled peri peri wings',
    category: 'Peri Peri',
         image:'https://www.thecookingdoc.co/wp-content/uploads/2024/12/Baked-Peri-Peri-Chicken-Wings-scaled-e1736100953498-809x1024.jpg',
     
    basePrice: 6.99,
    addOns: [
      { name: 'Medium', price: 0 },
      { name: 'Hot', price: 0 },
      { name: 'Extra Hot', price: 0 },
      { name: 'Lemon & Herb', price: 0 },
      { name: 'Garlic & Herb', price: 0 },
      { name: 'Make it a Meal Deal', price: 2.49 }
    ]
  },
  {
    id: '1103',
    name: 'Peri Peri Grill Chicken – 10 Wings',
    description: 'Grilled peri peri wings',
         image:'https://www.thecookingdoc.co/wp-content/uploads/2024/12/Baked-Peri-Peri-Chicken-Wings-scaled-e1736100953498-809x1024.jpg',
    
    category: 'Peri Peri',
    basePrice: 7.99,
    addOns: [
      { name: 'Medium', price: 0 },
      { name: 'Hot', price: 0 },
      { name: 'Extra Hot', price: 0 },
      { name: 'Lemon & Herb', price: 0 },
      { name: 'Garlic & Herb', price: 0 },
      { name: 'Make it a Meal Deal', price: 2.49 }
    ]
  },
  {
    id: '1104',
    name: 'Peri Peri Quarter Chicken',
    description: 'Grilled peri peri quarter chicken',
     image:  'https://images.unsplash.com/photo-1712579733874-c3a79f0f9d12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwY2hpY2tlbnxlbnwxfHx8fDE3NjU4MjAyNTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      
    category: 'Peri Peri',
    basePrice: 3.99,
    addOns: [
      { name: 'Medium', price: 0 },
      { name: 'Hot', price: 0 },
      { name: 'Extra Hot', price: 0 },
      { name: 'Lemon & Herb', price: 0 },
      { name: 'Garlic & Herb', price: 0 },
      { name: 'Make it a Meal Deal', price: 2.49 }
    ]
  },
  {
    id: '1105',
    name: 'Peri Peri Half Chicken',
    description: 'Grilled peri peri half chicken',
    category: 'Peri Peri',
    image: 'https://images.unsplash.com/photo-1712579733874-c3a79f0f9d12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwY2hpY2tlbnxlbnwxfHx8fDE3NjU4MjAyNTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
   
    basePrice: 6.99,
    addOns: [
      { name: 'Medium', price: 0 },
      { name: 'Hot', price: 0 },
      { name: 'Extra Hot', price: 0 },
      { name: 'Lemon & Herb', price: 0 },
      { name: 'Garlic & Herb', price: 0 },
      { name: 'Make it a Meal Deal', price: 2.49 }
    ]
  },
  {
    id: '1106',
    name: 'Peri Peri Full Chicken',
    description: 'Grilled peri peri whole chicken',
     image: 'https://images.unsplash.com/photo-1712579733874-c3a79f0f9d12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwY2hpY2tlbnxlbnwxfHx8fDE3NjU4MjAyNTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
   
    category: 'Peri Peri',
    basePrice: 13.99,
    addOns: [
      { name: 'Medium', price: 0 },
      { name: 'Hot', price: 0 },
      { name: 'Extra Hot', price: 0 },
      { name: 'Lemon & Herb', price: 0 },
      { name: 'Garlic & Herb', price: 0 },
      { name: 'Make it a Meal Deal', price: 2.49 }
    ]
  },
  // 🍰 Desserts
  {
    id: '80',
    name: 'Sticky Toffee Pudding',
    description: 'Freshly baked sticky toffee pudding',
    category: 'Desserts',
    basePrice: 4.99,
    image: 'https://cakesbymk.com/wp-content/uploads/2024/12/Template-Size-for-Blog-15-500x500.jpg',
     addOns: [
      { name: 'Extra Ice Cream', price: 2 },
      { name: 'Whipped Cream', price: 1 }
    ]
  }
  ,
  {
    id: '81',
    name: 'New York Cheesecake',
    description:  'Classic New York style cheesecake',
     category: 'Desserts',
    basePrice: 3.99,
    image: 'https://www.onceuponachef.com/images/2017/12/cheesecake-1200x1393.jpg',
     addOns: [
      { name: 'Extra Ice Cream', price: 2 },
      { name: 'Whipped Cream', price: 1 }
    ]
  }
  ,
  {
    id: '82',
    name: 'Ice Cream (Haagen-Dazs)',
    description:'Strawberry, Cookies & Cream, Salted Caramel, Vanilla',
    category: 'Desserts',
    basePrice: 5.99,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Ice_cream_with_whipped_cream%2C_chocolate_syrup%2C_and_a_wafer_%28cropped%29.jpg/250px-Ice_cream_with_whipped_cream%2C_chocolate_syrup%2C_and_a_wafer_%28cropped%29.jpg',
     sizes: [
      { name: 'Strawberry', price: 0 },
      { name: ' Cookies & Cream', price: 0 },
      { name: 'Salted Caramel', price: 0 },
      { name: 'Vanilla', price: 0 }   ,

    ]
  },
  //Ricebox
    {
    id: '1201',
    name: 'Rice Box',
    description: 'Chicken strips or 5 wings with rice and salad',
    category: 'Rice Box',
  image: 'https://images.unsplash.com/photo-1628521061262-19b5cdb7eee5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaWNlJTIwYm93bHxlbnwxfHx8fDE3NjU4NDQ3NTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    basePrice: 5.49,
  
  },
    {
    id: '1202',
    name: 'Only Spicy Rice',
    description: 'Spicy rice and salad',
    category: 'Rice Box',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7HoArOXSs_9uojO5-WhPE9MPOr5cpwJVAMA&s',   basePrice: 2.99,
  
  },
      // 🍗 Bucket s
  {
    id: '21',
    name: 'Wings Bucket',
    description:  '20 pieces of hot wings',
    category: 'Buckets',
    basePrice: 10.99,
    image: 'https://images.unsplash.com/photo-1670688866261-db6697858df8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwYnVja2V0fGVufDF8fHx8MTc2NTg5ODAwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  
    addOns: [
      { name: 'Cola', price: 1 }
    ]
  },
  {
    id: '22',
    name: 'Chicken Bucket',
    description: '10 pieces of crispy fried chicken',
        category: 'Buckets',
    basePrice: 14.99,
      image: 'https://images.unsplash.com/photo-1670688866261-db6697858df8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwYnVja2V0fGVufDF8fHx8MTc2NTg5ODAwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  
    addOns: [
         { name: 'Cola', price: 1 }
    ]
  }
  ,
  {
    id: '23',
    name: 'Variety Bucket',
    description: '4 pieces chicken, 5 wings, 3 strips, 4 fries, 1 bottle drink',
     category: 'Buckets',
    basePrice: 14.99,
      image: 'https://images.unsplash.com/photo-1670688866261-db6697858df8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwYnVja2V0fGVufDF8fHx8MTc2NTg5ODAwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  
    addOns: [
      { name: 'Pepsi', price: 0 },
    ]
  }
,
    // 🥤 Beverages
  {
    id: '701',
    name: 'Soft Drink Can',
    description: 'Choice of cola, lemonade, or iced tea',
    category: 'Beverages',
    basePrice: 1.49,
     image: 'https://images.unsplash.com/photo-1527960471264-932f39eb5846?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0JTIwZHJpbmt8ZW58MXx8fHwxNzY1ODc3NDI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    sizes: [
      { name: 'Small', price: 0 },
      { name: 'Medium', price: 1 },
      { name: 'Large', price: 1.5 }
    ]
  },

  {
    id: '702',
    name: 'Soft Drink Bottles',
    description: 'Bottle of cola, lemonade, or iced tea',
    category: 'Beverages',
    basePrice: 3.49,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWUp3035G5sY_Wo_N5Z5d68NgafAyHSUYZAA&s',
     sizes: [
      { name: 'Small', price: 0 },
      { name: 'Medium', price: 1 },
      { name: 'Large', price: 1.5 }
    ]
  },

  {
    id: '703',
    name: 'Fruit Shot(Capri Sun)',
    description: 'Fruit Shoot / Capri Sun',
    category: 'Beverages',
    basePrice: 1.29,
    image: 'https://target.scene7.com/is/image/Target/GUEST_4da09eef-90e7-4c36-abef-8c736fb2ad53',  sizes: [
      { name: 'Small', price: 0 },
      { name: 'Medium', price: 1 },
      { name: 'Large', price: 1.5 }
    ]
  },

  {
    id: '704',
    name: 'Water Bottle(500ml)',
    description: 'Water (500ml)',
    category: 'Beverages',
    image: 'https://www.kroger.com/product/images/large/front/0006827444311',
   
    basePrice: 1.49,
    
    sizes: [
      { name: 'Small', price: 0 },
      { name: 'Medium', price: 1 },
      { name: 'Large', price: 1.5 }
    ]
  },
  // 🍹 Mocktails & Mojitos
    { id: '901', name: 'Classic Mojito (Virgin)', category: 'Mocktails Mojitos', basePrice: 4.49,description: 'Classic Mojito with lime, mint, sugar, and soda'
    ,  image: 'https://images.unsplash.com/photo-1690921822670-5929218ab41d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2ppdG8lMjBkcmlua3xlbnwxfHx8fDE3NjU4NzQ1MjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
   
     },
  { id: '902', name: 'Blueberry Mojito', category: 'Mocktails Mojitos', basePrice: 4.49, description: 'Blueberry Mojito with fresh blueberries, mint, lime, and soda'
,   image: 'https://thenovicechefblog.com/wp-content/uploads/2013/05/Blueberry-Mojito-1.jpg'  },
  { id: '903', name: 'Strawberry Mojito', category: 'Mocktails Mojitos', basePrice: 4.49, description: 'Strawberry Mojito with fresh strawberries, mint, lime, and soda'
  ,  image: 'https://www.sweetteaandthyme.com/wp-content/uploads/2022/05/Strawberry-Mojito-hero.webp' },  
  { id: '904', name: 'Passion Fruit Mojito', category: 'Mocktails Mojitos', basePrice: 4.49, description: 'Passion Fruit Mojito with passion fruit puree, mint, lime, and soda'
  ,  image: 'https://littleferrarokitchen.com/wp-content/uploads/2022/06/Passion-Fruit-Mojito-3-2-500x500.jpg' },
  { id: '905', name: 'Fruit Punch', category: 'Mocktails Mojitos', basePrice: 4.49, description: 'Fruit Punch with a blend of tropical fruit juices'
  ,   image: 'https://www.alphafoodie.com/wp-content/uploads/2022/07/Fruit-Punch-Square.jpeg' }
  // 🍦 Milkshakes
  ,{ id: '601', name: 'Oreo Milkshake', category: 'Milkshakes', basePrice: 4.99 , description: 'Creamy milkshake blended with Oreo cookies',
  image:  'https://images.unsplash.com/photo-1572490122747-3968b75cc699?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxrc2hha2V8ZW58MXx8fHwxNzY1ODk4MDA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
     },
    { id: '602', name: 'Ferrero Rocher Milkshake', category: 'Milkshakes', basePrice: 4.99, description: 'Decadent milkshake with Ferrero Rocher chocolates',
   image: '/assets/shake2.png',},
      { id: '603', name: 'Cheeks Milkshake', category: 'Milkshakes', basePrice: 4.99, description: 'Rich chocolate milkshake', 
   image: 'https://lh3.googleusercontent.com/proxy/X-azdh1C3aNl2YRFosCgwobF1KF73qfu1L3oIiXIqMGijsmvqI1HNK_yf-lPqrmuzrs9ueOvDx2nNn7jvi0T1p4LKcypGPVIKILRwuqQ2MDFNHMdhOrCZMi80fplAKuzTtyAWFeLT9SmnsqX0BNSM2XqQKgqKsFv'  },
        { id: '604', name: 'Vanilla Milkshake', category: 'Milkshakes', basePrice: 4.99, description: 'Classic vanilla milkshake',
    image: 'https://plus.unsplash.com/premium_photo-1695868328902-b8a3b093da74?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dmFuaWxsYSUyMG1pbGtzaGFrZXxlbnwwfHwwfHx8MA%3D%3D'  },
    { id: '605', name: 'Strawberry Milkshake', category: 'Milkshakes', basePrice: 4.99, description: 'Creamy strawberry milkshake', 
    image: 'https://images.unsplash.com/photo-1611928237590-087afc90c6fd?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3RyYXdiZXJyeSUyMG1pbGtzaGFrZXxlbnwwfHwwfHx8MA%3D%3D'  }
];

export const CATEGORIES = [
  'All',
  'Burgers',
  'Burger Deals',
  'Pizzas',
  'Wraps',
  'Kids',
  'Rice Box',
  'Peri Peri',
  'Grill Chicken deals',
  'Buckets',
  'Sides',
  'Milkshakes',
  'Mocktails Mojitos',
  'Beverages',
  'Desserts'
];