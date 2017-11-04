<template>
  <div class="content-box">
    <h1 v-if="ship !== null" class="has-text-primary has-text-centered">{{ ship.name }}</h1>

    <div class="content">

      <b-field>
          <b-autocomplete
              v-model="search.shipName"
              :data="filteredDataArray"
              @select="option => selected = option"
              v-on:input="autocompleteShipSelection"
              field="name"
              placeholder="Search for a ship"
              >
              <template slot="empty">No ship found</template>
          </b-autocomplete>
      </b-field>

      <b-field v-if="ship !== null">
        <b-select :disabled="this.ship === null" v-on:input="(ship) => setShip(ship)" class="highlighted-element" placeholder="Change Date" expanded>
          <option v-for="(ship, date) in history" :key="date" :value="ship">{{date}}</option>
        </b-select>
      </b-field>

    </div>
    <!---

    fields: {

      measurement: {
        length: -1,
        beam: -1,
        height: -1,
        size: null,
        mass: -1
      },
      structural: {
        cargoCapacity: -1,
        scmSpeed: -1,
        afterburgnerSpeed: -1,
        minCrew: -1,
        maxCrew: -1,
      },
      maneuvering: {
        pitchMax: -1,
        yawMax: -1,
        rollMax: -1,
        xAxisAcceleration: -1,
        yAxisAcceleration: -1,
        zAxisAcceleration: -1,
      }
    }

    -->
  </div>
</template>

<script>

export default {
  name: 'ShipColumn',
  props: ['shipId'],
  data: function() {
    return {
      selected: null,

      ship: null,
      shipValues: null,

      history: [],

      search: {
          shipName: '',
      }
    };
  },
  methods: {
    setShip: function(ship) {
      this.ship = ship;
      this.history = this.$root.shipHistory[this.ship.values['ID']];

      //--- Values
      var self = this;
      this.shipValues = Object.keys(this.ship.values).map(function(key) {
          return {key: key, value: self.ship.values[key]};
      });

      //--- Compiled

    },
    autocompleteShipSelection(name) {
      var self = this;
      Object.entries(this.$root.ships).forEach(function(entry) {
        var ship = entry[1];
        if(ship.name.localeCompare(name) === 0) {
          self.setShip(ship);
        }
      });

    }
  },
  created: function() {
    this.setShip(this.$root.ships[this.shipId]);
  },
  computed: {
    filteredDataArray() {
      var _list = [];

      var self = this;
      Object.entries(this.$root.ships).forEach(function(entry) {
        var ship = entry[1];
        if(ship.name.toString().toLowerCase().indexOf(self.search.shipName.toLowerCase()) >= 0) {
          _list.push(ship);
        }
      });

      return _list;
    }
  }
}
</script>
