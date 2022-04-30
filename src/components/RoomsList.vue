<template>
  <div>
    <div class="row">
      <div class="row justify-content-center">
        <div class="card text-dark bg-light mb-2 mt-5" style="max-width: 40rem">
          <div class="card-body">
            <div class="row justify-content-center">
              <div class="col-md-4">
                <button class="btn btn-primary" @click="onCreateRoomClick">
                  Создать комнату
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div
        class="row justify-content-center"
        v-for="room in sessions"
        :key="room.id"
      >
        <RoomCard :room="room" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RoomCard from "./RoomCard.vue";
export default defineComponent({
  inject: ["$socket"],
  data() {
    return {
      sessions: [],
    };
  },
  components: {
    RoomCard,
  },
  methods: {
    onCreateRoomClick() {
        this.$socket.emit('session:create', {name: "game"});
    },
  },
  created() {
    this.$socket.on("session:list", (sessions: any) => {
      this.sessions = sessions;
    });
    this.$socket.on("session:created", (session: any) => {
      this.$router.push({name: 'Room', params: {id: session.id}});
    });
  },
  unmounted() {
    this.$socket.removeListener("session:list");
  },
  mounted() {
    this.$socket.emit("session:getList");
  },
});
</script>

<style>
.align-left {
  margin-left: auto;
  margin-right: 0;
}
</style>
