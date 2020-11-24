<template>
  <div>
    <v-container>
      <div>
        <v-form ref="form">
          <v-row>
            <v-col>
              <v-text-field
                v-model="user.name"
                :rules="nameRules"
                label="Nombre"
                required
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="user.lastname"
                :rules="nameRules"
                label="Apellido"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style></style>
