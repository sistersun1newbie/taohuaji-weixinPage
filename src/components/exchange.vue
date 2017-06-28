<template>
	<div style="background-color: #FBF9FE;" :style="style1">
		<div style="height: 1px;">&nbsp;</div>
		<div style="padding: 8px; ">
			<!--:style="imgstyle(item.backimg)"-->
			<div v-show="cardsObj0.length==0" style="text-align: center;padding: 10px;">
				暂无卡片
			</div>
			<div class='mycard' @click="to(item)" :style="imgstyle(item.cardTypeCode==1?backimg1:backimg2)" v-for="item in cardsObj0">
				<div style="font-size: 13px;position: relative;line-height: 25px;">
					<img :src="item.status==4?biaoshi3:(item.getFlag==0?biaoshi1:biaoshi2)" style="position: absolute;width:80px; right:0px;top: 0px;" />
				</div>
				<!--item.status==4 已使用   item.getFlag==0  未领取   item.getFlag==1  已领取-->
				<div style="height:15px;color: white;line-height: 35px;;padding-left: 8px;text-align: center;">
				<!--{{item.cardTypeCode==1?'实体卡':'电子卡'}}-{{item.cardType}}-->
				</div>
				<div class="mycard-item">
					<div style="width: 20%;min-width: 100px;" class="img">
						<!--<img @error="$event.target.src=onerror"  :src="item.pictureUrl" style="width: 100%;max-height: 100px; " />-->
						<img @error="$event.target.src=onerror" :src="$store.state.imgpath+item.pictureUrl" style="width: 100%; " />
					</div>

					<div class="miaosu">
						<div style="font-size: 13px;position: relative;line-height: 25px;">
							<p style="font-size: 18px;">{{item.cardTypeCode==1?'实体卡':'电子卡'}}-{{item.cardType}}</p>
							<p style="">{{item.packageName}}</p>
							<p>(剩余{{item.availableCount}}盒)</p>
						</div>
					</div>

					<div class="" style="width: 30%;">
						<div style="font-size: 13px;position: relative;line-height: 25px;">
						</div>
					</div>

				</div>
				<div style="height: 15px;color: white;line-height: 35px;;padding-left: 8px;padding-bottom: 5px;">
					<span style="text-align: left;font-size: 13px;" v-show="item.getFlag==1">卡号：{{item.cardCode}}</span>
				</div>
				<div style="height: 35px;color: white;line-height: 35px;;padding-left: 8px;padding-bottom: 5px;">
					<span style="text-align: left;font-size: 13px;">有效期：{{item.endTime&&item.endTime.substring(0,10)}}</span>
					<span class="mbtn2" style="float: right;" @click.stop='updatecard(item)'>{{item.getFlag==0?'领取到卡包':'点击使用>>'}}</span>
					<!--领取到卡包-->
					<!--<span class="mbtn1 " @click.stop='addevaluate("evaluate",item)'>评价晒单</span>-->
					<!--<span style="float: right;color: red;">点击使用>></span>-->
				</div>
			</div>
			<hr style="text-align: center;margin: 55px auto 15px;" width="90%" color="#ddd" SIZE=1/>
			<p @click="tohistory()" style="text-align: center;font-size: 13px;color: #888888;margin-bottom: 20px;">查看历史</p>
		</div>
		<div style="height: 50px;">
			&nbsp;
		</div>
	</div>
</template>
<style lang="less"  scoped>
	.mbtn2 {
		border: 1px solid #EC748A;
		border-radius: 5px;
		background: #FFFFFF;
		color: #333;
		font-size: 13px;
		margin-right: 3px;
		padding: 0px 9px;
	}
	.mycard {
		/*box-shadow: 0px 1px 5px rgba(0, 0, 0, .5);*/
		margin-bottom: 8px;
	}
	
	.mycard-item {
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: space-around;
		padding: 7px;
		padding-left: 10px;
		.miaosu {
			color: white;
			display: flex;
			flex-direction: column;
			width: 60%;
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
	import onerror from '../assets/error.jpg'
	import goodsimg from '../assets/taohuaji_02.png'
	import backimg1 from '../assets/kaquan4_01.png'
	import backimg2 from '../assets/kaquan6.png'
//yishiyong2
	import biaoshi1 from '../assets/weishiyong.png'
//	import biaoshi2 from '../assets/yishiyong.png'
	import biaoshi2 from '../assets/yishiyong2.png'
	import biaoshi3 from '../assets/yishiyong1.png'
	export default {
		name: 'exchange',
		data() {
			return {
				index: 0,
				style1: {
					//					'height': global.windowHeight - 102 + 'px'
				},
				goodsimg: goodsimg,
				backimg1: backimg1,
				backimg2: backimg2,
				onerror: onerror,
				biaoshi1: biaoshi1,
				biaoshi2:biaoshi2,
				biaoshi3:biaoshi3,
				cardsObj0: [],
			}
		},
		mounted() {
			this.getlist()
			this.$store.commit({
				type: 'updateoperationflag',
				operationflag: true,
			})
		},
		beforeRouteLeave(to, from, next) {
			next()
		},
		methods: {
			updatecard(item){
				if(item.getFlag!==0){
					this.to(item)
//					this.$wechat.openCard({
//					    cardList: [{
//					        cardId: item.cardId,
//					        code: item.cardCode
//					    }]// 需要打开的卡券列表
//					});
				}else if(item.status==4){
					this.to(item)
				}else{
					this.ajax.UPDATE_CARDTOPACKAGEBYCARDID({ data: { cardId: item.cardId }}).then((res) => {
						this.$wechat.addCard({
							cardList:  res.data.obj,
							success: function (res1) {
								
							},
							cancel: function (res) {
								 
							}
						});
					}).catch(msg => {
						this.log(msg)
					})
				}
				
			},
			getlist() {
				this.ajax.QUERY_RECORD({ data: { openId: this.$store.state.openid }, showMsg: false }).then((res) => {
					this.cardsObj0 = res.data.obj || [];
					this.log(this.cardsObj0)
				}).catch(msg => {
					this.log(msg)
				})
			},
			tohistory() {
				this.$store.commit({
					type: 'updatebuydingdanobj',
					buydingdanobj: false
				})
				this.$router.push({ name: 'mycard', params: { id: 1, type: 'used', titlename: '历史列表' } })
			},
			imgstyle(item) {
				return {
					'background-image': 'url(' + item + ')',
					'background-size': ' 100% 100%',
					'background-position': ' center center'
				}
			},
			to(item) {
				if(item.status==3&&item.getFlag==0){
					return ;
				}
				//提交 产品id  pid  跳转到  buy页面 同时 清除 主题id
				this.$store.commit({
					type: 'updateproductpid',
					productpid: item.cardProductId,
				})
				this.$store.commit({
					type: 'updateproductid',
					productid: '',
				})
				//操作按钮
//				this.$store.commit({
//					type: 'updateoperationflag',
//					operationflag: true,
//				})

				this.$store.commit({
					type: 'updatecardobj',
					obj: item
				})
				this.$store.commit({
					type: 'updatebuydingdanobj',
					buydingdanobj: true
				})
				this.$router.push({ name: 'exchange4', params: { operationflag: true } })
			}
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