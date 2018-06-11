const path = require('path')
const d = require('node-directories')

const getFilesInCurrentDirectory = dir => {
  const content = fs.readdirSync(dir)
  const getPath = x => path.join(dir, x)
  const isFile = x => fs.lstatSync(getPath(x)).isFile()
  return content.filter(isFile)
}

class DirectoryListing {
  constructor(root) {
    this.root = root || '/'
    this.children = null
    this.files = null
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
      this.files = getFilesInCurrentDirectory(this.root)
        this.children = dirs.map(d => new DirectoryListing(path.join(this.root, d)))
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

module.exports = DirectoryListing
