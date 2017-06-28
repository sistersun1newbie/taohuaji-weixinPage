<template>
	<div style="color: #333; font-size: 13px;">
		<!-- -->
		<div v-show="list.length==0" style="text-align: center;background: white;padding: 10px;">
			暂无发票
		</div>
		<div v-for="(item,index) in list" style="margin-bottom: 10px;">
			<cell style="font-size: 14px; " @click.native='updata(item)' :title="item.invoiceTypeCode==0?'普通发票':'增值税发票'" :inline-desc="item.invoiceHead"  is-link>
				<div slot="child" style="left: 30%;top: 10px;position: absolute;">
					发票抬头：{{item.invoiceHeadType}}
				</div>
			</cell>
			<div style="width: 100%;">
				<hr style="text-align: center;margin: 0px auto 10px;" width="99%" color="#ddd" SIZE=1 />
				<div @click.stop='remove(item,index)'>
					<x-button mini plain type="undefind" style="float: right;padding:0px 7px;margin:0px 10px 0 0;background-color: #FBF9FE; font-size: 14px;color: #333; border: 0px solid #f4535b">删除</x-button>
					<img width="25" style="float: right ;" src="../assets/delete.png" />
				</div>
				<div @click='updata(item)'>
					<x-button mini plain type="undefind" style="padding:0px 7px;float: right;margin:0px 10px 0 0;background-color: #FBF9FE; font-size: 14px;color:#333; border: none">编辑</x-button>
					<img width="25" style="float: right ;" src="../assets/edit.png" />
				</div>
				<div class=" weui-cells_checkbox" >
					<label class="weui-cell weui-check__label" :for="index" >
				        <div class="weui-cell__hd" ><!--@click="back(item)"-->
				            <input type="radio" class="weui-check" v-if='backflag!=1' name="checkbox1"  :id="index"   v-model='invoice1'   :value='item' ><!--value===index-->
				            <input type="radio" class="weui-check"  v-else name="checkbox1"  :id="index"   v-model='invoice'   :value='item' ><!--value===index-->
				            <i class="weui-icon-checked"></i>
				        </div>
				        <div class="weui-cell__bd">
				            <p>{{(backflag!=1)?'选择':(((item&&item.invoiceId)==(invoice&&invoice.invoiceId))?'默认':'设为默认')}}</p>
				        </div>
				    </label>
				</div>
				<hr v-show="index!=list.length-1" style="text-align: center;margin: 0px auto" width="99%" color="#ddd" SIZE='15' />
				<!--<checklist title="" :options="list1" v-model="value" @click.native="test(item,'contextchecklist')" :max=1></checklist>-->
			</div>
		</div>
		<div style="position: relative;text-align: center;top: 80px;">
			<x-button @click.native='pushseq()' plain type="undefind" style="position: absolute; margin: 20px auto;bottom: 0px;right:10%;width: 80%;background-color: #f4535b; font-size: 14px;color: #FFFFFF  border: 1px solid #f4535b">添加</x-button>
		</div>
	</div>
</template>

<script>
	import { Cell, Group, XButton, Radio, Checklist } from 'vux'

	export default {
		data() {
			return {
				list: [],
				flag:false,
				invoice:null,
				invoice1:null,
				backflag:sessionStorage.backflagInvoice||0
			}
		},
		created() {
			this.getlist()
//			this.log(this.list.length+" = ")
		},
		watch:{
			invoice(item,old){
				this.log((old&&old.invoiceId)===(item&&item.invoiceId))
				this.log(item&&item.invoiceId)
				
				if(old===null) return ;
				if((old&&old.invoiceId)===(item&&item.invoiceId)) return ;
				this.log(item)
				this.ajax.UPDATE_INVOICE({
					data: {
						openId:item.openid,
						invoiceId:item.invoiceId,
						isDefault: 1,
					}
					}).then((res) => {
						if(this.$store.uptempinvoice||this.$store.uptempinvoice==undefined){
							this.$store.commit({
							  type: 'uptempinvoice',
							  tempinvoice: item
							})
							localStorage.defaultinvoice=JSON.stringify(item)
							this.getlist()
						}
				}).catch(msg => {
					this.log(msg)
				})
			},
			invoice1(item,old){
				if(this.backflag!=1){
					localStorage.defaultinvoice=JSON.stringify(item)
					this.$router.back()
				}
				this.log(item)
			}
		},
		beforeRouteLeave (to, from, next) {
		    // 导航离开该组件的对应路由时调用
		    // 可以访问组件实例 `this`
//		    to.params={temp:this.temp}
			to.params.tempinvoice=this.invoice1
		    this.log(to.params)
		    if(to.name!='invoice'){
		    	sessionStorage.removeItem('backflagInvoice');
		    }
		    next()
		 },
		methods: {
			getlist(){
				this.ajax.QUERY_INVOICE({data:{ openId: this.$store.state.openid },showMsg:false}).then((res) => {
//					console.log(res.data)
					this.list = res.data.obj||[];
					this.invoice=this.list.filter(obj=>obj.isDefault===1)[0]||null
					 if(this.invoice)localStorage.defaultinvoice=JSON.stringify(item)
				}) 
			},
			pushseq(){
				let seq=0
				if(this.list.length!=0){
					seq=this.list[this.list.length-1].seq+1
				}
				
				this.$router.push({name:"invoice",params:{seq:seq} })
			},
			updata(item) {
				this.$router.push({ name:"invoice",params:{item:item} })
			},
			remove(item, index) {
				let self = this
				this.$vux.confirm.show({
					// 组件除show外的属性
					contacts: '提醒',
					content: '确定要删除吗？',
					onCancel() {},
					onConfirm() {
						self.ajax.DELETE_INVOICE({data:{
							openId: self.$store.state.openid,
							invoiceId: item&&item.invoiceId,
						}}).then((res) => {
							self.list.splice(index, 1);
//							localStorage.defaultinvoice=null;
							var localDefaultInvoice = localStorage.defaultinvoice && JSON.parse(localStorage.defaultinvoice);
							if (localDefaultInvoice && item.invoiceId == localDefaultInvoice.invoiceId) {
								localStorage.removeItem("defaultinvoice");
							}
						}).catch(msg => {
							
						})
					}
				})
			},
		},
		components: {
			Cell,
			Group,
			XButton,
			Radio,
			Checklist
		},

	}
</script>

<style>
	.weui-btn:after {
		border: none
	}
</style>