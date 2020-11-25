<template>
  <v-app>
    <!-- <v-navigation-drawer app> -->
      <!-- -->
    <!-- </v-navigation-drawer> -->

    <!-- <v-app-bar app> -->
      <!-- -->
    <!-- </v-app-bar> -->

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- <v-card class="mx-auto" max-width="344" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">
                OVERLINE
              </div>
              <v-list-item-title class="headline mb-1">
                Headline 5
              </v-list-item-title>
              <v-list-item-subtitle
                >Greyhound divisely hello coldly
                fonwderfully</v-list-item-subtitle
              >
            </v-list-item-content>

            <v-list-item-avatar
              tile
              size="80"
              color="grey"
            ></v-list-item-avatar>
          </v-list-item>

          <v-card-actions>
            <v-btn outlined rounded text>
              Button
            </v-btn>
          </v-card-actions>
        </v-card> -->
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
//import HelloWorld from "./components/HelloWorld.vue";
//import Signup from "./components/UserViews/Signup";
export default {
  name: "App",
  components: {
    //Signup,
  },
};
</script>

<style></style>
