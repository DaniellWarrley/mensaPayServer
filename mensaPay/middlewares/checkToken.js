import jwt from 'jsonwebtoken'

function checkToken(req, res, next) {
    const authHeader = req.headers['authorization']
    
    if (!authHeader) {
        return res.status(401).json({ msg: 'Access denied: no token provided' })
    }

    const token = authHeader.split(' ')[1]
    if (!token) {
        return res.status(401).json({ msg: 'Access denied: malformed token' })
    }

    try {
        const secret = process.env.SECRET
        const decoded = jwt.verify(token, secret)
        req.userId = decoded.id
        next()
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ msg: 'Token expired' })
        }
        return res.status(400).json({ msg: 'Invalid token' })
    }
}

export default checkToken
