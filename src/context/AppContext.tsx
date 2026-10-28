import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Order, RedeemCode, SiteConfig, DashboardTab } from '../types';
import { DEFAULT_CONFIG } from '../config/siteConfig';

export type AppView = 'home' | 'product' | 'dashboard' | 'my-orders' | 'my-codes' | 'account' | 'add-money';

interface AppContextType {
  view: AppView;
  selectedProductId: string;
  config: SiteConfig;
  user: User;
  orders: Order[];
  codes: RedeemCode[];
  dashboardTab: DashboardTab;
  toastMessage: string | null;
  isAuthOpen: boolean;
  authMode: 'login' | 'register';
  isNotificationOpen: boolean;
  isDrawerOpen: boolean;
  isFabOpen: boolean;
  setDashboardTab: (tab: DashboardTab) => void;
  navigateTo: (view: AppView, productId?: string, tab?: DashboardTab) => void;
  showToast: (msg: string) => void;
  openAuth: (mode?: 'login' | 'register') => void;
  closeAuth: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleFab: () => void;
  closeFab: () => void;
  closeNotification: () => void;
  loginUser: (email: string, name?: string) => void;
  registerUser: (name: string, phone: string, email: string) => void;
  logoutUser: () => void;
  updateBalance: (delta: number) => void;
  placeOrder: (productId: string, packageName: string, price: number, playerId: string, paymentMethod: string) => boolean;
  addMoneyRequest: (amount: number, method: string, transactionId: string) => void;
  redeemCode: (code: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEFAULT_USER: User = {
  id: 'usr_nahean',
  name: 'Md Nahean',
  email: 'mnahean771@gmail.com',
  phone: '01800000000',
  avatar: '/avatar.svg',
  balance: 0,
  supportPin: '5849',
  verified: true,
  loggedIn: true,
  referralCode: 'NAHEAN771',
  referralEarnings: 0,
  totalReferrals: 0,
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [view, setView] = useState<AppView>('home');
  const [dashboardTab, setDashboardTab] = useState<DashboardTab>('wallet');
  const [selectedProductId, setSelectedProductId] = useState<string>('ff-likes');
  const [config] = useState<SiteConfig>(DEFAULT_CONFIG);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isNotificationOpen, setIsNotificationOpen] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isFabOpen, setIsFabOpen] = useState(false);

  // User persistence
  const [user, setUser] = useState<User>(() => {
    try {
      const saved = localStorage.getItem('ff_react_user');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_USER;
  });

  // Orders persistence - default to empty to match screenshot
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('ff_react_orders');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  });

  // Codes persistence
  const [codes, setCodes] = useState<RedeemCode[]>(() => {
    try {
      const saved = localStorage.getItem('ff_react_codes');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('ff_react_user', JSON.stringify(user));
      if (user.loggedIn) {
        localStorage.setItem('ff_logged', '1');
      } else {
        localStorage.removeItem('ff_logged');
      }
    } catch {
      // ignore
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('ff_react_orders', JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('ff_react_codes', JSON.stringify(codes));
    } catch {
      // ignore
    }
  }, [codes]);

  // Handle URL hash / search sync
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      const search = new URLSearchParams(window.location.search);
      const tabParam = search.get('tab') as DashboardTab | null;

      if (!hash) {
        if (tabParam && ['orders', 'wallet', 'referrals', 'profile'].includes(tabParam)) {
          setDashboardTab(tabParam);
          setView('dashboard');
          return;
        }
        setView('home');
        return;
      }

      if (hash === 'dashboard' || hash.startsWith('dashboard')) {
        if (tabParam && ['orders', 'wallet', 'referrals', 'profile'].includes(tabParam)) {
          setDashboardTab(tabParam);
        }
        setView('dashboard');
      } else if (hash === 'my-orders' || hash === 'orders') {
        setDashboardTab('orders');
        setView('dashboard');
      } else if (hash === 'wallet') {
        setDashboardTab('wallet');
        setView('dashboard');
      } else if (hash === 'referrals') {
        setDashboardTab('referrals');
        setView('dashboard');
      } else if (hash === 'account' || hash === 'profile') {
        setDashboardTab('profile');
        setView('dashboard');
      } else if (hash === 'my-codes') {
        setView('my-codes');
      } else if (hash === 'add-money') {
        setView('add-money');
      } else {
        setSelectedProductId(hash);
        setView('product');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2800);
  };

  const navigateTo = (newView: AppView, productId?: string, tab?: DashboardTab) => {
    setIsDrawerOpen(false);
    setIsFabOpen(false);
    if (tab) {
      setDashboardTab(tab);
    }
    if (newView === 'home') {
      window.location.hash = '';
      setView('home');
    } else if (newView === 'dashboard') {
      const activeTab = tab || dashboardTab;
      window.location.hash = `dashboard?tab=${activeTab}`;
      setView('dashboard');
    } else if (newView === 'my-orders') {
      setDashboardTab('orders');
      window.location.hash = 'dashboard?tab=orders';
      setView('dashboard');
    } else if (newView === 'account') {
      setDashboardTab('profile');
      window.location.hash = 'dashboard?tab=profile';
      setView('dashboard');
    } else if (newView === 'product') {
      const id = productId || selectedProductId;
      setSelectedProductId(id);
      window.location.hash = id;
      setView('product');
    } else {
      window.location.hash = newView;
      setView(newView);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openAuth = (mode: 'login' | 'register' = 'login') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
    setIsDrawerOpen(false);
  };

  const closeAuth = () => setIsAuthOpen(false);
  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
  const toggleFab = () => setIsFabOpen((prev) => !prev);
  const closeFab = () => setIsFabOpen(false);
  const closeNotification = () => setIsNotificationOpen(false);

  const loginUser = (email: string, name?: string) => {
    const derivedName = name || email.split('@')[0] || 'Gamer';
    setUser({
      id: `usr_${Date.now()}`,
      name: derivedName,
      email,
      phone: '01712345678',
      balance: user.balance > 0 ? user.balance : 150,
      supportPin: String(Math.floor(1000000 + Math.random() * 9000000)),
      verified: true,
      loggedIn: true
    });
    setIsAuthOpen(false);
    showToast(`স্বাগতম, ${derivedName}! লগইন সফল হয়েছে`);
  };

  const registerUser = (name: string, phone: string, email: string) => {
    setUser({
      id: `usr_${Date.now()}`,
      name,
      email,
      phone,
      balance: 100, // Welcome bonus
      supportPin: String(Math.floor(1000000 + Math.random() * 9000000)),
      verified: true,
      loggedIn: true
    });
    setIsAuthOpen(false);
    showToast(`রেজিস্ট্রেশন সফল হয়েছে! ওয়ালেটে ১০০৳ বোনাস যোগ হয়েছে`);
  };

  const logoutUser = () => {
    setUser(DEFAULT_USER);
    setIsDrawerOpen(false);
    showToast('লগআউট সম্পন্ন হয়েছে');
    navigateTo('home');
  };

  const updateBalance = (delta: number) => {
    setUser((prev) => ({
      ...prev,
      balance: Math.max(0, prev.balance + delta)
    }));
  };

  const placeOrder = (
    productId: string,
    packageName: string,
    price: number,
    playerId: string,
    paymentMethod: string
  ): boolean => {
    if (!user.loggedIn) {
      openAuth('login');
      return false;
    }

    if (paymentMethod === 'Wallet Pay' && user.balance < price) {
      showToast(`ওয়ালেটে পর্যাপ্ত টাকা নেই! প্রয়োজন ${price}৳, আছে ${user.balance}৳`);
      return false;
    }

    if (paymentMethod === 'Wallet Pay') {
      updateBalance(-price);
    }

    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-GB') + ' ' + now.toLocaleTimeString('en-US');

    const newOrder: Order = {
      id: String(Math.floor(2000000 + Math.random() * 800000)),
      status: 'Pending',
      date: formattedDate,
      updated: formattedDate,
      package: packageName,
      price,
      playerId,
      paymentMethod,
      productName: productId.toUpperCase().replace('-', ' ')
    };

    setOrders((prev) => [newOrder, ...prev]);
    showToast(`অর্ডার সাবমিট হয়েছে (#${newOrder.id})! দ্রুত টপআপ সম্পন্ন হবে`);

    // Simulate completion in 5 seconds
    setTimeout(() => {
      setOrders((prev) =>
        prev.map((o) => (o.id === newOrder.id ? { ...o, status: 'Completed', updated: new Date().toLocaleTimeString('en-US') } : o))
      );
    }, 5000);

    return true;
  };

  const addMoneyRequest = (amount: number, method: string, transactionId: string) => {
    // Automatically credit to wallet for seamless experience and simulate validation
    updateBalance(amount);
    showToast(`আপনার ${amount}৳ জমার অনুরোধ ভেরিফাই হয়েছে! ব্যালেন্সে যোগ করা হয়েছে (${method})`);
    navigateTo('account');
  };

  const redeemCode = (code: string): boolean => {
    if (!code.trim()) return false;
    const newCode: RedeemCode = {
      id: `cd_${Date.now()}`,
      title: 'Diamond Voucher',
      code: code.trim(),
      date: new Date().toLocaleDateString('en-GB')
    };
    setCodes((prev) => [newCode, ...prev]);
    showToast('কোড রিডিম সফল হয়েছে!');
    return true;
  };

  return (
    <AppContext.Provider
      value={{
        view,
        selectedProductId,
        config,
        user,
        orders,
        codes,
        dashboardTab,
        toastMessage,
        isAuthOpen,
        authMode,
        isNotificationOpen,
        isDrawerOpen,
        isFabOpen,
        setDashboardTab,
        navigateTo,
        showToast,
        openAuth,
        closeAuth,
        openDrawer,
        closeDrawer,
        toggleFab,
        closeFab,
        closeNotification,
        loginUser,
        registerUser,
        logoutUser,
        updateBalance,
        placeOrder,
        addMoneyRequest,
        redeemCode
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
