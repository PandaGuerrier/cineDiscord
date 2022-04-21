const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

export default async function handler(req, res) {

  if (req.method === 'POST') {

    if (req.body.mdp === "test") {
      const post = await prisma.film.findUnique({
        where: { id: req.body.id },
      })

      if (!post) {

        let filmType = []

        if(req.body.sf) filmType.push("SF")
        if(req.body.fantastique) filmType.push("Fantastique")
        if(req.body.comedie) filmType.push("Comédie")
        if(req.body.horreur) filmType.push("Horreur")
        if(req.body.action) filmType.push("Action")
        if(req.body.drame) filmType.push("Drame")

        await prisma.film.createMany({
          data: {
            id: req.body.id,
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
            releaseDate: new Date(req.body.releaseDate).toISOString(),
            actors: req.body.actors,
            type: filmType
          }
        })

        res.status(200).json("Film Created!")

      } else {
        res.status(400).json("ERROR: Film is already exist !")
      }
    } else {
      res.status(420).json("Unautorized!")
    }
  }
}