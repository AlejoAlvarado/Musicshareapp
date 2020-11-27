<template>
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
</template>

<script>
export default {
  props: {
    playlist: {
      type: Object,
    },
  },
};
</script>