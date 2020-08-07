<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <h1>Negociation Application</h1>
      </div>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-tabs
                v-model="currentPartId"
                background-color="primary"
                class="elevation-2"
                dark
                centered="centered"
                grow
              >
                <v-tab v-for="(part, index) in parts" :key="index" :href="`#${part.id}`">{{ part.label }}</v-tab>
              </v-tabs>
              <v-tabs-items v-model="currentPartId">
                <v-tab-item v-for="(part, index) in parts" :key="index" :value="part.id">
                  <salary-submit-form
                    :placeholder="part.placeholder"
                    @submit="submitHandler"
                    ref="formParts"
                  ></salary-submit-form>
                </v-tab-item>
              </v-tabs-items>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-dialog v-model="displayResult" max-width="290" light id="resultDialog">
      <v-card-title class="headline">{{ result }}</v-card-title>
      <v-card-text>
        <p>Maximum offer was {{ parts.employer.value }}</p>
        <p>Minimum expected salary was {{ parts.employee.value }}</p>
        <br />
        <p>The current temperature in {{ weatherLocation }} is {{ temperature }}°C.</p>
      </v-card-text>
    </v-dialog>
  </v-app>
</template>
<script>
import SalarySubmitForm from './components/SalarySubmitForm';
import axios from './plugins/axios';

const WEATHER_API = 'https://api.openweathermap.org/data/2.5/weather';
// Just for the test, it would be preferable to set the API KEY in a .env file not store in the repository
const WEATHER_API_KEY = '7ccfcacaba49ffe1e92e7c1028ab8ef9';

export default {
  name: 'App',
  components: {
    SalarySubmitForm
  },
  data: () => ({
    currentPartId: null,
    parts: {
      employer: {
        id: 'employer',
        label: 'Employer',
        placeholder: 'Enter maximum offer',
        value: null
      },
      employee: {
        id: 'employee',
        label: 'Employee',
        placeholder: 'Enter minimum salary',
        value: null
      }
    },
    weatherLocation: 'London,uk',
    temperature: ''
  }),
  computed: {
    displayResult: {
      get: function() {
        return [this.parts.employer, this.parts.employee].every(({ value }) => value !== null);
      },
      set: function(value) {
        if (!value) {
          this.resetValues();
        }
      }
    },
    result() {
      if (this.displayResult) {
        const { employer, employee } = this.parts;
        return parseInt(employee.value) <= parseInt(employer.value) ? 'Success' : 'Failure';
      }
      return '';
    }
  },
  watch: {
    displayResult(newValue) {
      if (newValue) {
        this.getLondonWeatherInformations();
      }
    }
  },
  mounted() {},
  methods: {
    submitHandler(value) {
      const currentPart = this.parts[this.currentPartId];
      if (currentPart) {
        currentPart.value = value;
      }
    },
    resetValues() {
      this.parts.employer.value = null;
      this.parts.employee.value = null;
      this.$refs.formParts.forEach(form => {
        form.reset();
      });
    },
    async getLondonWeatherInformations() {
      const response = await axios.get(WEATHER_API, {
        params: {
          q: this.weatherLocation,
          appid: WEATHER_API_KEY,
          units: 'metric'
        }
      });
      if (response.status === 200) {
        this.temperature = response.data.main.temp;
      }
    }
  }
};
</script>
<style lang="css">
.v-dialog {
  background-color: #fff;
}
</style>
