import MinRequest from './index.js'

const minRequest = new MinRequest()

// 请求拦截器
minRequest.interceptors.request((request) => {
	// console.log(request)
	const token = uni.getStorageSync('token');
	if (token) {
		request.header["X-Token"] = token;
	}
	else{
		
	}
	return request
})

// 响应拦截器
minRequest.interceptors.response((response) => {
	// console.log(response.status)
	if (response.status == 100) {
		uni.redirectTo({
			url: '/pages/view/login/index'
		});
	}
	return response.data
})

// 设置默认配置
minRequest.setConfig((config) => {
	config.baseURL = 'http://192.168.2.167:8089/backwordSystem'
	return config
})

export default {
	// 这里统一管理api请求
	apis: {
		// 单日任务详情列表
		dayOfMissionList(data) {
			return minRequest.get('/teacher/main/dayOfMissionList', data)
		},
		// 获取任务日历数据
		taskCalendar(data) {
			return minRequest.get('/teacher/main/taskCalendar', data)
		},
		// 登录
		loginByAccount(data) {
			return minRequest.get('/loginByAccount', data)
		},
		// 退出登录
		loginOut(data) {
			return minRequest.get('/loginOut', data)
		},
		// 获取用户信息
		getUserInfo(data) {
			return minRequest.get('/getUserInfo', data)
		},
	}
}
