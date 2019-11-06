<template>
	<view class="wordTaskLearning">
		<!-- 头部 -->
		<view class="headBox">
			<view class="headTitle">单词任务学习</view>
			<van-icon @tap='goBack()' class='headArrow' name="arrow-left" />
		</view>
		<!-- 内容 -->
		<view class="TaskLearningBox">
			<!-- 进度条框 -->
			<view class="progressBox">
				<van-progress :show-pivot='false' color="#FD9023" :percentage="percentage" />
				<view class="progressTxtBox">
					<label class="progressTxt">{{index+1}}/{{wordIdList.length}}</label>
					<van-icon @click='saveOrCancelCollectWords(questionList.wordId,questionList.collectionStatus)' :class="questionList.collectionStatus==1?'start':'start-o'"
					 :name="questionList.collectionStatus==1?'star':'star-o'" />
				</view>
			</view>
			<!-- 单词框 -->
			<view class="wordsBox">
				<view class="word">{{questionList.wordSpell}}</view>
				<view class="playWord" @click="playAudio">
					<van-icon class='volume-o' name="volume-o" />
					<label class="phonetic">{{questionList.phoneticSymbol}} </label>
				</view>
			</view>
			<!-- 释义 -->
			<view class="interpretation">
				<view class="title">释义</view>
				<view class="nadjBox" v-for="item in interpretation" :key="item">
					<label class="noun">{{item}}</label>
					<label class="" v-if="false">组成部分；成分；组件，元件</label>
				</view>
			</view>
			<!-- 例句 -->
			<view class="exampleSentenceBox">
				<view class="title">例句</view>
				<view class="exampleSentence" v-for="(item,index) in exampleArr" :key='item'>
					<view class="inEnglish">{{index+1}}.{{item[0]}}</view>
					<view class="inChinese">{{item[1]}}</view>
				</view>
			</view>
			<!-- 下一个  -->
			<view class="nextBigBox">
				<view class="nextBox" @click="nextQuestion()">
					<van-icon class='arrow' name="arrow" />
					<label class="nextTxt">下一个</label>
				</view>
			</view>
		</view>
		<!-- 完成学习弹框 -->
		<view class="completeBox">
			<van-popup :show="show" @close="onClose()">
				<view class="completeConBox">
					<view class="top">
						<image class="coverPic" src="../../../../../../static/images/icon_test@2x.png"></image>
						<view class="right">
							<view class="taskNum">任务<label class="num">{{wordIdList.length}}</label>词</view>
							<view class="complete">学习已完成</view>
						</view>
					</view>
					<view class="startTask" @click="linkTo()">开始测试</view>
				</view>
			</van-popup>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				percentage: '',
				collection: false,
				show: false,
				wordIdList: [],
				questionList: [],
				example: [],
				interpretation: [],
				wordId: "",
				index: 0,
				exampleArr: [],
				state: "",
				lengthOfStudy: 0,
				timer: null,
				studyType: -1,
				taskType: -1,
				taskId: '',
				backwordPlanId: '',
				wordIdStr:'',
				allWordCount:0

			}
		},
		methods: {
			// 返回
			goBack() {
				var _this=this
				uni.showModal({
					// title: '',
					content: '是否确认退出答题？',
					cancelColor: '#CCCCCC',
					confirmColor: '#03BFB7',
					success: function(res) {
						if (res.confirm) {
							uni.switchTab({
								url: '../../../index'
							})
							// clearInterval(this.timer)
							clearInterval(_this.timer)
							// console.log('用户点击确定');
						} else if (res.cancel) {
							// uni.navigateBack({
							// 	delta: 1
							// })
							// console.log('用户点击取消');
						}
					}
				});
			},
			// 收藏
			collectionCli() {
				this.collection = !this.collection
			},
			// 播放音频
			playAudio() {
				const innerAudioContext = uni.createInnerAudioContext();
				innerAudioContext.autoplay = true;
				innerAudioContext.src = 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.mp3';
				innerAudioContext.onPlay(() => {
					console.log('开始播放');
				});
				innerAudioContext.onError((res) => {
					console.log(res.errMsg);
					console.log(res.errCode);
				});
			},
			// 下一题
			nextQuestion() {
				// console.log(this.lengthOfStudy)
				// console.log(this.wordIdList[Math.floor(Math.random() * this.wordIdList.length)])
				// console.log(this.index)
				if (this.index < this.wordIdList.length - 1) {				
					this.index++
					this.percentage = ((this.index + 1) / this.wordIdList.length) * 100
					this.getWordInfo(this.wordIdList[this.index])
				} else {
					this.showPopup()
					clearInterval(this.timer)
					// console.log(this.lengthOfStudy,888)
					// this.save(this.taskType, this.studyType, this.lengthOfStudy)
					uni.setStorageSync('taskType', this.taskType);
					uni.setStorageSync('studyType', this.studyType);
					uni.setStorageSync('lengthOfStudy', this.lengthOfStudy);
					uni.setStorageSync('wordIdStr', this.wordIdStr);
					uni.setStorageSync('lengthOfStudy', this.lengthOfStudy);
				}
				// this.lengthOfStudy = 0
			},
	
			// 完成学习弹框    关闭弹框
			onClose() {
				this.show = false
			},
			// 完成学习弹框    打开弹框
			showPopup() {
				this.show = true
			},
			// 跳转页面
			linkTo() {
				uni.navigateTo({
					url: '../test/index?wordIdList=' + this.wordIdList+'&studyType='+this.studyType+'&taskType='+this.taskType+'&lengthOfStudy='+this.lengthOfStudy
				})
			},
			// 获取单词详情
			getWordInfo(wordId) {
				this.exampleArr = []
				this.$minApi.getWordInfo({
					wordId: wordId
				}).then(data => {
					this.questionList = data.data
					this.interpretation = data.data.interpretation.split("丶")
					this.example = data.data.example.split("丶")
					this.example.forEach(val => {
						this.exampleArr.push(val.split("&"))
					})
					// 开始计时
				})
			},
			// 学生保存或取消收藏单词
			saveOrCancelCollectWords(wordId, collectionStatus) {
				this.state = ""
				if (collectionStatus == "1") {
					this.state = '0'
				} else {
					this.state = '1'
				}
				console.log(typeof(this.state))
				this.$minApi.saveOrCancelCollectWords({
					collectionStatus: this.state,
					studentId: uni.getStorageSync('studentId'),
					wordId: wordId
				}).then(data => {
					uni.showToast({
						title: "操作成功！",
						icon: "none"
					})
					this.getWordInfo(this.wordIdList[this.index + 0])
				})
			},
			// 计时器
			getTime() {
				this.timer = setInterval(() => {
					this.lengthOfStudy++
				}, 1000)
			}

		},
		onLoad(options) {
			console.log(options)
			this.wordIdStr=options.wordId
			this.wordIdList = options.wordId.split(",")
			getApp().globalData.taskId = options.taskId
			this.taskId = options.taskId
			this.backwordPlanId = options.backwordPlanId
			getApp().globalData.backwordPlanId = options.backwordPlanId
			getApp().globalData.wordIdCount = this.wordIdList.length
			this.getWordInfo(this.wordIdList[0])
			this.percentage = ((this.index + 1) / this.wordIdList.length) * 100
			this.allWordCount=options.allWordCount
			// console.log(this.allWordCount)
			
			// 接收参数，用于判断 每日一练学习、复习的类型
			if (options.studyType) {
				this.studyType = options.studyType
				console.log(this.studyType)
			}
			// 接收参数，用于判断 个人任务、每日一练类型
			if (options.taskType) {
				this.taskType = options.taskType
				// console.log(this.taskType)
			}
		},
		created() {
			this.getTime()
		}
	}
</script>

<style lang="scss">
	page {
		background: #fff !important;
	}

	.wordTaskLearning {
		// background: #fff ;
		overflow: hidden;

		/* 内容 */
		.TaskLearningBox {
			margin-top: 248rpx;

			// 进度条框
			.progressBox {
				position: fixed;
				top: 128rpx;
				left: 0;
				background-color: #FFFFFF;
				width: 100%;
				z-index: 100;

				.progressTxtBox {
					height: 74rpx;
					width: 100%;
					border-bottom: 2rpx solid #EFEFF1;

					.progressTxt {
						float: left;
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 500;
						line-height: 74rpx;
						color: rgba(92, 99, 113, 1);
						opacity: 1;
						margin-left: 40rpx;
					}

					.start-o {
						float: right;
						font-size: 40rpx;
						margin-right: 40rpx;
						color: #979DAB;
						margin-top: 10rpx;
					}

					.start {
						float: right;
						font-size: 40rpx;
						margin-right: 40rpx;
						color: #0FC4B7;
						margin-top: 10rpx;
						// background-color: #0FC4B7;
					}
				}

			}

			// 单词框
			.wordsBox {
				margin-top: 40rpx;

				.word {
					font-size: 64rpx;
					font-family: SF Pro Display;
					font-weight: 600;
					color: rgba(46, 53, 72, 1);
					opacity: 1;
					text-align: center;
				}

				.playWord {
					margin-top: 28rpx;
					text-align: center;
					overflow: hidden;

					.volume-o {
						color: #0FC4B7;
						font-size: 30rpx;
						float: left;
						margin-left: 274rpx;
					}

					.phonetic {
						font-size: 28rpx;
						font-family: SF Pro Display;
						font-weight: 500;
						color: rgba(151, 157, 171, 1);
						opacity: 1;
						margin-left: 12rpx;
						float: left;
					}
				}
			}

			// 释义
			.interpretation {
				padding: 0 40rpx 32rpx;
				box-sizing: border-box;
				margin-top: 92rpx;
				overflow: hidden;
				border-bottom: 2rpx solid #EFEFF1;

				.title {

					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(151, 157, 171, 1);
				}

				.nadjBox {
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
					line-height: 24px;
					color: rgba(46, 53, 72, 1);
					opacity: 1;
					margin-top: 18rpx;

					.noun {
						margin-right: 60rpx;
					}
				}
			}

			// 例句
			.exampleSentenceBox {
				padding: 0 40rpx 120rpx;
				box-sizing: border-box;
				margin-top: 32rpx;
				overflow: hidden;

				.title {
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(151, 157, 171, 1);
					opacity: 1;
				}

				.exampleSentence {
					margin-top: 24rpx;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(46, 53, 72, 1);
					opacity: 1;

					.inEnglish {
						line-height: 44rpx;
					}

					.inChinese {
						line-height: 22px;
					}
				}
			}

			// 下一个
			.nextBigBox {
				padding: 0 40rpx;
				box-sizing: border-box;
				position: fixed;
				bottom: 0rpx;
				left: 0;
				width: 100%;
				height: 108rpx;
				background: rgba(255, 255, 255, 0.8);
				opacity: 1;

				.nextBox {
					width: 100%;
					height: 80rpx;
					line-height: 80rpx;
					background: linear-gradient(90deg, rgba(15, 196, 183, 1) 0%, rgba(63, 210, 177, 1) 100%);
					opacity: 1;
					border-radius: 40rpx;
					color: #fff;
					text-align: center;
					margin-top: 14rpx;

					.arrow {
						float: left;
						margin-top: 6rpx;
						margin-left: 38rpx;
					}

					.nextTxt {
						margin-left: -80rpx;
					}
				}

			}

		}

		// 完成内容学习弹框
		.completeBox {
			overflow: hidden;

			.van-popup {
				border-radius: 20rpx;
			}

			.completeConBox {
				width: 526rpx;
				height: 410rpx;
				background: rgba(255, 255, 255, 1);
				opacity: 1;
				border-radius: 20rpx;
				padding: 70rpx 58rpx;
				box-sizing: border-box;
				overflow: hidden;

				.top {
					overflow: hidden;

					.coverPic {
						float: left;
						display: inline-block;
						width: 112rpx;
						height: 146rpx;
						background: rgba(255, 238, 220, 1);
						opacity: 1;
						border-radius: 18rpx;
						margin-left: 40rpx;
					}

					.right {
						float: left;
						margin-left: 40rpx;

						.taskNum {
							font-size: 32rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: rgba(253, 144, 35, 1);
							opacity: 1;
							// margin-top: 20rpx;

							.num {
								font-size: 48rpx;
							}
						}

						.complete {
							font-size: 32rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: rgba(46, 53, 72, 1);
							opacity: 1;
							margin-top: 24rpx;
						}
					}
				}

				.startTask {
					width: 100%;
					height: 80rpx;
					background: linear-gradient(90deg, rgba(15, 196, 183, 1) 0%, rgba(63, 210, 177, 1) 100%);
					opacity: 1;
					border-radius: 40rpx;
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 400;
					line-height: 80rpx;
					color: rgba(255, 255, 255, 1);
					text-align: center;
					margin-top: 48rpx;
				}
			}
		}
	}
</style>
