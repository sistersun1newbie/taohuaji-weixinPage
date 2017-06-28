<template>
    <div style="color: #333; font-size: 13px;">
        <div v-show="list.length==0" style="text-align: center;background: white;padding: 10px;">
            暂无收获地址

        </div>
        <div v-for="(item,index) in list" style="margin-bottom: 10px;">
            <cell @click.native='updata(item)' :title="item.contacts" :inline-desc="item.detailAddress">
                <div slot="child" style="right: 15px;top: 10px;position: absolute;">{{item.phone}}</div>
                <div slot="default" style="float: right;margin-left: 5px;">
                </div>
            </cell>
            <div style="width: 100%;">
                <hr style="text-align: center;margin: 0px auto 10px;" width="99%" color="#ddd" SIZE=1 />
                <div @click.stop='remove(item,index)'>
                    <x-button mini plain type="undefind"
                              style="float: right;padding:0px 7px;margin:0px 10px 0 0;background-color: #FBF9FE; font-size: 14px;color: #333; border: 0px solid #f4535b">
                        删除
                    </x-button>
                    <img width="25" style="float: right ;" src="../assets/delete.png"/>
                </div>
                <div @click='updata(item)' v-if="!$route.params.order">
                    <x-button mini plain type="undefind"
                              style="padding:0px 7px;float: right;margin:0px 10px 0 0;background-color: #FBF9FE; font-size: 14px;color:#333; border: none">
                        编辑
                    </x-button>
                    <img width="25" style="float: right ;" src="../assets/edit.png"/>
                </div>
                <div class=" weui-cells_checkbox">
                    <label class="weui-cell weui-check__label" :for="index">
                        <div class="weui-cell__hd">
                            <input type="radio" class="weui-check" v-if='flag!=1' name="checkbox1" v-model='address1'
                                   :value='item' :id="index">
                            <input type="radio" class="weui-check" v-else name="checkbox1" v-model='address'
                                   :value='item' :id="index"><!--value===index-->
                            <i class="weui-icon-checked"></i>
                        </div>
                        <div class="weui-cell__bd">
                            <p>
                                {{(flag != 1) ? '选择' : (((item && item.addressId) == (address && address.addressId)) ? '默认' : '设为默认')}}</p>
                        </div>
                    </label>
                </div>
                <hr v-show="index!=list.length-1" style="text-align: center;margin: 0px auto" width="99%" color="#ddd"
                    SIZE='15'/>
            </div>
        </div>
        <div style="position: relative;text-align: center;top: 80px;">
            <x-button @click.native='pushseq()' plain type="undefind"
                      style="position: absolute; margin: 20px auto;bottom: 0px;right:10%;width: 80%;background-color: #f4535b; font-size: 14px;color: #FFFFFF  border: 1px solid #f4535b">
                添加收货地址
            </x-button>
        </div>
    </div>
</template>

<script>
	import {Cell, Group, XButton, Radio, Checklist} from 'vux'
	export default {
		data() {
			return {
				list: [],
				address: null,
				address1: null,
				flag: sessionStorage.backflag || 0
			}
		},
		mounted() {
			this.log("this.$route.params.backflag")
			this.log(this.$route.params.backflag == 1)
//			if(this.$route.params.backflag!==1){
//				sessionStorage.backflag=1
//			}
			this.getlist()
		},
		watch: {
			address(item, old){
				if (old === null) return;
				if ((old && old.addressId) === (item && item.addressId)) return;
				this.log(item)
				this.ajax.UPDATE_ADDRESS({
					data: {
						addressId: item.addressId,
//						openId:item.openid,
						isDefault: 1,
					}
				}).then((res) => {
					if (this.$store.tempaddressobj || this.$store.tempaddressobj == undefined) {
						this.$store.commit({
							type: 'uptempaddressobj',
							tempaddressobj: item
						});
						localStorage.defaultaddress = JSON.stringify(item);
						for (var i = 0; i < this.list.length; i++) {
                            if(item.addressId == this.list[i].addressId){
	                            this.list[i].isDefault = 1;
                            } else if(old.addressId == this.list[i].addressId){
	                            this.list[i].isDefault = 2;
                            }
						}
					}
				}).catch(msg => {
					this.log(msg)
				});
			},
			address1(item, old){
				if (this.flag != 1) {
//					alert(123123123)
					localStorage.defaultaddress = JSON.stringify(item);
//					marginAddress
//
//					this.$store.commit({
//						type: 'updateMonthId',
//						obj: item
//					})
					this.$router.back()
				}
				this.log(item)
			}
		},
		beforeRouteLeave (to, from, next) {
			// 导航离开该组件的对应路由时调用
			// 可以访问组件实例 `this`
			// to.params={temp:this.temp}
			to.params.tempaddress = this.address1
			this.log(to.params)
			if (to.name != 'addAddress') {
				sessionStorage.removeItem('backflag');
			}
			next()
		},
		methods: {
			getlist(){
				this.ajax.QUERY_ADDRESS({data: {openId: this.$store.state.openid}, showMsg: false}).then((res) => {
					this.list = res.data.obj || [];
					this.address = this.list.filter(obj => obj.isDefault === 1)[0]
				}).catch(msg => {
					this.log(msg)
				})
			},
			pushseq(){
				let seq = 0
				if (this.list.length != 0) {
					seq = this.list[this.list.length - 1].seq + 1
				} else {
					seq = 1
				}
				this.$store.commit({
					type: 'temptoaddressobj',
					temptoaddressobj: ''
				})
				this.$store.commit({
					type: 'updatetitlename',
					titlename: ''
				})
				this.$router.push({name: "addAddress", params: {seq: seq}})
			},
			updata(item) {
				this.$store.commit({
					type: 'temptoaddressobj',
					temptoaddressobj: item
				})
				this.$store.commit({
					type: 'updatetitlename',
					titlename: '编辑收货地址'
				})
				this.$router.push({name: "addAddress"})
			},
			remove(item, index) {
				let self = this
				this.$vux.confirm.show({
					contacts: '提醒',
					content: '确定要删除吗？',
					onCancel() {
					},
					onConfirm() {
						self.ajax.DELETE_ADDRESS({
							data: {
								openId: self.$store.state.openid,
								addressId: item.addressId || '',
							}
						}).then((res) => {
//							self.list.splice(index, 1)
							self.getlist()
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