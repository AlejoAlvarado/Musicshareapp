import Vue from "vue";
import Vuex from "vuex";
import axios from "./config/axios";
import AuthService from "./services/auth.service";
import { Role } from "./_helpers/role";
//import { handleResponse } from "./_helpers/handle-Response";

Vue.use(Vuex);

export default new Vuex.Store({
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
  actions: {
    addSongToMusicPlaylist({ commit }, newSong) {
      commit("addSongToMusicPlaylist", newSong);
    },
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
    logout({ commit }) {
      console.log("logging out");
      AuthService.logout();
      commit("logout");
      commit("restartPlaylist");
    },
    checkIfLogged({ commit }) {
      commit("checkIfLogged");
    },
    updateProfile({ commit }, data) {
      console.log(data.password);
      let pass = data.password;
      console.log(pass);
      commit("updateProfile", data);
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
          if (res.status >= 200 && res.status < 300) {
            alert("Profile update succesfully!");
            // console.log("delete exitoso");
          } else {
            console.log("Error updating user");
          }
        },
        (error) => {
          console.log(error.data);
        }
      );
    },
    updateUser({ commit }, data) {
      let currentUser = this.state.user;
      let pass = data.password;
      console.log(data);
      console.log(pass);
      if (pass == "") {
        delete data.password;
      }
      if (currentUser.role === Role.ADMIN) {
        commit("cleanSelectedUser");
        let userid = data._id;
        return axios.put("/users/" + userid, data).then((res) => {
          if (res.status >= 200 && res.status < 300) {
            alert("User updated correctly!");
          } else if (res.status === 401 || res.status === 403) {
            alert("You are not authorized to take this action.");
            console.log("Authorization error");
            this.dispatch("logout");
          } else {
            alert("Error when updating.");
            console.log("Error when updating");
          }
        });
      } else if (currentUser.role === Role.SUPERADMIN) {
        commit("cleanSelectedUser");
        let userid = data._id;
        return axios.put("/users/special/" + userid, data).then((res) => {
          if (res.status >= 200 && res.status < 300) {
            alert("User updated correctly!");
          } else if (res.status === 401 || res.status === 403) {
            alert("You are not authorized to take this action.");
            console.log("Authorization error");
            this.dispatch("logout");
          } else {
            alert("Error when updating.");
            console.log("Error when updating");
          }
        });
      }
    },
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
    cleanUsers({ commit }) {
      commit("cleanUsers");
    },
    setSelectedUser({ commit }, selectedUser) {
      commit("setSelectedUser", selectedUser);
    },
  },
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
