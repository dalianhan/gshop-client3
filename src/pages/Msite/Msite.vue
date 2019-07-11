<template>
  <div class="msite">
    <!--首页头部-->
    <Header :title="address.name || '正在定位中'">
      <a class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </a>

      <a class="header_login" slot="right">
        <span class="header_login_text">登录|注册</span>
      </a>
    </Header>


    <!--首页导航-->
    <nav class="msite_nav border-1px">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categorys, index) in categorysArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(c, index) in categorys" :key="index">
              <div class="food_container">
                <img :src="'https://fuss10.elemecdn.com' + c.image_url">
              </div>
              <span>{{c.title}}</span>
            </a>
          </div>

        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <!--首页附近商家-->
    <ShopList/>
  </div>
</template>

<script type="text/ecmascript-6">

  import { mapState } from 'vuex'
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.css'
  import ShopList from '../../components/ShopList/ShopList.vue'


  //创建对象的时机：在列表数据显示之后

  export default{
    name:'Msite',

    computed:{
      ...mapState(['address','categorys']),

      categorysArr(){
        const bigArr = []
        let smallArr = []
        const {categorys} = this

        categorys.forEach(c => {

          if(smallArr.length===0){
            bigArr.push(smallArr)
          }
          smallArr.push(c)

          if(smallArr.length===8){
            smallArr=[]
          }


        })
        return bigArr
      }
    },

    //组建界面初始显示之后立即回调
    async mounted(){
      //分发action,异步获取商家列表
      this.$store.dispatch("getShops")
      //分发action,异步获取分类列表
      /* this.$store.dispatch("getCategorys",() => {
        this.$nextTick(() => {
          new Swiper('.swiper-container', {
          //direction: 'vertical', // 垂直切换选项
            loop: true, // 循环模式选项

          // 如果需要分页器
            pagination: {
            el: '.swiper-pagination',
            }
          })
        })

      }) */

      await this.$store.dispatch("getCategorys")
      new Swiper('.swiper-container', {
      //direction: 'vertical', // 垂直切换选项
        loop: true, // 循环模式选项

      // 如果需要分页器
        pagination: {
        el: '.swiper-pagination',
        }
      })





      /* setTimeout(() => {
        var mySwiper = new Swiper('.swiper-container', {
          //direction: 'vertical', // 垂直切换选项
          loop: true, // 循环模式选项

          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination',
          }
        })
      },1000); */

    },
//解决创建swiper对象之后不能正常轮播，因为创建对象的时机太早，必须在李彪显示之后，解决：watch+nextTick
//callback+nextTick()
//利用dispatch()返回的promise
    /* watch:{
      categorys(){
        this.$nextTick(() => {
          new Swiper('.swiper-container', {
          //direction: 'vertical', // 垂直切换选项
            loop: true, // 循环模式选项

          // 如果需要分页器
            pagination: {
            el: '.swiper-pagination',
            }
          })
        })

      }
    }, */

    components : {
      ShopList
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .msite
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
</style>
