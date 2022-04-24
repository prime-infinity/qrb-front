import axios from "axios";

const backendHost = "http://localhost:2000/api/";

export function loginFirst(data) {
  return new Promise((res, rej) => {
    axios
      .post(backendHost + "login/send-token", data)
      .then((result) => {
        res(result.data);
      })
      .catch((err) => {
        rej(err);
      });
  });
}

export function loginSecond(data) {
  return new Promise((res, rej) => {
    axios
      .post(backendHost + "login/verify-token", data)
      .then((result) => {
        res(result.data);
      })
      .catch((err) => {
        rej(err);
      });
  });
}

//the process of resturant creation
export function createRestName(data, token) {
  return new Promise((res, rej) => {
    axios
      .post(backendHost + "create-rest/name", data, {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((result) => {
        res(result.data);
      })
      .catch((err) => {
        rej(err);
      });
  });
}

export function createRestLoc(data, token) {
  return new Promise((res, rej) => {
    axios
      .post(backendHost + "create-rest/location", data, {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((result) => {
        res(result.data);
      })
      .catch((err) => {
        rej(err);
      });
  });
}

export function createRestYear(data, token) {
  return new Promise((res, rej) => {
    axios
      .post(backendHost + "create-rest/year", data, {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((result) => {
        res(result.data);
      })
      .catch((err) => {
        rej(err);
      });
  });
}

export function createRestDesc(data, token) {
  return new Promise((res, rej) => {
    axios
      .post(backendHost + "create-rest/description", data, {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((result) => {
        res(result.data);
      })
      .catch((err) => {
        rej(err);
      });
  });
}
