<template>
  <div style="text-align:center;">
  	<div style="background-color: #f89dae; text-align: center;padding:20px 0px 50px;color: white;font-size: 13px;">
  		<!--<img :src="$store.state.imgpath+storeObj.localThumbnail" style="width: 100%;" @error="$event.target.src=onerror">-->
			<img style="margin: 0 auto -10px;position: relative;bottom: 0px;"  @error="$event.target.src=onCardPicError" :src="$store.state.imgpath+cardobj.pictureUrl" width="60%" />
		</div>
		<p style="margin-top: 5px;">卡号:{{imgobj.cardCode}}</p>
		<div style="margin-top: 8%;">
			<!--<qrcode :value="$store.state.imgpath+imgobj.qrCode" type="img"></qrcode>-->
			<img style="margin: 0 auto -10px;position: relative;bottom: 0px;"  @error="$event.target.src=onerror" :src="$store.state.imgpath+imgobj.qrCode" width="60%" />
		</div>
		<p style="margin-top: 10%;">请将屏幕调亮进行扫描</p>
    <p style="font-size: 14px;margin-top: 10%;">微信扫一扫，奖品抽不停</p>
  </div>
</template>



<script>
import { Qrcode, Divider } from 'vux'
import onerror from '../assets/error.png'
import onCardPicError from '../assets/error.jpg'
export default {
 
  components: {
    Qrcode,
  },
   mounted () {
   	this.query(this.$store.state.card.cardId)
		this.cardobj= this.$store.state.card
		
  },
  data () {
    return {
    	onerror:onerror,
	    onCardPicError:onCardPicError,
    	imgobj:{},
    	cardobj:{}
    }
  },
  methods: {
  	query(cardid) {
  		this.ajax.QUERY_CARDQRCODE({ data: {cardId :cardid}, showMsg: false }).then((res) => {
  			this.log(res.data.obj)
  			
				this.imgobj =	res.data.obj
				this.log(this.$store.state.imgpath+this.imgobj.qrCode)
				}).catch(msg => {

				})},
  }
}
</script>
