<template>
  <v-container>
    <v-row dense>
      <v-col v-for="(playlist, i) in playlists" :key="i" cols="12" md="6" lg="4">
        <playlist-card :playlist="playlist" :editable="true"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from '../../config/axios';
import PlaylistCard from './PlaylistCard.vue';

export default {
  components: { PlaylistCard },
  data: () => ({
    playlists: [],
  }),

  created() {
      axios.get("/playlists")
        .then(((res) => {
            this.playlists = res.data
            console.log(this.playlists);
        }))
  }
};
</script>