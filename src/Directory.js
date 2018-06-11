const path = require('path')
const d = require('node-directories')

class Directory {
  constructor(root) {
    this.root = root || '/'
    this.children = null
    this.errors = []
    this.depth = 0
  }

  walk(depth = 1) {
    const dontNeedToWalk = depth <= 0 || (this.children && this.depth >= depth)
    if (dontNeedToWalk) {
      return this
    }
    try {
      this.depth = depth
      const dirs = d(this.root)
      this.children = dirs.map(d => new Directory(path.join(this.root, d)))
      if (--depth) {
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
