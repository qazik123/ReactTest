const { prisma } = require('../prisma/prisma-client')
const { connect } = require('../routes')

const FollowController = {
	followUser: async (req, res) => {
		const { followingId } = req.body
		const userId = req.user.userId

		if (followingId === userId) {
			return res.status(500).json({ error: 'Не можете подписать на себя' })
		}

		try {
			const existingFollow = await prisma.follows.findFirst({
				where: {
					AND: [
						{
							followerId: userId,
						},
						{
							followingId,
						},
					],
				},
			})

            if(existingFollow){
                return res.status(400).json({ error: 'Подписка же существует' })

            }

            await prisma.follows.create({
                data: {
                    follower: {connect: {id: userId}},
                    following: {connect: {id: followingId}}
                }
            })

            res.status(201).json({message: "Ви подписались"})
		} catch (error) {
            console.error("Follow error", error)
            return res.status(500).json({ error: 'Internal server error' })

        }
	},

	unFollowUser: async (req, res) => {
		const {followingId} = req.body; // от кого отписаться
        const userId = req.user.userId;

        try{
            const follows = await prisma.follows.findFirst({
                where: {
                    AND: [
                        {followerId: userId},
                        {followingId}
                    ]
                }
            })

            if(!follows){
                return res.status(404).json({ error: 'Ви не подписани на пользователя' })
            }

            await prisma.follows.delete({
                where: {id: follows.id}
            })

        res.status(201).json({message: "Ви отписались"})

        }catch(error){
            console.error('Unfollow error', error)
            res.status(404).json({ error: 'Internal server error' })

        }
	},
}

module.exports = FollowController
