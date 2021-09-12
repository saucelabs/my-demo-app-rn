export interface ItemInterface {
  id: number;
  name: string;
  desc: string;
  price: number;
  imageUrl: number;
  review: number;
  colors: ITEM_COLOR_TYPE[];
  defaultColor: ITEM_COLOR_TYPE;
}
export type ITEM_COLOR_TYPE =
  | ITEM_COLORS.BLACK
  | ITEM_COLORS.BLUE
  | ITEM_COLORS.GRAY
  | ITEM_COLORS.RED;

export enum ITEM_COLORS {
  BLACK = 'black',
  BLUE = 'blue',
  GRAY = 'gray',
  RED = 'red',
}

export const StoreData: ItemInterface[] = [
  {
    id: 1,
    name: 'Sauce Labs Backpack',
    desc: 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.',
    price: 29.99,
    imageUrl: require('../assets/images/sauce-backpack.jpg'),
    review: 4,
    colors: [
      ITEM_COLORS.BLACK,
      ITEM_COLORS.BLUE,
      ITEM_COLORS.GRAY,
      ITEM_COLORS.RED,
    ],
    defaultColor: ITEM_COLORS.BLACK,
  },
  {
    id: 2,
    name: 'Sauce Labs Bike Light',
    desc: "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.",
    price: 9.99,
    imageUrl: require('../assets/images/bike-light.jpg'),
    review: 4,
    colors: [ITEM_COLORS.BLACK],
    defaultColor: ITEM_COLORS.BLACK,
  },
  {
    id: 3,
    name: 'Sauce Labs Bolt T-Shirt',
    desc: 'Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.',
    price: 15.99,
    imageUrl: require('../assets/images/bolt-shirt.jpg'),
    review: 4,
    colors: [ITEM_COLORS.BLACK],
    defaultColor: ITEM_COLORS.BLACK,
  },
  {
    id: 4,
    name: 'Sauce Labs Fleece Jacket',
    desc: "It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.",
    price: 49.99,
    imageUrl: require('../assets/images/sauce-pullover.jpg'),
    review: 4,
    colors: [ITEM_COLORS.GRAY],
    defaultColor: ITEM_COLORS.GRAY,
  },
  {
    id: 5,
    name: 'Sauce Labs Onesie',
    desc: "Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.",
    price: 7.99,
    imageUrl: require('../assets/images/red-onesie.jpg'),
    review: 4,
    colors: [ITEM_COLORS.BLACK, ITEM_COLORS.GRAY, ITEM_COLORS.RED],
    defaultColor: ITEM_COLORS.RED,
  },
  {
    id: 6,
    name: 'Test.allTheThings() T-Shirt',
    desc: 'This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.',
    price: 15.99,
    imageUrl: require('../assets/images/red-tatt.jpg'),
    review: 4,
    colors: [ITEM_COLORS.BLACK, ITEM_COLORS.GRAY, ITEM_COLORS.RED],
    defaultColor: ITEM_COLORS.RED,
  },
];
