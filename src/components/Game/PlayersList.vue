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
    computed: {
        players() {
            return [
                {
                    id: 1,
                    name: 'Игрок 1'
                },
                {
                    id: 2,
                    name: 'Игрок 2'
                },


            ]
        }
    }

});
</script>

<style>

</style>