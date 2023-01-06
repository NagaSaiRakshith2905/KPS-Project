import axios from "axios";
let base_url = "http://localhost:8081/api/network/";

export function addNetworkAPI(networkRequest) {
  let url = base_url + "add-network/";
  return axios.post(url, JSON.stringify(networkRequest), {
    mode: "no-cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  });
}

export function getAllNetworkAPI(username) {
  let url = base_url + "get-all-networks-for-user/?username=" + username;
  return axios.get(url, {
    mode: "no-cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  });
}

export function getByIdAPI(id) {
  let url = base_url + "get-networks-by-id/?id=" + id;
  return axios.get(url, {
    mode: "no-cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  });
}

export function updatetNetworkAPI(network) {
  let url = base_url + "update-network/";
  return axios.put(url, JSON.stringify(network), {
    mode: "no-cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  });
}

export function deleteNetworkAPI(id) {
  let url = base_url + "delete-network-by-id/?id=" + id;
  return axios.delete(url, {
    mode: "no-cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  });
}
export function analyseAPI(id, udp) {
  let url = base_url + "analyse/?id=" + id + "&udp=" + udp;
  return axios.post(url, {
    mode: "no-cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  });
}
