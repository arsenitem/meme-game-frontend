<template>
  <div v-if="session" class="game">
    <div class="row">
      <div class="col">
        <div class="row">
          <h3 class="roundQuestion">{{ session.game.activeQuestion.text }}</h3>
        </div>
        <div class="row">
          <div class="game-field" style="border: 2px solid">
            <div
              v-for="card in pickedCards"
              :key="card.id"
              class="card picked-card"
              data-toggle="modal"
              data-target="#exampleModalCenter"
            >
              <div class="card__wrapper">
                <div
                  class="card__side card-front"
                  v-if="roundStatus === 'picking'"
                ></div>
                <div
                  class="card__side card-back"
                  v-if="
                    roundStatus === 'voting' || roundStatus === 'beforeRound'
                  "
                >
                  <img
                    @click="onCardView(card)"
                    :src="card.link"
                    height="240"
                    width="180"
                  />
                </div>
              </div>
              <div v-if="roundStatus === 'voting'" class="votes-count">
                {{ card.votes }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 mt-4">
        <h4>Раунд {{ round }}</h4>
        <h4>{{ roundStatusMap[roundStatus] }}({{ remainingTime }})</h4>
        <players-list :players="playersList" />
      </div>
    </div>
    <div class="row ml-4">
      <user-cards :cards="cardsList" @cardPick="onCardPick" />
    </div>
    <!-- Modal -->
    <CustomModal
      :showModal="showModal"
      :tittle="session.game.activeQuestion.text"
      :card="previewCard"
      @close="closeModal"
      @vote="voteCard"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UserCards from "./UserCards.vue";
import PlayersList from "./PlayersList.vue";
import CustomModal from "../CustomModal.vue";
export default defineComponent({
  inject: ["$socket"],
  components: {
    UserCards,
    PlayersList,
    CustomModal,
  },
  data() {
    return {
      showModal: false,
      session: null,
      cardPicked: false,
      remainingTime: 60,
      timer: null,
      previewCard: null,
      statusTimeMap: {
        picking: "roundTime",
        voting: "voteTime",
        beforeRound: "beforeNextRoundTime",
      },
      roundStatusMap: {
        picking: "Выбор карт",
        voting: "Голосование",
        beforeRound: "Ожидание следующего раунда",
      }
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
    voteCard(cardId: string) {
      this.$socket.emit("session:voteCard", {
        sessionId: this.sessionId,
        cardId,
      });
      this.closeModal();
    },
    onCardView(card: any) {
      this.showModal = true;
      this.previewCard = card;
    },
    clear() {
      this.previewCard = null;
    },
    closeModal() {
      this.showModal = false;
      this.previewCard = null;
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
.game {
  font-family: cursive;
}
.votes-count {
  position: absolute;
  bottom: -30px;
}
.game-field {
  height: 55vh;
  border: 2px solid;
  display: flex;
  flex-wrap: wrap;
}
.picked-card {
  width: 192px;
  height: 252px;
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
  padding: 10px;
  padding-left: 30px;
}
.card {
  perspective: 600px;
  position: relative;
}
.card.is-switched.card__wrapper {
  animation: rotate 0.5s linear both;
}
.card__wrapper {
  transform-style: preserve-3d;
  animation: rotate-inverse 0.5s linear both;
}
.card__side {
  backface-visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
.card-back {
  transform-style: preserve-3d;
  animation: rotate-inverse 0.5s linear both;
}
@keyframes rotate {
  0% {
    transform: rotateY(0);
  }
  70% {
    transform: rotateY(200deg);
  }
  100% {
    transform: rotateY(180deg);
  }
}

@keyframes rotate-inverse {
  0% {
    transform: rotateY(180deg);
  }
  70% {
    transform: rotateY(-20deg);
  }
  100% {
    transform: rotateY(0);
  }
}
::v-deep .modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep .modal-content {
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  background: #fff;
}
.modal__title {
  font-size: 1.5rem;
  font-weight: 700;
}
</style>
