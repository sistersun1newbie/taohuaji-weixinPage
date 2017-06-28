<template>
  <div style="">
  	<div style="height: 1px;">&nbsp;</div>
  	<group>
  		<cell style="margin: 15px auto;" class="sml" title="发票类型 " >
  		<div slot="after-title">
  			    <checker style="margin: 10px auto;" v-model="invoiceTypeCode"
				    default-item-class="demo5-item"
				    selected-item-class="demo5-item-selected"  >
				      <checker-item v-for="i in invoiceType"  :key="i" :value="i">{{i}}</checker-item>
				    </checker>
  		</div>
  	</cell>
  	<cell style="margin: 0px auto;" class="sml" title="发票抬头" >
  		<div slot="after-title">
  			 <checklist v-for="item in commonList" title="" :options="[item]" v-model="invoiceHeadType" @click.native="test(item,'invoiceHeadType')" :max=1></checklist>
  			 <x-input v-if="invoiceHeadType.indexOf('公司')>-1" placeholder="请输入公司名" v-model="invoiceHead"></x-input>
  		</div>
  	</cell>
  	
  </group>
  	<x-switch title="设为默认发票" v-model="isDefault"></x-switch>
			<div style="position: relative;margin-top: 50px;">
				<x-button @click.native='addinvoice()' plain type="undefind" style="position: absolute;bottom: 0px;right:10%;width: 80%;background-color: #f4535b; font-size: 14px;color: #FFFFFF  border: 1px solid #f4535b">{{buttonName}}</x-button>
			</div>
  </div>
</template>



<script>
import { XButton,XInput, Group,Cell,Checklist,Radio, Checker,XSwitch,CheckerItem} from 'vux'

export default {
	 data () {
    return {
    	invoiceType:["普通发票","增值税发票"],
    	invoiceTypeCode:'普通发票',
	  	commonList: [ '个人', '公司'],
	   	invoiceHeadType: [ '个人' ],
	   	
	   	invoiceHead:'',
	   	buttonName:'新增',
	   	isDefault:false,
	   	 
    }
  },
  mounted () {
  	let m=this.$route.params.item
			if(m){
				this.contacts=m.contacts;
				this.phone=m.phone;
				this.detailAddress=m.detailAddress;
				this.buttonName='修改';
				this.isDefault=m.isDefault==2?false:true
				this.invoiceHead = m.invoiceHead;
				this.invoiceHeadType =[m.invoiceHeadType];
				this.invoiceTypeCode =m.invoiceTypeCode==0?"普通发票":"增值税发票"
				this.isDefault=m.isDefault==2?false:true
			}
			
  },
  methods:{
  	test(item,variate){
  		 
  		this[variate]=[]
  		this[variate].push(item)
  	},
  	addinvoice(){
//		console.log("this.invoiceHead",this.invoiceHead===null)
//		console.log("this.invoiceHeadType[0]",this.invoiceHeadType[0]=='公司')
  			if((this.invoiceHead===null||this.invoiceHead==='')&&this.invoiceHeadType[0]==='公司'){
					this.toast('公司名称不能为空！')
					return ;
				}
				if( this.invoiceHeadType[0]=='个人') this.detailAddress=''
				if(this.$route.params.item){
					this.ajax.UPDATE_INVOICE({
					data: {
						invoiceId:this.$route.params.item.invoiceId,
						
						openId: this.$store.state.openid,
						invoiceTypeCode: this.invoiceTypeCode=='普通发票'?0:1,
						invoiceHeadType: this.invoiceHeadType[0],
						invoiceHead: this.invoiceHead,
						phone: '2',
						email: '3',
						detailAddress: this.detailAddress,
						seq: this.$route.params.seq,
						isDefault: this.isDefault==false?'2':'1',
					}
				}).then((res) => {
					if(this.isDefault=='1'){
						 let obj = JSON.parse(localStorage.defaultinvoice||{})
						 obj.invoiceTypeCode=this.invoiceTypeCode=='普通发票'?0:1,
						 obj.invoiceHeadType=this.invoiceHeadType[0]
						 obj.invoiceHead=this.invoiceHead
						 obj.detailAddress=this.detailAddress
						 localStorage.defaultinvoice=JSON.stringify(obj)
					}
						this.$router.back()
				}).catch(msg => {
				})
					return ;
				}
				this.log(this.$route.params.seq!=null||this.$route.params.seq!=undefined)
				if(this.$route.params.seq!=null||this.$route.params.seq!=undefined){
					this.ajax.ADD_INVOICE({
					data: {
						openId: this.$store.state.openid,
						invoiceTypeCode: this.invoiceTypeCode=='普通发票'?0:1,
						invoiceHeadType: this.invoiceHeadType[0],
						invoiceHead: this.invoiceHead,
						phone: '',
						email: '',
						detailAddress: this.detailAddress,
						seq: this.$route.params.seq,
						isDefault: this.isDefault==false?'2':'1',
					}
					}).then((res) => {
						this.$router.replace({ name: "managerInvoice" })
					}).catch(msg => {
						this.log(msg)
					})
				}
			},
  },
  components: {
    XButton, XInput, Group,Cell,Checklist,Radio, 
    Checker,XSwitch,
    CheckerItem,
  },
}
</script>

<style lang="css" scoped>
label.weui-check_label{
	font-size: 14px;
}
	.demo5-item {
  width: 100px;
  height: 26px;
  line-height: 26px;
  text-align: center;
  border-radius: 3px;
  border: 1px solid #ccc;
  background-color: #fff;
  margin-right: 6px;
}
.demo5-item-selected {
  background: #ffffff url(../assets/active.png) no-repeat right bottom;
  border-color: #ff4a00;
}
</style>
