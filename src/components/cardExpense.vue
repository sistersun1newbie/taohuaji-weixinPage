<template>
  <div style="text-align:center;">
  	 <form-preview v-for="i in 5 " @click.native="$router.push({name:'orderDetail'})" style="margin: 15px 5px;"  header-label="消费金额" header-value="¥20.00" :body-items="list" ></form-preview>
  </div>
</template>



<script>
import { FormPreview , XInput, Group} from 'vux'

export default {
	 data () {
    return {
    	userHistory:false,
    	 list: [{
        label: '兑换类型',
        value: '到店兑换/线上兑换'
      }, {
        label: '卡号',
        value: '12313214'
      }, {
        label: '兑换日期',
        value: '2017年3月10日19:29:13'
      },{
        label: '套餐名称',
        value: 'b套餐'
      },
    	 ],
    }
  },
  mounted () {
  },
  components: {
    FormPreview, XInput, Group
  },
 
}
</script>
