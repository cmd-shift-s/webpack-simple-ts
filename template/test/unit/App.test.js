import { mount, renderToString } from './utils'
import App from '@/App.vue'

describe('App.vue', () => {
  it('default', async () => {
    const wrap = mount(App)

    expect(wrap.find('h1').text()).toEqual(wrap.vm.msg)
    expect(await renderToString(wrap.vm)).toMatchSnapshot()

    wrap.setData({msg: 'Hello'})
    wrap.update()

    expect(wrap.find('h1').text()).toEqual('Hello')
    expect(await renderToString(wrap.vm)).toMatchSnapshot()
  })
})
