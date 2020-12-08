<!-- A component that shows all the playlists owned by a specific user. Should only be accessed by admins. Has options
  to acces to the playlist, play it and delete it -->
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
    //Re-loads all the playlists from the user with the id specified. Called generally when the component is mounted
    //and when a playlist is deleted.
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