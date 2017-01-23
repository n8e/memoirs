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
    let promise = User.find({ username: input.username }).exec();

    return promise.then(user => {
      if(user) {
        let validPassword = user[0].comparePassword(input.password);
        if (!validPassword) {
          throw { status:401, message: 'Invalid Password' }
        } else {
          // token
          delete user[0].password;
          const token = createToken(user[0]);
          return {
            userName: user[0].username,
            loggedIn: true,
            token: token
          };
        }
      } else {
        throw { status: 401, message: 'User does not exist' }
      }
    }).catch(err => {
      return new Error(err);
    });
}

export function login(args) {
  return { userInfo: signIn(args) };
}
