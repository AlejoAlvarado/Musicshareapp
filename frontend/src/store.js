/**
 * Class that contains the vuex store with its correspondent actions, mutations and getters.
 * It also exports the vuex store to the whole frontend of the application.
 */
import Vue from "vue";
import Vuex from "vuex";
import axios from "./config/axios";
import AuthService from "./services/auth.service";
import { Role } from "./_helpers/role";
//import { handleResponse } from "./_helpers/handle-Response";

Vue.use(Vuex);

export default new Vuex.Store({
  /**
   * The state of the application in vuex
   */
  state: {
    token: JSON.parse(localStorage.getItem("user")),
    user: "",
    musicPlaylist: [
      {
        title: "Another Love",
        artist: "Tom Odell",
        url:
          "https://songs-bucket-adv-web.s3.amazonaws.com/dd66d01667f8d16932a6fca4aa71572b",
        image: "https://source.unsplash.com/crs2vlkSe98/400x400",
      },
    ],
    authstatus: { isLoggedIn: false, currentRole: "" },
    currentSong: 0,
  },
  /**
   * The actions that can be dispatched by vuex
   */
  actions: {
    addSongToMusicPlaylist({ commit }, newSong) {
      commit("addSongToMusicPlaylist", newSong);
    },

    /* Method that employs the authservice class in order to login a user to the application.
     It returns a resolved promise or a rejected promise in the case that an error occurs.
     @param {*} user The user that will be logged in
     */

    login({ commit }, user) {
      return AuthService.login(user).then(
        (res) => {
          commit("loginSuccess", res);
          commit("setUserMusicplaylist", res.user[0]);
          return Promise.resolve(res);
        },
        (error) => {
          commit("loginFailure");
          return Promise.reject(error);
        }
      );
    },

    /**
     * Action to log the user out of the application.
     *
     */
    logout({ commit }) {
      console.log("logging out");
      AuthService.logout();
      commit("logout");
      commit("restartPlaylist");
    },
    /**
     * Action to check if the user is logged
     */
    checkIfLogged({ commit }) {
      commit("checkIfLogged");
    },
    /*Action to update a users attributes by making a request to the server. 
     @param {*} data A parameter with the information that must be update from the user 
     */
    updateProfile({ commit }, data) {
      console.log(data.password);
      let pass = data.password;
      console.log(pass);

      console.log(data.password);
      let userid = data._id;
      if (pass != undefined) {
        data.password = pass;
        console.log(data.password);
      } else {
        delete data.password;
      }
      console.log(data);
      return axios.put("/users/" + userid, data).then(
        (res) => {
          console.log("successful update");
          alert("The user was successfully updated");
          commit("updateProfile", data);
          return res;
        },
        (error) => {
          console.log("failed update");
          console.log(error);
          alert(error.response.data.message);
          return error;
        }
      );
    },
    /*
    Action to update a user in case that the user trying to make the update has the role of ADMIN or SUPERUSER.
    Depending on the role of the user, a different request url will be used to make the update request to the server.
     @param {*} data A parameter with the information that must be update from the user
     */
    updateUser({ commit }, data) {
      let currentUser = this.state.user;
      let pass = data.password;
      console.log(data);
      console.log(pass);
      if (pass == "") {
        delete data.password;
      }
      if (currentUser.role === Role.ADMIN) {
        let userid = data._id;
        return axios.put("/users/" + userid, data).then(
          (res) => {
            console.log("successful update");
            alert("The user was successfully updated");
            commit("cleanSelectedUser");
            return res;
          },
          (error) => {
            console.log("failed update");
            console.log(error);
            alert(error.response.data.message);
            return error;
          }
        );
      } else if (currentUser.role === Role.SUPERADMIN) {
        let userid = data._id;
        return axios.put("/users/special/" + userid, data).then(
          (res) => {
            console.log("successful update");
            alert("The user was successfully updated");
            commit("cleanSelectedUser");
            return res;
          },
          (error) => {
            console.log("failed update");
            console.log(error);
            alert(error.response.data.message);
            return error;
          }
        );
      }
    },
    /**
     * An action that gets all the users that currently populate de database.
     */
    obtainUsers({ commit }) {
      return (
        axios
          .get("/users/")
          //.then(handleResponse)
          .then((users) => {
            commit("obtainUsers", users.data);
          })
      );
    },
    /**
     * An action that cleans the users variable in state
     *
     */
    cleanUsers({ commit }) {
      commit("cleanUsers");
    },
    /*
     * An action that creates a new property in state
     * named selectedUser, to be used by oother vue components.
     * @param {*} selectedUser The user that was selected in the call
     */
    setSelectedUser({ commit }, selectedUser) {
      commit("setSelectedUser", selectedUser);
    },
  },
  /**
   * The mutations that ca be committed by vuex
   */
  mutations: {
    cleanSelectedUser(state) {
      state.selectedUser = "";
    },
    setSelectedUser(state, selectedUser) {
      state.selectedUser = selectedUser;
    },
    cleanUsers(state) {
      state.users = "";
    },
    obtainUsers(state, users) {
      users = users.filter((current) => current._id !== state.user._id);
      state.users = users;
    },
    addSongToMusicPlaylist(state, newSong) {
      state.musicPlaylist.push({
        _id: newSong._id,
        title: newSong.title,
        artist: newSong.artists,
        url: newSong.songUrl,
        image: newSong.imageUrl,
      });
      state.user.songs.push({
        _id: newSong._id,
        title: newSong.title,
        artist: newSong.artists,
        url: newSong.songUrl,
        image: newSong.imageUrl,
      });
    },
    loginSuccess(state, data) {
      state.authstatus.isLoggedIn = true;
      console.log(data.user[0]);
      state.user = data.user[0];
      state.authstatus.currentRole = data.user[0].role;
      state.token = JSON.parse(localStorage.getItem("user"));
      axios.defaults.headers.common["authorization"] =
        "Bearer " + JSON.parse(localStorage.getItem("user")).token;
    },
    setUserMusicplaylist(state, user) {
      state.musicPlaylist = [];
      let i = 0;
      for (i = 0; i < user.songs.length; i++) {
        let newSong = user.songs[i];
        state.musicPlaylist.push({
          _id: newSong._id,
          title: newSong.title,
          artist: newSong.artists,
          url: newSong.songUrl,
          image: newSong.imageUrl,
        });
      }
    },
    setMusicplaylist(state, newSongs) {
      state.musicPlaylist = newSongs;
    },
    loginFailure(state) {
      state.authstatus.isLoggedIn = false;
      state.data = null;
    },
    logout(state) {
      state.authstatus.isLoggedIn = false;
      state.authstatus.currentRole = "";
      state.user = "";
      state.token = null;
      delete axios.defaults.headers.common["authorization"];
    },
    checkIfLogged(state) {
      let token = JSON.parse(localStorage.getItem("user"));
      if (token != null) {
        state.user = token.user[0];
        state.authstatus.isLoggedIn = true;
        state.authstatus.currentRole = state.user.role;
      }
    },
    updateProfile(state, data) {
      console.log("mutation " + data);

      let tok = JSON.parse(localStorage.getItem("user"));
      tok.user[0] = data;
      tok.user[0].password = "";
      state.token = tok;
      localStorage.setItem("user", JSON.stringify(tok));
    },
    restartPlaylist(state) {
      state.musicPlaylist = [];
      state.musicPlaylist.push({
        title: "Another Love",
        artist: "Tom Odell",
        url:
          "https://songs-bucket-adv-web.s3.amazonaws.com/dd66d01667f8d16932a6fca4aa71572b",
        image: "https://source.unsplash.com/crs2vlkSe98/400x400",
      });
    },
    setCurrentSong(state, newValue) {
      state.currentSong = newValue;
    },
  },
  /**
   * The getters for some variables in the vuex store
   */
  getters: {
    isLoggedIn(state) {
      return state.authstatus.isLoggedIn;
    },
    getUser(state) {
      return state.user;
    },
    getCurrentRole(state) {
      return state.authstatus.currentRole;
    },
    getToken(state) {
      return state.token;
    },
    getUsers(state) {
      return state.users;
    },
    getSelectedUser(state) {
      return state.selectedUser;
    },
  },
});
