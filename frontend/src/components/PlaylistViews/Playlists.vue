<template>
  <v-container>
    <v-row dense>
      <v-col v-for="(playlist, i) in playlists" :key="i" cols="12" md="6" lg="4">
        <v-card dark>
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="headline" v-text="playlist.title"></v-card-title>

              <v-card-subtitle v-text="'By: ' + playlist.owner"></v-card-subtitle>

              <v-card-actions>
                <v-btn class="ml-2 mt-5" outlined rounded small>
                  OPEN PLAYLIST
                </v-btn>
              </v-card-actions>
            </div>

            <v-avatar class="ma-3" size="125" tile>
              <v-img :src="playlist.cover"></v-img>
            </v-avatar>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from '../../config/axios';

export default {
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