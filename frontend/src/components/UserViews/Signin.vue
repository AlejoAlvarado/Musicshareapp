<template>
  <div>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          Your account is signed in!
        </v-card-title>

        <v-card-text>
          {{ loginMessage }}
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
            v-model="user.email"
            label="Correo"
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

        <v-btn rounded color="primary" @click="loginUser">Sign In</v-btn>
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
        email: "",
        password: "",
      },
      loginMessage: "something something",
      dialog: false,
      showPass: false,
    };
  },
  methods: {
    ...mapActions(["login"]),

    loginUser() {
      this.login(this.user).then(
        () => {
          this.loginMessage = "You have succesfully signed in!";
          this.dialog = true;
          this.$root.$emit("AudioPlayer");
        },
        (error) => {
          if (error.response.status === 403) {
            this.loginMessage =
              "This account is banned. You will not be able to sign in with this account.";
          } else {
            this.loginMessage = "Incorrect email and/or password.";
            console.log(error.response.status);
            console.log(error.response);
            console.log(error.response.data.message);
          }
          this.dialog = true;
        }
      );
      //console.log(this.$store);
    },
    handleDialog() {
      if (this.$store.state.authstatus.isLoggedIn) {
        this.dialog = false;
        this.$router.push("/");
      } else {
        this.dialog = false;
      }
    },
  },
};
</script>

<style></style>
