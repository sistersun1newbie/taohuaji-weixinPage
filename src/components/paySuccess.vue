<template>
	<div style="padding-bottom: 10px;">
		<div style="width: 100%;">
			<img @error="$event.target.src=onerror" :src="$store.state.imgpath+(objinfo&&objinfo.kamian&&objinfo.kamian.pictureUrl)"  width="100%" @click="" />
			<div class="paycard" >
				<div class="item" >
					<img @error="$event.target.src=onerror" :src="$store.state.imgpath+(objinfo&&objinfo.taocan&&objinfo.taocan.packagePicture)" width="100%" />
				</div>
				<div class="item" >
					<p style="">{{objinfo&&objinfo.taocan&&objinfo.taocan.packageName||''}}</p>
				</div>
				<div class="item" >
					<p style="">¥{{objinfo&&objinfo.taocan&&objinfo.taocan.packagePrice||0}}</p>
					<p >x {{objinfo&&objinfo.amount||1}}</p>
				</div>
			</div>
			<div class="paycard" v-show="objinfo&&objinfo.lihe&&objinfo.lihe.boxPicture" >
				<div class="item" >
					<img @error="$event.target.src=onerror" :src="$store.state.imgpath+(objinfo&&objinfo.lihe&&objinfo.lihe.boxPicture)" width="100%" />
				</div>
				<div class="item" >
					<p style="">{{objinfo&&objinfo.lihe&&objinfo.lihe.boxName||''}}</p>
				</div>
				<div class="item" >
					<p style="">¥{{objinfo&&objinfo.lihe&&objinfo.lihe.boxPrice||0}}</p>
					<p >x {{objinfo&&objinfo.amount||1}}</p>
				</div>
			</div>
		</div>
		<form-preview header-label="支付成功" :header-value="'￥'+(objinfo&&objinfo.price||0)" :body-items="list"></form-preview>
		<!--<a href="javascript:" @click.stop="choose()" class="weui-form-preview__btn weui-form-preview__btn_primary">自用</a>
					<a href="javascript:" @click.stop="$router.push({name:'presenter'})" class="weui-form-preview__btn weui-form-preview__btn_primary">赠送</a>-->
		<!--<div class="weui-form-preview__ft" style="border-bottom: 1px solid #D5D5D6;">
			<a href="javascript:" style="background-color: #f4535b; color: white;" @click='giftfriend()' class="weui-form-preview__btn weui-form-preview__btn_default">送给朋友</a>
			<a href="javascript:" @click='$router.replace({ name: "exchange" })' class="weui-form-preview__btn weui-form-preview__btn_default">存入卡包</a>
		</div>-->
		<div style="position: relative;text-align: center;top: 20px;">
			<x-button  @click.native='$router.replace({ name: "exchange" })' plain type="undefind" style="margin: 20px auto;width: 80%;background-color: #f4535b; font-size: 14px;color: #FFFFFF  border: 1px solid #f4535b">进入卡包查看</x-button>
		</div>
	</div>
</template>
<style scoped lang="less">
	.paycard{
	  display: -webkit-flex; /* Safari */
 	  display: flex;
 	  div:first-child{
 	  	width: 30%;margin: 2%;
 	  }
 	  div:nth-child(2) {
 	  	width: 51%;
 	  	p{
 	  		padding: 10px 2%; font-size: 14px;
 	  	}
 	  }
 	  div:nth-child(3) {
 	 	 width: 15%;text-align: center;padding-top: 10px;
 	 	 p:first-child{
 	 	 	color: red;
 	 	 }
 	  }
	 }
</style>

<script>
	import { FormPreview, XInput, Group ,XButton} from 'vux'
	import onerror from '../assets/error.png'
	export default {
		data() {
			return {
				onerror: onerror,
				userHistory: false,
				list: [{
					label: '商品',
					value: '桃花姬'
				}, {
					label: '交易时间',
					value: '2017年3月7日20:07:07'
				}, {
					label: '交易方式',
					value: '微信付款'
				}, {
					label: '交易单号',
					value: '12312312312'
				}],
				objinfo:''
			}
		},
		mounted() {
			if(this.$route.params.flag) {
				this.flag = this.$route.params.flag
			}
			this.objinfo=this.$store.state.buydingdanobj
			this.log(this.$store.state.buydingdanobj)

		},
		methods:{
			giftfriend(){
				this.$router.replace({ name: "presenter"  })
			},
		},
	
		components: {
			FormPreview,
			XInput,
			Group,XButton
		},

	}
</script>