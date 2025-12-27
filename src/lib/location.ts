export type OrderLocation = "praia" | "cantina";

export const ORDER_LOCATION_COOKIE = "cc_local";
export const ORDER_LOCATION_STORAGE_KEY = "cc_local";

export function isOrderLocation(value: unknown): value is OrderLocation {
  return value === "praia" || value === "cantina";
}

export function getOrderLocationFromCookieString(
  cookieString: string | null | undefined,
): OrderLocation | undefined {
  if (!cookieString) return undefined;

  const parts = cookieString.split(";");
  for (const part of parts) {
    const [rawKey, ...rest] = part.trim().split("=");
    if (!rawKey) continue;
    if (rawKey !== ORDER_LOCATION_COOKIE) continue;
    const value = decodeURIComponent(rest.join("=") ?? "");
    if (isOrderLocation(value)) return value;
    return undefined;
  }

  return undefined;
}

export function getOrderLocationFromBrowser(): OrderLocation | undefined {
  if (typeof window === "undefined") return undefined;

  try {
    const stored = window.localStorage.getItem(ORDER_LOCATION_STORAGE_KEY);
    if (isOrderLocation(stored)) return stored;
  } catch {
    // ignore
  }

  const fromCookie = getOrderLocationFromCookieString(document.cookie);
  if (fromCookie) return fromCookie;

  return undefined;
}

export function setOrderLocationInBrowser(location: OrderLocation) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(ORDER_LOCATION_STORAGE_KEY, location);
  } catch {
    // ignore
  }

  const maxAgeSeconds = 60 * 60 * 24 * 365; // 1 ano
  document.cookie = `${ORDER_LOCATION_COOKIE}=${encodeURIComponent(location)}; Max-Age=${maxAgeSeconds}; Path=/; SameSite=Lax`;
}

export function getOrderLocationLabel(location: OrderLocation): string {
  return location === "praia" ? "Praia" : "Cantina/Casa";
}
