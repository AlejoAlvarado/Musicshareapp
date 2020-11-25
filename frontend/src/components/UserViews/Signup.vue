<template
  ><div>
    <v-container>
      <div>
        <v-form ref="form">
          <v-row>
            <v-text-field
              v-model="user.name"
              label="Nombre"
              required
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
              v-model="user.email"
              label="Correo"
              required
            ></v-text-field>
          </v-row>
        </v-form>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: "",
        email: "",
      },
    };
  },
};
</script>

<style></style>
