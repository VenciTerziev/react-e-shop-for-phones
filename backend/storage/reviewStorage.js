const { ObjectID } = require("bson")
const { create, readAll, read, update, deleteBy } = require("./crud")
const entityName = 'review'

async function createReview(collection, review) {
    return create(collection, review, entityName)
}

async function readReview(collection) {
    return readAll(collection, {})
}

async function readReviewById(collection, id) {
    return read(collection, filterById(id), entityName)
}

async function updateReview(collection, id, review) {
    return update(collection, filterById(id), review, entityName)
}

async function deleteReview(collection, id) {
    return deleteBy(collection, filterById(id), entityName)
}


function filterById(id) {
    return { _id: new ObjectID(id) }
}

module.exports.createReview = createReview
module.exports.readReview = readReview
module.exports.readReviewById = readReviewById
module.exports.updateReview = updateReview
module.exports.deleteReview = deleteReview