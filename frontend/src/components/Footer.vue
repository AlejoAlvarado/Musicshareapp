<template>
  <v-footer
    padless
  >
    <v-card
        color="#0070a8"
        flat
        tile
        style="width:50%"
        class="d-flex column-flex"
    >
        <AudioPlayer class="px-5" ref="audioPlayer"/>
    </v-card>
    <v-card
        color="#0070a8"
        flat
        tile
        style="width:50%"
        class="d-flex column-flex"
    >
        <v-card-actions>
            <v-btn @click="reset_user_musicplaylist">Reset song list</v-btn>
        </v-card-actions>
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
                  @click="setCurrentSong(item)"
                >
                  <v-icon 
                    small
                    color="white"
                  >
                    mdi-play
                  </v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>

            <v-divider></v-divider>
          </template>
        </v-virtual-scroll>
    </v-card>
  </v-footer>
</template>

<script>
import AudioPlayer from './AudioPlayer'
export default {
    components:{
        AudioPlayer
    },
    data(){
      return {
        benched:0
      }
    },
    computed:{
      musicPlayList(){
        return this.$store.state.musicPlaylist;
      },
      currentSong(){
        return this.$store.state.currentSong;
      }
    },
    methods:{
      setCurrentSong(item){
        let index=this.$store.state.musicPlaylist.indexOf(item);
        this.$refs.audioPlayer.changeSong(index);
      },
      reset_user_musicplaylist(){
        this.$store.commit("setUserMusicplaylist",this.$store.state.user);
      }
    }
}
</script>

<style>

</style>