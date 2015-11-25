# jexia-ecomod
[Express](http://expressjs.com) friendly middleware to automatically stop the server if it's not used after a period of time.

## Installation

```
npm install jexia-ecomod
```

## Usage
#### Normal
```
var ecomod = require('jexia-ecomod');

var eco = ecomod({
    // Time interval (ms) to stop the server
    interval: 10000,
    // Callback triggered when the server needs to stop
    // If you need to handle some other stuff also before exit
    onBeforeExit: function() {
    }
});

app.use(eco);

```
#### with PM2
```
var ecomod = require('jexia-ecomod');

var eco = ecomod({
    // Time interval (ms) to stop the server
    interval: 10000,
    // Use PM2 to stop the server
    pm2: {
        proc_name: 'server-beta',
        proc_id: 1
    },
    // Callback triggered when the server needs to stop
    // If you need to handle some other stuff also before exit
    onBeforeExit: function() {
    }
});

app.use(eco);

```


## Test
```
npm run test

```

## Issues
Feel free to submit issues and enhancement requests.

## Contributing
 In general, we follow the "fork-and-pull" Git workflow.

 1. Fork the repo on GitHub
 2. Commit changes to a branch in your fork
 3. Pull request "upstream" with your changes
 4. Merge changes in to "upstream" repo

NOTE: Be sure to merge the latest from "upstream" before making a pull request!

## License

The MIT License (MIT)

Copyright (c) 2015 Jexia

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
