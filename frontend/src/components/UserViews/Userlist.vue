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
                    <v-btn
                      @click="editUser(i)"
                      class="mx-2"
                      fab
                      dark
                      small
                      color="primary"
                    >
                      <v-icon dark>
                        mdi-pencil
                      </v-icon>
                    </v-btn>
                  </v-col>

                  <v-col class="btnitems">
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
                    >
                      <v-icon dark>
                        mdi-eye
                      </v-icon>
                    </v-btn>
                  </v-col>

                  <v-col class="btnitems">
                    <v-btn
                      class="mx-2"
                      fab
                      dark
                      small
                      color="primary"
                      @click="deleteDependency(i)"
                    >
                      <v-icon dark>
                        mdi-delete
                      </v-icon>
                    </v-btn>
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
    this.getUsers();
  },
  methods: {
    ...mapActions(["obtainUsers", "cleanUsers"]),
    infoDependy(i) {
      this.selectedDepen = this.$store.state.dependencies[i];
      this.usersDepen = this.selectedDepen.members;
      this.dialog = true;
    },
    getUsers() {
      //this.cleanUsers();
      this.obtainUsers().then(() => {
        this.users = this.$store.getters.getUsers;
      });
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
