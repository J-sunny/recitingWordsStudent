<template>
	<view class="wordSelectionBox">
		<view class="inChinese">
			{{questionList.question_stem}}
		</view>
		<!-- 选项 -->
		<view class="optionBox">
			<view class="option"  @click="check(index)" :class="answer==index?'green':'red'" v-for="(item,index) in optionsList" :key="index">{{item}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ["questionList","index","time","allCount"],
		data() {
			return {
				optionsList:[],
				answer:""
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
			this.optionsList=this.questionList.question_option.split("丶")
			this.answer=this.questionList.question_answer
			console.log(this.optionsList)
		}
	}
</script>

<style lang="scss">
	.wordSelectionBox {
		.inChinese {
			width: 498rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: bold;
			line-height: 40rpx;
			color: rgba(46, 53, 72, 1);
			opacity: 1;
			margin: 80rpx auto;
		}


	}
</style>
