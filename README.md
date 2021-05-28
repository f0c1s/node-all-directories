# node-all-directories

Get all the directories - node package

## Usage

```javascript

var Directory = require('node-all-directories').Directory
var dirs = new Directory()

dirs.walk(/* depth = 1 */)

// dirs.children contains directories on root dir.

```

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

## License

MIT

- &copy; 2018 Git Faf
- &copy; 2021 Anubhav
