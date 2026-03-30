export type CartItem = {
  id: number;
  name: string;
  price: number; // unit price (numeric)
  image: string;
  quantity: number;
  category?: string;
};

const CART_STORAGE_KEY = "amcrochet_cart";
const WISHLIST_STORAGE_KEY = "amcrochet_wishlist";

export const CART_UPDATED_EVENT = "amcrochet_cart_updated";
export const WISHLIST_UPDATED_EVENT = "amcrochet_wishlist_updated";

function isBrowser() {
  return typeof window !== "undefined";
}

export function parsePriceToNumber(price: string | number): number {
  if (typeof price === "number") return price;
  // Handles values like "₹ 1,599.00" or "1599.00"
  const normalized = price.replace(/[^\d.]/g, "");
  const n = Number(normalized);
  return Number.isFinite(n) ? n : 0;
}

export function getCartFromStorage(): CartItem[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((x) => typeof x?.id === "number")
      .map((x) => ({
        ...x,
        quantity: Math.max(1, Number(x.quantity ?? 1)),
        price: parsePriceToNumber(x.price as unknown as string | number),
      }));
  } catch {
    return [];
  }
}

export function saveCartToStorage(items: CartItem[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

export function getWishlistFromStorage(): number[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((x) => Number(x))
      .filter((x) => Number.isFinite(x));
  } catch {
    return [];
  }
}

export function saveWishlistToStorage(ids: number[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(ids));
}

export function notifyCartUpdated() {
  if (!isBrowser()) return;
  window.dispatchEvent(new Event(CART_UPDATED_EVENT));
}

export function notifyWishlistUpdated() {
  if (!isBrowser()) return;
  window.dispatchEvent(new Event(WISHLIST_UPDATED_EVENT));
}

export function getCartItemCount(items: CartItem[]) {
  return items.reduce((acc, item) => acc + item.quantity, 0);
}

