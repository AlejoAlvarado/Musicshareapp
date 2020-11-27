<template>
  <v-app style="background-color:#1f1352;">
    <Appbar/>
    <v-main>
      <router-view></router-view>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script>
import Appbar from './components/Appbar';
import Footer from './components/Footer';
export default {
  name: "App",
  components:{
    Appbar,
    Footer
  }
};
</script>

<style lang="scss">
  ::-webkit-scrollbar{
    width: 7px;
  }
  ::-webkit-scrollbar-track{
    background: #FFFFFF
  }
  ::-webkit-scrollbar-thumb{
    background:#000000;
    border-radius: 7px;
  }
  

</style>
