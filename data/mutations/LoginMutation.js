import { GraphQLString, GraphQLInt, GraphQLBoolean } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import UserInfoType from '../types/UserInfoType';

import { login } from '../remote/api/login';

const LoginMutation = mutationWithClientMutationId({
	name: 'Login',
	inputFields: {
		username: { type: GraphQLString },
		password: { type: GraphQLString }
	},
	outputFields: {
		userInfo: {
			type: UserInfoType,
			resolve: ({ userInfo }) => userInfo,
		}
	},
	mutateAndGetPayload: (args) => login(args),
});

export default LoginMutation;
