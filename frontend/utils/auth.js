import Cookies from 'js-cookie';

// Use sessionStorage for token so it clears when tab is closed
export const setAuthToken = (token) => {
  if (token) {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('token', token);
      // Also set in cookie as backup for API calls
      Cookies.set('token', token, { expires: 1/24 }); // 1 hour
    }
  } else {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('token');
      Cookies.remove('token');
    }
  }
};

export const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    // Check sessionStorage first (cleared when tab closes)
    const sessionToken = sessionStorage.getItem('token');
    if (sessionToken) {
      return sessionToken;
    }
  }
  // Fallback to cookie
  return Cookies.get('token');
};

export const setUser = (user) => {
  if (user) {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('user', JSON.stringify(user));
      Cookies.set('user', JSON.stringify(user), { expires: 1/24 }); // 1 hour
    }
  } else {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('user');
      Cookies.remove('user');
    }
  }
};

export const getUser = () => {
  if (typeof window !== 'undefined') {
    // Check sessionStorage first
    const sessionUser = sessionStorage.getItem('user');
    if (sessionUser) {
      return JSON.parse(sessionUser);
    }
  }
  // Fallback to cookie
  const user = Cookies.get('user');
  return user ? JSON.parse(user) : null;
};

export const logout = () => {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  }
  Cookies.remove('token');
  Cookies.remove('user');
  window.location.href = '/login';
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};
