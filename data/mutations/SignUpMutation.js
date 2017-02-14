import { GraphQLString, GraphQLInt, GraphQLBoolean } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import SignUpInfoType from '../types/SignUpInfoType';

import { signUp } from '../remote/api/signUp';

const SignUpMutation = mutationWithClientMutationId({
	name: 'SignUp',
	inputFields: {
		firstName: { type: GraphQLString },
		lastName: { type: GraphQLString },
		userName: { type: GraphQLString },
		email: { type: GraphQLString },
		password: { type: GraphQLString }
	},
	outputFields: {
		signUpInfo: {
			type: SignUpInfoType,
			resolve: ({ signUpInfo }) => signUpInfo,
		}
	},
	mutateAndGetPayload: (args) => signUp(args),
});

export default SignUpMutation;
