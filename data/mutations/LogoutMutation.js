import { mutationWithClientMutationId } from 'graphql-relay';

import UserInfoType from '../types/UserInfoType';

import { logout } from '../remote/api/logout';

const LogoutMutation = mutationWithClientMutationId({
  name: 'Logout',
  inputFields: {},
  outputFields: {
    userInfo: {
      type: UserInfoType,
      resolve: ({ userInfo }) => userInfo,
    },
  },
  mutateAndGetPayload: args => logout(args),
});

export default LogoutMutation;
