import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const getSecret = () => new TextEncoder().encode(process.env.ADMIN_JWT_SECRET || 'kcb-jwt-secret-a9f3b2d1e8c7');

export async function signToken(payload: Record<string, unknown>) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('24h')
    .sign(getSecret());
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload;
  } catch {
    return null;
  }
}

/**
 * Get admin session from the request cookies.
 * Works in both Route Handlers and Server Components.
 */
export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_session')?.value;
  if (!token) return null;
  return verifyToken(token);
}
