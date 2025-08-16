import { Sequelize } from "sequelize";
import { User } from '../sequelize.mjs'
import bcrypt  from "bcrypt";
import jwt from "jsonwebtoken";
import { private_key } from "../auth/private_key.mjs";


export const login = (router) => {
    router.post('/api/login', (req, res) => {
        try {
            const username = req.body.username
            User.findOne({ where: { username: username } }).then(user => {
                if (!user) {
                    const message = 'identifient inexitant'
                    return res.status(500).json({ message })
                }
                bcrypt.compare(req.body.password, user.password).then(passWordValid => {
                    if (passWordValid) {
                        // jwt 
                        const token = jwt.sign(
                            { userId: user.id },
                            private_key,
                            { expiresIn: '24h' }
                        )
                        const message = 'user bien connecter'
                        return res.json({ message, date: user ,token})
                        
                    } else {
                        const message = 'mots de passe incorret'
                        return res.status(500).json({ message })
                    }

                }
                )
            })
        } catch (error) {
            Message = 'connexion impossible , veillée ressayer plus tard'
            res.status(501).json({ Massage, error: error.message })
        }
    }
    )
}