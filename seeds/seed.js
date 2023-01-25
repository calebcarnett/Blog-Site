const sequelize = require('../config/connection');
const seedBlogs = require('../seeds/blogData.json');
const seedComments = require('./commentData.json');
const seedUsers = require('./userData.json')

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedBlogs();

  await seedUsers();
  
  await seedComments();

  process.exit(0);
};

seedAll();