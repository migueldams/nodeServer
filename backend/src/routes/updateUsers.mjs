import express from 'express'
import { User } from '../sequelize.mjs'


export const updateUsers = (router) => {
    router.put('/api/update/:id', (req, res) => {
        const id = req.params.id
        try {
            User.update(req.body, {
                where: { id: id }
            })
            User.findByPk(id).then(user => {
                const message = `Le pokémon ${user.username} a bien été modifié.`
                res.status(201).json({ message, data: user })
            })


        } catch (error) {
            console.log(error)
            res.status(400).json({ error: error.message })
        }


    })
}