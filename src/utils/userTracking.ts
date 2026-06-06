export type UserData = {
  id: string;
  firstVisit: string;
  visitCount: number;
  lastVisit: string;
  pagesViewed: string[];
  totalTimeOnSite: number;
  referrer?: string;
  userAgent?: string;
  language?: string;
  screenResolution?: { width: number; height: number };
  timezone?: string;
};

const COOKIE_NAME = 'lur_user_data';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function generateId(): string {
  return 'user_' + Math.random().toString(36).slice(2, 11) + Date.now().toString(36);
}

function readCookie(): UserData | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )' + COOKIE_NAME + '=([^;]+)'));
  if (!match) return null;
  try {
    return JSON.parse(decodeURIComponent(match[2]));
  } catch {
    return null;
  }
}

function writeCookie(data: UserData): void {
  if (typeof document === 'undefined') return;
  const encoded = encodeURIComponent(JSON.stringify(data));
  document.cookie = `${COOKIE_NAME}=${encoded}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

function createFreshUserData(): UserData {
  return {
    id: generateId(),
    firstVisit: new Date().toISOString(),
    visitCount: 0,
    lastVisit: new Date().toISOString(),
    pagesViewed: [],
    totalTimeOnSite: 0,
    referrer: typeof document !== 'undefined' ? document.referrer || undefined : undefined,
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
    language: typeof navigator !== 'undefined' ? navigator.language : undefined,
    screenResolution:
      typeof window !== 'undefined' ? { width: window.innerWidth, height: window.innerHeight } : undefined,
    timezone:
      typeof Intl !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : undefined,
  };
}

export function getUserData(): UserData {
  const data = readCookie();
  if (!data) {
    const fresh = createFreshUserData();
    writeCookie(fresh);
    return fresh;
  }
  const updated = {
    ...data,
    visitCount: data.visitCount + 1,
    lastVisit: new Date().toISOString(),
  };
  writeCookie(updated);
  return updated;
}

export function updateUserData(partial: Partial<UserData>): UserData {
  const data = readCookie() ?? createFreshUserData();
  const updated = { ...data, ...partial };
  writeCookie(updated);
  return updated;
}

export function trackPageView(page: string): UserData {
  const current = getUserData();
  return updateUserData({
    pagesViewed: [...current.pagesViewed, page].slice(-50),
  });
}

export function trackTime(seconds: number): UserData {
  const current = getUserData();
  return updateUserData({
    totalTimeOnSite: current.totalTimeOnSite + seconds,
  });
}

export function clearUserData(): void {
  if (typeof document === 'undefined') return;
  document.cookie = `${COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
}
