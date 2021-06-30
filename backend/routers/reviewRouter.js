const { Router } = require("express")
const { sendErrorResponse } = require("../errors")
const { Review } = require("../models/review")
const { isValidId } = require("../storage/db")
const { createReview, readReview, readReviewById, deleteReview, updateReview } = require("../storage/reviewStorage")
const validateJWT = require("../middleware/validateJWT")
const mongodb = require('mongodb')

const reviewRouter = Router()

reviewRouter.get('/', async (req, res) => {
    try {
        const review = await readReview(ReviewCollection(req))
        res.status(200).json(review)
    } catch (err) {
        sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err)
    }
})

reviewRouter.post('/', validateJWT, async (req, res) => {
    const reviewBody = req.body;
    const userId = reviewBody.userId;
    const reviewsCollection = req.app.locals.db.collection('reviews')
    reviewsCollection.findOne({ _id: new mongodb.ObjectID(userId) }, function (error, user) {
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
        let review = new Review(reviewBody.title, reviewBody.postedOn, reviewBody.shortDescription, reviewBody.description)

        try {
            review = await createReview(ReviewCollection(req), review)
            res.status(201).location(`/api/reviews/${review.id}`).json(review)
        } catch (err) {
            if (err.message && err.message.includes('E11000')) {
                return sendErrorResponse(req, res, 409, `reviews already exists`, err)
            }
            sendErrorResponse(req, res, 500, `error while inserting reviews in the database`, err)
        }
    } catch (err) {
        sendErrorResponse(req, res, 400, `invalid reviews data`, err)
    }
})

reviewRouter.get('/:reviewId', async (req, res) => {
    const reviewId = req.params.reviewId

    if (!isValidId(reviewId)) {
        return sendErrorResponse(req, res, 400, `invalid review data`, new Error('invalid review id'))
    }

    try {
        const review = await readReviewById(ReviewCollection(req), reviewId)
        res.json(review)
    } catch (err) {
        const message = `read from db failed`
        if (err.message && err.message.includes('does not exist')) {
            return sendErrorResponse(req, res, 404, message, err)
        }
        sendErrorResponse(req, res, 500, message, err)
    }
})

reviewRouter.patch('/:reviewId', validateJWT, async (req, res) => {
    const reviewId = req.params.reviewId
    const reviewBody = req.body

    if (!isValidId(reviewId)) {
        return sendErrorResponse(req, res, 400, `invalid review data`, new Error('invalid review id'))
    }

    try {
        let review = new Review(reviewBody.title, reviewBody.postedOn, reviewBody.shortDescription, reviewBody.description)

        try {
            review = await updateReview(ReviewCollection(req), reviewId, review)
            res.json(review)
        } catch (err) {
            const message = `error while updating review in the database`
            if (err.message && err.message.includes('does not exist')) {
                return sendErrorResponse(req, res, 404, message, err)
            }
            sendErrorResponse(req, res, 500, message, err)
        }
    } catch (err) {
        sendErrorResponse(req, res, 400, `invalid review data`, err)
    }
})

reviewRouter.delete('/:reiewId', validateJWT, async (req, res) => {
    const reviewId = req.params.reviewId

    if (!isValidId(reviewId)) {
        return sendErrorResponse(req, res, 400, `invalid review data`, new Error('invalid review id'))
    }

    try {
        await deleteReview(ReviewCollection(req), reviewId)
        res.status(204).end()
    } catch (err) {
        sendErrorResponse(req, res, 500, `read from db failed`, err)
    }
})

function ReviewCollection(req) {
    return req.app.locals.db.collection('review')
}

module.exports = reviewRouter