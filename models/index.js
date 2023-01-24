const User = require('./User');
const Blog = require('./blog');
const Comment = require('./comment')

module.exports = { User, Blog, Comment };

User.hasMany(Blog, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Blog.hasOne(User, {
    user_id: {
    foreignKey: 'user_id'
    },
});

Blog.hasMany(Comment, {
foreignKey: 'user_id',
});

User.hasMany(Comment, {
foreignKey: 'user_id',
});


module.exports = {User, Blog, Comment};