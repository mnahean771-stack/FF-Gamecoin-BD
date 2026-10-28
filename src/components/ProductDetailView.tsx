import React, { useState, useEffect } from 'react';
import { PRODUCTS } from '../config/siteConfig';
import { useApp } from '../context/AppContext';
import { checkFreeFirePlayer } from '../services/playerChecker';

export const ProductDetailView: React.FC = () => {
  const { selectedProductId, navigateTo, user, placeOrder, showToast, openAuth, config } = useApp();

  const product = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];

  const [selectedPackage, setSelectedPackage] = useState(product.packages[0] || null);
  const [playerId, setPlayerId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Wallet Pay' | 'Instant Pay'>('Wallet Pay');
  const [checkingName, setCheckingName] = useState(false);
  const [playerNameStatus, setPlayerNameStatus] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);
  const [isRefreshingBal, setIsRefreshingBal] = useState(false);

  useEffect(() => {
    setSelectedPackage(product.packages[0] || null);
    setPlayerId('');
    setPlayerNameStatus(null);
  }, [product]);

  const isNumericGame = product.id !== 'roblox' && product.id !== 'clash-of-clans';

  const handleCheckPlayerId = async () => {
    const cleanId = playerId.trim();

    if (product.id === 'roblox') {
      if (cleanId.length < 3) {
        setPlayerNameStatus({ type: 'err', text: 'সঠিক Roblox ইউজারনেম দিন (কমপক্ষে ৩ অক্ষর)' });
        return;
      }
      setPlayerNameStatus({ type: 'ok', text: `Roblox ইউজার: ${cleanId} (ভেরিফাইড)` });
      return;
    }

    if (product.id === 'clash-of-clans') {
      const tag = cleanId.startsWith('#') ? cleanId : '#' + cleanId;
      if (tag.length < 4) {
        setPlayerNameStatus({ type: 'err', text: 'সঠিক প্লেয়ার ট্যাগ দিন (যেমন: #9V8Y2UQQP)' });
        return;
      }
      setPlayerNameStatus({ type: 'ok', text: `COC প্লেয়ার ট্যাগ: ${tag.toUpperCase()} (ভেরিফাইড)` });
      return;
    }

    if (cleanId.length < 6) {
      setPlayerNameStatus({ type: 'err', text: 'সঠিক প্লেয়ার আইডি দিন (কমপক্ষে ৬ সংখ্যা)' });
      return;
    }

    setCheckingName(true);
    setPlayerNameStatus(null);

    const result = await checkFreeFirePlayer(cleanId);
    setCheckingName(false);

    if (result.success && result.name) {
      setPlayerNameStatus({ type: 'ok', text: `আইডি: ${cleanId} (${result.name})` });
    } else {
      setPlayerNameStatus({
        type: 'err',
        text: result.error || 'এই আইডির কোনো প্লেয়ার পাওয়া যায়নি'
      });
    }
  };

  const handleBuy = () => {
    if (!user.loggedIn) {
      openAuth('login');
      return;
    }

    if (!selectedPackage) {
      showToast('আগে একটি রিচার্জ প্যাকেজ সিলেক্ট করুন');
      return;
    }

    const cleanId = playerId.trim();
    const minLength = product.id === 'roblox' ? 3 : product.id === 'clash-of-clans' ? 4 : 6;
    if (cleanId.length < minLength) {
      showToast(product.inputLabel);
      return;
    }

    const success = placeOrder(
      product.id,
      selectedPackage.name,
      selectedPackage.price,
      cleanId,
      paymentMethod
    );

    if (success) {
      // Auto open orders page to review placed order after short delay
      setTimeout(() => {
        navigateTo('my-orders');
      }, 1200);
    }
  };

  const handleRefreshBalance = () => {
    setIsRefreshingBal(true);
    setTimeout(() => {
      setIsRefreshingBal(false);
      showToast(`ওয়ালেট ব্যালেন্স: ${user.balance.toFixed(2)}৳`);
    }, 600);
  };

  return (
    <div className="max-w-[1000px] mx-auto px-2.5 pb-[130px]">
      {/* Back button */}
      <button
        onClick={() => navigateTo('home')}
        className="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 rounded-full border border-[#e1e8f5] bg-white text-[12px] font-semibold text-[#666b85] hover:text-[#2563eb] cursor-pointer shadow-xs active:scale-95 transition-all"
      >
        <svg className="w-3.5 h-3.5 stroke-current fill-none stroke-[2] rotate-180" viewBox="0 0 24 24">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
        Back
      </button>

      {/* Hero Header */}
      <section className="relative mt-3 flex items-center gap-3 p-3 rounded-[18px] bg-linear-to-br from-white to-[#e8f0ff] border border-[#e1e8f5] shadow-[0_10px_26px_-14px_rgba(37,99,235,0.45)] overflow-hidden">
        <div className="w-[66px] h-[66px] rounded-[15px] p-1 border border-[#e1e8f5] bg-white shrink-0 relative z-1">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-[11px]" />
        </div>
        <div className="relative z-1 min-w-0">
          <h1 className="text-[18px] font-extrabold tracking-tight text-[#0f172a] uppercase">{product.name}</h1>
          <span className="inline-flex items-center gap-1.5 mt-1.5 px-2.5 py-1 rounded-full bg-[#e8f0ff] border border-[#c9daff] text-[#2563eb] text-[11.5px] font-bold">
            <svg className="w-3.5 h-3.5 fill-[#f59e0b] stroke-none" viewBox="0 0 24 24">
              <path d="M13 2L4 14h7l-1 8 9-12h-7z" />
            </svg>
            {product.badge}
          </span>
        </div>
      </section>

      {/* Step 1: Select Recharge */}
      <section className="mt-3 rounded-[16px] bg-white border border-[#e1e8f5] shadow-[0_6px_20px_-14px_rgba(20,40,90,0.35)] overflow-hidden">
        <div className="flex items-center gap-2.5 p-3 border-b border-[#e1e8f5]">
          <span className="w-7 h-7 rounded-full bg-linear-to-br from-blue-500 to-blue-700 text-white font-extrabold text-[14px] grid place-items-center shrink-0 shadow-[0_6px_14px_-4px_rgba(37,99,235,0.6)]">
            1
          </span>
          <h2 className="text-[16px] font-extrabold tracking-tight text-[#0f172a]">Select Recharge</h2>
        </div>
        <div className="p-3">
          <div className="grid grid-cols-2 gap-2">
            {product.packages.map((pkg) => {
              const isSelected = selectedPackage?.id === pkg.id;
              return (
                <button
                  key={pkg.id}
                  type="button"
                  onClick={() => setSelectedPackage(pkg)}
                  className={`relative flex flex-col items-center justify-center gap-1 min-h-[64px] p-2 rounded-[12px] border-[1.5px] text-center cursor-pointer transition-all ${
                    isSelected
                      ? 'border-[#2563eb] bg-linear-to-br from-[#eff5ff] to-white shadow-[0_0_0_3px_rgba(37,99,235,0.15),0_8px_16px_-10px_rgba(37,99,235,0.7)]'
                      : 'border-[#e1e8f5] bg-white hover:border-[#93c5fd] active:scale-98 shadow-xs'
                  }`}
                >
                  <span className="text-[14px] font-bold text-[#0f1f4d] leading-snug">
                    {pkg.name}
                    {pkg.subtitle && <small className="block text-[11px] text-[#666b85] font-normal">{pkg.subtitle}</small>}
                  </span>
                  <b className="text-[13px] font-bold text-[#2563eb]">BDT {pkg.price}</b>
                  {isSelected && (
                    <span className="absolute -top-[7px] -right-[5px] w-[18px] h-[18px] rounded-full bg-linear-to-r from-blue-500 to-blue-700 text-white text-[10px] font-extrabold grid place-items-center border-2 border-white shadow-xs">
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <a
            href={config.telegramChannel}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-3.5 px-1 text-[13px] font-bold text-[#2563eb] hover:underline"
          >
            <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <path d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5" />
              <path d="M15 3h6v6M10 14L21 3" />
            </svg>
            <span>কিভাবে অর্ডার করবেন?</span>
            <svg className="w-3.5 h-3.5 stroke-current stroke-[2.4]" viewBox="0 0 24 24">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
      </section>

      {/* Step 2: Account Info */}
      <section className="mt-3 rounded-[16px] bg-white border border-[#e1e8f5] shadow-[0_6px_20px_-14px_rgba(20,40,90,0.35)] overflow-hidden">
        <div className="flex items-center gap-2.5 p-3 border-b border-[#e1e8f5]">
          <span className="w-7 h-7 rounded-full bg-linear-to-br from-blue-500 to-blue-700 text-white font-extrabold text-[14px] grid place-items-center shrink-0 shadow-[0_6px_14px_-4px_rgba(37,99,235,0.6)]">
            2
          </span>
          <h2 className="text-[16px] font-extrabold tracking-tight text-[#0f172a]">Account Info</h2>
        </div>
        <div className="p-3">
          <label className="block text-[13.5px] font-bold text-[#0f172a] mb-1.5">{product.inputLabel}</label>
          <input
            type="text"
            inputMode={isNumericGame ? 'numeric' : 'text'}
            value={playerId}
            onChange={(e) => {
              const val = isNumericGame ? e.target.value.replace(/\D/g, '') : e.target.value;
              setPlayerId(val);
              setPlayerNameStatus(null);
            }}
            placeholder={product.inputPlaceholder}
            className="w-full h-[44px] px-3.5 rounded-[12px] border-[1.5px] border-[#bcd0fb] text-[15px] font-medium text-[#0f172a] outline-none focus:border-[#2563eb] focus:ring-4 focus:ring-blue-500/15 transition-all"
          />

          <button
            type="button"
            disabled={checkingName}
            onClick={handleCheckPlayerId}
            className="w-full h-[40px] mt-2.5 rounded-[10px] bg-linear-to-r from-blue-500 to-blue-700 text-white text-[14px] font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-[0_10px_22px_-10px_rgba(37,99,235,0.85)] active:scale-98 disabled:opacity-60 transition-all"
          >
            {checkingName ? 'চেক করা হচ্ছে...' : 'আপনার গেম আইডির নাম চেক করুন'}
          </button>

          {playerNameStatus && (
            <div
              className={`flex items-center gap-2 mt-2.5 p-2.5 rounded-[10px] text-[13px] font-semibold ${
                playerNameStatus.type === 'ok'
                  ? 'bg-[#ecfdf3] text-[#067647] border border-[#abefc6]'
                  : 'bg-[#fef3f2] text-[#b42318] border border-[#fecdca]'
              }`}
            >
              <svg className="w-4 h-4 shrink-0 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                {playerNameStatus.type === 'ok' ? (
                  <>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M8 12l3 3 5-6" />
                  </>
                ) : (
                  <>
                    <path d="M12 3l10 18H2z" />
                    <path d="M12 10v5M12 18v.01" />
                  </>
                )}
              </svg>
              <span>{playerNameStatus.text}</span>
            </div>
          )}
        </div>
      </section>

      {/* Step 3: Payment Option */}
      <section className="mt-3 rounded-[16px] bg-white border border-[#e1e8f5] shadow-[0_6px_20px_-14px_rgba(20,40,90,0.35)] overflow-hidden">
        <div className="flex items-center gap-2.5 p-3 border-b border-[#e1e8f5]">
          <span className="w-7 h-7 rounded-full bg-linear-to-br from-blue-500 to-blue-700 text-white font-extrabold text-[14px] grid place-items-center shrink-0 shadow-[0_6px_14px_-4px_rgba(37,99,235,0.6)]">
            3
          </span>
          <h2 className="text-[16px] font-extrabold tracking-tight text-[#0f172a]">Select one option</h2>
        </div>
        <div className="p-3">
          <div className="grid grid-cols-2 gap-2.5">
            {/* Wallet Pay */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => setPaymentMethod('Wallet Pay')}
              className={`relative flex flex-col rounded-[15px] border-[1.5px] overflow-hidden cursor-pointer text-left transition-all shadow-[0_8px_22px_-12px_rgba(20,40,90,0.3)] ${
                paymentMethod === 'Wallet Pay'
                  ? 'border-[#3b82f6] ring-2 ring-blue-500/20 shadow-[0_12px_24px_-12px_rgba(37,99,235,0.55)]'
                  : 'border-[#e1e8f5] bg-white'
              }`}
            >
              {paymentMethod === 'Wallet Pay' && (
                <div className="absolute top-0 left-0 w-0 h-0 border-t-[32px] border-t-blue-600 border-r-[32px] border-r-transparent z-10">
                  <span className="absolute -top-[28px] left-[5px] text-white text-[10px] font-bold">✓</span>
                </div>
              )}
              <div className="w-full aspect-[1.9/1] relative bg-white overflow-hidden">
                <img src="/wallet.jpg" alt="Wallet Pay" className="w-full h-full object-cover" />
              </div>
              <div
                className={`py-2 px-3 text-[13px] font-bold transition-colors ${
                  paymentMethod === 'Wallet Pay' ? 'bg-[#dbe7ff] text-[#1d4ed8]' : 'bg-[#d3d8e4] text-[#475569]'
                }`}
              >
                Wallet Pay
              </div>
            </div>

            {/* Instant Pay */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => setPaymentMethod('Instant Pay')}
              className={`relative flex flex-col rounded-[15px] border-[1.5px] overflow-hidden cursor-pointer text-left transition-all shadow-[0_8px_22px_-12px_rgba(20,40,90,0.3)] ${
                paymentMethod === 'Instant Pay'
                  ? 'border-[#3b82f6] ring-2 ring-blue-500/20 shadow-[0_12px_24px_-12px_rgba(37,99,235,0.55)]'
                  : 'border-[#e1e8f5] bg-white'
              }`}
            >
              {paymentMethod === 'Instant Pay' && (
                <div className="absolute top-0 left-0 w-0 h-0 border-t-[32px] border-t-blue-600 border-r-[32px] border-r-transparent z-10">
                  <span className="absolute -top-[28px] left-[5px] text-white text-[10px] font-bold">✓</span>
                </div>
              )}
              <div className="w-full aspect-[1.9/1] relative bg-white overflow-hidden">
                <img src="/andmoney.jpg" alt="Instant Pay" className="w-full h-full object-cover" />
              </div>
              <div
                className={`py-2 px-3 text-[13px] font-bold transition-colors ${
                  paymentMethod === 'Instant Pay' ? 'bg-[#dbe7ff] text-[#1d4ed8]' : 'bg-[#d3d8e4] text-[#475569]'
                }`}
              >
                Instant Pay
              </div>
            </div>
          </div>

          {/* User balance display */}
          {user.loggedIn && (
            <div className="flex items-center gap-2 mt-3 text-[13px] text-[#666b85] bg-[#f8faff] p-2.5 rounded-[12px] border border-[#e1e8f5]">
              <svg className="w-5 h-5 text-blue-600 fill-none stroke-current stroke-2 shrink-0" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 11v6M12 7.5v.01" />
              </svg>
              <span>
                আপনার অ্যাকাউন্ট ব্যালেন্স <b className="text-blue-600 font-extrabold">৳ {user.balance.toFixed(2)}</b>
              </span>
              <button
                type="button"
                onClick={handleRefreshBalance}
                aria-label="Refresh Balance"
                className={`ml-auto w-8 h-8 rounded-[8px] border border-[#e1e8f5] bg-white text-blue-600 grid place-items-center cursor-pointer active:scale-95 transition-all ${
                  isRefreshingBal ? 'animate-spin' : ''
                }`}
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path d="M20 12a8 8 0 1 1-2.500-5.800" />
                  <path d="M20 4v5h-5" />
                </svg>
              </button>
            </div>
          )}

          {/* Need amount requirement hint */}
          <p className="flex items-center gap-2 mt-3.5 text-[13px] text-[#666b85]">
            <svg className="w-5 h-5 text-blue-600 fill-none stroke-current stroke-2 shrink-0" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 11v6M12 7.5v.01" />
            </svg>
            <span>
              প্রোডাক্ট কিনতে আপনার প্রয়োজন <b className="text-blue-600 text-[14px] font-extrabold">{selectedPackage?.price || 0}</b> ৳ ।
            </span>
          </p>

          {!user.loggedIn && (
            <p className="flex items-center gap-2 mt-2 text-[#f59e42] font-bold text-[14px]">
              <svg className="w-5 h-5 text-[#f59e42] fill-none stroke-current stroke-2 shrink-0" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 11v6M12 7.5v.01" />
              </svg>
              <span>Please Login To Purchase</span>
            </p>
          )}

          <button
            type="button"
            onClick={handleBuy}
            className="w-full h-[44px] mt-3.5 mb-1 rounded-[12px] bg-linear-to-r from-blue-500 to-blue-700 text-white font-bold text-[15px] flex items-center justify-center gap-2 cursor-pointer shadow-[0_10px_22px_-10px_rgba(37,99,235,0.85)] hover:brightness-105 active:scale-98 transition-all"
          >
            {user.loggedIn ? 'Buy Now' : 'Login'}
          </button>
        </div>
      </section>

      {/* Rules & Conditions */}
      <section className="mt-3 rounded-[16px] bg-white border border-[#e1e8f5] shadow-[0_6px_20px_-14px_rgba(20,40,90,0.35)] overflow-hidden">
        <div className="flex items-center gap-2.5 p-3 border-b border-[#e1e8f5]">
          <svg className="w-5 h-5 text-blue-600 fill-none stroke-current stroke-2 shrink-0" viewBox="0 0 24 24">
            <rect x="4" y="3" width="16" height="18" rx="3" />
            <path d="M8 8h8M8 12h8M8 16h5" />
          </svg>
          <h2 className="text-[16px] font-extrabold tracking-tight text-[#0f172a]">Rules &amp; Conditions</h2>
        </div>
        <div className="p-3">
          <ul className="grid gap-2 list-none">
            {product.rules.map((rule, idx) => (
              <li key={idx} className="relative pl-4 text-[13px] leading-relaxed text-[#666b85]">
                <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-blue-500" />
                {rule}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contact Us */}
      <section className="mt-5">
        <h2 className="text-[18px] font-extrabold text-[#111827] mb-3">Contact Us</h2>
        <a
          href={config.telegramChannel}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3.5 p-4 rounded-[14px] bg-white shadow-[0_6px_18px_-10px_rgba(20,40,90,0.25)] border border-[#e1e8f5] hover:border-blue-300 transition-all"
        >
          <span className="w-10 h-10 rounded-full bg-[#0a8fd6] text-white grid place-items-center text-[20px] shrink-0">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M21.5 3.2 2.7 10.6c-1 .4-1 1.2-.2 1.4l4.8 1.5 1.8 5.6c.2.6.4.8.9.8.4 0 .6-.2.9-.4l2.3-2.2 4.7 3.5c.9.5 1.5.2 1.7-.8l3.1-14.8c.3-1.2-.5-1.8-1.2-1.5zM8.4 13l9.2-5.8c.4-.3.8-.1.5.2l-7.6 6.9-.3 3.2z" />
            </svg>
          </span>
          <div className="min-w-0 flex-1">
            <b className="flex items-center gap-1.5 text-[15px] font-bold text-[#2b2b2b]">
              Telegram HelpLine
              <svg className="w-[17px] h-[17px]" viewBox="0 0 24 24">
                <path
                  fill="#2979ff"
                  d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.67-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.34 2.19c-1.39-.46-2.9-.2-3.91.81s-1.27 2.52-.81 3.91C2.63 9.33 1.75 10.57 1.75 12s.88 2.67 2.19 3.34c-.46 1.39-.2 2.9.81 3.91s2.52 1.27 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.67-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34z"
                />
                <polygon fill="#fff" points="9.65 16.4 5.8 12.55 7.2 11.15 9.65 13.6 16.8 6.45 18.2 7.85" />
              </svg>
            </b>
            <p className="text-[13px] text-[#666b85] mt-0.5">সকাল ৮টা থেকে রাত ১২টা</p>
          </div>
        </a>
      </section>
    </div>
  );
};
