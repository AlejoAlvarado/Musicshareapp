<template>
  <v-simple-table>
      <thead>
          <tr>
              <th>
                  Cover
              </th>
              <th>
                  Title
              </th>
              <th>
                  Artist
              </th>
          </tr>
      </thead>
      <tbody>
          <tr v-for="(song, i) in songs" :key="i">
              <td><v-img :src="song.cover"></v-img></td>
          </tr>
      </tbody>
  </v-simple-table>
</template>

<script>
export default {
    props:{
        songs:{
            type: Array,
        }
    }

}
</script>
