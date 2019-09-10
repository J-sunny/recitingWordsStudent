<script>
	export default {
		onLaunch: function() {
			// console.log('App Launch')
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	page {
		background: linear-gradient(0deg, rgba(235, 245, 244, 1) 0%, rgba(255, 255, 255, 1) 100%);
	}

	// 头部
	.headBox {
		width: 100%;
		height: 128rpx;
		background: rgba(255, 255, 255, 1);
		text-align: center;
		border-bottom: 1px solid #F0F0F0;
		overflow: hidden;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100;

		.headTitle {
			font-size: 36rpx;
			font-family: PingFang SC;
			font-weight: 800;
			line-height: 25px;
			color: rgba(35, 37, 42, 1);
			margin-top: 58rpx;
		}

		.headArrow {
			font-size: 36rpx;
			position: fixed;
			top: 68rpx;
			left: 30rpx;
		}

	}

	// 选项样式
	.optionBox {
		width: 100%;
		padding: 0 40rpx;
		box-sizing: border-box;
		margin-top: 80rpx;
		overflow: hidden;

		.option {
			width: 100%;
			height: 120rpx;
			background: rgba(245, 246, 247, 1);
			opacity: 1;
			border-radius: 10rpx;
			padding-left: 40rpx;
			box-sizing: border-box;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: bold;
			line-height: 120rpx;
			color: rgba(46, 53, 72, 1);
			margin-top: 24rpx;
		}

		.green {
			background: rgba(245, 255, 254, 1);
			color: #2ED19F;
			border: 2rpx solid #2ED19F;
		}

		.red {
			background: rgba(255, 248, 248, 1);
			color: #EE5858;
			border: 2rpx solid rgba(255, 122, 122, 1);
		}
	}
</style>
