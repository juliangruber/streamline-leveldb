var Stream = require('stream')
var inherits = require('util').inherits
var EventEmitter = require('events').EventEmitter

module.exports = streamline

function Queue(db) {
  this.db = db
  this.queue = []
  this.processing = false
}

inherits(Queue, EventEmitter)

Queue.prototype.add = function (obj) {
  this.queue.push(obj)
  if (!this.processing) this.process()
}

Queue.prototype.process = function () {
  var self = this
  self.processing = true
  
  var queue = self.queue.slice()
  self.queue = []

  var batch = self.db.batch()
  var len = queue.length

  for (var i = 0; i < len; i++) {
    batch.put(queue[i].key, queue[i].value)
  }

  batch.write(function (err) {
    if (err) self.emit('error', err)
    self.processing = false
    if (self.queue.length) self.process()
  })  
}

function streamline (db) {
  db.createPutStream = function (opts) {
    var s = new Stream()
    s.writable = true

    if (!opts) opts = {}
    if (opts.batch) {
      var queue = new Queue(db)
      queue.on('error', s.emit.bind(s, 'error'))
    }
    
    s.write = function (obj) {
      if (opts.batch) {
        queue.add(obj)
      } else {
        db.put(obj.key, obj.value, function (err) {
          if (err) s.emit('error', err)
        })
      }
    }

    s.end = function (obj) {
      if (arguments.length) s.write(buf)
      s.writable = false
      s.emit('end')
    }

    s.destroy = function () {
      s.writable = false
      s.emit('end')
    }

    return s
  }

  db.createAppendStream = function (key) {
    throw new Error('not working yet! needs queue or locks')

    var s = new Stream()
    s.writable = true

    var locks = {}

    s.write = function (buf) {
      if (locks[key]) {
      
      }
      db.get(key, function (err, val) {
        if (err || !val) val = ''

        var appended = Buffer.isBuffer(val)
          ? Buffer.concat([val, buf])
          : val + buf

        db.put(key, appended, function (err) {
          if (err) s.emit('error', err)
        })
      })
    }

    return s
  }

  return db
}
