<template>
  <div v-if="session">
    <h2 class="roundQuestion">{{ session.game.activeQuestion.text }}</h2>
    <div class="row" style="height: 65vh">
      <div class="col" style="border: 2px solid">
        <!-- <div v-if="preview">
          <img :src="preview" height="400" width="400" class="preview" />
        </div> -->
        <div
          v-for="card in pickedCards"
          :key="card.id"
          class="pickedCard"
          @click="onVoteCardClick(card.id)"
        >
          <div v-if="roundStatus === 'voting' || roundStatus === 'beforeRound'">
            <img
              :src="card.link"
              :height="preview === card.id ? 400 :240"
              :width="preview === card.id ? 400 :240"
              @mouseover="show(card.id)"
              @mouseleave="clear"
            />
            <div>{{ card.votes }}</div>
          </div>
          <div v-if="roundStatus === 'picking'">
            <!-- <img height="160" width="100"> -->
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <h2>Раунд {{ round }}</h2>
        <h2>{{ roundStatus }}({{ remainingTime }})</h2>
        <players-list :players="playersList" />
      </div>
    </div>
    <div class="row ml-4">
      <user-cards :cards="cardsList" @cardPick="onCardPick" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UserCards from "./UserCards.vue";
import PlayersList from "./PlayersList.vue";
export default defineComponent({
  inject: ["$socket"],
  components: {
    UserCards,
    PlayersList,
  },
  data() {
    return {
      session: null,
      cardPicked: false,
      remainingTime: 60,
      timer: null,
      preview: null,
      statusTimeMap: {
        picking: "roundTime",
        voting: "voteTime",
        beforeRound: "beforeNextRoundTime",
      },
    };
  },
  computed: {
    sessionId() {
      return this.$route.params.id;
    },
    playersList() {
      return this.session?.players;
    },
    cardsList() {
      return this.session?.players?.find((p: any) => p.id === this.$socket.id)
        ._cards;
    },
    pickedCards() {
      return this.session?.game?.roundCards;
    },
    round() {
      return this.session?.game?.round;
    },
    roundStatus() {
      return this.session?.game?.roundStatus;
    },
  },
  watch: {
    roundStatus(val) {
      clearInterval(this.interval);
      this.remainingTime = this.session.settings[this.statusTimeMap[val]];
      this.interval = setInterval(() => {
        this.remainingTime--;
      }, 1000);
    },
    remainingTime(val) {
      if (val === 0) {
        clearInterval(this.interval);
      }
    },
    pickedCards(cards) {
      if (cards.length === 0) {
        this.preview = null;
      }
    },
  },
  methods: {
    onCardPick(cardId: string) {
      this.$socket.emit("session:pickCard", {
        sessionId: this.sessionId,
        cardId,
      });
    },
    onVoteCardClick(cardId: string) {
      this.$socket.emit("session:voteCard", {
        sessionId: this.sessionId,
        cardId,
      });
    },
    show(cardId: string) {
      this.preview = cardId;
    },
    clear() {
      this.preview = null;
    },
  },
  created() {
    this.$nextTick(() => {
      this.$socket.on("session:status", (session: any) => {
        this.session = session;
        console.log("status", session);
      });
    });
  },
  mounted() {
    console.log("get session status");
    console.log(this.$socket);
    this.$socket.emit("session:getStatus", { sessionId: this.sessionId });
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
  width: 150px;
  height: 240px;
  float: left;
  background-color: gainsboro;
  padding: 5px;
  margin: 15px;
}
.preview {
  position: absolute;
  margin-left: 300px;
}
.roundQuestion {
    height: 60px;
}
</style>
