<template>
	<view class="stuDetailsBox">
		<!-- 顶部背景图 -->
		<image class='site-img'  catchtap='navmap'></image>
		<!-- 返回按钮 -->
		<view class="arrow" bindtap="goBack" @tap="goBack"></view>
		<!-- 标题 -->
		<view class="title">学生学习详情</view>
		<!-- 头像 -->
		<view class="touBox">
			<view class="touXiang">
				<image src="../../../static/images/people@2.png"></image>
			</view>
			<view class="touName">武蒙蒙·20190112</view>
		</view>
		<!-- 主体内容 -->
		<view class="conBox">
			<!-- 总列表 -->
			<view class="stuListBox">
				<view class="stuList">
					<!--  -->
					<view class="toDay">
						<view class="dayTitle">
							<image class="titleIcon" src="../../../static/images/today3.png"></image>今日学习
						</view>
						<view class="dayNum"><label class="bigFont">2</label>词</view>
					</view>
					<view class="toDay">
						<view class="dayTitle">
							<image class="titleIcon" src="../../../static/images/Cumulative.png"></image>累计学习
						</view>
						<view class="dayNum"><label class="bigFont">2</label>词</view>
					</view>
					<view class="toDay">
						<view class="dayTitle">
							<image class="titleIcon" src="../../../static/images/Duration.png"></image>今日学习时长
						</view>
						<view class="dayNum"><label class="bigFont">2</label>词</view>
					</view>
					<view class="toDay">
						<view class="dayTitle">
							<image class="titleIcon" src="../../../static/images/Cumulativelength.png"></image>累计学习时长
						</view>
						<view class="dayNum"><label class="bigFont">2</label>词</view>
					</view>
				</view>
			</view>

			<!-- 柱状统计图 -->
			<view class="histogram">
				<!-- 柱状图标题 -->
				<view class="hisTitle">
					<image class="titleIcon" src="../../../static/images/today3.png"></image>今日学习
				</view>
				<!-- 最近一周-按月查看 -->
				<view class="lookChange">
					<label class="week">最近一周</label>
					<label class="mouth">按月查看</label>
				</view>
				<!-- 柱状图 -->
				<view class="qiun-columns">
					<view class="qiun-charts">
						<canvas canvas-id="canvasColumnStack" id="canvasColumnStack" class="charts" @touchstart="touchColumn"></canvas>
					</view>
				</view>
				<!-- 当日学习 -->
				<view class="todayStudyBox">
					<label class="study">当日学习：<label class="grayColor">12词</label></label>
					<label class="review">当日复习：<label class="grayColor">12词</label></label>
				</view>
			</view>

			<!-- 折线统计图 -->
			<view class="histogram">
				<!-- 折线图标题 -->
				<view class="hisTitle">
					<image class="titleIcon" src="../../../static/images/Cumulativelength.png"></image>学习时长
				</view>
				<!-- 最近一周-按月查看 -->
				<view class="lookChange">
					<label class="week">最近一周</label>
					<label class="mouth">按月查看</label>
				</view>
				<!-- 折线图 -->
				<view class="qiun-columns">
					<view class="qiun-charts">
						<canvas canvas-id="canvasArea" id="canvasArea" class="charts" @touchstart="touchArea"></canvas>
					</view>
				</view>
				<!-- 当日学习 -->
				<view class="todayStudyBox">
					<label class="study">当日学习：<label class="grayColor">12分钟</label></label>
					<label class="review">总时长：<label class="grayColor">120分钟</label></label>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	var _self;
	var canvaArea = null;
	var canvaColumn = null;

	export default {
		data() {
			return {
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				serverData: '',
			}
		},
		onLoad() {
			_self = this;
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
			this.getServerData();
		},
		methods: {
			// 返回
			goBack() {
				uni.navigateBack({
					delta: 1
				});
			},
			// 获取图标数据
			getServerData() {
				uni.request({
					url: 'https://www.ucharts.cn/data.json',
					data: {},
					success: function(res) {
						console.log(res.data.data)
						_self.serverData = res.data.data;
						let Area = {
							categories: [],
							series: []
						};
						Area.categories = res.data.data.Area.categories;
						Area.series = res.data.data.Area.series;
						_self.showArea("canvasArea", Area);
						let ColumnStack = {
							categories: [],
							series: []
						};
						//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
						ColumnStack.categories = res.data.data.ColumnStack.categories;
						ColumnStack.series = res.data.data.ColumnStack.series;
						_self.showColumnStack("canvasColumnStack", ColumnStack);
					},
					fail: () => {
						_self.tips = "网络错误，小程序端请检查合法域名";
					},
				});
			},
			// 配置折线图   详情见u-charts
			showArea(canvasId, chartData) {
				canvaArea = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'area',
					fontSize: 11,
					legend: true,
					dataLabel: true,
					dataPointShape: true,
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: false,
					colors: ['#FF5C5C', '#FFBB00', '#979DAB'],
					xAxis: {
						disableGrid: true,
					},
					yAxis: {
						gridColor: '#F5F7F7',
						data: {

						}
					},
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					extra: {
						area: {
							type: 'straight',
							opacity: 0.4,
							addLine: true,
							width: 2,
							gradient: true,
						}
					}
				});

			},
			// 点击某一列显示某列的具体数据
			touchArea(e) {
				// canvaArea.showToolTip(e, {
				// 	format: function(item, category) {
				// 		return category + ' ' + item.name + ':' + item.data
				// 	}
				// });
			},


			// 配置图   详情见u-charts
			showColumnStack(canvasId, chartData) {
				canvaColumn = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'column',
					legend: {
						show: true
					},
					colors: ['#FF5C5C', '#FFBB00', '#979DAB'],
					fontSize: 11,
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					animation: false,
					categories: chartData.categories,
					series: chartData.series,
					xAxis: {
						disableGrid: true,
					},
					yAxis: {
						disabled: true,
						gridColor: '#F5F7F7',
					},
					dataLabel: true,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					extra: {
						column: {
							type: 'stack',
							width: _self.cWidth * _self.pixelRatio * 0.1 / chartData.categories.length
						}
					},
					padding: [15, 10, 15, 10]
				})
			},
			// 点击某一列显示某列的具体数据
			touchColumn(e) {
				// canvaColumn.showToolTip(e, {
				// 	format: function(item, category) {
				// 		return category + ' ' + item.name + ':' + item.data
				// 	}
				// });
			}
		}
	}
</script>


<style lang="scss">
	page{
		background-clip: #FBFBFB!important;
	}
	.qiun-charts {
		width: 100%;
		height: 500upx;
		background-color: #FFFFFF;
	}

	.charts {
		width: 100%;
		height: 500upx;
		background-color: #FFFFFF;
	}

	.stuDetailsBox {
		// position: relative;
		overflow: hidden;

		// 顶部背景图片
		.site-img {
			width: 100%;
			position: absolute;
			left: 0;
			top: 0;
			height: 376rpx;
			z-index: 10;
			
			
			background:linear-gradient(180deg,rgba(3,191,183,1) 0%,rgba(59,209,158,1) 100%);
		
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
			}

			.touName {
				text-align: center;
				font-size: 30rpx;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
				margin-top: 26rpx;
			}
		}

		// 主体内容
		.conBox {
			margin-top: 416rpx;
			padding-bottom: 64rpx;

			// padding: 0 32rpx;
			// -webkit-box-sizing: border-box;
			// -moz-box-sizing: border-box;
			// box-sizing: border-box;
			// z-index: 50;
			// 总列表
			.stuListBox {
				padding: 0 32rpx;
				-webkit-box-sizing: border-box;
				-moz-box-sizing: border-box;
				box-sizing: border-box;


				.stuList {
					width: 686rpx;
					height: 352rpx;
					background: rgba(255, 255, 255, 1);
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

			// 柱状统计图
			.histogram {
				width: 100%;
				height: 820rpx;
				background: rgba(255, 255, 255, 1);
				box-shadow: 0px 8rpx 36rpx rgba(201, 201, 201, 0.15);
				border-radius: 16rpx;
				margin-top: 36rpx;

				.hisTitle {
					font-size: 28rpx;
					font-weight: 800;
					color: rgba(46, 53, 72, 1);
					padding: 32rpx 32rpx 40rpx;
					-webkit-box-sizing: border-box;
					-moz-box-sizing: border-box;
					box-sizing: border-box;

					.titleIcon {
						width: 28rpx;
						height: 28rpx;
						margin-right: 16rpx;
					}
				}

				.lookChange {
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(151, 157, 171, 1);
					margin-bottom: 40rpx;

					.week {
						margin-left: 228rpx;
					}

					.mouth {
						margin-left: 56rpx;
					}
				}
			}

			// 当日学习
			.todayStudyBox {
				margin-top: 32rpx;
				color: #979DAB;
				font-family: PingFang SC;
				color: rgba(46, 53, 72, 1);
				opacity: 1;
				font-size: 24rpx;

				.study {
					margin-left: 64rpx;
					font-weight: bold;
				}

				.review {
					margin-left: 180rpx;
					font-weight: bold;
				}

				.grayColor {
					color: #979DAB;
					font-weight: 500;
				}
			}
		}
	}
</style>
