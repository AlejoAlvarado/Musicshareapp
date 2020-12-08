/**
 * Class that gives services to handle the authorization process in backend.
 */
import axios from "axios";

const API_URL = "/users/";

class AuthService {
  /**
   * Method to send a request to the server in order to signin a user's account, receiving an authorization token as response if the
   * access credentials are correct and storaging it in the frontend localstorage.
   * It returns the response given by the server.
   * @param {*} user The user that will login to the application
   */
  login(user) {
    let data = { email: user.email, password: user.password };
    return axios.post(API_URL + "signin", data).then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
  }

  /**
   * Method that logs out a user by removing the authentication token from the application's front end
   */
  logout() {
    console.log(localStorage.getItem("user"));
    localStorage.removeItem("user");
  }

  /**
   * Method that sends a request to the server in order to registe a new user that is passed via parameters.
   * It return the response from the server.
   * @param {*} user The user that will be signed up
   */
  register(user) {
    return axios.post(API_URL + "signup", {
      username: user.username,
      email: user.email,
      password: user.password,
    });
  }
}

export default new AuthService();
