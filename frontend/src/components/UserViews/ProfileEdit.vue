<!-- Component that shows a view of the profile of a certain user when accessed by an ADMIN or SUPERADMIN user. The ADMIN or SUPERADMIN can
update and modify a user in this component. -->
<template
  ><div>
    <v-container>
      <h1>{{ user.username }}'s Profile</h1>
      <v-form ref="form" align="center" v-model="valid">
        <div>
          <v-text-field
            v-model="user.name"
            label="Name"
            required
            dark
            ref="textfield"
            :disabled="!edit"
            :rules="nameRules"
          ></v-text-field>
        </div>
        <div>
          <v-text-field
            v-model="user.username"
            label="Usename"
            required
            dark
            :disabled="!edit"
            :rules="nameRules"
          ></v-text-field>
        </div>
        <div>
          <v-text-field
            v-model="user.email"
            label="Email"
            required
            dark
            :disabled="!edit"
            :rules="emailRules"
          ></v-text-field>
        </div>
        <v-text-field
          :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPass ? 'text' : 'password'"
          v-model="user.password"
          name="input-10-2"
          label="Contraseña"
          hint="Must have at least 5 characters. Leave blank if you don't want to change the password."
          class="input-group--focused"
          @click:append="showPass = !showPass"
          dark
          :disabled="!edit"
          :rules="passwordRules"
        ></v-text-field>

        <div v-if="userIsSuperadmin()">
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
                :disabled="!edit"
              ></v-select>
            </v-col>
          </v-row>
        </div>

        <div v-if="!edit" align="center">
          <v-btn align="center" rounded color="primary" @click="editProfile"
            >Edit profile</v-btn
          >
        </div>

        <div v-else align="center">
          <v-btn rounded @click="editProfile">Cancel</v-btn>

          <v-btn
            rounded
            color="primary"
            @click="updateSelectedUser"
            :disabled="!valid"
            >Save changes</v-btn
          >
        </div>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { Role } from "../../_helpers/role";
export default {
  data() {
    return {
      user: {
        name: "Alejandro",
        username: "Alejo123",
        email: "",
        password: "",
      },
      items: [Role.BASIC, Role.ADMIN, Role.SUPERADMIN],
      showPass: false,
      rules: [],
      edit: false,
      select: "",
      emailRules: [
        (email) => !!email || "Required",
        (email) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email) ||
          "Email no valido",
      ],
      passwordRules: [
        (password) =>
          password.length > 4 ||
          password.length == 0 ||
          "The password must contain at least 5 letters",
      ],
      nameRules: [
        (name) => !!name || "Required",
        (name) => name.length > 2 || "The name is too short",
      ],
      valid: false,
    };
  },
  methods: {
    ...mapActions(["updateUser"]),
    editProfile() {
      this.edit = !this.edit;
    },
    updateSelectedUser() {
      console.log(this.user.password);
      this.user.role = this.select;
      this.updateUser(this.user).then(() => {
        this.$router.push("/userlist");
      });
    },
    userIsSuperadmin() {
      let isSuperadmin = this.$store.getters.getUser.role === Role.SUPERADMIN;
      if (isSuperadmin) {
        return true;
      } else {
        return false;
      }
    },
  },
  created() {
    let currentUser = this.$store.state.selectedUser;
    this.user = currentUser;
    this.user.password = "";
    this.select = this.user.role;
    console.log(currentUser);
  },
};
</script>

<style>
h1 {
  font-size: 45px;
  color: rgb(255, 255, 255);
}
#textfield {
  width: 50%;
}
</style>
