<template>
	<div style="overflow: hidden;background-size: 100% 100%;" 
	:style="style1" class="bg" >
		<div style="border-radius: 50%;text-align: center;  ">
			<img style="margin:15% auto 15%;" width="40%" src="../assets/bindbg_03.png" />
		</div>
		<div style="text-align: center;">
			<div >
				<cell style="width: 80%;padding:0px;margin-left:10%;margin-top:10px; border-radius: 16px;  background-color: white;" title="">
					<div slot="after-title">
						<x-input  title="" v-model="cardNo" style="padding:0px;" placeholder="请输入卡号"> 
							<img slot="label" width="40" style="margin:0 15px; " src="../assets/bindbg_10.png" />
						</x-input>
					</div>
				</cell>
				<cell style="width: 80%;margin-left:10%;padding:0px;margin-top:10px ; border-radius: 16px;  background-color: white;" title="">
					<div slot="after-title">
						<x-input type="password" title="" v-model="cardPass" style="padding:0px;" placeholder="请输入密钥">
							<img slot="label" width="40" style="margin:0 15px; " src="../assets/bindbg_12.png" />
						</x-input>
					</div>
				</cell>
			</div>
			<x-button @click.native='bind()' plain type="undefined" style="width: 80%; font-size: 14px;top: 15px;color: #DA4D88;background-color: rgba(240, 163, 186, 0.22);  border: 1px solid rgba(249, 94, 147, 0.5)">关联</x-button>

		</div>
		<div style="height: 90px;">
			&nbsp;
		</div>
	</div>
</template>

<script>
	import { Cell, XInput,  XButton } from 'vux'

	export default {
		data() {
			return {
				userHistory: false,
				style1:{
					height:window.windowHeight-44+'px',
					background:`url(${require('../assets/bindbg.png')}) no-repeat`,
					backgroundSize: `100% 100%`
				},
				cardNo:'',
				cardPass:'',
			}
		},
		mounted() {
			this.log(this.$route.params.type)
		},
		methods:{
			bind(){
				if(this.cardNo=='') {
					this.toast('请输入卡号')
					return;
				}
				if(this.cardPass=='') {
					this.toast( '请输入秘钥')
				}
				this.ajax.UPDATE_CARDBIND({
					data: {
						cardNo : this.cardNo,
						cardPass : this.cardPass,
						exchangeType: this.contacts,
					}
				}).then((res) => {
					this.$vux.toast.show({
							text: '绑卡成功,请查看',
							position:'bottom',
							type:'text',
							width:'auto'
						})
					this.$router.back()
				}).catch(msg => {
					this.log(msg)
				})
			}
		},
		components: {
			Cell,
			XInput,
			XButton
		},

	}
</script>
<style lang="css" scoped>
	.bg {
	
		background-position: center center;
	}
	.weui-cell {
    padding: 0px;
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
}
</style>