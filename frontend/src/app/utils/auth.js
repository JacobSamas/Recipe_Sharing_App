export function isAuthenticated() {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      return token !== null;
    }
    return false;
  }
  
  export function getUserId() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('userId');
    }
    return null;
  }
  