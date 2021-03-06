import { clearToken } from "../../redux/action";
import store from "../../redux/store";
export const host = "https://dauruang.serverdakwah.online/api";

export const api = (method, path, body = null, file = null) => {
  const { token } = store.getState();
  const headers = new Headers();
  headers.append("Accept", "application/json");
  !file && headers.append("Content-Type", "application/json");

  token !== null && headers.append("Authorization", "Bearer " + token);

  const data = fetch(host + path, {
    method: method,
    headers: headers,
    body: method === "GET" ? null : file ? body : JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((resJson) => {
      if (resJson.message) {
        if (resJson.message.split(" ")[0] === "Token") {
          store.dispatch(clearToken());
        }
      }
      console.log(resJson);
      return resJson;
    })
    .catch((e) => {
      console.log(e);
      alert(e.message);
    });

  return data;
};
