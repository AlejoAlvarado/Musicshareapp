<template>
  <v-container>
    <div>
      <v-row dense>
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
  data(){
    return {
        playlists: [],
    }
  },
  methods: {
      reset_playlists(){
          const userId = this.$route.params.id;
          axios.get("/users/"+ userId +"/playlists").then((res) => {
              this.playlists = res.data;
          })
      }
  },
  mounted() {
      this.reset_playlists();
  },
};
</script>

<style scoped>
div {
  margin-bottom: 15px;
}
</style>