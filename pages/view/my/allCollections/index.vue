<template>
	<view class="allCollegeBox">
		<!-- 头部 -->
		<view class="headBox">
			<view class="headTitle">所有收藏</view>
			<van-icon @tap='goBack()' class='headArrow' name="arrow-left" />
		</view>
		<!-- 内容 -->
		<view class="allCollegeConBox">
			<!-- 今天 -->
			<view class="todyBox">
				<view class="title">今天</view>
				<view class="todayConBox">
					<view class="todayCons" v-for="item in 2" :key='item'>
						<view class="wordBox"><label class="word">plentiful</label><label class="from">大学四级核心</label></view>
						<view class="explain">n.实例，情况，建议；vt.举...为例</view>
					</view>
				</view>
			</view>
			<!-- 昨天 -->
			<view class="todyBox">
				<view class="title">昨天</view>
				<view class="todayConBox">
					<view class="todayCons" v-for="item in 3" :key='item'>
						<view class="wordBox"><label class="word">plentiful</label><label class="from">大学四级核心</label></view>
						<view class="explain">n.实例，情况，建议；vt.举...为例</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 专项复习 -->
		<view class="specialReviewBox">
			<image class="specialReviewPic" src="../../../../static/images/SpecialreviewTB@2x.png" mode=""></image>
			<view class="text">专项复习</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	page {
		background: rgba(245, 247, 247, 1) !important;
	}

	.allCollegeBox {

		// 内容
		.allCollegeConBox {
			padding: 0 40rpx;
			box-sizing: border-box;
			margin-top: 128rpx;
			overflow: hidden;

			.todyBox {
				overflow: hidden;

				.title {
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(151, 157, 171, 1);
					opacity: 1;
					margin-top: 32rpx;
					margin-bottom: 12rpx;
				}

				.todayConBox {
					overflow: hidden;

					.todayCons {
						width: 100%;
						padding: 24rpx 32rpx 24rpx 36rpx;
						box-sizing: border-box;
						background-color: #FFFFFF;
						border-bottom: 2rpx solid #EFEFF1;

						.wordBox {
							width: 100%;
							margin-bottom: 16rpx;
							overflow: hidden;

							.word {
								float: left;
								font-size: 32rpx;
								font-family: PingFang SC;
								font-weight: bold;
								color: rgba(46, 53, 72, 1);
								opacity: 1;
							}

							.from {
								float: right;
								font-size: 24rpx;
								font-family: PingFang SC;
								font-weight: 400;
								color: rgba(151, 157, 171, 1);
								opacity: 1;
							}
						}

						.explain {
							font-size: 24rpx;
							font-family: PingFang SC;
							font-weight: 400;
							line-height: 34rpx;
							color: rgba(151, 157, 171, 1);
							opacity: 1;
						}
					}
				}
			}
		}

		// 专项复习
		.specialReviewBox {
			position: fixed;
			bottom: 76rpx;
			right: 40rpx;
			width: 120rpx;
			height: 120rpx;
			background: linear-gradient(180deg, rgba(3, 191, 183, 1) 0%, rgba(31, 217, 181, 1) 100%);
			box-shadow: 0px 6rpx 36rpx rgba(3, 191, 183, 0.6);
			border-radius: 50%;
			opacity: 1;

			.specialReviewPic {
				width: 44rpx;
				height: 44rpx;
				display: block;
				// vertical-align: middle;
				margin: 20rpx auto 8rpx;
			}

			.text {
				font-size:20rpx;
				font-family:PingFang SC;
				font-weight:400;
				color:rgba(255,255,255,1);
				opacity:1;
				text-align: center;
			}
		}
	}
</style>
