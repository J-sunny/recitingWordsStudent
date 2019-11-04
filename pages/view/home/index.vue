<template>
	<view class="homeBox">
		<!-- 头部 -->
		<view class="headBox">
			<view class="headTitle">背单词</view>
		</view>
		<!-- 内容 -->
		<view class="homeConBox">
			<!-- 单词任务 -->
			<view class="wordTasksBox">
				<!-- 标题 -->
				<view class="title"><label class="verticalLine"></label>单词任务</view>
				<!-- 内容 -->
				<view class="TasksConBox">
					<view class="taskVocabularyBox">
						<view class="taskBox" v-for="item in taskListList" :key="item.taskId">
							<!-- 左边 -->
							<view class="taskLeft">
								<view class="taskTitle">任务词汇量：<label class="taskNum">{{item.allWordCount}}</label></view>
								<view class="taskTime">{{item.taskTime}}</view>
							</view>
							<!-- 中间 -->
							<view class="taskCenter" v-if="item.completeStatus==1">
								<image src="../../../static/images/Completed@2x.png" mode=""></image>
							</view>
							<!-- 右边 -->
							<view class="taskRight">
								<view class="status study" @click="toStudy(item.wordId,item.taskId)" v-if="item.completeStatus==0">
									去学习
								</view>
								<view @tap="viewRanking(item.taskId,item.allWordCount)" class="status viewRanking" v-if="item.completeStatus==1">
									查看排行
								</view>
							</view>
						</view>
					</view>

					<!-- 查看全部任务 -->
					<view class="lookMore" @tap="viewAllTasks()">
						查看全部任务
						<label class="arrow">
							<van-icon name="arrow" />
						</label>
					</view>
				</view>
			</view>
			<!-- 每日一练 -->
			<view class="dailyPractice">
				<!-- 标题 -->
				<view class="title">
					<view class="left">
						<label class="verticalLine"></label>每日一练
					</view>
					<view class="right" @click="toSignIn()">
						<label class="explain" v-if="dailyPracticeList.checkInStatus==0">完成当日学习即可签到</label>
						<label class="explain" v-if="dailyPracticeList.checkInStatus==1">今日已签到</label>
						<label class="sing">
							<!-- <van-icon name="sign" /> -->
							<image class="iconPic" src="../../../static/images/Path8@2x.png" mode=""></image>
						</label>
					</view>
				</view>
				<!-- 内容 -->
				<view class="practiceConBox">
					<view class="practiceCon">
						<view class="left">
							<image class="cover" src="../../../static/images/img_book1@2x.png" mode=""></image>
						</view>
						<view class="right">
							<view class="practiceTitleBox"><label for="" class="practiceTitle">{{dailyPracticeList.thesaurusName}}</label><label
								 for="" class="updatePlan" @tap="updatePlan()">
									<image class="updateIcon" src="../../../static/images/home_icon_switchover@2x.png" mode=""></image>修改计划
								</label></view>
							<view class="progressBar">
								<van-progress :percentage="progress" color="#0FC4B7" :show-pivot='false' />
							</view>
							<view class="progressInfo">
								<label class="learnedBox">
									<van-icon class='play' name="play" />
									<label for="" class="learnedNum">已学 {{dailyPracticeList.completeCount}}</label>
								</label>
								<label class="allWord">
									总词数 {{dailyPracticeList.thesaurusCount}}
								</label>
							</view>
						</view>
					</view>
					<!-- 复习 开始学习按钮 -->
					<view class="btnBox">
						<label class="review" @click="review">复习({{dailyPracticeList.reviewCount}})</label>
						<label class="startBtn" @click="study">开始学习({{dailyPracticeList.studyCount}})</label>
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
				isSing: false,
				dailyPracticeList: [],
				taskListList: [],
				progress: '',
				planCount: '',
				checkInStatus: ''
			}
		},
		methods: {
			// 查看排行跳转
			viewRanking(taskId, allWordCount) {
				uni.navigateTo({
					url: 'wordTasks/viewRanking/index?&taskId=' + taskId + "&allWordCount=" + allWordCount
				})
			},
			// 查看全部任务跳转
			viewAllTasks() {
				uni.navigateTo({
					url: 'wordTasks/index'
				})
			},
			// 修改计划跳转
			updatePlan() {
				uni.navigateTo({
					url: 'revisionPlan/index'
				})
			},
			// 去学习跳转
			toStudy(wordId, taskId) {
				uni.navigateTo({
					url: 'wordTasks/wordTaskLearning/study/index?wordId=' + wordId + "&taskId=" + taskId
				})
			},
			// 查看排行跳转
			toRanking(taskId) {
				console.log(taskId, 99)
				uni.navigateTo({
					url: 'viewRanking/index?&taskId=' + taskId
				})
			},
			// 签到页面跳转
			toSignIn() {
				uni.navigateTo({
					url: 'cardCalendar/index?checkInStatus=' + this.checkInStatus
				})
			},
			// 获取每日一练数据
			dailyPractice() {
				this.$minApi.dailyPractice({}).then(data => {
					console.log(data)
					this.dailyPracticeList = data.data
					this.progress = data.data.completeCount / data.data.thesaurusCount * 100
					this.planCount = data.data.planCount
					this.reviewCount = data.data.reviewCount
					this.checkInStatus = data.data.checkInStatus
					console.log(this.progress)
				})
			},
			// 每日一练----开始学习
			study() {
				if (this.planCount <= 0) {
					uni.showToast({
						title: '当前无学习计划单词数',
						icon: 'none'
					})
				} else {
					this.$minApi.study({
						wordCount: this.planCount
					}).then(data => {
						console.log(data)
						uni.navigateTo({
							url: 'wordTasks/wordTaskLearning/study/index?wordId=' + data.data[0].wordId
						})
					})
				}

			},
			// 每日一练----复习
			review() {
				if (this.reviewCount <= 0) {
					uni.showToast({
						title: '当前无复习计划单词数',
						icon: 'none'
					})
				} else {
					this.$minApi.review({
						wordCount: this.reviewCount
					}).then(data => {
						console.log(data)
						uni.navigateTo({
							url: 'wordTasks/wordTaskLearning/study/index?wordId=' + data.data[0].wordId
						})
					})
				}

			},
			// 获取个人任务列表
			taskList() {
				this.$minApi.taskList({
					page: 1,
					pageSize: 2
				}).then(data => {
					console.log(data)
					this.taskListList = data.data
				})
			}
		},
		onShow() {
			this.dailyPractice()
			this.taskList()
			
		}
	}
</script>

<style lang="scss">
	.homeBox {

		// 内容
		.homeConBox {
			padding: 0 40rpx;
			box-sizing: border-box;
			margin-top: 168rpx;

			// 单词任务
			.wordTasksBox {
				margin-top: 40rpx;

				// 标题
				.title {
					font-size: 36rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: rgba(46, 53, 72, 1);

					.verticalLine {
						display: inline-block;
						width: 6rpx;
						height: 30rpx;
						background: rgba(15, 196, 183, 1);
						opacity: 1;
						border-radius: 2px;
						margin-right: 12rpx;
					}
				}

				// 内容
				.TasksConBox {
					overflow: hidden;
					margin-top: 32rpx;

					.taskVocabularyBox {
						width: 99%;
						background: rgba(255, 255, 255, 1);
						border: 1px solid rgba(243, 245, 245, 1);
						border-radius: 5px;

						.taskBox {
							width: 100%;
							padding: 0rpx 40rpx;
							border-bottom: 1px solid rgba(243, 245, 245, 1);
							border-radius: 5px 5px 0px 0px;
							box-sizing: border-box;
							overflow: hidden;

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

					// 查看全部任务
					.lookMore {
						margin-top: 16rpx;
						width: 100%;
						height: 80rpx;
						background: rgba(255, 255, 255, 1);
						border: 1px solid rgba(235, 240, 240, 1);
						opacity: 1;
						border-radius: 5px;
						text-align: center;

						font-size: 26rpx;
						font-family: PingFang SC;
						font-weight: 400;
						line-height: 80rpx;
						color: rgba(92, 99, 113, 1);
						opacity: 1;
						overflow: hidden;

						.arrow {
							margin-left: 8rpx;
						}
					}
				}
			}

			// 每日一练
			.dailyPractice {
				margin-top: 64rpx;

				// 标题
				.title {
					overflow: hidden;

					.left {
						font-size: 36rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: rgba(46, 53, 72, 1);
						float: left;

						.verticalLine {
							display: inline-block;
							width: 6rpx;
							height: 30rpx;
							background: rgba(15, 196, 183, 1);
							opacity: 1;
							border-radius: 2px;
							margin-right: 12rpx;
						}
					}

					.right {
						float: right;

						.explain {

							font-size: 24rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: rgba(160, 180, 175, 1);
							opacity: 1;
						}

						.sing {
							margin-left: 16rpx;
							color: #2E483F;
							font-size: 30rpx;

							.iconPic {
								width: 40rpx;
								height: 40rpx;
							}
						}
					}
				}

				// 内容
				.practiceConBox {
					margin-top: 32rpx;
					padding: 48rpx 40rpx;
					box-sizing: border-box;
					background-color: #fff;
					border-radius: 5px;
					border: 1px solid rgba(243, 245, 245, 1);

					.practiceCon {
						overflow: hidden;

						.left {
							float: left;

							.cover {
								width: 60px;
								height: 80px;
								background: linear-gradient(316deg, rgba(167, 252, 70, 1) 0%, rgba(15, 196, 183, 1) 100%);
								box-shadow: 0px 2px 6px rgba(0, 129, 73, 0.16);
								opacity: 1;
								border-radius: 2px 5px 5px 2px;
							}
						}

						.right {
							width: 430rpx;
							float: left;
							margin-left: 32rpx;

							.practiceTitleBox {
								overflow: hidden;

								.practiceTitle {
									float: left;
									font-size: 30rpx;
									font-family: PingFang SC;
									font-weight: bold;
									color: rgba(46, 53, 72, 1);
									opacity: 1;
								}

								.updatePlan {
									float: right;
									display: inline-block;
									width: 132rpx;
									height: 40rpx;
									background: rgba(254, 255, 254, 1);
									border: 1px solid rgba(151, 157, 171, 1);
									opacity: 1;
									border-radius: 20px;
									font-size: 20rpx;
									font-family: PingFang SC;
									font-weight: 400;
									line-height: 40rpx;
									color: rgba(46, 53, 72, 1);
									text-align: center;

									.updateIcon {
										width: 16rpx;
										height: 16rpx;
									}
								}
							}

							.progressBar {
								display: block;
								margin-top: 40rpx;

							}

							.progressInfo {
								overflow: hidden;
								margin-top: 16rpx;
								line-height: 40rpx;


								.learnedBox {
									overflow: hidden;
									float: left;
									overflow: hidden;

									.play {
										color: rgba(62, 213, 147, 1);
										opacity: 1;
										font-size: 30rpx;
										float: left;
									}

									.learnedNum {
										display: inline-block;
										line-height: 40rpx;
										font-size: 22rpx;
										font-family: PingFang SC;
										font-weight: 400;
										color: rgba(92, 99, 113, 1);
										opacity: 1;
										float: left;
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
					}

					// 复习  开始学习按钮
					.btnBox {
						overflow: hidden;
						margin-top: 56rpx;

						.startBtn {
							float: right;
							width: 360rpx;
							height: 80rpx;
							background: linear-gradient(90deg, rgba(15, 196, 183, 1) 0%, rgba(63, 210, 177, 1) 100%);
							opacity: 1;
							border-radius: 40rpx;
							text-align: center;
							font-size: 30rpx;
							font-family: PingFang SC;
							font-weight: 400;
							line-height: 80rpx;
							color: rgba(255, 255, 255, 1);
							opacity: 1;
						}

						.review {
							float: left;
							width: 200rpx;
							height: 80rpx;
							background: rgba(243, 255, 254, 1);
							border: 1px solid rgba(17, 197, 183, 1);
							opacity: 1;
							border-radius: 40rpx;
							font-size: 30rpx;
							font-family: PingFang SC;
							font-weight: 400;
							line-height: 80rpx;
							color: rgba(3, 191, 183, 1);
							opacity: 1;
							text-align: center;
						}
					}
				}
			}
		}
	}
</style>
