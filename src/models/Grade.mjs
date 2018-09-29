import mongoose from 'mongoose'

const GradeSchema = new mongoose.Schema(
  {
    student: String,
    score: Number,
  },
  {
    collection: 'grades',
    toJSON: { virtuals: true }
  },
)

GradeSchema.virtual('letter').get(
  function() {
    return this.score >= 90
      ? 'A'
      : this.score >= 80
        ? 'B'
        : this.score >= 70
          ? 'C'
          : this.score >= 65
            ? 'D'
            : 'F'
  }
)

const Grade = mongoose.model('Grade', GradeSchema)

export default Grade
