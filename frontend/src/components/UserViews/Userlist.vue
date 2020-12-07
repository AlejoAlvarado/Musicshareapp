<template>
  <v-container>
    <div class="form-wrapper">
      <h2>User list</h2>

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

                  <v-col class="btnitems">
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
                          @click="
                            infoDependy(i);
                            searchUserDepen(selectedDepen.name);
                          "
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
                          @click="deleteDependency(i)"
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

                  <v-col class="btnitems">
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
                            mdi-gavel
                          </v-icon>
                        </v-btn>
                      </template>
                      <span>Ban user</span>
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
//import axios from "../../config/axios";
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
    infoDependy(i) {
      this.selectedDepen = this.$store.state.dependencies[i];
      this.usersDepen = this.selectedDepen.members;
      this.dialog = true;
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
      this.$router.push("/ProfileEdit");
    },
  },
};
</script>

<style>
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
