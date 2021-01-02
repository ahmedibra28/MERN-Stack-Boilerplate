import mongoose from 'mongoose'

const userLogonSessionScheme = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  logDate: {
    type: Date,
    required: true,
  },
})

const LogonSession = mongoose.model('LogonSession', userLogonSessionScheme)
export default LogonSession
