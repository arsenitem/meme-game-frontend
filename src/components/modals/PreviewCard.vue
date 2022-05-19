<template>
  <div v-if="card">
    <vue-final-modal
      v-model="show"
      classes="modal-container"
      content-class="modal-content"
    >
      <button class="modal__close" @click="onCloseClick">
        <img src="../../assets/icons/xMark.svg" />
      </button>
      <span class="modal__title">{{ tittle }}</span>
      <div class="modal__content">
        <img :src="card.link" class="content-img" />
      </div>
      <div class="modal__action">
        <button @click="onCloseClick">Закрыть</button>
        <button @click="onVoteClick" v-if="showVoteBtn">Проголосовать</button>
      </div>
    </vue-final-modal>
  </div>
</template>
<script>
export default {
  name: "PreviewCard",
  data() {
    return {
      show: this.showModal,
    };
  },
  watch: {
    showModal(val) {
      this.show = val;
    },
  },
  props: {
    showModal: {
      type: Boolean,
      default() {
        return false;
      },
    },
    tittle: {
      type: String,
      default() {
        return "";
      },
    },
    card: {
      type: Object,
      default() {
        return {};
      },
    },
    showVoteBtn: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  methods: {
    onCloseClick() {
      this.$emit("close");
    },
    onVoteClick() {
      this.$emit("vote", this.card.id);
    },
  },
};
</script>
<style scoped>
.modal__close {
  position: absolute;
  border: none;
  top: 0.5rem;
  right: 0.5rem;
}
.content-img {
  width: 100%;
  max-height: 550px;
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

<style scoped>
.dark-mode div::v-deep .modal-content {
  border-color: #2d3748;
  background-color: #1a202c;
}
</style>
