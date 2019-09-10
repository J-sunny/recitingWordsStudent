<template>
	<view class="wordTasks">
		<!-- 头部 -->
		<view class="headBox">
			<view class="headTitle">单词任务</view>
			<van-icon @tap='goBack()' class='headArrow' name="arrow-left" />
		</view>
		<!-- 内容 -->
		<view class="wordTasksConBox">
			<view class="taskVocabularyBox">
				<view class="taskBox">
					<!-- 左边 -->
					<view class="taskLeft">
						<view class="taskTitle">任务词汇量：<label class="taskNum">10</label></view>
						<view class="taskTime">7-10 15:00</view>
					</view>
					<!-- 中间 -->
					<view class="taskCenter" v-if="isDone">
						<image src="../../../../static/images/Completed@2x.png" mode=""></image>
					</view>
					<!-- 右边 -->
					<view class="taskRight">
						<view class="status study" @click="toStudy()">
							去学习
						</view>
					</view>
				</view>

				<view class="taskBox" v-for='(item,index) in 20' :key='index'>
					<!-- 左边 -->
					<view class="taskLeft">
						<view class="taskTitle">任务词汇量：<label class="taskNum">10</label></view>
						<view class="taskTime">7-10 15:00</view>
					</view>
					<!-- 中间 -->
					<view class="taskCenter" v-if="isDone">
						<image src="../../../../static/images/Completed@2x.png" mode=""></image>
					</view>
					<!-- 右边 -->
					<view class="taskRight">
						<view class="status" :class="isDone==true?'viewRanking':'study'">
							{{isDone==true?'查看排行':'去学习'}}
						</view>
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
				isDone: true
			}
		},
		methods: {
			// 返回
			goBack() {
				uni.navigateBack({
					delta: 1
				});
			},
			// 去学习跳转
			toStudy() {
				uni.navigateTo({
					url: '../wordTasks/wordTaskLearning/study/index'
				})
			},
		}
	}
</script>

<style lang="scss">
	.wordTasks {
		.wordTasksConBox {
			margin-top: 160rpx;
			padding: 0 40rpx;
			box-sizing: border-box;

			.taskVocabularyBox {
				width: 99%;
				border: 1px solid rgba(243, 245, 245, 1);
				border-radius: 5px;

				.taskBox {
					background: rgba(255, 255, 255, 1);
					width: 100%;
					padding: 0rpx 40rpx;
					border-bottom: 1px solid rgba(243, 245, 245, 1);
					border-radius: 5px 5px 0px 0px;
					box-sizing: border-box;
					overflow: hidden;
					margin-bottom: 16rpx;

					.taskLeft {
						float: left;
						padding: 32rpx 0;
						box-sizing: border-box;

						.taskTitle {
							font-size: 30rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: rgba(46, 53, 72, 1);

							.taskNum {
								font-size: 30rpx;
								font-family: SF Pro Display;
								font-weight: 500;
								color: rgba(253, 144, 35, 1);
							}
						}

						.taskTime {
							font-size: 24rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: rgba(151, 157, 171, 1);
							margin-top: 8rpx;
						}
					}

					.taskCenter {
						float: left;
						width: 130rpx;
						height: 130rpx;

						image {
							display: inline-block;
							width: 130rpx;
							height: 130rpx;
						}
					}

					.taskRight {
						float: right;
						margin-top: 48rpx;

						.status {
							width: 130rpx;
							height: 52rpx;
							opacity: 1;
							border-radius: 40rpx;
							font-size: 24rpx;
							font-family: PingFang SC;
							font-weight: 400;
							text-align: center;
							line-height: 52rpx;
						}

						.study {
							background: linear-gradient(90deg, rgba(15, 196, 183, 1) 0%, rgba(63, 210, 177, 1) 100%);
							color: rgba(255, 255, 255, 1);
						}

						.viewRanking {
							background: rgba(255, 255, 255, 1);
							border: 1px solid rgba(15, 196, 183, 1);
							opacity: 1;
							color: #0FC4B7;
						}
					}
				}

			}

		}
	}
</style>
