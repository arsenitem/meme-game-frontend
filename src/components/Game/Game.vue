<template>
  <div v-if="session">
      <h2>{{session.game.activeQuestion.text}}</h2>
      <div class="row" style="height:65vh">
          <div class="col" style="border:2px solid">
              <div v-for="card in pickedCards" :key="card.id" class="pickedCard" @click="onVoteCardClick(card.id)">
                  <div v-if="roundStatus === 'voting' || roundStatus === 'beforeRound'">
                      <img :src="card.link" height="160" width="100"/>
                      <div>{{card.votes}}</div>
                  </div>
                  <div v-if="roundStatus === 'picking'">
                      <!-- <img height="160" width="100"> -->
                  </div>
              </div>
          </div>
           <div class="col-md-3">
               <h2>Раунд {{round}}</h2>
               <h2>{{roundStatus}}({{remainingTime}})</h2>
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
            remainingTime: 60,
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
        },
        round() {
            return this.session?.game?.round;
        },
        roundStatus() {
            return this.session?.game?.roundStatus;
        }
    },
    watch: {
        roundStatus(val, old) {
            console.log(val, old);
            const interaval = setInterval(() => {
                this.remainingTime--
            }, 1000)
            if (this.remainingTime === 0) {
                clearInterval(interaval);
            }
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
    created() {
        this.$nextTick(() => {
            this.$socket.on("session:status", (session: any) => {
                this.session = session;
                console.log('status', session)
            });
        })
        
    },
    mounted() {
        console.log('get session status')
        console.log(this.$socket)
        this.$socket.emit('session:getStatus', {sessionId: this.sessionId });
        // this.$socket.on("session:status", (session: any) => {
        //     this.session = session;
        //     console.log('status', session)
        // });
    },
    unmounted() {
        //this.$socket.removeListener("session:status");
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