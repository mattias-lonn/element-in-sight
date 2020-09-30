const { readFileSync, writeFileSync } = require('fs')
const { resolve } = require('path')

const withinViewData = readFileSync(resolve(__dirname, './within-view.js'), 'utf8')
  .replace(/^\/\* global useLayoutEffect \*\/\n\n/, '')

const integrations = {
  preact: 'const { useLayoutEffect } = require(\'preact/hooks\')\n\n',
  react: 'const { useLayoutEffect } = require(\'react\')\n\n'
}

for (const [integration, integrationData] of Object.entries(integrations)) {
  try {
    writeFileSync(resolve(__dirname, `./integrations/${integration}.js`), integrationData + withinViewData)
  } catch (err) {
    console.error(`Failed to create integration '${integration}.js', error: ${err.message}`)
  }
}
