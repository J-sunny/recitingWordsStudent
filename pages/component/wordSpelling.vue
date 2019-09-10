<template>
	<!-- 单词拼写 -->
	<view class="wordSpellingBox">
		<view class="wordsBox">
			<label class="wordSpeling">
				<label class="letter">co</label>
				<input maxlength='1' class="wordInput rightWord" type="text">
				<label class="letter">po</label>
				<input maxlength='1' class="wordInput falseWord" type="text">
				<label class="letter">ent</label>
			</label>
			<view class="playWord">
				<van-icon class='volume-o' name="volume-o" />
				<label class="phonetic">/kəm'ponənt/ </label>
			</view>
		</view>
		<!-- 释义 -->
		<view class="interpretation">
			n. 组成部分；成分；组件，元件 adj. 组成的；构成的
		</view>
		<!-- 下一个 -->
		<view class="nextBtn">
			<van-icon class='arrow' name="arrow" />
			<label class="nextTxt">下一个</label>
		</view>

	</view>
</template>

<script>
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

		}
	}
</script>

<style lang="scss">
	.wordSpellingBox {

		// 单词
		.wordsBox {
			// margin-top: 40rpx;
			text-align: center;
			width: 100%;
			font-size: 64rpx;
			font-family: SF Pro Display;
			font-weight: 600;
			line-height: 80rpx;
			color: rgba(46, 53, 72, 1);
			opacity: 1;
			margin: 40rpx auto;
			width: 100%;

			.wordSpeling {
				display: inline-block;
				width: auto;
				height: 80rpx;

				.letter {
					float: left;
				}

				.wordInput {
					float: left;
					display: inline-block;
					width: 60rpx;
					height: 80rpx;
					line-height: 80rpx;
					background: rgba(255, 255, 255, 1);
					border: 2rpx solid rgba(151, 157, 171, 1);
					opacity: 1;
					border-radius: 10rpx;
					margin: 0 8rpx;
					text-align: center;
				}
			}

			.playWord {
				margin-top: 28rpx;
				text-align: center;

				.volume-o {
					color: #0FC4B7;
					font-size: 30rpx;
				}

				.phonetic {
					font-size: 28rpx;
					font-family: SF Pro Display;
					font-weight: 500;
					color: rgba(151, 157, 171, 1);
					opacity: 1;
					margin-left: 12rpx;
				}
			}
		}

		// 释义
		.interpretation {
			width: 498rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: bold;
			line-height: 40rpx;
			color: rgba(46, 53, 72, 1);
			opacity: 1;
			margin: 160rpx auto;
		}

		// 下一个
		.nextBtn {
			width: 240rpx;
			height: 64rpx;
			background: rgba(255, 251, 243, 1);
			border: 2rpx solid rgba(253, 144, 35, 1);
			opacity: 1;
			border-radius: 40rpx;
			color: #FD9023;
			line-height: 64rpx;
			text-align: center;
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 400;
			// position:fixed;
			// bottom:40rpx;
			// right: 40rpx;
			float: right;
			margin-right: 40rpx;
			// margin-top: 200rpx;

			.arrow {}

			.nextTxt {}
		}

		.rightWord {
			color: #2ED19F;
			border: 2rpx solid #2ED19F !important;
		}

		.falseWord {
			color: #EE5858;
			border: 2rpx solid #EE5858 !important;
		}

	}
</style>
