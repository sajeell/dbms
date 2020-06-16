const models = require('./models');

async function getUsers() {
  let addUser = await models.Users.create({
    name: 'Sajeel Ahmad',
    email: 'Sajeel.ahmed@live.com',
    password: '12345',
  });

  console.log(addUser.id);
}

getUsers();
