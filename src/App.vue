<template>
	<div id="app" :style="outsideStyle">
		<div v-show="$route.meta.showTitle!==false">
			
			<div class="mycard-title " :style="style1" >
				<img v-show="$route.meta.backicon!==false" src="./assets/back.png" width="25"  @click='$router.back()'/>
				<span v-show="!$route.meta.showtabitem">{{ $store.state.titlename||$route.params.titlename||$route.meta.title}}</span>
				<span   v-show="$store.state.operationflag" style="right: 25px;position: absolute;z-index: 100;" @click='opreation($route.meta&&$route.meta.operation&&$route.meta.operation.operaprop||"")' >
					{{$store.state.operationflag?($route.meta.operation&&$route.meta.operation.operationText):''}}
					<!--&&$route.meta.operation-->
					<!--||($route.params.operationflag==true||$route.params.operationflag=='true'||$route.meta.operation&&$route.meta.operation.operationflag==true)-->
				</span>
				<tab v-show="$route.meta.showtabitem" style="max-width: 50%; margin:0 auto;background-color: #ec748a;">
					<tab-item @click.native='$router.replace({ name: "buy"  })' style="color: white;" :selected="'buy'==$route.name">商品</tab-item>
					<tab-item @click.native='$router.replace({ name: "buydetail"  })' style="color: white;" :selected="'buydetail'==$route.name">详情</tab-item>
					<tab-item @click.native='$router.replace({ name: "buycomment"  })' style="color: white;" :selected="'buycomment'==$route.name">评价</tab-item>
				</tab>
			</div>
		</div>
	
		<loading v-model="isLoading"></loading>
		<transition :name="classname" >
			<router-view :style="routerflag" ></router-view>
		</transition>
		
		<div class="tabs " v-show="$route.meta.showTab"><!--暂时关闭入口-->
			<div class="tabitem" @click="$router.replace('/') " :class="'/'==$route.path?'isActive':''">
				<img slot="icon" :src="'/'!==$route.path?home:homeactivate" style="">
				<p slot="label">商城</p>
			</div>
			<div class="tabitem" @click="$router.replace({name:'exchange',params:{operationflag:true}}) " :class="'exchange'==$route.name?'isActive':''">
				<img slot="icon" :src="'exchange'!==$route.name?bind:bindactivate" style="">
				<p slot="label">兑换</p>
			</div>
			<div class="tabitem" @click="$router.replace('/mine') " :class="'/mine'==$route.path?'isActive':''">
				<img slot="icon" :src="'mine'!==$route.name?mine:mineactivate" style="">
				<p slot="label">我的</p>
			</div>
		</div>
		<div v-show="showac2">
<!--		<actionsheet v-model="showac2" :menus="menus3" show-cancel
			@on-click-menu-self='$router.push({name:"neighborStore"})'
			@on-click-menu-mail="$router.push({name:'exchange2',params:{exflag:true}})"
			></actionsheet>-->
		<actionsheet v-model="showac2" :menus="menus3" show-cancel
			@on-click-menu-mail="$router.push({name:'exchange2',params:{exflag:true}})"
			></actionsheet>
		</div>
	</div>
</template>
<!--$router.push({name:"exchange1"})-->
<script>
	import { Loading, Tab, TabItem, Tabbar ,Actionsheet} from 'vux'
	import { mapState, mapMutations } from 'vuex'
	import bind from './assets/bind.png'
	import home from './assets/home.png'
	import mine from './assets/mine.png'
	import bindactivate from './assets/bindactivate.png'
	import homeactivate from './assets/homeactivate.png'
	import mineactivate from './assets/mineactivate.png'
	export default {
		name: 'app',
		data() {
			return {
				index:null,
				lastIndex:null,
				style1: {
					'position': 'fixed',
					'top': ' 0px',
					'width': '100%',
				},
				style2: {
					'margin-top': '44px'
				},
				style3: {
//					'margin-bottom':  '50px'
				},
				outsideStyle:{
					'height': global.windowHeight -50+ 'px'
				},
				innerheight2:{
					'-webkit-overflow-scrolling': 'touch',
//					'overflow': 'auto',
//					'height': '100%'
				},
				innerheight3:{
					'height': global.windowHeight-94 + 'px'
				},
				
				bind: bind,
				home: home,
				mine: mine,
				bindactivate: bindactivate,
				homeactivate: homeactivate,
				mineactivate: mineactivate,
				showac2:false,
				 menus2: {
			        first: '新卡激活',
			        old: '老卡拉取'
			      },
			      menus3: {
//			        self: '门店兑换',
			        mail: '公司邮寄',
			         
			      },
			};
		},
		components: {
			Loading,
			Tab,
			TabItem,
			Tabbar,Actionsheet
		},
		methods:{
			onself(){
				this.$router.push({name:"neighborStore"})
			},
			ongift(){
				this.$router.push({name:"presenter"})
			},
			onmail(){
				this.$router.push({name:'exchange2',params:{cardtype:this.$store.state.card&&this.$store.state.card.cardType||''}})
			},
		},
		watch:{
			$route(newroute,oldroute){
				this.index=newroute.meta.index||null
				this.lastIndex=oldroute.meta.index||null
//				console.log("===",this.$route.meta.Auth&&this.$route.meta.Auth.length&&this.$route.meta.Auth.length!=0)
				if(this.$route.meta.Auth&&this.$route.meta.Auth.length&&this.$route.meta.Auth.length!=0||false){
					this.log(this.$route.meta.Auth.length)
					for(let i=0;i<this.$route.meta.Auth.length;i++){
						if(this.$store.state[this.$route.meta.Auth[i]]==''){
//							this.$route.replace({name:'mainpage'})
							this.log("缺失字段:"+this.$route.meta.Auth[i])
							this.$router.replace({ name: "mainpage" })
							
							return ''
						}else{
							this.log("pass")
						}
					}
				}
			},
		},
		computed: {
			...mapState([
				'direction',
				 'isLoading'
			]),
			classname() {
				if(this.index&&this.lastIndex){
					return this.index>this.lastIndex?'pop-in' : 'pop-out'
				}
				return this.direction === 'forward' ? 'pop-in' : 'pop-out'
			},
			routerflag: function() {
				
				/*$route.meta.showTab 50*/
				/*$route.meta.showTitle!==false  44*/
				
				let temp1={},temp2={}
				if(this.$route.meta.showTitle==false) {
//					return this.innerheight2 
					temp1=this.innerheight2
				} else {
					temp1={...this.style2,...this.innerheight2}
//					return {...this.style2,...this.innerheight2}
				}
				if(this.$route.meta.showTab==true){
					temp2=this.style3
				}
				return {...temp1,...temp2}
			},
		},
	 
		created() {
		
			
			this.updatedWindowSize()
			window.addEventListener('resize', this.updatedWindowSize)

		},
		mounted(){

			this.geturl()
			this.locaton()
		},
		methods: {
			...mapMutations([
				'updatedWindowSize'
			]),
			toexchange(){
			},
			geturl(){
				this.ajax.QUERY_IMGPATH({method:'get',showMsg:false}).then((res) => {
					this.log(res.data.obj)
					this.$store.commit({
					  type: 'updateimgpath',
					  imgpath: res.data.obj
					})
				}).catch(msg => {
	
				})
				this.ajax.WX_SDKSINGCFG({ data: {url:"index.html"}}).then((res) => {
					//wx
					 this.$wechat.config({
						    debug: process.env.NODE_ENV === 'production'?false:true, // false:true,开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看
//						    debug: true, // false:true,开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看
						    appId: res.data.obj.appid, // 公众号
						    timestamp: res.data.obj.timestamp, // 必填，时间戳
						    nonceStr: res.data.obj.nonceStr, // 必填，随机串
						    signature: res.data.obj.signature,// 必填，签名后密文
						    jsApiList: ['addCard','chooseCard','openCard','chooseWXPay','getLocation'] // 必填，添加card权限，choosecard获取本地全码列表，opencard打开一个卡券看详情
					});   
					
				}).catch(msg => {
				this.log(msg)
				})
			},
			locaton(){
				const self=this
				 this.$wechat.ready(()=>{
				 	self.$wechat.getLocation({
				    type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
					    success:  (res)=> {
					        var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
					        var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
					        self.$store.commit({
					        	type:'updatelocation',
					        	location:{lat:latitude,lng:longitude},
					        })
					    }
					});
				 })
				
			},
			opreation(name){
				if(name==''){
					this.$router.push({name:"exchange1",params:{type:"new"}})
					return ;
				}
				this[name]=true
			}
		},

	}
</script>

<style lang="less">
	@import '~vux/src/styles/reset.less';
	@import '~vux/src/styles/1px.less';
	body {
		background-color: #fbf9fe;
	}
	.weui-mask_transparent{
		z-index: 99998 !important;
	}
	.weui-toast{
		z-index: 99999 !important;
	}
	.weui-actionsheet{
		z-index: 99999 !important;
	}
	.mycard-title {
		z-index: 9999;
		background-color: #ec748a;	text-align: center;color: #fff;    line-height: 44px;
		img{
			top:10px;left: 25px;position: absolute;z-index: 100;
		}
	}
	
	.isActive {
		color: #D4237A
	}
	
	.tabs {
		padding-top: 5px;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		height: 45px;
		align-items: center;
		position: fixed;
		bottom: 0px;
		width: 100%;
		background: #ffffff;
		font-size: 13px;
		z-index: 999;
		.tabitem {
			text-align: center;
			img{
				width:22px
			}
		}
		p {
			margin: 0;
			padding: 0;
		}
	}
	
	.pop-in-enter-active,
	.pop-in-leave-active,
	.pop-out-enter-active,
	.pop-out-leave-active {
		position: fixed;
		top: 0px;
		bottom: 0px;
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