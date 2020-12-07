<template>
  <v-app style="background-color:#1f1352;">
    <Appbar />
    <v-main>
      <router-view></router-view>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Appbar from "./components/Appbar";
import Footer from "./components/Footer";
//import axios from "./config/axios";
export default {
  name: "App",
  components: {
    Appbar,
    Footer,
  },
  created() {
    /* const token = localStorage.getItem("user");
    if (token) {
      axios.defaults.headers.common["authorization"] = JSON.parse("user").token;
      console.log(axios.defaults.headers.common["authorization"]);
    }*/
  },
};
</script>

<style lang="scss">
::-webkit-scrollbar {
  width: 7px;
}
::-webkit-scrollbar-track {
  background: #ffffff;
}
::-webkit-scrollbar-thumb {
  background: #000000;
  border-radius: 7px;
}
</style>
