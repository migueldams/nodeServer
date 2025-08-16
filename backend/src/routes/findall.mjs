import { Op } from "sequelize";
import { User } from "../sequelize.mjs";
import express from 'express'
import { auth } from "../auth/auth.mjs";



export const findall = (router) => {
    
    router.get('/api/users',auth, (req, res) => {
        const username = req.query.username
        const limit = Number(req.query.limit)
        
        
        const research = (username,limit) =>{
            try{
            if(username.length <= 2){
                return res.status(500).json('veillée entrer aumoins deux caractere')
            }
            User.findAndCountAll({where:{username: {[Op.like]: `%${username}%`}},limit:limit,order:['username']}).then(({count,rows}) =>{
                const message = " il y a " + count + " dont le nom contient" + username
                res.json({message,data: rows})
            })
            }catch(error){
                res.json({error:error})
            }
        }


        if(username ){
            research(username,1)
        } else{
            User.findAll({order:['username']}).then(
            user => {
                const Message = "tout les users on bien ete recuperer"
                res.json({ Message, data: user})
            })
        }

       
    })
}
