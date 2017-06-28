<template>
    <div>
        <div style="height: 1px;">&nbsp;</div>
        <group style="">
            <popup-picker style="font-size: 15px;" v-show="!value&&$store.state.card.cardType!=='礼卡'" :title="title1"
                          :data="list1" v-model="value1"></popup-picker>
            <cell v-show="item.detailAddress=='undefined'||item.detailAddress==null"
                  style="font-size: 15px;text-align: center;" title="" inline-desc="暂无绑定地址" @click.native="goto()"
                  is-link>
            </cell>

            <cell v-show="!(item.detailAddress=='undefined'||item.detailAddress==null)||$route.params.MonthId"
                  style="font-size: 15px;" title="收件地址：" :inline-desc="item.detailAddress" @click.native="goto(true)"
                  is-link>
                <div slot="child" style="font-size: 13px;left: 30%;top: 10px;position: absolute;">
                    {{item.contacts || '' + '(' + item.phone + ')'}}
                </div>
            </cell>
            <x-input v-show="!value&&$store.state.card.cardType!=='礼卡'" title="发货数量" type="number" v-model="amount"
                     placeholder="请输入发货数量">
                <span slot="label" style="margin-right: 3em;">发货数量</span>
            </x-input>
            <x-input title="用户备注" v-model="remark" placeholder="请输入">
                <span slot="label" style="margin-right: 3em;">用户备注</span>
            </x-input>
            <div style="width: 90%;padding-left: 10px;margin:8px 5px;">
                <p style="font-size: 15px;">说明：</p>
                <p style="font-size: 13px;color: red;line-height: 20px;">
                    
                    <!--&emsp;&emsp;1、每月选定日为您寄出300g桃花姬阿胶糕1盒 ，如需修改，请至“个人中心--修改预定日期”中；<br> &emsp;&emsp;2、如需增加订单，请在‘个人中心-增加预约’中追加，每月可追加3单，取完为止；-->
                    <span v-if="!(!value&&$store.state.card.cardType!=='礼卡')"> 
                    	发货时间：<br/>
                    	&emsp;&emsp;次日发货，法定节假日顺延；<br/>
                    </span>
                    <span v-else>
                    	发货时间：<br/>
						&emsp;&emsp;1、根据您设置的“月度发货日”，每月定期寄送真颜阿胶糕200g1盒 ；<br> 
						&emsp;&emsp;2、如需增加预约数量，请在“兑换”中选定相应“年卡”手动追加订单；<br/>
						&emsp;&emsp;3、每月可最多追加3盒，卡内余额发完为止；<br/>
						发货地址：<br/>
						&emsp;&emsp;以您设置的“月度默认发货地址”为准，如需修改请至“我的-我的信息-地址管理”；
					</span>
                    <br/>
                    发货查询及修改：<br/>
                    &emsp;&emsp;请至“我的-兑换记录”。
					
					<!--<br> &emsp;&emsp;3、产品收货：按照预定日期发货（当月订单最早可选次日发出），预计省内发货日期次日达，省外隔日达，请关注运单号短信提示；
					<br> &emsp;&emsp;4、增加预约日期菜单，预约日期为2号至28号。300g*12的套餐为年卡，每个月1号凌晨，系统根据用户设置的默认地址和预提日期自动创建订单。
					<br> &emsp;&emsp;5、每月1号至实际发货前一天允许修改订单，实际发货前一天上午9点系统自动发送短信，提醒确认订单，发货当天不允许修改订单。-->
                </p>
            </div>
        </group>
        <x-button type="undefind" @click.native="addorupdate()"
                  style="margin-top:20px; width: 90%;background-color: #f4535b; font-size: 16px;color: ;border-radius: none;">
            提交
        </x-button>
    </div>
</template>
<script>
	import {Cell, Group, XButton, PopupPicker, XInput} from 'vux'
	let list = []
	for (let i = 2; i < 29; i++) {
		list.push(i)
	}
	import goodsimg from '../assets/taohuaji_02.png'
	import backimg1 from '../assets/kaquan4_01.png'
	export default {
		data() {
			return {
				value: false,
				item: this.$route.params.tempaddress || localStorage.defaultaddress || {},//地址绑定
				itemObj: {},//日期大对象绑定
				title1: '预约发货日期',
				list1: [list],
				value1: ['2'],
				amount: 1,
				remark: '',
			}
		},
		created() {
			if (localStorage.defaultaddress) {
				let address = JSON.parse(localStorage.defaultaddress);
				this.$store.state.MonthId.addressId = address.addressId;
				this.$store.state.MonthId.province = address.province;
				this.$store.state.MonthId.city = address.city;
				this.$store.state.MonthId.country = address.country;
				this.$store.state.MonthId.detailAddress = address.detailAddress;
				this.$store.state.MonthId.phone = address.phone;
				this.$store.state.MonthId.contacts = address.contacts;
			}
			if (this.$route.query.MonthId) {


				this.item = this.$store.state.MonthId
				if (this.item.shipmentsCount) this.amount = this.item.shipmentsCount
				if (this.item.day) this.value1 = [this.item.day]

				this.remark = this.$route.query.remark;
			} else {
				this.query()
			}
		},

		beforeRouteEnter (to, from, next) {
			next(vm => {
				// 通过 `vm` 访问组件实例
				if (from.name == 'managerAddress') {
					vm.amount = sessionStorage.amount;
					vm.value1 = JSON.parse(sessionStorage.value1)
				} else {
					localStorage.exflag = vm.$route.params.exflag || ''
				}
			})

		},
		methods: {
			goto(flag = false){
				sessionStorage.value1 = JSON.stringify(this.value1);
				sessionStorage.amount = this.amount;
				this.$router.push({name: 'managerAddress', params: {order: flag}})
			},
			query() {
				this.ajax.QUERY_DATAINFO({data: {openId: this.$store.state.openid}, showMsg: false}).then((res) => {
					this.log((res.data.obj && res.data.obj.wechatUserAddress) == null)

					this.item = res.data.obj && res.data.obj.wechatUserAddress || {};
					this.itemObj = res.data.obj;
					this.value1 = []
					this.value1.push(res.data.obj && res.data.obj.aggredDate || '2')
					if (this.$route.params.tempaddress != '' && this.$route.params.tempaddress != undefined) {
						this.item = this.$route.params.tempaddress
					}

				}).catch(msg => {
					this.log(msg)
				})
			},
			showConfirm (msg) {
				let self = this
				this.$vux.alert.show({
					title: '成功',
					content: msg || '',
					onShow () {
					},
					onHide () {
						self.$router.back()
					}
				})
			},
			addorupdate() {
				this.log(localStorage.exflag)
				if (this.item.detailAddress == 'undefined' || this.item.detailAddress == null) {
					this.toast('暂无绑定地址')
					return;
				}
				if (!(this.remark.length < 100)) {
					this.toast('备注过长。')
					return;
				}

				if (this.$store.state.card.cardType == '礼卡' && localStorage.exflag && localStorage.exflag == 'true') {
					this.log("礼卡===")
					this.ajax.ADD_CARDTHEME({
						data: {
							openId: this.$store.state.openid,
							cardId: this.$store.state.card && this.$store.state.card.cardId || '',
							addressId: this.item.addressId,
							exchangeType: 'mailing',//day:this.value1[0],
							province: this.item.province,
							city: this.item.city,
							country: this.item.country,
							detailAddress: this.item.detailAddress,
							phone: this.item.phone,
							remark: this.remark,
							contacts: this.item.contacts
						}
					}).then((res) => {
						this.reloadCard();
						this.showConfirm(res.data.description)
					}).catch(msg => {

					})
				} else if (this.$store.state.card.cardType == '年卡' && localStorage.exflag && localStorage.exflag == 'true') {
					this.log("年卡===")
					this.ajax.ADD_PROINFO({
						data: {
							openId: this.$store.state.openid,
							cardId: this.$store.state.card && this.$store.state.card.cardId || '',
							addressId: this.item.addressId, day: this.value1[0], exchangeType: 'mailing',
							province: this.item.province, city: this.item.city, country: this.item.country,
							detailAddress: this.item.detailAddress, phone: this.item.phone,
							shipmentsCount: this.amount,
							remark: this.remark, contacts: this.item.contacts
						}
					}).then((res) => {
						this.reloadCard();
						this.showConfirm(res.data.description)
					}).catch(msg => {

					})

				} else {
					this.log("更新===")
					this.log(this.$store.state.MonthId.exchangeMonthId)
					this.ajax.UPDATE_CARDEXCHANGE({
						data: {
							exchangeMonthId: this.$store.state.MonthId.exchangeMonthId,
							province: this.item.province, city: this.item.city, country: this.item.country,
							detailAddress: this.item.detailAddress, phone: this.item.phone,
							contacts: this.item.contacts,
							day: this.value1[0], shipmentsCount: this.amount || 0,
							remark: this.remark, contacts: this.item.contacts
						}
					}).then((res) => {
						this.reloadCard();
						this.showConfirm(res.data.description)
//						this.$router.back()
					}).catch(msg => {

					})
				}
			},
			reloadCard(){ //更新成功后，重新加载卡片信息
				var cardId = this.$store.state.card.cardId;
				this.ajax.QUERY_CARD_ENTITY_DETAIL({
					data: {openId: this.$store.state.openid, cardId: cardId},
					showMsg: false
				}).then((res) => {
					let newInfo = res.data.obj||{availableCount:0};
					let cardInfo = this.$store.state.card;
					cardInfo.availableCount = newInfo.availableCount;
					this.$store.commit({
						type: 'updatecardobj',
						obj: cardInfo
					})
				}).catch(msg => {

				})
			}
		},
		components: {
			Cell,
			Group,
			XButton,
			PopupPicker,
			XInput
		},
	}
</script>
<style lang="css" scoped>

</style>