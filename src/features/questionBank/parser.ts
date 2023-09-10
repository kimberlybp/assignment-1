import { Question } from './types'

const parseQuestionsList = (qnsListStr: string): Question[] => {
  let res: Question[] = []
  try {
    const jsonQnsList = JSON.parse(qnsListStr)
    if (jsonQnsList instanceof Object || !(jsonQnsList instanceof Array)) {
      res = []
    }
    res = jsonQnsList as Array<Question>
  } catch (err) {
    res = []
  }
  return res
}

export const parser = {
  parseQuestionsList,
}
