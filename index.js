const fs = require('fs')
const path = require('path')
const d = require('node-directories')

class Directory {
  constructor(root) {
    this.root = root || '/'
    this.children = null
  }

  walk() {
    try {
      const dirs = d(this.root)
      this.children = dirs.map(d => new Directory(path.join(this.root, d)))
    } catch (error) {
      console.error(error.message)
    } finally {
      return this.children
    }
  }

}

module.exports = Directory
