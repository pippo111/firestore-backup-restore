const jsonfile = require('jsonfile')

function start (db, file, collection) {
  // empty collection
  deleteCollection(db, collection, 100).then(() => {
    // read file to json
    const json = jsonfile.readFileSync(file)

    // starting batch firestore jobs
    const batch = db.batch()

    // set batch
    json.forEach(item => {
      let ref = db.collection(collection).doc()
      batch.set(ref, item)
    })

    // commit the batch
    batch.commit().then(function () {
      console.log(`Collection ${collection} successfully restored.`)
    })
  })
}

function deleteCollection (db, collectionPath, batchSize) {
  var collectionRef = db.collection(collectionPath)
  var query = collectionRef.orderBy('__name__').limit(batchSize)

  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, batchSize, resolve, reject)
  })
}

function deleteQueryBatch (db, query, batchSize, resolve, reject) {
  query
    .get()
    .then((snapshot) => {
      // When there are no documents left, we are done
      if (snapshot.size === 0) {
        return 0
      }

      // Delete documents in a batch
      var batch = db.batch()
      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref)
      })

      return batch.commit().then(() => {
        return snapshot.size
      })
    }).then((numDeleted) => {
      if (numDeleted === 0) {
        resolve()
        return
      }

      // Recurse on the next process tick, to avoid
      // exploding the stack.
      process.nextTick(() => {
        deleteQueryBatch(db, query, batchSize, resolve, reject)
      })
    })
    .catch(reject)
}

module.exports = start
