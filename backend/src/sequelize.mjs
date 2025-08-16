import express from 'express';
import { mocksdata } from './db/mock.mjs';
import { userdata } from './db/mockUser.mjs';
import serveFavicon from 'serve-favicon';
import { findall } from './routes/findall.mjs';
import { Sequelize, DataTypes } from 'sequelize';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import modelsComment from './models/Comment.mjs';
import modelsPost from './models/Post.mjs';
import modelsFollower from './models/Follower.mjs';
import modelsLike from './models/Like.mjs';
import modelsUser from './models/User.mjs';
import bcrypt, { hash } from 'bcrypt'
import { finBypk } from './routes/finBypk.mjs';
import { createUser } from './routes/createUser.mjs';
import { updateUsers } from './routes/updateUsers.mjs';
import  deleteUser  from './routes/DeleteUser.mjs';
import { login } from './routes/login.mjs';



const router = express.Router();

const sequelize = new Sequelize(
  'heaven_writing',
  'root',
  '',
  {
    host: 'localhost',
    dialect: 'mysql',
    dialectOptions: {
      timezone: 'Z'
    },
    logging: false
  }
)


sequelize.authenticate()
  .then(_ => console.log('connexion a le base de donnees etablie'))
  .catch(error => console.error("impossible de se connectée a la bases de donnee " + error));

router.use(bodyParser.json())
router.use(morgan('dev'))

const Comment = modelsComment(sequelize, DataTypes)
export const User = modelsUser(sequelize, DataTypes)
const Like = modelsLike(sequelize, DataTypes)
const Follower = modelsFollower(sequelize, DataTypes)
const Post = modelsPost(sequelize, DataTypes)


// sequelize.sync({ force: true }).then(async () => {
//   const users = await Promise.all(
//     userdata.map(data =>
//       bcrypt.hash(data.password,10).then(hash =>
//         User.create({
//         username: data.username,
//         email: data.email,
//         password: hash,
//         role: data.role,
//       })
//       )
      
//     )
//   );
//   const post = await Post.create({
//     title: 'Mon premier poème',
//     content: 'Voici un texte littéraire...',
//     user_id: users.id, // 🔗 clé étrangère
//   });
//   const comment = await Comment.create({
//     content: 'Superbe écriture !',
//     post_id: post.id,
//     user_id: users.id,
//   });
//   const like = await Like.create({
//     post_id: post.id,
//     user_id: users.id,
//   });

//   console.log('Utilisateur créé :', users);
//   console.log("base de donnée bien synchronisée")
// })

findall(router)
finBypk(router)
createUser(router)
updateUsers(router)
deleteUser(router)
login(router)

router.use(({ res }) => {
  const message = 'impossible de trouver URL demanader! vous pouvez essayer d\'autre URL'
  res.status(404).json(message)
})

export default router;