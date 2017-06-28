<template>
	<div>
		<div style="height: 1px;">&nbsp;</div>
		<group style="">
			<popup-picker style="font-size: 15px;" v-show="!value" :title="title1" :data="list1" v-model="value1"></popup-picker>
			<cell v-show="item.detailAddress=='undefined'||item.detailAddress==null" style="font-size: 15px;text-align: center;" title="" inline-desc="暂无绑定地址" @click.native="$router.push({name:'managerAddress'})" is-link>
			</cell>
			
			<cell v-show="!(item.detailAddress=='undefined'||item.detailAddress==null)||$route.params.MonthId" style="font-size: 15px;" title="收件地址：" :inline-desc="(item.province+' '+item.city+' '+item.country+' '+item.detailAddress)" @click.native="$router.push({name:'managerAddress'})" is-link>
				<div slot="child" style="font-size: 13px;left: 30%;top: 10px;position: absolute;">{{item.contacts+'('+item.phone+')'}}</div>
			</cell>
			<div style="width: 90%;padding-left: 10px;margin:10% 5px 8px;">
				<p style="font-size: 15px;">备注：</p>
				<p style="font-size: 13px;color: red;line-height: 20px;">
					月发货日期<br />
					&emsp;&emsp;1、每月选定日为您寄出300g桃花姬阿胶糕1盒 ，如需修改，请至  我的--预约发货  中 <br> 
					&emsp;&emsp;2、如需增加订单，请在 我的-预约发货 中追加，每月可追加3单，取完为止 <br />
					<br />
					月收货地址<br />
					&emsp;&emsp;1、该地址为默认发货地址：每月为您寄出桃花姬阿胶糕300克1盒；<br> 
					&emsp;&emsp;2、如需修改，请至 我的-预约发货 中修改	
						
					<!--<br> &emsp;&emsp;3、次日发货，法定节假日顺延；-->
					
					<!--<br> &emsp;&emsp;3、产品收货：按照预定日期发货（当月订单最早可选次日发出），预计省内发货日期次日达，省外隔日达，请关注运单号短信提示；
					<br> &emsp;&emsp;4、增加预约日期菜单，预约日期为2号至28号。300g*12的套餐为年卡，每个月1号凌晨，系统根据用户设置的默认地址和预提日期自动创建订单。
					<br> &emsp;&emsp;5、每月1号至实际发货前一天允许修改订单，实际发货前一天上午9点系统自动发送短信，提醒确认订单，发货当天不允许修改订单。-->
				</p>
			</div>
		</group>
		<x-button type="undefind" @click.native="addorupdate()" style="margin-top:20px; width: 90%;background-color: #f4535b; font-size: 16px;color: ;border-radius: none;">{{firstFlag?'新增':'设置'}}</x-button>
	</div>
</template>
<script>
	import { Cell, Group, XButton, PopupPicker } from 'vux'
	let list = []
	for(let i = 2; i < 29; i++) {
		list.push(i)
	}
	import goodsimg from '../assets/taohuaji_02.png'
	import backimg1 from '../assets/kaquan4_01.png'
	export default {
		data() {
			return {
				value: false,
				item: this.$route.params.tempaddress||{},//地址绑定
				itemObj:{},//日期大对象绑定
				title1: '月发货日期',
				list1: [list],
				value1: ['2'],
				firstFlag: false,
			}
		},
		mounted() {
			this.log("测试：" +  this.item.detailAddress)
			this.log(this.$store.state.tempaddressobj)
			this.query()
		},
		methods: {
			query() {
				 this.ajax.QUERY_DATAINFO({ data: { openId: this.$store.state.openid }, showMsg: false }).then((res) => {
				 	console.log((res.data.obj&&res.data.obj.wechatUserAddress)==null)
				 	
					this.item = res.data.obj&&res.data.obj.wechatUserAddress || {};
					this.itemObj = res.data.obj;
					this.value1=[]
					this.value1.push(res.data.obj&&res.data.obj.aggredDate||'2')
					if((res.data.obj&&res.data.obj.wechatUserAddress)==null){
						this.firstFlag=true
					}
					if(this.$route.params.tempaddress!= ''&&this.$route.params.tempaddress!= undefined ) {
						this.item =this.$route.params.tempaddress
					}
					
				}).catch(msg => {
					this.log(msg)
				})
			},
			showConfirm () {
		      let self = this
				this.$vux.confirm.show({
					title: '你还没有收藏地址',
					content: '是否现在去设置一个收藏地址?',
					onCancel() {
						
					},
					onConfirm() {
						self.$router.push({name:'managerAddress'})
					}
				})
		    },
			addorupdate() {
				if(this.item&&this.item.addressId==undefined){
					this.showConfirm()
					return ;
				}
				if(this.firstFlag) {
					this.add()
				} else {
					this.update()
				}
			},
			add() {
				this.ajax.ADD_DATAINFO({ data: { openId: this.$store.state.openid, addressId: this.item.addressId, aggredDate: this.value1[0] } }).then((res) => {
					this.$router.back()
				}).catch(msg => {

				})
			},
			update() {
				this.log(this.itemObj.aggredDateId)
				this.ajax.UPDATE_DATAINFO({ data: { aggredDateId: this.itemObj&&this.itemObj.aggredDateId||'', addressId: this.item.addressId, aggredDate: this.value1[0] } }).then((res) => {
					this.$router.back()
				}).catch(msg => {
					this.log(msg)
				})
			},
		},
		components: {
			Cell,
			Group,
			XButton,
			PopupPicker,
		},
	}
</script>
<style lang="css" scoped>

</style>