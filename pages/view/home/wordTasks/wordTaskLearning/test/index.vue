<template>
	<view class="wordSpelingBox">
		<!-- 头部 -->
		<view class="headBox">
			<view class="headTitle">单词任务学习</view>
			<van-icon @tap='goBack()' class='headArrow' name="arrow-left" />
		</view>
		<!-- 内容 -->
		<view class="wordSpelingConBox">
			<!-- 进度条框 -->
			<view class="progressBox">
				<van-progress :show-pivot='false' color="#FD9023" :percentage="percentage" />
				<view class="progressTxtBox">
					<label class="count">9/10</label>
					<label class="times">00:09:10</label>
					<label class="passed">已通过：<label class="skyColor">6</label></label>
				</view>
			</view>
			<!-- 题目 -->
			<!-- 单词拼写 -->
			<word-spelling v-if="false"></word-spelling>
			<!-- 中文选词 -->
			<chinese-word-selection v-if='false'></chinese-word-selection>
			<!-- 听力选词 -->
			<listening-word-selection v-if='false'></listening-word-selection>
			<!-- 英文选意 -->
			<english-selection></english-selection>
		</view>
	</view>
</template>

<script>
	import WordSpelling from '../../../../../component/wordSpelling.vue'
	import ChineseWordSelection from '../../../../../component/chineseWordSelection.vue'
	import ListeningWordSelection from '../../../../../component/listeningWordSelection.vue'
	import EnglishSelection from '../../../../../component/englishSelection.vue'
	export default {
		data() {
			return {
				percentage: '70',
			}
		},
		methods: {
			// 返回
			goBack() {
				uni.navigateBack({
					delta: 1
				});
			},

		},
		components: {
			WordSpelling,
			ChineseWordSelection,
			ListeningWordSelection,
			EnglishSelection
		}
	}
</script>

<style lang="scss">
	page {
		background: #fff !important;
	}

	.wordSpelingBox {
		overflow: hidden;

		// 内容
		.wordSpelingConBox {
			margin-top: 128rpx;

			// 进度条
			.progressTxtBox {
				height: 74rpx;
				width: 100%;
				border-bottom: 2rpx solid #EFEFF1;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				line-height: 74rpx;
				color: rgba(92, 99, 113, 1);
				opacity: 1;
				position: relative;

				.count {
					position: absolute;
					left: 40rpx;
				}

				.times {
					display: inline-block;
					width: 100%;
					text-align: center;
				}

				.passed {
					position: absolute;
					right: 40rpx;

					.skyColor {
						color: #0FC4B7;
					}
				}
			}

		}
	}
</style>
