import React from 'react';

interface UserAvatarProps {
  className?: string;
  size?: number;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ className = 'w-10 h-10', size = 44 }) => {
  return (
    <div className={`relative rounded-full overflow-hidden shrink-0 select-none ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full object-cover"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background gradient */}
        <defs>
          <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e1b4b" />
            <stop offset="50%" stopColor="#31102f" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="jacketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#dc2626" />
            <stop offset="50%" stopColor="#991b1b" />
            <stop offset="100%" stopColor="#450a0a" />
          </linearGradient>
          <linearGradient id="hairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#18181b" />
            <stop offset="100%" stopColor="#09090b" />
          </linearGradient>
        </defs>

        <rect width="100" height="100" fill="url(#bgGrad)" />

        {/* Ambient background glow */}
        <circle cx="50" cy="50" r="42" fill="#ef4444" opacity="0.15" />

        {/* Jacket / Hoodie - Red & Black anime outfit */}
        <path
          d="M15 100 Q 18 78 30 72 Q 40 85 50 85 Q 60 85 70 72 Q 82 78 85 100 Z"
          fill="url(#jacketGrad)"
        />
        {/* Black inner shirt/hoodie lining */}
        <path
          d="M32 72 Q 42 82 50 82 Q 58 82 68 72 L 64 100 L 36 100 Z"
          fill="#09090b"
        />
        {/* Red zipper / trim */}
        <line x1="50" y1="82" x2="50" y2="100" stroke="#ef4444" strokeWidth="2" />

        {/* Neck */}
        <path d="M42 60 L 42 75 Q 50 80 58 75 L 58 60 Z" fill="#fed7aa" />
        <path d="M42 63 Q 50 72 58 63 L 58 66 Q 50 75 42 66 Z" fill="#fdba74" opacity="0.6" />

        {/* Face shape */}
        <path
          d="M30 40 Q 28 55 35 66 Q 50 78 65 66 Q 72 55 70 40 Q 70 24 50 24 Q 30 24 30 40 Z"
          fill="#ffedd5"
        />

        {/* Anime Eyes */}
        {/* Left eye */}
        <path d="M37 46 Q 43 42 47 45" stroke="#09090b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <ellipse cx="42" cy="48" rx="3.5" ry="4" fill="#dc2626" />
        <circle cx="41" cy="46" r="1.5" fill="#ffffff" />
        <circle cx="42" cy="48" r="1.5" fill="#09090b" />

        {/* Right eye */}
        <path d="M53 45 Q 57 42 63 46" stroke="#09090b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <ellipse cx="58" cy="48" rx="3.5" ry="4" fill="#dc2626" />
        <circle cx="57" cy="46" r="1.5" fill="#ffffff" />
        <circle cx="58" cy="48" r="1.5" fill="#09090b" />

        {/* Eyebrows */}
        <path d="M36 40 Q 42 38 46 41" stroke="#09090b" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M54 41 Q 58 38 64 40" stroke="#09090b" strokeWidth="2" strokeLinecap="round" fill="none" />

        {/* Nose & Mouth */}
        <path d="M49 53 L 51 55" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M46 61 Q 50 63 54 61" stroke="#b91c1c" strokeWidth="1.8" strokeLinecap="round" fill="none" />

        {/* Anime Spiky Hair - iconic black spiky locks with red tip hints */}
        {/* Back hair volume */}
        <path
          d="M24 45 Q 16 35 22 22 Q 32 10 50 10 Q 68 10 78 22 Q 84 35 76 45 Q 82 28 68 18 Q 50 15 32 18 Q 18 28 24 45 Z"
          fill="url(#hairGrad)"
        />
        {/* Front bangs and spikes */}
        <polygon points="50,12 44,32 38,18 32,36 26,25 24,42 30,48 35,38 40,48 45,36 50,49 55,36 60,48 65,38 70,48 76,42 74,25 68,36 62,18 56,32" fill="#09090b" />
        <polygon points="46,14 42,30 39,22 34,32 32,24" fill="#dc2626" opacity="0.4" />
        <polygon points="54,14 58,30 61,22 66,32 68,24" fill="#dc2626" opacity="0.4" />

        {/* Side burns */}
        <path d="M28 42 L 26 56 L 31 50 Z" fill="#09090b" />
        <path d="M72 42 L 74 56 L 69 50 Z" fill="#09090b" />
      </svg>
    </div>
  );
};
