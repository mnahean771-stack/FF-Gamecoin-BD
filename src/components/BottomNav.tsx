import React from 'react';
import { useApp } from '../context/AppContext';

export const BottomNav: React.FC = () => {
  const { view, navigateTo } = useApp();

  return (
    <nav className="fixed left-1/2 -translate-x-1/2 bottom-[calc(6px+env(safe-area-inset-bottom,0px))] w-[min(calc(100%-20px),520px)] h-[68px] z-45 grid grid-cols-5 rounded-[24px] bg-white/95 backdrop-blur-xl border border-[#e1e8f5] shadow-[0_10px_28px_rgba(20,40,100,0.16)] md:hidden">
      {/* Home */}
      <button
        type="button"
        onClick={() => navigateTo('home')}
        className={`flex flex-col items-center justify-center gap-1 text-[10.5px] font-semibold relative cursor-pointer transition-colors ${
          view === 'home' || view === 'product' ? 'text-[#2563eb]' : 'text-[#666b85]'
        }`}
      >
        <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
          <path d="M3 11l9-8 9 8v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <path d="M9 21v-6h6v6" />
        </svg>
        <span>Home</span>
        {(view === 'home' || view === 'product') && (
          <span className="absolute top-[5px] w-[18px] h-[3px] rounded-full bg-[#2563eb]" />
        )}
      </button>

      {/* My Orders */}
      <button
        type="button"
        onClick={() => navigateTo('my-orders')}
        className={`flex flex-col items-center justify-center gap-1 text-[10.5px] font-semibold relative cursor-pointer transition-colors ${
          view === 'my-orders' ? 'text-[#2563eb]' : 'text-[#666b85]'
        }`}
      >
        <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
          <rect x="3" y="7" width="18" height="14" rx="2" />
          <path d="M8 7V4h8v3M3 12h18" />
        </svg>
        <span>My Orders</span>
        {view === 'my-orders' && (
          <span className="absolute top-[5px] w-[18px] h-[3px] rounded-full bg-[#2563eb]" />
        )}
      </button>

      {/* Add Money (Elevated Center) */}
      <button
        type="button"
        onClick={() => navigateTo('add-money')}
        className="flex flex-col items-center justify-end pb-2 text-[10.5px] font-semibold relative text-[#2563eb] cursor-pointer"
      >
        <div className="absolute -top-[22px] w-[58px] h-[58px] rounded-full bg-linear-to-r from-blue-500 to-blue-700 text-white grid place-items-center border-4 border-white shadow-[0_10px_22px_-4px_rgba(37,99,235,0.8)] hover:scale-105 active:scale-95 transition-transform">
          <svg className="w-6 h-6 fill-none stroke-current stroke-[2.4]" viewBox="0 0 24 24">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </div>
        <span>Add Money</span>
      </button>

      {/* My Codes */}
      <button
        type="button"
        onClick={() => navigateTo('my-codes')}
        className={`flex flex-col items-center justify-center gap-1 text-[10.5px] font-semibold relative cursor-pointer transition-colors ${
          view === 'my-codes' ? 'text-[#2563eb]' : 'text-[#666b85]'
        }`}
      >
        <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
          <rect x="2" y="4" width="20" height="16" rx="3" />
          <path d="M7 10h6M7 14h3" />
        </svg>
        <span>My Codes</span>
        {view === 'my-codes' && (
          <span className="absolute top-[5px] w-[18px] h-[3px] rounded-full bg-[#2563eb]" />
        )}
      </button>

      {/* My Account */}
      <button
        type="button"
        onClick={() => navigateTo('account')}
        className={`flex flex-col items-center justify-center gap-1 text-[10.5px] font-semibold relative cursor-pointer transition-colors ${
          view === 'account' ? 'text-[#2563eb]' : 'text-[#666b85]'
        }`}
      >
        <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />
        </svg>
        <span>My Account</span>
        {view === 'account' && (
          <span className="absolute top-[5px] w-[18px] h-[3px] rounded-full bg-[#2563eb]" />
        )}
      </button>
    </nav>
  );
};
