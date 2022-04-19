import axios from "axios";

//const backendHost = "http://localhost:2000/api/";
const backendHost = "https://em-back.herokuapp.com/api/";

export function login(data) {
  return new Promise((res, rej) => {
    axios
      .post(backendHost + "login", data)
      .then((result) => {
        res({ ...result.data, token: result.headers["x-auth-token"] });
      })
      .catch((err) => {
        rej(err);
      });
  });
}

export function register(data) {
  return new Promise((res, rej) => {
    axios
      .post(backendHost + "register", data)
      .then((result) => {
        res({ ...result.data, token: result.headers["x-auth-token"] });
      })
      .catch((err) => {
        rej(err);
      });
  });
}
