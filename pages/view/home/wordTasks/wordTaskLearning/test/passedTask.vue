<template>
	<view class="passedBox">
		<!-- 头部 -->
		<view class="headBox">
			<view class="headTitle">单词任务测试</view>
			<van-icon @tap='goBack()' class='headArrow' name="arrow-left" />
		</view>
		<!-- 内容 -->
		<view class="passedConBox">
			<view class="passedWords"><label for="" class="orangeColor">{{wordCount}}</label><label for="" class="word">单词</label></view>
			<view class="passedTask">当前任务已通过测试</view>
			<view class="useTime">用时：{{time}}</view>
			<!-- 查看排行 -->
			<view class="viewRanking" @click="viewRanking()">查看排行</view>
			<!-- 返回任务列表 -->
			<view class="back" @click="back()">返回任务列表</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				wordCount: '',
				time: '',
				wordId: ''
			}
		},
		methods: {
			// 返回
			goBack() {
				uni.reLaunch({
					url: '../../../index'
				});
			},
			// 查看排行跳转
			viewRanking() {
				uni.navigateTo({
					url: '../../viewRanking/index?&taskId=' + getApp().globalData.taskId
				})
			},
			// 返回任务列表跳转
			back() {
				uni.navigateTo({
					url: '../../../wordTasks/index'
				})
			},
			// 个人任务答题

			completeTask(time, wordId) {
				this.$minApi.completeTask({
					completeTime: time,
					taskId: getApp().globalData.taskId,
					wordId: wordId
				}).then(data => {
					console.log(data)
				})
			},
			// 保存用户学习记录
			save(taskType, studyType, lengthOfStudy) {
				console.log(taskType)
				console.log(studyType)
				console.log(lengthOfStudy)
				console.log(uni.getStorageSync('wordIdStr').split(",").length)
				console.log(uni.getStorageSync('wordIdStr'))
				// 单词任务--学习
				if (taskType == 0 && studyType == -1) {
					this.$minApi.save({
						exerciseCount: uni.getStorageSync('wordIdStr').split(",").length,
						lengthOfStudy: lengthOfStudy,
						taskId: getApp().globalData.taskId,
						wordId: uni.getStorageSync('wordIdStr')
					}).then(data => {
						console.log(data)
					})
				}
				// 每日一练----复习
				else if (taskType == 1 && studyType == 0) {
					this.$minApi.save({
						backwordPlanId: getApp().globalData.backwordPlanId,
						lengthOfStudy: lengthOfStudy,
						reviewCount: uni.getStorageSync('wordIdStr').split(",").length,
						wordId: uni.getStorageSync('wordIdStr')
					}).then(data => {
						console.log(data)
					})
				}
				// 每日一练----开始学习
				else if (taskType == 1 && studyType == 1) {
					this.$minApi.save({
						backwordPlanId: getApp().globalData.backwordPlanId,
						lengthOfStudy: lengthOfStudy,
						exerciseCount: uni.getStorageSync('wordIdStr').split(",").length,
						wordId: uni.getStorageSync('wordIdStr')
					}).then(data => {
						console.log(data)
					})
				}
			},

		},
		onHide() {
			console.log('hidd')
			uni.removeStorageSync('taskType');
			uni.removeStorageSync('studyType');
			uni.removeStorageSync('lengthOfStudy');
			uni.removeStorageSync('wordIdStr');
		},
		onLoad(options) {
			this.wordCount = options.wordCount
			this.time = options.time
			this.wordId = options.wordId
			if (uni.getStorageSync('taskType') == 0) {
				this.completeTask(options.time, options.wordId)
			}
			this.save(uni.getStorageSync('taskType'), uni.getStorageSync('studyType'), uni.getStorageSync('lengthOfStudy'))
		}
	}
</script>

<style lang="scss">
	page {
		background: #fff !important;
	}

	.passedBox {
		.passedConBox {
			margin-top: 248rpx;

			.passedWords {
				text-align: center;

				.orangeColor {
					font-size: 72rpx;
					font-family: SF Pro Display;
					font-weight: bold;
					color: rgba(253, 144, 35, 1);
					opacity: 1;
				}

				.word {
					font-size: 36rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: rgba(46, 53, 72, 1);
					opacity: 1;
					margin-left: 10rpx;
				}
			}

			.passedTask {
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: rgba(46, 53, 72, 1);
				opacity: 1;
				text-align: center;
				margin-top: 40rpx;
			}

			.useTime {
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(92, 99, 113, 1);
				opacity: 1;
				text-align: center;
				margin-top: 24rpx;
			}

			.viewRanking {
				width: 440rpx;
				height: 80rpx;
				background: linear-gradient(90deg, rgba(15, 196, 183, 1) 0%, rgba(63, 210, 177, 1) 100%);
				opacity: 1;
				border-radius: 40rpx;
				margin: 96rpx auto 32rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: bold;
				line-height: 80rpx;
				color: rgba(255, 255, 255, 1);
				opacity: 1;
				text-align: center;
			}

			.back {
				width: 440rpx;
				height: 80rpx;
				background: rgba(243, 255, 254, 1);
				border: 1px solid rgba(15, 196, 183, 1);
				opacity: 1;
				border-radius: 40rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: bold;
				line-height: 80rpx;
				color: rgba(3, 191, 183, 1);
				opacity: 1;
				margin: 0 auto;
				text-align: center;
			}
		}
	}
</style>
