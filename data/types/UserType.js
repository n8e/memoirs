import { GraphQLObjectType } from 'graphql';
// remote methods
import { getAllMemoirs } from '../remote/api/getAllMemoirs';
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
      resolve: () => {return {id: '1'}}
    },
    signUpInfo: {
      type: SignUpInfoType,
      resolve: () => {return {id: '1', success: true, message: 'signed up', token: '12345'}}
    },
    memoir: {
      type: MemoirType,
      resolve: () => {return {id: '1'}}
    },
    memoirs: {
      type: MemoirsType,
      resolve: () => getAllMemoirs()
    }
  })
})

export default UserType;
