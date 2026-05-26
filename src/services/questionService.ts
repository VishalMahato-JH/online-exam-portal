import api from "./api"

export const createQuestion = async (
  questionData: any
) => {

  const response =
    await api.post(
      `/questions`,
      questionData
    )

  return response.data
}

export const getQuestionsByExam =
  async (id: number) => {

    const response =
      await api.get(
        `/questions/exam/${id}`
      )

    return response.data
  }

export const deleteQuestion =
  async (id: number) => {

    const response =
      await api.delete(
        `/questions/${id}`
      )

    return response.data
  }

export const updateQuestion =
  async (
    id: number,
    questionData: any
  ) => {

    const response =
      await api.put(
        `/questions/${id}`,
        questionData
      )

    return response.data
  }