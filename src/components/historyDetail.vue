<template>
	<div style="background-color: #f0f2f5;font-size: 13px;">
		<div style="height: 1px;">
			&nbsp;
		</div>
		<div :style="">
				<div class="textcontent">
					<p><span class="leftdesc">订单号：{{detailobj.orderNo}}</span> <span style="float: right;color: red;">{{detailobj.status==1?'待付款':(detailobj.status==2?'已付款':(detailobj.status==3?'已发货':'已收货'))}}</span></p>
				</div>
	
			<div class="textcontent">
				<p><span>{{detailobj.realName}}</span> <span style="float: right;margin-right: 30%;">{{detailobj.tel}}</span></p>
				<p><span class="contentdesc">{{detailobj.address}}</span> <span style="float: right;"></span></p>
			</div>
	
			<div style="margin: 10px auto; ">
				<div style="background-color: white;width: 100%; float: left;">
					<div style="width: 20%;float: left;margin: 2%;">
						<img @error="$event.target.src=onCardPicError" :src="$store.state.imgpath+detailobj.pictureUrl"
							 width="100%" />
						<!--packagePicture-->
					</div>
					<div style="width: 20%;float: left;margin: 2%;">
						<img @error="$event.target.src=onerror" :src="$store.state.imgpath+detailobj.packagePicture" width="100%" />
						<!--packagePicture-->
					</div>
					<div style="width: 31%;float: left;">
						<p style="padding: 10px 10px; font-size: 13px;color: #333;">{{detailobj.packageName}}</p>
					</div>
					<div style="width: 15%;float: left;text-align: center;padding-top: 10px;">
						<p style="color: red;">¥{{detailobj.cardTotalPrice}}</p>
						<p style="">x{{detailobj.cardCount}}</p>
					</div>
				</div>
				&nbsp;
			</div>
			<div v-show="detailobj.giftBoxPrice" style="margin: 10px auto; ">
				<div style="background-color: white;width: 100%; float: left;">
					<div style="width: 25%;float: left;margin: 2%;">
						<img @error="$event.target.src=onerror" :src="$store.state.imgpath+detailobj.giftBoxPrice" width="100%" />
						<!--packagePicture-->
					</div>
					<div style="width: 56%;float: left;">
						<p style="padding: 10px 10px; font-size: 13px;color: #333;"></p>
					</div>
					<div style="width: 15%;float: left;text-align: center;padding-top: 10px;">
						<p style="color: red;">¥{{detailobj.giftBoxPrice}}</p>
						<p style="">x{{detailobj.cardCount}}</p>
					</div>
				</div>
				&nbsp;
			</div>
	
			<div style="margin: 10px auto; " v-if='detailobj.giftBoxId'>
				<div style="background-color: white;width: 100%; float: left;">
					<div style="width: 25%;float: left;margin: 2%;">
						<img @error="$event.target.src=onerror" :src="$store.state.imgpath+detailobj.boxPicture" width="100%" />
						<!--boxPicture-->
					</div>
					<div style="width: 56%;float: left;">
						<p style="padding: 10px 10px; font-size: 13px;color: #333;">{{detailobj.boxName}} </p>
					</div>
					<div style="width: 15%;float: left;text-align: center;padding-top: 10px;">
						<p style="color: red;">¥{{detailobj.giftBoxPrice}}</p>
						<p style="">x{{detailobj.giftBoxPrice}}</p>
					</div>
				</div>
				&nbsp;
			</div>
	
			<div class="textcontent">
				<p><span class="leftdesc">支付方式</span> <span class="rightdesc">微信支付</span></p>
			</div>
			<div class="textcontent">
				<p><span class="leftdesc">物流单号</span> <span class="rightdesc">{{detailobj.expressCode||''}}</span></p>
			</div>
			<div class="textcontent">
				<p><span class="leftdesc">物流公司</span> <span class="rightdesc">{{detailobj.expressCompay||''}}</span></p>
			</div>
			<div class="textcontent" v-show="detailobj.invoiceHeadType">
				<p><span class="leftdesc">发票信息</span> <span class="rightdesc">{{detailobj.invoiceTypeCode=="0"?'普通发票':(detailobj.invoiceTypeCode=="paper"?'增值税发票':'')}}</span></p>
				<p><span class="contentdesc">发票抬头：{{detailobj.invoiceHeadType=="个人"?detailobj.invoiceHeadType:(detailobj.nkCardOrderInvoice?detailobj.nkCardOrderInvoice.invoiceHead:detailobj.invoiceHeadType)}}</span> <span style="float: right;margin-right: 10%;"></span></p>
				<!--<p><span class="contentdesc">发票明细</span> <span style="float: right;"></span></p>--><!--：{{detailobj.packageName + ' ' + detailobj.boxName}}-->
			</div>
			<div class="textcontent">
				<p><span class="leftdesc">商品总额</span> <span class="rightprice">￥{{detailobj.totalPrice}}</span></p>
			</div>
			<div class="textcontent">
				<p style="font-size: 16px;"><span class="leftdesc">&nbsp;</span><span class="rightprice">￥{{detailobj.totalPrice}}</span><span class="rightdesc">实付款:</span> </p>
				<p><span class="leftdesc">&nbsp;</span><span class="contentdesc" style="float: right;margin-right: 5%;">下单时间：{{detailobj.orderDate}}</span> </p>
			</div>
		</div>
		<div style="position: relative;width: 100%;border: none;font-size: 13px;">
			<button class="weui-btn butsty" style="color: #f4535b;border:1px solid #f4535b;" @click='buy(detailobj)'>{{detailobj.status==1?'购买':'再次购买'}}</button>
			<button class="weui-btn butsty" v-show="detailobj.status==4" style="color:black;border:1px solid #000;" @click.stop='$router.push({name:"evaluate"})'>评价晒单</button>
			<button class="weui-btn butsty" v-show="detailobj.status==4" style="color:black;" @click.stop="remove()">删除订单</button>
		</div>
	</div>
</template>

<style lang="less" scoped>
	.butsty {
		font-size: 13px;
		position: initial;
		margin: 5px 2%;
		float: right;
		width: 29%;
		background-color: #fff;
		outline: none;
	}
	
	.textcontent {
		padding: 5px 10px;
		background-color: white;
		margin: 10px 0px;
		font-size: 13px;
		border: 1px solid #ddd;
		border-radius: 5px;
		.p {
			margin: 5px 0px
		}
		.rightdesc {
			float: right;
			margin-right: 5%;
			font-weight: 600;
		}
		.rightprice {
			float: right;
			margin-right: 5%;
			color: red;
		}
		.leftdesc {
			font-size: 14px;
		}
		.contentdesc {
			color: #666666;
		}
	}
</style>

<script>
 
	import onerror from '../assets/error.png'
	import onCardPicError from '../assets/error.jpg'
	export default {
		data() {
			return {
				onerror: onerror,
				onCardPicError: onCardPicError,
				style1: {
					'height': global.windowHeight - 102 + 'px'
				},
				detailobj: '',
			}
		},
		mounted() {
			//			console.log(this.$route.params.orderId)
			this.get()
		},
		methods: {
			to(e) {
				this.$router.push({
					name: e
				})
			},
			remove() {
				let self = this
				this.$vux.confirm.show({
					contacts: '提醒',
					content: '确定要删除吗？',
					onCancel() {},
					onConfirm() {
						self.ajax.DELETE_CARDORDERDETAIL({
							data: {
								orderId: self.$store.state.dingdanobj && self.$store.state.dingdanobj.orderId || '',
							}
						}).then((res) => {
							self.$router.back()
						}).catch(msg => {
							this.log(msg)
						})
					}
				})
			},
			get() {
				this.ajax.QUERY_CARDORDERDETAIL({
					data: {
						orderId: this.$store.state.dingdanobj && this.$store.state.dingdanobj.orderId || ''
					},
					showMsg: false
				}).then((res) => {
					this.detailobj = res.data.obj
				}).catch(msg => {
					this.log(msg)
				})
			},
			acClick(menuKey) {
				if (menuKey != 'cancel') {
					this.$router.push({
						name: menuKey
					})
				}
				this.log(menuKey)
			},
			buy(detailobj){
				if(detailobj.status==1){
					//支付
					this.paymoney()
					
				}else{
					this.$store.commit('updateproductid',{productid:this.detailobj.cardThemeId})
					this.$router.push({name:'buy'})
				}
				
			},
			paymoney(){
				let self = this
//				this.$store.state.dingdanobj.orderId 
				this.ajax.UPDATE_CARDORDERPAY({ data: {
					orderId:this.$store.state.dingdanobj.orderId ,
				}}).then((res) => {
					 this.$wechat.ready(()=>{
						 self.$wechat.chooseWXPay({
							timestamp: res.data.obj.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
							nonceStr: res.data.obj.nonceStr, // 支付签名随机串，不长于 32 位
							package: res.data.obj.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
							signType: res.data.obj.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
							paySign:  res.data.obj.paySign, // 支付签名
							success:  (res1)=> {
								// 支付成功后的回调函数
								self.showcard(res.data.obj.orderId)
							},
							 fail: (e)=>{
								 alert("支付失败")
							 }
						});

//						 WeixinJSBridge.invoke(
//							 'getBrandWCPayRequest', {
//								 "appId": res.data.obj.appId,     //公众号名称，由商户传入
//								 "timeStamp":res.data.obj.timeStamp,         //时间戳，自1970年以来的秒数
//								 "nonceStr":res.data.obj.nonceStr, //随机串
//								 "package":res.data.obj.package,
//								 "signType":"MD5",         //微信签名方式：
//								 "paySign":res.data.obj.paySign //微信签名
//							 },
//							 function(res1){
//								 if(res1.err_msg == "get_brand_wcpay_request:ok" ) { // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
//									 self.showcard(res.data.obj.orderId)
//								 }  else {
//									 alert(JSON.stringify(res1))
//								 }
//							 }
//						 );



					 })
				}).catch(msg => {
					this.log(msg)
				})
			},
			showcard(orderId){
				
				let self = this;
				this.ajax.GET_CARDSIGNCFG({ data: {orderId:orderId}, showMsg: false }).then((res) => {
					 this.$wechat.addCard({
						cardList:  res.data.obj,
						success: function (res1) {
							self.$router.back()
						},
						cancel: function (res) {
//							alert(JSON.stringify(res))
						}
					});
				}).catch(msg => {
					this.log(msg)
				})
			
			}
		},
	 
	};
</script>

