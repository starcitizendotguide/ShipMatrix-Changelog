// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'

import 'buefy/lib/buefy.css'
import Buefy from 'buefy'

//--- SCSS
require('./assets/sass/app.scss');

Vue.config.productionTip = true

//--- Data
const shipsData = require('./assets/data/ships.json');
const shipHistoryData = require('./assets/data/shipHistory.json');

const dataFieldsData = require('./assets/data/dataFields.json');
const parentTypesData = require('./assets/data/parentTypes.json');
const componentTypeFieldsData = require('./assets/data/componentTypeFields.json');
const compiledFieldsData = require('./assets/data/compiledFields.json');

//--- Components
import ShipColumn from './components/compare/ShipColumn.vue';
import CompareFocusField from './components/compare/CompareFocusField.vue';
import ShipValue from './components/compare/ShipValue.vue';

Vue.component('ship-column', ShipColumn);
Vue.component('ship-value', ShipValue);
Vue.component('compare-focus', CompareFocusField);

Vue.use(Buefy, {defaultIconPack: 'fa'})

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  data: {
    ships: shipsData,
    shipHistory: shipHistoryData,

    dataFields: dataFieldsData,
    parentTypes: parentTypesData,
    componentTypeFields: componentTypeFieldsData,
    compiledFields: compiledFieldsData,

    comparator: {
      focusedField: null,

      collapsed: {
        values: {
          description: false,
          measureAstruct: true,
          maneuvering: true,
        }
      }
    }
  }
})
