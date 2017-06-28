<template>
	<div style=" padding-top: 12px " >
		<button-tab style="margin: 0px 10px 10px;">
			<button-tab-item @click.native="index=item.index" :selected="index === item.index" v-for="item in list2">{{item.name}} </button-tab-item>
		</button-tab>
		<div v-show="list.length==0" style="text-align: center;background: white;padding: 10px;">
			暂无订单
		</div>
		<div class="dingdan" v-for="(item,index) in list" style="">
			<div style="padding: 5px 5px 0 5px;display: block;width: 100%;height: 15px; font-size: 13px;">
				<span style="display: inline-block;float: left; position: relative;">订单编号：{{item.orderNo}}</span>
			</div>
			<div class="mydingdan" style="margin-top:8px;background-color: #f5f5f5;" @click="addevaluate('historyDetail',item)">
				<div style="width: 25% ;"  >
					<img @error="$event.target.src=onerror"  :src="$store.state.imgpath+item.pictureUrl" width="100%" />
				</div>
				<div style="width: 25% ;" >
					<img @error="$event.target.src=onerror"  :src="$store.state.imgpath+item.packagePicture" width="100%" />
				</div>
				
				<div style="width: 25% ;">
					<img width="100%" @error="$event.target.src=onerror"  :src="biaoshi[item.status-1]" style="" />
				</div>
			</div>

			<div class="btn vux-1px-b">
				<div class="xia vux-1px-b" style="padding-bottom:5px; ">
					<span style="display: inline-block;position: relative;right: 0;">共{{item.cardCount}}件商品,实付款￥{{item.totalPrice}}</span>
				</div>

				<div  style="padding-top:8px;line-height:20px">
					<!--{{item.status==3}}{{item.cardTypeCode==1}}-->
					<span class="mbtn2 "  v-show="item.status==6"  @click.stop='getcard(item)'>领取到卡包</span>
					<span class="mbtn2 "  v-show="item.status==7||item.status==4||item.status==1"  @click.stop='remove(item)'> 删除</span>
					
					<span class="mbtn1 "  v-show="item.status==4||item.status==7"  @click.stop='addevaluate("evaluate",item)'> 评价晒单</span>
					<span class="mbtn1 " v-show="item.status==3"  @click.stop='receive(item)'> 确认收货</span>
					<!--<span class="mbtn1 " v-show="item.status==3 "  @click.stop='judge(item)'> {{item.cardTypeCode==1?'确认收货':'领取到卡包'}}</span>-->
					
				</div>
			</div>
		</div>

	</div>
</template>
<style lang='less'>
	.dingdan {
		box-shadow: 0px 1px 5px rgba(0, 0, 0, .5);
		margin: 8px 5px;
		.btn {
			text-align: right;
			font-size: 13px;
			padding: 10px
		}
		.mbtn1 {
			border: 1px solid #EC748A;
			border-radius: 5px;
			background: #EC748A;
			color: aliceblue;
			font-size: 15px;
			padding: 4px 12px;
			margin-left: 5px;
		}
		.mbtn2 {
			border: 1px solid #EC748A;
			border-radius: 5px;
			background: #FFFFFF;
			color: #333;
			font-size: 15px;
			padding: 4px 12px;
			margin-left: 5px;
		}
	}
	
	.mydingdan {
		display: flex;
		align-items: center;
		padding: 8px 5px;
		font-size: 13px;
		justify-content: space-around;
		.detail {
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
		.xia {
			height: 30px;
			line-height: 30px;
			font-size: 12px;
		}
	}
</style>
<img src="../assets/yishouhuo.png" />
<script>
	import { XButton, Scroller, ButtonTab, ButtonTabItem } from 'vux'
	import onerror from '../assets/error.png'


	import biaoshi1 from '../assets/daifukuan.png'//待付款
	import biaoshi2 from '../assets/yifukuan.png'//已付款
	import biaoshi3 from '../assets/yifahuo.png'//已发货
	import biaoshi4 from '../assets/yishouhuo.png'//已收货
	import biaoshi6 from '../assets/paysuccess.png'//交易成功
	export default {
		data() {
			return {
				onerror:onerror,
				biaoshi:[biaoshi1,biaoshi2,biaoshi3,biaoshi4,onerror,biaoshi6,biaoshi6],
				//状态  2.已付款
				//实体卡  1.未付款  6.未领取  7.已领取
				//电子卡  2.已付款 3.已发货  4.已收货
				userHistory: true,
				index: 0,
				list2: [{
						name: '待付款',
						index: 0,
					},
					{
						name: '已付款',
						index: 1,
					},
				],
				historylist2: [],
			}
		},
		mounted() {
			this.query()
			 
		},
		methods: {
			 getcard(item){
			 	this.ajax.UPDATE_CARDTOPACKAGE({ data: { userId: this.$store.state.openid ,orderId:item.orderId} }).then((res) => {
			 		 this.$wechat.addCard({
						cardList:  res.data.obj,
						success: function (res1) {
							
						},
						cancel: function (res) {
							this.log(JSON.stringify(res))
						}
					});
			 		
			 		
			 		
				}).catch(msg => {
					this.log(msg)
				})
			 },
			addevaluate(name,item){
				this.$store.commit({
				  type: 'updatedingdanobj',
				  dingdanobj: item
				})
				this.$router.push({name:name,params:{orderId:item.orderId,cardProductId:item.cardPictureId}})
			},
			remove(item) {
				let self = this
				this.$vux.confirm.show({
					contacts: '提醒',
					content: '确定要删除吗？',
					onCancel() {},
					onConfirm() {
						if(item.status==4||item.status==7){
							self.log(item.status)
							self.ajax.DELETE_CARDORDERDETAIL({data:{
								orderId: item.orderId,
							}}).then((res) => {
								self.historylist2=self.historylist2.filter((item1)=>{
										return item1.orderId!==item.orderId;
									})
							}).catch(msg => {
								
							})
						}else if(item.status==1){
							self.log(item.status)
							self.ajax.DELETE_CARDORDERUNPAY({data:{
								orderId: item.orderId,
							}}).then((res) => {
								self.historylist2=self.historylist2.filter((item1)=>{
									return item1.orderId!==item.orderId;
								})
							}).catch(msg => {
								
							})
						}
						
					}
				})
			},
			judge(item){
				if(item.cardTypeCode==1){
					this.receive(item)
				}else{
					this.getcard(item)
				}

			},
			receive(item){
				this.ajax.ADD_CARDORDERDELIVERY({ data: { userId: this.$store.state.openid ,orderId:item.orderId} }).then((res) => {
					this.log(res.data.obj)
					item.status=4
				}).catch(msg => {
					this.log(msg)
				})
			},
			query() {
				this.ajax.QUERY_CARDORDER({ data: { userId: this.$store.state.openid }, showMsg: false }).then((res) => {
					this.log(res.data.obj)
					this.historylist2=res.data.obj
				}).catch(msg => {
					this.log(msg)
				})
			},
		},
		computed: {
			list: function() {
			
				return 	this.historylist2.filter((item)=>{
					if(this.index==0){
						return item.status==1;
					}else{
						return item.status!=1;
					}
				})
			},
		},
		components: {
			XButton,
			Scroller,
			ButtonTab,
			ButtonTabItem
		},

	}
</script>