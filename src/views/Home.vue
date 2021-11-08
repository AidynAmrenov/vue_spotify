<script>
import spotify from '../plugins/spotify'

export default {
  mounted() {
    spotify.get('search', {
      query: {
        q: 'Nirvana',
        type: 'artist'
      }
    })
    .then(response => {
      console.log(response.data)
    })
  }
}
</script>

<template>
  Home page
</template>
