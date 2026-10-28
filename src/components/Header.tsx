import React from 'react';
import { useApp } from '../context/AppContext';
import { UserAvatar } from './UserAvatar';

export const Header: React.FC = () => {
  const { user, config, view, navigateTo, setDashboardTab } = useApp();

  const handleBack = () => {
    if (view !== 'home') {
      navigateTo('home');
    }
  };

  const handleWalletClick = () => {
    setDashboardTab('wallet');
    navigateTo('dashboard', undefined, 'wallet');
  };

  const handleAvatarClick = () => {
    setDashboardTab('profile');
    navigateTo('dashboard', undefined, 'profile');
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#e2e8f0] shadow-xs">
      <div className="max-w-[560px] mx-auto px-4 h-[58px] flex items-center justify-between">
        {/* Left Side: Back button + Brand Logo */}
        <div className="flex items-center gap-2">
          {view !== 'home' ? (
            <button
              type="button"
              onClick={handleBack}
              aria-label="Back to home"
              className="w-8 h-8 -ml-1 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-100 active:scale-95 transition-all cursor-pointer"
            >
              <svg className="w-5 h-5 fill-none stroke-current stroke-[2.2]" viewBox="0 0 24 24">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => navigateTo('home')}
              className="w-8 h-8 -ml-1 rounded-full flex items-center justify-center text-gray-400 opacity-0 pointer-events-none"
            >
              <svg className="w-5 h-5 fill-none stroke-current stroke-[2.2]" viewBox="0 0 24 24">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          )}

          <button
            type="button"
            onClick={() => navigateTo('home')}
            className="flex items-center gap-2 text-left cursor-pointer focus:outline-none"
          >
            <div className="w-[30px] h-[30px] shrink-0">
              <img
                src="/nt_logo.svg"
                alt="New TopUp Logo"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/Main logo.jpg';
                }}
              />
            </div>
            <span className="font-extrabold text-[17px] text-gray-900 tracking-tight">
              {config.websiteName || 'New TopUp'}
            </span>
          </button>
        </div>

        {/* Right Side: Wallet pill badge + Profile Avatar */}
        <div className="flex items-center gap-2.5">
          {/* Wallet pill button matching screenshot */}
          <button
            type="button"
            onClick={handleWalletClick}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-[12px] bg-[#f0f9ff] border border-[#bae6fd] text-[#0284c7] font-bold text-[13.5px] hover:bg-[#e0f2fe] active:scale-95 transition-all cursor-pointer shadow-2xs"
            title="Wallet Balance"
          >
            <svg className="w-4 h-4 fill-none stroke-current stroke-[2.2]" viewBox="0 0 24 24">
              <path d="M3 7a2 2 0 0 1 2-2h13v3" />
              <path d="M3 7v11a2 2 0 0 0 2 2h14a1 1 0 0 0 1-1V9H5a2 2 0 0 1-2-2z" />
              <circle cx="16" cy="14.5" r="1.3" fill="currentColor" />
            </svg>
            <span>৳{Math.floor(user.balance)}</span>
          </button>

          {/* User profile avatar circle matching screenshot */}
          <button
            type="button"
            onClick={handleAvatarClick}
            aria-label="Profile"
            className="w-[36px] h-[36px] rounded-full overflow-hidden border border-gray-200 bg-gray-100 cursor-pointer hover:ring-2 hover:ring-[#0284c7]/40 active:scale-95 transition-all shrink-0"
          >
            <UserAvatar className="w-full h-full" />
          </button>
        </div>
      </div>
    </header>
  );
};
