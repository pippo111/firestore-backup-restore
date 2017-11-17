const jsonfile = require('jsonfile')

function start (db, file, collection) {
  const ref = db.collection(collection)
  const json = []

  console.log(`Getting ${collection}...`)

  ref
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        json.push(doc.data())
      })

      console.log(`Writing ${file}...`)

      jsonfile.writeFile(file, json, {spaces: 2}, err => {
        if (err) {
          console.error(err)
        } else {
          console.log(`Collection ${collection} successfully written to ${file}.`)
        }
      })
    })
    .catch((err) => {
      console.log('Error getting documents', err)
    })
}

module.exports = start
