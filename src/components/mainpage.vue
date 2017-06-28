<template>
	<div style="text-align:center;">
		<div>
			<swiper auto height="220px" style="width:100%;margin:0 auto;" >
				<swiper-item v-for="(item, index) in activity1"  @click.native="judgeto(item)">
					<img :src="$store.state.imgpath+item.pictureUrl" style="width: 100%;" @error="$event.target.src=onerror">
					<a href="javascript:">
						<div class="vux-img" style=""></div>
						<p class="vux-swiper-desc" style="text-align: left;">{{item.bannerText}}</p>
					</a>
				</swiper-item>
			</swiper>
			<div class="bgimg">
				<div v-show="item.contentimgs.length!=0" v-for="item in activity2" style="">
					<p><span>{{item.titleimg}}</span></p>
					<div class="abc" v-for="subitem in item.contentimgs" @click="to(subitem)">
						<img @error="$event.target.src=onerror" width="100%" :src="$store.state.imgpath+subitem.themePicture" />
						<span style="">{{subitem.themeName}}</span>
					</div>
				</div>
				<div style="height: 50px;">
					&nbsp;
				</div>
			</div>
		</div>
	</div>
</template>
<style lang="less">
	.bgimg {
		margin: -6px 0 0 0;
		padding-top: 5%;
		p {
			width: 90%;
			text-align: left;
			span {
				margin-left: 15px;
			}
		}
		>div {
			display: flex;
			flex-wrap: wrap;
			/*float: left;*/
		}
		.abc {
			flex: 0 44%;
			margin: 3%;
			/*float: left;*/
			img {
				border-radius: 10px;
			}
			span {
				font-size: 14px;
			}
		}
	}
</style>

<script>
	import { XButton, Swiper, SwiperItem } from 'vux'
	import onerror from '../assets/error.png'
	export default {
		name: 'mainpage',
		data() {
			return {
				titleindex: 0,
				onerror: onerror,
				activity1: [{
					url: 'javascript:',
					img: onerror,
					bannerText: ''
				},],
				activity2: [{
						titleimg: '电子卡',
						contentimgs: []
					}, {
						titleimg: '实体卡',
						contentimgs: []
					},

				],
				style: {},
				combiningflag: false,
				index: 0
			};
		},
		mounted() {
			this.getlist()
			this.getbanner()
		},
		methods: {
			judgeto(item){
				if(item.linkType==1){
					//去传入主题id 到商品详情
					this.to(item)
				}else if(item.linkType==2){
					//去传入商品id 到商品详情
					
				}else if(item.linkType==3){
					//去传入href 跳转
					if(item.bannerUrl){
						location.href=item.bannerUrl
					}
					
				}
			},
			to(subitem){
				this.$store.commit({
				  type: 'updateproductid',
//				  productid: subitem.cardThemeId
				  productid: subitem
				})
				this.$router.push({name:'buy'})
			},
			changeSwiper(index) {
				this.titleindex = index
			},
			getlist() {
				this.ajax.QUERY_CARDTHEME({ data: { start: 0, length: 10 }, showMsg: false }).then((res) => {
					res.data.obj.data.map((i) => {
						if(i.cardTypeCode == 1) {
							//实体卡
							this.activity2[1].contentimgs.push(i)
						} else
						if(i.cardTypeCode == 2) {
							this.activity2[0].contentimgs.push(i)
						}
						return []
					})

				}).catch(msg => {

				})
			},
			getbanner() {
				this.ajax.QUERY_CARDBANNER({ data: {}, showMsg: false }).then((res) => {
					this.activity1 = res.data.obj
				}).catch(msg => {

				})
			},
		},

		components: { XButton, Swiper, SwiperItem }
	}
</script>