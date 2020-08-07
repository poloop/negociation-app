global.requestAnimationFrame = function() {};

import Vue from 'vue';
import Vuetify from 'vuetify';
import axios from '@/plugins/axios';

import { expect } from 'chai';
import sinon from 'sinon';
import { mount, createLocalVue, shallowMount } from '@vue/test-utils';
import App from '@/App.vue';

const MockAdapter = require('axios-mock-adapter');
const mock = new MockAdapter(axios);

Vue.use(Vuetify);

const localVue = createLocalVue();

describe('App.vue', () => {
  let vuetify;

  const SalarySubmitFormStub = {
    render: () => {},
    methods: {
      reset: sinon.stub()
    }
  };

  beforeEach(() => {
    vuetify = new Vuetify();
    mock.reset();
  });

  after(() => {
    mock.restore();
  });

  it('set the value of the current part when "submitHandler" is called with a value', () => {
    const wrapper = mount(App, {
      localVue,
      vuetify
    });
    wrapper.setData({
      currentPartId: 'employer'
    });
    wrapper.vm.submitHandler(100);
    expect(wrapper.vm.parts.employer.value).equal(100);
  });
  it('reset values when "reset" is called', done => {
    const wrapper = shallowMount(App, {
      localVue,
      vuetify,
      stubs: {
        'salary-submit-form': SalarySubmitFormStub
      }
    });
    wrapper.setData({
      parts: {
        employer: {
          value: 100
        },
        employee: {
          value: 80
        }
      }
    });
    wrapper.vm.$nextTick(() => {
      wrapper.vm.resetValues();
      expect(wrapper.vm.parts.employee.value).to.be.null;
      expect(wrapper.vm.parts.employer.value).to.be.null;
      done();
    });
  });
  it('should display result when values are set', done => {
    const wrapper = mount(App, {
      localVue,
      vuetify
    });
    wrapper.setData({
      parts: {
        employer: {
          value: 100
        },
        employee: {
          value: 80
        }
      }
    });
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.displayResult).to.be.true;
      expect(wrapper.find('#resultDialog').isVisible()).to.be.true;
      done();
    });
  });
  it('should not display result when displayResult is set to false', done => {
    const wrapper = mount(App, {
      localVue,
      vuetify
    });
    wrapper.setMethods({
      resetValues: sinon.stub()
    });
    wrapper.setData({
      displayResult: false
    });
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.displayResult).to.be.false;
      done();
    });
  });
  it('should have result set to "Success" if employee.value <= employer.value', done => {
    const wrapper = mount(App, {
      localVue,
      vuetify
    });
    wrapper.setData({
      parts: {
        employer: {
          value: 100
        },
        employee: {
          value: 80
        }
      }
    });
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.result).to.equal('Success');
      done();
    });
  });
  it('should have result set to "Failure" if employee.value > employer.value', done => {
    const wrapper = mount(App, {
      localVue,
      vuetify
    });
    wrapper.setData({
      parts: {
        employer: {
          value: 50
        },
        employee: {
          value: 80
        }
      }
    });
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.result).to.equal('Failure');
      done();
    });
  });
  it('should set temperature when "getLondonWeatherInformations"', async () => {
    const wrapper = shallowMount(App, {
      localVue,
      vuetify
    });
    const temp = 12;
    mock.onGet('https://api.openweathermap.org/data/2.5/weather').reply(200, {
      main: {
        temp
      }
    });
    await wrapper.vm.getLondonWeatherInformations();
    expect(wrapper.vm.temperature).to.equal(temp);
  });
});
