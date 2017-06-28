<template>
  <div style="">
  	<img :src="$store.state.imgpath+storeObj.localThumbnail" style="width: 100%;" @error="$event.target.src=onerror">
  	<!--<div style="padding: 20% 0px;">
  	</div>-->
  	<group>
			<!--<cell :title="storeObj.storeName" :inline-desc="storeObj.storeConstants" value="" is-link></cell>-->
			<cell   value="" >
				<div slot="icon">
					<p>{{storeObj.storeName}}</p>
					<p class="vux-label-desc" style="">联系人:{{storeObj.storeConstants}}</p>
					<p class="vux-label-desc" style="">电话:{{storeObj.storePhone}}</p>
				</div>
			</cell>
			<!--<cell title="电话" :value="storeObj.storePhone" ></cell>-->
			<a class="dis"style="color: black;" :href="`http://apis.map.qq.com/uri/v1/marker?marker=coord:${storeObj.lat},${storeObj.lng};title:${storeObj.storeName};addr:${storeObj.storeAddress}&referer=myapp`">
					<cell title="位置" :inline-desc="storeObj.storeAddress" value="" is-link></cell>
			</a>
			<cell title="我的二维码" @click.native="$router.push({name:'qrcode'})" is-link></cell>
			
		</group>
  </div>
</template>



<script>
import {  Cell, Group  } from 'vux'
import onerror from '../assets/error.png'
export default {
	 data () {
    return {
    	onerror: onerror,
    	userHistory:false,
    	 list: [],
    	 storeObj:{
    	 	title:'',
    	 	tel:'',
    	 	detail:'',
    	 }
    }
  },
  mounted () {
//	this.storeObj=JSON.parse(localStorage.storeDetail)
		this.storeObj=this.$route.params.infoobj||JSON.parse(sessionStorage.storeinfoobj)
  },
  components: {
     Cell, Group ,
  },
 
}
</script>
