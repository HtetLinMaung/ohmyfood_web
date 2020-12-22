import { production } from "../app.config.json";

const http = {
  async post(body) {
    return fetch(production.gql_api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("ohmyfood_token")}`,
      },
      body: JSON.stringify(body || {}),
    }).then((res) => res.json());
  },
};

export default http;
