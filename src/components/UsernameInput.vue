<template>
  <div class="username-input-block">
    <div class="row justify-content-md-center mt-5">
      <div class="col-md-8">
        <h1>Добро пожаловать в мем гейм</h1>
      </div>
    </div>
    <div class="row justify-content-md-center mt-5">
      <div class="col-md-8">
        <h3>Введите имя игрока</h3>
      </div>
    </div>
    <div class="row justify-content-md-center mt-5">
      <div class="col-md-5">
        <div class="input-group">
          <span class="input-group-text" id="basic-addon1">@</span>
          <input
            type="text"
            class="form-control"
            placeholder="Имя игрока"
            v-model="username"
          />
        </div>
      </div>
    </div>
    <div class="row justify-content-md-center mt-5">
      <div class="col-md-2 align-self-center">
        <button type="button" class="btn btn-warning" :disabled='btnDisabled' @click="onContineClick" style="width:100%">Продолжить</button>
      </div>
    </div>
  </div>
  
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "UsernameInput",
  data() {
    return {
      username: "" as String,
    };
  },
  computed: {
      btnDisabled() {
          return this.username === ''
      }
  },
  methods: {
      onContineClick() {
          this.$store.dispatch('updateUsername', this.username);
          this.$router.push({name: 'RoomsList'});
      }
  }
});
</script>

<style>
.username-input-block h1 {
  text-align: center;
}
.username-input-block h3 {
  text-align: center;
}
</style>