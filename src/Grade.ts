import { Schema, model, Model, Document } from 'mongoose'

export interface Grade {
  student: string
  score: number
  letter: string
}

export type GradeDocument = Grade & Document

const GradeSchema = new Schema<Grade & Document>(
  {
    student: { type: String, required: true },
    score: { type: Number, required: true },
  },
  {
    collection: 'grades',
    toJSON: { virtuals: true },
  },
)

GradeSchema.virtual('letter').get(function(this: Grade) {
  return this.score >= 90
    ? 'A'
    : this.score >= 80
      ? 'B'
      : this.score >= 70
        ? 'C'
        : this.score >= 65
          ? 'D'
          : 'F'
})

export const GradeModel: Model<GradeDocument> = model<GradeDocument>('Grade', GradeSchema)
