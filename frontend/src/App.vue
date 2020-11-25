<template>
  <v-app>
    <!-- Sizes your content based upon application components -->

    <!-- Provides the application the proper gutter -->
    <div>
      <v-parallax
        dark
        src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
      >
        <v-row align="center" justify="center">
          <v-col class="text-center" cols="12">
            <h1 class="display-1 font-weight-thin mb-4">
              Vuetify
            </h1>
            <h4 class="subheading">
              Build your application today!
            </h4>
          </v-col>
        </v-row>
      </v-parallax>
      <!-- If using vue-router -->
      <router-view></router-view>
      <Signup />
    </div>
  </v-app>
</template>

<script>
//import HelloWorld from "./components/HelloWorld.vue";
import Signup from "./components/UserViews/Signup";
export default {
  name: "App",
  components: {
    Signup,
  },
};
</script>

<style></style>
