<template>
	<div>
		<div style="height: 1px;">&nbsp;</div>
		<group style="">
			<div style=" width: 96%; margin: 0 auto;">
				<div @click="todetail()" style="background-color: white;width: 100%; float: left;border: solid 1px #F95E93;border-radius: 7px;">
					<div style="width: 40%;float: left;margin: 3% ;">
						<img :src="$store.state.imgpath+item.pictureUrl" @error="$event.target.src=onerror"  style=""  width="100%" />
					</div>
					<div style="width: 50%;float: left;">
						<div style="color:black;font-size: 13px;padding:8px 3px 3px 3px;float: left;">
							<p style="font-size: 17px;">{{item.packageName}}</p>
							<p>(剩余{{item.availableCount}}盒)</p>
							<p>有效期：{{item.endTime&&item.endTime.substring(0,10)}}</p>
							<p>卡号：{{item.cardCode}}</p>
						</div>
					</div>
				</div>
				&nbsp;
			</div>
			<div style="height: 1px;">&nbsp;</div>
			<timeline >
				<timeline-item style="display: none;">
				</timeline-item>
				 <timeline-item v-if="tempobj" style="font-size: 13px;color: #000;" >
	                <p>快递号： {{tempobj.expressCode}} </p>
	                <p> 送至：{{ tempobj.province+" "+ tempobj.city+" "+ tempobj.country+" "+tempobj.detailAddress}}</p>
	                <p>  联系人：{{tempobj.contacts}}({{tempobj.phone}})</p>
	               
	                <p >发货日期：{{dateFormat(tempobj.agreedDate)}}</p>
	                <p >数量：{{tempobj.shipmentsCount}}盒  <x-button @click.native.stop="to()" mini type="undefined" style="float: right; background-color: #f4535b; font-size: 14px;" >修改订单</x-button></p>
	                <p >状态：{{tempobj.status==1?'待确认':(tempobj.status==2?'待发货':'已发货')}}  </p>
	               
	                <hr style="margin:15px auto 0;" width="100%" color="#ccc" SIZE='1' />
	            </timeline-item>
	             <div v-show="list.length==0" style="text-align: center;" >
	                <div style="">暂无记录 </div><!-- @click.native="$router.push({name:'exchange3'})"-->
	            </div>
	            <timeline-item v-for="item in list" style="font-size: 13px;color: #aaa;">
	                <p>快递号：  {{item.expressCode}}</p>
	                <p> 送至：{{ item.province+" "+ item.city+" "+ item.country+" "+item.detailAddress}} </p>
	                <p>  联系人：{{item.contacts}}({{item.phone}})</p>
	                <p >发货日期：{{dateFormat(item.agreedDate)}}</p>
	                <p >数量：{{item.shipmentsCount}}盒</p>
	                <p >状态：{{item.status==1?'待确认':(item.status==2?'待发货':'已发货')}}</p>
	                <hr style="margin:15px auto 0;" width="100%" color="#ccc" SIZE='1' />
	            </timeline-item>
	        </timeline>
		</group>
	</div>
</template>
<script>
	import { Cell,  Group, XButton,   Flexbox, FlexboxItem, Timeline, TimelineItem } from 'vux'
	import goodsimg from '../assets/taohuaji_02.png'
	import backimg1 from '../assets/kaquan4_01.png'
	import onerror from '../assets/error.jpg'
	export default {
		data() {
			return {
				onerror:onerror,
				plainflag:false,
				item:{},
				cardobj:{},
				list: [],
				tempobj:'',
				remark:''
			}
		},
		mounted() {
			this.log(this.$route.params)
			this.item= this.$store.state.card
			
			
			this.log(this.$store.state.operationflag)
			this.log(this.$store.state.exchangeflag)
			
			if(this.$store.state.operationflag||this.$store.state.exchangeflag=='detail'){
				this.log("QUERY_CARDENTITY")
				this.getlist()
			}else{
				this.log("QUERY_CARDDETAIL")
				this.getlist2()
			}
		},
		beforeRouteLeave (to, from, next) {
   			next()
		},
		methods: {
			getlist(){
				 this.ajax.QUERY_CARDENTITY({data:{ cardId:this.$store.state.card.cardId },showMsg:false}).then((res) => {
			 		this.list = res.data.obj.detail||[];
			 		if(res.data.obj.detail.length>0&&res.data.obj.detail[0].status==1){
			 			this.tempobj=res.data.obj.detail[0]
						this.remark=res.data.obj.record.remark
			 			this.list.shift()
			 		}
				}).catch(msg => {
	
				})
			},
			getlist2(){
				 this.ajax.QUERY_CARDDETAIL({data:{ cardId: this.$store.state.card.cardId},showMsg:false}).then((res) => {
			 		this.list = res.data.obj||[];
				}).catch(msg => {
	
				})
			},
			todetail(){
				if(this.$store.state.productpid){
					this.$router.push({name:'buydetail'})
				}
				
			},
			to(){
				this.$store.commit({
				  type: 'updateMonthId',
				  obj: this.tempobj
				})
				this.$router.push({path:'/exchange2',query:{MonthId:true, remark:this.remark}})
			},
			a() {
				this.$vux.toast.show({
					text: '操作成功',
					position:'bottom',
					type:'text',
					width:'auto'
				})
				this.plainflag=true
			},
			dateFormat(dateStr){
				var result = dateStr;
				if(dateStr && dateStr.length>10){
					result = dateStr.substring(0, 10);
				}
				return result;
			}
		},
		components: {
			Cell,
			Group,
			XButton,
			Flexbox, FlexboxItem,  Timeline, TimelineItem
		},
	}
</script>
<style lang="less" scoped>
.flexbox{
	.xbut{
		font-size: 13px;
		padding: 0;
	}
	
}
</style>