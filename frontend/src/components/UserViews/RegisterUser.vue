<!-- A component with the form for a new user to be registered to the webapp by an ADMIN or SUPERADMIN. -->
<template
  ><div>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          Account registered
        </v-card-title>

        <v-card-text>
          {{ registerMessage }}
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
      <v-form ref="form" align="center" v-model="valid">
        <div>
          <v-text-field
            v-model="user.name"
            label="Name"
            required
            dark
            :rules="nameRules"
          ></v-text-field>
        </div>
        <div>
          <v-text-field
            v-model="user.username"
            label="Usename"
            required
            dark
            :rules="nameRules"
          ></v-text-field>
        </div>
        <div>
          <v-text-field
            v-model="user.email"
            label="Email"
            required
            dark
            :rules="emailRules"
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
          :rules="passwordRules"
        ></v-text-field>

        <div>
          <v-row>
            <v-col cols="6">
              <v-subheader dark>
                Select role
              </v-subheader>
            </v-col>

            <v-col cols="6">
              <v-select
                dark
                v-model="select"
                required
                :items="items"
                item-text="name"
                label="Select"
                return-object
                single-line
              ></v-select>
            </v-col>
          </v-row>
        </div>

        <div>
          <v-row>
            <v-col cols="12" md="4">
              <v-checkbox
                v-model="user.active"
                label="Activate user"
                dark
              ></v-checkbox>
            </v-col>
          </v-row>
        </div>

        <v-btn
          rounded
          color="primary"
          @click="registerUser"
          :disabled="!valid"
          dark
          >Register User</v-btn
        >
      </v-form>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import { Role } from "../../_helpers/role";
export default {
  data() {
    return {
      user: {
        name: "",
        username: "",
        email: "",
        password: "",
        role: "",
        active: false,
      },
      showPass: false,
      emailRules: [
        (email) => !!email || "Required",
        (email) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email) ||
          "Email no valido",
      ],
      passwordRules: [
        (password) => !!password || "Required",
        (password) =>
          password.length > 4 || "The password must contain at least 5 letters",
      ],
      nameRules: [
        (name) => !!name || "Required",
        (name) => name.length > 2 || "The name is too short",
      ],
      valid: false,
      items: [Role.BASIC, Role.ADMIN, Role.SUPERADMIN],
      select: Role.BASIC,
      dialog: false,
    };
  },
  methods: {
    registerUser() {
      this.user.role = this.select;
      let data = this.user;
      axios.post("/users/super/", data).then(
        (res) => {
          console.log(res);

          this.registerMessage = "The account was successfully registered.";

          this.dialog = !this.dialog;
        },
        (error) => {
          if (error.response.status === 400) {
            this.refreshUser();
            this.registerMessage =
              "This account email is already registered. Please use another email to register your account.";

            this.dialog = !this.dialog;
          } else if (error.response.status === 403) {
            this.refreshUser();
            this.registerMessage =
              "This account username is already registered. Please use another email to register your account.";

            this.dialog = !this.dialog;
          } else {
            this.registerMessage =
              "An error ocurred when registering. Please try again ";

            this.dialog = !this.dialog;
          }
        }
      );
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
