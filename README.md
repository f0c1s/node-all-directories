# node-all-directories

- [NPM](https://www.npmjs.com/package/node-all-directories)
- [GitHub](https://github.com/f0c1s/node-all-directories)
- Checkout [Changelog](CHANGELOG.md) for changes.

## v13 (current version)

## Dependencies

- `node-directories`
    - [NPM](https://www.npmjs.com/package/node-directories)
    - [GitHub](https://github.com/iamanubhavsaini/node-directories)

## Features

- Get directories in an array that mimics directory structure.
- Get files.
- Find directories.

## Installation

`npm i node-all-direcotories`

## Usage

### Walk through file system

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
