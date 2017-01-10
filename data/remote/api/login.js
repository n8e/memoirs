import User from '../models/users';
import Role from '../models/roles';
import jsonwebtoken from 'jsonwebtoken';

let env = process.env.NODE_ENV || 'development';
const config = require('../../../config')[env];
const secretKey = config.secretKey;

// create token for authentication
const createToken = (user) => {
    let token = jsonwebtoken.sign(user, secretKey, {
        expiresIn: 1440
    });
    return token;
}

export function signIn(input) {
    let res;

    let promise = User.findOne({ username: input.username }).exec();

    return promise.then((user) => {
      if (!user) {
          throw {'status': 401, 'message': 'User does not exist'};
      } else if (user) {
          let validPassword = user.comparePassword(input.password);
          if (!validPassword) {
              throw {'status': 401, 'message': 'Invalid Password'};
          } else {
              // token
              delete user.password;
              let token = createToken(user);
              return {
                'loggedIn': true,
                'userName': user.username,
                'token': token
              };
          }
      }
    }).then(resp => {
      return resp;
    }).catch(err => {
      return new Error(err);
    });
}

export function login(args) {
  return signIn(args).then(res => {
    return { userInfo: res };
  });
}
