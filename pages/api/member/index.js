const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

export default async function handler(req, res) {

  if (req.method === 'POST') {

    if (req.body.mdp === "test") {
      const post = await prisma.user.findUnique({
        where: { email: req.body.mail },
      })

      if (!post) {

        await prisma.user.createMany({
          data: {
              email: req.body.mail,
              name: req.body.name,
              role: req.body.role
          },
        })

        res.status(200).json("Created!")

      } else {
        res.status(400).json("ERROR: User is already exist !")
      }
    } else {
      res.status(420).json("Unautorized!")
    }
  }
}