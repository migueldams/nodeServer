import { User } from '../sequelize.mjs'

export const createUser = (router) => {
  router.post('/api/create', async (req, res) => {
    try {
      if (req.body === null) {
        message = "aucun user n'a ete envoyées"
        res.status(500).json({ message })
      }

      const user = await User.create(req.body); // ← crée l'utilisateur avec les données envoyées
      res.status(201).json(user);

    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  })
}