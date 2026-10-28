import React from 'react';
import { useApp } from '../context/AppContext';

export const NotificationModal: React.FC = () => {
  const { isNotificationOpen, closeNotification, config } = useApp();

  if (!isNotificationOpen) return null;

  const lines = config.notificationText.split(/\r?\n/);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-5 pb-12 bg-[#0a1637]/55 backdrop-blur-md transition-opacity duration-300">
      <div className="relative w-full max-w-[460px] bg-white rounded-[26px] shadow-[0_30px_80px_-10px_rgba(0,0,0,0.55)] animate-in fade-in zoom-in-95 duration-300">
        <div className="w-full aspect-[1.85/1] rounded-t-[26px] overflow-hidden bg-[#e6eeff]">
          <img
            src="/Notification.jpg"
            alt="Notification"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-[18px_14px_46px] text-center">
          <p className="text-[14.5px] leading-relaxed font-semibold text-[#0f172a] whitespace-pre-line">
            {lines.map((line, idx) => (
              <React.Fragment key={idx}>
                {line}
                {idx < lines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        </div>

        {/* Floating Close Button */}
        <button
          type="button"
          onClick={closeNotification}
          className="absolute left-1/2 -bottom-[24px] -translate-x-1/2 flex items-center gap-2 px-8 py-3.5 border-none rounded-full bg-linear-to-r from-blue-500 to-blue-700 text-white font-extrabold text-[15px] leading-none tracking-wider cursor-pointer shadow-[0_0_0_5px_rgba(255,255,255,0.9),0_14px_26px_-8px_rgba(37,99,235,0.9)] hover:scale-105 active:scale-95 transition-all"
        >
          <svg className="w-4 h-4 stroke-current fill-none stroke-[2.6]" viewBox="0 0 24 24">
            <path d="M5 5l14 14M19 5L5 19" />
          </svg>
          CLOSE
        </button>
      </div>
    </div>
  );
};
