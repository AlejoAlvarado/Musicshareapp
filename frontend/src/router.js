import Vue from 'vue';
import Router from 'vue-router';
import Signup from "./components/UserViews/Signup";
import Playlists from "./components/PlaylistViews/Playlists";

Vue.use(Router);

export default new Router({
    routes:[
        {
            path: "/signup",
            component: Signup,
        },
        {
            path: "/playlists",
            component: Playlists,
        }
    ]
})