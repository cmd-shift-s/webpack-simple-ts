import Vue from 'vue'
import App from 'src/App.vue'
import util from 'test/unit/util'

describe('Vue.vue', () => {

  describe('i18n', () => {
    const newVM = util.newVM(App)
    const ko = require('i18n/ko.json')

    it('works with ko.msg', () => {
      const vm = newVM()

      vm.msg.should.equal(ko.msg)
    })
  })

  describe('/api/msg', () => {
    const newVM = util.asyncNewVM(App)
    const msg = util.mockdata('{{lorem.sentence}}')

    const axiosMock = util.createAxiosMock()

    before(() => {
      axiosMock.onGet('/api/msg').reply(200, {msg})
    })

    after(() => {
      axiosMock.restore()
    })

    it('works with msg', (done) => {
      newVM().then(vm => {
        // data
        vm.msg.should.equal(msg)
        // view
        vm.$('h1').text().should.equal(msg)
        done()
      }).catch(err => {
        done(err)
      })
    })
  })
})
