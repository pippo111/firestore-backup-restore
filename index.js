const admin = require('firebase-admin')
const serviceAccount = require('./serviceAccountKey')

// load modules
const backup = require('./backup')
const restore = require('./restore')

// initialize firestore
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })
const db = admin.firestore()

// get cmd line arguments
const argv = require('minimist')(process.argv.slice(2))
const mode = argv._[0]
const collection = argv.c || argv.collection
const file = argv.f || argv.file || `${collection}.json`

// start backup / restore
switch (mode) {
  case 'b':
  case 'backup':
    backup(db, file, collection)
    break

  case 'r':
  case 'restore':
    restore(db, file, collection)
    break

  default:
    console.log('Use "backup" or "restore" option')
    break
}
