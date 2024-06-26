const jwtoken = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']

    // if (!authHeader || !authHeader.startsWith('Bearer ')) {
	// 		return res.status(401).json({ error: 'Unauthorized' })
	// 	}

    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({error: 'Unauthorized'})
    }

    jwtoken.verify(token, process.env.SECRET_KEY, (err, user) => {
        if(err) {
            return res.status(402).json({error: 'Invalid token'})
        }

        req.user = user;

        next();
    })

}

module.exports = authenticateToken;