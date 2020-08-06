global.requestAnimationFrame = function() {};

import Vue from 'vue';
import Vuetify from 'vuetify';

import { expect } from 'chai';
import { mount, createLocalVue } from '@vue/test-utils';
import App from '@/App.vue';

Vue.use(Vuetify);

const localVue = createLocalVue();

describe('App.vue', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it('set the value of the current part when "submitHandler" is called with a value', () => {
    const wrapper = mount(App, {
      localVue,
      vuetify
    });
    wrapper.vm.currentPartId = 'employer';
    wrapper.vm.submitHandler(100);
    expect(wrapper.vm.parts.employer.value).equal(100);
  });
});
