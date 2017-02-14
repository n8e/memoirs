import { GraphQLString, GraphQLBoolean, GraphQLObjectType } from 'graphql';

import { globalIdField } from 'graphql-relay';

const UserInfoType = new GraphQLObjectType({
	name: 'UserInfo',
	fields: () => ({
		id: globalIdField('UserInfo'),
		loggedIn: { type: GraphQLBoolean },
		userName: { type: GraphQLString },
		token: { type: GraphQLString },
	})
});

export default UserInfoType;
