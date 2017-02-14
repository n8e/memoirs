import { GraphQLString, GraphQLBoolean, GraphQLObjectType } from 'graphql';

import { globalIdField } from 'graphql-relay';

const SignUpInfoType = new GraphQLObjectType({
	name: 'SignUpInfo',
	fields: () => ({
		id: globalIdField('SignupInfo'),
		success: { type: GraphQLBoolean },
		message: { type: GraphQLString },
		token: { type: GraphQLString },
	})
});

export default SignUpInfoType;
