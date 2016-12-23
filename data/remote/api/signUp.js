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

export function createUser(input) {
    let res;
    let user = new User({
        name: {
            first: input.firstName,
            last: input.lastName
        },
        email: input.email,
        role: 2,
        username: input.userName,
        password: input.password
    });

    let promise = Role.find({ id: user.role }).exec();

    promise.then((roles) => {
      // add the role to the user before being saved
      user.role = roles[0].title;
      // assign a token to the created user
      let token = createToken(user);
      // save the user object
      user.save(() => {
        console.log('Saved User:', user.name.first);
        return {
            success: true,
            message: 'User has been created!',
            token: token
        };
      })
      .catch(err => {
        console.log('Error', err);
        return;
      });
    }).catch((err) => {
      return {'status': 403, 'message': err};
    });
}

export function signUp(args) {
  return { signUpInfo: createUser(args) };
}
