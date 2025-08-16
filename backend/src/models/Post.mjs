export default (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: { type: DataTypes.STRING(100), allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
  }, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  });

  Post.associate = models => {
    Post.belongsTo(models.User, { foreignKey: 'user_id' });
    Post.hasMany(models.Comment, { foreignKey: 'post_id' });
    Post.hasMany(models.Like, { foreignKey: 'post_id' });
  };

  return Post;
};