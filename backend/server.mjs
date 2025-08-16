import express, { urlencoded } from 'express';
import router from './src/sequelize.mjs'; // avec extension .mjs
import dotenv from 'dotenv';


dotenv.config();

const app = express();
const port = process.env.PORT || 3000

app.use(express.json())
app.use(urlencoded({extended:false}))
// Ajout du routeur
app.use('/post', router);
app.get('/',(req,res)=>{
  res.json("Hello, serveur en production")
})


export default app;










// import { createServer } from 'node:http';
// const server = createServer((req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/plain' });
//   res.end('Hello World!\n');
// });
// // starts a simple http server locally on port 3000
// server.listen(3000, '127.0.0.1', () => {
//   console.log('Listening on 127.0.0.1:3000');
// });
