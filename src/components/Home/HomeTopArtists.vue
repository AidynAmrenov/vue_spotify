<script>
import spotify from '../../plugins/spotify'

export default {
  data: () => ({
    artists: null,
    loading: false,
  }),
  mounted() {
    this.load()
  },
  methods: {
    load() {
      this.loading = true

      spotify.get('recommendations/available-genre-seeds')
        .then(response => {
          const genres = response.data.genres
          let count = Math.floor(Math.random() * 4) + 1

          const genre_seed = []

          for (let i = 0; i < count; i++) {
            const random_genre = genres[Math.floor(Math.random() * genres.length)]
            genre_seed.push(random_genre)
          }

          spotify.get('recommendations', {
            params: {
              seed_genres: genre_seed.join(','),
              market: 'KZ'
            }
          }).then(response => {
            let artists = []

            for (let track of response.data.tracks) {
              artists.push(... track.artists)
            }

            artists = [... new Set(artists)].sort((a,b) => 0.5  - Math.random()).splice(0, 6)

            spotify.get('artists', {
              params: {
                ids: artists.map(a => a.id).join(',')
              }
            }).then(response => {
              this.artists = response.data.artists
            }).finally(() => this.loading = false)

          })
          .catch(() => this.loading = false)

        }).catch(() => this.loading = false)

    }
  }

}
</script>

<template>
  <h1 style="margin-top: 0">Топ исполнителей</h1>

  <el-row :gutter="20" v-if="loading">

    <el-col :span="4" v-for="i in 6" :key="i">
      <el-skeleton :rows="3" animated />
    </el-col>

  </el-row>

  <el-row :gutter="20" v-else>
    <el-col :span="4" v-for="artist in artists" :key="artist.id">
      <el-image :src="artist.images[0].url" />
      <div>
        {{ artist.name }}
      </div>
    </el-col>
  </el-row>

</template>
