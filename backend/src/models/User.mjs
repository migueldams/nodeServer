import { ENUM } from "sequelize";
import { isColString } from "sequelize/lib/utils";

export default (sequelize, DataTypes) => {
  const User = sequelize.define('Users', {
    username: { type: DataTypes.STRING(50), allowNull: false ,valite:{isColString:{msg:"entrer une champs valide"},notNull:{msg:"le nom ne peux pas etre null"}}},
    email: { type: DataTypes.STRING(100), allowNull: false, unique: true ,valite:{isColString:{msg:"entrer une champs valide"},notNull:{msg:"le nom ne peux pas etre null"}} },
    password: { type: DataTypes.STRING, allowNull: false ,valite:{isColString:{msg:"entrer une champs valide"},notNull:{msg:"le nom ne peux pas etre null"}}},
    role: { type: DataTypes.ENUM('reader', 'author', 'admin'), defaultValue: 'reader',valite:{ENUM:{msg:"entrer une champs valide"},notNull:{msg:"le nom ne peux pas etre null"}} },
  }, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  },
  {tableName: 'users'}
);

  User.associate = models => {
    User.hasMany(models.Post, { foreignKey: 'user_id' });
    User.hasMany(models.Comment, { foreignKey: 'user_id' });
    User.hasMany(models.Like, { foreignKey: 'user_id' });
    };

    User.belongsToMany(User, {
  through: 'followers',
  as: 'Following',
  foreignKey: 'follower_id',
  otherKey: 'followed_id',
});

// Pour ceux qui me suivent
User.belongsToMany(User, {
  through: 'followers',
  as: 'Followers',
  foreignKey: 'followed_id',
  otherKey: 'follower_id',
});
  
  

  return User;
};