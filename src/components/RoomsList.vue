<template>
  <div>
    <nav class="navbar navbar-light" style="background-color: #e3f2fd;">
        <div class="align-left">
            <span class="navbar-brand mb-0 h1">{{username}}</span>
        </div>
    </nav>
    <div class="row">
        <div class="row justify-content-center" v-for="room in rooms" :key="room.id">
            <RoomCard :room="room"/>
        </div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import RoomCard from './RoomCard.vue';
export default defineComponent({
    computed: {
        username() {
            return this.$store.getters['username']
        },
        rooms() {
            return [{name: 'room1', id: 1}, {name: 'room2', id: 2}]
            //return this.$store.getters['rooms']
        }
    },
    components: {
        RoomCard
    }
});
</script>

<style>
    .align-left {
        margin-left: auto;
        margin-right: 0;
    }
</style>