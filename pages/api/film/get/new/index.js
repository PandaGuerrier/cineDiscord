const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

export default async function handler(req, res) {

  const post = await prisma.film.findMany({
    take: 10,
    orderBy: {
      releaseDate: 'desc'
    },
  })

    if (!post) {
      return res.status(400).json("Nop :(")
    }

    return res.status(200).json(post)
}