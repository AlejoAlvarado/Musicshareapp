<template
  ><div>
    <v-container>
      <v-form ref="form" align="center">
        <div>
          <v-text-field
            v-model="user.name"
            label="Nombre"
            required
          ></v-text-field>
        </div>
        <div>
          <v-text-field
            v-model="user.username"
            label="Nombre de usuario"
            required
          ></v-text-field>
        </div>
        <div>
          <v-text-field
            v-model="user.email"
            label="Correo"
            required
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
        ></v-text-field>

        <v-btn rounded color="primary" @click="registerUser">Registrarse</v-btn>
      </v-form>
    </v-container>
  </div>
</template>

<script>
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
};
</script>

<style></style>
