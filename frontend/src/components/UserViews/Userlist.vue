<!-- Component with the list of users that are registered in the application. Depending on the users role, different actions can be taken. -->
<template>
  <v-container>
    <div class="form-wrapper">
      <h1>User list</h1>

      <v-card class="mx-auto" max-width="1000">
        <v-list>
          <v-list-item-group v-model="model" mandatory color="indigo">
            <v-list-item v-for="(item, i) in users" :key="i">
              <v-list-item-content>
                <v-row>
                  <v-col class="dependencyitem">
                    <v-list-item-title
                      v-text="item.username"
                    ></v-list-item-title>
                  </v-col>

                  <v-col class="btnitems" v-if="isAdmin(item.role)">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          @click="editUser(i)"
                          class="mx-2"
                          fab
                          dark
                          small
                          color="orange"
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon dark>
                            mdi-pencil
                          </v-icon>
                        </v-btn>
                      </template>
                      <span>Edit Admin</span>
                    </v-tooltip>
                  </v-col>
                  <v-col class="btnitems" v-else-if="isSuperadmin(item.role)">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          @click="editUser(i)"
                          class="mx-2"
                          fab
                          dark
                          small
                          color="red"
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon dark>
                            mdi-pencil
                          </v-icon>
                        </v-btn>
                      </template>
                      <span>Edit Superadmin</span>
                    </v-tooltip>
                  </v-col>
                  <v-col class="btnitems" v-else>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          @click="editUser(i)"
                          class="mx-2"
                          fab
                          dark
                          small
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon dark>
                            mdi-pencil
                          </v-icon>
                        </v-btn>
                      </template>
                      <span>Edit user</span>
                    </v-tooltip>
                  </v-col>

                  <v-col class="btnitems">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          :to="'/report/user/' + item._id"
                          class="mx-2"
                          fab
                          dark
                          small
                          color="primary"
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon dark>
                            mdi-eye
                          </v-icon>
                        </v-btn>
                      </template>
                      <span>Generate report</span>
                    </v-tooltip>
                  </v-col>

                  <v-col class="btnitems">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          class="mx-2"
                          fab
                          dark
                          small
                          color="green"
                          :to="'/user/' + item._id + '/playlists'"
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon dark>
                            mdi-folder
                          </v-icon>
                        </v-btn>
                      </template>
                      <span>View musiclist</span>
                    </v-tooltip>
                  </v-col>

                  <v-col class="btnitems" v-if="item.active">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          @click="banUser(i)"
                          class="mx-2"
                          fab
                          dark
                          small
                          color="red"
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon dark>
                            mdi-gavel
                          </v-icon>
                        </v-btn>
                      </template>
                      <span>Ban user</span>
                    </v-tooltip>
                  </v-col>

                  <v-col class="btnitems" v-else>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          @click="banUser(i)"
                          class="mx-2"
                          fab
                          dark
                          small
                          color="indigo"
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon dark>
                            mdi-gavel
                          </v-icon>
                        </v-btn>
                      </template>
                      <span>Unbann user</span>
                    </v-tooltip>
                  </v-col>
                </v-row>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import axios from "../../config/axios";
export default {
  data() {
    return {
      model: true,
      selectedDepen: "",
      usersDepen: "",
      users: "",
    };
  },
  computed: {},
  created() {
    /*const token = localStorage.getItem("user");
    console.log(token);
    if (token) {
      axios.defaults.headers.common.authorization = JSON.parse(token).token;
      console.log(axios.defaults.headers.common["authorization"]);
    }*/
    this.getUsers();
  },
  methods: {
    ...mapActions(["obtainUsers", "cleanUsers", "setSelectedUser"]),
    banUser(index) {
      let bannedUser = this.users[index];
      bannedUser.active = !bannedUser.active;
      let userid = bannedUser._id;
      axios.put("/users/banned/" + userid, bannedUser).then(
        (res) => {
          if (res.status >= 200 && res.status < 300) {
            alert("User processed succesfully!");
            // console.log("delete exitoso");
          } else {
            console.log("Error updating user");
          }
        },
        (error) => {
          console.log(error.data);
        }
      );
      location.reload();
    },
    getUsers() {
      //this.cleanUsers();
      this.obtainUsers().then(() => {
        this.users = this.$store.state.users;
      });
    },
    editUser(index) {
      console.log(this.users[index]);
      this.setSelectedUser(this.users[index]);
      this.$router.push("/profedit");
    },
    isAdmin(role) {
      console.log(role + ", ADMIN" + ":" + role === "ADMIN");
      return role === "ADMIN";
    },
    isSuperadmin(role) {
      return role === "SUPERADMIN";
    },
  },
};
</script>

<style>
h1 {
  font-size: 45px;
  color: rgb(255, 255, 255);
}
.form-wrapper {
  padding: 40px;
}

.dependencyitem {
  margin-right: 400px;
}
.btnitems {
  margin-left: 0px;
  margin-right: 0px;
}
</style>
