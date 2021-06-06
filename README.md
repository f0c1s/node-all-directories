# node-all-directories

Get all the directories - node package

## Usage

### walk through file system

```javascript

var Directory = require('node-all-directories').Directory
var dirs = new Directory()

dirs.walk(/* depth = 1 */)

// dirs.children contains directories on root dir.

```

### List files along with directories

```javascript

var DirectoryListing = require('node-all-directories').DirectoryListing
var dl = new DirectoryListing('./') // this repo for example.

dl.walk(3)
//  DirectoryListing {
//    root: './',
//    children:
//    [ DirectoryListing {
//        root: '.git',
//        children: [Array],
//        files: [Array],
//        errors: [],
//        depth: 2 },
//      DirectoryListing {
//        root: 'node_modules',
//        children: [Array],
//        files: [],
//        errors: [],
//        depth: 2 },
//      DirectoryListing { root: 'src', children: [], files: [Array], errors: [], depth: 2 } ],
//    files:
//    [ '.editorconfig',
//      '.eslintrc.json',
//      '.gitignore',
//      '.npmrc',
//      '.nvmrc',
//      'CHANGELOG.md',
//      'CONTRIBUTION.md',
//      'LICENSE',
//      'README.md',
//      'index.js',
//      'package-lock.json',
//      'package.json' ],
//    errors: [],
//    depth: 3 }

```

### Find directories

```javascript
  var D = require('node-all-directories').Directory
  var dirs = new D()
  const options = {depth: 4}
  const whenFound = (root, tag) => { console.log(`root: ${root}, found: ${tag}`) }
  const findThese = ['usr', 'Applications', 'github']
  dir.find(findThese, whenFound, options)
```

If `options.depth` to `find` is greater than `dirs.depth`, then we walk.

IMPORTANT: Callback is necessary to get the output of `find`.


## License

MIT

- &copy; 2018 Git Faf
- &copy; 2021 Anubhav
