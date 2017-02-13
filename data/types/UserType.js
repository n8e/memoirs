import { GraphQLObjectType } from 'graphql';
// remote methods
// types
import UserInfoType from './UserInfoType';
import SignUpInfoType from './SignUpInfoType';
import MemoirType from './MemoirType';

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
    }
  })
})

export default UserType;
