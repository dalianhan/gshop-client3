<template>
  <div id="app">
    <router-view/>
    <FooterGuide v-if="$route.meta.isShowFooter"/>
  </div>
</template>

<script type="text/ecmascript-6">

  import FooterGuide from './components/FooterGuide/FooterGuide.vue'

  export default {
    name:"app",
    data(){
      return{
        msg:'App Component'
      }
    },
    mounted(){
      this.$store.dispatch('getAddress')
    },
    components:{
      FooterGuide
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>

