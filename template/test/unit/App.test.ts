import { mount } from './utils'
import App from '@/App.vue'

describe('App.vue', () => {
  it('default', async () => {
    const wrap = mount(App)

    expect(wrap.find('h1').text()).toEqual(wrap.vm.msg)
    expect(wrap.vm.$el).toMatchSnapshot()

    wrap.setData({msg: 'Hello'})
    wrap.update()

    expect(wrap.find('h1').text()).toEqual('Hello')
    expect(wrap.vm.$el).toMatchSnapshot()
  })
})
