import express from 'express'
import { User } from '../sequelize.mjs'

export const deleteUser = (router) => {
    router.delete('/api/delete/:id', (req, res) => {
        try {
            User.findByPk(req.params.id).then(user => {
                if (user === null) {
                    const message = "aucun user n'a ete inéxistants"
                    return res.status(500).json({ message })
                }

                const id = req.params.id
                const userDelete = user
                   return user.destroy({ where: { id: id } }).then(_ => {
                    const message = `Le user avec l'identifiant n°${user.username} a bien été supprimé.`
                    res.status(201).json({ message, data: userDelete })
                })
            }
            )
        } catch (error) {
            res.status(400).json({ error: error.message })
        }

    }
    )
}