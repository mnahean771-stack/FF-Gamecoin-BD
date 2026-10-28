import React from 'react';
import { useApp } from '../context/AppContext';
import { DashboardTab } from '../types';
import { UserAvatar } from './UserAvatar';

export const DashboardView: React.FC = () => {
  const {
    user,
    orders,
    dashboardTab,
    setDashboardTab,
    navigateTo,
    config,
    showToast,
    logoutUser
  } = useApp();

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    showToast(`রেফারেল কোড "${code}" কপি করা হয়েছে!`);
  };

  const handleCopySupportPin = () => {
    navigator.clipboard.writeText(user.supportPin);
    showToast(`সাপোর্ট পিন "${user.supportPin}" কপি করা হয়েছে!`);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-[120px]">
      {/* Top Header - Exact match to Screenshot */}
      <header className="sticky top-0 z-30 bg-white border-b border-[#e2e8f0] shadow-xs">
        <div className="max-w-[700px] mx-auto px-4 h-[60px] flex items-center justify-between">
          {/* Back button */}
          <button
            type="button"
            onClick={() => navigateTo('home')}
            className="w-9 h-9 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-100 active:scale-95 transition-colors cursor-pointer"
            aria-label="Go back to Home"
          >
            <svg className="w-5 h-5 fill-none stroke-current stroke-[2.4]" viewBox="0 0 24 24">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Logo & Brand Name */}
          <button
            type="button"
            onClick={() => navigateTo('home')}
            className="flex items-center gap-2 cursor-pointer focus:outline-none"
          >
            {/* Dynamic stylized brand badge */}
            <div className="w-8 h-8 rounded-lg bg-linear-to-tr from-[#0284c7] via-[#0ea5e9] to-[#38bdf8] flex items-center justify-center shadow-xs">
              <svg className="w-5 h-5 text-white fill-none stroke-current stroke-[2.2]" viewBox="0 0 24 24">
                <path d="M12 2l7 7-7 13-7-13 7-7z" />
                <path d="M5 9h14" />
                <path d="M12 2v20" />
              </svg>
            </div>
            <span className="font-extrabold text-[17px] text-[#0f172a] tracking-tight">
              {config.websiteName || 'New TopUp'}
            </span>
          </button>

          {/* Right Header items: Wallet pill + Profile Avatar */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setDashboardTab('wallet')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#bae6fd] bg-[#f0f9ff] text-[#0284c7] font-bold text-[13px] hover:bg-[#e0f2fe] active:scale-95 transition-all cursor-pointer"
              title="Wallet Balance"
            >
              <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <rect x="3" y="6" width="18" height="13" rx="2" />
                <path d="M16 12.5a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0" />
                <path d="M3 10h18" />
              </svg>
              <span>৳{user.balance.toFixed(0)}</span>
            </button>

            <button
              type="button"
              onClick={() => setDashboardTab('profile')}
              aria-label="Profile"
              className="cursor-pointer active:scale-95 transition-transform"
            >
              <UserAvatar className="w-[34px] h-[34px] ring-2 ring-sky-100" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="max-w-[700px] mx-auto px-4 pt-4">
        {/* User Summary Card - Exact match to screenshot */}
        <section className="bg-white rounded-2xl border border-[#e2e8f0] p-4.5 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <UserAvatar className="w-13 h-13 shadow-sm ring-2 ring-[#e0f2fe]" />
            <div>
              <h2 className="font-bold text-[16px] text-gray-900 leading-tight">
                {user.name || 'Md Nahean'}
              </h2>
              <p className="text-[12.5px] text-gray-500 mt-0.5">
                {user.email || 'mnahean771@gmail.com'}
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[12px] font-medium text-gray-400 block">Wallet</span>
            <span className="text-[19px] font-extrabold text-[#0284c7] tracking-tight">
              ৳{user.balance.toFixed(2)}
            </span>
          </div>
        </section>

        {/* Tab Segment Controls - Exact 4 tabs as shown in screenshots */}
        <nav className="mt-4 bg-[#f1f5f9] p-1 rounded-xl grid grid-cols-4 gap-1 text-[13px] font-medium text-gray-600">
          {/* Orders Tab */}
          <button
            type="button"
            onClick={() => setDashboardTab('orders')}
            className={`flex items-center justify-center gap-1.5 py-2.5 rounded-lg transition-all cursor-pointer ${
              dashboardTab === 'orders'
                ? 'bg-white text-[#0284c7] font-semibold shadow-xs'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <svg className="w-4 h-4 fill-none stroke-current stroke-2 shrink-0" viewBox="0 0 24 24">
              <rect x="4" y="8" width="16" height="13" rx="2" />
              <path d="M8 8V6a4 4 0 0 1 8 0v2" />
            </svg>
            <span>Orders</span>
          </button>

          {/* Wallet Tab */}
          <button
            type="button"
            onClick={() => setDashboardTab('wallet')}
            className={`flex items-center justify-center gap-1.5 py-2.5 rounded-lg transition-all cursor-pointer ${
              dashboardTab === 'wallet'
                ? 'bg-white text-[#0284c7] font-semibold shadow-xs'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <svg className="w-4 h-4 fill-none stroke-current stroke-2 shrink-0" viewBox="0 0 24 24">
              <rect x="3" y="6" width="18" height="13" rx="2" />
              <path d="M16 12.5a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0" />
              <path d="M3 10h18" />
            </svg>
            <span>Wallet</span>
          </button>

          {/* Referrals Tab */}
          <button
            type="button"
            onClick={() => setDashboardTab('referrals')}
            className={`flex items-center justify-center gap-1.5 py-2.5 rounded-lg transition-all cursor-pointer ${
              dashboardTab === 'referrals'
                ? 'bg-white text-[#0284c7] font-semibold shadow-xs'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <svg className="w-4 h-4 fill-none stroke-current stroke-2 shrink-0" viewBox="0 0 24 24">
              <polyline points="20 12 20 22 4 22 4 12" />
              <rect x="2" y="7" width="20" height="5" rx="1" />
              <line x1="12" y1="22" x2="12" y2="7" />
              <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
              <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
            </svg>
            <span>Referrals</span>
          </button>

          {/* Profile Tab */}
          <button
            type="button"
            onClick={() => setDashboardTab('profile')}
            className={`flex items-center justify-center gap-1.5 py-2.5 rounded-lg transition-all cursor-pointer ${
              dashboardTab === 'profile'
                ? 'bg-white text-[#0284c7] font-semibold shadow-xs'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <svg className="w-4 h-4 fill-none stroke-current stroke-2 shrink-0" viewBox="0 0 24 24">
              <circle cx="12" cy="7" r="4" />
              <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />
            </svg>
            <span>Profile</span>
          </button>
        </nav>

        {/* TAB 1: WALLET - Exact match to Screenshot 1 */}
        {dashboardTab === 'wallet' && (
          <div className="mt-4 space-y-4 animate-in fade-in duration-200">
            {/* AVAILABLE BALANCE CARD */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5.5 shadow-xs">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase block">
                    AVAILABLE BALANCE
                  </span>
                  <div className="text-[32px] font-extrabold text-[#0284c7] tracking-tight mt-1">
                    ৳{user.balance.toFixed(2)}
                  </div>
                </div>

                <div className="w-12 h-12 rounded-xl bg-[#e0f2fe] text-[#0284c7] flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 fill-none stroke-current stroke-[2.2]" viewBox="0 0 24 24">
                    <rect x="3" y="6" width="18" height="13" rx="2" />
                    <path d="M16 12.5a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0" />
                    <path d="M3 10h18" />
                  </svg>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-[#f1f5f9] my-4" />

              {/* Description */}
              <p className="text-[13px] text-gray-600 leading-relaxed">
                Add balance instantly with bKash, Nagad, or Rocket — verified automatically when possible.
              </p>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => navigateTo('add-money')}
                className="w-full mt-4 py-3.5 bg-[#0284c7] hover:bg-[#0369a1] text-white font-semibold text-[15px] rounded-xl shadow-xs transition-colors cursor-pointer text-center block"
              >
                Add balance
              </button>
            </div>

            {/* PAYMENT HISTORY CARD */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5.5 shadow-xs">
              <h3 className="font-bold text-[16px] text-gray-900">Payment history</h3>

              <div className="py-7 text-left">
                <p className="text-[13.5px] text-gray-500">
                  No wallet/top-up/direct payment history yet.
                </p>
              </div>

              {/* Pagination footer */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                <span>Page 1 of 1 · Total 0</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled
                    className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-300 bg-gray-50 cursor-not-allowed text-xs font-medium"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    disabled
                    className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-300 bg-gray-50 cursor-not-allowed text-xs font-medium"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ORDERS - Exact match to Screenshot 2 */}
        {dashboardTab === 'orders' && (
          <div className="mt-4 animate-in fade-in duration-200">
            {orders.length === 0 ? (
              <div className="bg-transparent py-20 flex flex-col items-center justify-center text-center">
                {/* Outlined cute bag icon matching screenshot */}
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-gray-300">
                  <svg className="w-12 h-12 fill-none stroke-current stroke-[1.4]" viewBox="0 0 24 24">
                    <rect x="4" y="8" width="16" height="13" rx="2" />
                    <path d="M8 8V6a4 4 0 0 1 8 0v2" />
                  </svg>
                </div>
                <p className="text-[14px] font-medium text-gray-500 mt-2">
                  No orders yet
                </p>
              </div>
            ) : (
              <div className="space-y-3.5">
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="bg-white rounded-2xl border border-[#e2e8f0] p-4.5 shadow-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] font-mono font-bold text-gray-400">
                        Order #{ord.id}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          ord.status === 'Completed'
                            ? 'bg-green-100 text-green-700'
                            : ord.status === 'Pending'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {ord.status}
                      </span>
                    </div>

                    <div className="mt-2.5 flex items-baseline justify-between">
                      <div>
                        <h4 className="font-bold text-[15px] text-gray-900">{ord.productName}</h4>
                        <p className="text-xs text-[#0284c7] font-semibold mt-0.5">
                          {ord.package} · Player ID: {ord.playerId}
                        </p>
                      </div>
                      <span className="text-[16px] font-extrabold text-[#0284c7]">
                        ৳{ord.price}
                      </span>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-gray-100 text-[11px] text-gray-400 flex items-center justify-between">
                      <span>{ord.date}</span>
                      <span>{ord.paymentMethod}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Glowing Floating Support Button - Exact match to bottom right in Screenshot 2 */}
            <a
              href={config.telegramChannel || 'https://t.me/ffgamecoin'}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram Helpline Support"
              className="fixed bottom-[96px] right-5 z-40 w-13 h-13 rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white flex items-center justify-center shadow-[0_10px_25px_-5px_rgba(2,132,199,0.5)] ring-8 ring-sky-100/90 active:scale-90 transition-all cursor-pointer"
            >
              <svg className="w-6 h-6 fill-none stroke-current stroke-[2.2]" viewBox="0 0 24 24">
                <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
              </svg>
            </a>
          </div>
        )}

        {/* TAB 3: REFERRALS */}
        {dashboardTab === 'referrals' && (
          <div className="mt-4 space-y-4 animate-in fade-in duration-200">
            {/* Referral Info Card */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5.5 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <polyline points="20 12 20 22 4 22 4 12" />
                    <rect x="2" y="7" width="20" height="5" rx="1" />
                    <line x1="12" y1="22" x2="12" y2="7" />
                    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-[16px] text-gray-900">রেফার করুন এবং আয় করুন</h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    প্রতিটি সফল টপআপে পান আকর্ষণীয় কমিশন ও বোনাস
                  </p>
                </div>
              </div>

              <div className="mt-5 p-3.5 rounded-xl bg-[#f8fafc] border border-gray-200/80 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-gray-400 block">আপনার রেফারেল কোড</span>
                  <span className="font-mono font-extrabold text-[16px] text-[#0284c7]">
                    {user.referralCode || 'FF-NAHEAN77'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyCode(user.referralCode || 'FF-NAHEAN77')}
                  className="px-3.5 py-1.5 rounded-lg bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold cursor-pointer active:scale-95 transition-all"
                >
                  Copy Code
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="p-3.5 rounded-xl bg-sky-50/60 border border-sky-100 text-center">
                  <span className="text-[11px] font-semibold text-gray-500 block">মোট রেফারেল</span>
                  <span className="text-[20px] font-extrabold text-[#0284c7] mt-0.5 block">0</span>
                </div>
                <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-100 text-center">
                  <span className="text-[11px] font-semibold text-gray-500 block">মোট বোনাস আয়</span>
                  <span className="text-[20px] font-extrabold text-emerald-600 mt-0.5 block">৳0.00</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PROFILE */}
        {dashboardTab === 'profile' && (
          <div className="mt-4 space-y-4 animate-in fade-in duration-200">
            {/* Profile Settings Card */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5.5 shadow-xs">
              <div className="flex items-center gap-4">
                <UserAvatar className="w-16 h-16 shadow-md ring-4 ring-[#e0f2fe]" />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-[17px] text-gray-900">{user.name}</h3>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                      Verified
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{user.email}</p>
                  <p className="text-xs text-gray-400 mt-0.5 font-mono">{user.phone || '01800000000'}</p>
                </div>
              </div>

              <div className="mt-5 space-y-3 pt-4 border-t border-gray-100">
                {/* Support PIN row */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <div>
                    <span className="text-[11px] font-semibold text-gray-400 block">Support PIN</span>
                    <span className="font-mono font-bold text-gray-800 text-sm">{user.supportPin}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopySupportPin}
                    className="text-xs font-semibold text-[#0284c7] hover:underline cursor-pointer"
                  >
                    Copy PIN
                  </button>
                </div>

                {/* Telegram Helpline button */}
                <a
                  href={config.telegramChannel || 'https://t.me/ffgamecoin'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl border border-sky-200 bg-sky-50 text-[#0284c7] font-semibold text-xs flex items-center justify-center gap-2 hover:bg-sky-100 transition-colors"
                >
                  <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <path d="M22 2L11 13" />
                    <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                  </svg>
                  <span>টেলিগ্রাম হেল্পলাইন সাপোর্ট (@ffgamecoin)</span>
                </a>

                {/* Logout Button */}
                <button
                  type="button"
                  onClick={logoutUser}
                  className="w-full py-3 px-4 rounded-xl border border-rose-200 bg-rose-50 text-rose-600 font-semibold text-xs flex items-center justify-center gap-2 hover:bg-rose-100 transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  <span>লগ আউট করুন</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
