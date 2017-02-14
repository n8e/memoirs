import { GraphQLSchema } from 'graphql';

import RootType from './types/RootType';
import RootMutation from './mutations/RootMutation';

export var Schema = new GraphQLSchema({
	query: RootType,
	mutation: RootMutation
});
