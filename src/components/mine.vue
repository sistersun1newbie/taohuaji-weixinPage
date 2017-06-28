<template>
	<div style="color: #333;">
		<div style="text-align: center;padding: 15% 0;margin-bottom: 10px;background-size: 100% 100%;" 
		:style="{background: `url(${require('../assets/mine1.png')}) no-repeat`}"
		class="bgimgmine">
			<img width="35%" style="" src="../assets/mine_03.png" />
		</div>
		<group style="">
			<cell v-for="item in  invoiceType" :title="item.title" @click.native='to(item.to)' is-link>
			</cell>
		</group>
		<div style="height: 50px;">&nbsp;</div>
	</div>
</template>
<script>
	import { Cell, XInput, Group} from 'vux'
	export default {
		data() {
			return {
				invoiceType: [
					{
						title: "我的信息",
						to: { name: 'mineinfochoose' }//mineinfo
					},
					 {
					 	title: "我的订单",
					 	to: { name: 'history' }
					 },
//					{
//						title: "预约发货",//queryorderdata
//						to: { name: 'settingdata' ,params:{
//							setting:true
//						}}
//					},
					{
						title: "兑换记录",
						to: { name: 'exchange5' }
					},
					/*{
						title: "活动卡券",
						to: {
							name: 'mycard',
							params: {
								id: 4,
								type: 'unuse'
							}
						}
					}*/
				],
			}
		},
		mounted() {
			//	
		},
		methods: {
			to(name) {
				this.$router.push(name)
			},
		},
		components: {
			Cell,
			XInput,
			Group,
		},
	}
</script>
<style lang="less" scoped>
 
	
</style>