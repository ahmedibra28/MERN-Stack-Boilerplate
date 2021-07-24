import mongoose from 'mongoose'

const groupScheme = mongoose.Schema(
  {
    name: {
      type: String,
      default: 'admin',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    route: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Route',
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
)

const GroupModel = mongoose.model('Group', groupScheme)
export default GroupModel
