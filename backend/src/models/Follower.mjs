export default (sequelize, DataTypes) => {

  const Follower = sequelize.define('Follower', {}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  });

  Follower.associate = models => {
    Follower.belongsTo(models.User, { as: 'FollowerUser', foreignKey: 'follower_id' });
    };

  return Follower;
};