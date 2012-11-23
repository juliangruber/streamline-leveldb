var streamline = require('./')
var leveled = require('leveled')
var assert = require('assert')
var rmdir = require('rmdir')

var db_path = '/tmp/' + Math.random().toString(16).slice(2)
var db = leveled(db_path)

streamline(db)

var stream = db.createPutStream()
stream.write({ key : 'foo', value : 'bar' })

var stream = db.createAppendStream('baz')
stream.write('beep ')
stream.write('boop')

process.on('exit', function () {
  assert(db.getSync('foo') == 'bar')
  console.log(db.getSync('baz'))
  assert(db.getSync('baz') == 'beep boop')

  console.log('\n  all tests passed!\n')
  rmdir(db_path)
})

process.on('uncaughtException', function (err) {
  rmdir(db_path)
  throw err
})
