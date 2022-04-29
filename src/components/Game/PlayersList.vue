<template>
<div>
    <div class="card mt-2" v-for="player in players" :key="player.id">
        {{player.name}}
    </div>
</div>
  
</template>

<script lang='ts'>
import {defineComponent} from 'vue';
export default defineComponent({
    props: ['players'],
});
</script>

<style>

</style>