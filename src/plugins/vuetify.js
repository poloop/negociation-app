import Vue from 'vue';
import Vuetify, { VCard, VDialog, VTabs, VTabItems, VTab, VTabItem, VTextField, VBtn } from 'vuetify/lib';

Vue.use(Vuetify, {
  components: {
    VCard,
    VDialog,
    VTabs,
    VTab,
    VTabItems,
    VTabItem,
    VTextField,
    VBtn
  }
});

export default new Vuetify({});
