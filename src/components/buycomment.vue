<template>
	<div style="">
		<div v-show="lists.length==0" style="text-align: center;background: white;padding: 10px;">
			暂无评价
		</div>
		<div style="margin: 8px auto;" v-for=" (it,i) in lists">
			<div  style="width: 100%; float: left;;">
				<!--<div style="width: 10%;float: left;margin:2% 2% 0;">
					<img @error="$event.target.src=onerror" src="../assets/daijinquan_11.png" width="100%" style="border-radius: 50%;" />
				</div>-->
				<div style="width: 51%;float: left;margin: 4% 2%;font-size: 13px;">
					{{it.userInfo&&it.userInfo.nickName}}
				</div>
				<div style="max-width: 30%;float: right;text-align: center;margin: 4% 4%;font-size: 13px;">
					<p style="color: #999;">{{it.createTime&&it.createTime.substring(0,10)}}</p>
				</div>
			</div>
			<div style="width: 96%; float: left;padding:0 2%;font-size: 13px;">
				<img v-for="i in it.score"  src="../assets/start.png" width="20px" style="border-radius: 50%;margin: 0 1%;" />
			</div>
			<div style="width: 96%; float: left;padding:0 2%;font-size: 13px;">
				<p>{{it.content}}</p>
			</div>
			<div style="width: 96%; float: left;padding: 2%;">
				<img class="previewer-demo-img" @error="$event.target.src=onerror" style="width: 28%;margin:0 2%;" v-for="(item,index) in it.pictures&&it.pictures.split(';')" @click="show('prv'+i,index)" :src="$store.state.imgpath+item" />
				<previewer :list="imglist" :ref="'prv'+i" :options="options"></previewer>
			</div>
			
			<!--<div style="width: 96%;font-size: 13px; float: left;padding: 2%;color: #999;">
				<p>
					<span style="float: right;margin-right: 10%;margin-left: 2%;">12</span><img style="float: right;" width="20px" src="../assets/zan.png" />
				</p>
			</div>-->
			&nbsp;
		</div>
	</div>
</template>

<script>
	import { Previewer } from 'vux'
	import onerror from '../assets/error.png'
 
	export default {
		data() {
			return {
				onerror:onerror,
				lists:[],
				userHistory: false,
				 imglist: [],
			      options: {
		        getThumbBoundsFn (index) {
		          // find thumbnail element
		          let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
		          // get window scroll Y
		          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
		          // optionally get horizontal scroll
		          // get position of element relative to viewport
		          let rect = thumbnail.getBoundingClientRect()
		          // w = width
		          return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
		          // Good guide on how to get element coordinates:
		          // http://javascript.info/tutorial/coordinates
		        },
		        
		      }
			}
		},
		mounted() {
			if(this.$store.state.productpid!=''){
				this.query()
			}
			
		},
		methods:{
			show (type,index) {
		        this.$refs[type].show(index)
		    },
		    query() {
				this.ajax.QUERY_ORDERCOMMENT({ data: {
					cardProductId: this.$store.state.productpid 
//					cardProductId: 'aaaa' //测试用
				}, showMsg: false }).then((res) => {
					this.log(res.data.obj)
					this.lists=res.data.obj||[]
					 
					this.lists.forEach(obj=>{
						let arr=obj.pictures.split(';')
						let imgArr= arr.map(img=>{
							return {
								src:this.$store.state.imgpath+img,
								 w: 300,
    							 h: 500
							}
						})
						this.imglist=[...this.imglist,...imgArr]
					})
				}).catch(msg => {
					this.log(msg)
				})
			},
		},
		components: {
			Previewer 
		},

	}
</script>
