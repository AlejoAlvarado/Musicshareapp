<template>
  <v-app>
    <Appbar/>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Appbar from './components/Appbar';
export default {
  name: "App",
  components:{
    Appbar
  }
};
</script>

<style></style>
