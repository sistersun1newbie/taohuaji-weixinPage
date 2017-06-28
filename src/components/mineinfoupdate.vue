<template>
	<div style="">
		<div class="vux-1px-tb"  style="background:#fff">

			<x-input v-model="nickname" :disabled="editflag" placeholder="请输入昵称">
				<span slot="label" style="margin-right: 3em;">昵称：</span>
			</x-input>
			<x-input v-model="username" :disabled="editflag"  placeholder="请输入真实姓名">
				<span slot="label" style="margin-right: 1em;">真实姓名：</span>
			</x-input>
			<x-input v-model="phone" :disabled="editflag"  placeholder="请输入手机号">
				<span slot="label" style="margin-right: 2em;">手机号：</span>
			</x-input>
			
			<div style="text-align: center;margin-top: 30px;padding-bottom:10px">
				<x-button @click.native='change' plain type="undefind" style="margin: 20px auto;width: 80%;background-color: #f4535b; font-size: 14px;color: #FFFFFF  border: 1px solid #f4535b">{{text}}</x-button>
			</div>
		 
		</div >
	</div>
</template>

<script>
	import { Cell, XInput, Group, XButton } from 'vux'

	export default {
		data() {
			return {
				editflag: false,
				text:'完成',
				nickname: this.$store.state.userinfo&&this.$store.state.userinfo.nickname||'',
				username: this.$store.state.userinfo&&this.$store.state.userinfo.username||'',
				phone: this.$store.state.userinfo&&this.$store.state.userinfo.phone||'',
			}
		},
		mounted() {
			this.log(this.$route.params) 
		},
		methods: {
			change(){
				if(this.nickname==''){
					this.toast('昵称不能为空')
					return ;
				}
				if(!/^[\u4e00-\u9fa5]{1,4}$/.test(this.username)){
					this.toast('请输入1-4个汉字作为真实姓名')
					return ;
				}
				if(!/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.phone)){
					this.toast('请输入正确的手机号码')
					return ;
				}
				this.ajax.UPDATE_USERINFO({data:{ openId: this.$store.state.openid,realName:this.username,nickName:this.nickname,tel:this.phone }}).then((res) => {
					this.$router.back()
				}).catch(msg => {

				})
			}
		},
		components: {
			Cell,
			XInput,
			Group,
			XButton,
		},

	}
</script>