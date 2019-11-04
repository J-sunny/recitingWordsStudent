import MinRequest from './index.js'

const minRequest = new MinRequest()

// 请求拦截器
minRequest.interceptors.request((request) => {
	// console.log(request)
	const token = uni.getStorageSync('token');
	if (token) {
		request.header["X-Token"] = token;
	}
	// else {
	// 	uni.redirectTo({
	// 		url: '/pages/view/my/login/index'
	// 	});
	// }
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
	// config.baseURL = 'http://192.168.2.102:8089/backwordSystem'
	config.baseURL = 'http://148.70.55.201:8089/backwordSystem'
	return config
})

export default {
	// 这里统一管理api请求
	apis: {
		// 登录
		loginByAccount(data) {
			return minRequest.post('/loginByAccount', data)
		},
		// 退出登录
		loginOut(data) {
			return minRequest.get('/loginOut', data)
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
		// 获取词库列表
		thesaurusList(data) {
			return minRequest.get('/student/thesaurus/thesaurusList', data)
		},
		// 清除学习记录
		clearThesaurus(data) {
			return minRequest.get('/student/thesaurus/clearThesaurus', data)
		},
		// 修改学习词库
		modifyPlanThesaurus(data) {
			return minRequest.get('/student/thesaurus/modifyPlanThesaurus', data)
		},
		// 修改计划(单词数)
		modifyPlanWords(data) {
			return minRequest.get('/student/thesaurus/modifyPlanWords', data)
		},
		// 获取学生收藏单词列表
		getCollectWordsList(data) {
			return minRequest.get('/student/behaviorRecord/getCollectWordsList', data)
		},
		
		// 获取学生学习信息排行
		getstudentStudyRank(data) {
			return minRequest.get('/student/behaviorRecord/getstudentStudyRank', data)
		},
		// 获取用户学习情况(今日时长,今日单词,总时长,总单词)
		getStudentRecord(data) {
			return minRequest.get('/student/behaviorRecord/getStudentRecord', data)
		},
		/// 获取用户学习时长图表
		getTimeChart(data) {
			return minRequest.get('/student/behaviorRecord/getTimeChart', data)
		},
		/// 获取用户学习单词数图表
		getWordChart(data) {
			return minRequest.get('/student/behaviorRecord/getWordChart', data)
		},
		/// 获取个人任务列表
		taskList(data) {
			return minRequest.get('/student/main/taskList', data)
		},
		/// 获取题目
		getQuestion(data) {
			return minRequest.get('/student/word/getQuestion', data)
		},
		/// 获取单词详情
		getWordInfo(data) {
			return minRequest.get('/student/word/getWordInfo', data)
		},
		// 学生保存或取消收藏单词
		saveOrCancelCollectWords(data) {
			return minRequest.post('/student/behaviorRecord/saveOrCancelCollectWords', data)
		},
		//  修改用户信息
		updatetUserInfo(data) {
			return minRequest.post('/updatetUserInfo', data)
		},
		// 查看任务排名
		taskRank(data) {
			return minRequest.get('/student/task/taskRank', data)
		},
		// 开始学习
		study(data) {
			return minRequest.get('/student/main/study', data)
		},
		// 复习
		review(data) {
			return minRequest.get('/student/main/review', data)
		},
		// 个人任务答题
		completeTask(data) {
			return minRequest.post('/student/task/completeTask', data)
		},
		//获取已签到日期列表(根据年月)
		getSignInList(data) {
			return minRequest.get('/student/behaviorRecord/getSignInList', data)
		},
		// 每日一练完成签到
		signIn(data) {
			return minRequest.post('/student/behaviorRecord/signIn', data)
		},
		// 上传用户头像图片
		uploadFile(data) {
			return minRequest.post('/uploadFile', data)
		},
		// 注册用户信息
		registerUserInfo(data) {
			return minRequest.post('/registerUserInfo', data)
		},
		// 设置学生信息
		setStudentInfo(data) {
			return minRequest.get('/setStudentInfo', data)
		},

	}
}
