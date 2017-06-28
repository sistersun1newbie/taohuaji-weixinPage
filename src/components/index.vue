<template>
	<div class=" " style=""><!--component-->
		<transition :name="classname"  >
			<router-view style="margin-bottom:14%;"></router-view>
		</transition>
		<tabbar style="position: fixed;bottom: 0px;"  >
			<tabbar-item :selected="'/'==$route.path"  link="/">
				<img slot="icon" :src="'/'!==$route.path?home:homeactivate">
				<span slot="label">首页</span>
			</tabbar-item>
			<tabbar-item :selected="'/exchange'==$route.path" link="/exchange">
				<img slot="icon" :src="'/exchange'!==$route.path?bind:bindactivate">
				<span slot="label">产品绑定</span>
			</tabbar-item>
			<tabbar-item :selected="'/mine'==$route.path"  link="/mine">
				<img slot="icon" :src="'/mine'!==$route.path?mine:mineactivate">
				<span slot="label">我的</span>
			</tabbar-item>
		</tabbar>
		<!--</div>-->
		<img src="../assets/mine.png"
	</div>
</template>

<script>
	import { Tabbar, TabbarItem } from 'vux'
	import bind from '../assets/bind.png'
	import home from '../assets/home.png'
	import mine from '../assets/mine.png'
	import bindactivate from '../assets/bindactivate.png'
	import homeactivate from '../assets/homeactivate.png'
	import mineactivate from '../assets/mineactivate.png'

	export default {
		name: 'index',
		data() {
			return {
				style: {
					// width:windowWidth+'px'
				},
				bind:bind,
				home:home,
				mine:mine,
				bindactivate:bindactivate,
				homeactivate:homeactivate,
				mineactivate:mineactivate,
				
			};
		},
		methods: {
			changeSwiper(index) {
				
			},
		},
		 computed: {
	    	  classname() {
		        return 'pop-in'
		      },
		      routername(){
		      	return this.$route.path
		      }
		  },
		components: { Tabbar, TabbarItem }
	}
</script>

<style lang="css" scoped>
	.bgimg {}
	
/*	.mycard-title {
		text-align: center;
	}*/
	/*background: url(../assets/bg_04.png) no-repeat;
		background-size: 100% 100%;
		background-position: center center;*/
		
	 
.pop-in-enter-active,
  .pop-in-leave-active,
  .pop-out-enter-active,
  .pop-out-leave-active {
     position: fixed;
    top: 0px;
    bottom: 51px; 
    width: 100%;
    background: #fbf9fe;
    transition-duration: 250ms;
    transition-timing-function: cubic-bezier(0.4, 0.6, 0.2, 1);
    -webkit-transition-property: opacity, -webkit-transform;
    transition-property: opacity, transform;
  }
  
  .pop-out-enter {
    transform: translate3d(-33%, 0, 0);
    opacity: 0.8;
    z-index: 1;
  }
  
  .pop-out-enter-to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
    z-index: 1;
  }
  
  .pop-out-leave {
    transform: translate3d(0, 0, 0);
    opacity: 1;
    z-index: 2;
  }
  
  .pop-out-leave-to {
    transform: translate3d(100%, 0, 0);
    opacity: 1;
    z-index: 2;
  }
  
  .pop-in-enter {
    transform: translate3d(100%, 0, 0);
    opacity: 1;
    z-index: 2;
  }
  
  .pop-in-enter-to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
    z-index: 2;
  }
  
  .pop-in-leave {
    transform: translate3d(0, 0, 0);
    opacity: 0.8;
    z-index: 1;
  }
  
  .pop-in-leave-to {
    transform: translate3d(-33%, 0, 0);
    opacity: 0;
    z-index: 1;
  }
  
  .pop-in-enter-active {
    box-shadow: -5px 0 3px rgba(0, 0, 0, .15);
  }
  
  .pop-out-leave-active {
    box-shadow: -5px 0 3px rgba(0, 0, 0, .15);
  }
</style>