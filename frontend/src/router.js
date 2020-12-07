import Vue from "vue";
import Router from "vue-router";
import Signup from "./components/UserViews/Signup";
import Signin from "./components/UserViews/Signin";
import Playlists from "./components/PlaylistViews/Playlists";
import PlaylistInfo from "./components/PlaylistViews/PlaylistInfo";
import WelcomeView from "./components/WelcomeView";
import UploadView from "./components/UploadViews/UploadView";
import Profile from "./components/UserViews/Profile";
import Userlist from "./components/UserViews/Userlist";
import store from "./store";
import { Role } from "./_helpers/role";
Vue.use(Router);

const router = new Router({
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
      meta: { authorize: [] },
    },
    {
      path: "/userlist",
      component: Userlist,
      meta: { authorize: [Role.ADMIN, Role.SUPERADMIN] },
    },
  ],
});
export default router;

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const { authorize } = to.meta;
  console.log("Before routing");

  if (authorize) {
    const currentUser = store.getters.getUser;
    const token = store.getters.getToken;
    if (!currentUser || !token) {
      // not logged in so redirect to login page with the return url
      alert("You are not logged in. Please login to access this page.");
      return next({ path: "/signin", query: { returnUrl: to.path } });
    }

    // check if route is restricted by role
    if (authorize.length && !authorize.includes(currentUser.role)) {
      // role not authorised so redirect to home page
      alert("You are not authorized to enter this page.");
      return next({ path: "/" });
    }
  }

  next();
});
