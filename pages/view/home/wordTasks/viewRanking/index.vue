<template>
	<view class="rankingBox">
		<view class="headBox">
			<!-- 顶部背景图 -->
			<view class='site-img'>
				
			</view>
			<!-- <image class='site-img' src="../../../../../static/images/BJ2.png" catchtap='navmap'></image> -->
			<!-- 返回按钮 -->
			<view class="arrow" @tap="goBack"></view>
			<!-- 标题 -->
			<view class="title">任务排行榜</view>
			<!-- 排行 -->
			<view class="wordNum">
				<view class="danCi lines">
					<view class="danNum">30</view>
					<view class="danText">单词数</view>
				</view>
				<view class="danCi">
					<view class="danNum">200</view>
					<view class="danText">参与人数</view>
				</view>
			</view>

		</view>

		<!-- 内容 -->
		<view class="conBox">
			<!-- 我的排名 -->
			<view class="minePh">
				<view class="mineleft f_float">
					<label for="" class="myRanking">200</label>
					<image class="myPic" src="../../../../../static/images/people@2.png" mode=""></image>
					<label for="" class="myName">Fanny萱</label>
				</view>
				<view class="mineRight r_float">
					<label for="" class="completionTime">完成时间</label>
					<label for="times">00:20:36</label>
				</view>
			</view>



			<!-- 其他排名 -->
			<view style="margin-top: 24rpx;">
				<view class="minePh">
					<view class="mineleft f_float">
						<label for="" class="myRanking" v-if="false">200</label>
						<!-- 排行勋章 -->
						<image v-if='true' class="xz" src="../../../../../static/images/xz1@2.png" mode=""></image>
						<image v-if='false' class="xz" src="../../../../../static/images/xz2@2.png" mode=""></image>
						<image v-if='false' class="xz" src="../../../../../static/images/xz3@2.png" mode=""></image>
						<image class="myPic" src="../../../../../static/images/people@2.png" mode=""></image>
						<label for="" class="myName">Fanny萱</label>
					</view>
					<view class="mineRight r_float">
						<label for="" class="completionTime">完成时间</label>
						<label for="times">00:20:36</label>
					</view>
				</view>

				<view class="minePh">
					<view class="mineleft f_float">
						<!-- 排行勋章 -->
						<image v-if='true' class="xz" src="../../../../../static/images/xz2@2.png" mode=""></image>
						<image class="myPic" src="../../../../../static/images/people@2.png" mode=""></image>
						<label class="myName">Fanny萱</label>
					</view>
					<view class="mineRight r_float">
						<label for="" class="completionTime">完成时间</label>
						<label for="times">00:20:36</label>
					</view>
				</view>


				<view class="minePh">
					<view class="mineleft f_float">
						<!-- 排行勋章 -->
						<image v-if="true" class="xz" src="../../../../../static/images/xz3@2.png" mode=""></image>
						<image class="myPic" src="../../../../../static/images/people@2.png" mode=""></image>
						<label class="myName">Fanny萱</label>
					</view>
					<view class="mineRight r_float">
						<label for="" class="completionTime">完成时间</label>
						<label for="times">00:20:36</label>
					</view>
				</view>

				<view class="minePh" v-for="iten in 30" :key='iten'>
					<view class="mineleft f_float">
						<label for="" class="myRanking">200</label>
						<image class="myPic" src="../../../../../static/images/people@2.png" mode=""></image>
						<label for="" class="myName">Fanny萱</label>
					</view>
					<view class="mineRight r_float">
						<label for="" class="completionTime">完成时间</label>
						<label for="times">00:20:36</label>
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
				
			}
		},
		methods: {
			// 返回
			goBack() {
				uni.navigateBack({
					delta: 1,
					animationType: 'pop-out',
					animationDuration: 200
				});
			},
		
		},
		created() {
			
		},
		onLoad(options) {
			
		}

	}
</script>

<style lang="scss">
	.rankingBox {
		position: relative;
		overflow: hidden;

		.headBox {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 326rpx;

			// 顶部背景图片
			.site-img {
				width: 100%;
				position: absolute;
				left: 0;
				top: 0;
				height: 326rpx;
				z-index: 10;
				background-color: #23C492;
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

			// 排行
			.wordNum {
				position: fixed;
				top: 160rpx;
				z-index: 30;
				padding: 0 50rpx;
				box-sizing: border-box;
				width: 100%;
				color: #fff;
				text-align: center;

				.lines {
					border-right: 2rpx solid #FFFFFF;
				}

				.danCi {
					float: left;
					width: 49%;

					.danNum {
						font-size: 48rpx;
						font-weight: 500;
					}

					.danText {
						font-size: 28rpx;
						font-weight: 500;
					}
				}
			}


		}

		// 内容	
		.conBox {
			margin-top: 326rpx;


			// 我的排名
			.minePh {
				width: 100%;
				height: 112rpx;
				background: rgba(255, 255, 255, 1);
				padding: 0rpx 40rpx;
				box-sizing: border-box;
				line-height: 112rpx;
				overflow: hidden;

				.mineleft {
					float: left;

					.myRanking {
						font-size: 28rpx;
						font-weight: 500;
						color: rgba(151, 157, 171, 1);
					}

					.xz {
						width: 44rpx;
						height: 46rpx;
						// transform: translateY(24rpx);
						vertical-align: middle;
					}

					.myPic {
						width: 64rpx;
						height: 64rpx;
						// transform: translateY(24rpx);
						vertical-align: middle;
						margin-left: 28rpx;
						margin-right: 32rpx;
					}

					.myName {
						font-size: 30rpx;
						font-weight: 500;
						color: rgba(35, 37, 42, 1);
					}
				}

				.mineRight {
					float: right;

					.completionTime {
						font-size: 24rpx;
						font-weight: 500;
						color: rgba(151, 157, 171, 1);
						margin-right: 16rpx;
					}

					.times {
						font-size: 28rpx;
						font-weight: 500;
						color: rgba(46, 53, 72, 1);
					}
				}

			}
		
		
		}
	}
</style>
