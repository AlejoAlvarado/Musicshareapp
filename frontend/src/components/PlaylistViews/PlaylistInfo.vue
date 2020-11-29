<template>
  <div>
    <v-row dense>
      <v-col cols="12">
        <playlist-card :playlist="playlist" />
      </v-col>
    </v-row>
    <song-list :songs="songs"/>
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
    songs: [
            {
                title: "Service Bell",
                artist: "Daniel Simion",
                url: "https://soundbible.com/mp3/service-bell_daniel_simion.mp3",
                image: "https://source.unsplash.com/crs2vlkSe98/400x400"
            },
            {
                title: "Meadowlark",
                artist: "Daniel Simion",
                url: "https://soundbible.com/mp3/meadowlark_daniel-simion.mp3",
                image: "https://source.unsplash.com/35bE_njbG9E/400x400"
            },
            {
                title: "Hyena Laughing",
                artist: "Daniel Simion",
                url: "https://soundbible.com/mp3/hyena-laugh_daniel-simion.mp3",
                image: "https://source.unsplash.com/Esax9RaEl2I/400x400"
            },
            {
                title: "Creepy Background",
                artist: "Daniel Simion",
                url: "http://soundbible.com/mp3/creepy-background-daniel_simon.mp3",
                image: "https://source.unsplash.com/j0g8taxHZa0/400x400"
            }
        ]
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