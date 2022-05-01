<template>
  <div>
      <h2>{{session.game.activeQuestion.text}}</h2>
      <div class="row" style="height:65vh" v-if="session">
          <div class="col" style="border:2px solid">
              <div v-for="card in pickedCards" :key="card.id" class="pickedCard" @click="onVoteCardClick(card.id)">
                  card
              </div>
          </div>
           <div class="col-md-3">
               <players-list :players="playersList"/>
          </div>
      </div>
      <div class="row ml-4">
            <user-cards :cards="cardsList" @cardPick="onCardPick"/>
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
            cardPicked: false,
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
        },
        pickedCards() {
            return this.session?.game?.roundCards;
        }
    },
    methods: {
        onCardPick(cardId: string) {
            this.$socket.emit('session:pickCard', {sessionId: this.sessionId, cardId});
        },
        onVoteCardClick(cardId: string) {
            this.$socket.emit('session:voteCard', {sessionId: this.sessionId, cardId});
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
    .pickedCard {
        width: 100px;
        height: 160px;
        float: left;
        background-color: gainsboro;
        padding: 5px;
        margin: 15px;
    }
</style>