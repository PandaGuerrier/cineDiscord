const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

export default async function handler(req, res) {


  const post = await prisma.film.findUnique({
    where: { id: req.body.id },
  })

  if(!post) {
    return res.status(404).json("ERROR: Unknow id")
  } else {

    await prisma.film.update({
        where: { id: req.body.id },
        data: {
            title: req.body.title,
            description: req.body.description,
            releaseDate: new Date(req.body.releaseDate).toISOString(),
            actors: req.body.actors,
            image: req.body.image
        }
    })

    res.status(200).json('Modification effectuée')
    }
  }