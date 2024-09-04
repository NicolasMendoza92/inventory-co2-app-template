export const setLocalStorage = (key: string, value: any) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  };
  
  export const getLocalStorage = (key: string, defaultValue: any) => {
    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem(key);
      if (stored !== null) {
        return JSON.parse(stored);
      }
    }
    return defaultValue;
  };