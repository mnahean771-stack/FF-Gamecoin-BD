export interface CheckResult {
  success: boolean;
  name?: string;
  error?: string;
}

export async function checkFreeFirePlayer(uid: string): Promise<CheckResult> {
  const cleanUid = uid.trim();
  if (cleanUid.length < 6) {
    return { success: false, error: 'সঠিক প্লেয়ার আইডি দিন' };
  }

  const API_URL = `https://auraffxserverinfocheckerapi.onrender.com/api/player?uid=${encodeURIComponent(cleanUid)}`;
  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const timeoutId = setTimeout(() => controller?.abort(), 12000);

  try {
    const res = await fetch(API_URL, {
      cache: 'no-store',
      signal: controller?.signal
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }

    const data = await res.json();
    const name = (data?.name || data?.player?.name || data?.raw?.name || '').trim();

    if (name && name !== 'None' && name !== 'null') {
      return { success: true, name };
    } else {
      return { success: false, error: 'এই আইডির কোনো প্লেয়ার পাওয়া যায়নি' };
    }
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    console.warn('Player check error:', err);
    // If external API times out or is sleeping, allow user confirmation or provide informative message
    return { success: false, error: 'নাম চেক করা যায়নি, আইডি ঠিক থাকলে সরাসরি অর্ডার করতে পারেন' };
  }
}
