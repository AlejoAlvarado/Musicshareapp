<template>
  <v-footer
    padless
  >
    <v-card
        color="#0070a8"
        flat
        tile
        style="width:100%"
        class="d-flex justify-center"
    >
        <AudioPlayer/>
    </v-card>
  </v-footer>
</template>

<script>
import AudioPlayer from './AudioPlayer'
export default {
    components:{
        AudioPlayer
    }
}
</script>

<style>

</style>