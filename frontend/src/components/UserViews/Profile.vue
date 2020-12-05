<template
  ><div>
    <v-container>
      <h1>Profile</h1>
      <v-form ref="form" align="center">
        <div>
          <v-text-field
            v-model="user.name"
            label="Name"
            required
            dark
            ref="textfield"
            :disabled="!edit"
          ></v-text-field>
        </div>
        <div>
          <v-text-field
            v-model="user.username"
            label="Usename"
            required
            dark
            :disabled="!edit"
          ></v-text-field>
        </div>
        <div>
          <v-text-field
            v-model="user.email"
            label="Email"
            required
            dark
            :disabled="!edit"
          ></v-text-field>
        </div>
        <v-text-field
          :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPass ? 'text' : 'password'"
          v-model="user.password"
          name="input-10-2"
          label="Contraseña"
          hint="Por lo menos 5 caracteres"
          class="input-group--focused"
          @click:append="showPass = !showPass"
          dark
          :disabled="!edit"
        ></v-text-field>

        <div v-if="!edit" align="center">
          <v-btn align="center" rounded color="primary" @click="editProfile"
            >Edit profile</v-btn
          >
        </div>

        <div v-else align="center">
          <v-btn rounded @click="editProfile">Cancel</v-btn>

          <v-btn rounded color="primary" @click="updateProfile"
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
      rules: [],
      edit: false,
    };
  },
  methods: {
    ...mapActions(["updateUser"]),
    editProfile() {
      this.edit = !this.edit;
    },
    updateProfile() {
      this.updateUser(this.user);
      this.editProfile();
    },
  },
  created() {
    this.user = this.$store.getters.getUser;
    this.user.password = "";
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
