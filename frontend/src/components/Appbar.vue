<!-- This component displays the navigation bar that will be displayed through the application.
Depending on if the user is logged in and the role of the user currently logged in,
the component will show different button set options. -->
<template>
  <v-app-bar app color="#0070a8">
    <router-link to="/">
      <h1 class="white--text">SpotiCloudy</h1>
    </router-link>
    <v-spacer></v-spacer>
    <div v-if="isLoggedIn && isBasic">
      <v-btn class="white--text mr-2" to="/" color="red" @click="logoutUser"
        >Logout</v-btn
      >
      <v-btn class="white--text mr-2" to="/upload" color="blue">Upload</v-btn>
      <v-btn class="white--text mr-2" to="/playlists" color="blue"
        >Library</v-btn
      >
      <v-btn to="/profile" icon>
        <v-icon color="white">mdi-account-circle-outline</v-icon>
      </v-btn>
    </div>

    <div v-else-if="isLoggedIn && isAdmin">
      <v-btn class="white--text mr-2" to="/" color="red" @click="logoutUser"
        >Logout</v-btn
      >
      <v-btn class="white--text mr-2" to="/userlist" color="blue"
        >List Users</v-btn
      >
      <v-btn class="white--text mr-2" to="/upload" color="blue">Upload</v-btn>
      <v-btn class="white--text mr-2" to="/playlists" color="blue"
        >Library</v-btn
      >
      <v-btn to="/profile" icon>
        <v-icon color="white">mdi-account-circle-outline</v-icon>
      </v-btn>
    </div>

    <div v-else-if="isLoggedIn && !isAdmin && !isBasic">
      <v-btn class="white--text mr-2" to="/" color="red" @click="logoutUser"
        >Logout</v-btn
      >
      <v-btn class="white--text mr-2" to="/userlist" color="blue"
        >List Users</v-btn
      ><v-btn class="white--text mr-2" to="/registeruser" color="blue"
        >Add user</v-btn
      >
      <v-btn class="white--text mr-2" to="/upload" color="blue">Upload</v-btn>
      <v-btn class="white--text mr-2" to="/playlists" color="blue"
        >Library</v-btn
      >
      <v-btn to="/profile" icon>
        <v-icon color="white">mdi-account-circle-outline</v-icon>
      </v-btn>
    </div>

    <div v-else>
      <v-btn class="white--text mr-2" to="/" color="blue">Help</v-btn>
      <v-btn class="white--text mr-2" to="/signin" color="blue">Login</v-btn>
      <v-btn class="white--text mr-2" to="/signup" color="green">SignUp</v-btn>
    </div>
  </v-app-bar>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions(["logout", "checkIfLogged"]),
    logoutUser() {
      this.logout();
    },
    checkIfUserLogged() {
      this.checkIfLogged();
    },
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    currentRole() {
      return this.$store.getters.CurrentRole;
    },
    isBasic() {
      let currentRole = this.$store.state.authstatus.currentRole;
      console.log(currentRole);
      return currentRole === "BASIC";
    },
    isAdmin() {
      let currentRole = this.$store.state.authstatus.currentRole;
      console.log(currentRole);
      return currentRole === "ADMIN";
    },
  },
  created() {
    this.checkIfUserLogged();
  },
};
</script>

<style></style>
