<template>
  <div class="card picked-card">
    <div class="card__wrapper">
      <div class="card__side card-front" v-if="roundStatus === 'picking'"></div>
      <div
        class="card__side card-back"
        v-if="roundStatus === 'voting' || roundStatus === 'beforeRound'"
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
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  inject: ["$socket"],
  props: ["card", "roundStatus"],
  methods: {
    onCardView(card: any) {
      this.$emit('view', card);
    },
  },
});
</script>

<style>
.votes-count {
  position: absolute;
  bottom: -30px;
}
.picked-card {
  width: 192px;
  height: 252px;
  float: left;
  background-color: gainsboro;
  padding: 5px;
  margin: 15px;
}
.card {
  perspective: 600px;
  position: relative;
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
.card {
  perspective: 600px;
  position: relative;
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
</style>
