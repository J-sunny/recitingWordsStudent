<template>
	<view class="loginBox">
		<!-- 头部 -->
		<view class="lheadBox">
			<image class="backgroundPic" src="../../../../static/images/bj@2x.png" mode=""></image>
			<view class="title">{{isLogin==true?'登录':'注册'}}</view>
			<view class="appName">背单词·学生端</view>
		</view>
		<!-- 内容 -->
		<view class="loginConBox">
			<view class="userNameBox">
				<image class="nameIcon" src="../../../../static/images/userNameTB@2x.png" mode=""></image>
				<input class="nameInput" v-model="username" placeholder='请输入用户名' type="text" value="" />
			</view>
			<view class="userNameBox">
				<image class="nameIcon" src="../../../../static/images/pwdTB@2x.png" mode=""></image>
				<input class="nameInput" v-model="password" placeholder='请输入密码' :password='true' type="text" value="" />
			</view>
			<view class="userNameBox" v-if="isLogin==false">
				<image class="nameIcon" src="../../../../static/images/pwdTB@2x.png" mode=""></image>
				<input class="nameInput" v-model="againPwd" placeholder='请确认密码' :password='true' type="text" value="" />
			</view>
			<!-- 登录按钮 -->
			<view class="loginBtn" @click="loginByAccount()" v-if='isLogin'>登录</view>
			<!-- 注册 -->
			<view class="loginBtn" v-if='!isLogin'>注册</view>
			<!-- 注册 -->
			<view class="register" @click="isLogin=!isLogin">{{isLogin==true?'没有账号？注册':'已有账号？登录'}}</view>
		</view>
		<van-toast id="van-toast" />
	</view>
</template>

<script>
	import Toast from '../../../../wxcomponents/vant-weapp/dist/toast/toast';
	export default {
		data() {
			return {
				isLogin: true,
				username: '',
				password: '',
				againPwd: ''
			}
		},
		methods: {
			// 登录
			loginByAccount() {
				if (this.username == '' || this.password == '') {
					Toast('请输入用户名或者密码');
					return
				}
				this.$minApi.loginByAccount({
					password: this.password,
					username: this.username,
					userSchoolId: '1',
					userIdenty: '0'
				}).then(data => {
					if (data.code == 200) {
						Toast(data.msg);
						uni.setStorageSync('token', data.data.token),
							uni.switchTab({
								url: '../../home/index'
							})
					} else {
						Toast(data.msg);
					}

				})
			},
		},
		created() {

		}
	}
</script>

<style lang="scss">
	page {
		background: #FFFFFF !important;
	}

	.loginBox {

		// 头部
		.lheadBox {

			.backgroundPic {
				width: 100%;
				height: 424rpx;
				position: fixed;
				top: 0;
				left: 0;
			}

			.title {
				position: fixed;
				top: 58rpx;
				left: 340rpx;
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: 800;
				color: rgba(255, 255, 255, 1);
				opacity: 1;
			}

			.appName {
				position: fixed;
				top: 176rpx;
				left: 224rpx;
				font-size: 48rpx;
				font-family: Alibaba PuHuiTi;
				font-weight: bold;
				color: rgba(255, 255, 255, 1);
				opacity: 1;
			}
		}

		// 内容
		.loginConBox {
			position: fixed;
			top: 347rpx;
			left: 0;
			width: 100%;
			background: #FFFFFF;
			opacity: 1;
			border-radius: 24rpx 24rpx 0px 0px;
			// margin-top: 362rpx;
			padding: 60rpx 40rpx;
			box-sizing: border-box;

			.userNameBox {
				position: relative;
				margin-bottom: 40rpx;

				.nameIcon {
					width: 28rpx;
					height: 28rpx;
					position: absolute;
					top: 32rpx;
					left: 0;
				}

				.nameInput {
					width: 335px;
					height: 44px;
					border-bottom: 2rpx solid #F0F0F0;
					padding-left: 53rpx;
					box-sizing: border-box;
					font-size: 30rpx;
					font-family: PingFang SC;
				}
			}

			// 登录按钮
			.loginBtn {
				width: 311px;
				height: 88rpx;
				background: rgba(3, 191, 183, 1);
				opacity: 1;
				border-radius: 44rpx;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 400;
				line-height: 88rpx;
				color: rgba(255, 255, 255, 1);
				opacity: 1;
				margin: 212rpx auto 0;
				text-align: center;
			}

			// 注册
			.register {

				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(3, 191, 183, 1);
				opacity: 1;
				text-align: center;
				margin-top: 64rpx;
			}
		}

	}
</style>
