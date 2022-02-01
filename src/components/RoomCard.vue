<template>
     <div class="card text-dark bg-light mb-2 mt-5" style="max-width: 40rem;">
        <div class="card-header">{{room.name}}</div>
        <div class="card-body">
            <button class="btn btn-primary" @click="onJoinClick">Присоедениться</button>
        </div>
    </div>
</template>

<script lang='ts'>
import {defineComponent, PropType } from 'vue';

interface IroomItem {
  name: string,
  id: number,
}

export default defineComponent({
    props: {
        room: {
            type: Object as PropType<IroomItem>,
            required: true,
        },
    },
    methods: {
        onJoinClick() {
            console.log(this.room.id)
            this.$router.push({name: 'Room', params: {id: this.room.id}})
        }
    }
});
</script>

<style>

</style>