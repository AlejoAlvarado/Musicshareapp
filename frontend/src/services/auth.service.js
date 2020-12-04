import axios from "axios";

const API_URL = "/users/";

class AuthService {
  login(user) {
    let data = { email: user.email, password: user.password };
    return axios.post(API_URL + "signin", data).then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
  }

  logout() {
    console.log(localStorage.getItem("user"));
    localStorage.removeItem("user");
  }

  register(user) {
    return axios.post(API_URL + "signup", {
      username: user.username,
      email: user.email,
      password: user.password,
    });
  }
}

export default new AuthService();
