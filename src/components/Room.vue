<template>
     <div class="container">
         <div class="row justify-content-center">
                <div class="card mt-5" style="max-width: 60rem;" v-if="session">
                    <div class="row justify-content-center">
                        {{session.name}}
                    </div>
                    <div class="row">
                        <div class="col">
                            Какие-то настройки
                        </div>
                        <div class="col md-5">
                            Список игроков
                            <div class="row" v-for="player in session.players" :key="player.id">
                                <p>{{player.name}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <button class="btn btn-primary" @click="onGameStart" v-if="isHost">Начать игру</button>
                    </div>
                    <div class="row">
                        <button class="btn btn-primary" @click="onGameJoin" v-show="btnVisible">Присоединиться к игре</button>
                    </div>
                </div>
         </div>
      
    </div>
</template>

<script lang='ts'>
import {defineComponent} from 'vue';
export default defineComponent({
    inject: ["$socket"],
    data() {
        return {
            session: null,
            btnVisible: false,
        }
    },
    computed: {
        sessionId() {
            return this.$route.params.id;
        },
        isHost() {
            return this.$socket.id === this.session?.host?.id;
        }
    },
    methods: {
        onGameStart() {
            setTimeout(() => {
                this.$socket.emit('session:start', {sessionId: this.sessionId });
            }, 400)
        },
    },
    mounted() {
        this.$socket.emit('session:getStatus', {sessionId: this.sessionId })
    },
    created() {
        this.$socket.on("session:status", (session: any) => {
            this.session = session;
            console.log('status', session)
        });
        this.$socket.on("session:started", () => {
            this.$router.push({name: 'Game'});
        });
      
    },
    unmounted() {
        this.$socket.removeListener("session:status");
        this.$socket.removeListener("session:started");
    },

});
</script>

<style>

</style>