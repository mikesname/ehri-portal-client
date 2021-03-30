<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <h1>{{ config.title }}</h1>
  <template v-if="!loading">
    <Search v-bind:api="api" />
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Search from './components/Search.vue'
import { DataApi } from './api';

export default defineComponent({
  name: 'App',
  components: {
    Search
  },
  data() { 
    return {
      api: null,
      config: {},
      loading: true,
    };
  },
  created() {
    fetch("config.json")
        .then(r => r.json())
        .then(config => {
          this.config = config;
          console.debug("Config:", this.config)
          this.api = new DataApi(this.config.endpoint, this.config.repoId)
        }).finally(() => {
          this.loading = false;
    });
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  color: #2c3e50;
  margin-top: 60px;
}
</style>