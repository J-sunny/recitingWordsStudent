import MinRequest from './index.js'

const minRequest = new MinRequest()

// 请求拦截器
minRequest.interceptors.request((request) => {
	// console.log(request)
	const token = uni.getStorageSync('token');
	if (token) {
		request.header["X-Token"] = token;
	} else {

	}
	return request
})

// 响应拦截器
minRequest.interceptors.response((response) => {
	if (response.data.code == 508) {
		uni.redirectTo({
			url: '/pages/view/my/login/index'
		});
	}
	if (response.data.code == 500) {
		uni.redirectTo({
			url: '/pages/view/my/login/index'
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
		// 登录
		loginByAccount(data) {
			return minRequest.get('/loginByAccount', data)
		},
		// 退出登录
		loginOut(data) {
			return minRequest.post('/loginOut', data)
		},
		// 获取用户信息
		getUserInfo(data) {
			return minRequest.get('/getUserInfo', data)
		},
		// 每日一练
		dailyPractice(data) {
			return minRequest.get('/student/main/dailyPractice', data)
		},
		// 获取学校下拉列表
		schoolList(data) {
			return minRequest.get('/schoolList', data)
		},
		// 获取班级下拉列表
		classList(data) {
			return minRequest.get('/classList', data)
		},
		// 查看任务排名
		taskRank(data) {
			return minRequest.get('/student/task/taskRank', data)
		},
	}
}
