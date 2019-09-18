<template>
	<view class="jionClassedBox">
		<!-- 头部 -->
		<view class="jheadBox">
			<image class="backgroundImg" src="../../../../static/images/bj@2x.png" mode=""></image>
			<!-- 返回按钮 -->
			<view class="arrow" @tap="goBack()"></view>
			<view class="title">加入班级</view>
		</view>
		<!-- 内容 -->
		<view class="joinConBox">
			<view class="selectBox" @click="showBox('School')">
				<image class="iconPic" src="../../../../static/images/schoolTB@2x.png" mode=""></image>
				<label v-if="selectSchool==''" class="placeholder" for="">请选择学校</label>
				<label v-if="selectSchool!=''" class="placeholder" for="">{{selectSchool}}</label>
				<image class="s_arrow" src="../../../../static/images/arrow@2x.png" mode=""></image>
			</view>
			<view class="selectBox" @click="showBox( 'Grade')">
				<image class="iconPic" src="../../../../static/images/nianjiTB@2x.png" mode=""></image>
				<label v-if="selectGrade==''" class="placeholder" for="">请选择年级</label>
				<label v-if="selectGrade!=''" class="placeholder" for="">{{selectGrade}}</label>
				<image class="s_arrow" src="../../../../static/images/arrow@2x.png" mode=""></image>
			</view>
			<view class="selectBox" @click="showBox('Class')">
				<image class="iconPic" src="../../../../static/images/classTB@2x.png" mode=""></image>
				<label v-if="selectClass==''" class="placeholder" for="">请选择班级</label>
				<label v-if="selectClass!=''" class="placeholder" for="">{{selectClass}}</label>
				<image class="s_arrow" src="../../../../static/images/arrow@2x.png" mode=""></image>
			</view>
			<!-- 确认按钮 -->
			<view class="makeSure">确 认</view>
		</view>

		<!-- 学校弹框 -->
		<van-popup :show="showSchool" position="bottom" style="height: 30%">
			<van-picker show-toolbar title="请选择学校" :columns="columnsSchool" @cancel="onCancel('School')" @confirm="onConfirmSchool()" />
		</van-popup>
		<!-- 年级弹框 -->
		<van-popup :show="showGrade" position="bottom" style="height: 30%">
			<van-picker show-toolbar title="请选择年级" :columns="columnsGrade" @cancel="onCancel('Grade')" @confirm="onConfirmGrade()" />
		</van-popup>
		<!-- 学校弹框 -->
		<van-popup :show="showClass" position="bottom" style="height: 30%">
			<van-picker show-toolbar title="请选择班级" :columns="columnsClass" @cancel="onCancel('Class')" @confirm="onConfirmClass()" />
		</van-popup>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				showSchool: false,
				columnsSchool: [],
				showGrade: false,
				columnsGrade: ['XX年级', 'XX年级', 'XX年级', 'XX年级', 'XX年级', 'XX年级'],
				showClass: false,
				columnsClass: ['XX班级', 'XX班级', 'XX班级', 'XX班级', 'XX班级', 'XX班级'],
				selectSchool: '',
				selectClass: '',
				selectGrade: ''
			}
		},
		methods: {
			// 返回
			goBack() {
				uni.navigateBack({
					delta: 1
				});
			},
			// 学校弹框
			showBox(val) {
				if (val == 'School') {
					this.showSchool = !this.showSchool
				}
				if (val == 'Grade') {
					this.showGrade = !this.showGrade
				}
				if (val == 'Class') {
					this.showClass = !this.showClass
				} else {}
			},
			onCancel(val) {
				if (val == 'School') {
					this.showSchool = false
				}
				if (val == 'Grade') {
					this.showGrade = false
				}
				if (val == 'Class') {
					this.showClass = false
				} else {}
			},
			onConfirmSchool(e) {
				this.showSchool = false
				console.log(e)
				this.selectSchool = e.detail.value
			},
			onConfirmGrade(e) {
				this.showGrade = false
				this.selectGrade = e.detail.value
			},
			onConfirmClass(e) {
				this.showClass = false
				this.selectClass = e.detail.value
			},
			// 获取学校下拉列表
			getSchoolList() {
				this.$minApi.schoolList({}).then(data => {
					console.log(data)
					data.data.forEach(val => {
						this.columnsSchool.push(val.schoolName)
					})
					// this.columnsSchool = data.data.schoolName;

					console.log(this.columnsSchool)
				})
			},
			// 获取班级下拉列表
			getClassList() {
				this.$minApi.classList({}).then(data => {
					console.log(data)
					data.data.forEach(val => {
						this.columnsClass.push(val.classlName)
					})
					// this.columnsSchool = data.data.schoolName;
					console.log(this.columnsClass)
				})
			},
		},
		created() {
			this.getSchoolList()
			this.getClassList()
		}
	}
</script>

<style lang="scss">
	page {
		background: #FFFFFF !important;
	}

	.jionClassedBox {
		position: relative;

		// 头部
		.jheadBox {
			position: fixed;
			width: 100%;
			z-index: 10;

			.backgroundImg {
				width: 100%;
				height: 424rpx;
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

			.title {
				position: fixed;
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: 800;
				color: rgba(255, 255, 255, 1);
				opacity: 1;
				top: 58rpx;
				left: 304rpx;
			}
		}

		// 内容
		.joinConBox {
			position: absolute;
			top: 184rpx;
			left: 0;
			z-index: 11;
			width: 100%;
			background: rgba(255, 255, 255, 1);
			opacity: 1;
			border-radius: 24rpx 24rpx 0px 0px;
			padding: 48rpx 40rpx;
			box-sizing: border-box;

			.selectBox {
				width: 100%;
				height: 88rpx;
				border-bottom: 2rpx solid #F0F0F0;
				line-height: 88rpx;
				margin-bottom: 40rpx;

				.iconPic {
					width: 28rpx;
					height: 28rpx;
				}

				.placeholder {
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(201, 201, 201, 1);
					opacity: 1;
					margin-left: 24rpx;
				}

				.s_arrow {
					width: 16rpx;
					height: 26rpx;
					float: right;
					margin-top: 32rpx;
				}
			}

			// 确认按钮
			.makeSure {
				width: 480rpx;
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
				text-align: center;
				margin: 336rpx auto 0;
			}
		}
	}
</style>
