<template>
	<view class="wordTaskLearning">
		<!-- 头部 -->
		<view class="headBox">
			<view class="headTitle">单词任务测试</view>
			<van-icon @tap='goBack()' class='headArrow' name="arrow-left" />
		</view>
		<!-- 内容 -->
		<view class="TaskLearningBox">
			<!-- 进度条框 -->
			<view class="progressBox">
				<van-progress :show-pivot='false' color="#FD9023" :percentage="percentage" />
				<view class="progressTxtBox">
					<label class="count">{{doneCount+1}}/{{wordIdList.length}}</label>
					<label class="times">{{time}}</label>
					<label class="passed">已通过：<label class="skyColor">6</label></label>
				</view>
			</view>
			<!-- 单词框 -->
			<view class="wordsBox">
				<view class="word">component</view>
				<view class="playWord" @click="playAudio">
					<van-icon class='volume-o' name="volume-o" />
					<label class="phonetic">/kəm'ponənt/ </label>
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				percentage: '',
				collection: false,
				example: [],
				index: 0,

				interpretation: [],
				questionList: [],
				exampleArr: [],
				wordId: "",
				doneCount: "",
				wordIdListStr: [],
				time: '',
				Hours: 0,
				Minute: 0,
				Second: 0,
				wordIdList: []
			}
		},

		methods: {
			// 返回
			goBack() {
				uni.navigateBack({
					delta: 1
				});
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
				console.log(this.doneCount)
				console.log(this.wordIdList.length - 2)

				if (this.doneCount <= this.wordIdList.length - 2) {
					this.doneCount++
					console.log("if")
					uni.reLaunch({
						url: "index?index=" + this.doneCount + "&wordIdList=" + this.wordIdList + "&time=" + this.time
					})
				} else {
					console.log("else")
					clearInterval(this.timer)
					uni.reLaunch({
						url: "passedTask?wordCount=" + this.wordIdList.length+ "&time=" + this.time+"&wordId="+this.wordId
					})
				}
			},

			// 获取题目
			getWordInfo(wordId) {
				this.exampleArr = []
				this.$minApi.getWordInfo({
					wordId: wordId
				}).then(data => {
					// console.log(data)
					this.questionList = data.data
					this.interpretation = data.data.interpretation.split("丶")
					this.example = data.data.example.split("丶")
					this.example.forEach(val => {
						this.exampleArr.push(val.split("&"))
					})
				})
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

		},
		created(){
		console.log(getCurrentPages())
		},
		onLoad(options) {
			this.wordId = options.wordId
			this.doneCount = parseInt(options.doneCount)
			this.wordIdListStr = options.wordIdListStr
			this.wordIdList = options.wordIdListStr.split(",")
			this.time = options.time
			this.getWordInfo(options.wordId)
			this.Hours = parseInt(this.time.split(":")[0])
			this.Minute = parseInt(this.time.split(":")[1])
			this.Second = parseInt(this.time.split(":")[2])
			this.start()
			this.percentage = ((this.doneCount + 1) / this.wordIdList.length) * 100
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


	}
</style>
