import { GraphQLObjectType } from 'graphql';
// remote methods
import { getUserInfo } from '../remote/api/getUserInfo';
// types
import UserInfoType from './UserInfoType';
import SignUpInfoType from './SignUpInfoType';

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    userInfo: {
      type: UserInfoType,
      resolve: () => getUserInfo()
    },
    signUpInfo: {
      type: SignUpInfoType,
      resolve: () => {return {id: '1', success: true, message: 'signed up', token: '12345'}}
    }
  })
})

export default UserType;
