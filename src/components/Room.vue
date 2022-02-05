<template>
     <div class="container">
         <div class="row justify-content-center">
                <div class="card mt-5" style="max-width: 60rem;">
                    <div class="row">
                        <div class="col">
                            Какие-то настройки
                        </div>
                        <div class="col md-5">
                            Список игроков
                        </div>
                    </div>
                    <div class="row">
                        <button class="btn btn-primary" @click="onJoinClick">Начать игру</button>
                    </div>
                </div>
         </div>
      
    </div>
</template>

<script lang='ts'>
import {defineComponent} from 'vue';
export default defineComponent({
    computed: {
        roomId() {
            return this.$route.params.id;
        }
    }

});
</script>

<style>

</style>