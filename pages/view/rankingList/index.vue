<template>
	<view class="rankingBox">
		<!-- 头部 -->
		<view class="rheadBigBox">
			<view class="rheadBox">
				<image class="headImg" src="../../../static/images/ranking1@2x.png" mode=""></image>
				<view class="rankingTxt" @click="changeRanking()">
					班级榜
					<image class="icon_swit" src="../../../static/images/icon_switchover@2x.png" mode=""></image>
				</view>
				<!-- 切换栏 -->
				<view class="switchBar">
					<view class="navs" @click="changeNav('wordNum')" :class="activeNavs=='wordNum'?'activeNavs':''">单词数
						<image v-if="activeNavs=='wordNum'" class="arrows" src="../../../static/images/Polygon 3@2x.png" mode=""></image>
					</view>
					<view class="navs"  @click="changeNav('studyTime')" :class="activeNavs=='studyTime'?'activeNavs':''">学习时长
					<image  v-if="activeNavs=='studyTime'" class="arrows" src="../../../static/images/Polygon 3@2x.png" mode=""></image>
					</view>
					<view class="navs"  @click="changeNav('onLineTime')" :class="activeNavs=='onLineTime'?'activeNavs':''">在线时长
					<image v-if="activeNavs=='onLineTime'"  class="arrows" src="../../../static/images/Polygon 3@2x.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<!-- 内容 -->
		<view class="rankingConBox">
			<!-- 我的排名 -->
			<view class="minePh">
				<view class="mineleft f_float">
					<label for="" class="myRanking">200</label>
					<image class="myPic" src="../../../static/images/people@2.png" mode=""></image>
					<label for="" class="myName">Fanny萱</label>
				</view>
				<view class="mineRight r_float">
					<label for="" class="wordNum">500</label>
					<label for="" class="ge">个</label>
				</view>
			</view>
			<!-- 其他排名 -->
			<view style="margin-top: 24rpx;">
				<view class="minePh">
					<view class="mineleft f_float">
						<label for="" class="myRanking" v-if="false">200</label>
						<!-- 排行勋章 -->
						<image v-if='true' class="xz" src="../../../static/images/xz1@2.png" mode=""></image>
						<image v-if='false' class="xz" src="../../../static/images/xz2@2.png" mode=""></image>
						<image v-if='false' class="xz" src="../../../static/images/xz3@2.png" mode=""></image>
						<image class="myPic" src="../../../static/images/people@2.png" mode=""></image>
						<label for="" class="myName">Fanny萱</label>
					</view>
					<view class="mineRight r_float">
						<label for="" class="wordNum">500</label>
						<label for="" class="ge">个</label>
					</view>
				</view>
				<view class="minePh">
					<view class="mineleft f_float">
						<!-- 排行勋章 -->
						<image v-if='true' class="xz" src="../../../static/images/xz2@2.png" mode=""></image>
						<image class="myPic" src="../../../static/images/people@2.png" mode=""></image>
						<label class="myName">Fanny萱</label>
					</view>
					<view class="mineRight r_float">
						<label for="" class="wordNum">500</label>
						<label for="" class="ge">个</label>
					</view>
				</view>
				<view class="minePh">
					<view class="mineleft f_float">
						<!-- 排行勋章 -->
						<image v-if="true" class="xz" src="../../../static/images/xz3@2.png" mode=""></image>
						<image class="myPic" src="../../../static/images/people@2.png" mode=""></image>
						<label class="myName">Fanny萱</label>
					</view>
					<view class="mineRight r_float">
						<label for="" class="wordNum">500</label>
						<label for="" class="ge">个</label>
					</view>
				</view>
				<view class="minePh" v-for="iten in 10" :key='iten'>
					<view class="mineleft f_float">
						<label for="" class="myRanking">{{iten}}</label>
						<image class="myPic" src="../../../static/images/people@2.png" mode=""></image>
						<label for="" class="myName">Fanny萱</label>
					</view>
					<view class="mineRight r_float">
						<label for="" class="wordNum">500</label>
						<label for="" class="ge">个</label>
					</view>
				</view>
			</view>
			<!-- 日榜，周榜，月榜 -->
			<view class="timeListBox">
				<view class="timelist">
					<label class='list dayList' @click="change('day')" :class="activeList=='day'?'active':''">日榜</label>
					<label class='list weekList' @click="change('week')" :class="activeList=='week'?'active':''">近一周榜</label>
					<label class='list mouthList' @click="change('mouth')" :class="activeList=='mouth'?'active':''">近一月榜</label>
				</view>
			</view>

		</view>
		<!-- 选择榜单  弹出框 -->
		<van-popup :show="show" position="bottom" style="height: 356rpx">
			<van-picker show-toolbar title="选择榜单" :columns="columns" @cancel="onCancel()" @confirm="onConfirm()" />
		</van-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				columns: ['学校榜', '班级榜', '世界榜'],
				activeNavs: 'wordNum',
				activeList: 'day'
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
			// picker选择器
			onConfirm(event) {
				const {
					picker,
					value,
					index
				} = event.detail;
				console.log((`当前值：${value}, 当前索引：${index}`));
				this.show = false;
			},
			onCancel() {
				this.show = false;
			},
			// 改变排行榜  班级榜
			changeRanking() {
				this.show = true;
			},
			// 改变单词数，学习时长，在线时长
			changeNav(val){
				this.activeNavs=val
			},
			// 改变 日榜，周榜，月榜
			change(val) {
				this.activeList = val
			}

		},
		created() {

		}
	}
</script>

<style lang="scss">
	.rankingBox {
		margin: 0;
		padding: 0;

		// 头部
		.rheadBigBox {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;

			.rheadBox {
				position: relative;

				.headImg {
					width: 100%;
					height: 394rpx;
				}

				.rankingTxt {
					position: absolute;
					top: 166rpx;
					left: 58rpx;
					font-size: 56rpx;
					font-family: PingFang SC;
					font-weight: 800;
					color: rgba(255, 255, 255, 1);
					opacity: 1;

					.icon_swit {
						width: 32rpx;
						height: 28rpx;
						margin-left: 16rpx;
					}
				}

				// 切换栏
				.switchBar {
					position: absolute;
					bottom: 0;
					left: 0;
					width: 100%;
					height: 80rpx;
					background-color: #23C4A3;
					line-height: 80rpx;
					text-align: center;
					color: #FFFFFF;
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: rgba(255, 255, 255, 1);

					.navs {
						width: 250rpx;
						float: left;
						position: relative;

						.arrows {
							width: 20rpx;
							height: 12rpx;
							// transform: rotate(-90deg);
							position: absolute;
							bottom: 0;
							left: 50%;
							margin-left: -10rpx;
						}
					}

					.activeNavs {
						background: rgba(33, 184, 153, 1);
					}
				}
			}
		}

		// 内容
		.rankingConBox {
			margin-top: 394rpx;
			padding-bottom: 100rpx;

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

					.ge {
						font-size: 24rpx;
						font-weight: 500;
						color: rgba(151, 157, 171, 1);
					}

					.wordNum {
						font-size: 28rpx;
						font-weight: 500;
						color: rgba(46, 53, 72, 1);
						margin-right: 16rpx;
					}
				}
			}

			// 日榜，周榜，月榜
			.timeListBox {
				width: 100%;
				height: 88rpx;
				background: rgba(255, 255, 255, 1);
				opacity: 1;
				position: fixed;
				bottom: 0rpx;
				left: 0;
				padding: 18rpx 0;
				box-sizing: border-box;

				.timelist {
					width: 608rpx;
					// border: 2rpx solid #B4BBCC;
					margin: auto;
					border-radius: 4rpx;
					height: 52rpx;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 500;
					line-height: 52rpx;
					color: #5C6371;
					opacity: 1;
					text-align: center;

					.list {
						width: 32%;
						display: inline-block;
					}

					.dayList {
						border: 2rpx solid rgba(180, 187, 204, 1);
						opacity: 1;
						border-radius: 4rpx 0rpx 0rpx 4rpx;
					}

					.weekList {
						border-top: 2rpx solid rgba(180, 187, 204, 1);
						border-bottom: 2rpx solid rgba(180, 187, 204, 1);
						opacity: 1;
					}

					.mouthList {
						border: 2rpx solid rgba(180, 187, 204, 1);
						opacity: 1;
						border-radius: 0rpx 4rpx 4rpx 0rpx;
					}

					.active {
						background: rgba(246, 185, 34, 1);
						opacity: 1;
						color: #FFFFFF;
						border: 2rpx solid rgba(246, 185, 34, 1);
					}
				}
			}
		}
	}
</style>
