import api from "./api"

export const getAllExams =
  async () => {

    const response =
      await api.get("/exams")

    return response.data
  }

export const createExam =
  async (examData: any) => {

    const response =
      await api.post(
        "/exams",
        examData
      )

    return response.data
  }

export const deleteExam =
  async (id: number) => {

    const response =
      await api.delete(
        `/exams/${id}`
      )

    return response.data
  }

export const updateExam =
  async (
    id: number,
    examData: any
  ) => {

    const response =
      await api.put(
        `/exams/${id}`,
        examData
      )

    return response.data
  }