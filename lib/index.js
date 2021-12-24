const compiler = require('vue-template-compiler')
const fs = require('fs')

function filterVueFiles(files) {
  return files.filter((file) => file.match(/.vue$/))
}

function calcTypeScriptRate(sfcFiles) {
  const descriptors = sfcFiles.map((file) => {
    const component = fs.readFileSync(file).toString()
    return compiler.parseComponent(component)
  })
  const totalCount = sfcFiles.length
  const tsCount = descriptors.filter(
    (desc) => desc.script?.attrs?.lang === 'ts'
  ).length
  return tsCount / totalCount
}

module.exports = {
  filterVueFiles,
  calcTypeScriptRate,
}
