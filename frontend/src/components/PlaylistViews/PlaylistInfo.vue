<template>
  <div>
    <v-row dense>
      <v-col cols="12">
        <playlist-card :playlist="playlist" />
      </v-col>
    </v-row>
    <song-list />
  </div>
</template>
<script>
import axios from "../../config/axios";
import PlaylistCard from "./PlaylistCard.vue";
import SongList from "./SongsList.vue";

export default {
  components: { PlaylistCard, SongList },
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