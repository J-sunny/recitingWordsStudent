<template>
	<view class="englishSelectionBox">
		<view class="wordBox">
			<view class="word">support</view>
			<view class="playWord">
				<van-icon class='volume-o' name="volume-o" />
				<label class="phonetic">/kəm'ponənt/ </label>
			</view>
		</view>
		<!-- 选项 -->
		<view class="optionBox">
			<view class="option green">handle</view>
			<view class="option red">hacker</view>
			<view class="option">hairstyle</view>
			<view class="option">high-tech</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.englishSelectionBox {
		.wordBox {
			.word {
				font-size: 64rpx;
				font-family: SF Pro Display;
				font-weight: 600;
				color: rgba(46, 53, 72, 1);
				opacity: 1;
				text-align: center;
				margin-top: 40rpx;
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
	}
</style>
