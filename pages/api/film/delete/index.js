const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

export default async function handler(req, res) {

    if (req.body.mdp === "test") {

        const post = await prisma.film.findUnique({
            where: { id: req.body.id },
        })

        if (!post) {
            return res.status(40).json("ERROR: Unknow id")
        } else {

            await prisma.film.delete({
                where: { id: req.body.id }
            })

            res.status(200).json('Delete effectuée')
        } 
    } else {
        res.status(420).json("Unautorized!")
    }
}