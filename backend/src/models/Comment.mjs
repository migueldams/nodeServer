export default (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: { type: DataTypes.TEXT, allowNull: false },
  }, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  });

  Comment.associate = models => {
    Comment.belongsTo(models.User, { foreignKey: 'user_id' });
    Comment.belongsTo(models.Post, { foreignKey: 'post_id' });
  };

  return Comment;
};