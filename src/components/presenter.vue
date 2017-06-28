<template>
  <div style="">
  	<div style="background-color: #f7efef; text-align: center;padding:10px 0px 10px;">
  		<img style="margin: 0 auto -10px;position: relative;bottom: 0px;"  @error="$event.target.src=onerror"  :src="$store.state.imgpath+(objinfo&&objinfo.kamian&&objinfo.kamian.pictureUrl)" width="95%" />
  	</div>
  	 <cell style="font-size: 13px;" title="好友1" is-link>
        <img slot="icon" width="40" style="display:block;margin: 0px 15px;border-radius: 7px;border-radius: 50%;" src="../assets/daijinquan_11.png">
      </cell>
  	<x-textarea :max="35" v-model="message" placeholder="填写相关留言"></x-textarea>
  	
  	<ul class="mui-table-view">
			<li class="mui-table-view-cell">
				<p style="font-size: 13px;color: #aaa;">添加图片或视频</p>
				<p>
					<span  v-if="piclist.length!=0">
						<div  v-for="pic in piclist" style="position: relative; margin-right: 20px; display: inline-block;">
							<img    :src='pic' style=" width: 60px;height:60px;display: inline-block ;" />
						</div>
					</span>
					<img src="../assets/imgadd.png" style=" width: 60px;height:60px; display: inline-block" @click="" />
				</p>
			</li>
		</ul>
  	<x-button type="undefind"  @click.native='gift()'  style=";width: 90%;background-color: #f4535b;;padding: 6px; font-size: 16px;color: ;border-radius: none;">  赠  送  </x-button>
  </div>
</template>



<script>
import { XButton,XTextarea,Group, Cell} from 'vux'
import onerror from '../assets/error.png'
export default {
	 data () {
    return {
    	onerror: onerror,
    	userHistory:false,
    	 piclist: [],
    	 message:'',
    	 objinfo:'',
    }
  },
  mounted () {
  	this.objinfo=this.$store.state.buydingdanobj
  },
  methods: {
			del(obj){
				if(obj){
					this.piclist.$remove(obj);
				}
			},
			gift(){
				
				this.ajax.ADD_GIVERECORD({ data: { openId: this.$store.state.openid ,cardId:'',message:this.message,picture:''}, showMsg: false }).then((res) => {
					
				}).catch(msg => {

				})
				
				
				this.$router.replace({ name: "mycard",params:{	id: 3,type: "gift"}  })
			}
		},
  components: {
    XButton,
    XTextarea,
    Group, 
    Cell,
  },
 
}
</script>
<style type="text/css" scoped>
	.mui-table-view-cell {
		position: relative;
		overflow: hidden;
		padding: 0px 15px;
		-webkit-touch-callout: none;
	}
	.mui-table-view-cell {
		position: relative;
		overflow: hidden;
		padding: 0px 15px;
		-webkit-touch-callout: none;
	}
</style>
