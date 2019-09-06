<template>
	<view class="revisionPlanBox">
		<!-- 头部 -->
		<view class="headBox">
			<view class="headTitle">修改计划</view>
			<van-icon @tap='goBack()' class='headArrow' name="arrow-left" />
		</view>
		<!-- 内容 -->
		<view class="revisionPlanBoxCon">
			<!-- 上部分 -->
			<view class="topBox">
				<!-- 当前计划 -->
				<view class="currentPlan">
					<view class="left">
						<view class="planTitle">当前计划</view>
						<view class="dayNum">每日学习、复习词数</view>
					</view>
					<view class="right">
						<label class="num" for="">20</label>
						<label class="ci" for="">词</label>
						<van-icon class='arrowDown' name="arrow-down" />
					</view>
				</view>
				<!-- 当前词书 -->
				<view class="currentWordsBook">
					<view class="wordsBookTitle">当前词书</view>
					<view class="wordsBookConBox">
						<view class="left">
							<image class="bookCover" src="../../../../static/images/img_book1@2x.png" mode=""></image>
						</view>
						<view class="center">
							<view class="bookTitle">四级词汇</view>
							<view class="progressBar">
								<van-progress :show-pivot='false' color="#0FC4B7" percentage="25" />
							</view>
							<view class="progressInfo">
								<label class="learnedBox">
									<van-icon class='play' name="play" />
									<label for="" class="learnedNum">已学 200</label>
								</label>
								<label class="allWord">
									总词数 2000
								</label>
							</view>
						</view>
						<view class="right">
							<label for="" class="statusBtn selected">当前已选</label>
						</view>
					</view>

				</view>
				<!-- 清除当前词书学习记录 -->
				<view class="clearRecordsBox">
					<image class="iconPic" src="../../../../static/images/icon_del@2x.png" mode=""></image>
					<label>清除当前词书学习记录</label>
				</view>
			</view>
			<!-- 下部分 -->
			<view class="bottomBox">
				<view class="allTitle">所有词书</view>
				<view class="wordsBookConBox" v-for="item in 10" :key='item'>
					<view class="left">
						<image class="bookCover" src="../../../../static/images/img_book1@2x.png" mode=""></image>
					</view>
					<view class="center">
						<view class="bookTitle">四级词汇</view>
						<view class="progressBar">
							<van-progress :show-pivot='false' color="#0FC4B7" percentage="25" />
						</view>
						<view class="progressInfo">
							<label class="learnedBox">
								<van-icon class='play' name="play" />
								<label for="" class="learnedNum">已学 200</label>
							</label>
							<label class="allWord">
								总词数 2000
							</label>
						</view>
					</view>
					<view class="right">
						<label for="" class="statusBtn selected">当前已选</label>
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isSing: true
			}
		},
		methods: {
			// 返回
			goBack() {
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style lang="scss">
	.revisionPlanBox {

		// 内容
		.revisionPlanBoxCon {
			margin-top: 128rpx;
			overflow: hidden;

			// 图书列表公共样式
			.wordsBookConBox {
				width: 100%;
				height: 176rpx;
				background: rgba(255, 255, 255, 1);
				border: 2rpx solid rgba(243, 245, 245, 1);
				opacity: 1;
				border-radius: 10rpx;
				overflow: hidden;
				padding: 24rpx 16rpx 24rpx 24rpx;
				box-sizing: border-box;
				margin-bottom: 24rpx;

				.left {
					float: left;

					.bookCover {
						width: 96rpx;
						height: 128rpx;
						background: linear-gradient(316deg, rgba(167, 252, 70, 1) 0%, rgba(15, 196, 183, 1) 100%);
						opacity: 1;
						border-radius: 4rpx 10rpx 10rpx 4rpx;
					}
				}

				.center {
					float: left;
					margin-left: 24rpx;
					width: 320rpx;

					.bookTitle {
						font-size: 30rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: rgba(46, 53, 72, 1);
						opacity: 1;
						margin-top: 4rpx;
					}

					.progressBar {
						margin-top: 16rpx;
					}

					.progressInfo {
						overflow: hidden;
						margin-top: 16rpx;
						line-height: 40rpx;


						.learnedBox {
							overflow: hidden;
							float: left;

							.play {
								color: rgba(62, 213, 147, 1);
								opacity: 1;
								font-size: 30rpx;
							}

							.learnedNum {
								display: inline-block;
								line-height: 40rpx;
								font-size: 22rpx;
								font-family: PingFang SC;
								font-weight: 400;
								color: rgba(92, 99, 113, 1);
								opacity: 1;
							}
						}

						.allWord {
							float: right;
							font-size: 22rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: rgba(92, 99, 113, 1);
							opacity: 1;
						}
					}

				}

				.right {
					float: right;
					margin-top: 36rpx;

					.statusBtn {
						text-align: center;
						display: inline-block;
						width: 136rpx;
						height: 56rpx;
						opacity: 1;
						border-radius: 38rpx;
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 500;
						line-height: 56rpx;
						opacity: 1;

					}

					// 当前已选
					.selected {
						background: rgba(247, 248, 250, 1);
						border: 1px solid rgba(151, 157, 171, 1);
						color: rgba(151, 157, 171, 1);
					}

					.noSelected {
						background: #FD9023;
						border: none;
						color: #FFFFFF;
					}
				}
			}


			// 上部分
			.topBox {
				padding: 0 40rpx 40rpx 40rpx;
				box-sizing: border-box;
				overflow: hidden;
				background-color: #FFFFFF;

				// 当前计划
				.currentPlan {
					border-bottom: 2rpx solid #EFEFF1;
					padding: 40rpx 0;
					height: 172rpx;
					box-sizing: border-box;

					.left {
						float: left;

						.planTitle {
							font-size: 36rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: rgba(46, 53, 72, 1);
							opacity: 1;
						}

						.dayNum {
							font-size: 24rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: rgba(151, 157, 171, 1);
							opacity: 1;
							margin-top: 8rpx;
						}
					}

					.right {
						float: right;
						margin-top: 12rpx;

						.num {
							font-size: 40rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: rgba(253, 144, 35, 1);
							margin-right: 6rpx;
						}

						.ci {
							font-size: 26rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: rgba(92, 99, 113, 1);
							opacity: 1;
							margin-top: 12rpx;
							margin-right: 14rpx;
						}

						.arrowDown {
							color: #979DAB;
						}
					}
				}

				// 当前词书
				.currentWordsBook {

					.wordsBookTitle {
						font-size: 36rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: rgba(46, 53, 72, 1);
						opacity: 1;
						margin-top: 40rpx;
						margin-bottom: 32rpx;
					}


				}

				// 清除当前词书学习记录
				.clearRecordsBox {
					width: 100%;
					height: 72rpx;
					background: rgba(255, 255, 255, 1);
					border: 2rpx solid rgba(239, 239, 241, 1);
					opacity: 1;
					border-radius: 10rpx;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 400;
					line-height: 72rpx;
					color: rgba(92, 99, 113, 1);
					opacity: 1;
					text-align: center;
					margin-top: 8rpx;

					.iconPic {
						display: inline-block;
						width: 36rpx;
						height: 20rpx;
					}
				}
			}

			// 下部分
			.bottomBox {
				padding:40rpx;
				background-color:#FFFFFF;
				margin-top: 16rpx;
				 .allTitle {
					font-size: 36rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: rgba(46, 53, 72, 1);
					opacity: 1;
					margin-bottom: 32rpx;
				}
			}
		}
	}
</style>
