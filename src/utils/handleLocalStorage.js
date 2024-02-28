export const saveTokenToStorage = (data) => {
  localStorage.setItem("token", data);
};

export const deleteTokenFromStorage = () => {
  localStorage.removeItem("token");
};

export const getToken = () => {
  return localStorage.getItem("token");
};
