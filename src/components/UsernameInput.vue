<template>
  <div class="username-input-block">
    <div class="input-form">
      <form @submit.prevent="onContineClick">
        <div class="row justify-content-md-center">
      <div class="col-md-8">
        <h1>Добро пожаловать в игру Мемер!</h1>
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
          <input
            ref="usernameInput"
            type="text"
            class="form-control"
            placeholder="Имя игрока"
            v-model="username"
          />
        </div>
      </div>
    </div>
    <div class="row justify-content-md-center mt-5">
      <div class="col-md-3 align-self-center">
        <input type="submit" class="btn btn-warning" :disabled='btnDisabled' style="width:100%" value="Продолжить">
      </div>
    </div>
      </form>
    </div>
  </div>
  
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "UsernameInput",
  inject: ["$socket"],
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
  mounted() {
    this.$socket.on("player:created", (player: any) => {
      this.$store.commit('setUser', player);
      if (this.$route.query.id) {
        this.$socket.emit('player:join', {sessionId: this.$route.query.id});
        this.$router.push({name: 'Room', params: {id: this.$route.query.id}});
      } else {
        this.$router.push({name: 'RoomsList'});
      }
    });
    this.$refs.usernameInput.focus();
  },
  methods: {
      onContineClick() {
        this.$socket.emit('player:create', {name: this.username});
      }
  },
  unmounted() {
    this.$socket.removeListener("player:created");
  },
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
.username-input-block {
  height: 100%;
}
.username-input-block::before {
  content: '';
  position: absolute;
  opacity: 0.25;
  z-index: -1000;
  width: 100%;
  height: 100%;
  background: url('http://artismedia.by/blog/wp-content/uploads/2018/06/in-blog-2.png');
  background-size: cover;
}
.username-input-block h1 {
  text-align: center;
}
.username-input-block h3 {
  text-align: center;
}
.input-form {
  margin-top: 100px;
  position: absolute;
  width: 100%;
}
</style>