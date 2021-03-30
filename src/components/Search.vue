<template>
  <div class="search">
    <div class="search-box">
      <label for="search-q">Search:</label>
      <input v-model.lazy="q" id="search-q" type="search"/>
    </div>

    <div class="search-summary">
      <template v-if="loading">
        Loading...
      </template>
      <template v-else>
        Found {{ total }} item(s).
      </template>
    </div>
    <div class="search-results">
      <div v-for="item in items" v-bind:key="item.key">
        <h4>{{ item.attributes.descriptions[0].name }}</h4>
        {{ item.id }}
      </div>
    </div>

    <div v-if="pages > 1" class="search-pagination">
      <span v-for="p in pages" class="page">
        <a v-bind:href="p === page ? '' : '#'" v-on:click.prevent="tmpPage = p" >{{ p }}</a>
      </span>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {ApiPage, DataApi, SearchItem} from '../api';

export default defineComponent({
  name: 'Search',
  props: {
    api: DataApi,
  },
  data() {
    return {
      q: "",
      page: 1,
      tmpPage: 1,
      pages: 0,
      total: -1,
      items: [],
      loading: true,
    };
  },
  watch: {
    tmpPage: function(newPage) {
      this.search(newPage);
    },
    q: function(newQ) {
      this.search(1);
    }
  },
  methods: {
    search: async function(page?: number) {
      this.loading = true;

      try {
        let {data, meta}: ApiPage<SearchItem> =
            await this.api.search(this.q, page || this.page);
        this.items = data;
        this.pages = meta.pages;
        this.total = meta.total;
        this.page = page || this.page;
        this.tmpPage = this.page;
      } catch (e) {
        
      } finally {
        this.loading = false;
      }
    }
  },
  created () {
    this.search();
  },
})
</script>

<style scoped>

a[href=''] {
  color: #333;
  text-decoration: none;
}

a {
  color: #42b983;
}

label {
  font-weight: bold;
}

.search-pagination a {
  padding: .5rem;
}

.search-box {
  margin-bottom: 1rem;
}

.search-pagination {
  position: sticky;
  bottom: 0;
  background-color: #fff;
  padding: .5rem;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
