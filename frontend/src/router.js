/**
 * This class contains all the routes that the application can navigate into and the router that will
 * make that navigation possible.
 */
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
import ProfileEdit from "./components/UserViews/ProfileEdit";
import UserPlaylists from "./components/PlaylistViews/UserPlaylists";
import RegisterUser from "./components/UserViews/RegisterUser";
import NotFound from "./components/ErrorViews/NotFound";
import UserReport from "./components/UserViews/UserReport";

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
      meta: { authorize: [] },
    },
    {
      path: "/upload",
      component: UploadView,
      meta: { authorize: [] },
    },
    {
      path: "/playlists/:id",
      component: PlaylistInfo,
      meta: { authorize: [] },
    },
    {
      path: "/profile",
      component: Profile,
      meta: { authorize: [] },
    },
    {
      path: "/profedit",
      component: ProfileEdit,
      meta: { authorize: [Role.ADMIN, Role.SUPERADMIN] },
    },
    {
      path: "/userlist",
      component: Userlist,
      meta: { authorize: [Role.ADMIN, Role.SUPERADMIN] },
    },
    {
      path: "/user/:id/playlists",
      component: UserPlaylists,
      meta: { authorize: [Role.ADMIN, Role.SUPERADMIN] },
    },
    {
      path: "/registeruser",
      component: RegisterUser,
      meta: { authorize: [Role.SUPERADMIN] },
    },
    {
      path: "/report/user/:id",
      component: UserReport,
      meta: { authorize: [] },
    },
    {
      path: "*",
      component: NotFound,
    },
  ],
});
export default router;

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const { authorize } = to.meta;
  console.log("Before routing");

  if (authorize) {
    const currentUser = JSON.parse(localStorage.getItem("user")).user[0];
    const token = store.getters.getToken;
    if (!currentUser || !token) {
      // not logged in so redirect to login page with the return url
      console.log(currentUser);
      console.log(token);
      alert("You are not logged in. Please login to access this page.");
      return next({ path: "/signin" });
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
