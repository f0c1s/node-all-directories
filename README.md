# node-all-directories

Get all the directories - node package

Checkout [Changelog](CHANGELOG.md) for changes.

## Usage

### walk through file system

```javascript

var Directory = require('node-all-directories').Directory
var dirs = new Directory()

dirs.walk(/* depth = 1 */)

// dirs.children contains directories on root dir.

```

### Find directories

```javascript

const D = require('node-all-directories').Directory
const dirs = new D()
const options = {depth: 4}
const whenFound = (root, tag) => {
    console.log(`root: ${root}, found: ${tag}`)
}
const findThese = ['usr', 'home', 'Movies', 'Documents']
dirs.find(findThese, whenFound, options)

```

If `options.depth` to `find` is greater than `dirs.depth`, then we walk.

IMPORTANT: Callback is necessary to get the output of `find`.

## License

MIT

- &copy; 2018 Git Faf
- &copy; 2021 Anubhav
