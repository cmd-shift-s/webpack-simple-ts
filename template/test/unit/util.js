import Vue from 'vue'
import faker from 'faker'
import $ from 'jquery'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

/**
 * Creator Vue component
 *
 * 컴포넌트 생성자(Ctor)와 DOM Element(el)를 가지는 클로저를 리턴한다.
 *
 * 리턴받은 클로저는 propsData를 파라메터로 받아서 뷰 컴포넌트를 생성한다.
 * $ 함수는 query를 파라메터로 받아서 $(vm.$el).find(query)의 결과를 리턴한다.
 *
 * @param {Object} vue - Vue component
 * @returns {Function} - 컴포넌트 생성자(Ctor)와 DOM Element(el)를 가지는 클로저
 *                     - 파라메터로 propsData를 받는다.
 */
function newVM(vue) {
  const Ctor = Vue.extend(vue)
  const el = document.createElement('div')
  return (propsData = {}) => {
    const vm = new Ctor({el, propsData})
    vm.$ = (query) => {
      return $(vm.$el).find(query)
    }
    return vm.$mount()
  }
}

/**
 * Promise based Creator Vue component
 *
 * 뷰 컴포넌트에서 비동기로 데이터를 바인딩 할 경우
 * process.nextTick으로 비동기 이벤트 다음에
 * 뷰 업데이트가 완료 되면 생성한 뷰 컴포넌트를 리턴한다.
 * 그래서 비동기 로직이 수행 후 테스트가 수행되도록 꾀한다.
 *
 * 단, 비동기 로직에서 다시 비동기 로직을 수행하지 다는 조건이다.
 *
 * @param {Object} vue - Vue component
 * @returns {Promise} - 생성된 뷰 컴포넌트를 넘기는 Promise
 */
function asyncNewVM(vue) {
  const ctorVM = newVM(vue)
  return (propsData = {}) => {
    let mountedVM = ctorVM(propsData)
    return new Promise(resolve => {
      process.nextTick(() => { // after axios event
        mountedVM.$nextTick(() => { // beforeUpdate
          mountedVM.$nextTick(() => { // updated
            resolve(mountedVM)
          })
        })
      })
    })
  }
}

/**
 * Create mock object
 *
 * 파라메터 객체 구조를 그대로 가지면서
 * value값을 해석해서 fake value로 채워서 리턴한다.
 *
 * @param {Object} obj - mock data로 채워질 객체
 * @return {Object} - mock data로 채워진 객체
 */
function mock(obj) {
  let mockup = {}

  for (let key of Object.keys(obj)) {
    let val = obj[key]
    if (typeof val === 'string' && val.length !== 0) {
      mockup[key] = mockdata(val)
    } else {
      mockup[key] = val
    }
  }

  return mockup
}

/**
 * Create mock data array
 *
 * @param {Object} obj - mock data로 채워질 객체
 * @param {Number} [cnt = 3] - 갯수 만큼 객체를 생성한다.
 */
function mocks(obj, cnt = 3) {
  let mockups = []

  while (cnt-- > 0) {
    mockups.push(mock(obj))
  }

  return mockups
}

/**
 * Create mock data
 *
 * value prefix:
 * - num: - Number.parseInt
 * - date: - new Date
 *
 * @param {String} val - fake 파라메터로 사용된다.
 * @returns {String} - fake mock data
 */
function mockdata(val) {
  let data = faker.fake(val)
  if (/^num:/i.test(val)) {
    return Number.parseInt(data.substring('num:'.length))
  } else if (/^date:/i.test(val)) {
    return new Date(data.substring('date:'.length))
  } else {
    return data
  }
}

/**
 * Create AxiosMockAdapter
 *
 * axios를 감싼 MockAdapter를 리턴한다.
 *
 * @returns {Object} - MockAdapter
 */
function createAxiosMock() {
  return new MockAdapter(axios)
}

module.exports = {
  newVM, asyncNewVM, mockdata, mock, mocks, createAxiosMock
}
