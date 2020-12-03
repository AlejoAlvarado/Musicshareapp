import Vue from "vue";
import Vuex from "vuex";
import AuthService from "./services/auth.service";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem("user")),
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
      AuthService.logout();
      commit("logout");
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
      state.user = data;
    },
    loginFailure(state) {
      state.authstatus.loggedIn = false;
      state.data = null;
    },
  },
});
