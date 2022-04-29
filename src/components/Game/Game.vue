<template>
  <div>
      <div class="row" style="height:70vh">
          <div class="col" style="border:2px solid">
              
          </div>
           <div class="col-md-3">
               <players-list players/>
          </div>
      </div>
      <div class="row ml-4">
            <user-cards/>
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
        }
    },
    computed: {
        sessionId() {
            return this.$route.params.id;
        },
    },
    mounted() {
        console.log(this.sessionId);
        this.$socket.emit('session:getStatus', {sessionId: this.sessionId })
        console.log('must be emited')
    },
    created() {
        this.$socket.on("session:status", (session: any) => {
            this.session = session;
            console.log('status', session)
        });
    },
    unmounted() {
        this.$socket.removeListener("session:status");
    },
});
</script>

<style>

</style>