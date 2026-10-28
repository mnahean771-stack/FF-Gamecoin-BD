import React from 'react';
import { useApp } from '../context/AppContext';

export const Header: React.FC = () => {
  const { user, config, navigateTo, openDrawer } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#e1e8f5] shadow-xs">
      <div className="max-w-[1000px] mx-auto px-4 h-[68px] flex items-center justify-between">
        <button
          onClick={() => navigateTo('home')}
          className="inline-flex items-center h-[44px] max-w-[160px] text-left cursor-pointer focus:outline-none"
        >
          <img
            src="/Main logo.jpg"
            alt={config.websiteName}
            className="h-full w-auto max-w-full object-contain"
            onError={(e) => {
              (e.currentTarget as HTMLElement).style.display = 'none';
            }}
          />
          <span className="sr-only">{config.websiteName}</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('add-money')}
            className="flex items-center gap-2 h-[42px] px-4 pl-3 rounded-full bg-linear-to-r from-blue-500 to-blue-700 text-white font-bold text-[15px] shadow-[0_8px_18px_-6px_rgba(37,99,235,0.6)] hover:brightness-105 active:scale-95 transition-all cursor-pointer"
            title="Wallet Balance - Click to Add Money"
          >
            <svg className="w-[19px] h-[19px] fill-none stroke-current stroke-[1.8]" viewBox="0 0 24 24">
              <path d="M3 7a2 2 0 0 1 2-2h13v3" />
              <path d="M3 7v11a2 2 0 0 0 2 2h14a1 1 0 0 0 1-1V9H5a2 2 0 0 1-2-2z" />
              <circle cx="16" cy="14.5" r="1.3" fill="currentColor" />
            </svg>
            <span>{user.balance.toFixed(0)}৳</span>
          </button>

          <button
            onClick={openDrawer}
            aria-label="Profile"
            className="inline-flex items-center justify-center w-[42px] height-[42px] h-[42px] rounded-full p-[2px] bg-linear-to-r from-blue-500 to-blue-700 shadow-[0_6px_14px_-4px_rgba(37,99,235,0.5)] cursor-pointer hover:scale-105 active:scale-95 transition-all"
          >
            <div className="w-full h-full rounded-full bg-[#eff6ff] flex items-center justify-center text-blue-600 overflow-hidden">
              {user.avatar ? (
                <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <svg className="w-[21px] h-[21px] fill-none stroke-current stroke-[2.2]" viewBox="0 0 24 24">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />
                </svg>
              )}
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
