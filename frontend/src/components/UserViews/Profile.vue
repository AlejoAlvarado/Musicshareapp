<template
  ><div>
    <v-container>
      <v-form ref="form" align="center">
        <div>
          <v-text-field
            v-model="user.name"
            label="Name"
            required
            dark
          ></v-text-field>
        </div>
        <div>
          <v-text-field
            v-model="user.username"
            label="Usename"
            required
            dark
          ></v-text-field>
        </div>
        <div>
          <v-text-field
            v-model="user.email"
            label="Email"
            required
            dark
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
        ></v-text-field>

        <v-btn rounded color="primary" @click="registerUser">Sign Up</v-btn>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
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
    };
  },
  methods: {},
  created() {
    this.user = this.$store.getters.getUser;
  },
};
</script>

<style></style>
