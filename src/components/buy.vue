<template>
	<!---->
	<div style=""  >
		<div :style="divbuy" id="buy">
			<div style="text-align: center;">
				<img width="94%" @error="$event.target.src=onerror" :src="$store.state.imgpath+mainpage" />
			</div>
			<div class="buymaindiv">
				<group>
					<cell class="imgcall"  v-if="kamianlist.length!=0" title="选 择 卡 面 " @click.native='$router.push({name:"yaoyiyao"})'>
						<img @error="$event.target.src=onerror" slot="icon" width="40" src="../assets/taohuajis_29.png">
					</cell>
				
					<div class="imgdiv" v-for="item in kamianlist ">	
						<img @error="$event.target.src=onerror"  width="100%" :src="$store.state.imgpath+item.pictureUrl" @click="chooseCard(item,'kamianlist','temp1')" :style="item.cardPictureId==temp1.cardPictureId?chooseStyle1:''" />
					</div>
					<div style="clear: both;">
						<div v-if="combo1.length!=0">
							<cell title="选 择 套 餐" class="imgcall">
								<img @error="$event.target.src=onerror" slot="icon" width="40" src="../assets/taohuajis_29.png">
							</cell>
							<!--<scroller lock-y :scrollbar-x=false>
								<div style="position: relative;" :style="glwidth1">
									<div class="rowImg" @click="chooseBuyType(item,'combo1','temp2')" :style="item.packageId==temp2.packageId?chooseStyle:glwidth" style=" text-align: center;display:inline-block;margin:5px 0px 5px 6px;" v-for="item in combo1">
										<img @error="$event.target.src=onerror" width="100%" :src="$store.state.imgpath+item.packagePicture" />
										<div>
											<p><span>{{item.packageName}}</span></p>
											<p><span>¥</span><span>{{item.packagePrice}}</span></p>
										</div>
									</div>
								</div>
							</scroller>-->
							<div  class="swipinmg">
								<div class="rowImg"  v-for="item in combo1" @click="chooseBuyType(item,'combo1','temp2')" :style="item.packageId==temp2.packageId?chooseStyle:glwidth" style=""   >
									<img @error="$event.target.src=onerror" width="100%" :src="$store.state.imgpath+item.packagePicture" />
									<div>
										<p><span>{{item.packageName}}</span></p>
										<p><span>¥</span><span>{{item.packagePrice}}</span></p>
									</div>
								</div>
							</div>
						</div>
						<div v-if="box1.length!=0" style="clear: both;">
							<cell title="选择礼盒" class="imgcall">
								<img @error="$event.target.src=onerror" slot="icon" width="40" style="" src="../assets/taohuajis_29.png">
							</cell>
	
							<div v-for="(item,index) in box1 " class="rowImg" @click="chooseBuyType(item,'box1','temp3')" style="width:30%;margin:5px 0px 5px 5px; " :style="item.giftBoxId==temp3.giftBoxId?chooseStyle1:''">
								<img @error="$event.target.src=onerror" width="100%" :src="$store.state.imgpath+item.boxPicture" />
								<div>
									<p><span>{{item.boxName}}</span></p>
									<p><span>￥</span><span>{{item.boxPrice}}</span></p>
								</div>
							</div>
						</div>
						<x-number style="font-size: 14px;clear: both;" title="购买数量" :min="1" v-model="amount"></x-number>
					</div>
				</group>
	
				<div class="item">
					<p>购买须知：<span @click="$router.push({name:'description'})">点击查看购买须知</span></p>
				</div>
				<div class="item">
					<p>线下兑换：<span @click="$router.push({name:'neighborStore'})">查看全部门店</span></p>
				</div>
				<div class="item">
					<p>生产商：</p>
					<p>山东东阿阿胶保健品有限公司</p>
				</div>
				<div class="item">
					<p>有效期：</p>
					<p>{{sjobj}}</p>
				</div>
				<div v-show="$store.state.productid.cardTypeCode==1||switchflag==true">
					<div @click="$router.push({name:'managerAddress'})"  v-show="item.detailAddress=='undefined'||item.detailAddress==null" style="color: red;padding:15px 0px;font-size: 15px;text-align: center;">
						暂无绑定地址
					</div>
					<cell v-show="!(item.detailAddress=='undefined'||item.detailAddress==null)" style="font-size: 15px;" title="收件地址：" :inline-desc="item.detailAddress" @click.native="$router.push({name:'managerAddress'})" is-link>
						<div slot="child" style="font-size: 13px;left: 30%;top: 10px;position: absolute;">{{item.contacts+'('+item.phone+')'}}</div>
					</cell>
				</div>
				
				<x-switch title="是否需要发票" v-model="switchflag"></x-switch>
				<cell v-show="switchflag==true" style="font-size: 14px;" title="发票抬头" :inline-desc="item.detail" @click.native="$router.push({name:'managerInvoice'})"  >
					<div slot="child" class="callchild">
					 <span>
							 	{{item2.invoiceHeadType}} &nbsp;&nbsp;&nbsp;   {{item2.invoiceHeadType=='个人'?'':item2.invoiceHead}}
							 
							 </span>
						 
					</div>
				 
				</cell>
				<cell style="font-size: 14px;" title="已选择" :inline-desc="description " @click.native="showpopup=true" is-link>
				</cell>
				<!--<div style="height: 50px;">
					&nbsp;
				</div>-->
			</div>
		</div>
		<div class="buyflexbutton">
			<div style="">
				<p style="">
					合计：
					<span style="color: red;">¥{{allMoney}}</span>
				</p>
			</div>
			<x-button class="buybottombutton" @click.native="suitDetail()"  :style="submitFlag?{}:{'background-color':' #E4393C'}" :show-loading="submitFlag" :disabled='submitFlag' type="undefind">提交订单</x-button>
		</div>
	</div>
</template>
<style lang="less" scoped >
.swipinmg{
	display: flex;
	overflow-x: auto;
	flex-shrink: 0;
	 flex-wrap: nowrap;
	 width: 100%;
}
	.rowImg {
		/*min-width: ;*/
		 text-align: center;margin:5px 0px 5px 6px; 
		position: relative;
		border-radius: 7px;
		border: 1px solid #fff;
		float: left;
		img {
			border-radius: 7px 7px 0px 0px;
		}
		>div {
			background-color: #fbe7e8;
			border-radius: 0px 0px 7px 7px;
			color: #91393f;
			text-align: center;
			margin-top: -7px;
			p:first-child {
				span {
					margin: 0 auto;
					font-size: 12px;
					color: black;
				}
			}
			p:nth-child(2) {
				font-size: 16px;
				color: red;
				span:nth-child(2) {
					font-weight: 600;
				}
			}
		}
	}

	.buymaindiv {
		/*margin-bottom: 44px;*/
		/*call*/
		.item {
			width: 90%;
			padding-left: 10px;
			margin: 8px 5px;
			p:first-child {
				font-size: 15px;
			}
			p:nth-child(2) {
				margin-left: 18px;
				font-size: 13px;
			}
			p {
				span {
					margin-left: 18px;
					font-size: 15px;
					color: cadetblue;
				}
			}
		}
		.imgdiv {
			margin: 0 1%;
			img {
				border-radius: 7px;
				opacity: 0.5;
				border: 1px solid #fff;
				width: 30%;
				float: left;
				margin: 10px 1%;
			}
		}
		.imgcall {
			color: #f93450;
			img {
				display: block;
				margin-right: 5px;
			}
		}
		/*底部div*/
		
	}
		.buyflexbutton {
			position: relative;
			bottom: 0px;
			width: 100%;
			font-size: 18px;
			background-color: white;
			div {
				float: left;
				width: 60%;
				p {
					float: left;
					margin-left: 15px;
					margin-top: 12px;
				}
			}
			>button {
				width: 40%;
				
				padding: 3px;
				font-size: 18px;
				
				float: right;
				/*background-color: #E4393C;*/
				color: #FFFFFF;
				border-radius: none;
			}
		}
	.callchild {
		top: 10px;
		width: 75%;
		span{
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
			 
		}
	}

	.weui-btn:after {
		border-radius: 0px;
	}

	.weui-btn {
		border-radius: 0px;
	}

	.weui-cells {
		margin-top: 0px;
	}
</style>
<script>
	import onerror from '../assets/error.jpg'
	import {
		XNumber,
		XButton,
		Cell,
		Group,
		Scroller,
		XSwitch
	} from 'vux'
	export default {

		name: 'buy',
		components: {
			XNumber,
			XButton,
			Cell,
			Group,
			Scroller,
			XSwitch
		},
		data() {
			return {
				submitFlag:false,
				onerror: onerror,
				switchflag:false,
				glwidth: {
					'min-width': window.windowWidth / 3-10 + 'px',
					'max-width': window.windowWidth / 3-10 + 'px',
				},
//				glwidth1: {
//					'width': (window.windowWidth / 3) * 4 + 40 + 'px'
//				},
				showpopup: false,

				item: localStorage.defaultaddress&&JSON.parse(localStorage.defaultaddress)||'',//this.$route.params.tempaddress||{},
				item2:localStorage.defaultinvoice&&JSON.parse(localStorage.defaultinvoice)||'',
				amount: 1, //数量

				chooseStyle: {
					'border': '1px solid  #ff0000',
					'opacity': '1',
					'min-width': window.windowWidth / 3 -10 + 'px',
					'max-width': window.windowWidth / 3 -10 + 'px'
				},
				divbuy:{
					'height': window.windowHeight - 44-48+ 'px',
					'overflow': 'auto',
				},
				chooseStyle1: {
					'border': '1px solid  #ff0000',
					'opacity': '1',
				},
				goods:{},
				mainpage:'',
				style: {},
				kamianlist: [],
				combo1: [],
				box1: [],
				temp1: this.$store.state.buyobj.temp1||{},//存储 选中对象
				temp2: this.$store.state.buyobj.temp2||{},
				temp3: this.$store.state.buyobj.temp3||{},
				cardProductId:'',
				sjobj:'',
				starttime:'',
			};
		},
		
		mounted() {
			let myDatastart = new Date(); 
			let timesstart = myDatastart.getTime();//当前时间的毫秒数
			this.starttime = timesstart
//			this.log("准备标识")
			this.$nextTick(()=>{
//				this.log("渲染标识")
				let myDataend = new Date(); 
				let timesend = myDataend.getTime();//当前时间的毫秒数
//				console.log("毫秒间隔 ",timesend-timesstart)
//				document.getElementById('buy').scrollTop = 400
//				this.log(document.getElementById('buy').scrollTop+"==========")
			})
			if(localStorage.switchflag=='true'){
			this.switchflag = true
			}
//			this.item = JSON.parse(localStorage.defaultaddress)||''
//			this.item2 = JSON.parse(localStorage.defaultinvoice)||''
			this.log(this.glwidth.width)
			if(this.$store.state.productid.cardThemeId){
				this.getinfo(this.$store.state.productid.cardThemeId,0)
			}else{
				this.getinfo(this.$store.state.productpid,1)
			}
		},
		beforeRouteLeave (to, from, next) {
			to.name=='mainpage'&&(this.$store.commit({
					type: 'updatebuyobj',
					temp1: {},
					temp2: {},
					temp3: {},
				}))
		    this.log(to.params)
		    to.name!=='mainpage'&&(this.$route.meta.scrollheight=document.getElementById('buy').scrollTop)
		    to.name=='mainpage'&&(this.$route.meta.scrollheight=0)
//		    console.log(this.$route.meta,"++++")
//		    this.log(document.getElementById('buy').scrollTop+"=========离开路由的高度=")
		    next()
		 },
		watch:{
			switchflag(newvalue){
				this.log(newvalue)
				localStorage.switchflag=newvalue
			},
			temp1(item,old){
				this.$store.commit({
					type: 'updatebuyobj',
					temp1: item
				})
			},
			temp2(item,old){
				this.$store.commit({
					type: 'updatebuyobj',
					temp2: item
				})
			},
			temp3(item,old){
				this.$store.commit({
					type: 'updatebuyobj',
					temp3: item
				})
			},
		},
		methods: {
			scrollerlocaltion(){
//				this.log(this.$store.state.scrollheight)
//				document.getElementById('buy').scrollTop = this.$store.state.scrollheight||0
				document.getElementById('buy').scrollTop = this.$route.meta.scrollheight||0
//				this.log(document.getElementById('buy').scrollTop+"@@@@@@@@@@")
				let myDataend = new Date(); 
				let timesend = myDataend.getTime();//当前时间的毫秒数
//				console.log("ajax请求 毫秒间隔 2",timesend-this.starttime)
			},
			getinfo(param,param2) {
				this.ajax.QUERY_PROINFO({ data: { cardThemeId: param ,idType:param2}, showMsg: false }).then((res) => {
					if(!res.data.obj) return ;
					this.goods=res.data.obj
//					this.sjobj=res.data.obj.effectTime+' '+(res.data.obj.unit=='day'?'天':(res.data.obj.unit=='month'?'月':'年'))
					this.sjobj=res.data.obj.unit
					this.cardProductId=res.data.obj.cardProductId
					this.kamianlist = res.data.obj.cardProductPictureList
					this.combo1 = res.data.obj.cardPackageList
					this.box1 = res.data.obj.giftBoxInfoList
					this.$store.commit({
					  type: 'updateproductpid',
					  productpid: res.data.obj.cardProductId
					})
					for(let i = 0; i < this.kamianlist.length; i++) {
						this.$set(this.kamianlist[i], 'flag', false)
					}
					if(this.kamianlist[0]!= undefined) {
						this.mainpage = this.kamianlist[0].pictureUrl
						if(!this.temp1.cardPictureId){
							this.temp1 = this.kamianlist[0]
						}
						
					}
					if(this.combo1[0] != undefined) {
						if(!this.temp2.packageId){
							this.temp2 = this.combo1[0]
						}
					}
					if(this.box1[0] != undefined) {
						if(!this.temp3.giftBoxId){
							this.temp3 = this.box1[0]
						}
						
					}
					setTimeout(()=>{
						this.scrollerlocaltion()
					},0)
					
					
					
				}).catch(msg => {
					this.log(msg)
				})
			},
			chooseCard(item,attr,saveparam) {
				this.chooseBuyType(item, attr,saveparam)
				this.mainpage = item.pictureUrl
			},
			chooseBuyType(item, attr, saveparam) {
				if(item.flag === true) {
					return;
				}
				this[attr] = this[attr].map((obj) => {
					obj.flag = false
					return obj
				})
				item.flag = true
				this[saveparam] = item
				
			},
			getcard(orderId) {
				let self = this;
				this.ajax.GET_CARDSIGNCFG({ data: {orderId:orderId}, showMsg: false }).then((res) => {
					 this.$wechat.addCard({
						cardList:  res.data.obj,
						success: function (res1) {
							//TODO 不知道啥意思
							self.$store.commit({
								type:'updatebuydingdanobj',
								buydingdanobj:{
									kamian:self.temp1,
									taocan:self.temp2,
									lihe:self.temp3||'',
									price:self.allMoney,
									amount:self.amount,
								},
							})
							self.$router.push({
								name: 'paySuccess',
							})
						},
						cancel: function (res) {
//							alert(JSON.stringify(res))
						}
					});
				}).catch(msg => {
					this.log(msg)
				})
			},
			showConfirm () {
		      let self = this
				this.$vux.confirm.show({
					// 组件除show外的属性
					title: '你还没有收货地址',
					content: '是否现在去设置一个收货地址?',
					onCancel() {
						
					},
					onConfirm() {
						self.$router.push({name:'managerAddress'})
					}
				})
		    },
			suitDetail() {
			 
//				console.log(this.temp1)
				let self=this
				this.submitFlag=true
				if(this.$store.state.productid.cardTypeCode==1||(this.$store.state.productid.cardTypeCode==2&&this.switchflag==true)){
					if(this.item.detailAddress=='undefined'||this.item.detailAddress==null){
						this.showConfirm()
						this.submitFlag=false
						return ;
					}
				}
				if(this.switchflag && (this.item2==null || this.item2=="")){
				 	this.$vux.toast.show({
							text: '请选择发票信息',
							position: 'bottom',
							width: 'auto',
							type: 'text'
						})
				 	this.submitFlag=false
					return;

				}

				this.ajax.ADD_CARDORDER({ data: {
					addressId:this.item.addressId||'',
					giftBoxId:this.temp3.giftBoxId,cardCount:this.amount,packageId:this.temp2.packageId,
					cardPictureId:this.temp1.cardPictureId,
					cardProductId:this.cardProductId,
					invoiceId:this.switchflag?(this.item2&&this.item2.invoiceId):'',
				}}).then((res) => {
					
//					this.log(res.data.obj)
					self.$wechat.chooseWXPay({
					    timestamp: res.data.obj.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
					    nonceStr: res.data.obj.nonceStr, // 支付签名随机串，不长于 32 位
					    package: res.data.obj.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
					    signType: res.data.obj.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
					    paySign:  res.data.obj.paySign, // 支付签名
					    success:  (res1)=> {
					        // 支付成功后的回调函数
							if(self.goods.cardTypeCode==2){
								self.getcard(res.data.obj.orderId)
								self.submitFlag=false
							}else if(self.goods.cardTypeCode==1){
								self.submitFlag=false
								self.$router.replace({
									name: 'mainpage',
								})
							}
					        
					    },
					    fail: (e)=>{
					    	alert("支付失败")
					    }
					    
					});
			
				}).catch(msg => {
					self.submitFlag=false
					this.log(msg)
				})
			}
		},
		computed: {
			glwidth1() {
//				console.log(this.combo1.length<=2,'****')
				if(this.combo1.length<=3){
					return {'width':'100%'}
				}else{
				 	return {'width': (window.windowWidth / 3) * 4 +10 + 'px'}
				}
			},
			amountMoney() {
				return this.amount * this.temp2.packagePrice
			},
			amountliheunitMoney() {
				if(this.box1.length!=0) {
					return this.amount * this.temp3.boxPrice
				} else {
					return 0
				}
			},
			allMoney() {
				return this.amountMoney + this.amountliheunitMoney || 0
			},
			description() {
				let a = (this.box1.length!=0) ? (this.temp3.boxName + 'X' + this.amount) : ' '

				return this.temp2.packageName || '' + 'X' + this.amount || '' + ' ' + a
			},
		},

	};
</script>