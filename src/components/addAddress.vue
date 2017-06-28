<template>
	<div style="text-align:center;">
		<div style="height: 1px;">&nbsp;</div>
		<group class="linebreak" label-width="4em" label-margin-right="2em" label-align="right" style="margin-bottom: 15px;">
			<x-input title="" v-model="contacts" placeholder="请输入收货人" required>
				<span slot="label" style="margin-right: 5em;">姓名</span>
			</x-input>
			<x-input title="" v-model="phone" required type="tel" placeholder="请输入联系电话">
				<span slot="label" style="margin-right: 3em;">联系电话</span>
			</x-input>
			<x-input title="所在省市" v-model="longtext" disabled @click.native='flag=true'>
				<span slot="label" style="margin-right: 3em;">所在省市</span>
			</x-input>
			<x-input title="详细地址" v-model="detailAddress" required placeholder="请输入详细地址">
				<span slot="label" style="margin-right: 3em;">详细地址</span>
			</x-input>
			<x-input title="邮政编码" type="number"  v-model="emailcode"  placeholder="请输入邮政编码">
				<span slot="label" style="margin-right: 3em;">邮政编码</span>
			</x-input>
		</group>
		<group label-width="" label-margin-right="" label-align="" style="">
		<x-switch title="设为默认地址" v-model="isDefault"></x-switch>
		</group>
		<x-button @click.native='addaddress()' plain type="undefind" style="">{{buttonName}}</x-button>
		

		<popup v-model="flag" @on-hide="log('hide')" @on-show="log('show')">
			<div style="margin: 5px;display: flex;justify-content: space-between;"><span class="mbtn2 "@click="cancel()">取消</span><span class="mbtn1 "  @click="sure()" >确定</span></div>
			<div class="box">
				<picker :data='list1'  style="width: 33%;" v-model='value1'></picker>
				<picker :data='list2'  style="width: 33%;" v-model='value2'></picker>
				<picker :data='list3'  style="width: 33%;" v-model='value3'></picker>
			</div>
		</popup>
	</div>
</template>
<style lang="less" scoped>
	button {
		border-radius: 8px;
		margin:15% auto 0;
		width: 80%;
		background-color: #f4535b;
		font-size: 14px;
		color: #FFFFFF;
		border: 1px solid #f4535b
	}
			
	
	.box{
	  display: flex;
	}
	.mbtn2 {
			border: 1px solid #EC748A;
			border-radius: 5px;
			background: #FFFFFF;
			color: #333;
			font-size: 15px;
			padding: 4px 12px;
			margin-left: 5px;
		}
	.mbtn1 {
			border: 1px solid #EC748A;
			border-radius: 5px;
			background: #EC748A;
			color: aliceblue;
			font-size: 15px;
			padding: 4px 12px;
			margin-left: 5px;
		}
</style>
<script>
	import { PopupPicker, Popup, Picker, Cell, XButton, XInput, Group, XSwitch } from 'vux'
	export default {
		components: {
			PopupPicker,
			Picker,
			XButton,
			XInput,
			Group,
			XSwitch,
			Popup
		},
		data() {
			return {
				flag: false,
				contacts: '',
				phone: '',
				detailAddress: '',
				emailcode:'',
				isDefault: true,
				buttonName: '添加',
				list1:[[{name:'请选择',value:'请选择'}]],
				list2:[[{name:'请选择',value:'请选择'}]],
				list3:[[{name:'请选择',value:'请选择'}]],
				value1: [],
				value2: [],
				value3: [],
				temp:['请选择','请选择','请选择'],
			}
		},
		watch: {
			value1(v) {
				this.log(v[0]+ "===11===")
				
				this.getarealist( v[0].split(",")[0]||'请选择',2)
			},
			value2(v) {
				this.log(v[0] + "===22===")
				this.getarealist( v[0].split(",")[0]||'请选择',3)
			},
		},
		computed: {
			longtext: function() {
				this.log("======="+this.temp[0])
				return this.temp[0]+' '+this.temp[1]+' '+this.temp[2]
			},
		},
		mounted() {
			let m  = this.$store.state.temptoaddressobj
			this.getarealist()
			if(m) {
				this.contacts = m.contacts;
				this.phone = m.phone;
				this.detailAddress = m.detailAddress;
				this.emailcode=m.postCode
				this.buttonName = '修改';
				this.isDefault = m.isDefault == 2 ? false : true
				this.temp=[]
				this.temp.push(m.province)
				this.temp.push(m.city)
				this.temp.push(m.country)
			}
		},

		beforeRouteLeave(to, from, next) {
			this.$store.commit({
			  type: 'updatetitlename',
			  titlename: ''
			})
			next()
		},
		methods: {
			cancel(){
				this.flag=false
				this.value1[0].split(",")[1]=this.temp[0]
				this.value2[0].split(",")[1]=this.temp[1]
				this.value3[0].split(",")[1]=this.temp[2]
			},
			sure(){
				this.flag=false
				this.log(this.value1[0].split(",")[1]+this.value2[0].split(",")[1]+this.value3[0].split(",")[1])
				this.temp=[this.value1[0].split(",")[1],this.value2[0]!=='请选择'?this.value2[0].split(",")[1]:'请选择',this.value3[0]!=='请选择'?this.value3[0].split(",")[1]:'请选择']
			},
			onChange(val) {
				this.log("====", val)
			},
			getarealist(pid = 1,level=1) {
				if(pid=='请选择') return ;
				this.ajax.QUERY_CHINAAREA({
					data: { pid: pid },
					showMsg: false
				}).then((res) => {
					this.log(res.data.obj)
					let obj= res.data.obj||[]
					if(pid == 1) {
						obj.forEach(o=>{
							this.list1[0].push({
								name:o.name,
								value:o.id+","+o.name,
								id:o.id
							}) 
						})
					}else if(level==2){
						this.list2=[[{name:'请选择',value:'请选择'}]]
						this.list3=[[{name:'请选择',value:'请选择'}]]
						obj.forEach(o=>{
							this.list2[0].push({
								name:o.name,
								value:o.id+","+o.name,
								id:o.id
							}) 
						})
					}else if(level==3){
						this.list3=[[{name:'请选择',value:'请选择'}]]
						obj.forEach(o=>{
							this.list3[0].push({
								name:o.name,
								value:o.id+","+o.name,
								id:o.id
							}) 
						})
					}
				}).catch(msg => {
					this.log(msg)
				})
			},
			addaddress() {
//				this.log(this.longtext.match('请选择'))
//				this.toast()
//				return ;
				if(!/^[\u4e00-\u9fa5]{1,4}$/.test(this.contacts)){
					this.toast('请输入1-4个汉字作为联系人')
					return ;
				}
				if(!/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.phone)){
					this.toast('请输入正确的手机号码')
					return ;
				}
				if(this.longtext.match('请选择')!==null){
					this.toast('请选择所在省市')
					return ;
				}
				if(!/^[\u4E00-\u9FA5A-Za-z0-9]{4,}$/.test(this.detailAddress)){
					this.toast('请输入至少4个汉字作为详细地址')
					return ;
				}
				if(!/^\d{6}$/.test(this.emailcode)){
					this.toast('请输入正确的邮编')
					return ;
				}
				
				
				if(this.$store.state.temptoaddressobj) {
					this.ajax.UPDATE_ADDRESS({
						data: {
							addressId: this.$store.state.temptoaddressobj.addressId,
							openId: this.$store.state.openid,
							contacts: this.contacts,
							phone: this.phone,
							province: this.temp[0],
							city: this.temp[1],
							country:this.temp[2],
							detailAddress: this.detailAddress,
							postCode:this.emailcode,
							seq: this.$store.state.temptoaddressobj.seq,
							isDefault: this.isDefault == false ? '2' : '1',
						}
					}).then((res) => {
						if(this.isDefault){
							let addressobj={
								addressId: this.$store.state.temptoaddressobj.addressId,
								contacts:this.contacts,
								city:this.temp[1],
								country:this.temp[2],
								phone:this.phone,
								postCode:this.emailcode,
								province:this.temp[0],
								detailAddress: this.detailAddress,
							}
							localStorage.defaultaddress=JSON.stringify(addressobj)
						}
						this.$router.back()
					}).catch(msg => {
						this.log(msg)
					})
					return;
				}
				this.ajax.ADD_ADDRESS({
					data: {
						openId: this.$store.state.openid,
						contacts: this.contacts,
						phone: this.phone,
						province: this.temp[0],
						city: this.temp[1],
						country: this.temp[2],
						detailAddress: this.detailAddress,
						postCode:this.emailcode,
						seq: this.$route.params.seq,
						isDefault: this.isDefault == false ? '2' : '1',
					}
				}).then((res) => {
					if(this.isDefault){
						let addressobj={
							contacts: this.contacts,
							phone: this.phone,
							province: this.temp[0],
							city: this.temp[1],
							country: this.temp[2],
							detailAddress: this.detailAddress,
							postCode:this.emailcode,
						}
						localStorage.defaultaddress=JSON.stringify(addressobj)
					}
					this.$router.replace({ name: "managerAddress" })
				}).catch(msg => {
					this.log(msg)
				})
			}
		},

	}
</script>