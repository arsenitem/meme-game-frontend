<template>
<div>
  <nav class="navbar navbar-light" style="background-color: #e3f2fd" v-if="user.name">
      <div class="align-left">
        <span class="navbar-brand mb-0 h1">{{ user.name }}</span>
      </div>
    </nav>
    <router-view/>
</div>
  
</template>

<style>

</style>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'App',
  computed: {
    user() {
      return this.$store.getters["user"];
    },
  },
  mounted() {
  },
  beforeUnmout() {
    localStorage.removeItem('userName');
  }
})
</script>
