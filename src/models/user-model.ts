import * as mongoose from 'mongoose'
import * as bcrypt from 'bcrypt'

const Schema = mongoose.Schema

export interface IUser extends mongoose.Document {
  username: string
  password: string
  followers: Array<IUser['username']>
  following: Array<IUser['username']>
}

const UserSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    followers: [{ type: String, required: true }],
    following: [{ type: String, required: true }]
  },
  { timestamps: true }
)

UserSchema.pre('save', function (next: mongoose.HookNextFunction): void {
  const user: any = this

  if (!user.password) {
    next()
  }

  bcrypt.genSalt(10, function (err: any, salt: string): void {
    if (err) {
      throw new Error(err)
    } else {
      bcrypt.hash(user.password, salt, function (err: any, hashed: string) {
        if (err) {
          return next(err)
        }
        user.password = hashed
        next()
      })
    }
  })
})

export const User = mongoose.model<IUser>('User', UserSchema)