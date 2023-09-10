import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { LocalStorageKeys } from '../../utils/constants/common'
import { generateIncrementedId } from '../../utils/helpers'
import { DraftQuestion, Question, QuestionBankState } from './types'
import { parser } from './parser'

let questionsList: Question[] = []
const questionsListStr: string | null = localStorage.getItem(
  LocalStorageKeys.QUESTIONS_LIST,
)

if (questionsListStr) {
  questionsList = parser.parseQuestionsList(questionsListStr)
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
  },
})

export const { setQuestionsList, addNewQuestion } = questionBankSlice.actions

export default questionBankSlice.reducer
