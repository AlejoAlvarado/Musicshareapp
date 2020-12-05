import Vue from "vue";
import Vuex from "vuex";
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
      {
        title: "Meadowlark",
        artist: "Daniel Simion",
        url: "https://soundbible.com/mp3/meadowlark_daniel-simion.mp3",
        image: "https://source.unsplash.com/35bE_njbG9E/400x400",
      },
      {
        title: "Hyena Laughing",
        artist: "Daniel Simion",
        url: "https://soundbible.com/mp3/hyena-laugh_daniel-simion.mp3",
        image: "https://source.unsplash.com/Esax9RaEl2I/400x400",
      },
      {
        title: "Creepy Background",
        artist: "Daniel Simion",
        url: "http://soundbible.com/mp3/creepy-background-daniel_simon.mp3",
        image: "https://source.unsplash.com/j0g8taxHZa0/400x400",
      },
    ],
    authstatus: { isLoggedIn: false },
  },
  actions: {
    addSongToMusicPlaylist({ commit }, newSong) {
      commit("addSongToMusicPlaylist", newSong);
    },
    login({ commit }, user) {
      return AuthService.login(user).then(
        (res) => {
          commit("loginSuccess", res);
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
    },

    checkIfLogged({ commit }) {
      commit("checkIfLogged");
    },
  },
  mutations: {
    addSongToMusicPlaylist(state, newSong) {
      state.musicPlaylist.push({
        title: newSong.title,
        artists: newSong.artists,
        url: newSong.songUrl,
        image: newSong.imageUrl,
      });
    },

    loginSuccess(state, data) {
      state.authstatus.isLoggedIn = true;
      console.log(data.user[0]);
      state.user = data.user[0];
    },
    loginFailure(state) {
      state.authstatus.isLoggedIn = false;
      state.data = null;
    },
    logout(state) {
      state.authstatus.isLoggedIn = false;
      state.user = "";
    },
    checkIfLogged(state) {
      let token = JSON.parse(localStorage.getItem("user"));
      if (token != null) {
        state.user = token.user[0];
        state.authstatus.isLoggedIn = true;
      }
    },
  },
  getters: {
    isLoggedIn(state) {
      return state.authstatus.isLoggedIn;
    },
    getUser(state) {
      return state.user;
    },
  },
});
