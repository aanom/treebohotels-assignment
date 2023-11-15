export type Questions = Question[]

export interface Question {
  id: string
  type?: string
  title: string
  nesting?: Nesting[] | null
  options?: Option[]
}

export interface Nesting {
  rule: Rule
  question: Question
}

export interface Rule {
  id: string
  conditions: Condition[]
}

export interface Condition {
  operator: string
  right_operand: string
}

export interface Question {
  question_parent_id?: string
  id: string
  type?: string
  title: string
  nesting?: Nesting[] | null
}

export interface Option {
  id: string
  label: string
  value: string
}

export type Answers = Answer[]

export interface Answer{
  question_id: string;
  answer_value: string;
  answer_time: Date
}