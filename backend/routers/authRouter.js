const { Router } = require("express")
const { sendErrorResponse } = require("../errors")
const bcrypt = require('bcrypt')
const { readUserByUsername } = require("../storage/userStorage")
const { createToken } = require("../storage/tokenStorage")
const jwt = require('jsonwebtoken')
const secret = require('../config/secret').secret
const validateJWT = require("../middleware/validateJWT")

const authRouter = Router()

authRouter.post('/login', async (req, res) => {
    const data = req.body;
    const username = data.username;
    const password = data.password;

    try {
        const user = await readUserByUsername(usersCollection(req), username)

        try {
            const passwordMatches = await bcrypt.compare(password, user.password)
            if (!passwordMatches) {
                return sendErrorResponse(req, res, 401, `wrong password`)
            }
            delete user.password

            const token = jwt.sign({id: user.id}, secret, {
                expiresIn: 86400 // 24h
            })

            res.status(200).json({ user: user, 'accessToken': token })
        } catch (err) {
            return sendErrorResponse(req, res, 401, `wrong password`, err)
        }
    } catch (err) {
        sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err)
    }
})

authRouter.get('/logout', validateJWT, async (req, res) => {
    const authorizationHeader = req.headers['authorization']
    if (!authorizationHeader) {
        return sendErrorResponse(req, res, 401, `no authorization header`)
    }
    if (authorizationHeader.split(' ')[0].trim() !== 'Bearer') {
        return sendErrorResponse(req, res, 401, `expected Bearer token`)
    }

    const token = authorizationHeader.split(' ')[1]

    try {
        try {
            await createToken(req.app.locals.db.collection('revokedTokens'), token)
            res.status(204).end()
        } catch (err) {
            console.error(`error while inserting token '${token}' in the database`)
            console.error(err)
            res.status(204).end()
        }
    } catch (err) {
        console.error(`Server error: ${err.message}`)
        console.error(err)
        res.status(204).end()
    }
})

function usersCollection(req) {
    return req.app.locals.db.collection('users')
}

module.exports = authRouter