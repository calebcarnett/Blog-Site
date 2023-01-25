const User = require('./User');
const Post = require('./post');
const Comment = require('./comment')

module.exports = { User, Post, Comment };

User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Post.hasOne(User, {
    foreignKey: 'user_id' 
});

Post.hasMany(Comment, {
foreignKey: 'user_id',
});

Comment.belongsToMany(User, {
    through: 'user_id',
    as: 'comments',
    foreignKey: 'user_id'
})



module.exports = {User, Post, Comment};