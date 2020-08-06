<template>
  <v-form class="form">
    <v-text-field v-show="!submitted" :placeholder="placeholder" v-model="value" min="0" required solo></v-text-field>
    <v-btn @click="submitHandler">Submit</v-btn>
  </v-form>
</template>
<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: 'Placeholder'
    }
  },
  data() {
    return {
      value: '',
      submitted: false
    };
  },
  methods: {
    submitHandler() {
      if (this.value !== '') {
        this.submitted = true;
        this.$emit('submit', parseInt(this.value));
      }
    },
    reset() {
      this.submitted = false;
      this.value = '';
    }
  }
};
</script>
<style lang="css" scoped>
.form {
  min-height: 220px;
  padding: 50px;
}
</style>
