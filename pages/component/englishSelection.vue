<template>
	<view class="englishSelectionBox">
		<view class="wordBox">
			<view class="word">support</view>
			<view class="playWord">
				<van-icon class='volume-o' name="volume-o" />
				<label class="phonetic">{{questionList.question_stem}} </label>
			</view>
		</view>
		<!-- 选项 -->
		<view class="optionBox">
			<view @click="check(index)" :class="answer==index?'green':'red'" class="option" v-for="(item,index) in optionsList" :key="index">{{item}}</view>
		</view>
	</view>
</template>

<script>
	export default {
	props: ["questionList","index","time","allCount"],
		data() {
			return {
				optionsList: [],
				answer:''
			}
		},
		methods: {
			// 选择题目
			check(index) {
				console.log(index)
				if(index==this.answer){
					this.$emit('nextQuestion');
				}
				else{
					console.log(this.questionList)
					console.log(333)
					uni.navigateTo({
						url:"wordDetails?wordId="+this.questionList.word_id+"&doneCount="+this.index+"&allCount="+this.questionList.length+"&time="+this.time
					})
				}
			}
		},
		created() {
			console.log(this.questionList)
			this.optionsList = this.questionList.question_option.split("丶")
			this.answer=this.questionList.question_answer
			console.log(this.optionsList)
		}
	}
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
