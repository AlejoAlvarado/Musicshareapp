<template>
  <v-simple-table>
    <thead>
      <tr>
        <th>Cover</th>
        <th>Title</th>
        <th>Artist</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(song, i) in songs" :key="i">
        <td>
          <v-img :src="song.image" max-height="100" max-width="100"></v-img>
        </td>
        <td>{{ song.title }}</td>
        <td>{{ song.artist }}</td>
      </tr>
    </tbody>
  </v-simple-table>
</template>

<script>
export default {
  props: {
    songs: {
      type: Array,
    },
  },
};
</script>

