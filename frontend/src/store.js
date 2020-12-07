import Vue from "vue";
import Vuex from "vuex";
import axios from "./config/axios";
import AuthService from "./services/auth.service";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: JSON.parse(localStorage.getItem("user")),
    user: "",
    musicPlaylist: [
      {
        title: "Service Bell",
        artist: "Daniel Simion",
        url: "https://soundbible.com/mp3/service-bell_daniel_simion.mp3",
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
    updateUser({ commit }, data) {
      commit("updateUser", data);
      let userid = data._id;
      return axios.put("/users/" + userid, data).then((res) => {
        if (res.status >= 200 && res.status < 300) {
          alert("Usuario actualizado correctamente!");
          // console.log("delete exitoso");
        } else {
          console.log("Hubo un error actualizando al usuario");
        }
      });
    },
  },
  mutations: {
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
      state.token = JSON.parse(localStorage.getItem("user"));
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
      state.authstatus.role = "";
      state.user = "";
      state.token = null;
    },
    checkIfLogged(state) {
      let token = JSON.parse(localStorage.getItem("user"));
      if (token != null) {
        state.user = token.user[0];
        state.authstatus.isLoggedIn = true;
        state.authstatus.currentRole = state.user.role;
      }
    },
    updateUser(state, data) {
      console.log(data);
      data.password = "";
      let tok = JSON.parse(localStorage.getItem("user"));
      tok.user[0] = data;
      state.token = tok;
      localStorage.setItem("user", JSON.stringify(tok));
    },
    restartPlaylist(state) {
      state.musicPlaylist = [];
      state.musicPlaylist.push({
        title: "Service Bell",
        artist: "Daniel Simion",
        url: "https://soundbible.com/mp3/service-bell_daniel_simion.mp3",
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
  },
});
