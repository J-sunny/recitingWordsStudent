<template>
	<view class="listeningWordSelectionBox">
		<view class="voiceBox">
			<van-icon class='voice' name="volume-o" />
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
	.listeningWordSelectionBox {
		.voiceBox {
			width: 100%;
			text-align: center;

			.voice {
				display: inline-block;
				font-size: 100rpx;
				color: #0FC4B7;
				margin: 80rpx auto;
			}
		}

	}
</style>
