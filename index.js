var Stream = require('stream')

module.exports = streamline

function streamline (db) {
  db.createPutStream = function () {
    var s = new Stream()
    s.writable = true
    
    s.write = function (obj) {
      db.put(obj.key, obj.value, function (err) {
        if (err) s.emit('error', err)
      })
    }

    s.end = function (obj) {
      if (arguments.length) s.write(buf)
      s.writable = false
    }

    s.destroy = function () {
      s.writable = false
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
}
