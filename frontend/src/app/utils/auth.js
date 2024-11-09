export function isAuthenticated() {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      return token !== null;
    }
    return false;
  }
  