<template>
  <div>
      <div class="row" style="height:70vh">
          <div class="col" style="border:2px solid">
              
          </div>
           <div class="col-md-3">
               <players-list/>
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
    components: {
        UserCards,
        PlayersList
    }

});
</script>

<style>

</style>