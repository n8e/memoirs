import { GraphQLObjectType } from 'graphql';

import LoginMutation from './LoginMutation';
import LogoutMutation from './LogoutMutation';
import SignUpMutation from './SignUpMutation';
import CreateMemoirMutation from './CreateMemoirMutation';
import UpdateMemoirMutation from './UpdateMemoirMutation';

const RootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    login: LoginMutation,
    logout: LogoutMutation,
    signUp: SignUpMutation,
    createMemoir: CreateMemoirMutation,
    updateMemoir: UpdateMemoirMutation,
  },
});

export default RootMutation;
