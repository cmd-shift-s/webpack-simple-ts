import { mount, Wrapper } from './utils'
import App from '@/App'

describe('App.vue', () => {
  it('default', () => {
    const wrap = mount(App) as Wrapper<App>

    expect(wrap.find('h1').text()).toEqual(wrap.vm.msg)
    expect(wrap.vm.$el).toMatchSnapshot()

    wrap.setData({msg: 'Hello'})
    wrap.update()

    expect(wrap.find('h1').text()).toEqual('Hello')
    expect(wrap.vm.$el).toMatchSnapshot()
  })
})
