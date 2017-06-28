<template>
	<div style="">
		<div class="vux-1px-tb"  style="background:#fff">

			<x-input v-model="nickname" :disabled="editflag">
				<span slot="label" style="margin-right: 3em;">昵称：</span>
			</x-input>
			<x-input v-model="username" :disabled="editflag">
				<span slot="label" style="margin-right: 1em;">真实姓名：</span>
			</x-input>
			<x-input v-model="phone" :disabled="editflag">
				<span slot="label" style="margin-right: 2em;">手机号：</span>
			</x-input>
			 
				<div style="text-align: center;margin-top: 30px;padding-bottom:10px">
					<x-button @click.native='change' plain type="undefind" style="margin: 20px auto;width: 80%;background-color: #f4535b; font-size: 14px;color: #FFFFFF  border: 1px solid #f4535b">{{text}}</x-button>
				</div>
		</div >
	</div>
</template>

<script>
	import { Cell, XInput, Group, XButton} from 'vux'

	export default {
		data() {
			return {
				editflag: true,
				text:'编辑',
				nickname: '',
				username: '',
				phone: '',
			}
		},
		mounted() {
			this.getinfo()
			
		},
		methods: {
			to(name) {
				this.$router.push({ name: name })
			},
			getinfo() {
				this.ajax.QUERY_USERINFO({data:{ openId: this.$store.state.openid},showMsg:false}).then((res) => {
					this.username=res.data.obj.realName;
					this.nickname=res.data.obj.nickName;
					this.phone=res.data.obj.tel;
				}).catch(msg => {

				})
			},
			change(){
				this.$store.commit({
					type: 'updateuserinfo',
					userinfo: {
						username:this.username,nickname:this.nickname,phone:this.phone
					},
				})
				this.$router.push({name:"mineinfoupdate",params:{}})
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