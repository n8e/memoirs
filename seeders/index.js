import mongoose from 'mongoose';
import User from '../data/remote/models/users';
import Role from '../data/remote/models/roles';

const env = process.env.NODE_ENV || 'development';
if (env === 'development') {
  require('dotenv').load();
}

mongoose.Promise = global.Promise;

const config = require('../config')[env];

const admin = new User({
  username: 'n8e',
  password: 'Abc123!',
  name: 'Nate Martin',
  email: 'godmetweenciati@gmail.com',
  role: 1,
});

const roleAdmin = new Role({
  id: 1,
  title: 'Administrator',
});

const roleUser = new Role({
  id: 2,
  title: 'User',
});

const exit = () => {
  setTimeout(() => {
    process.exit(0);
  }, 1000);
};

const rolesAdminSeed = () => {
  roleAdmin.save(() => {
    console.log('Seeded role Administrator');
    return;
  })
  .catch((err) => {
    console.log(err);
    return;
  });
};

// seed role 2 for User
const rolesUserSeed = () => {
  roleUser.save(() => {
    console.log('Seeded role User');
    return;
  })
  .catch((err) => {
    console.log(err);
    return;
  });
};

// seed sample admin
const adminSeed = () => {
  // find a role based on the input on the body
  let promise = Role.find({ id: admin.role }).exec();

  promise.then((roles) => {
    // add the role to the user before being saved
    admin.role = roles[0].title;
    // save the user object
    admin.save(() => {
      console.log('Seeded admin Nate');
      return;
    })
    .catch((err) => {
      console.log(err);
      return;
    });
  }).catch((err) => {
    return err;
  });
};

const seeder = () => {
  mongoose.connect(config.database, (err) => {
    if (err) {
      console.log('Error when connecting:', err);
    } else {
      console.log('Connected to database...');

      let promise = mongoose.connection.db.dropDatabase();
      promise.then(() => {
        return rolesAdminSeed();
      }).then(() => {
        return rolesUserSeed();
      }).then(() => {
        return adminSeed();
      }).catch((err) => {
        return err;
      });

      exit();
    }
  });
};
seeder();
