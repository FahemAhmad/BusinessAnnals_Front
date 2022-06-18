import cookie from "js-cookie";

//set cookie
export const setCookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};

//remove cookie
export const removeCookie = (key) => {
  if (process.browser) {
    cookie.remove(key);
  }
};

//get from cookie is such as stored token
export const getCookie = (key) => {
  if (process.browser) {
    return cookie.get(key);
  }
};

//set in localStorage
export const setLocalStorage = (key, value) => {
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

//get localStorage
export const getLocalStorage = (key) => {
  const resp = JSON.parse(localStorage.getItem(key));

  return resp;
};

//remove from localStorage
export const removeLocalStorage = (key) => {
  if (process.browser) {
    localStorage.removeItem(key);
  }
};

//authenticate by cookie and localStorage
export const authenticate = (response) => {
  console.log(response);
  let user = response.user;
  setCookie("token", response.token);
  setLocalStorage("user", user);
};

//access info from localStorage
export const isAuth = () => {
  if (process.browser) {
    const cookieChecked = getCookie("token");
    if (cookieChecked) {
      if (localStorage.getItem("user"))
        return JSON.parse(localStorage.getItem("user"));
      else return false;
    }
  }
};
