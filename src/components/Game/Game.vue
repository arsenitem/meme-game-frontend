<template>
  <div v-if="session" class="game">
    <div class="row">
      <div class="col">
        <div class="row">
          <h3 class="roundQuestion">{{ session.game.activeQuestion.text }}</h3>
        </div>
        <div class="row">
          <div class="game-field" style="border: 2px solid">
            <div v-for="card in pickedCards" :key="card.id">
              <PickedCard :card="card" :roundStatus="roundStatus" @view="viewCard"/>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 mt-4">
        <h4>Раунд {{ round }}</h4>
        <h4>{{ roundStatusMap[roundStatus] }}({{ remainingTime }})</h4>
        <PlayersList :players="playersList" />
      </div>
    </div>
    <div class="row ml-4">
      <UserCards :cards="cardsList" @cardPick="onCardPick" />
    </div>
    <PreviewCard
      :showModal="showModal"
      :tittle="session.game.activeQuestion.text"
      :card="previewCard"
      :showVoteBtn="!voted"
      @close="closeModal"
      @vote="voteCard"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UserCards from "./UserCards.vue";
import PlayersList from "./PlayersList.vue";
import PickedCard from "./PickedCard.vue";
import PreviewCard from "../modals/PreviewCard.vue";
export default defineComponent({
  inject: ["$socket"],
  components: {
    UserCards,
    PlayersList,
    PickedCard,
    PreviewCard,
  },
  data() {
    return {
      voted: false,
      showModal: false,
      previewCard: false,
      session: null,
      remainingTime: 60,
      timer: null,
      statusTimeMap: {
        picking: "roundTime",
        voting: "voteTime",
        beforeRound: "beforeNextRoundTime",
      },
      roundStatusMap: {
        picking: "Выбор карт",
        voting: "Голосование",
        beforeRound: "Ожидание следующего раунда",
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
        this.previewCard = null;
        this.showModal = false;
        this.voted = false;
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
    closeModal() {
      this.showModal = false;
      this.previewCard = null;
    },
    voteCard(cardId: string) {
      this.$socket.emit("session:voteCard", {
        sessionId: this.sessionId,
        cardId,
      });
      this.closeModal();
      this.voted = true;
    },
    viewCard(card: any) {
      this.showModal = true;
      this.previewCard = card;
    }
  },
  created() {
    this.$nextTick(() => {
      this.$socket.on("session:status", (session: any) => {
        this.session = session;
      });
    });
  },
  mounted() {
    this.$socket.emit("session:getStatus", { sessionId: this.sessionId });
  },
  unmounted() {
    this.$socket.removeListener("session:status");
  },
});
</script>

<style>
.game {
  font-family: cursive;
}
.game-field {
  height: 55vh;
  border: 2px solid;
  display: flex;
  flex-wrap: wrap;
}
.roundQuestion {
  padding: 10px;
  padding-left: 30px;
}
</style>
