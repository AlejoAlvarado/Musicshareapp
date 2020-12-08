<template
  ><div>
    <v-container>
      <h1>Profile</h1>
      <v-form ref="form" align="center" v-model="valid">
        <div>
          <v-text-field
            v-model="user.name"
            label="Name"
            required
            dark
            ref="textfield"
            :rules="nameRules"
            :disabled="!edit"
          ></v-text-field>
        </div>
        <div>
          <v-text-field
            v-model="user.username"
            label="Usename"
            required
            dark
            :rules="nameRules"
            :disabled="!edit"
          ></v-text-field>
        </div>
        <div>
          <v-text-field
            v-model="user.email"
            label="Email"
            required
            dark
            :rules="emailRules"
            :disabled="!edit"
          ></v-text-field>
        </div>
        <v-text-field
          :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPass ? 'text' : 'password'"
          v-model="user.password"
          name="input-10-2"
          label="Contraseña"
          hint="Must have at least 5 characters. Leave blank if you don't want to change the password."
          class="input-group--focused"
          @click:append="showPass = !showPass"
          dark
          :disabled="!edit"
          :rules="passwordRules"
        ></v-text-field>

        <div v-if="!edit" align="center">
          <v-btn align="center" rounded color="primary" @click="editProfile"
            >Edit profile</v-btn
          >
        </div>

        <div v-else align="center">
          <v-btn rounded @click="editProfile">Cancel</v-btn>

          <v-btn
            :disabled="!valid"
            rounded
            color="primary"
            @click="updateUser"
            dark
            >Save changes</v-btn
          >
        </div>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      user: {
        name: "",
        username: "",
        email: "",
        password: "",
      },
      showPass: false,
      dialog: false,
      rules: [],
      edit: false,
      message: "",
      emailRules: [
        (email) => !!email || "Required",
        (email) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email) ||
          "Email no valido",
      ],
      passwordRules: [
        (password) =>
          password.length > 4 ||
          password.length == 0 ||
          "The password must contain at least 5 letters",
      ],
      nameRules: [
        (name) => !!name || "Required",
        (name) => name.length > 2 || "The name is too short",
      ],
      valid: false,
    };
  },
  methods: {
    ...mapActions(["updateProfile"]),
    editProfile() {
      this.edit = !this.edit;
    },
    updateUser() {
      console.log(this.user.password);
      if (this.user.password === "") {
        console.log("no password");
        delete this.user.password;
        this.updateProfile(this.user);
        this.editProfile();
        this.refreshUser();
      } else {
        console.log("password");
        this.updateProfile(this.user);
        this.editProfile();
        this.refreshUser();
      }
    },
    refreshUser() {
      let currentUser = this.$store.getters.getUser;
      this.user = currentUser;
      this.user.password = "";
    },
  },
  created() {
    let currentUser = this.$store.getters.getUser;
    this.user = currentUser;
    this.user.password = "";
    /* if (currentUser == undefined || currentUser == null || currentUser == "") {
      alert("You are not logged in. Please login to access this page.");
      this.$router.push("/signin");
    } else {

    }*/
  },
};
</script>

<style>
h1 {
  font-size: 45px;
  color: rgb(255, 255, 255);
}
#textfield {
  width: 50%;
}
</style>
