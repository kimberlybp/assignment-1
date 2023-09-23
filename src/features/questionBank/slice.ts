import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { LocalStorageKeys } from '../../utils/constants/common'
import { generateIncrementedId } from '../../utils/helpers'
import { DraftQuestion, Question, QuestionBankState } from './types'
import { parser } from './parser'
import { initData } from '../../utils/constants/initData'

let questionsList: Question[] = []
const questionsListStr: string | null = localStorage.getItem(
  LocalStorageKeys.QUESTIONS_LIST,
)

if (questionsListStr) {
  questionsList = parser.parseQuestionsList(questionsListStr)
} else {
  questionsList = initData
}

const initialState: QuestionBankState = {
  questionsList,
}

const questionBankSlice = createSlice({
  name: 'questionBank',
  initialState,
  reducers: {
    setQuestionsList: (state, action) => {
      state.questionsList = action.payload
    },
    addNewQuestion: (state, action: PayloadAction<DraftQuestion>) => {
      const takenIds = state.questionsList.map((q) => q.id)
      const newId = generateIncrementedId(takenIds)
      const newQuestion: Question = { id: newId, ...action.payload }
      state.questionsList.push(newQuestion)

      // save to local storage
      localStorage.setItem(
        LocalStorageKeys.QUESTIONS_LIST,
        JSON.stringify(state.questionsList),
      )
    },
    removeQuestion: (state, action: PayloadAction<number>) => {
      const filtered = state.questionsList.filter(
        (question) => question.id !== action.payload,
      )
      state.questionsList = filtered

      // save to local storage
      localStorage.setItem(
        LocalStorageKeys.QUESTIONS_LIST,
        JSON.stringify(state.questionsList),
      )
    },
    setCurrentQuestion: (state, action: PayloadAction<Question>) => {
      state.currentQuestion = action.payload
    },
  },
})

export const {
  setQuestionsList,
  addNewQuestion,
  setCurrentQuestion,
  removeQuestion,
} = questionBankSlice.actions

export default questionBankSlice.reducer
