<template>
  <v-card dark>
    <div class="d-flex flex-no-wrap justify-space-between">
      <div>
        <v-card-title class="headline" v-text="playlist.title"></v-card-title>

        <v-card-subtitle v-text="'By: ' + playlist.owner"></v-card-subtitle>

        <v-card-actions v-if="editable">
          <v-btn icon class="ml-2 mt-5" outlined rounded small :to="'/playlists/' + playlist._id" color="blue">
            <v-icon>
              mdi-circle
            </v-icon>
          </v-btn>
          <v-btn icon @click="reproduce_playlist" class="ml-2 mt-5" outlined rounded small>
            <v-icon>
              mdi-play
            </v-icon>
          </v-btn>
          <v-btn icon @click="delete_playlist_dialog" class="ml-2 mt-5" outlined rounded small color="red">
            <v-icon>
              mdi-cancel
            </v-icon>
          </v-btn>
        </v-card-actions>
      </div>

      <v-avatar class="ma-3" size="125" tile>
        <v-img :src="playlist.cover"></v-img>
      </v-avatar>
    </div>
    <v-dialog v-model="delete_dialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          ¿Are you sure you want to delete this playlist?
        </v-card-title>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="delete_playlist">
            OK
          </v-btn>
          <v-btn color="red" text @click="close_delete_dialog">
            NO!
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>

import axios from "../../config/axios";

export default {
  props: {
    playlist: {
      type: Object,
    },
    editable: {
      type: Boolean,
    },
  },
  data(){
    return {
      delete_dialog:false
    }
  },
  methods:{
    reproduce_playlist(){
      console.log(this.playlist.songs)
      this.$store.commit("setMusicplaylist",this.playlist.songs);
    },
    delete_playlist_dialog(){
      this.delete_dialog=true;
    },
    close_delete_dialog(){
      this.delete_dialog=false;
    },
    delete_playlist(){
      axios.delete("/playlists/"+this.playlist._id).then((res)=>{
        console.log(res);
        this.$parent.reset_playlists()
      })
    }
  }
};
</script>