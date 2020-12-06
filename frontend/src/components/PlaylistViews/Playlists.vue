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
          <playlist-card :playlist="playlist" :editable="true" />
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
          <playlist-card :playlist="playlist" :editable="true" />
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

export default {
  components: { PlaylistCard },
  data(){
    return {
        playlists: [],
        playlistsSharedWithMe: [],
        showMyPlaylists: true,
        showSharedPlaylists: true,
        playlist_add_dialog: false,
        playlist_title:'',
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
        });
    }
  },
  created() {
    this.reset_playlists();
  },
};
</script>

<style scoped>
div {
  margin-bottom: 15px;
}
</style>