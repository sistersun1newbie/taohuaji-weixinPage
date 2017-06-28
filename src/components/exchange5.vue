<template>
	<div style="margin-top: 50px;background-color: #FBF9FE;" :style="style1">
		<div style="height: 1px;">&nbsp;</div>
		<button-tab style="margin: 0 10px 5px;">
			<button-tab-item v-for="item in cards" @click.native="index=item.index" :selected='index==item.index'>{{item.text}}</button-tab-item>
		</button-tab>


		<div v-show="index==0" style="padding: 8px; margin-bottom: 50px;">
			<div v-show="cardsObj0.length==0" style="text-align: center;padding: 10px;">
					暂无卡片
			</div>
			<div class='mycard' @click="to(item,'detail')" :style="imgstyle(item.cardTypeCode==1?backimg1:backimg2)"   v-for="(item,index) in cardsObj0">
				<div style="height: 35px;color: white;line-height: 35px;;padding-left: 8px;">
					{{item.cardTypeCode==1?'实体卡':'电子卡'}}-{{item.cardType}}
				</div>
				<div class="mycard-item">
					<div style="width: 30%;min-width: 140px;" class="img">
						<img @error="$event.target.src=onCardError"  :src="$store.state.imgpath+item.pictureUrl" style="width: 100%;max-height: 100px; " />
					</div>
					<div class="miaosu">
						<div style="color:black;font-size: 13px;position: relative;">
							<!--<img   :src="biaoshi1" style="position: absolute;width:80px; right:0px;top: -50px;" />-->
							<p style="font-size: 17px;">{{item.packageName}}</p>
							<p>(剩余{{item.availableCount}}盒)</p>
							<p>有效期：{{item.startTime&&item.startTime.substring(0,10)}}-{{item.endTime&&item.endTime.substring(0,10)}}</p>
							<p>卡号：{{item.cardCode}}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		

		<div v-show="index==2" style="padding: 8px; margin-bottom: 50px;">
			 <div v-show="cardsObj2.length==0" style="text-align: center;padding: 10px;">
					暂无卡片
			</div>
			<div class='mycard' @click="to(item,'detailhis')" :style="imgstyle(item.cardTypeCode==1?backimg1:backimg2)"   v-for="(item,index) in cardsObj2">
				<div style="height: 35px;color: white;line-height: 35px;;padding-left: 8px;">
					{{item.cardTypeCode==1?'实体卡':'电子卡'}}-{{item.cardType}}
				</div>
				<div class="mycard-item">
					<div style="width: 30%;min-width: 140px;" class="img">
						<img @error="$event.target.src=onCardError"  :src="$store.state.imgpath+item.pictureUrl" style="width: 100%;max-height: 100px; " />
					</div>
					<div class="miaosu">
						<div style="color:black;font-size: 13px;position: relative;">
							<!--<img   :src="biaoshi1" style="position: absolute;width:80px; right:0px;top: -50px;" />-->
							<p style="font-size: 17px;">{{item.packageName}}</p>
							<p>(剩余{{item.availableCount}}盒)</p>
							<p>有效期：{{item.startTime&&item.startTime.substring(0,10)}}-{{item.endTime&&item.endTime.substring(0,10)}}</p>
							<p>卡号：{{item.cardCode}}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		
	</div>
	</div>
</template>
<style lang="less" scoped>
	.mycard {
		/*box-shadow: 0px 1px 5px rgba(0, 0, 0, .5);*/
		margin-bottom: 8px;
	}
	
	.mycard-item {
		display: flex;
		align-items: center;
		justify-content: space-around;
		padding: 7px;
		padding-bottom: 30px;
		padding-left: 10px;
		.miaosu {
			display: flex;
			flex-direction: column;
			width: 60%;
			padding-left: 12px;
		}
		.img {
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>
<script>
	import { Cell, XInput, Group, XButton, ButtonTab, ButtonTabItem } from 'vux'

	import goodsimg from '../assets/taohuaji_02.png'
	import backimg1 from '../assets/kaquan4_01.png'
	import backimg2 from '../assets/kaquan6.png'
	import backimg3 from '../assets/shixiao.png'
	import backimg4 from '../assets/kaquans_17_19.png'

	import biaoshi1 from '../assets/weishiyong.png'
	import biaoshi2 from '../assets/yishiyong.png'
	import biaoshi3 from '../assets/shixiaoy.png'
	import biaoshi4 from '../assets/zengsong.png'
	
	import onerror from '../assets/error.png'
	import onCardError from '../assets/error.jpg'
	export default {
		name: 'exchange',
		data() {
			return {
				index: 0,
				onerror:onerror,
				onCardError:onCardError,
				backimg1:backimg1,
				backimg2:backimg2,
				temp:  false,
				style1: {
					'height': global.windowHeight - 102 + 'px'
				},
				style2: {},
				cardsObj0: [],
				cardsObj2: [],
				cards: [{
						text: '兑换中',
						index: 0,
						type: 'unuse',
					},
					{
						text: '已兑换',
						index: 2,
						type: 'used',
					},
				]
			}
		},
		mounted() {
		 
			this.getlist()
			this.getlist2()
		},
		beforeRouteLeave(to, from, next) {
			next()
		},
		methods: {
			bind() {

			},
			to(item,ajaxflag){
				this.$store.commit({
					type: 'updateoperationflag',
					operationflag: false,
				})
				this.$store.commit({
					type: 'updatecardobj',
					obj: item
				})
				
				this.$store.commit({
					type: 'updateexchangeflag',
					exchangeflag: ajaxflag
				})
				
				this.$router.push({name:'exchange4',params:{operationflag:false,card:item}})
			},
			getlist(){
				 this.ajax.QUERY_CARDUSING({data:{ openId: this.$store.state.openid },showMsg:false}).then((res) => {
				 	this.cardsObj0=res.data.obj||[];
				}).catch(msg => {
	
				})
				
			},
			getlist2(){
				 this.ajax.QUERY_CARDCONVER({data:{ openId: this.$store.state.openid },showMsg:false}).then((res) => {
				 	this.cardsObj2=res.data.obj||[];
				}).catch(msg => {
	
				})
				
			},
			imgstyle: function(item) {
				return {
					'background-image': 'url(' + item + ')',
					'background-size': ' 100% 100%',
					'background-position': ' center center'
				}
			},
		},
		computed: {
			//			imgstyle: function(item) {
			//				return {'background-image':'url('+item+')'}
			//			},
		},
		components: {
			Cell,
			XInput,
			Group,
			XButton,
			ButtonTab,
			ButtonTabItem
		},

	}
</script>