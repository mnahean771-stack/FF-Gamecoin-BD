import React from 'react';
import { useApp } from '../context/AppContext';

export const MyCodesView: React.FC = () => {
  const { codes, openDrawer, navigateTo, showToast } = useApp();

  const GARENA_REDEEM_URL = 'https://reward.ff.garena.com/';

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast('কোড কপি হয়েছে');
  };

  return (
    <div className="max-w-[1000px] mx-auto px-2.5 pb-[130px]">
      <div className="flex items-center gap-3.5 mt-4">
        <button
          type="button"
          onClick={openDrawer}
          aria-label="Menu"
          className="w-[46px] h-[46px] rounded-[15px] border border-[#e1e8f5] bg-white text-[#0f172a] grid place-items-center text-[24px] cursor-pointer shadow-[0_4px_12px_-6px_rgba(20,40,90,0.2)] active:scale-95 transition-all"
        >
          <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
            <rect x="4" y="3" width="16" height="18" rx="3" />
            <path d="M8 8h8M8 12h8M8 16h5" />
          </svg>
        </button>
        <h1 className="text-[26px] font-extrabold tracking-tight text-[#0f172a] flex-1 min-w-0">My Codes</h1>
        <a
          href={GARENA_REDEEM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-linear-to-r from-blue-500 to-blue-700 text-white font-bold text-[14px] cursor-pointer shadow-[0_10px_22px_-10px_rgba(37,99,235,0.85)] hover:brightness-105 active:scale-95 transition-all shrink-0"
        >
          <svg className="w-4 h-4 fill-none stroke-current stroke-[2.2]" viewBox="0 0 24 24">
            <path d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5" />
            <path d="M15 3h6v6M10 14L21 3" />
          </svg>
          Redeem Code
        </a>
      </div>

      {codes.length === 0 ? (
        <div className="flex flex-col items-center text-center mt-4 p-[40px_20px] rounded-[30px] bg-white border border-[#e1e8f5] shadow-[0_8px_22px_-14px_rgba(20,40,90,0.25)]">
          <h3 className="text-[20px] font-semibold text-[#2b3345]">No code data found !</h3>
          <button
            onClick={() => navigateTo('home')}
            className="inline-flex items-center justify-center mt-5 px-8 py-3 rounded-full bg-linear-to-r from-blue-500 to-blue-700 text-white text-[16px] font-bold tracking-wide shadow-[0_10px_22px_-10px_rgba(37,99,235,0.85)] cursor-pointer active:scale-97 transition-all"
          >
            ORDER NOW
          </button>
        </div>
      ) : (
        <div className="grid gap-3 mt-4">
          {codes.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-[18px] bg-white border border-[#e1e8f5] shadow-[0_8px_22px_-14px_rgba(20,40,90,0.3)] flex items-center justify-between"
            >
              <div>
                <b className="block text-[15px] font-extrabold text-[#0f172a]">{item.title}</b>
                <code className="block mt-1 text-[14px] font-bold tracking-wider text-[#2563eb]">{item.code}</code>
                <small className="block mt-1 text-[11px] text-[#666b85]">{item.date}</small>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(item.code)}
                className="w-10 h-10 rounded-full bg-[#e8f0ff] text-[#2563eb] grid place-items-center cursor-pointer active:scale-95 transition-all"
                title="Copy Code"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <rect x="4" y="3" width="16" height="18" rx="3" />
                  <path d="M8 8h8M8 12h8M8 16h5" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
