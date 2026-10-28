import React from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { QuickLinks } from './components/QuickLinks';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailView } from './components/ProductDetailView';
import { MyOrdersView } from './components/MyOrdersView';
import { MyCodesView } from './components/MyCodesView';
import { MyAccountView } from './components/MyAccountView';
import { AddMoneyView } from './components/AddMoneyView';
import { AccountDrawer } from './components/AccountDrawer';
import { AuthModal } from './components/AuthModal';
import { NotificationModal } from './components/NotificationModal';
import { BottomNav } from './components/BottomNav';
import { FloatingSupport } from './components/FloatingSupport';
import { Footer } from './components/Footer';

export const AppContent: React.FC = () => {
  const { view, toastMessage } = useApp();

  return (
    <div className="min-h-screen bg-[#f5f8ff] text-[#0f172a] font-sans antialiased relative selection:bg-blue-500 selection:text-white">
      {/* Background ambient gradient glow matching original */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(600px 400px at 90% -5%, rgba(37,99,235,0.12), transparent 70%), radial-gradient(500px 500px at -10% 45%, rgba(96,165,250,0.14), transparent 70%)'
        }}
      />

      {/* Global Header */}
      <Header />

      {/* Main View Router */}
      <main className="min-h-[calc(100vh-68px)]">
        {view === 'home' && (
          <div className="max-w-[1000px] mx-auto px-4">
            <HeroBanner />
            <QuickLinks />
            <ProductGrid />
            <Footer />
          </div>
        )}

        {view === 'product' && <ProductDetailView />}
        {view === 'my-orders' && <MyOrdersView />}
        {view === 'my-codes' && <MyCodesView />}
        {view === 'account' && <MyAccountView />}
        {view === 'add-money' && <AddMoneyView />}
      </main>

      {/* Floating Elements & Nav */}
      <FloatingSupport />
      <BottomNav />
      <AccountDrawer />
      <AuthModal />
      <NotificationModal />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed left-1/2 bottom-[104px] -translate-x-1/2 z-50 max-w-[calc(100%-40px)] px-4.5 py-3 rounded-[14px] bg-[#0f172a] text-white text-[14px] font-semibold text-center shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-200">
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default function App() {
  return <AppContent />;
}
