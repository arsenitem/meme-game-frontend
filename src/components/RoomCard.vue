<template>
     <div class="card text-dark bg-light mb-2 mt-5" style="max-width: 40rem;">
        <div class="card-header">{{room.name}}</div>
        <div class="card-body">
            <div class="row">
                <div class="col-md-4">
                    Список игроков
                    <div class="row" v-for="player in room.players" :key="player.id">
                        <p>{{player.name}}</p>
                    </div>
                </div>    
                <div class="col-md-4">
                    Хост
                    <div class="row">
                        <p>{{room.host.name}}</p>
                    </div>
                </div>
                <div class="col-md-4">
                    Статус
                    <div class="row">
                        <p>{{gameStatus}}</p>
                    </div>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-md-4">
                    <button class="btn btn-primary" @click="onJoinClick">Присоедениться</button>
                </div>    
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import {defineComponent, PropType } from 'vue';

interface IroomItem {
  name: string,
  id: number,
  players: Array<any>;
}

export default defineComponent({
    inject: ["$socket"],
    props: {
        room: {
            type: Object as PropType<IroomItem>,
            required: true,
        },
    },
    computed: {
        gameStatus() {
            return this.room.game.round > 0 ? `Идет игра(Раунд ${this.game.round})` : "Ожидание игроков";
        }
    },
    methods: {
        onJoinClick() {
            console.log(this.room.id)
            this.$socket.emit('player:join', {sessionId: this.room.id});
            this.$router.push({name: 'Room', params: {id: this.room.id}})
        }
    }
});
</script>

<style>

</style>