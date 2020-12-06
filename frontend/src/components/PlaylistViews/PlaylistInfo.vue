<template>
  <div>
    <v-row dense>
      <v-col cols="12">
        <playlist-card :playlist="playlist" />
      </v-col>
    </v-row>
    <song-list :songs="songs" :playlist_id="playlist_id"/>
    <v-btn
      to="/playlists"
      dark
    >
      Close playlist
    </v-btn>
    <v-btn
      @click="open_songs_dialog"
      dark
    >
      Add song
    </v-btn>
    <v-overlay
      v-model="songs_dialog"
    >
      <v-card
        v-click-outside="onClickOutside"
        class="pa-5"
        width="500"
      >
        <v-virtual-scroll
          :bench="benched"
          :items="musicPlayList"
          height="124"
          item-height="64"
        >
          <template v-slot:default="{ item }">
            <v-list-item :key="item._id">

              <v-list-item-content>
                <v-list-item-title>
                  <strong class="white--text"> {{ item.title }}</strong>
                </v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn
                  icon
                  @click="add_song_to_playlist(item)"
                >
                  <v-icon 
                    small
                    color="white"
                  >
                    mdi-circle
                  </v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>

            <v-divider></v-divider>
          </template>
        </v-virtual-scroll>
      </v-card>
    </v-overlay>
  </div>
</template>
<script>
import axios from "../../config/axios";
import PlaylistCard from "./PlaylistCard.vue";
import SongList from "./SongsList.vue";

export default {
  components: { PlaylistCard, SongList },
  data: () => ({
    benched:0,
    songs_dialog:false,
    playlist: {},
    songs: [
            {
                title: "Service Bell",
                artist: "Daniel Simion",
                url: "https://soundbible.com/mp3/service-bell_daniel_simion.mp3",
                image: "https://source.unsplash.com/crs2vlkSe98/400x400"
            }
        ]
  }),
  computed:{
    musicPlayList(){
        return this.$store.state.musicPlaylist;
    },
    playlist_id(){
      return this.$route.params.id;
    }
  },
  methods:{
    onClickOutside(){
      this.songs_dialog=false;
    },
    open_songs_dialog(){
      this.songs_dialog=true;
    },
    add_song_to_playlist(song){
      axios.put("/playlists/playlist-song?id="+this.$route.params.id,song).then((res)=>{
        console.log(res);
        this.reset_songs();
      })
    },
    reset_songs(){
      const playlistId = this.$route.params.id;
      axios.get("/playlists/" + playlistId).then((res) => {
        this.playlist = res.data;
        this.songs=[];
        let i=0;
        for(i=0;i<this.playlist.songs.length;i++){
          this.songs.push({
            _id:this.playlist.songs[i]._id,
            image:this.playlist.songs[i].image,
            title:this.playlist.songs[i].title,
            url:this.playlist.songs[i].url,
            artist:this.playlist.songs[i].artist
          })
        }
        console.log(this.playlist);
      });
    }
  },
  created() {
    this.reset_songs();
  },
};
</script>