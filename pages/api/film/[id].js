const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

export default async function handler(req, res) {

  const post = await prisma.film.findUnique({
    where: { id: req.query.id },
  })

  if(!post) {
    return res.status(404).json("ERROR: Unknow id")
  } else {
    res.status(200).json(post)
    }
  }