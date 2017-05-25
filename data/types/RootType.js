import { GraphQLObjectType } from 'graphql';

import { EmptyUser } from '../remote/models/User';
import UserType from './UserType';

const RootType = new GraphQLObjectType({
  name: 'Root',
  fields: () => ({
    viewer: {
      type: UserType,
      resolve: () => EmptyUser,
    },
  }),
});

export default RootType;
