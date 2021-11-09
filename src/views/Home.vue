<script>
import spotify from '../plugins/spotify'

export default {
  data: () => ({
    searchInput: '',
    searchResults: {},
    loading: false,
  }),
  computed: {
    canSearch() {
      return !this.loading && this.searchInput.length > 3;
    }
  },
  methods: {
    search() {
      if (!this.canSearch) {
        return
      }

      this.loading = true

      spotify.get('search', {
        params: {
          q: this.searchInput,
          type: 'artist,track',
        }
      }).then(response => {
        this.searchResults = response.data
      })

    },
    showItemsFor(name) {
      return name in this.searchResults && this.itemsFor(name).length > 0
    },
    itemsFor(name) {
      return this.searchResults[name].items
    }
  }
}
</script>

<template>

  <el-button>
    Hello
  </el-button>

  <form @submit.prevent="search">
    <input type="text" v-model="searchInput">
    <button>Поиск</button>
  </form>

  <div v-if="showItemsFor('artists')">
    <h4>Исполнители</h4>

    <div v-for="artist in itemsFor('artists')" :key="artist.id">

      <p>
        {{ artist.name }}
      </p>
      <small>
        {{ artist.genres.join(', ') }}
      </small>

      <hr />

    </div>

  </div>

  <div v-if="showItemsFor('tracks')">
    <h4>Треки</h4>

    <div v-for="track in itemsFor('tracks')" :key="track.id">
      <div>
        {{ track.name }}
      </div>

      <small>
        {{ track.artists.map(a => a.name).join(', ') }}
      </small>

      <hr />
    </div>

  </div>

</template>
