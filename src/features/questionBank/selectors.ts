import { RootState } from '../../context/store'

export const selectQuestionBank = (state: RootState) => state.questionBank

export const selectCurrentQuestion = (state: RootState) => state.questionBank.currentQuestion
