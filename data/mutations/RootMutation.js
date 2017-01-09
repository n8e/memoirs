import { GraphQLObjectType } from 'graphql';

import LoginMutation from './LoginMutation';
import SignUpMutation from './SignUpMutation';

const RootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    login: LoginMutation,
    signUp: SignUpMutation,
  }
});

export default RootMutation;
