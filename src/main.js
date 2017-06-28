// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './App'
import routes from './router'
import Icon from 'vue-svg-icon/Icon.vue'
import addSvg from './util/addSvg'
import myStore from './store/index'

Vue.use(Vuex)
Vue.use(VueRouter)
import {obj} from './store/axios';

import Promise from 'es6-promise'
import axios from 'axios'
import * as types from './store/type'
import { WechatPlugin } from 'vux'
import  { AlertPlugin } from 'vux'
import  { ToastPlugin } from 'vux'
import  { ConfirmPlugin } from 'vux'
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(WechatPlugin)
Vue.use(ConfirmPlugin)
Vue.prototype.toast = function(Text){
	Vue.$vux.toast.show({
		text: Text,
		position: 'bottom',
		type: 'text',
		width: 'auto'
	})
}

Vue.prototype.ajax = obj
Vue.prototype.log = function(a){
		
	if(process.env.NODE_ENV === 'production'){
	
	}else{
		console.log(a)
	}
	
}

//console.info('路由管理长度',routes.length)
const router = new VueRouter({
	routes
});
['back','push','replace'].forEach(method=>{
	let myMehod=router[method].bind(router)
  router[method]=function(location){
    if(method==='back'){
       store.commit('updateDirection', 'reverse')
    }else{
       store.commit('updateDirection', 'forward')
    }
  	myMehod(location)
  }
})
const store = new Vuex.Store(myStore)

FastClick.attach(document.body)
router.beforeEach(function(to, from, next) {
	// document.title=to.meta.title||'';
	Object.assign(to.meta,to.params,to.query)
	store.commit('updateLoadingStatus', true)
	next()
})

router.afterEach(function(to) {
	store.commit('updateLoadingStatus', false)

})
/* eslint-disable no-new */

window.windowWidth = document.documentElement.clientWidth
window.windowHeight = document.documentElement.clientHeight 

 let vm= new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')


