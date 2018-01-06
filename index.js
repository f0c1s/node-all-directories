const fs = require('fs')
const path = require('path')
const d = require('node-directories')

class Directory {
  constructor(root) {
    this.root = root || '/'
    this.children = null
    this.errors = []
  }

  walk(depth = 1) {
    try {
      depth--;
      const dirs = d(this.root)
      this.children = dirs.map(d => new Directory(path.join(this.root, d)))
      if (depth) {
        this.children.forEach(c => c.walk(depth))
      }
    } catch (error) {
      this.errors.push(error.message)
    } finally {
      return this
    }
  }

}

module.exports = Directory
