import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PAYMENT_STEPS } from '../config/siteConfig';

type PaymentMethod = 'bKash' | 'Nagad' | 'Rocket';

const METHOD_DETAILS: Record<
  PaymentMethod,
  { color: string; logo: string; number: string }
> = {
  bKash: { color: '#d1175f', logo: '/bkash.png', number: '01983003336' },
  Nagad: { color: '#e8312a', logo: '/nagad.png', number: '01983003336' },
  Rocket: { color: '#8b2a8e', logo: '/rocket.png', number: '01XXXXXXXXX' }
};

export const AddMoneyView: React.FC = () => {
  const { navigateTo, user, showToast, addMoneyRequest } = useApp();

  const [step, setStep] = useState<1 | 2>(1);
  const [amountInput, setAmountInput] = useState<string>('100');
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('bKash');
  const [trxId, setTrxId] = useState<string>('');

  const numAmount = parseFloat(amountInput) || 0;

  const handleNextStep = () => {
    if (!numAmount || numAmount < 10 || numAmount > 50000) {
      showToast('১০ থেকে ৫০,০০০ টাকার মধ্যে দিন');
      return;
    }
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyNumber = () => {
    const num = METHOD_DETAILS[selectedMethod].number;
    navigator.clipboard.writeText(num);
    showToast(`নম্বর কপি হয়েছে: ${num}`);
  };

  const handleVerify = () => {
    const cleanTrx = trxId.trim();
    if (cleanTrx.length < 6) {
      showToast('সঠিক ট্রানজ্যাকশন আইডি দিন');
      return;
    }

    addMoneyRequest(numAmount, selectedMethod, cleanTrx);
  };

  const activeColor = METHOD_DETAILS[selectedMethod].color;

  return (
    <div className="max-w-[480px] mx-auto px-3.5 pb-[130px] pt-4">
      {/* Top Header */}
      <div className="flex items-center gap-3 mb-3.5">
        <button
          type="button"
          onClick={() => {
            if (step === 2) setStep(1);
            else navigateTo('home');
          }}
          aria-label="Back"
          className="w-10 h-10 rounded-[12px] bg-[#eaf1ff] text-[#2563eb] text-[20px] grid place-items-center cursor-pointer shrink-0 active:scale-95 transition-all"
        >
          <svg className="w-5 h-5 fill-none stroke-current stroke-2 rotate-180" viewBox="0 0 24 24">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
        <h2 className="text-[20px] font-extrabold text-[#0f172a] m-0">
          {step === 1 ? 'Add Money' : 'ওয়ালেটে টাকা যোগ করুন'}
        </h2>
      </div>

      {step === 1 ? (
        <div>
          {/* Amount Card */}
          <div className="bg-white border-[1.5px] border-[#e1e8f5] rounded-[18px] overflow-hidden mb-3.5 shadow-[0_10px_24px_-16px_rgba(37,99,235,0.4)]">
            <div className="p-[14px_16px] text-[18px] font-extrabold border-b border-[#e1e8f5] text-[#0f172a]">
              Add Money
            </div>
            <div className="p-[14px_16px]">
              <label htmlFor="amountInp" className="block font-bold text-[14px] mb-2 text-[#334]">
                Enter the amount
              </label>
              <input
                id="amountInp"
                type="number"
                inputMode="numeric"
                min="10"
                max="50000"
                value={amountInput}
                onChange={(e) => setAmountInput(e.target.value)}
                placeholder="Amount"
                className="w-full h-[50px] border-[1.5px] border-[#d6dfef] rounded-[12px] px-3.5 text-[16px] mb-3 outline-none focus:border-[#3b82f6] text-[#0f172a] bg-white"
              />
              <p className="text-[12.5px] text-[#667] -mt-1 mb-3">সর্বনিম্ন ১০ টাকা, সর্বোচ্চ ৫০,০০০ টাকা</p>
              <button
                type="button"
                onClick={handleNextStep}
                className="w-full h-[50px] rounded-[12px] bg-linear-to-r from-blue-500 to-blue-700 text-white text-[16px] font-extrabold cursor-pointer active:scale-99 transition-all shadow-md"
              >
                Click Here To Add Money
              </button>
            </div>
          </div>

          {/* Tutorial Card */}
          <div className="bg-white border-[1.5px] border-[#e1e8f5] rounded-[18px] overflow-hidden mb-3.5 shadow-[0_10px_24px_-16px_rgba(37,99,235,0.4)]">
            <div className="p-[14px_16px] text-[18px] font-extrabold border-b border-[#e1e8f5] text-[#0f172a]">
              How to add money
            </div>
            <div className="p-[14px_16px]">
              <div className="relative w-full aspect-video bg-[#0b1330] rounded-[10px] overflow-hidden flex items-center justify-center p-4 text-center">
                <div className="text-white">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-blue-600 flex items-center justify-center">
                    <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                  <b className="block text-[14px]">টাকা অ্যাড করার নিয়ম</b>
                  <span className="block text-[12px] text-slate-300 mt-1">
                    বিকাশ, নগদ বা রকেট থেকে Send Money করে Transaction ID ভেরিফাই করুন
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Step 2: Payment Provider Tabs */
        <div className="max-w-[380px] mx-auto">
          <div className="text-left mb-3">
            <b className="block text-[17px] text-[#0f172a]">ওয়ালেটে টাকা যোগ করুন</b>
            <span className="text-[13px] text-[#667]">নম্বরে টাকা পাঠিয়ে ট্রানজ্যাকশন আইডি লিখুন</span>
          </div>

          <div
            className="rounded-[18px] overflow-hidden shadow-[0_14px_28px_-14px_rgba(0,0,0,0.45)] transition-colors duration-200"
            style={{ backgroundColor: activeColor }}
          >
            {/* Tabs */}
            <div className="flex bg-white">
              {(['bKash', 'Nagad', 'Rocket'] as PaymentMethod[]).map((m) => {
                const isCurrent = selectedMethod === m;
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setSelectedMethod(m)}
                    className={`flex-1 flex flex-col items-center gap-1.5 py-2.5 px-1 border-b-[3px] font-bold text-[13px] cursor-pointer transition-all ${
                      isCurrent ? 'border-b-[#2563eb] text-[#2563eb] bg-[#f8faff]' : 'border-b-transparent text-[#334] bg-white'
                    }`}
                  >
                    <span className="w-[30px] h-[30px] rounded-[9px] overflow-hidden bg-white grid place-items-center border border-slate-100">
                      <img src={METHOD_DETAILS[m].logo} alt={m} className="w-full h-full object-cover" />
                    </span>
                    {m}
                  </button>
                );
              })}
            </div>

            <div className="p-4 text-white">
              {/* Operator info header */}
              <div className="flex items-center justify-between mb-3.5">
                <div className="flex items-center gap-2.5 font-extrabold text-[18px]">
                  <i className="w-[38px] h-[38px] rounded-[11px] bg-white overflow-hidden grid place-items-center">
                    <img src={METHOD_DETAILS[selectedMethod].logo} alt="" className="w-full h-full object-cover" />
                  </i>
                  <span>{selectedMethod}</span>
                </div>
                <div className="font-extrabold text-[19px] text-right">
                  ৳{numAmount.toFixed(2)}
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="block text-[12px] font-semibold underline cursor-pointer opacity-95 text-right w-full"
                  >
                    পরিবর্তন
                  </button>
                </div>
              </div>

              <div className="text-[13px] font-bold mb-1.5 opacity-95">এই নম্বরে টাকা পাঠান</div>
              <div className="flex items-center justify-between bg-black/20 rounded-[11px] p-3 font-extrabold text-[17px] tracking-wide">
                <div>
                  <small className="block text-[10px] font-bold opacity-80 tracking-wider mb-0.5">
                    PERSONAL · নম্বর ১
                  </small>
                  <span>{METHOD_DETAILS[selectedMethod].number}</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyNumber}
                  className="rounded-[8px] bg-white/25 text-white px-3 py-1.5 font-bold text-[13px] cursor-pointer hover:bg-white/35 active:scale-95 transition-all"
                >
                  কপি
                </button>
              </div>

              <div className="text-[13px] font-bold mt-3 mb-1.5 opacity-95">ট্রানজ্যাকশন আইডি</div>
              <input
                type="text"
                value={trxId}
                onChange={(e) => setTrxId(e.target.value.toUpperCase())}
                placeholder="ট্রানজ্যাকশন আইডি দিন"
                autoComplete="off"
                className="w-full h-[46px] rounded-[10px] px-3 text-[15px] outline-none bg-white text-[#0f172a] uppercase font-bold tracking-wider"
              />

              {/* Instructions */}
              <ol className="bg-black/20 rounded-[11px] p-3 my-3.5 text-[13.5px] leading-relaxed list-none">
                {PAYMENT_STEPS[selectedMethod].map((stepText, idx) => (
                  <li key={idx} className="py-1 flex gap-1.5 border-b border-white/15 last:border-b-0">
                    <b className="whitespace-nowrap">{idx + 1}.</b>
                    <span>{stepText.replace('{amt}', `${numAmount.toFixed(2)} ৳`)}</span>
                  </li>
                ))}
              </ol>

              <button
                type="button"
                onClick={handleVerify}
                className="w-full h-[48px] rounded-[11px] bg-white font-extrabold text-[16px] cursor-pointer shadow-md active:scale-98 transition-all"
                style={{ color: activeColor }}
              >
                ভেরিফাই &rarr;
              </button>
            </div>
          </div>

          <p className="text-center text-[12px] text-[#667] mt-3.5">
            {user.loggedIn ? `লগইন: ${user.email || user.name}` : 'লগইন করে রাখলে ট্রানজেকশন সহজে ট্র্যাক করা যায়'}
          </p>
        </div>
      )}
    </div>
  );
};
