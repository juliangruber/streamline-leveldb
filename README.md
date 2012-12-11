
# streamline-leveldb

Add streaming methods to your favourite leveldb binding!

So far tested with

* leveled
* levelUp

## Usage

```js
var streamline = require('streamline-leveldb')
var db = require('leveled')('/tmp/foo')

// mixin
streamline(db)

var stream = db.createPutStream()
stream.write({ key : 'foo', value : 'bar' })
```

## API

### streamline(db)

Add streams to `db`

### db#createPutStream(opts)

Creates a new writable stream ready to receive put operations.

Put operations need to be in the form of

```json
{
  "key" : "my key",
  "value" : "my value"
}
```

Serialization of the value field is totally up to you!

If `opts.batch` is true, batching is used to increase performance.

### TODO methods

* `db#createRangeStream(from, to)`
* `db#createUpdateStream([key])`
* `db#createAppendStream(key)`
* more...

Help is appreciated!

## License

(MIT)

Copyright (c) 2012 &lt;julian@juliangruber.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
