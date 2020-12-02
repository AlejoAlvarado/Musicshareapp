<template>
  <v-container>
    <div>
      <v-toolbar @click="showMyPlaylists = !showMyPlaylists">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
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
  </v-container>
</template>

<script>
import axios from "../../config/axios";
import PlaylistCard from "./PlaylistCard.vue";

export default {
  components: { PlaylistCard },
  data: () => ({
    playlists: [],
    showMyPlaylists: true,
    showSharedPlaylists: true,
  }),

  created() {
    axios.get("/playlists").then((res) => {
      this.playlists = res.data;
      console.log(this.playlists);
    });
  },
};
</script>

<style scoped>
div {
  margin-bottom: 15px;
}
</style>