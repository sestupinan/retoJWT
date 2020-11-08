const { mongoUtils, dataBase } = require('../lib/utils/mongo.js');
const COLLECTION_NAME = 'users';
const bcrypt = require('bcrypt');
const auth = require('../lib/utils/auth.js');
const { token } = require('morgan');
const saltRounds = 10;

async function login(user) {
    return mongoUtils.conn().then(async (client) => {
      const requestedUser = await client
        .db(dataBase)
        .collection(COLLECTION_NAME)
        .findOne({username: user.username})
        .finally(() => client.close());

        
      const isValid = await bcrypt.compare(user.password, requestedUser.password);
      // TODO create token
      if(isValid==false){
        console.log("Invalid password")
        return user;
      }
      console.log(user);
      console.log(isValid);
      user.role = requestedUser.role;
      user.token = auth.createToken(user);
      console.log(user.token);
      // Return user without sensitive data and JWT
      return user;
      
  });
  }

async function createUser(user) {
  console.log(user.password);
  if(user.password){
      // TODO use bcrypt to hash password 
      console.log("pass" + user.password);
      user.password = await bcrypt.hash(user.password, saltRounds);
  }
  console.log("newpass" + user.password);
  // Save new user with password hashed
  return mongoUtils.conn().then(async (client) => {
    const newUser = await client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .insertOne(user)
      .finally(() => client.close());
  // TODO Delete sensitive information
    return newUser;
});
}

module.exports = [createUser, login];
