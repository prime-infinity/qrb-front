import axios from "axios";

const backendHost = "http://localhost:2000/api/";
//const backendHost = "https://qrbback.herokuapp.com/api/";


export async function getIndexRest() {
  try {
    const { data } = await axios.get(backendHost + "resturant/index");
    return data;
  } catch (e) {
    return e.message;
  }
}


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



//rest owner editing resturant

export async function submitRestSumm(data, token) {
  return new Promise((res, rej) => {
    axios
      .post(backendHost + "edit-rest/summary", data, {
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

export function uploadRestDetailImages(deta, token) {
  return new Promise((res, rej) => {
    axios
      .post(backendHost + "edit-rest/images", deta, {
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
//edit rest details by owner
export function editRestProOne(data, token) {
  return new Promise((res, rej) => {
    axios
      .post(backendHost + "edit-rest/prop-one", data, {
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

export function editRestProTwo(data, token) {
  return new Promise((res, rej) => {
    axios
      .post(backendHost + "edit-rest/prop-two", data, {
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
