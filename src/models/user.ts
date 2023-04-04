import mongoose from 'mongoose'
import bcryptjs from 'bcryptjs'

// Tạo schema cho bảng user
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
})

// hash the password before saving to database
userSchema.pre('save', function (next) {
  const user = this

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next()

  // generate a salt
  bcryptjs.genSalt(10, function (err, salt) {
    if (err) return next(err)

    // hash the password along with our new salt
    bcryptjs.hash(user.password, salt, function (err, hash) {
      if (err) return next(err)

      // override the cleartext password with the hashed one
      user.password = hash
      next()
    })
  })
})

// check if the password is valid
userSchema.methods.comparePassword = function (candidatePassword: any, cb: any) {
  bcryptjs.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err)
    cb(null, isMatch)
  })
}

const User = mongoose.model('User', userSchema)

export default User
