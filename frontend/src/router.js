import Vue from 'vue';
import Router from 'vue-router';
import Signup from "./components/UserViews/Signup";
import Playlists from "./components/PlaylistViews/Playlists";
import WelcomeView from './components/WelcomeView'

Vue.use(Router);

export default new Router({
    routes:[
        {
            path:'/',
            component: WelcomeView
        },
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