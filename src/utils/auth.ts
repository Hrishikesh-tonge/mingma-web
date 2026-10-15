/**
 * Simple, robust authentication utility using native Web Crypto API SHA-256 hashing.
 */

const STORAGE_KEY_AUTH_USER = 'mingmas_admin_auth_user_v1';
const STORAGE_KEY_AUTH_HASH = 'mingmas_admin_auth_hash_v1';
const SESSION_KEY_LOGGED_IN = 'mingmas_admin_session_active_v1';

// Default authorized credentials:
// Username: "admin"
// Password: "mingma@manali"
const DEFAULT_USERNAME = 'admin';
const DEFAULT_PASSWORD_HASH = 'e33df262dc854dd985293a71f2781608b87b304aa2682ca0e9729ff316706b9e'; // SHA-256 of "mingma@manali"

export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password.trim());
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export function getAuthorizedUsername(): string {
  if (typeof window === 'undefined') return DEFAULT_USERNAME;
  return localStorage.getItem(STORAGE_KEY_AUTH_USER) || DEFAULT_USERNAME;
}

export function getAuthorizedHash(): string {
  if (typeof window === 'undefined') return DEFAULT_PASSWORD_HASH;
  return localStorage.getItem(STORAGE_KEY_AUTH_HASH) || DEFAULT_PASSWORD_HASH;
}

export async function verifyCredentials(usernameInput: string, passwordInput: string): Promise<boolean> {
  const expectedUser = getAuthorizedUsername().toLowerCase().trim();
  const expectedHash = getAuthorizedHash();

  const cleanUserInput = usernameInput.toLowerCase().trim();
  if (cleanUserInput !== expectedUser && cleanUserInput !== 'mingma') {
    return false;
  }

  const computedHash = await hashPassword(passwordInput);
  return computedHash === expectedHash;
}

export async function updateAdminCredentials(newUsername: string, newPassword: string): Promise<boolean> {
  try {
    const hashed = await hashPassword(newPassword);
    localStorage.setItem(STORAGE_KEY_AUTH_USER, newUsername.trim());
    localStorage.setItem(STORAGE_KEY_AUTH_HASH, hashed);
    return true;
  } catch (err) {
    console.error('Failed to update credentials:', err);
    return false;
  }
}

export function resetCredentialsToDefault(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY_AUTH_USER);
  localStorage.removeItem(STORAGE_KEY_AUTH_HASH);
}

export function isSessionAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem(SESSION_KEY_LOGGED_IN) === 'true';
}

export function setSessionAuthenticated(isAuth: boolean): void {
  if (typeof window === 'undefined') return;
  if (isAuth) {
    sessionStorage.setItem(SESSION_KEY_LOGGED_IN, 'true');
  } else {
    sessionStorage.removeItem(SESSION_KEY_LOGGED_IN);
  }
}

export function clearSession(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(SESSION_KEY_LOGGED_IN);
}
