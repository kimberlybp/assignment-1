export const generateIncrementedId = (takenIds: number[]) => {
  if (takenIds.length === 0) takenIds.push(0)
  const maxId = Math.max(...takenIds)
  const newId = maxId + 1

  return newId
}
