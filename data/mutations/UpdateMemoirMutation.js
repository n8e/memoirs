import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import MemoirType from '../types/MemoirType';

import { updateMemoir } from '../remote/api/createMemoir';

const UpdateMemoirMutation = mutationWithClientMutationId({
	name: 'UpdateMemoir',
	inputFields: {
		memoirId: { type: new GraphQLNonNull(GraphQLString) },
		title: { type: new GraphQLNonNull(GraphQLString) },
		content: { type: new GraphQLNonNull(GraphQLString) },
	},
	outputFields: {
		memoir: {
			type: MemoirType,
			resolve: ({ memoir }) => memoir,
		}
	},
	mutateAndGetPayload: (_, args) => updateMemoir(args),
});

export default UpdateMemoirMutation;
