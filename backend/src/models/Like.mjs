export default (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  });

  Like.associate = models => {
    Like.belongsTo(models.User, { foreignKey: 'user_id' });
    Like.belongsTo(models.Post, { foreignKey: 'post_id' });
  };

  return Like;
};