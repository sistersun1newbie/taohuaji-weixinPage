<template>
  <div>
  	<div style="width: 100%;background-color: #f3edee;">
  		<img style="" width="20" src="../assets/daijinquan_11.png" />
  		<span style="font-size: 13px;" >
			xx的共享
		</span>
  	</div>
  	<div style="margin: 0 auto; width:90%;">
		<div style="text-align: center;">
			<p v-for="i in destextobj"><span :style="i.styles">{{i.text}}</span></p>
		</div>
		<x-button @click.native='$router.push({name:"qrcode"})' plain type="undefined" style="width: 80%; font-size: 14px;bottom: 5px;margin-top: 10px;border;color: white;background-color: #fb6d7f;  border: 1px solid #fb6d7f">立即使用</x-button>
		<div style="margin: 20px auto;">
			<p v-for="i in 2" style="font-size: 13px;">
				<span style="font-weight: bold;">使用方法：</span>
				啊实打实啊实打实啊实打实啊实打实啊实打实啊实打实啊实打实
			</p>
		</div>
		
		<img src="../assets/daijinquan_14.png" width="100%" />
		
	</div>
	<group >
      <cell v-for="i in callobj" :title="i.title" style="font-size: 13px;"   @click.native=""  is-link>
      </cell>
    </group>
  </div>
</template>

<script>
import {Cell, Group,XButton	} from 'vux'
export default {
  name: 'yaoyiyao',
  data () {
    return {
    	destextobj:[
    	{
    		text:'桃花姬',
    		styles:{
			"font-size": '12px',
			"color": '#a09b9b',
    		}
    	},
    	{
    		text:'全场满90减10',
    		styles:{
			"font-weight": 'bold',
			"font-size": '15px',
    		}
    	},
    	{
    		text:'请到店内使用',
    		styles:{
			"font-size": '12px',
			"color": '#fb6d7f',
    		}
    	},
    	],
    	callobj:[
    	{
    		title:"关注公众号",
    	},
    	{
    		title:"附近门店",
    	},
    	{
    		title:"开通会员",
    	},
    	]
    	
    }
  },
  mounted () {
  	
  },
    methods: {
      yao(e){
      	
      }
    },
    components:{
      XButton,
      Cell, Group,
    }
};
</script>

<style lang="css" scoped>

</style>