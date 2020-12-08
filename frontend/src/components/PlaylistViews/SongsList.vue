<!-- A table with all the songs that are passed as a prop to the component. Usually loaded inside PlaylistInfo.
 Has an option to delete the song (Remove it from the playlist) -->
<template>
  <v-simple-table>
    <thead>
      <tr>
        <th>Cover</th>
        <th>Title</th>
        <th>Artist</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(song, i) in songs" :key="i">
        <td>
          <v-img :src="song.image" max-height="100" max-width="100"></v-img>
        </td>
        <td>{{ song.title }}</td>
        <td>{{ song.artist }}</td>
        <td><v-btn @click="delete_playlist_song(song)">Delete</v-btn></td>
      </tr>
    </tbody>
  </v-simple-table>
</template>

<script>
import axios from "../../config/axios";
export default {
  props: {
    songs: {
      type: Array,
    },
    playlist_id:{
      type: String,
    }
  },
  methods:{
    //The song is just deleted from the playlist, not from the user information
    delete_playlist_song(song){
      console.log(song._id)
      axios.put("/playlists/playlist-delete-song?id="+this.playlist_id,song).then((res)=>{
        console.log(res);
        this.$parent.reset_songs();
      })
    }
  }
};
</script>

