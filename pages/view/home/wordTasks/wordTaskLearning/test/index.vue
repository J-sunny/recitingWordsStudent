<template>
	<view class="wordSpelingBox">
		<!-- 头部 -->
		<view class="headBox">
			<view class="headTitle">单词任务测试</view>
			<van-icon @tap='goBack()' class='headArrow' name="arrow-left" />
		</view>
		<!-- 内容 -->
		<view class="wordSpelingConBox">
			<!-- 进度条框 -->
			<view class="progressBox">
				<van-progress :show-pivot='false' color="#FD9023" :percentage="percentage" />
				<view class="progressTxtBox">
					<label class="count">总题数:{{allWordCount}}</label>
					<label class="times">{{time}}</label>
					<label class="passed">已通过：<label class="skyColor">{{rightNum}}</label></label>
				</view>
			</view>
			<!-- 题目 -->
			<!-- 单词拼写 -->
			<view class="wordSpellingBox" v-if="questionList.questionType==2">
				<view class="wordsBox">
					<label class="wordSpeling">
						<label v-for="(item,index) in subject" :key="index">
							<label class="letter" v-if="item.value!='&'">{{item.value}}</label>
							<input focus :class="isClick?item.state?'rightWord':'falseWord':''" v-if="item.value=='&'" maxlength='1' class="wordInput"
							 type="text" v-model="answerValue['answer'+index]">
						</label>
					</label>
					<view class="playWord" @click="playAudio()">
						<van-icon class='volume-o' name="volume-o" />
						<label class="phonetic">{{questionList.word_spell}} </label>
					</view>
				</view>
				<!-- 释义 -->
				<view class="interpretation">
					{{questionList.interpretation}}
				</view>
				<!-- 下一个 -->
				<view class="nextBtn" @click="nextSpell()">
					<van-icon class='arrow' name="arrow" />
					<label class="nextTxt">下一个</label>
				</view>
			</view>
			<!-- <word-spelling @nextQuestion='nextQuestion' v-if="questionList.questionType==2" :allCount="wordIdList.length" :questionList="questionList" :index="index" :time="time"></word-spelling> -->

			<!-- 中文选词 -->
			<view class="wordSelectionBox" v-if="questionList.questionType==0">
				<view class="inChinese">
					{{questionList.question_stem}}
				</view>
				<!-- 选项 -->
				<view class="optionBox">
					<view @click="check(index)" :class="item.write==true?answer==index?'green':'red':''" class="option" v-for="(item,index) in optionsArr"
					 :key="index">{{item.options}}</view>
				</view>
			</view>
			<!-- <chinese-word-selection @nextQuestion='nextQuestion' v-if="questionList.questionType==0" :allCount="wordIdList.length" :questionList="questionList" :index="index" :time="time"></chinese-word-selection> -->

			<!-- 听力选词 -->
			<view class="listeningWordSelectionBox" v-if="questionList.questionType==3">
				<view class="voiceBox" @click="playAudio()">
					<van-icon class='voice' name="volume-o" />

				</view>
				<!-- 选项 -->
				<view class="optionBox">
					<view @click="check(index)" :class="item.write==true?answer==index?'green':'red':''" class="option" v-for="(item,index) in optionsArr"
					 :key="index">{{item.options}}</view>
				</view>
			</view>
			<!-- <listening-word-selection @nextQuestion='nextQuestion' v-if="questionList.questionType==3" :allCount="wordIdList.length" :questionList="questionList" :index="index" :time="time"></listening-word-selection> -->

			<!-- 英文选意 -->
			<view class="englishSelectionBox" v-if="questionList.questionType==1">
				<view class="wordBox">
					<view class="word">support</view>
					<view class="playWord" @click="playAudio()">
						<van-icon class='volume-o' name="volume-o" />
						<label class="phonetic">{{questionList.question_stem}} </label>
					</view>
				</view>
				<!-- 选项 -->
				<view class="optionBox">
					<view @click="check(index)" :class="item.write==true?answer==index?'green':'red':''" class="option" v-for="(item,index) in optionsArr"
					 :key="index">{{item.options}}</view>
				</view>
			</view>
			<!-- <english-selection @nextQuestion='nextQuestion' v-if="questionList.questionType==1" :allCount="wordIdList.length" :questionList="questionList" :index="index" :time="time"></english-selection> -->
		</view>
		<!-- 返回弹框 -->

	</view>
</template>

<script>
	import WordSpelling from '../../../../../component/wordSpelling.vue'
	import ChineseWordSelection from '../../../../../component/chineseWordSelection.vue'
	import ListeningWordSelection from '../../../../../component/listeningWordSelection.vue'
	import EnglishSelection from '../../../../../component/englishSelection.vue'
	const innerAudioContext = uni.createInnerAudioContext();
	export default {
		data() {
			return {
				percentage: '',
				wordIdList: [],
				questionList: [],
				index: 0,
				timer: null,
				Hours: 0,
				Minute: 0,
				Second: 0,
				Hourst: 0,
				Minutet: 0,
				Secondt: 0,
				time: "",
				optionsList: [],
				answer: "",
				wordIdListStr: "",
				subject: [],
				cIndex: '',
				answerValue: {},
				answerList: [],
				optionsArr: [],
				sucess: false,
				error: false,
				isClick: false,
				rightNum: 0,
				allWordCount: 0,
			}
		},
		components: {
			WordSpelling,
			ChineseWordSelection,
			ListeningWordSelection,
			EnglishSelection
		},
		computed: {},
		onHide: function() {
			// console.log('App Hide')
			clearInterval(this.timer)
		},
		methods: {			
			// 返回
			goBack() {
				// uni.navigateBack({
				// 	delta: 1
				// });
				var _this = this
				uni.showModal({
					// title: '提示',
					content: '是否确认退出答题？',
					cancelColor: '#CCCCCC',
					confirmColor: '#03BFB7',
					success: function(res) {
						if (res.confirm) {
							uni.switchTab({
								url: '../../../index'
							})
							// _this.stop()
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
			// 获取题目
			getQuestion(wordId) {
				// console.log(wordId)
				this.$minApi.getQuestion({
					wordId: wordId
				}).then(data => {
					this.questionList = data.data
					if (data.data.questionType == 2) {
						let title = this.questionList.question_stem.replace(/ /g, "&")
						var list = title.split('')
						list.forEach(item => {
							this.subject.push({
								value: item,
								state: false
							})
						})
						this.answer = this.questionList.question_answer
					} else {
						this.optionsList = this.questionList.question_option.split("丶")
						this.answer = this.questionList.question_answer
						// console.log(this.optionsList)
						this.optionsList.forEach(val => {
							this.optionsArr.push({
								options: val,
								write: false
							})
						})
					}
				})
			},
			// 播放音频
			playAudio() {
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
			// 停止播放
			stopAudio() {
				console.log(innerAudioContext)
				innerAudioContext.stop(() => {
					console.log('停止播放');
				});
			},

			// 下一题
			nextQuestion() {
				this.stopAudio()
				this.optionsList = []
				this.subject = []
				this.optionsArr = []
				console.log(this.rightNum, 333)
				console.log(this.allWordCount, 444)
				if (this.rightNum < this.allWordCount - 1) {
					this.rightNum++
					this.index++
					this.percentage = ((this.rightNum) / this.allWordCount) * 100
					this.getQuestion(this.wordIdList[this.index])
				} else {
					clearInterval(this.timer)
					setTimeout(() => {
						uni.navigateTo({
							url: "passedTask?wordCount=" + this.allWordCount + "&time=" + this.time + "&wordId=" + this.questionList.word_id
						})
					}, 1000)

				}
			},
			// 单词拼写下一题
			nextSpell() {
				this.stopAudio()
				let flag = false
				this.isClick = true
				// console.log(this.answerValue)
				var answerIndex = []
				for (var item in this.answerValue) {
					answerIndex.push(item[item.length - 1])
				}
				answerIndex.forEach(item => {
					if (this.answer[item] == this.answerValue['answer' + item]) {
						this.subject[item].state = true;
					}
					let answer = this.questionList.question_stem.replace(' ', this.answerValue['answer' + item])
					this.questionList.question_stem = answer
				})
				if (this.questionList.question_stem == this.answer) {
					// this.rightNum++
					setTimeout(() => {
						this.nextQuestion();
						// this.subject = []
						// this.optionsArr = []
					}, 1000)
				} else {
					this.wordIdListStr = this.wordIdListStr + ',' + this.questionList.word_id
					setTimeout(() => {
						uni.navigateTo({
							url: "wordDetails?wordId=" + this.questionList.word_id + "&doneCount=" + this.index + "&wordIdListStr=" +
								this.wordIdListStr + "&time=" + this.time + '&rightNum=' + this.rightNum + '&allWordCount=' + this.allWordCount
						})
					}, 1000)
					// this.subject = []
					// this.optionsArr = []
				}
				setTimeout(() => {
					this.answerValue = {}
					this.isClick = false;
				}, 1000)
				// 个人任务答题
				// uni.getStorageSync('studyType')
				if (uni.getStorageSync('taskType') == 0) {
					this.$minApi.completeTask({
						taskId: getApp().globalData.taskId,
						wordId: this.questionList.word_id
					}).then(data => {
						console.log(data)
						setTimeout(() => {
							this.answerValue = {}
							this.isClick = false;
						}, 500)
					})
				}


			},
			// 选择选项
			check(index) {
				this.cIndex = index
				this.optionsArr[index].write = true
				// console.log(this.optionsArr)
				if (index == this.answer) {
					setTimeout(() => {
						this.nextQuestion();
					}, 1000)
				} else {
					this.wordIdListStr = this.wordIdListStr + ',' + this.questionList.word_id
					console.log(this.wordIdListStr)
					setTimeout(() => {
						uni.navigateTo({
							url: "wordDetails?wordId=" + this.questionList.word_id + "&doneCount=" + this.index + "&wordIdListStr=" +
								this.wordIdListStr + "&time=" + this.time + '&rightNum=' + this.rightNum + '&allWordCount=' + this.allWordCount
						})
					}, 1000)
				}
				// 个人任务答题
				if (uni.getStorageSync('taskType') == 0) {
					this.$minApi.completeTask({
						taskId: getApp().globalData.taskId,
						wordId: this.questionList.word_id
					}).then(data => {
						// console.log(data)
					})
				}
			},

			// 计时器、
			start() {
				this.timer = setInterval(data => {
					this.Second++;
					if (this.Second > 59) {
						this.Second = 0;
						this.Minute++;
						if (this.Minute > 59) {
							this.Minute = 0;
							this.Hours++;
						}
					}
					if (this.Second < 10) {
						this.Secondt = "0" + this.Second;
					} else {
						this.Secondt = this.Second;
					}
					if (this.Minute < 10) {
						this.Minutet = "0" + this.Minute;
					} else {
						this.Minutet = this.Minute;
					}
					if (this.Hours < 10) {
						this.Hourst = "0" + this.Hours;
					} else {
						this.Hourst = this.Hours;
					}
					this.time = this.Hourst + ":" + this.Minutet + ":" + this.Secondt
				}, 1000)
			},

			// 停止计时
			stop() {
				clearInterval(this.timer)
			}
		},
		onLoad(options) {
			clearInterval(this.timer)
			this.start()
			this.wordIdListStr = options.wordIdList
			this.allWordCount = getApp().globalData.wordIdCount
			console.log(options.wordIdList)
			// console.log(this.allWordCount)
			this.wordIdList = this.wordIdListStr.split(",")
			// this.start()
			if (options.index) {
				this.index = parseInt(options.index)
				// this.percentage = ((this.index + 1) / this.wordIdList.length) * 100
			}
			if (options.time) {
				this.time = options.time
				this.Hours = parseInt(this.time.split(":")[0])
				this.Minute = parseInt(this.time.split(":")[1])
				this.Second = parseInt(this.time.split(":")[2])
			}
			// console.log(options)
			// console.log(options.rightNum)
			if (options.rightNum) {
				this.rightNum = options.rightNum
			}
			this.getQuestion(this.wordIdList[this.index])
			this.percentage = ((this.rightNum) / this.allWordCount) * 100
		}

	}
</script>

<style lang="scss">
	page {
		background: #fff !important;
	}

	.wordSpelingBox {
		overflow: hidden;

		// 内容
		.wordSpelingConBox {
			margin-top: 128rpx;

			// 进度条
			.progressTxtBox {
				height: 74rpx;
				width: 100%;
				border-bottom: 2rpx solid #EFEFF1;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				line-height: 74rpx;
				color: rgba(92, 99, 113, 1);
				opacity: 1;
				position: relative;

				.count {
					position: absolute;
					left: 40rpx;
				}

				.times {
					display: inline-block;
					width: 100%;
					text-align: center;
				}

				.passed {
					position: absolute;
					right: 40rpx;

					.skyColor {
						color: #0FC4B7;
					}
				}
			}


			// 题目
			// 单词拼写
			.wordSpellingBox {

				// 单词
				.wordsBox {
					// margin-top: 40rpx;
					text-align: center;
					width: 100%;
					font-size: 64rpx;
					font-family: SF Pro Display;
					font-weight: 600;
					line-height: 80rpx;
					color: rgba(46, 53, 72, 1);
					opacity: 1;
					margin: 40rpx auto;
					width: 100%;

					.wordSpeling {
						display: inline-block;
						width: auto;
						height: 80rpx;

						.letter {
							float: left;
						}

						.wordInput {
							float: left;
							display: inline-block;
							width: 60rpx;
							height: 80rpx;
							line-height: 80rpx;
							background: rgba(255, 255, 255, 1);
							border: 2rpx solid rgba(151, 157, 171, 1);
							opacity: 1;
							border-radius: 10rpx;
							margin: 0 8rpx;
							text-align: center;
						}
					}

					.playWord {
						margin-top: 28rpx;
						text-align: center;

						.volume-o {
							color: #0FC4B7;
							font-size: 30rpx;
						}

						.phonetic {
							font-size: 28rpx;
							font-family: SF Pro Display;
							font-weight: 500;
							color: rgba(151, 157, 171, 1);
							opacity: 1;
							margin-left: 12rpx;
						}
					}
				}

				// 释义
				.interpretation {
					width: 498rpx;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: bold;
					line-height: 40rpx;
					color: rgba(46, 53, 72, 1);
					opacity: 1;
					margin: 160rpx auto;
				}

				// 下一个
				.nextBtn {
					width: 240rpx;
					height: 64rpx;
					background: rgba(255, 251, 243, 1);
					border: 2rpx solid rgba(253, 144, 35, 1);
					opacity: 1;
					border-radius: 40rpx;
					color: #FD9023;
					line-height: 64rpx;
					text-align: center;
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 400;
					// position:fixed;
					// bottom:40rpx;
					// right: 40rpx;
					float: right;
					margin-right: 40rpx;
					// margin-top: 200rpx;

					.arrow {}

					.nextTxt {}
				}

				.rightWord {
					color: #2ED19F;
					border: 2rpx solid #2ED19F !important;
				}

				.falseWord {
					color: #EE5858;
					border: 2rpx solid #EE5858 !important;
				}

			}

			// 中文选意
			.wordSelectionBox {
				.inChinese {
					width: 498rpx;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: bold;
					line-height: 40rpx;
					color: rgba(46, 53, 72, 1);
					opacity: 1;
					margin: 80rpx auto;
				}

			}

			// 听力选词
			.listeningWordSelectionBox {
				.voiceBox {
					width: 100%;
					text-align: center;

					.voice {
						display: inline-block;
						font-size: 100rpx;
						color: #0FC4B7;
						margin: 80rpx auto;
					}
				}

			}

			// 英文选意
			.englishSelectionBox {
				.wordBox {
					.word {
						font-size: 64rpx;
						font-family: SF Pro Display;
						font-weight: 600;
						color: rgba(46, 53, 72, 1);
						opacity: 1;
						text-align: center;
						margin-top: 40rpx;
					}

					.playWord {
						margin-top: 28rpx;
						text-align: center;

						.volume-o {
							color: #0FC4B7;
							font-size: 30rpx;
						}

						.phonetic {
							font-size: 28rpx;
							font-family: SF Pro Display;
							font-weight: 500;
							color: rgba(151, 157, 171, 1);
							opacity: 1;
							margin-left: 12rpx;
						}
					}
				}
			}



		}
	}
</style>
