<template
  ><div>
    <v-container>
      <v-form ref="form" align="center">
        <div>
          <v-text-field
            v-model="user.name"
            label="Nombre"
            required
            dark
          ></v-text-field>
        </div>
        <div>
          <v-text-field
            v-model="user.username"
            label="Nombre de usuario"
            required
            dark
          ></v-text-field>
        </div>
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

        <v-btn rounded color="primary" @click="registerUser">Registrarse</v-btn>
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
  methods: {
    registerUser() {
      let data = this.user;
      axios.post("/users/", data).then((res) => {
        if (res.status >= 200 && res.status < 300) {
          this.refreshUser();
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
  },
};
</script>

<style></style>
