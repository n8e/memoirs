import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import MemoirType from '../types/MemoirType';

import { createMemoir } from '../remote/api/createMemoir';

const CreateMemoirMutation = mutationWithClientMutationId({
  name: 'CreateMemoir',
  inputFields: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    memoir: {
      type: MemoirType,
      resolve: ({ memoir }) => memoir,
    }
  },
  mutateAndGetPayload: (args) => createMemoir(args),
});

export default CreateMemoirMutation;
