<script>
import spotify from '../plugins/spotify'
import axios from 'axios'

const source = axios.CancelToken.source()

export default {
  data: () => ({
    value: '',
    results: null,
    loading: false,
  }),
  watch: {
    // value() {
    //
    //   if (this.value.length > 0) {
    //     this.search()
    //   } else {
    //     this.results = null
    //     this.loading = false
    //   }
    //
    // }
  },
  methods: {
    resultsToSuggestions(results) {
      return results.map(result => {
        return {
          value: result.name,
        }
      })
    },
    search(value, callback) {
      this.loading = true

      spotify.get('search', {
        cancelToken: source.token,
        params: {
          q: value,
          type: 'artist,track',
        }
      }).then(response => {
        this.results = response.data

        let tracks = []

        if ('tracks' in response.data) {
          tracks = response.data.tracks.items.map(t => {
            t.name = 'Трек: ' + t.name + ' - ' + t.artists[0].name
            return t
          })
        }

        let artists = []

        if ('artists' in response.data) {
          artists = response.data.artists.items.map(a => {
            a.name = 'Исполнитель: ' + a.name
            return a
          })
        }

        const suggestions = this.resultsToSuggestions(tracks.concat(artists))
        callback(suggestions)

      }).finally(() => {
        this.loading = false
      })

    }
  }
}

</script>

<template>
  <div>
    <el-autocomplete
        clearable
        v-model="value"
        :trigger-on-focus="false"
        :fetch-suggestions="search"
        placeholder="Трек или испольнитель..."
    />

    {{ results }}
  </div>
</template>
