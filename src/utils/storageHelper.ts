export const removeStorageItem = (key: string) =>
  sessionStorage.removeItem(key);

export const setStorageItem = (key: string, value: string) =>
  sessionStorage.setItem(key, value);

export const getStorageItem = (key: string) => sessionStorage.getItem(key);
