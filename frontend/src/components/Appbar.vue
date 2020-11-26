<template>
  <v-app-bar
    app
    color="#0070a8"
  >
    <router-link to="/">
        <h1 class="white--text">SpotiCloudy</h1>
    </router-link>
    <v-spacer></v-spacer>
    <v-btn class="white--text mr-2" to="/" color="blue">Friends</v-btn>
    <v-btn class="white--text mr-2" to="/" color="blue">Upload</v-btn>
    <v-btn class="white--text mr-2" to="/playlists" color="blue">Library</v-btn>
    <v-btn class="white--text mr-2" to="/" color="blue">Help</v-btn>
    <v-btn
        to="/signup"
        icon
    >
        <v-icon>mdi-account-circle-outline</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {

}
</script>

<style>

</style>