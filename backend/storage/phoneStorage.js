const { ObjectID } = require("bson")
const { create, readAll, read, update, deleteBy } = require("./crud")
const entityName = 'phone'

async function createPhone(collection, phone) {
    return create(collection, phone, entityName)
}

async function readPhone(collection) {
    return readAll(collection, {})
}

async function readPhoneById(collection, id) {
    return read(collection, filterById(id), entityName)
}

async function updatePhone(collection, id, phone) {
    return update(collection, filterById(id), phone, entityName)
}

async function deletePhone(collection, id) {
    return deleteBy(collection, filterById(id), entityName)
}


function filterById(id) {
    return { _id: new ObjectID(id) }
}

module.exports.createPhone = createPhone
module.exports.readPhone = readPhone
module.exports.readPhoneById = readPhoneById
module.exports.updatePhone = updatePhone
module.exports.deletePhone = deletePhone