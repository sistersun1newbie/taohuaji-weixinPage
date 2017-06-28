<template>
	<div style="background:#FFFFFF;color:#666666 ">
		<!--<cell title="好友1" is-link>
			<img slot="icon" width="40" style="display:block;margin: 0px 15px;border-radius: 7px;" src="../assets/aojiao.png">
		</cell>-->
		   <div style="padding:5px 15px">
		 		<rater v-model="data4"   active-color="#EC748A" :margin="8" />
				 <span  >{{data4}} 星</span>
			</div>
		<x-textarea :max="35" v-model="content" placeholder="填写相关留言"></x-textarea>
		<!--<input type="file" @change='change' />-->

		<ul class="mui-table-view">
			<li class="mui-table-view-cell">
				<p style="font-size: 13px;color: #aaa;">添加图片或视频</p>

				<p>
					<span v-if="piclist.length!=0">
						<div  v-for="(pic,index) in piclist" style="position: relative; margin-right: 20px; display: inline-block;" @click='del(index)'>
							<img  :src='pic' style=" width: 60px;height:60px;display: inline-block ;" />
							<strong class="del" >一</strong>
						</div>
					</span>

					<!--<img src="../assets/imgadd.png" v-show="piclist.length<3" style=" width: 60px;height:60px; " @click.stop="addImg" />-->
 					<span class="file"  v-show="piclist.length<3">
 						<img src="../assets/imgadd.png"  style=" width: 60px;height:60px;position: absolute; "   />
 						<input accept="image/*" type="file" style="" id="imgfile" @change="change" />
					</span>
					
				</p>
			</li>
		</ul>
		<x-button  @click.native='gift()' class='evabtn'>提 交 </x-button>

		
	</div>
</template>

<script>
	import { XButton, XTextarea, Group, Cell,Rater } from 'vux'
import { querystring } from 'vux'
	export default {
		data() {
			return {
				userHistory: false,
				piclist: [],
				picfile:[],
				picfile1:[],
				data4:3,
				content:'',
			}
		},

		mounted() {
			this.log(this.$route.params)
		},

		methods: {
			del(index) {
				this.piclist.splice(index,1)
				this.picfile.splice(index,1)
				this.picfile1.splice(index,1)
				document.getElementById('imgfile').value=''
			},
			change(e){
				let file = e.target.files[0]
			 	let val = e.target.value;
			 	if(this.picfile1.indexOf(val)>-1){
			 		this.toast("图片已经添加")
			 		return ;
			 	}
				if (file) {
					this.picfile.push(file)
					this.picfile1.push(val)
					let reader = new FileReader();
						reader.onload = () => {
							this.piclist.push(reader.result)   //这个就是base64的数据了
						}
					reader.readAsDataURL(file);
				}
			},
		 
			gift() {
				if(this.content===''){
					this.$vux.toast.show({
						text: '评论不能为空',
						position: 'bottom',
						type: 'text',
						width: 'auto'
					})
					return
				}
				let  formData = new FormData();
				this.picfile.forEach((img,index)=>{
					formData.append('multipartFile'+(index+1),img)
				})
 				formData.append('orderId',this.$store.state.dingdanobj&&this.$store.state.dingdanobj.orderId||'')
 				formData.append('cardProductId',this.$store.state.dingdanobj&&this.$store.state.dingdanobj.cardProductId||'')
 				formData.append('content',this.content)
 				formData.append('score',this.data4)
				this.ajax.ADD_ORDERCOMMENT({data:formData,config:{
					 headers:{
						'Content-Type':'application/x-www-form-urlencoded'
					}
				}
					 }).then((res) => {
					this.$router.back()
				}).catch(msg => {
					this.log(msg)
				})
//				this.$router.push({ name: "mycard", params: { id: 3, type: "gift" } })
			},
			gift1() {

			}
		},
		components: {
			XButton,
			XTextarea,
			Group,
			Cell,
			Rater
		},

	}
</script>
<style lang='less' scoped>

.file {
       position: relative;
    display: inline-block;
   
    height: 60px;
    width: 60px;
 
   
}
.file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
     height: 60px;
    width: 60px;
    z-index: 9999;
}
 

	.mui-table-view-cell {
		position: relative;
		overflow: hidden;
		padding: 0px 15px;
		-webkit-touch-callout: none;
	}
	.del{
		position: absolute;
		top: -5px;
		right: -5px;
		width: 15px;
		height: 15px;
		background: red;
		border-radius: 50%;
		line-height: 18px;
		text-align: center;
		font-size: 10px;
		color: white;
		font-weight: 900;
	}
	.evabtn{
		width: 80%;
		margin-left: 10%;
		margin-top: 30px;
		background: #EC748A;
		height: 35px;
		line-height: 35px;
		font-size: 15px;
	}
	.mui-table-view-cell {
		position: relative;
		overflow: hidden;
		padding: 0px 15px;
		-webkit-touch-callout: none;
	}
</style>