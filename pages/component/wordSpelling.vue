<template>
	<!-- 单词拼写 -->
	<view class="wordSpellingBox">
		<view class="wordsBox">
			<label class="wordSpeling">
				<label v-for="(item,index) in subject" :key="index">
					<label class="letter" v-if="item!='&'">{{item}}</label>
					<input v-if="item=='&'" maxlength='1' class="wordInput" type="text" v-model="answerValue['answer'+index]">
				</label>
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
			<label class="nextTxt" @click="next()">下一个</label>
		</view>
	</view>
</template>

<script>
	export default {
		props: ["questionList", "index", "time","allCount"],
		data() {
			return {
				subject: [],
				title: '',
				answerValue: []
			}
		},
		methods: {
			// 返回
			goBack() {
				uni.navigateBack({
					delta: 1
				});
			},
			// 下一个
			next() {
				console.log(this.answerValue[0])
				console.log(this.subject)
				this.subject.forEach((data,index) => {
					console.log(index)
					let val='answer'+index
					console.log(this.answerValue.val)
					if(data=='&'){
						this.subject.splice(index,1,this.answerValue.val)
					}
					else{
						
					}
				})
				console.log(this.subject)
				if (this.answer) {
					this.$emit('nextQuestion');
				} else {
				console.log(this.questionList)
					console.log(333)
					uni.navigateTo({
						url:"wordDetails?wordId="+this.questionList.word_id+"&doneCount="+this.index+"&allCount="+this.questionList.length+"&time="+this.time
					})
				}
				this.$emit('nextQuestion');
			}

		},
		created() {
			console.log(this.questionList)
			this.title = this.questionList.question_stem.replace(/ /g, "&")
			this.subject = this.title.split('')
			this.answer = this.questionList.question_answer
			
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
