// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'

import 'buefy/lib/buefy.css'
import Buefy from 'buefy'

require('./assets/sass/style.scss')

Vue.config.productionTip = true

//--- Data
const shipsData = require('./assets/data/ships.json');
const dataFieldsData = require('./assets/data/dataFields.json');


//--- Components
import ShipColumn from './components/compare/ShipColumn.vue';

Vue.component('ship-column', ShipColumn);

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App, Buefy },
  data: {
    ships: shipsData,
    dataFields: dataFieldsData,

    comparator: {
      focusedField: 'Focus'
    }
  }
})
