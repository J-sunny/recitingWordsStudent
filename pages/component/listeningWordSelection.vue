<template>
	<view class="listeningWordSelectionBox">
		<view class="voiceBox">
			<van-icon class='voice' name="volume-o" />
		</view>
		<!-- 选项 -->
		<view class="optionBox">
			<view class="option" :class="answer==index?'green':'red'" @click="check(index)" v-for="(item,index) in optionsList" :key="index">{{item}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ["questionList","index","time","allCount"],
		data() {
			return {
				optionsList:[],
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
			this.optionsList=this.questionList.question_option.split("丶")
			this.answer=this.questionList.question_answer
			console.log(this.optionsList)
		}
	}
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
