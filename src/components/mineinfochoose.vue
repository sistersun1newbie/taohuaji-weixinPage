<template>
	<div style="color: #333;">
		<div style="height: 1px;">
			&nbsp;
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
						to: { name: 'mineinfo' }
					},
					{
						title: "地址管理",
						to: {
							name: 'managerAddress' ,
							params: {
								backflag:1,
							}
						}
					},
					{
						title: "发票管理",
						to: {
							name: 'managerInvoice' ,
							params: {
								backflag:1,
							}
						}
					},
				],
			}
		},
		mounted() {
			//	
		},
		methods: {
			to(name) {
				if(name.name=='managerAddress'){sessionStorage.backflag=1}
				if(name.name=='managerInvoice'){sessionStorage.backflagInvoice=1}
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