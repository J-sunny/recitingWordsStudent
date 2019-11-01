<template>
	<view class="myBox">
		<!-- 头部 -->
		<view class="mHeadBox">
			<image class="backgroundImg" src="../../../static/images/bj@2x.png" mode=""></image>
			<view class="title">我的</view>
			<!-- 未登录状态 -->
			<view class="headPortraitBox" v-if="false">
				<image class="headPortrait" src="../../../static/images/people@2.png" mode=""></image>
				<view class="logins">登录/注册</view>
			</view>
			<view class="loginedHeadBox">
				<view class="infoBox" @click="toMyInformation()">
					<image class="infoTx" src="../../../static/images/people@2.png" mode=""></image>
					<label class="infoName">
						<view class="name">{{userInfoList.studentRealname}}</view>
						<view class="classed">{{userInfoList.studentClass==0?'尚未加入班级':userInfoList.studentClass}}</view>
					</label>
				</view>
				<!-- 登录未加入班级状态 -->
				<view class="jionClass" v-if="userInfoList.studentClass==0" @click="jion()">加入班级</view>
			</view>
		</view>
		<!-- 内容 -->
		<view class="myConBox">
			<!-- 我的数据 -->
			<view class="myDataBox">
				<view class="myDataTitleBox">
					<label for="" class="myDataTitle">我的数据</label>
					<label for="" class="seeDetails" @click="look()">
						查看详情<image class="arrowIcon" src="../../../static/images/arrow@2x.png" mode=""></image>
					</label>
				</view>
				<!-- 总列表 -->
				<view class="stuListBox">
					<view class="stuList">
						<!--  -->
						<view class="toDay">
							<view class="dayTitle">
								<image class="titleIcon" src="../../../static/images/today3.png"></image>今日学习
							</view>
							<view class="dayNum"><label class="bigFont">{{learningToday}}</label>词</view>
						</view>
						<view class="toDay">
							<view class="dayTitle">
								<image class="titleIcon" src="../../../static/images/Cumulative1.png"></image>累计学习
							</view>
							<view class="dayNum"><label class="bigFont">{{cumulativeLearning}}</label>词</view>
						</view>
						<view class="toDay">
							<view class="dayTitle">
								<image class="titleIcon" src="../../../static/images/todayTime.png"></image>今日学习时长
							</view>
							<view class="dayNum"><label class="bigFont">{{learningHoursToday}}</label>分钟</view>
						</view>
						<view class="toDay">
							<view class="dayTitle">
								<image class="titleIcon" src="../../../static/images/Cumulativelength3.png"></image>累计学习时长
							</view>
						<view class="dayNum"><label class="bigFont">{{accumulatedLearningTime}}</label>分钟</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 我的收藏 -->
			<view class="myCollectionBox">
				<view class="title">我的收藏</view>
				<view class="myCollectionConBox">
					<view class="conLeft">
						<view class="conleftTop">
							<image class="collegeIcon" src="../../../static/images/collegeTB@2x.png" mode=""></image>
							<label for="" class="allCollege">全部收藏：</label>
						</view>
						<view class="num">
							<label class="bigFont" for="">{{collectWordTotal}}</label><label for="">词</label>
						</view>
					</view>
					<view class="conRight">
						<label class="looAll" v-if="collectWordTotal==0" >查看全部</label>
						<label class="looAll looAllBlueColor" v-if="collectWordTotal>0" @click="toAllCollections()">查看全部</label>
						<label class="specialReview" v-if="collectWordTotal==0">专项复习</label>
						<label class="specialReview specialBlueColor" v-if="collectWordTotal>0">专项复习</label>
					</view>
				</view>
			</view>
			<!-- 退出登录 -->
			<view class="loginOut" @click="show=!show">
				退出登录
			</view>
		</view>
		<!-- 退出登录弹框 -->
		<view class="loginBigBox">
			<van-popup :show="show">
				<view class="loginBox">
					<view class="title">是否确定退出登录？</view>
					<view class="btnBox">
						<label class="cancel" @click="show=false">取消</label>
						<label class="confirm" @click="loginOut()">确定</label>
					</view>
				</view>
			</van-popup>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				studentId: "",
				collectWordTotal: "",
				userInfoList: [],
				learningToday: 0,
				cumulativeLearning: 0,
				learningHoursToday: 0,
				accumulatedLearningTime: 0,
				studentRecordList:[],
				studentAvatar:"",
				studentRealname:""
				
			}
		},
		methods: {
			// 返回
			goBack() {
				uni.navigateBack({
					delta: 1
				});
			},
			// 加入班级跳转
			jion() {
				uni.navigateTo({
					url: 'jionClass/index'
				})
			},
			// 查看详情跳转
			look() {
				uni.navigateTo({
					url: 'dataDetails/index?studentId='+this.studentId+"&studentRealname="+this.studentRealname+"&studentAvatar="+this.studentAvatar
				})
			},
			// 个人资料跳转
			toMyInformation() {
				uni.navigateTo({
					url: 'myInformation/index'
				})
			},
			// 查看全部收藏跳转
			toAllCollections() {
				uni.navigateTo({
					url: 'allCollections/index'
				})
			},
			// 退出登录
			loginOut() {
				this.$minApi.loginOut({}).then(data => {
					// Toast(data.msg);
					console.log(data)
					// uni.removeStorageSync('token');
					uni.clearStorage();
					uni.redirectTo({
						url: '../my/login/index'
					});
				})
				this.show = false
			},
			// 获取个人信息
			getUserInfo() {
				this.$minApi.getUserInfo({}).then(data => {
					getApp().globalData.schoolId = data.data.belongSchoolId
					getApp().globalData.studentId = data.data.studentId
					 uni.setStorageSync('studentId', data.data.studentId);
					this.studentId = data.data.studentId
					this.studentRealname=data.data.studentRealname
					this.studentAvatar=data.data.studentAvatar
					this.userInfoList = data.data
					// 获取收藏
					this.$minApi.getCollectWordsList({
						studentId: this.studentId
					}).then(data => {
						this.collectWordTotal = data.data.collectWordTotal
					})
					this.getStudentRecord(data.data.studentId)

				})
			},
			// 获取用户学习情况(今日时长,今日单词,总时长,总单词)
			getStudentRecord(studentId) {
				this.$minApi.getStudentRecord({
					studentId: studentId
				}).then(data => {
					this.studentRecordList = data.data
					this.studentRecordList.forEach(val => {
						if (val.dateType == "all") {
							this.cumulativeLearning = val.exerciseCount
							this.accumulatedLearningTime = val.lengthOfStudy
						} else if (val.dateType == "today") {
							this.learningToday = val.exerciseCount
							this.learningHoursToday = val.lengthOfStudy
						}
					})
				})
			},


		},
		created() {
			this.getUserInfo()
			// 没有登录则跳转到登录页面
			// if (!uni.getStorageSync('token')) {
			// 	uni.redirectTo({
			// 		url: 'login/index'
			// 	});
			// }
		},
	}
</script>

<style lang="scss">
	page {
		background: #F5F7F7 !important;
	}

	.myBox {

		// 头部
		.mHeadBox {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;

			.backgroundImg {
				width: 100%;
				height: 424rpx;
			}

			.title {
				position: fixed;
				top: 58rpx;
				font-size: 36rpx;
				left: 340rpx;
				font-family: PingFang SC;
				font-weight: 800;
				color: rgba(255, 255, 255, 1);
				opacity: 1;
			}

			// 未登录状态
			.headPortraitBox {

				.headPortrait {
					width: 96rpx;
					height: 96rpx;
					background: rgba(201, 201, 201, 1);
					opacity: 1;
					border-radius: 50%;
					position: absolute;
					top: 172rpx;
					left: 328rpx;
				}

				.logins {
					text-align: center;
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(255, 255, 255, 1);
					opacity: 1;
					margin-top: 12rpx;
					text-align: center;
					display: block;
					position: absolute;
					top: 280rpx;
					left: 308rpx;
				}
			}

			// 登录未加入班级状态
			.loginedHeadBox {
				position: fixed;
				top: 196rpx;
				left: 0rpx;
				overflow: hidden;
				width: 100%;
				box-sizing: border-box;
				padding: 0 40rpx;

				.infoBox {
					float: left;
					overflow: hidden;

					.infoTx {
						width: 96rpx;
						height: 96rpx;
						background: rgba(0, 0, 0, 0);
						border: 6rpx solid rgba(85, 229, 208, 1);
						border-radius: 50%;
						opacity: 1;
						float: left;
					}

					.infoName {
						margin-left: 32rpx;
						float: left;

						.name {
							font-size: 32rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: rgba(255, 255, 255, 1);
							opacity: 1;
						}

						.classed {
							font-size: 26rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: rgba(255, 255, 255, 1);
							opacity: 1;
							margin-top: 20rpx;
						}
					}
				}

				.jionClass {
					float: right;
					width: 134rpx;
					height: 52rpx;
					background: rgba(255, 255, 255, 1);
					opacity: 1;
					border-radius: 40rpx;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					line-height: 52rpx;
					color: rgba(3, 191, 183, 1);
					opacity: 1;
					text-align: center;
					margin-right: 40rpx;
				}
			}
		}

		// 内容
		.myConBox {
			padding: 0 40rpx;
			box-sizing: border-box;
			overflow: hidden;
			margin-top: 424rpx;

			// 我的数据
			.myDataBox {
				overflow: hidden;

				.myDataTitleBox {
					overflow: hidden;

					.myDataTitle {
						font-size: 32rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: rgba(46, 53, 72, 1);
						opacity: 1;
						float: left;
					}

					.seeDetails {
						float: right;
						font-size: 26rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: rgba(92, 99, 113, 1);
						opacity: 1;

						.arrowIcon {
							width: 16rpx;
							height: 26rpx;
							margin-left: 8rpx;
						}
					}
				}

				.stuListBox {
					margin-top: 20rpx;

					.stuList {
						width: 686rpx;
						height: 352rpx;
						background:#FFFFFF;
						box-shadow: 0px 8rpx 36rpx rgba(201, 201, 201, 0.15);
						opacity: 1;
						border-radius: 16rpx;
						padding: 40rpx 0 0 48rpx;
						-webkit-box-sizing: border-box;
						-moz-box-sizing: border-box;
						box-sizing: border-box;

						.toDay {
							width: 50%;
							height: 50%;
							float: left;

							.dayTitle {
								font-size: 24rpx;
								font-weight: bold;
								color: rgba(92, 99, 113, 1);

								.titleIcon {
									width: 28rpx;
									height: 28rpx;
									margin-right: 16rpx;
								}
							}

							.dayNum {
								font-size: 16rpx;
								font-weight: 400;
								color: rgba(153, 153, 153, 1);

								.bigFont {
									font-size: 48rpx;
									font-weight: normal;
									color: rgba(46, 53, 72, 1);
									margin-left: 44rpx;
									margin-right: 8rpx;
								}
							}
						}
					}

				}

			}

			// 我的收藏
			.myCollectionBox {
				margin-top: 48rpx;

				.title {
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: rgba(46, 53, 72, 1);
					opacity: 1;
				}

				.myCollectionConBox {
					width: 100%;
					height: 180rpx;
					background: #FFFFFF;
					opacity: 1;
					border-radius: 20rpx;
					overflow: hidden;
					padding: 40rpx;
					box-sizing: border-box;
					margin-top: 20rpx;

					.conLeft {
						float: left;

						.conleftTop {
							.collegeIcon {
								width: 28rpx;
								height: 28rpx;
							}

							.allCollege {
								font-size: 24rpx;
								font-family: PingFang SC;
								font-weight: 400;
								color: #5C6371;
								opacity: 1;
								margin-left: 16rpx;
							}
						}

						.num {
							font-size: 16rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: rgba(153, 153, 153, 1);
							opacity: 1;
							margin-left: 44rpx;

							.bigFont {
								font-size: 48rpx;
								font-family: SF Display;
								font-weight: normal;
								color: rgba(46, 53, 72, 1);
								opacity: 1;
								margin-right: 8rpx;
							}
						}
					}

					.conRight {
						float: right;
						margin-top: 28rpx;

						.looAll {
							display: inline-block;
							width: 136rpx;
							height: 56rpx;
							border: 2rpx solid rgba(201, 201, 201, 1);
							opacity: 1;
							border-radius: 40rpx;
							font-size: 24rpx;
							font-family: PingFang SC;
							font-weight: 400;
							line-height: 56rpx;
							color: rgba(201, 201, 201, 1);
							opacity: 1;
							text-align: center;
							margin-right: 32rpx;
						}
						.looAllBlueColor{
							border: 2rpx solid #03BFB7;
							color: #03BFB7;
						}

						.specialReview {
							display: inline-block;
							width: 136rpx;
							height: 56rpx;
							background: rgba(219, 219, 219, 1);
							opacity: 1;
							border-radius: 40rpx;
							font-size: 24rpx;
							font-family: PingFang SC;
							font-weight: 400;
							line-height: 56rpx;
							color: rgba(255, 255, 255, 1);
							opacity: 1;
							text-align: center;
						}
						.specialBlueColor{
							background:linear-gradient(180deg,rgba(3,191,183,1) 0%,rgba(31,217,181,1) 100%);
							opacity:1;
						}
					}
				}
			}

			// 退出登录
			.loginOut {
				width: 100%;
				height: 108rpx;
				background: #FFFFFF;
				opacity: 1;
				border-radius: 20rpx;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 400;
				line-height: 108rpx;
				color: rgba(46, 53, 72, 1);
				opacity: 1;
				text-align: center;
				margin-top: 40rpx;
				margin-bottom: 12rpx;
			}


		}

		// 退出登录弹框
		.loginBigBox {
			overflow: hidden;

			.van-popup {
				border-radius: 28rpx;
			}

			.loginBox {
				width: 540rpx;
				height: 280rpx;
				background: rgba(255, 255, 255, 1);
				opacity: 1;
				overflow: hidden;


				.title {
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(46, 53, 72, 1);
					opacity: 1;
					margin-top: 84rpx;
					margin-bottom: 64rpx;
					text-align: center;
				}

				.btnBox {
					overflow: hidden;

					.cancel {
						display: inline-block;
						width: 260rpx;
						height: 88rpx;
						background: rgba(0, 0, 0, 0);
						font-size: 36rpx;
						font-family: PingFang SC;
						font-weight: 400;
						line-height: 88rpx;
						color: rgba(204, 204, 204, 1);
						opacity: 1;
						border-top: 2rpx solid #EBEBEB;
						border-right: 2rpx solid #EBEBEB;
						text-align: center;
					}

					.confirm {
						display: inline-block;
						border-top: 2rpx solid #EBEBEB;
						width: 270rpx;
						height: 88rpx;
						background: rgba(0, 0, 0, 0);
						font-size: 36rpx;
						font-family: PingFang SC;
						font-weight: 400;
						line-height: 88rpx;
						color: rgba(3, 191, 183, 1);
						opacity: 1;
						text-align: center;
					}
				}
			}

		}


	}
</style>
