<template>
  <div>
    <nav class="navbar navbar-light" style="background-color: #e3f2fd;">
        <div class="align-left">
            <span class="navbar-brand mb-0 h1">{{username}}</span>
        </div>
    </nav>
    <div class="row">
        <div class="row justify-content-center" v-for="room in sessions" :key="room.id">
            <RoomCard :room="room"/>
        </div>
    </div>
  </div>
</template>

<script lang='ts'>
import {defineComponent} from 'vue';
import RoomCard from './RoomCard.vue';
export default defineComponent({
    inject: ['$socket'],
    data() {
        return {
            sessions: [],
        }
    },
    computed: {
        username() {
            return this.$store.getters['username']
        },
        rooms() {
            return this.$store.getters['rooms']
        }
    },
    components: {
        RoomCard
    },
    created () {
        this.$socket.on('session:list', (sessions: any) => {
            console.log(sessions);
            this.sessions = sessions;
        })
    },
    mounted() {
        this.$socket.emit('session:getList');
    }
});
</script>

<style>
    .align-left {
        margin-left: auto;
        margin-right: 0;
    }
</style>