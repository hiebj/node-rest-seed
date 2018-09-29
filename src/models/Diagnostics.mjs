import mongoose from 'mongoose'
import tuc from 'temp-units-conv'

const DiagnosticsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    batt: {
      type: Number,
      required: true,
    },
    heartbeat: {
      type: Date,
      required: true,
    },
    tempC: {
      type: Number,
      required: true,
    },
  },
  {
    collection: 'diagnostics',
    toJSON: { virtuals: true },
  },
)

DiagnosticsSchema.virtual('tempF').get(function() {
  return tuc.c2f(this.tempC)
})

const Diagnostics = mongoose.model('Diagnostics', DiagnosticsSchema)

export default Diagnostics
