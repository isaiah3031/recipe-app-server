import * as yup from 'yup'
import * as bcrypt from 'bcrypt'

import { User } from '../models/user-model'

export const signUpRules = yup.object().shape({
  username: yup
    .string()
    .trim()
    .required()
    .min(3, "Username is too short")
    .test(
      'uniqueUsername',
      "This username already exists",
      async (username) => {
        const user = await User.findOne({ username })
        return !user
      }
    ),
  password: yup
    .string()
    .trim()
    .required()
    .min(6, 'Password is short')
    .matches(
      /[a-zA-Z0-9@!#%]/,
      'Password con only contain Latin letters, numbers and/or [@, !, # %].'
    )
})

export const loginRules = yup.object().shape({
  username: yup
    .string()
    .trim()
    .required()
    .test('usernameCheck', 'Invalid username', async (username) => {
      const user = await User.findOne({ username })
      return !!user
    }),
  password: yup
    .string()
    .trim()
    .required()
    .matches(
      /[a-zA-Z0-9@!#%]/,
      'Password can only contain Latin letters, numbers and/or [@, !, #, %].'
    )
    .when('username', (username: string, schema: any) =>
      schema.test({
        test: async (password: string) => {
          const user = await User.findOne({ username })
          const valid = await bcrypt.compare(password, user!.password)
          return valid
        },
        message: 'Invalid password'
      })
    )
})