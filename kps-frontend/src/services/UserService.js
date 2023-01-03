import axios from "axios";
export const base_url = "http://localhost:8080/api/user/";

export function registerUserApi(userData) {
  let url = base_url + "register/";
  console.log(userData);
  console.log(url);
  return axios.post(url, JSON.stringify(userData), {
    mode: "no-cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  });
}

export function userLoginApi(value, password) {
  let url = base_url + "login/?value=" + value + "&password=" + password;
  return axios.get(url, {
    mode: "no-cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  });
}

export function viewUserByIdApi(id) {
  let url = base_url + "get-by-id/" + id;
  return axios.get(url, {
    mode: "no-cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  });
}
export function userUpdatePasswordApi(value, password) {
  let url =
    base_url + "update-password/?value=" + value + "&password=" + password;
  return axios.put(url, {
    mode: "no-cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  });
}

export function viewUserByUsernameApi(username) {
  let url = base_url + "get-by-username/" + username;
  return axios.get(url, {
    mode: "no-cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  });
}
