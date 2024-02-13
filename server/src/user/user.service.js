const { Repository } = require('typeorm');
const User = require('./user.model');

async function validateUser(username, password) {
  const userRepository = Repository(User);
  const user = await userRepository.findOne({ username, password });
  return user || null;
}

module.exports = { validateUser };
