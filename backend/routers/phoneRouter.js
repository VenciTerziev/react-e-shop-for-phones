const { Router } = require("express")
const { sendErrorResponse } = require("../errors")
const { Phone } = require("../models/phone")
const { isValidId } = require("../storage/db")
const { createPhone, readPhone, readPhoneById, deletePhone, updatePhone } = require("../storage/phoneStorage")
const validateJWT = require("../middleware/validateJWT")
const mongodb = require('mongodb')

const phoneRouter = Router()

phoneRouter.get('/', async (req, res) => {
    try {
        const Phone = await readPhone(PhoneCollection(req))
        res.status(200).json(Phone)
    } catch (err) {
        sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err)
    }
})

phoneRouter.post('/', validateJWT, async (req, res) => {
    const phoneBody = req.body;
    const userId = phoneBody.userId;
    const usersCollection = req.app.locals.db.collection('users')
    usersCollection.findOne({ _id: new mongodb.ObjectID(userId) }, function (error, user) {
        if (error) {
            sendErrorResponse(req, res, 500, `server error`, error)
            return false
        }

        if (!user) {
            sendErrorResponse(req, res, 404, `user not found`, error)
            return false;
        }

        const hasPermission = user.role === 'admin';
        if (!hasPermission) {
            sendErrorResponse(req, res, 403, `no permissions`, error)
        }

        return true;
    })

    try {
        let phone = new Phone(phoneBody.name, phoneBody.description, phoneBody.images, phoneBody.defaultImage, phoneBody.price)

        try {
            phone = await createPhone(PhoneCollection(req), phone)
            res.status(201).location(`/api/Phoness/${phone.id}`).json(phone)
        } catch (err) {
            if (err.message && err.message.includes('E11000')) {
                return sendErrorResponse(req, res, 409, `Phones already exists`, err)
            }
            sendErrorResponse(req, res, 500, `error while inserting Phones in the database`, err)
        }
    } catch (err) {
        sendErrorResponse(req, res, 400, `invalid Phones data`, err)
    }
})

phoneRouter.get('/:phoneId', async (req, res) => {
    const phoneId = req.params.phoneId

    if (!isValidId(phoneId)) {
        return sendErrorResponse(req, res, 400, `invalid Phones data`, new Error('invalid Phones id'))
    }

    try {
        const phone = await readPhoneById(PhoneCollection(req), phoneId)
        res.json(phone)
    } catch (err) {
        const message = `read from db failed`
        if (err.message && err.message.includes('does not exist')) {
            return sendErrorResponse(req, res, 404, message, err)
        }
        sendErrorResponse(req, res, 500, message, err)
    }
})

phoneRouter.patch('/:phoneId', validateJWT, async (req, res) => {
    const phoneId = req.params.phoneId
    const phoneBody = req.body

    if (!isValidId(phoneId)) {
        return sendErrorResponse(req, res, 400, `invalid Phones data`, new Error('invalid Phones id'))
    }

    try {
        let phone = new Phone(phoneBody.name, phoneBody.description, phoneBody.images, phoneBody.defaultImage, phoneBody.price)

        try {
            phone = await updatePhone(PhoneCollection(req), phoneId, phone)
            res.json(phone)
        } catch (err) {
            const message = `error while updating Phones in the database`
            if (err.message && err.message.includes('does not exist')) {
                return sendErrorResponse(req, res, 404, message, err)
            }
            sendErrorResponse(req, res, 500, message, err)
        }
    } catch (err) {
        sendErrorResponse(req, res, 400, `invalid Phones data`, err)
    }
})

phoneRouter.delete('/:phoneId', validateJWT, async (req, res) => {
    const phoneId = req.params.phoneId

    if (!isValidId(phoneId)) {
        return sendErrorResponse(req, res, 400, `invalid Phones data`, new Error('invalid Phones id'))
    }

    try {
        await deletePhone(PhoneCollection(req), phoneId)
        res.status(204).end()
    } catch (err) {
        sendErrorResponse(req, res, 500, `read from db failed`, err)
    }
})

function PhoneCollection(req) {
    return req.app.locals.db.collection('phone')
}

module.exports = phoneRouter