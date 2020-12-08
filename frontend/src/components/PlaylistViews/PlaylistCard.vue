<!-- A template that shows the basic information about a playlist and the actions that are available depending on the user-->

<template>
  <v-card dark>
    <div class="d-flex flex-no-wrap justify-space-between">
      <div>
        <v-card-title class="headline" v-text="playlist.title"></v-card-title>

        <v-card-subtitle v-text="'By: ' + playlist.owner.username"></v-card-subtitle>

        <v-card-actions v-if="editable">
          <v-btn
            icon
            class="ml-2 mt-5"
            outlined
            rounded
            small
            :to="'/playlists/' + playlist._id"
            color="blue"
          >
            <v-icon> mdi-circle </v-icon>
          </v-btn>
          <v-btn
            icon
            @click="reproduce_playlist"
            class="ml-2 mt-5"
            outlined
            rounded
            small
          >
            <v-icon> mdi-play </v-icon>
          </v-btn>
          <v-btn
            icon
            @click="delete_playlist_dialog"
            class="ml-2 mt-5"
            outlined
            rounded
            small
            color="red"
          >
            <v-icon> mdi-cancel </v-icon>
          </v-btn>
          <!-- This is only showed if users are passed to the card -->
          <v-btn v-if="users"
            @click="open_share_dialog"
            class="ml-2 mt-5"
            outlined
            rounded
            small
            color="blue"
          >
            SHARE
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
          <v-btn color="red" text @click="delete_playlist"> OK </v-btn>
          <v-btn color="red" text @click="close_delete_dialog"> NO! </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="share_dialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          Choose user to share playlist with
        </v-card-title>
        <v-divider></v-divider>
        <v-list>
          <v-list-item v-for="(user, i) in users" :key="i">
            <v-list-item-title>
              {{ user.name }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ user.email }}
            </v-list-item-subtitle>
            <v-list-item-action>
              <v-btn icon @click="share_with_user(user)">
                <v-icon color="primary"> mdi-share-variant </v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
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
    //If false, don't shows the v-actions of the card
    editable: {
      type: Boolean,
    },
    users: {
      type: Array,
    },
  },
  //Data here is to manage the fact to show the dialogs of delete playlist or share it with users
  data() {
    return {
      delete_dialog: false,
      share_dialog: false,
    };
  },
  methods: {
    //Saves the playlist on the store with the songs to be able to reproduce them and navigate
    reproduce_playlist() {
      console.log(this.playlist.songs);
      this.$store.commit("setMusicplaylist", this.playlist.songs);
      this.$root.$emit("AudioPlayer");
    },
    delete_playlist_dialog() {
      this.delete_dialog = true;
    },
    close_delete_dialog() {
      this.delete_dialog = false;
    },
    delete_playlist() {
      axios.delete("/playlists/" + this.playlist._id).then((res) => {
        console.log(res);
        this.$parent.reset_playlists();
      });
    },
    open_share_dialog() {
      this.share_dialog = true;
    },
    share_with_user(user) {
      axios
        .put("/users/add-shared-playlist?id=" + user._id, this.playlist)
        .then((res) => {
          console.log(res);
          this.share_dialog = false;
          alert("¡shared with! " + user.name);
        });
    },
  },
};
</script>