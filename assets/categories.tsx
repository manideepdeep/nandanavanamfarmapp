import { Category } from './types/category';
import { PRODUCTS } from './products';


export const CATEGORIES: Category[] = [
  {
    name: 'Tiffin Batter',
    slug: 'tiffin-batter',
    imageUrl: 'https://images.saymedia-content.com/.image/t_share/MjAzNjc1MDMxNTMxNDk3MzM0/thick-poha-dosa-chutney-combo.jpg',
    products: PRODUCTS.filter(product => product.category.slug === 'tiffin-batter'),
  },
  {
    name: 'Sugar & Jaggery',
    slug: 'sugar-jaggery',
    imageUrl: 'https://oongole.com/assets/upload/salts_and_sweets.jpg',
    products: PRODUCTS.filter(product => product.category.slug === 'sugar-jaggery'),
  },
  {
    name: 'Spice Powders',
    slug: 'spice-powders',
    imageUrl: 'https://images.saymedia-content.com/.image/t_share/MTczODA2MDU2MjA2ODM3MzA2/15-masala-powders-of-indian-cuisine.jpg',
    products: PRODUCTS.filter(product => product.category.slug === 'spice-powders'),
  },
  {
    name: 'Pickles and Chutneys',
    slug: 'pickles-chutneys',
    imageUrl: 'https://img2.exportersindia.com/product_images/bc-full/dir_80/2370564/pickles-chutney-753543.jpg',
    products: PRODUCTS.filter(product => product.category.slug === 'pickles-chutneys'),
  },
  {
    name: 'Natural Honey',
    slug: 'natural-honey',
    imageUrl: 'https://www.mashed.com/img/gallery/what-is-raw-honey-and-is-it-safe-to-eat/l-intro-1628792606.jpg',
    products: PRODUCTS.filter(product => product.category.slug === 'natural-honey'),
  },
  {
    name: 'Millets',
    slug: 'millets',
    imageUrl: 'https://kj1bcdn.b-cdn.net/media/84780/millets.jpg',
    products: PRODUCTS.filter(product => product.category.slug === 'millets'),
  },
  {
    name: 'Fresh Meat & Seafood',
    slug: 'fresh-meat-seafood',
    imageUrl: 'https://img.freepik.com/premium-photo/mediterranean-diet-with-fish-meat-vegetables_95419-6292.jpg',
    products: PRODUCTS.filter(product => product.category.slug === 'fresh-meat-seafood'),
  },
  {
    name: 'Farm Fresh Vegetables',
    slug: 'farm-fresh-vegetables',
    imageUrl: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/basket-full-of-farm-fresh-vegetables-garry-gay.jpg',
    products: PRODUCTS.filter(product => product.category.slug === 'farm-fresh-vegetables'),
  },
  {
    name: 'Dry Fruits',
    slug: 'dry-fruits',
    imageUrl: 'https://wallpaperaccess.com/full/2546486.jpg',
    products: PRODUCTS.filter(product => product.category.slug === 'dry-fruits'),
  },
  {
    name: 'Desi Ghee',
    slug: 'desi-ghee',
    imageUrl: 'https://images.hindustantimes.com/img/2022/11/16/1600x900/ghee_1668591383582_1668591395673_1668591395673.jpg',
    products: PRODUCTS.filter(product => product.category.slug === 'desi-ghee'),
  },
  {
    name: 'Cold Pressed Oil',
    slug: 'cold-pressed-oil',
    imageUrl: 'https://tiimg.tistatic.com/fp/1/008/265/cold-pressed-refined-soybean-oil-597.jpg',
    products: PRODUCTS.filter(product => product.category.slug === 'cold-pressed-oil'),
  },
  {
    name: 'Chopped Vegetables',
    slug: 'chopped-vegetables',
    imageUrl: 'https://c1.staticflickr.com/9/8879/18682421042_c84057108e_z.jpg',
    products: PRODUCTS.filter(product => product.category.slug === 'chopped-vegetables'),
  },
];
