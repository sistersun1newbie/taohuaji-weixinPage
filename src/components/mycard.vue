<template>
	<div style="padding-top: 1px;text-align: center; ">
   		 <div v-show="cardlist.length==0" style="text-align: center;padding: 10px;">
				暂无卡片
		</div>


		<div v-show='index==1'    style="padding: 8px; margin-bottom: 50px;text-align: start;">
			<div class='mycard' @click="to(item)" :style="imgstyle(item.cardTypeCode==1?backimg1:backimg2)"   v-for="(item,index) in cardlist">
				<div style="height: 35px;color: white;line-height: 35px;;padding-left: 8px;">
					{{item.cardTypeCode==1?'实体卡':'电子卡'}}-{{item.cardType}}
				</div>
				<div class="mycard-item">
					<div style="width: 30%;min-width: 140px;" class="img">
						<img @error="$event.target.src=onerror"  :src="$store.state.imgpath+item.pictureUrl" style="width: 100%;max-height: 100px; " />
					</div>
					<div class="miaosu">
						<div style="color:black;font-size: 13px;position: relative;">
							<img   :src="item.isRecord=='NO'?biaoshi1:biaoshi3" style="position: absolute;width:80px; right:0px;top: -50px;" />
							<p style="font-size: 17px;">{{item.packageName}}</p>
							<p>(剩余{{item.availableCount}}盒)</p>
							<p>有效期：{{item.endTime&&item.endTime.substring(0,10)}}</p>
							<p v-show="item.isRecord=='NO'" style="font-size: 17px;color: red;">点击使用>><x-button @click.native.stop="deletelist(index,item)" mini type="undefined" style="float: right; background-color: #f4535b; font-size: 14px;" >删除订单</x-button></p>
						</div>
					</div>
				</div>
			</div>
			
		</div>
		
	</div>
</template>
<style lang='less' scoped>
.mycard {
		/*box-shadow: 0px 1px 5px rgba(0, 0, 0, .5);*/
		margin-bottom: 8px;
	}
	
	.mycard-item {
		display: flex;
		align-items: center;
		justify-content: space-around;
		padding: 7px;
		padding-bottom: 30px;
		padding-left: 10px;
		.miaosu {
			display: flex;
			flex-direction: column;
			width: 60%;
			padding-left: 12px;
		}
		.img {
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>
<script>
	import { XInput, ButtonTab, ButtonTabItem, XButton,FormPreview ,Popover } from 'vux'
	import biaoshi2 from '../assets/shixiao.png'
	import biaoshi3 from '../assets/zengsong.png'
	import backimg1 from '../assets/kaquan4_01.png'
	import backimg2 from '../assets/kaquan6.png'
	import onerror from '../assets/error.jpg'
	export default {
		data() {
			return {
				onerror:onerror,
				backimg1:backimg1,
				backimg2:backimg2,
				biaoshi1:biaoshi2,
				biaoshi3:biaoshi3,
				list2: [{
						name: '未使用',
						index: 0,
					},
					{
						name: '已使用',
						index: 1,
					},
					{
						name: '已失效',
						index: 2,
					},
					{
						name: '已赠送',
						index: 3,
					},
				],
				index: 0,
				cardlist:[],
			}
		},
		mounted() {
			this.index = this.$route.params.id
			this.getHistory()
		},
		methods:{
			to(item){
				if(item.isRecord=='YES'){
					return ;
				}
				//提交 产品id  pid  跳转到  buy页面 同时 清除 主题id
				this.$store.commit({
				  type: 'updateproductpid',
				  productpid: item.cardProductId,
				})
				this.$store.commit({
				  type: 'updateproductid',
				  productid: '',
				})
				
				this.$store.commit({
				  type: 'updateoperationflag',
				  operationflag: false,
				})
				
				
				
				this.$router.push({name:'exchange4',params:{operationflag:false,card:item}})
			},
			getHistory(){
				if(this.index==1){
					this.ajax.QUERY_CARDHISTORY({data:{ openId: this.$store.state.openid },showMsg:false}).then((res) => {
					 	console.log(res.data.obj)
					 	this.cardlist=res.data.obj
					}).catch(msg => {
		
					})
				}
			},
			imgstyle: function(item) {
				return {
					'background-image': 'url(' + item + ')',
					'background-size': ' 100% 100%',
					'background-position': ' center center'
				}
			},
		},
		
		components: {
			XInput,
			ButtonTab,
			ButtonTabItem,
			XButton,FormPreview,Popover 
		},

	}
</script>