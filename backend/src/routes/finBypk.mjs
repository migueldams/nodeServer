import { User } from '../sequelize.mjs'
import express from 'express'

export const finBypk = (router) => {
  router.get('/api/users/:id', (req, res) => {
    User.findByPk(req.params.id).then(
      User => {
        const Message = "le user donc id est" + req.params.id + " a bien ete trouver"
        res.json({ Message, data: User })
      })
  })
}