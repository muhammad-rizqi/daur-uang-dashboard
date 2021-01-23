const storeToken = (token) => {
  localStorage.setItem("token", token);
};

const getToken = () => {
  try {
    const value = localStorage.getItem("token");
    if (value !== null) {
      // value previously stored
      return value;
    }
  } catch (e) {
    // error reading value
    console.log(e);
  }
};

const removeToken = async () => {
  try {
    localStorage.removeItem("token");
    console.log("Done. delete token");
  } catch (e) {
    console.log(e);
  }
};

export { storeToken, getToken, removeToken };
