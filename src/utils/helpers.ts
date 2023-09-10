import { QuestionComplexity } from '../features/questionBank/types'

export const generateIncrementedId = (takenIds: number[]) => {
  if (takenIds.length === 0) takenIds.push(0)
  const maxId = Math.max(...takenIds)
  const newId = maxId + 1

  return newId
}

export const getComplexityColor = (qnsComplexity: QuestionComplexity) => {
  switch (qnsComplexity) {
    case QuestionComplexity.Easy:
      return 'success'
    case QuestionComplexity.Medium:
      return 'warning'
    default:
      return 'danger'
  }
}
