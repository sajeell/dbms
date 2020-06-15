const models = require('./models');

async function getUsers() {
  const user = await models.User.findAll({
    where: {
      email: 'sajeel.ahmed@email.com',
    },
  });

  console.log(user[0].id);
}

getUsers();
