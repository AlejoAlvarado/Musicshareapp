<template>
  <v-card dark>
    <div class="d-flex flex-no-wrap justify-space-between">
      <div>
        <v-card-title class="headline" v-text="playlist.title"></v-card-title>

        <v-card-subtitle v-text="'By: ' + playlist.owner.username"></v-card-subtitle>

        <v-card-actions>
          <v-btn icon @click="reproduce_playlist" class="ml-2 mt-5" outlined rounded small>
            <v-icon>
              mdi-play
            </v-icon>
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
    }
  },
  methods:{
    reproduce_playlist(){
      console.log(this.playlist.songs)
      this.$store.commit("setMusicplaylist",this.playlist.songs);
      this.$root.$emit('AudioPlayer')
    }
  }
};
</script>