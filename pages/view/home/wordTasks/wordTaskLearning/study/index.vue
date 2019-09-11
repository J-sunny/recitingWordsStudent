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
					<label class="progressTxt">9/10</label>
					<van-icon @click='collectionCli()' :class="collection==true?'start':'start-o'" :name="collection==true?'star':'star-o'" />
				</view>
			</view>
			<!-- 单词框 -->
			<view class="wordsBox">
				<view class="word">component</view>
				<view class="playWord">
					<van-icon class='volume-o' name="volume-o" />
					<label class="phonetic">/kəm'ponənt/ </label>
				</view>
			</view>
			<!-- 释义 -->
			<view class="interpretation">
				<view class="title">释义</view>
				<view class="nadjBox">
					<label class="noun">n.</label>
					<label class="">组成部分；成分；组件，元件</label>
				</view>
				<view class="nadjBox">
					<label class="noun">adj. </label>
					<label class="">组成的；构成的</label>
				</view>
			</view>
			<!-- 例句 -->
			<view class="exampleSentenceBox">
				<view class="title">例句</view>
				<view class="exampleSentence" v-for="item in 10" :key='item'>
					<view class="inEnglish">1.But what if none of them contain the component that you need? </view>
					<view class="inChinese">但是如果它们都不包含您所需要的组件该怎么办呢？</view>
				</view>
				<view class="exampleSentence">
					<view class="inEnglish">2.In this example, the component itself provides the measurement.</view>
					<view class="inChinese"> 在这个例子中，组件本身提供了度量。</view>
				</view>
			</view>
			<!-- 下一个  -->
			<view class="nextBigBox">
				<view class="nextBox" @click="showPopup()">
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
							<view class="taskNum">任务<label class="num">10</label>词</view>
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
				percentage: '25',
				collection: false,
				show: false
			}
		},
		methods: {
			// 返回
			goBack() {
				uni.navigateBack({
					delta: 1
				});
			},
			// 收藏
			collectionCli() {
				this.collection = !this.collection
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
			linkTo(){
				uni.navigateTo({
					url: '../test/index'
				})
			}
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
				position:fixed;
				top: 128rpx;
				left: 0;
				background-color:#FFFFFF;
				width: 100%;
				z-index:100;

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
