<template>
  <div>
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

        <v-btn rounded color="primary" @click="registerUser"
          >Iniciar Sesión</v-btn
        >
      </v-form>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    loginUser() {},
  },
};
</script>

<style></style>
