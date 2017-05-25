import { GraphQLString, GraphQLInt, GraphQLObjectType } from 'graphql';

import { globalIdField, connectionDefinitions } from 'graphql-relay';

const MemoirType = new GraphQLObjectType({
  name: 'Memoir',
  fields: () => ({
    id: globalIdField('Memoir'),
    memoirId: { type: GraphQLString },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
  }),
});

const connection = connectionDefinitions({
  name: 'Memoir',
  nodeType: MemoirType,
  connectionFields: () => ({
    totalCount: {
      type: GraphQLInt,
      resolve: conn => conn.edges.length,
    },
  }),
});

export const MemoirConnection = connection.connectionType;
export const MemoirEdge = connection.edgeType;

export default MemoirType;
