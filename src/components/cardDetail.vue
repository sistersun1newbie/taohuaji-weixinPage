<template>
  <div style="text-align:center;">
  	<div   style="position:relative">
		   <img width="100%" src="../assets/kaquan.png" />
		   <div style="position:absolute; left:0; top:0%;"  @click="$router.push({name:'qrcode'})">
		   	
		   	<div style="width: 30%;float: left;margin: 7% 2% ;">
					<img src="../assets/taohuaji_02.png" style="" width="100%" />
				</div>
				<div style="width: 66%;float: left;">
					<div style="color:white;font-size: 22px;padding: 36px 3px;float: left;">300gx2礼卡</div>
				</div>
		   </div>
		   <div style=" position:absolute;left:0;background: rgba(0,0,0,0.0); bottom:25%;width: 100%; float: left;margin: 10px 0px;">
				<p style=" font-size: 13px;color: #333;padding-right: 5%;padding-left: 5%;">
				<span style="float: left;">桃花姬</span>
				<span style="float: right;">有效期至2017年3月14日15:32:08</span> 
				</p>
			</div>
			 <div style="position:absolute;left:0; bottom:-20%;width:40%;background-color: #f5f5f5;width: 100%; float: left;margin: 10px 0px;">
				<div class="weui-form-preview__ft">
					<a href="javascript:" @click="$router.push({name:'neighborStore'})" class="weui-form-preview__btn weui-form-preview__btn_primary">门店自取</a>
					<a href="javascript:" @click="$router.push({name:'managerAddress'})" class="weui-form-preview__btn weui-form-preview__btn_primary">线上邮递</a>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
import { FormPreview , XInput, Group,XButton} from 'vux'

export default {
	 data () {
    return {
    	userHistory:false,
    	 list: [],
      buttons1: [{
        style: 'primary',
        text: '门店自提',
         link: '/neighborStore',
      }, {
        style: 'primary',
        text: '线上邮递',
        link: '/managerAddress'
      }],
    }
  },
  mounted () {
  },
  components: {
    FormPreview, XInput, Group,XButton
  },
 
}
</script>
