<template
  ><div>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          Account registered
        </v-card-title>

        <v-card-text>
          You have successfully registered this account!
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

        <v-btn rounded color="primary" @click="registerUser"
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
      rules: [],
      items: [Role.BASIC, Role.ADMIN, Role.SUPERADMIN],
      select: Role.BASIC,
      dialog: false,
    };
  },
  methods: {
    registerUser() {
      this.user.role = this.select;
      let data = this.user;
      axios.post("/users/super/", data).then((res) => {
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
