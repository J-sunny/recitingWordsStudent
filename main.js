import Vue from 'vue'
import App from './App'
// import 'pages/style/init.css'


import MinRequest from './request/index'
import minRequest from './request/api'
Vue.use(MinRequest)

// 不能用
// import Toast from '@/wxcomponents/vant-weapp/dist/toast/toast';
// Vue.component('toast',Toast)




Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
	...App,
	minRequest,
	// Toast
})
app.$mount()
