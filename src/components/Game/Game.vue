<template>
  <div>
      <div class="row" style="height:70vh" v-if="session">
          <h2>{{session.game.activeQuestion.text}}</h2>
          <div class="col" style="border:2px solid">
              
          </div>
           <div class="col-md-3">
               <players-list :players="playersList"/>
          </div>
      </div>
      <div class="row ml-4">
            <user-cards :cards="cardsList"/>
    </div>
  </div>
</template>

<script lang='ts'>
import {defineComponent} from 'vue';
import UserCards from './UserCards.vue';
import PlayersList from './PlayersList.vue';
export default defineComponent({
    inject: ["$socket"],
    components: {
        UserCards,
        PlayersList
    },
    data() {
        return {
            session: null,
        }
    },
    computed: {
        sessionId() {
            return this.$route.params.id;
        },
        playersList() {
            return this.session?.players;
        },
        cardsList() {
            return this.session?.players?.find((p: any) => p.id === this.$socket.id)._cards;
        }
    },
    mounted() {
        
    },
    created() {
        this.$socket.on("session:updated", (session: any) => {
            this.session = session;
            console.log('status', session)
        });
    },
    unmounted() {
        this.$socket.removeListener("session:updated");
    },
});
</script>

<style>

</style>