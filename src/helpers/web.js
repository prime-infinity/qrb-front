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
        res({ ...result.data, token: result.headers["x-auth-token"] });
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

export function createRestFinal(data, token) {
  return new Promise((res, rej) => {
    axios
      .post(backendHost + "create-rest/final", data, {
        headers: {
          "x-auth-token": token,
          "Content-Type": "multipart/form-data",
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

//getting resturants
export async function getRestOfOwner(token) {
  try {
    const { data } = await axios.get(backendHost + "resturant/owner", {
      headers: { "x-auth-token": token },
    });
    return data;
  } catch (e) {
    return e.message;
  }
}
export async function getRandomRest() {
  try {
    const { data } = await axios.get(backendHost + "resturant/random")
    return data;
  } catch (e) {
    return e.message;
  }
}
export async function getDetailsOfRest(id){
  try {
    const { data } = await axios.get(backendHost + "resturant/details", {
      params: { id: id },
    });
    return data;
  } catch (e) {
    return e.message;
  }
}