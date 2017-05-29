import jsonwebtoken from 'jsonwebtoken';
import User from '../models/users';
import { storeLoginObj } from '../../reusable/auth';

const env = process.env.NODE_ENV || 'development';
const config = require('../../../config')[env];
const secretKey = config.secretKey;

// create token for authentication
const createToken = (user) => {
  const token = jsonwebtoken.sign(user, secretKey, {
    expiresIn: 1440,
  });
  return token;
};

export function signIn(input) {
  const promise = User.find({ username: input.username }).exec();

  return promise.then((user) => {
    if (user) {
      const validPassword = user[0].comparePassword(input.password);
      if (!validPassword) {
        throw { status: 401, message: 'Invalid Password' };
      } else {
          // token
        delete user[0].password;
        const token = createToken(user[0]);
        return {
          userName: user[0].username,
          loggedIn: true,
          token,
        };
      }
    } else {
      throw { status: 401, message: 'User does not exist' };
    }
  }).catch(err => new Error(err));
}

export function login(args) {
  const userReturned = signIn(args);
  storeLoginObj({
    loggedIn: userReturned.loggedIn,
    userName: userReturned.userName,
    token: userReturned.token,
  });
  return { userInfo: userReturned };
}
