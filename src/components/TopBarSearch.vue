<script>
import spotify from '../plugins/spotify'
import axios from 'axios'

const source = axios.CancelToken.source()

export default {
  data: () => ({
    value: ''
  }),
  methods: {
    resultsToSuggestions(results) {
      return results.map(result => {
        result.value = result.name

        if (result.type === 'artist') {
          result.icon = 'people'
        }
        else if (result.type === 'track') {
          result.value = result.value + ' - ' + result.artists[0].name
          result.icon = 'audiotrack'
        }

        return result
      })
    },
    search(value, callback) {
      this.loading = true

      spotify.get('search', {
        cancelToken: source.token,
        params: {
          q: value,
          type: 'artist,track',
          limit: 5,
        }
      }).then(response => {
        this.results = response.data

        let tracks = []

        if ('tracks' in response.data) {
          tracks = response.data.tracks.items
        }

        let artists = []

        if ('artists' in response.data) {
          artists = response.data.artists.items
        }

        const suggestions = this.resultsToSuggestions(tracks.concat(artists))
        callback(suggestions)

      }).finally(() => {
        this.loading = false
      })

    },
    handleSelect(item) {
      this.value = ''
      console.log(item)
    }
  }
}

</script>

<template>
  <div>
    <el-autocomplete
        clearable
        v-model="value"
        @select="handleSelect"
        :trigger-on-focus="false"
        :fetch-suggestions="search"
        placeholder="Трек или испольнитель..."
    >
      <template #default="{item}">
        <div class="value">
          <i class="material-icons" style="color: #e0e0e0; padding-top: 7px; margin-right: 10px; font-size: 14px">
            {{ item.icon }}
          </i>
          {{ item.value }}
        </div>
      </template>
    </el-autocomplete>

  </div>
</template>
