export type Question = {

  id: number

  questionText: string

  option1: string

  option2: string

  option3: string

  option4: string

  correctAnswer: string

  sectionName: string

  marks: number

  exam: {
    id: number
    title: string
  }
}