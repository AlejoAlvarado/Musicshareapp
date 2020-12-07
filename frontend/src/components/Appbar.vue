<template>
  <v-app-bar app color="#0070a8">
    <router-link to="/">
      <h1 class="white--text">SpotiCloudy</h1>
    </router-link>
    <v-spacer></v-spacer>
    <div v-if="isLoggedIn && isBasic(currentRole)">
      <v-btn class="white--text mr-2" to="/" color="red" @click="logoutUser"
        >Logout</v-btn
      >
      <v-btn class="white--text mr-2" to="/upload" color="blue">Upload</v-btn>
      <v-btn class="white--text mr-2" to="/playlists" color="blue"
        >Library</v-btn
      >
      <v-btn to="/signup" icon>
        <v-icon color="white">mdi-account-circle-outline</v-icon>
      </v-btn>
    </div>

    <div v-else-if="isLoggedIn && isAdmin(currentRole)">
      <v-btn class="white--text mr-2" to="/" color="red" @click="logoutUser"
        >Logout</v-btn
      >
      <v-btn class="white--text mr-2" to="/upload" color="blue"
        >List Users</v-btn
      >
      <v-btn class="white--text mr-2" to="/upload" color="blue">Upload</v-btn>
      <v-btn class="white--text mr-2" to="/playlists" color="blue"
        >Library</v-btn
      >
      <v-btn to="/signup" icon>
        <v-icon color="white">mdi-account-circle-outline</v-icon>
      </v-btn>
    </div>

    <div
      v-else-if="isLoggedIn && !isAdmin(currentRole) && !isBasic(currentRole)"
    >
      <v-btn class="white--text mr-2" to="/" color="red" @click="logoutUser"
        >Logout</v-btn
      >
      <v-btn class="white--text mr-2" to="/upload" color="blue"
        >List Users</v-btn
      ><v-btn class="white--text mr-2" to="/upload" color="blue"
        >Add user</v-btn
      >
      <v-btn class="white--text mr-2" to="/upload" color="blue">Upload</v-btn>
      <v-btn class="white--text mr-2" to="/playlists" color="blue"
        >Library</v-btn
      >
      <v-btn to="/signup" icon>
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
    isAdmin(role) {
      return role === "ADMIN";
    },
    isBasic(role) {
      return role === "BASIC";
    },
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    currentRole() {
      return this.$store.getters.CurrentRole;
    },
  },
  created() {
    this.checkIfUserLogged();
  },
};
</script>

<style></style>
