<template>
	<view class="passedBox">
		<!-- 头部 -->
		<view class="headBox">
			<view class="headTitle">单词任务测试</view>
			<van-icon @tap='goBack()' class='headArrow' name="arrow-left" />
		</view>
		<!-- 内容 -->
		<view class="passedConBox">
			<view class="passedWords"><label for="" class="orangeColor">10</label><label for="" class="word">单词</label></view>
			<view class="passedTask">当前任务已通过测试</view>
			<view class="useTime">用时：00:10:20</view>
			<!-- 查看排行 -->
			<view class="viewRanking" @click="viewRanking()">查看排行</view>
			<!-- 返回任务列表 -->
			<view class="back" @click="back()">返回任务列表</view>
		</view>
	</view>
</template>

<script>
export default {
		data() {
			return {
			}
		},
		methods: {
			// 返回
			goBack() {
				uni.navigateBack({
					delta: 1
				});
			},
			// 查看排行跳转
			viewRanking(){
				uni.navigateTo({
					url: '../../viewRanking/index'
				})
			},
			// 返回任务列表跳转
			back(){
				uni.navigateTo({
					url: '../../../wordTasks/index'
				})
			},

		},	
	}
</script>

<style lang="scss">
	page {
		background: #fff !important;
	}

	.passedBox {
		.passedConBox {
			margin-top: 248rpx;
			.passedWords {
				text-align:center;
				.orangeColor {
					font-size:72rpx;
					font-family:SF Pro Display;
					font-weight:bold;
					color:rgba(253,144,35,1);
					opacity:1;
				}

				.word {
					font-size:36rpx;
					font-family:PingFang SC;
					font-weight:bold;
					color:rgba(46,53,72,1);
					opacity:1;
					margin-left: 10rpx;
				}
			}

			.passedTask {			
				font-size:36rpx;
				font-family:PingFang SC;
				font-weight:bold;
				color:rgba(46,53,72,1);
				opacity:1;
				text-align: center;
				margin-top: 40rpx;
			}

			.useTime {				
				font-size:28rpx;
				font-family:PingFang SC;
				font-weight:500;
				color:rgba(92,99,113,1);
				opacity:1;
				text-align: center;
				margin-top: 24rpx;
			}

			.viewRanking {
				width:440rpx;
				height:80rpx;
				background:linear-gradient(90deg,rgba(15,196,183,1) 0%,rgba(63,210,177,1) 100%);
				opacity:1;
				border-radius:40rpx;
				margin: 96rpx auto 32rpx;				
				font-size:28rpx;
				font-family:PingFang SC;
				font-weight:bold;
				line-height:80rpx;
				color:rgba(255,255,255,1);
				opacity:1;
				text-align: center;
			}

			.back {
				width:440rpx;
				height:80rpx;
				background:rgba(243,255,254,1);
				border:1px solid rgba(15,196,183,1);
				opacity:1;
				border-radius:40rpx;								
				font-size:28rpx;
				font-family:PingFang SC;
				font-weight:bold;
				line-height:80rpx;
				color:rgba(3,191,183,1);
				opacity:1;
				margin: 0 auto;
				text-align: center;
			}
		}
	}
</style>
