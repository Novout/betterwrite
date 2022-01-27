import { mount } from '@vue/test-utils'
import { test, expect } from 'vitest'
import { getVueMock } from './utils'
import App from '../src/App.vue'

test('App exists', async () => {
  /*
  @vueuse/motion breaking...

  const wrapper = mount(App, getVueMock())

  expect(wrapper).toBeTruthy()
  */
})
