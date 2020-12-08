<template>
    <div>
        <v-container>
            <v-simple-table>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left">
                                Property
                            </th>
                            <th class="text-left">
                                Value
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Username</td>
                            <td> {{ user.username }}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td> {{ user.email }}</td>
                        </tr>
                        <tr>
                            <td>Number of songs uploaded</td>
                            <td> {{ user.songs.length }}</td>
                        </tr>
                        <tr>
                            <td>Playlists owned</td>
                            <td> {{ user.playlists.length }}</td>
                        </tr>
                        <tr>
                            <td>Playlists shared with him/her</td>
                            <td> {{ user.sharedWithMe.length }}</td>
                        </tr>
                        <tr>
                            <td>Banned</td>
                            <td> {{ user.active }}</td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
            <v-btn :to="'/userlist'">
                Back to users list
            </v-btn>
        </v-container>
    </div>
</template>

<script>
import axios from '../../config/axios';

export default {
    data(){
        return{
            user: '',
        }
    },

    created(){
        axios.get('/users/' + this.$route.params.id).then(res => {
            this.user = res.data
            console.log(this.user);
        });
    }
    
}
</script>