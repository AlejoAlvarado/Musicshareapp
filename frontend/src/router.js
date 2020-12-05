import Vue from "vue";
import Router from "vue-router";
import Signup from "./components/UserViews/Signup";
import Signin from "./components/UserViews/Signin";
import Playlists from "./components/PlaylistViews/Playlists";
import PlaylistInfo from "./components/PlaylistViews/PlaylistInfo";
import WelcomeView from "./components/WelcomeView";
import UploadView from "./components/UploadViews/UploadView";
import Profile from "./components/UserViews/Profile";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: WelcomeView,
    },
    {
      path: "/signup",
      component: Signup,
    },
    {
      path: "/signin",
      component: Signin,
    },
    {
      path: "/playlists",
      component: Playlists,
    },
    {
      path: "/upload",
      component: UploadView,
    },
    {
      path: "/playlists/:id",
      component: PlaylistInfo,
    },
    {
      path: "/profile",
      component: Profile,
    },
  ],
});
