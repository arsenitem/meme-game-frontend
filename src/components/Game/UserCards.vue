<template>
  <div class="col">
      <div class="preview-mem" v-if="preview">
         <img :src="preview" height="400" width="400">
     </div>
      <template v-for="card in cards" :key="card.ups">
         <div class="card ms-3 meme-card" style="width:100px;height:160px">
            <img :src="card.url" height="160" width="100" @mouseover="show(card)" @mouseleave="clear">
         </div>
      </template>
     
  </div>
</template>

<script lang='ts'>
import {defineComponent} from 'vue';
export default defineComponent({
    data() {
        return {
            cards: [],
            preview: ''
        }
    },
    computed:{
        
    },
    mounted() {
        // axios.get('https://meme-api.herokuapp.com/gimme/10').then(({data}) => {
        //     console.log(data)
        //     this.cards = data.memes
        // })
    },
    methods: {
        show(card: any) {
            this.preview = card.url
        },
        clear() {
             this.preview =''
        }
    }

});
</script>

<style>
    .meme-card {
        display: inline-block;
    }
    .preview-mem {
        position: absolute;
        margin-top: -300px;
        margin-left: 300px;
        z-index: 100;
    }
</style>