global.requestAnimationFrame = function() {};

import Vue from 'vue';
import Vuetify from 'vuetify';

import { expect } from 'chai';
import { mount, createLocalVue } from '@vue/test-utils';
import SalarySubmitForm from '@/components/SalarySubmitForm.vue';

Vue.use(Vuetify);

const localVue = createLocalVue();

describe('SalarySubmitForm.vue', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it('renders props.placeholder when passed', () => {
    const placeholder = 'test message';
    const wrapper = mount(SalarySubmitForm, {
      localVue,
      vuetify,
      propsData: { placeholder }
    });
    expect(wrapper.find('input').attributes('placeholder')).equal(placeholder);
  });

  it("set submitted to false and emit submit event if input's value not empty", done => {
    const value = '100';
    const wrapper = mount(SalarySubmitForm, {
      localVue,
      vuetify
    });
    wrapper.vm.value = value;
    wrapper.vm.submitHandler();
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.submitted).to.be.true;
      expect(wrapper.emitted().submit[0][0]).equal(parseInt(value));
      expect(wrapper.find('.v-text-field').isVisible()).to.be.false;
      done();
    });
  });

  it('reset values when call reset function and show input', done => {
    const value = '100';
    const wrapper = mount(SalarySubmitForm, {
      localVue,
      vuetify
    });
    wrapper.vm.submitted = true;
    wrapper.vm.value = value;
    wrapper.vm.reset();
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.submitted).to.be.false;
      expect(wrapper.vm.value).equal('');
      expect(wrapper.find('.v-text-field').isVisible()).to.be.true;
      done();
    });
  });
});
