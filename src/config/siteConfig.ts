import { ProductCategory, SiteConfig } from '../types';

export const DEFAULT_CONFIG: SiteConfig = {
  websiteName: 'FF Gamecoin',
  telegramChannel: 'https://t.me/',
  telegramGroup: 'https://t.me/',
  youtubeChannel: 'https://youtube.com/',
  notificationText: `সবথেকে কম দামে টপ করার জন্য সেরা ওয়েবসাইট
১০০% বিশ্বস্ত ও দ্রুত ডেলিভারিতে
অর্ডার করুন নিশ্চিন্তে ♥️`,
  phoneNumbers: {
    bKash: '01983003336',
    Nagad: '01983003336',
    Rocket: '01XXXXXXXXX'
  }
};

export const STANDARD_RULES = [
  'সঠিক প্লেয়ার আইডি দিয়ে অর্ডার করুন। ভুল আইডিতে টপআপ হয়ে গেলে কর্তৃপক্ষ দায়ী থাকবে না।',
  'অর্ডার করার আগে আইডির নাম চেক করে নিন।',
  'টপআপ সম্পন্ন হতে সাধারণত ২ সেকেন্ড থেকে কয়েক মিনিট সময় লাগতে পারে।',
  'একবার অর্ডার সাবমিট করার পর বাতিল বা রিফান্ড করা হয় না।',
  'যেকোনো সমস্যায় অর্ডারের স্ক্রিনশট সহ টেলিগ্রামে যোগাযোগ করুন।'
];

export const PRODUCTS: ProductCategory[] = [
  {
    id: 'ff-likes',
    name: 'FF Likes',
    image: '/FF LIKES.jpg',
    badge: '২ সেকেন্ডে টপআপ',
    inputLabel: 'প্লেয়ার আইডি বসান',
    inputPlaceholder: 'প্লেয়ার আইডি বসান',
    rules: STANDARD_RULES,
    packages: [
      { id: 'like-1', name: '200 FF LIKE', subtitle: 'প্রতিদিন ১ আইডিতে ১বার', price: 30 },
      { id: 'like-2', name: '3000 FF LIKE', subtitle: '15 দিন এ পাবেন', price: 450 },
      { id: 'like-3', name: '6000 FF LIKE', subtitle: '30 দিন এ পাবেন', price: 900 },
      { id: 'like-4', name: '12000 FF LIKE', subtitle: '60 দিন এ পাবেন', price: 1800 }
    ]
  },
  {
    id: 'uid-topup',
    name: 'UID Topup (BD)',
    image: '/UID TOPUP (BD).jpg',
    badge: '২ সেকেন্ডে টপআপ',
    inputLabel: 'এখানে গেমের আইডি কোড দিন',
    inputPlaceholder: 'এখানে গেমের আইডি কোড দিন',
    rules: STANDARD_RULES,
    packages: [
      { id: 'uid-1', name: 'WEEKLY', price: 158 },
      { id: 'uid-2', name: 'MONTHLY', price: 790 },
      { id: 'uid-3', name: '25 Diamond', price: 22 },
      { id: 'uid-4', name: '50 Diamond', price: 36 },
      { id: 'uid-5', name: '115 Diamond', price: 79 },
      { id: 'uid-6', name: '240 Diamond', price: 158 },
      { id: 'uid-7', name: '355 Diamond', price: 237 },
      { id: 'uid-8', name: '480 Diamond', price: 316 },
      { id: 'uid-9', name: '610 Diamond', price: 400 },
      { id: 'uid-10', name: '850 Diamond', price: 558 },
      { id: 'uid-11', name: '1240 Diamond', price: 800 },
      { id: 'uid-12', name: '2530 Diamond', price: 1610 },
      { id: 'uid-13', name: '5060 Diamond', price: 3220 },
      { id: 'uid-14', name: '10120 Diamond', price: 6440 }
    ]
  },
  {
    id: 'weekly-monthly',
    name: 'Weekly/Monthly',
    image: '/WEEKLYMONTHLY.jpg',
    badge: '২ সেকেন্ডে টপআপ',
    inputLabel: 'এখানে গেমের আইডি কোড দিন',
    inputPlaceholder: 'এখানে গেমের আইডি কোড দিন',
    rules: STANDARD_RULES,
    packages: [
      { id: 'wm-1', name: 'WEEKLY', price: 155 },
      { id: 'wm-2', name: '2X WEEKLY', price: 310 },
      { id: 'wm-3', name: '3X WEEKLY', price: 465 },
      { id: 'wm-4', name: 'MONTHLY', price: 770 },
      { id: 'wm-5', name: '2X MONTHLY', price: 1540 },
      { id: 'wm-6', name: '1X WEEKLY+1X MONTHLY', price: 925 },
      { id: 'wm-7', name: '3X WEEKLY+1X MONTHLY', price: 1235 }
    ]
  },
  {
    id: 'weekly-lite',
    name: 'Weekly Lite',
    image: '/WEEKLY LITE.jpg',
    badge: '২ সেকেন্ডে টপআপ',
    inputLabel: 'এখানে গেমের আইডি কোড দিন',
    inputPlaceholder: 'এখানে গেমের আইডি কোড দিন',
    rules: STANDARD_RULES,
    packages: [
      { id: 'wl-1', name: '1X Weekly Lite', price: 40 },
      { id: 'wl-2', name: '2X Weekly Lite', price: 80 },
      { id: 'wl-3', name: '3X Weekly Lite', price: 120 },
      { id: 'wl-4', name: '5X Weekly Lite', price: 200 }
    ]
  },
  {
    id: 'level-up-pass',
    name: 'Level Up Pass',
    image: '/LEVEL UP PASS.jpg',
    badge: '২ সেকেন্ডে টপআপ',
    inputLabel: 'এখানে গেমের আইডি কোড দিন',
    inputPlaceholder: 'এখানে গেমের আইডি কোড দিন',
    rules: STANDARD_RULES,
    packages: [
      { id: 'lu-1', name: 'Level Up Package - Level 6', price: 43 },
      { id: 'lu-2', name: 'Level Up Package - Level 10', price: 75 },
      { id: 'lu-3', name: 'Level Up Package - Level 15', price: 75 },
      { id: 'lu-4', name: 'Level Up Package - Level 20', price: 75 },
      { id: 'lu-5', name: 'Level Up Package - Level 25', price: 75 },
      { id: 'lu-6', name: 'Level Up Package - Level 30', price: 105 },
      { id: 'lu-7', name: 'Full Level Up (1270 Diamond)', price: 448 }
    ]
  },
  {
    id: 'indonesia-server',
    name: 'Indonesia Server',
    image: '/INDONESIA SERVER.jpg',
    badge: '২ সেকেন্ডে টপআপ',
    inputLabel: 'এখানে গেমের আইডি কোড দিন',
    inputPlaceholder: 'এখানে গেমের আইডি কোড দিন',
    rules: STANDARD_RULES,
    packages: [
      { id: 'in-1', name: '50 Diamond (Indo)', price: 65 },
      { id: 'in-2', name: '70 Diamond (Indo)', price: 90 },
      { id: 'in-3', name: '100 Diamond (Indo)', price: 130 },
      { id: 'in-4', name: '140 Diamond (Indo)', price: 180 },
      { id: 'in-5', name: '355 Diamond (Indo)', price: 445 },
      { id: 'in-6', name: '720 Diamond (Indo)', price: 890 },
      { id: 'in-7', name: '7290 Diamond (Indo)', price: 8800 },
      { id: 'in-8', name: 'Weekly (Indo)', price: 255 },
      { id: 'in-9', name: 'Monthly (Indo)', price: 800 }
    ]
  }
];

export const PAYMENT_STEPS: Record<string, string[]> = {
  bKash: [
    '*247# ডায়াল করে আপনার bKash মোবাইল মেনুতে যান অথবা bKash অ্যাপ খুলুন।',
    'Send Money -এ ক্লিক করুন।',
    'উপরের নম্বরে টাকা পাঠান।',
    'টাকার পরিমাণ: {amt}',
    'নিশ্চিত করে এখন আপনার bKash PIN লিখুন।',
    'টাকা পাঠান এবং ট্রানজ্যাকশন আইডি কপি করুন।',
    'ট্রানজ্যাকশন আইডি লিখে ভেরিফাই চাপুন।'
  ],
  Nagad: [
    '*167# ডায়াল করে আপনার Nagad মোবাইল মেনুতে যান অথবা Nagad অ্যাপ খুলুন।',
    'Send Money -এ ক্লিক করুন।',
    'উপরের নম্বরে টাকা পাঠান।',
    'টাকার পরিমাণ: {amt}',
    'নিশ্চিত করে এখন আপনার Nagad PIN লিখুন।',
    'টাকা পাঠান এবং ট্রানজ্যাকশন আইডি কপি করুন।',
    'ট্রানজ্যাকশন আইডি লিখে ভেরিফাই চাপুন।'
  ],
  Rocket: [
    '*322# ডায়াল করে আপনার Rocket মোবাইল মেনুতে যান অথবা Rocket অ্যাপ খুলুন।',
    'Send Money -এ ক্লিক করুন।',
    'উপরের নম্বরে টাকা পাঠান।',
    'টাকার পরিমাণ: {amt}',
    'নিশ্চিত করে এখন আপনার Rocket PIN লিখুন।',
    'টাকা পাঠান এবং ট্রানজ্যাকশন আইডি কপি করুন।',
    'ট্রানজ্যাকশন আইডি লিখে ভেরিফাই চাপুন।'
  ]
};
