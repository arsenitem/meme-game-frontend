<template>
  <div class="col">
    <div class="preview-mem" v-if="preview">
      <img :src="preview" height="400" width="400" />
    </div>
    <template v-for="card in cards" :key="card.id">
      <div class="card ms-3 meme-card" style="width: 100px; height: 160px">
        <img
          :src="card.link"
          height="160"
          width="100"
          @mouseover="show(card)"
          @mouseleave="clear"
          @click="onCardSelect(card.id)"
        />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: ["cards"],
  data() {
    return {
      preview: "",
    };
  },
  methods: {
    show(card: any) {
      this.preview = card.link;
    },
    clear() {
      this.preview = "";
    },
    onCardSelect(cardId: string) {
      this.preview = "";
      this.$emit("cardPick", cardId);
    },
  },
});
</script>

<style>
.meme-card {
  display: inline-block;
}
.preview-mem {
  position: absolute;
  margin-top: -450px;
  margin-left: 300px;
  z-index: 100;
}
</style>
