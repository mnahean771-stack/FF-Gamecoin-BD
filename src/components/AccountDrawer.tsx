import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';

export const AccountDrawer: React.FC = () => {
  const { isDrawerOpen, closeDrawer, user, navigateTo, openAuth, logoutUser, config } = useApp();

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen]);

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={closeDrawer}
        className="fixed inset-0 bg-[#0a1637]/50 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Drawer */}
      <aside className="relative w-[85%] max-w-[340px] h-full bg-white shadow-2xl flex flex-col z-10 overflow-y-auto animate-in slide-in-from-right duration-300 pb-24">
        {/* Top Profile Header */}
        <div className="relative flex flex-col items-center p-4 bg-white border-b border-[#e1e8f5]">
          <button
            type="button"
            onClick={closeDrawer}
            aria-label="Close Drawer"
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#f1f5fd] text-[#2563eb] grid place-items-center cursor-pointer active:scale-95"
          >
            ✕
          </button>

          <div className="flex items-center gap-2.5 w-full mt-2">
            <div className="w-[52px] h-[52px] rounded-[14px] p-[2.5px] bg-linear-to-r from-blue-500 to-blue-700 shadow-md shrink-0">
              <div className="w-full h-full rounded-[11.5px] overflow-hidden bg-[#eff6ff] grid place-items-center text-[#2563eb] text-[24px]">
                {user.avatar ? (
                  <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <svg className="w-6 h-6 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />
                  </svg>
                )}
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <b className="block text-[15px] font-extrabold text-[#0f172a] truncate">
                {user.loggedIn ? `Hi, ${user.name}` : 'Hi, Guest'}
              </b>
              <span className="block mt-0.5 text-[12px] text-[#666b85] truncate">
                {user.loggedIn ? user.email || user.phone : 'লগইন করে অর্ডার করুন'}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              if (user.loggedIn) {
                logoutUser();
              } else {
                openAuth('login');
              }
            }}
            className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-[10px] bg-linear-to-r from-blue-500 to-blue-700 text-white text-[13.5px] font-bold cursor-pointer shadow-sm active:scale-95 transition-all"
          >
            <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              {user.loggedIn ? (
                <>
                  <path d="M12 3v8" />
                  <path d="M6.5 6.5a8 8 0 1 0 11 0" />
                </>
              ) : (
                <>
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                  <path d="M10 17l5-5-5-5M15 12H3" />
                </>
              )}
            </svg>
            <span>{user.loggedIn ? 'Logout' : 'Login'}</span>
          </button>
        </div>

        {/* Links */}
        <nav className="bg-white border-b border-[#e1e8f5]">
          <button
            onClick={() => navigateTo('account')}
            className="flex items-center gap-3 w-full p-3.5 text-[14.5px] font-bold text-[#0f172a] text-left hover:bg-[#eff5ff] border-b border-slate-100 transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5 text-slate-700 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <path d="M3 11l9-8 9 8v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <path d="M9 21v-6h6v6" />
            </svg>
            <span>My Account</span>
          </button>

          <button
            onClick={() => navigateTo('my-orders')}
            className="flex items-center gap-3 w-full p-3.5 text-[14.5px] font-bold text-[#0f172a] text-left hover:bg-[#eff5ff] border-b border-slate-100 transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5 text-slate-700 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4.500L5 21V4a1 1 0 0 1 1-1z" />
            </svg>
            <span>My Orders</span>
          </button>

          <button
            onClick={() => navigateTo('my-codes')}
            className="flex items-center gap-3 w-full p-3.5 text-[14.5px] font-bold text-[#0f172a] text-left hover:bg-[#eff5ff] border-b border-slate-100 transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5 text-slate-700 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <rect x="3" y="3" width="7.5" height="7.5" rx="1.5" />
              <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" />
              <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" />
              <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5" />
            </svg>
            <span>My Codes</span>
          </button>

          <button
            onClick={() => navigateTo('add-money')}
            className="flex items-center gap-3 w-full p-3.5 text-[14.5px] font-bold text-[#0f172a] text-left hover:bg-[#eff5ff] border-b border-slate-100 transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5 text-slate-700 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <path d="M5 2v6M2 5h6" />
              <path d="M5 11v8a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-6" />
              <rect x="12" y="13" width="5" height="4" rx="1" />
            </svg>
            <span>Add Money</span>
          </button>

          <a
            href={config.telegramChannel}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 w-full p-3.5 text-[14.5px] font-bold text-[#0f172a] text-left hover:bg-[#eff5ff] border-b border-slate-100 transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5 text-slate-700 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 11v6M12 7.5v.01" />
            </svg>
            <span>Contact Us</span>
          </a>
        </nav>

        <div className="p-4">
          <a
            href={config.telegramChannel}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 p-3 rounded-[12px] bg-linear-to-r from-blue-500 to-blue-700 text-white text-[14.5px] font-bold shadow-md"
          >
            <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
              <rect x="3" y="13" width="4" height="6" rx="2" />
              <rect x="17" y="13" width="4" height="6" rx="2" />
              <path d="M19 19c0 2-2 3-5 3h-1.5" />
            </svg>
            <span>Support</span>
          </a>
        </div>
      </aside>
    </div>
  );
};
