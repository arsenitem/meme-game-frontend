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

<style>
  #app {
    font-family: 'Press Start 2P', cursive;
  }
  .form-control:focus {
    color: #212529;
    background-color: #fff;
    border-color: #ffc107;
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgb(255 193 7 / 25%);
}
</style>