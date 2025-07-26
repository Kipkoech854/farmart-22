// This imports the jwtDecode function from the jwt-decode package.
// jwtDecode(token) decodes the JWT payload (header and body) without verifying its signature.
import {jwtDecode} from 'jwt-decode';

export function isTokenExpired(token) {
  try {
    if (!token || typeof token !== 'string') return true; // 👈 prevent decoding non-strings

    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true; // treat invalid tokens as expired
  }
}




export function getToken() {
  const storedUser = localStorage.getItem('user');

  if (!storedUser) return null;

  try {
    const parsedUser = JSON.parse(storedUser);
    return parsedUser.token || null;
  } catch (error) {
    console.error('Failed to parse user from localStorage:', error);
    return null;
  }
}

export function getUserIdFromToken() {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    // Adjust this depending on how your JWT is structured:
    return decoded.user_id || decoded.sub || null;
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
}

