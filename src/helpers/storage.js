export const loadFromLocal = () => {
  try {
    const userInLocal = localStorage.getItem("qrbmauth")
      ? JSON.parse(localStorage.getItem("qrbmauth"))
      : null;
    return userInLocal;
  } catch (e) {
    console.warn(e);
    return null;
  }
};

export const saveToLocal = (user) => {
  try {
    const serialisedState = JSON.stringify(user);
    localStorage.setItem("qrbmauth", serialisedState);
  } catch (e) {
    console.warn(e);
  }
};

export const removeFromLocal = () => {
  localStorage.removeItem("qrbmauth");
};
