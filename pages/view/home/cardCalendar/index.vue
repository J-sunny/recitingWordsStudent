<template>
	<view class="calendarBox">
		<!-- 头部 -->
		<view class="headBox">
			<view class="headTitle">打卡日历</view>
			<van-icon @tap='goBack()' class='headArrow' name="arrow-left" />
		</view>
		<view class="signInBox">
			<!-- 累计签到 -->
			<view class="cumulativeCheckBox">
				<view class="days">{{signInInList.signInInfoCount}}</view>
				<view class="datText">累计签到(天)</view>
			</view>
			<!-- 签到 -->
			<view class="CheckInStatusBox">
				<view class="left">
					<view class="status" v-if="checkInStatus==0">今日尚未签到</view>
					<view class="status" v-if="checkInStatus==1">今日已签到</view>
					<view class="text">完成当日学习即可签到</view>
				</view>
				<view class="right">
					<label v-if="checkInStatus==0" class="siginInBtn notSiginIned" @click="siginIn()">签到</label>
					<label v-if="checkInStatus==1" class="siginInBtn siginIned">已签到</label>
				</view>
			</view>
		</view>
		<!-- 日历 -->
		<view class="calendar">
			<uni-calendar :insert="true" :lunar="true" :selected="selected" :disable-before="false" @change="change" />
		</view>
	</view>
</template>


<script>
	import
	uniCalendar
	from "../../../../components/uni-calendar/uni-calendar"
	export default {
		components: {
			uniCalendar
		},
		data() {
			return {
				selected: [],
				signInInList: [],
				year: '',
				month: '',
				day: '',
				checkInStatus: "",
				completedOfToday: ''
			}
		},

		methods: {
			// 返回
			goBack() {
				uni.navigateBack({
					delta: 1
				});
			},
			// 日历
			change(e) {
				console.log(e)
			},
			// 获取当日时间
			getDate() {
				var now = new Date();
				this.year = now.getFullYear();
				this.month = now.getMonth() + 1;
				this.day = now.getDate();
				if (this.month < 10) {
					this.month = '0' + this.month;
				};
				if (this.day < 10) {
					this.day = '0' + this.day;
				};
				this.getSignInList(this.year, this.month)
			},
			// 签到
			siginIn() {
				if (this.completedOfToday == 0) {
					uni.showToast({
						title: '请先完成每日一练的计划单词数！',
						icon:'none'
					})
				} else {
					this.$minApi.signIn({
						signInDate: systemDate,
						signInMonth: this.month,
						signInYear: this.year,
						studentId: uni.getStorageSync('studentId')
					}).then(data => {
						this.selected.push({
							date: systemDate
						})
						this.checkInStatus = 1
						uni.showToast({
							title: '签到成功！',
							icon:'none'
						})
					})
				}
				let systemDate = this.year + '-' + this.month + '-' + this.day;

				console.log(this.selected)
			},

			//获取已签到日期列表
			getSignInList(signInYear, signInMonth) {
				this.$minApi.getSignInList({
					signInMonth: signInMonth,
					signInYear: signInYear,
					studentId: uni.getStorageSync('studentId')
				}).then(data => {
					console.log(data)
					this.signInInList = data.data
					data.data.signInInfoList.forEach(val => {
						this.selected.push({
							date: val.signInDate
						})
						console.log(this.selected)
					})
				})
			}



		},
		onLoad(options) {
			this.checkInStatus = options.checkInStatus
			this.getDate()
			this.completedOfToday = options.completedOfToday
		}
	};
</script>


<style lang="scss">
	.calendarBox {
		background: #FFFFFF;

		.signInBox {
			margin-top: 164rpx;
			padding: 0 40rpx;
			box-sizing: border-box;
			overflow: hidden;

			// 累计签到
			.cumulativeCheckBox {
				width: 100%;
				height: 196rpx;
				background-image: url(../../../../static/images/bg@2x.png);
				opacity: 1;
				background-size: 100% 100%;
				border-radius: 10px;
				overflow: hidden;

				.days {
					margin-top: 34rpx;
					text-align: center;
					font-size: 64rpx;
					font-family: SF Pro Display;
					font-weight: 500;
					color: rgba(255, 255, 255, 1);
					opacity: 1;
				}

				.datText {
					margin-top: 16rpx;
					text-align: center;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(255, 255, 255, 0.80);
					opacity: 1;
				}
			}

			// 签到
			.CheckInStatusBox {
				width: 100%;
				border-bottom: 2rpx solid #EFEFF1;
				padding: 56rpx 0 46rpx 0;
				overflow: hidden;

				.left {
					float: left;

					.status {
						font-size: 30rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: rgba(46, 53, 72, 1);
						opacity: 1;
					}

					.text {
						margin-top: 8rpx;
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(151, 157, 171, 1);
						opacity: 1;
					}
				}

				.right {
					float: right;

					.siginInBtn {
						display: inline-block;
						width: 234rpx;
						height: 64rpx;
						opacity: 1;
						border-radius: 40rpx;
						font-size: 28rpx;
						text-align: center;
						font-family: PingFang SC;
						font-weight: 400;
						opacity: 1;
						line-height: 64rpx;
					}

					.notSiginIned {
						background: linear-gradient(90deg, rgba(15, 196, 183, 1) 0%, rgba(63, 210, 177, 1) 100%);
						color: rgba(255, 255, 255, 1);
					}

					.siginIned {
						background-color: #F5F6FB;
						color: #A8AAB3;
					}
				}
			}
		}

		// 日历
		.calendar {
			padding: 0 40rpx;
			box-sizing: border-box;
			margin-top: 64rpx;

			// 修改的样式
			.uni-calender__body-date-week .uni-calender__date .uni-calender__circle-box {
				border-radius: 50rpx;
			}

			.uni-calender__body-date-week .uni-calender__date.uni-calender__date-current.uni-calender__active .uni-calender__circle-box {
				background: #fd2e32;
			}

			.uni-calendar__wrapper .uni-calenda__content .uni-calendar__header {
				border: none;
			}

			.uni-calender__body-date-week {
				border: none;
			}





		}
	}
</style>
