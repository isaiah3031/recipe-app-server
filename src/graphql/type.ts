import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull,
  GraphQLList,
} from 'graphql'

import { User } from '../models/user-model'

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    username: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    followers: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLID))) },
    following: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLID))) }
  })
})

export const TokenType = new GraphQLObjectType({
  name: 'Token',
  fields: () => ({
    token: { type: GraphQLString },
    user: { type: UserType },
  }),
})