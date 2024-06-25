const fs = require('fs')
const path = require('path')

const fileToBase64 = (filePath) => {
  const absolutePath = path.resolve(__dirname, filePath)
  const file = fs.readFileSync(absolutePath)
  return Buffer.from(file).toString('base64')
}

module.exports = {
  process: (sourceText, sourcePath) => {
    return {
      code: `module.exports = 'data:image/png;base64,${fileToBase64(sourcePath)}'`
    }
  }
}
