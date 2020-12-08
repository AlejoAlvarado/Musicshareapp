<template
  ><div>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          Account registered
        </v-card-title>

        <v-card-text>
          Your account was successfully registered! Please log in to your
          account.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="handleDialog">
            OK!
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
      dialog: false,
    };
  },
  methods: {
    registerUser() {
      let data = this.user;
      axios.post("/users/", data).then((res) => {
        if (res.status >= 200 && res.status < 300) {
          this.refreshUser();
          this.dialog = !this.dialog;
        } else {
          console.log("Ocurrio un error en back");
        }
      });
    },
    refreshUser() {
      this.user = {
        name: "",
        username: "",
        email: "",
        password: "",
      };
    },
    handleDialog() {
      this.dialog = !this.dialog;
      this.$router.push("/");
    },
  },
};
</script>

<style></style>
