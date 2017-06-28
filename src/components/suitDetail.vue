<template>
  <div style="">
  	<img src="../assets/kabao_03_03.png" width="100%" />
  	<p style="padding: 0 15px;">套餐种类：</p>
  	<div style="background-color: #f5f5f5;width: 100%; float: left;">
				<div style="width: 30%;float: left;margin: 2%;">
					<img src="../assets/dingdan_05.png" width="100%" />
				</div>
				<div style="width: 51%;float: left;">
					<p style="padding: 10px 10px; font-size: 14px;">精品五盒装</p>
					<p style="padding: 0px 10px; font-size: 14px;">说明文字</p>
				</div>
				<div style="width: 15%;float: left;text-align: center;padding-top: 10px;">
					<p style="color: red;">¥{{amountMoney}}</p>
					<p style="">x1</p>
				</div>
			</div>
			<p style="padding: 0 15px;">礼盒选择：</p>
  	<div style="background-color: #f5f5f5;width: 100%; float: left;">
				<div style="width: 30%;float: left;margin: 2%;">
					<img src="../assets/dingdan_05.png" width="100%" />
				</div>
				<div style="width: 51%;float: left;">
					<p style="padding: 10px 10px; font-size: 14px;">礼盒版</p>
					<p style="padding: 0px 10px; font-size: 14px;">桃花姬旗舰店桃花asas姬旗舰店桃花姬旗舰店桃花姬旗舰店桃花姬旗舰店桃花姬旗舰店</p>
				</div>
				<div style="width: 15%;float: left;text-align: center;padding-top: 10px;">
					<p style="color: red;">¥0</p>
					<p style="">x1</p>
				</div>
			</div>
			<div style="background-color: #f5f5f5;width: 100%; float: left;margin-top: 15px;">
				<div style="width: 100%;float: right;padding-right: 15px;">
					<p style="color: red;float: right;">共计:&nbsp;&nbsp;&nbsp;¥154</p>
				</div>
			</div>
			<div>&nbsp;</div>
			<div style="position: relative;margin-top: 20px;">
				<x-button @click.native='$router.push({name:"paySuccess"})' plain type="undefind" style="position: absolute;bottom: 0px;right:10%;width: 80%;background-color: #f4535b; font-size: 14px;color: #FFFFFF  border: 1px solid #f4535b">立即购买</x-button>
			</div>
</div>
</template>



<script>
import { FormPreview ,XButton} from 'vux'

export default {
	 data () {
    return {
    	userHistory:false,
    	 list: [{
        label: '商品',
        value: '桃花姬'
      }, {
        label: '交易时间',
        value: '2017年3月7日20:07:07'
      }, {
        label: '交易方式',
        value: '微信付款'
      },{
        label: '交易单号',
        value: '12312312312'
      }],
      buttons1: [{
        style: 'primary',
        text: '送给朋友',
         link: '/presenter',
      }, {
        style: 'default',
        text: '完成',
        link: '/'
      }],
    }
  },
  mounted () {
  },
  components: {
    FormPreview,XButton
  },
 
}
</script>
