<template>
	<div style="">
		<div style="">
		</div>
		<div v-html="htmlcode" style="width: 100%;" class="buy-detail"></div>
		<!--<div style="width: 90%;padding-left: 10px;margin: 10px;">
			<div style="height:10px ;background-color: #f8e5e7;float: left;"></div>
			<div style="margin: 10px;width: 100%; float: left;">
				<p style="font-size: 15px;">使用门店：<span style="margin-left: 18px;font-size: 13px; color: cadetblue;"  @click="$router.push({name:'neighborStore'})">查看全部门店</span></p>
			</div>
			<div  style="margin: 10px;width: 100%; float: left;">
				<p style="font-size: 15px;">生产商：</p>
				<p style="margin-left: 18px;font-size: 13px;">山东东阿阿胶保健品有限公司</p>
			</div>
			<div  style="margin: 10px;width: 100%; float: left;">
				<p style="font-size: 15px;">有效期：</p>
				<p style="margin-left: 18px;font-size: 13px;">2017.1.2-2017.4.30</p>
			</div>
			<div style="margin: 10px;width: 100%; float: left;">
				<p style="font-size: 15px;">购买须知：<span style="margin-left: 18px;font-size: 13px; color: cadetblue;"  @click="$router.push({name:'description'})">查看内容</span></p>
			</div>
		</div>-->
	</div>
</template>
<style lang="less">
	.buy-detail img{
		width: 100% !important
	}
</style>
<script>
	import { FormPreview, XInput, Group } from 'vux'

	export default {
		data() {
			return {
				userHistory: false,
				list: [{
					label: '商品',
					value: '桃花姬'
				}, {
					label: '交易时间',
					value: '2017年3月7日20:07:07'
				}, {
					label: '交易方式',
					value: '微信付款'
				}, {
					label: '交易单号',
					value: '12312312312'
				}],
				htmlcode:'',
			}
		},
		mounted() {
			if(this.$store.state.productid.cardThemeId){
				this.getinfo(this.$store.state.productid.cardThemeId,0)
			}else if(this.$store.state.productpid,1){
				this.getinfo(this.$store.state.productpid,1)
			}else{
				this.log("productpid 和 productid都不存在")
			}
		},
		methods:{
			getinfo(param,param2) {
				this.ajax.QUERY_PROINFO({ data: { cardThemeId: param ,idType:param2}, showMsg: false }).then((res) => {
					if(!res.data.obj) return ;
					this.htmlcode=res.data.obj.cardDetail
				}).catch(msg => {
					this.log(msg)
				})
			},
		},
		components: {
			FormPreview,
			XInput,
			Group
		},

	}
</script>
