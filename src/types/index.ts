export interface ProductPackage {
  id: string;
  name: string;
  price: number;
  subtitle?: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  image: string;
  badge: string;
  packages: ProductPackage[];
  inputLabel: string;
  inputPlaceholder: string;
  rules: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  balance: number;
  supportPin: string;
  verified: boolean;
  loggedIn: boolean;
}

export interface Order {
  id: string;
  status: 'Completed' | 'Pending' | 'Cancelled';
  date: string;
  updated: string;
  package: string;
  price: number;
  playerId: string;
  paymentMethod: string;
  productName: string;
}

export interface RedeemCode {
  id: string;
  title: string;
  code: string;
  date: string;
}

export interface SiteConfig {
  websiteName: string;
  telegramChannel: string;
  telegramGroup: string;
  youtubeChannel: string;
  notificationText: string;
  phoneNumbers: {
    bKash: string;
    Nagad: string;
    Rocket: string;
  };
}
