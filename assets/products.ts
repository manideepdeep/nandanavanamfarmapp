import { Product } from './types/product';


export const PRODUCTS: Product[] = [
  {
    id: 1,
    title: 'Millet Dosa Idli Batter- 1kg',
    slug: 'Millet Dosa Idli Batter- 1kg',
    heroImage: require('../assets/categories/tiffin_batter/Millet Dosa Idli Batter.jpg'),
    imagesUrl: [
      require('../assets/categories/tiffin_batter/Millet Dosa Idli Batter.jpg'),
    ],
    price: 140.00,
    category: {
      imageUrl: require('../assets/categories/tiffin_batter/Millet Dosa Idli Batter.jpg'),
      name: 'Tiffin Batter',
      slug: 'tiffin-batter',
    },
    maxQuantity: 5,
  },
  {
    id: 2,
    title: 'Organic Brown Sugar | 500g',
    slug: 'Organic Brown Sugar | 500g',
    heroImage: require('../assets/categories/sugar_jaggery/Organic Brown Sugar.jpg'),
    imagesUrl: [
      require('../assets/categories/sugar_jaggery/Organic Brown Sugar.jpg'),
    ],
    price: 149.99,
    category: {
      imageUrl: require('../assets/categories/sugar_jaggery/Organic Brown Sugar.jpg'),
      name: 'Sugar & Jaggery',
      slug: 'sugar-jaggery',
    },
    maxQuantity: 10,
  },
  {
    id: 3,
    title: 'Dampudu Karam | Red Chilli Powder | SP Natural Method | 250 Grams',
    slug: 'Dampudu Karam | Red Chilli Powder | SP Natural Method | 250 Grams',
    heroImage: require('../assets/categories/spice_powders/Red Chilli Powder.jpg'),
    imagesUrl: [
      require('../assets/categories/spice_powders/Red Chilli Powder.jpg'),
    ],
    price: 79.99,
    category: {
      imageUrl: require('../assets/categories/spice_powders/Red Chilli Powder.jpg'),
      name: 'Spice Powders',
      slug: 'spice-powders',
    },
    maxQuantity: 15,
  },
  {
    id: 4,
    title: 'Homemade Mango Pickle',
    slug: 'homemade-mango-pickle',
    heroImage: require('../assets/categories/Pickles and Chutneys/Homemade Mango Pickle.jpg'),
    imagesUrl: [
      require('../assets/categories/Pickles and Chutneys/Homemade Mango Pickle.jpg'),
    ],
    price: 199.99,
    category: {
      imageUrl: require('../assets/categories/Pickles and Chutneys/Homemade Mango Pickle.jpg'),
      name: 'Pickles and Chutneys',
      slug: 'pickles-chutneys',
    },
    maxQuantity: 8,
  },
  {
    id: 5,
    title: 'Bee Keep Honey | 500g',
    slug: 'Bee Keep Honey | 500g',
    heroImage: require('../assets/categories/natural_honey/Bee Keep Honey.jpg'),
    imagesUrl: [
      require('../assets/categories/natural_honey/Bee Keep Honey.jpg'),
    ],
    price: 249.99,
    category: {
      imageUrl: require('../assets/categories/natural_honey/Bee Keep Honey.jpg'),
      name: 'Natural Honey',
      slug: 'natural-honey',
    },
    maxQuantity: 6,
  },
  {
    id: 6,
    title: 'Barnyard Millets | Udalu | 1000 Grams',
    slug: 'Barnyard Millets | Udalu | 1000 Grams',
    heroImage: require('../assets/categories/millets/Barnyard Millets.jpeg'),
    imagesUrl: [
      require('../assets/categories/millets/Barnyard Millets.jpeg'),
    ],
    price: 129.99,
    category: {
      imageUrl: require('../assets/categories/millets/Barnyard Millets.jpeg'),
      name: 'Millets',
      slug: 'millets',
    },
    maxQuantity: 12,
  },
  {
    id: 7,
    title: 'Fresh Chicken Breast | 500g',
    slug: 'fresh chicken breast | 500g',
    heroImage: require('../assets/categories/fresh_meat_seafood/fresh chicken breast.jpeg'),
    imagesUrl: [
      require('../assets/categories/fresh_meat_seafood/fresh chicken breast.jpeg'),
    ],
    price: 299.99,
    category: {
      imageUrl: require('../assets/categories/fresh_meat_seafood/fresh chicken breast.jpeg'),
      name: 'Fresh Meat & Seafood',
      slug: 'fresh-meat-seafood',
    },
    maxQuantity: 5,
  },
  {
    id: 8,
    title: 'Organic Carrots',
    slug: 'organic-carrots',
    heroImage: require('../assets/categories/farm_fresh_vegetables/Organic Carrots.jpeg'),
    imagesUrl: [
      require('../assets/categories/farm_fresh_vegetables/Organic Carrots.jpeg'),
    ],
    price: 79.99,
    category: {
      imageUrl: require('../assets/categories/farm_fresh_vegetables/Organic Carrots.jpeg'),
      name: 'Farm Fresh Vegetables',
      slug: 'farm-fresh-vegetables',
    },
    maxQuantity: 20,
  },
  {
    id: 9,
    title: 'Cashews',
    slug: 'cashews',
    heroImage: require('../assets/categories/dry_fruits/Cashews.jpeg'),
    imagesUrl: [
      require('../assets/categories/dry_fruits/Cashews.jpeg'),
    ],
    price: 399.99,
    category: {
      imageUrl: require('../assets/categories/dry_fruits/Cashews.jpeg'),
      name: 'Dry Fruits',
      slug: 'dry-fruits',
    },
    maxQuantity: 8,
  },
  {
    id: 10,
    title: 'Pure Desi Ghee',
    slug: 'pure-desi-ghee',
    heroImage: require('../assets/categories/desi_ghee/Pure Desi Ghee.jpg'),
    imagesUrl: [
      require('../assets/categories/desi_ghee/Pure Desi Ghee.jpg'),
    ],
    price: 549.99,
    category: {
      imageUrl: require('../assets/categories/desi_ghee/Pure Desi Ghee.jpg'),
      name: 'Desi Ghee',
      slug: 'desi-ghee',
    },
    maxQuantity: 7,
  },
  {
    id: 11,
    title: 'Cold Pressed Groundnut Oil',
    slug: 'cold-pressed-groundnut-oil',
    heroImage: require('../assets/categories/cold_pressed_oil/cold-pressed-groundnut-oil.jpg'),
    imagesUrl: [
      require('../assets/categories/cold_pressed_oil/cold-pressed-groundnut-oil.jpg'),
    ],
    price: 349.99,
    category: {
      imageUrl: require('../assets/categories/cold_pressed_oil/cold-pressed-groundnut-oil.jpg'),
      name: 'Cold Pressed Oil',
      slug: 'cold-pressed-oil',
    },
    maxQuantity: 6,
  },
  {
    id: 12,
    title: 'Chopped Mixed Vegetables',
    slug: 'chopped-mixed-vegetables',
    heroImage: require('../assets/categories/chopped_vegetables/Chopped Mixed Vegetables.jpeg'),
    imagesUrl: [ 
      require('../assets/categories/chopped_vegetables/Chopped Mixed Vegetables.jpeg'),   
    ],
    price: 129.99,
    category: {
      imageUrl: require('../assets/categories/chopped_vegetables/Chopped Mixed Vegetables.jpeg'),
      name: 'Chopped Vegetables',
      slug: 'chopped-vegetables',
    },
    maxQuantity: 15,
  },
];
