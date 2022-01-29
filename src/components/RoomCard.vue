<template>
     <div class="card text-dark bg-light mb-2 mt-5" style="max-width: 40rem;">
        <div class="card-header">{{roomName}}</div>
        <div class="card-body">
            <button class="btn btn-primary">Присоедениться</button>
        </div>
    </div>
</template>

<script>
import {defineComponent} from 'vue';
export default defineComponent({
    props: {
        roomName: String,
    }
});
</script>

<style>

</style>