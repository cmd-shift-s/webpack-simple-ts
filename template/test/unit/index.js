
require('should')
require('should-sinon')
require('src/main.i18n')

// require all test files (files that ends with .spec.js)
const testsContext = require.context('./specs', true, /\.spec.js$/)
testsContext.keys().forEach(testsContext)
