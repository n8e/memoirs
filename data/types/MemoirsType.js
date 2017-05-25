import { GraphQLObjectType } from 'graphql';
import { globalIdField, connectionArgs, connectionFromArray } from 'graphql-relay';

import { MemoirConnection } from './MemoirType';

const MemoirsType = new GraphQLObjectType({
  name: 'Memoirs',
  fields: () => ({
    id: globalIdField('Memoirs'),
    items: {
      type: MemoirConnection,
      args: connectionArgs,
      resolve: (obj, args) => connectionFromArray(obj.memoirs, args),
    },
  }),
});

export default MemoirsType;
