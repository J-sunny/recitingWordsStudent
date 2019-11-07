<template>
	<view class="infoBox">
		<view class="hedbox">
			<!-- 顶部背景图 -->
			<image class='site-img' src="../../../../static/images/bj@2x.png" catchtap='navmap'></image>
			<!-- 返回按钮 -->
			<view class="arrow" bindtap="goBack" @tap="goBack"></view>
			<!-- 标题 -->
			<view class="title">我的资料</view>
			<!-- 头像 -->
			<view class="touBox">
				<view class="touXiang" @tap="show()">
					<image :src="picSrc"></image>
				</view>
			</view>
		</view>
		<!-- 内容 -->
		<view class="infoCon">
			<view class="conBox">
				<label class="name">昵称/姓名</label><label class="con">{{getUserInfoList.studentName}}</label>
			</view>

			<view class="conBox" @tap="show1()">
				<label class="name">性别</label><label class="con cons">{{studentGender==0?'男':'女'}}</label><label class="arrowRight"></label>
			</view>
			<view class="conBox" @tap="show2()">
				<label class="name">生日</label><label class="con cons">{{studentBirth}}</label><label class="arrowRight"></label>
			</view>
			<view class="conBox">
				<label class="name">学校</label><label class="con">{{getUserInfoList.schoolName}}</label>
			</view>
			<view class="conBox">
				<label class="name">年级</label><label class="con">{{getUserInfoList.studentGrade}}</label>
			</view>
			<view class="conBox">
				<label class="name">班级</label><label class="con">{{getUserInfoList.studentClass}}</label>
			</view>
			<navigator url="changePassword" class="conBox">
				<label class="name">修改密码</label>
				<navigator url="changePassword" class="arrowRight"></navigator>
			</navigator>
		</view>

		<!-- 头像弹出框 -->
		<view class="headPicPopup">
			<van-popup :show="showTx" position="bottom">
				<view class="popupBox">
					<view class="selectBox">
						<view class="opcition" @click="selectPic('camera')">拍照</view>
						<view class="" @click="selectPic('album')">从手机相册选择</view>
					</view>
					<view class="cancel" @tap="close()">取消</view>
				</view>
			</van-popup>
		</view>

		<!-- 性别弹出框 -->
		<view class="genderPopup">
			<van-popup :show="showSex" position="bottom">
				<view class="popupBox">
					<van-picker show-toolbar title="性别" :columns='columns' :default-index='getUserInfoList.studentGender' @cancel="onCancel()"
					 @confirm="onConfirm()" />
				</view>
			</van-popup>
		</view>

		<!-- 生日弹出框 -->
		<view class="birthday">
			<van-popup :show="showBir" position="bottom">
				<van-datetime-picker type="date" :value=currentDate @cancel='birCancel()' @input="birInput()" @confirm=birConfirm()
				 min-date=0 :formatter="formatter" :max-date="maxDate" />
			</van-popup>
		</view>
		<!-- <p @click='d()'>点击真的</p> -->
	</view>
</template>

<script>
	var time = require('../../../utils/getDate.js');

	export default {
		data() {
			return {
				columns: ['男', '女'],
				maxDate: new Date().getTime(),
				studentBirth: '',
				studentGender: '',
				formatter(type, value) {
					if (type === 'year') {
						return `${value}年`;
					} else if (type === 'month') {
						return `${value}月`;
					} else if (type === 'day') {
						return `${value}日`;
					}
					return value;
				},
				getUserInfoList: [],
				showSex: false,
				showBir: false,
				showTx: false,
				picSrc: '',
				Areaaddress: '', //当前位置
				userId: ""
			}
		},
		components: {
			// popupLayer,
		},
		methods: {
			// 返回
			goBack() {
				uni.navigateBack({
					delta: 1
				});
			},
			// 头像弹框
			show(type) {
				this.showTx = true
			},
			close(type) {
				this.showTx = false
			},
			// 性别弹框
			show1() {
				this.showSex = true
			},
			close1() {
				this.showSex = false
			},

			onConfirm(event) {
				// console.log(`当前值：${value}, 当前索引：${index}`)
				this.close1()
				const {
					picker,
					value,
					index
				} = event.detail;
				console.log(`当前值：${value}, 当前索引：${index}`);
				this.studentGender = value
				this.$minApi.updatetUserInfo({
					userIdenty: 0,
					id: this.userId,
					gender: index
				}).then(data => {
					if (data.code == 200) {
						uni.showToast({
							title: "修改成功！",
							icon: "none"
						})
					} else {
						uni.showToast({
							title: data.msg,
							icon: "none"
						})
					}
					console.log(data)
					this.getUserInfo()
				})
				// console.log(data)
				
				this.getUserInfo()
			},

			onCancel() {
				console.log('取消');
				this.close1()
			},

			// 生日弹框
			show2() {
				this.showBir = true
			},
			close2() {
				this.showBir = false
			},
			birInput(val) {
				// console.log(val)
			},
			birConfirm(val) {
				console.log(val)
				// this.setData({
				// 	currentDate: val.detail
				// });
				this.studentBirth = time.formatTime(new Date(val.detail), 'Y-M-D')
				console.log(this.teacherBirth)
				// var a=time.formatTimeTwo(this.birthday)				
				this.close2()
				
				
				this.$minApi.updatetUserInfo({
					userIdenty: 0,
					id: this.userId,
					birthday: this.studentBirth
				}).then(data => {
					if (data.code == 200) {
						uni.showToast({
							title: "修改成功！",
							icon: "none"
						})
					} else {
						uni.showToast({
							title: data.msg,
							icon: "none"
						})
					}
					console.log(data)
					// this.getUserInfo()
				})
				
				
			},
			birCancel() {
				this.close2()
			},
			// 获取用户信息
			getUserInfo() {
				this.$minApi.getUserInfo({}).then(data => {
					// console.log(data)
					this.getUserInfoList = data.data
					this.studentBirth = data.data.studentBirth
					this.studentGender = data.data.studentGender
					this.userId = data.data.studentId
				})
			},
			// 从本地相册选择图片或使用相机拍照。
			selectPic(type) {
			let this_ = this
			uni.chooseImage({
				count: 1,
				sourceType: [type],
				success: (res) => {
					console.log(res)
					this_.close('headPic')
					this_.picSrc = res.tempFilePaths[0]
			
					const tempFilePaths = res.tempFilePaths;
					const token = uni.getStorageSync('token');
					uni.uploadFile({
						url: 'http://148.70.55.201:8089/backwordSystem/uploadFile',
						filePath: tempFilePaths[0],
						fileType: "image",
						name: 'file',
						header: {
							'content-type': 'multipart/form-data',
							'X-Token': token,
						},
						formData: {
							userId: this.userId,
							userIdenty: "0"
						},
						success: (uploadFileRes) => {
							console.log(uploadFileRes);
							console.log(uploadFileRes.data.filePath);
							if (uploadFileRes.statusCode == 200) {
								this.userImg = "http://148.70.55.201:8089/backwordSystem" + uploadFileRes.data.filePath
								this.$minApi.updatetUserInfo({
									userIdenty: "0",
									id: this.userId,
									avatarPath: this.userImg
								}).then(data => {
									console.log(data)
									// this.getUserInfo()
								})
							} else {
								console.log("ddd")
								uni.showToast({
									title: "修改失败，请稍后再试！",
									icon: "none"
								})
							}
			
						}
					});
				},
			
			})
						
			}
		},
		created() {
			this.birthday = time.formatTime(new Date(this.birthday), 'Y-M-D')
			this.getUserInfo()
		}
	}
</script>

<style lang="scss">
	.infoBox {
		.van-popup {
			background-color: rgba($color: #000000, $alpha: 0);
		}

		.hedbox {

			// 顶部背景图片
			.site-img {
				width: 100%;
				position: absolute;
				left: 0;
				top: 0;
				height: 424rpx;
				z-index: 10;
			}

			// 返回按钮
			.arrow {
				position: fixed;
				left: 40rpx;
				top: 73rpx;
				display: flex;
				width: 20rpx;
				height: 20rpx;
				border-left: 4rpx solid #fff;
				border-top: 4rpx solid #fff;
				transform: rotate(-45deg);
				z-index: 20;
			}

			// 标题
			.title {
				width: 100%;
				text-align: center;
				position: absolute;
				left: 0;
				top: 60rpx;
				font-size: 36rpx;
				font-weight: 800;
				color: rgba(255, 255, 255, 1);
				opacity: 1;
				z-index: 15;
			}

			// 头像
			.touBox {
				width: 100%;
				position: absolute;
				z-index: 30;
				top: 160rpx;

				.touXiang,
				.touXiang image {
					width: 108rpx;
					height: 108rpx;
					margin: 0 auto;
					background-color: #F1F1F1;
					border-radius: 50%;
				}
			}
		}

		// 内容
		.infoCon {
			margin-top: 358rpx;
			padding: 48rpx 40rpx 0;
			box-sizing: border-box;

			.conBox {
				width: 100%;
				height: 112rpx;
				line-height: 112rpx;
				background: rgba(255, 255, 255, 1);
				padding: 0 32rpx;
				box-sizing: border-box;
				border-bottom: 2rpx solid #EFEFF1;
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 400;
				position: relative;

				.name {
					float: left;
					color: rgba(46, 53, 72, 1);
				}

				.con {
					float: right;
					color: rgba(151, 157, 171, 1);
				}

				.cons {
					margin-right: 32rpx;
				}

				.arrowRight {
					display: inline-block;
					width: 15rpx;
					height: 15rpx;
					border-left: 2rpx solid #979DAB;
					border-top: 2rpx solid #979DAB;
					transform: rotate(135deg);
					z-index: 20;
					position: absolute;
					right: 0;
					top: 50%;
					margin-top: -8rpx;
					margin-right: 32rpx;
				}
			}
		}

		// 头像弹出框
		.headPicPopup {
			overflow: hidden;

			.popupBox {
				padding: 0 32rpx;
				box-sizing: border-box;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 400;
				line-height: 100rpx;
				color: rgba(0, 0, 0, 1);
				text-align: center;

				.selectBox {
					width: 100%;
					height: 202rpx;
					background: rgba(255, 255, 255, 1);
					opacity: 1;
					border-radius: 28rpx;

					.opcition {
						border-bottom: 2rpx solid #EBEBEB;
					}
				}

				.cancel {
					width: 100%;
					height: 100rpx;
					background: rgba(255, 255, 255, 1);
					opacity: 1;
					border-radius: 28rpx;
					margin-top: 24rpx;
					margin-bottom: 16rpx;
				}

			}

		}

		// 性别弹出框
		.genderPopup {
			.popupBox {
				.opcition {
					width: 100%;
					height: 88rpx;
					background: rgba(248, 248, 248, 1);
					opacity: 1;
					line-height: 88rpx;

					position: relative;

					.cancel {
						position: absolute;
						left: 32rpx;
						font-size: 30rpx;
						font-weight: 400;
						color: rgba(102, 102, 102, 1);
					}

					.genders {
						display: inline-block;
						width: 100%;
						text-align: center;
						font-size: 32rpx;
						font-weight: bold;
						color: rgba(51, 51, 51, 1);
					}

					.confirm {
						position: absolute;
						right: 32rpx;
						font-size: 30rpx;
						font-weight: 400;
						color: rgba(102, 102, 102, 1);
					}
				}

				.male {
					text-align: center;
					width: 100%;
					height: 94rpx;
					line-height: 94rpx;
					background: #fff;
					opacity: 1;
					font-size: 40rpx;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
					border-bottom: 2rpx solid #EBEBEB;
				}

				.female {
					text-align: center;
					width: 100%;
					height: 94rpx;
					line-height: 94rpx;
					background: #fff;
					opacity: 1;
				}
			}
		}
	}
</style>
