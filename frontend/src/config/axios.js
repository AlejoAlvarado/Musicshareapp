/**
 * A class that exports the axios API to the rest of the application's frontend
 */
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";
//let token = localStorage.getItem("user");
/*if (token != null) {
  axios.defaults.headers.common["authorization"] =
    "Bearer " + JSON.parse(localStorage.getItem("user")).token;
}*/
export default axios;
