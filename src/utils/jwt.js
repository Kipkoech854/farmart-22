// This imports the jwtDecode function from the jwt-decode package.
// jwtDecode(token) decodes the JWT payload (header and body) without verifying its signature.
import {jwtDecode} from "jwt-decode";

export const isTokenExpired = (token) => {
  try {
    // Allow mock tokens during development
    if (token === "mockToken") return false;

    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
};



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

