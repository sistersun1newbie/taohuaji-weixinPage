<template>
	<div>
		<div style="height: 1px;">&nbsp;</div>
		<group style="">
			<cell  style="font-size: 15px;" title="预约发货日期：" >
				<div slot="child" style="font-size: 15px;top: 10px;position: absolute;right: 13%;">{{value1[0]}}</div>
			</cell>
			<cell v-show="item.detailAddress=='undefined'||item.detailAddress==null" style="font-size: 15px;text-align: center;" title="" inline-desc="暂无绑定地址" >
			</cell>
			
			<cell v-show="!(item.detailAddress=='undefined'||item.detailAddress==null)||$route.params.MonthId" style="font-size: 15px;" title="收件地址：" :inline-desc="(item.province+' '+item.city+' '+item.country+' '+item.detailAddress)">
				<div slot="child" style="font-size: 13px;left: 30%;top: 10px;position: absolute;">{{item.contacts+'('+item.phone+')'}}</div>
			</cell>
			<div style="width: 90%;padding-left: 10px;margin:20% 5px 8px;">
				<p style="font-size: 15px;">备注：</p>
				<p style="font-size: 13px;color: red;">
					&emsp;&emsp;1、该日期为自动订单的发货日期，自动订单在每月1号创建，如果不维护，系统无法自动下单；<br> &emsp;&emsp;2、预定日期创建成功后，将于次月生效，如需新增/追加本月订单，请在'个人中心-增加预约'中下单，套餐内产品取完为止；
				</p>
			</div>
		</group>
		<x-button type="undefind" @click.native="settingdata()" style="margin-top:20px; width: 90%;background-color: #f4535b; font-size: 16px;color: ;border-radius: none;">设置预约日期</x-button>
	</div>
</template>
<script>
	import { Cell, Group, XButton, PopupPicker } from 'vux'
	import goodsimg from '../assets/taohuaji_02.png'
	import backimg1 from '../assets/kaquan4_01.png'
	export default {
		data() {
			return {
				item: {},//地址绑定
				itemObj:{},//日期大对象绑定
				value1: ['2'],
			}
		},
		mounted() {
			
			this.query()
		},
		methods: {
			query() {
				 this.ajax.QUERY_DATAINFO({ data: { openId: this.$store.state.openid }, showMsg: false }).then((res) => {
				 	this.log((res.data.obj&&res.data.obj.wechatUserAddress)==null)
					this.item = res.data.obj&&res.data.obj.wechatUserAddress || {};
					this.itemObj = res.data.obj;
					this.value1=[]
					this.value1.push(res.data.obj&&res.data.obj.aggredDate||'2')
				}).catch(msg => {
					this.log(msg)
				})
			},
			settingdata() {
				this.$router.push({name:'settingdata'})
			},
		},
		components: {
			Cell,
			Group,
			XButton,
		},
	}
</script>
<style lang="css" scoped>

</style>