<template>
	<div  class="store" >
		<div style="height: 1px; " class="vux-1px-t">&nbsp;</div>
		<div class="sss" @scroll='aaa'>
			<div class="store-detail vux-1px-b" v-for="(item,index) in showlist" :key='index'>
				<div class="detil" @click="toStoreDetail(item)">
					<p>{{item.storeName}}</p>
					<span>{{item.storeAddress}}</span>
				</div>
			 
				<a class="dis" :href="`http://apis.map.qq.com/uri/v1/marker?marker=coord:${item.lat},${item.lng};title:${item.storeName};addr:${item.storeAddress}&referer=myapp`">
					<img width="40" style="float: right; margin: 0px 0px 0px 15px;border-radius: 7px;" src="../assets/location.png">
					 <p>{{item.distance}}km</p>
				</a>
			</div>
		</div>
	</div>
</template>
<style type="text/css" lang="less">
.store{
	display: flex;
	flex-direction: column;
	 overflow: hidden;
	height: 100%;
	width:100%;
	.sss{
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
	}
	.store-detail{
		display: flex;
		justify-content: space-between;
		align-items: center;
		 min-height: 70px;
		padding: 8px;
		
		h4{
			font-size: 18px;
		}
		span{
			color: #666666;
		}
		a{
			color: #666666;
			text-align: center;
		}
		/*.detil{
			width: 70%;
		}*/
	}
}
	
</style>
<script>
	import { Cell, Group } from 'vux'
	import gps from '../util/gps';
	export default {
		data() {
			return {
				userHistory: false,
				list: [],
				changdu:15,
			}
		},
		created(){
			const self=this
			this.$wechat.getLocation({
				type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
				success:  (res)=> {
					self.$store.commit({
						type:'updatelocation',
						location:{lat: res.latitude,lng:res.longitude},
					})
				}
			});
		},
		mounted() {
			this.query()
		},
		computed:{
			showlist(){
				 
				if(this.changdu >=this.list.length){
					return  this.list
				}
			 
				return this.list.filter((obj,index)=>{
					return index<this.changdu;
				})
				 
			}
		},
		methods: {
			aaa(e){
				if(e.target.scrollHeight-(e.target.scrollTop+e.target.clientHeight)<20){
					this.changdu < this.list.length?(this.changdu+=15):(this.changdu=this.list.length)
				}
 
			},
			toStoreDetail(param) {
//				localStorage.storeDetail = JSON.stringify(param)
				sessionStorage.storeinfoobj=JSON.stringify(param)
				this.$router.push({ name: 'storeDetail', params: {
								infoobj:param,
							}})
			},
			query() {
				this.ajax.QUERY_STORELIST({ showMsg: false }).then((res) => {
					this.list = res.data.obj.map((obj, i) => {
				 		let selflocation = gps.bd_decrypt(obj.lat,obj.lng)
						obj.lat=selflocation.lat
						obj.lng=selflocation.lng
						obj.distance = (gps.distance(this.$store.state.location, selflocation) / 1000).toFixed(2)
						return obj
					}).sort((o1, o2) => {
						return o1.distance - o2.distance;
					})
				}).catch(msg => {
					this.log(msg)
				})
			},
		},
		components: {
			Cell,
			Group,
		},
	}
</script>