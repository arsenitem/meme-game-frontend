<template>
     <div class="container">
         <div class="row justify-content-center">
                <div class="card mt-5" style="max-width: 60rem;">
                    <div class="row">
                        <div class="col">

                        </div>
                        <div class="col md-5">
                            Список игроков
                        </div>
                    </div>
                </div>
         </div>
      
    </div>
</template>

<script>
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