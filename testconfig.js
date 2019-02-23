const mongoose = require('mongoose')
const cuid = require('cuid')
const connect = require('./exercises/connect')
const url = 'mongodb://localhost:27017/intro-mongodb-testing'

global.newId = () => {
  return mongoose.Types.ObjectId()
}

const queue = [];

beforeEach(async done => {
  const db = cuid()
  function clearDB() {
    for (var i in mongoose.connection.collections) {
      mongoose.connection.collections[i].remove(function () { })
    }
    return done()
  }
  if (mongoose.connection.readyState === 0) {
    try {
      await connect(url + db)
      queue.push(mongoose.connection);

      clearDB()
    } catch (e) {
      throw e
    }
  } else {
    clearDB()
  }
})
afterEach(async done => {
  // Drop database after testing
  const first = queue.shift();
  await first.dropDatabase();

  mongoose.disconnect();

  return done()
})
afterAll(async done => {

  // Drop databases of testing
  queue.forEach(async function (connection) {
    await connection.dropDatabase();
  })

  return done()
})
