import { GraphQLObjectType, GraphQLString } from 'graphql';

import { getUserInfo } from '../reusable/auth';
// remote methods
import { getAllMemoirs } from '../remote/api/getAllMemoirs';
import { getMemoirById } from '../remote/api/getMemoirById';
// types
import UserInfoType from './UserInfoType';
import SignUpInfoType from './SignUpInfoType';
import MemoirType from './MemoirType';
import MemoirsType from './MemoirsType';

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    userInfo: {
      type: UserInfoType,
      resolve: () => getUserInfo(),
    },
    signUpInfo: {
      type: SignUpInfoType,
      resolve: () => ({
        id: '1',
        success: true,
        message: 'signed up',
        token: '12345',
      }),
    },
    memoir: {
      type: MemoirType,
      resolve: () => ({ id: '1' }),
    },
    memoirs: {
      type: MemoirsType,
      resolve: () => getAllMemoirs(),
    },
    oneMemoir: {
      type: MemoirType,
      args: {
        memoirId: { type: GraphQLString },
      },
      resolve: (_, args) => getMemoirById(args),
    },
  }),
});

export default UserType;
