export * from 'vue-test-utils'

export const renderer = require('vue-server-renderer').createRenderer()
export const renderToString = vm => renderer.renderToString(vm)
