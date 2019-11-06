<template>
	<view class="revisionPlanBox">
		<!-- 头部 -->
		<view class="headBox">
			<view class="headTitle">修改计划</view>
			<van-icon @tap='goBack()' class='headArrow' name="arrow-left" />
		</view>
		<!-- 内容 -->
		<view class="revisionPlanBoxCon">
			<!-- 上部分 -->
			<view class="topBox">
				<!-- 当前计划 -->
				<view class="currentPlan">
					<view class="left">
						<view class="planTitle">当前计划</view>
						<view class="dayNum">每日学习、复习词数</view>
					</view>
					<view class="right" @click="showPopupWord()">
						<label class="num" for="">{{wordsNum}}</label>
						<label class="ci" for="">词</label>
						<van-icon class="arrowDown" :name="show==true?'arrow-up':'arrow-down'" />
					</view>
				</view>
				<!-- 当前词书 -->
				<view class="currentWordsBook">
					<view class="wordsBookTitle">当前词书</view>
					<view class="wordsBookConBox">
						<view class="left">
							<image class="bookCover" src="../../../../static/images/img_book1@2x.png" mode=""></image>
						</view>
						<view class="center">
							<view class="bookTitle">{{dailyPracticeList.thesaurusName}}</view>
							<view class="progressBar">
								<van-progress :show-pivot='false' color="#0FC4B7" :percentage="dailyPracticeList.completeCount/dailyPracticeList.thesaurusCount*100" />
							</view>
							<view class="progressInfo">
								<label class="learnedBox">
									<van-icon class='play' name="play" />
									<label for="" class="learnedNum">已学 {{dailyPracticeList.completeCount}}</label>
								</label>
								<label class="allWord">
									总词数 {{dailyPracticeList.thesaurusCount}}
								</label>
							</view>
						</view>
						<view class="right">
							<label for="" class="statusBtn selected">当前已选</label>
						</view>
					</view>

				</view>
				<!-- 清除当前词书学习记录 -->
				<view class="clearRecordsBox" @click="showPopupClear()">
					<image class="iconPic" src="../../../../static/images/icon_del@2x.png" mode=""></image>
					<label>清除当前词书学习记录</label>
				</view>
			</view>
			<!-- 下部分 -->
			<view class="bottomBox">
				<view class="allTitle">所有词书</view>
				<view class="wordsBookConBox" v-for="item in thesaurusArr" :key='item.backwordPlanId'>
					<view class="left">
						<image class="bookCover" src="../../../../static/images/img_book1@2x.png" mode=""></image>
					</view>
					<view class="center">
						<view class="bookTitle">{{item.thesaurusName}}</view>
						<view class="progressBar">
							<van-progress :show-pivot='false' color="#0FC4B7" :percentage="item.completeCount/item.thesaurusCount*100" />
						</view>
						<view class="progressInfo">
							<label class="learnedBox">
								<van-icon class='play' name="play" />
								<label for="" class="learnedNum">已学 {{item.completeCount}}</label>
							</label>
							<label class="allWord">
								总词数 {{item.thesaurusCount}}
							</label>
						</view>
					</view>
					<view class="right">
						<label v-if="item.backwordPlanId==dailyPracticeList.backwordPlanId" for="" class="statusBtn selected">当前已选</label>
						<label @click="modifyPlanThesaurus(item.backwordPlanId)" v-if="item.backwordPlanId!=dailyPracticeList.backwordPlanId"
						 for="" class="statusBtn noSelected">选择这本</label>
					</view>
				</view>
			</view>
		</view>

		<!-- 选择每日学习词数弹出框 -->
		<van-popup :show="showSelectWord" position="bottom" style="height: 20%" @close="onCloseWord()">
			<van-picker show-toolbar title="选择每日学习词数" :default-index="2" :columns="columns" @cancel="onCancelWord()" @confirm="onConfirmWord()" />
		</van-popup>

		<!-- 选择图书已学完弹框 -->
		<view class="selectedBookBox">
			<van-popup :show="showSelectBook">
				<view class="selectBookBox">
					<van-icon @click="onCloseBook()" class="closeBtn" name="cross" />
					<image class="selBookCover" src="../../../../static/images/img_end@2x.png" mode=""></image>
					<view class="complete">当前词书已学完</view>
					<view class="eliminate">是否清除学习记录重新学习</view>
					<view class="re-study">重新学习</view>
					<view class="changeBook">换一本书</view>
				</view>
			</van-popup>
		</view>

		<!-- 清除学习记录弹框 -->
		<view class="selectedBookBox">
			<van-popup :show="showClearBox">
				<view class="selectBookBox">
					<van-icon @click="onCloseClear()" class="closeBtn" name="cross" />
					<view class="complete">是否清除学习记录重新学习</view>
					<view class="eliminate">清除记录后，当前学习进度将清零</view>
					<view @click="onCloseClear()" class="re-study">不了，我还想继续学习</view>
					<view class="reStudy" @click="clearThesaurus()">重新学习</view>
				</view>
			</van-popup>
		</view>
		<van-toast id="van-toast" />
	</view>
</template>

<script>
	import Toast from '@/wxcomponents/vant-weapp/dist/toast/toast';
	export default {
		data() {
			return {
				isSing: true,
				showSelectWord: false,
				showSelectBook: false,
				showClearBox: false,
				columns: ['10', '20', '30', '40', '50', '60', '70'],
				wordsNum: 0,
				thesaurusArr: [],
				dailyPracticeList: []
			}
		},
		methods: {
			// 返回
			goBack() {
				uni.navigateBack({
					delta: 1
				});
			},
			//选择每日学习词数弹出框 打开弹出层
			showPopupWord() {
				this.showSelectWord = true
			},
			// 选择每日学习词数弹出框 关闭弹出层
			onCloseWord() {
				this.showSelectWord = false
			},
			//选择每日学习词数弹出框   picker选择器取消事件
			onCancelWord() {
				// Toast('取消');
				this.showSelectWord = false
			},
			// 修改计划单词数 选择每日学习词数弹出框   picker选择器确认事件  
			onConfirmWord(event) {
				const {
					picker,
					value,
					index
				} = event.detail;
				// Toast(`当前值：${value}, 当前索引：${index}`);
				// this.wordsNum = value
				this.$minApi.modifyPlanWords({
					backwordPlanId: this.dailyPracticeList.backwordPlanId,
					planCount: parseInt(value)
				}).then(data => {
					console.log(data)
					Toast("修改成功！")
					this.dailyPractice()
				})
				this.showSelectWord = false
			},
			// 选择图书已学完弹框   打开弹出层
			showPopupBook() {
				this.showSelectBook = true
			},
			// 选择图书已学完弹框   关闭弹出层
			onCloseBook() {
				this.showSelectBook = false
			},
			// 清除学习记录弹框   打开弹出层
			showPopupClear() {
				this.showClearBox = true
			},
			// 清除学习记录弹框   关闭弹出层
			onCloseClear() {
				this.showClearBox = false
			},
			// 获取所有词书列表
			thesaurusList() {
				this.$minApi.thesaurusList({}).then(data => {
					console.log(data)
					this.thesaurusArr = data.data
				})
			},
			// 获取当前图书
			dailyPractice() {
				this.$minApi.dailyPractice({}).then(data => {
					this.dailyPracticeList = data.data
					this.wordsNum = data.data.planCount
					console.log(data)
				})
			},
			// 清除学习记录
			clearThesaurus() {
				this.$minApi.clearThesaurus({
					backwordPlanId: this.dailyPracticeList.backwordPlanId
				}).then(data => {
					console.log(data)
					this.onCloseClear()
					Toast('清除记录成功！')
					this.thesaurusList()
					this.dailyPractice()
				})
			},
			// 修改学习词库
			modifyPlanThesaurus(backwordPlanId) {
				this.$minApi.modifyPlanThesaurus({
					backwordPlanId: backwordPlanId
				}).then(data => {
					console.log(data)
					this.dailyPractice()
					this.thesaurusList()
					Toast("修改成功！")
				})
			},

		},
		created() {
			this.thesaurusList(),
				this.dailyPractice()
		}
	}
</script>

<style lang="scss">
	.revisionPlanBox {

		// 内容
		.revisionPlanBoxCon {
			margin-top: 128rpx;
			overflow: hidden;

			// 图书列表公共样式
			.wordsBookConBox {
				width: 100%;
				height: 176rpx;
				background: rgba(255, 255, 255, 1);
				border: 2rpx solid rgba(243, 245, 245, 1);
				opacity: 1;
				border-radius: 10rpx;
				overflow: hidden;
				padding: 24rpx 16rpx 24rpx 24rpx;
				box-sizing: border-box;
				margin-bottom: 24rpx;

				.left {
					float: left;

					.bookCover {
						width: 96rpx;
						height: 128rpx;
						background: linear-gradient(316deg, rgba(167, 252, 70, 1) 0%, rgba(15, 196, 183, 1) 100%);
						opacity: 1;
						border-radius: 4rpx 10rpx 10rpx 4rpx;
					}
				}

				.center {
					float: left;
					margin-left: 24rpx;
					width: 320rpx;

					.bookTitle {
						font-size: 30rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: rgba(46, 53, 72, 1);
						opacity: 1;
						margin-top: 4rpx;
					}

					.progressBar {
						margin-top: 16rpx;
					}

					.progressInfo {
						overflow: hidden;
						margin-top: 16rpx;
						line-height: 40rpx;


						.learnedBox {
							overflow: hidden;
							float: left;

							.play {
								color: rgba(62, 213, 147, 1);
								opacity: 1;
								font-size: 30rpx;
							}

							.learnedNum {
								display: inline-block;
								line-height: 40rpx;
								font-size: 22rpx;
								font-family: PingFang SC;
								font-weight: 400;
								color: rgba(92, 99, 113, 1);
								opacity: 1;
							}
						}

						.allWord {
							float: right;
							font-size: 22rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: rgba(92, 99, 113, 1);
							opacity: 1;
						}
					}

				}

				.right {
					float: right;
					margin-top: 36rpx;

					.statusBtn {
						text-align: center;
						display: inline-block;
						width: 136rpx;
						height: 56rpx;
						opacity: 1;
						border-radius: 38rpx;
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 500;
						line-height: 56rpx;
						opacity: 1;

					}

					// 当前已选
					.selected {
						background: rgba(247, 248, 250, 1);
						border: 1px solid rgba(151, 157, 171, 1);
						color: rgba(151, 157, 171, 1);
					}

					.noSelected {
						background: #FD9023;
						border: none;
						color: #FFFFFF;
					}
				}
			}


			// 上部分
			.topBox {
				padding: 0 40rpx 40rpx 40rpx;
				box-sizing: border-box;
				overflow: hidden;
				background-color: #FFFFFF;

				// 当前计划
				.currentPlan {
					border-bottom: 2rpx solid #EFEFF1;
					padding: 40rpx 0;
					height: 172rpx;
					box-sizing: border-box;

					.left {
						float: left;

						.planTitle {
							font-size: 36rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: rgba(46, 53, 72, 1);
							opacity: 1;
						}

						.dayNum {
							font-size: 24rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: rgba(151, 157, 171, 1);
							opacity: 1;
							margin-top: 8rpx;
						}
					}

					.right {
						float: right;
						margin-top: 12rpx;

						.num {
							font-size: 40rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: rgba(253, 144, 35, 1);
							margin-right: 6rpx;
						}

						.ci {
							font-size: 26rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: rgba(92, 99, 113, 1);
							opacity: 1;
							margin-top: 12rpx;
							margin-right: 14rpx;
						}

						.arrowDown {
							color: #979DAB;
						}
					}
				}

				// 当前词书
				.currentWordsBook {

					.wordsBookTitle {
						font-size: 36rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: rgba(46, 53, 72, 1);
						opacity: 1;
						margin-top: 40rpx;
						margin-bottom: 32rpx;
					}


				}

				// 清除当前词书学习记录
				.clearRecordsBox {
					width: 100%;
					height: 72rpx;
					background: rgba(255, 255, 255, 1);
					border: 2rpx solid rgba(239, 239, 241, 1);
					opacity: 1;
					border-radius: 10rpx;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 400;
					line-height: 72rpx;
					color: rgba(92, 99, 113, 1);
					opacity: 1;
					text-align: center;
					margin-top: 8rpx;

					.iconPic {
						display: inline-block;
						width: 36rpx;
						height: 20rpx;
					}
				}
			}

			// 下部分
			.bottomBox {
				padding: 40rpx;
				background-color: #FFFFFF;
				margin-top: 16rpx;

				.allTitle {
					font-size: 36rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: rgba(46, 53, 72, 1);
					opacity: 1;
					margin-bottom: 32rpx;
				}
			}


		}

		// 选择图书已学完弹框
		.van-popup {
			border-radius: 20rpx;
		}

		.selectedBookBox {
			display: block;
			width: 560rpx;
			background: rgba(255, 255, 255, 1);
			opacity: 1;
			position: relative;

			.selectBookBox {
				width: 100%;
				height: 100%;
				padding: 60rpx 80rpx;
				box-sizing: border-box;

				.closeBtn {
					position: absolute;
					top: 28rpx;
					right: 28rpx;
				}

				.selBookCover {
					width: 192rpx;
					height: 128rpx;
					background-color: #F0F0F2;
					display: block;
					margin: 0 auto;
				}

				.complete {
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: rgba(0, 0, 0, 1);
					margin-top: 32rpx;
					text-align: center;
				}

				.eliminate {
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(92, 99, 113, 1);
					margin-top: 16rpx;
					text-align: center;
				}

				.re-study {
					width: 440rpx;
					height: 80rpx;
					background: linear-gradient(90deg, rgba(15, 196, 183, 1) 0%, rgba(63, 210, 177, 1) 100%);
					border-radius: 40rpx;
					text-align: center;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: bold;
					line-height: 80rpx;
					color: rgba(255, 255, 255, 1);
					margin-top: 56rpx;
				}

				.reStudy {
					width: 440rpx;
					height: 80rpx;
					background: rgba(239, 239, 241, 1);
					border: 1px solid rgba(151, 157, 171, 1);
					border-radius: 40rpx;
					text-align: center;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: bold;
					line-height: 80rpx;
					color: #5C6371;
					margin-top: 56rpx;
				}

				.changeBook {
					width: 440rpx;
					height: 80rpx;
					background: rgba(243, 255, 254, 1);
					border: 2rpx solid rgba(15, 196, 183, 1);
					border-radius: 40rpx;
					text-align: center;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: bold;
					line-height: 80rpx;
					color: rgba(3, 191, 183, 1);
					margin-top: 32rpx;
				}
			}
		}

	}
</style>
