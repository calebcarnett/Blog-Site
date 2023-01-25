const sequelize = require('../config/connection');
const { User, Comment, Post } = require('../models');

const userData = require('./userData.json');
const commentData = require('./commentData.json');
const postData = require('./postData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const comment of commentData) {
    await Comment.create({
      ...comment,

    });
  }
  for (const post of postData) {
    await Post.create({
      ...post,

    });
  }

  process.exit(0);
};

seedDatabase();
