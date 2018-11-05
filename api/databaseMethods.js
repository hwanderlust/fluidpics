const encrypt = require("./encrypt");
const ObjectID = require("mongodb").ObjectID;

const databaseUser = (id) => {
  return { "_id": new ObjectID(id) };
}

const removeSensitiveData = (data, sensitiveFieldsArray) => {
  const nonSensitiveData = {};

  Object.keys(data).forEach(key => {

    if (!sensitiveFieldsArray.includes(key)) {

      nonSensitiveData[key] = data[key]
    }
  })

  return nonSensitiveData
}

const updateSingleDocument = (collection, document, updateInfo, res) => {

  collection.updateOne(document, { $set: updateInfo }, async (err, item) => {

    // console.log('err', err)
    // console.log('item', item)

    if (err) {
      res.send({ status: 400, msg: 'something went wrong, please try again.' })

    }

    res.send({ status: 200, msg: 'Update successful!' })
  })
}

const updateUser = (id, fields, res, usersCollection) => {

  const userId = databaseUser(id);
  const { username, password } = fields;

  usersCollection.findOne(userId, (err, item) => {
    const oldUser = item
    // console.log(`oldUser:`, oldUser);

    if (username !== oldUser.username && password) {
      // console.log(`username && password`)
      const updateData = { username, password: encrypt(password) }

      updateSingleDocument(usersCollection, userId, updateData, res)
    }

    if (username === oldUser.username && password) {
      // console.log(`password only`)
      const updateData = { password: encrypt(password) };

      updateSingleDocument(usersCollection, userId, updateData, res)
    }

    if (username !== oldUser.username && !password) {
      // console.log(`username only`)
      const updateData = { username }

      updateSingleDocument(usersCollection, userId, updateData, res)
    }
  })
}

module.exports = {
  
  user: databaseUser,
  nonSecureData: removeSensitiveData,
  updateSingleEntry: updateSingleDocument,
  updateSingleUser: updateUser
  
}