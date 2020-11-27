import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        user:'',
        musicPlaylist: [
            {
                title: "Service Bell",
                artist: "Daniel Simion",
                url: "https://soundbible.com/mp3/service-bell_daniel_simion.mp3",
                image: "https://source.unsplash.com/crs2vlkSe98/400x400"
            },
            {
                title: "Meadowlark",
                artist: "Daniel Simion",
                url: "https://soundbible.com/mp3/meadowlark_daniel-simion.mp3",
                image: "https://source.unsplash.com/35bE_njbG9E/400x400"
            },
            {
                title: "Hyena Laughing",
                artist: "Daniel Simion",
                url: "https://soundbible.com/mp3/hyena-laugh_daniel-simion.mp3",
                image: "https://source.unsplash.com/Esax9RaEl2I/400x400"
            },
            {
                title: "Creepy Background",
                artist: "Daniel Simion",
                url: "http://soundbible.com/mp3/creepy-background-daniel_simon.mp3",
                image: "https://source.unsplash.com/j0g8taxHZa0/400x400"
            }
        ]
    },
    actions:{},
    mutations:{
        addSongToMusicPlaylist(state, newSong){
            state.musicPlaylist.push({
                title: newSong.title,
                artists: newSong.artists,
                url: newSong.songUrl,
                image: newSong.imageUrl
            })
        }
    }
})