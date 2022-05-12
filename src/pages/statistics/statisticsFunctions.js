import axios from "axios";

export const checkAuthenticated = () => {
  let token = localStorage.getItem("FBIdToken");
  const authentication = {
    authenticated: false,
    token: "",
  };
  if (token && token.startsWith("Bearer ")) {
    token = token.split("Bearer ")[1];
    console.log("Token from external function: ", token);
    authentication.authenticated = true;
    authentication.token = token;
  }
  return authentication;
};

export const getStatisticsData = (token) => {
  const results = [];
  console.log(
    "Token from Statistics (This means getStatsticsFunction works!): ",
    token
  );
  const FBIdToken = `Bearer ${token}`;
  axios.defaults.headers.common["Authorization"] = FBIdToken;

  axios
    .get(
      "https://us-central1-promoterscore-14480.cloudfunctions.net/api/glogin"
    )
    .then((res) => {
      console.log(res.data);
      results.push(res.data);
      return results;
    })
    .catch((err) => console.log(err));
};
