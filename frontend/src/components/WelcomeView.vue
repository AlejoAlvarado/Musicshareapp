<template>
  <v-container>
    <v-row style="height:100%">
      <v-col cols="6">
        <h1 class="white--text mt-15">Your music wherever you go</h1>
        <h2 class="white--text mt-5">
          Take all the music that you 
          have downloaded or created
          from your PC or phone to the 
          Cloud
        </h2>
      </v-col>
      <v-col cols="6">
        <v-container>
          <v-row style="height:50%">
            <v-col cols="6">
              <v-img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a5/The_Jimi_Hendrix_Experience_%28Box_set%29_cover.jpg/220px-The_Jimi_Hendrix_Experience_%28Box_set%29_cover.jpg"></v-img>
            </v-col>
            <v-col cols="6">
              <v-img src="https://img.discogs.com/JZItCyjqzLpip-VD8UmG2HQE_b4=/fit-in/600x599/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-509082-1496704941-2153.jpeg.jpg"></v-img>
            </v-col>
          </v-row>
          <v-row style="height:50%">
            <v-col cols="6">
              <v-img src="https://upload.wikimedia.org/wikipedia/en/2/2e/Joji_-_Sanctuary.png"></v-img>
            </v-col>
            <v-col cols="6">
              <v-img src="https://f4.bcbits.com/img/a2689188192_10.jpg"></v-img>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
}
</script>

<style scoped>
h1 {
  font-size: 65px
}
h2 {
  font-size: 40px;
  font-style: italic;
  font-family: Arial, Helvetica, sans-serif;
}
</style>
