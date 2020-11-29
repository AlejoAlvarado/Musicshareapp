<template>
  <v-row dense>
    <v-col cols="12">
      <playlist-card :playlist="playlist" />
    </v-col>
  </v-row>
</template>
<script>
import axios from "../../config/axios";
import PlaylistCard from "./PlaylistCard.vue";
export default {
  components: { PlaylistCard },
  data: () => ({
    playlist: {},
  }),
  created() {
    const playlistId = this.$route.params.id;
    axios.get("/playlists/" + playlistId).then((res) => {
      this.playlist = res.data;
      console.log(this.playlist);
    });
  },
};
</script>