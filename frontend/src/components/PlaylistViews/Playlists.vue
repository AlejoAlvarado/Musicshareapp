<!-- Template to show all the playlists available for the user logged in, separated between the playlists owned by
  him and the ones shared with him. Also has action to create a new playlist -->
<template>
  <v-container>
    <div>
      <v-toolbar @click="showMyPlaylists = !showMyPlaylists">
        <v-menu>
          <template v-slot:activator="{ on, attrs }">
            <v-app-bar-nav-icon v-bind="attrs" v-on="on"></v-app-bar-nav-icon>
          </template>
          <v-list>
            <v-list-item @click="open_add_playlist_dialog">
              <v-list-item-title>Agregar Playlist</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-toolbar-title> My Playlists </v-toolbar-title>
      </v-toolbar>
      <v-row v-if="showMyPlaylists" dense>
        <v-col
          v-for="(playlist, i) in playlists"
          :key="i"
          cols="12"
          md="6"
          lg="4"
        >
          <playlist-card :playlist="playlist" :users="usersF" :editable="true" />
        </v-col>
      </v-row>
    </div>
    <div>
      <v-toolbar @click="showSharedPlaylists = !showSharedPlaylists">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title> Playlists shared with me </v-toolbar-title>
      </v-toolbar>
      <v-row v-if="showSharedPlaylists" dense>
        <v-col
          v-for="(playlist, i) in playlistsSharedWithMe"
          :key="i"
          cols="12"
          md="6"
          lg="4"
        >
          <SharedPlaylistCard :playlist="playlist"/>
        </v-col>
      </v-row>
    </div>
    <v-overlay
      v-model="playlist_add_dialog"
    >
      <v-card
        v-click-outside="onClickOutside"
        light
        class="pa-5"
      >
        <v-text-field
            v-model="playlist_title"
            label="Titulo del playlist"
            required
        ></v-text-field>
        <v-card-actions>
          <v-btn
            @click="add_playlist"
          >
            Agregar playlist
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-overlay>
  </v-container>
</template>

<script>
import axios from "../../config/axios";
import PlaylistCard from "./PlaylistCard.vue";
import SharedPlaylistCard from "./SharedPlaylistCard.vue";

export default {
  components: { PlaylistCard, SharedPlaylistCard },
  data(){
    return {
        playlists: [],
        playlistsSharedWithMe: [],

        //To hide or show playlists owned by the user / shared with the user
        showMyPlaylists: true,
        showSharedPlaylists: true,

        //To show the form to create a new playlist
        playlist_add_dialog: false,
        playlist_title:'',

        //Loads the basic information of all the users, so giving the option of sharing the playlist with them
        usersF:[],
    }
  },
  methods:{
    onClickOutside(){
      this.playlist_add_dialog=false;
    },
    open_add_playlist_dialog(){
      this.playlist_add_dialog=true;
    },
    add_playlist(){
      let newPlaylist = {
        title: this.playlist_title,
        cover: 'NONE',
        owner: this.$store.state.user._id,
        songs: [],
        sharedWith: []
      }
      console.log(newPlaylist.owner)
      axios.post("/playlists",newPlaylist).then((res)=>{
        console.log(res);
        this.reset_playlists();
        this.playlist_add_dialog=false;
      })
    },

    //Reloads all the playlists that the user can access, generally when an action like deleting a playlist is made.
    reset_playlists(){
        axios.get("playlists/my/Playlists", {
          headers: {
            authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
          },
        })
        .then((res) => {
          const userWithPlaylists = res.data;
          this.playlists = userWithPlaylists.playlists;
          this.playlistsSharedWithMe = userWithPlaylists.sharedWithMe;
          console.log(this.playlists);
          console.log(this.playlistsSharedWithMe);
        });
    }
  },
  mounted() {
    this.reset_playlists();
    //Users are only loaded when te component is mounted.
    axios.get("/users/all/basic").then((res)=>{
      this.usersF=res.data;
    })
  },
};
</script>

<style scoped>
div {
  margin-bottom: 15px;
}
</style>