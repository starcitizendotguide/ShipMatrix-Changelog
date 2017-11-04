<template>
  <div class="content-box">
    <span v-if="ship !== null">
      <h1 class="header has-text-primary has-text-centered">{{ ship.name }}</h1>
      <h6 class="is-muted has-text-centered">{{ ship.values.FOCUS }} ({{ ship.values.TYPE }})</h6>
      <p class="is-muted text-detail has-text-centered">
        {{ ship.values.PRODUCTION_STATUS }}
      </p>
      <p class="is-muted text-detail has-text-centered">
        {{ ship.values.PRODUCTION_NOTE }}
      </p>
    </span>

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

      <div v-if="ship !== null">
        <b-field>
          <b-select :disabled="this.ship === null" v-on:input="(ship) => setShip(ship)" class="highlighted-element" placeholder="Change Date" expanded>
            <option v-for="(ship, date) in history" :key="date" :value="ship">{{date}}</option>
          </b-select>
        </b-field>

        <p>
          {{ ship.values['Description'] }}
        </p>

        <div class="tile">

          <div class="tile is-vertical">

            <div class="tile is-parent">

              <div class="tile is-child">
                <div class="content-box">
                  <h4 class="header has-text-centered">Description</h4>
                  <div class="content">
                    {{ ship.values.DESCRIPTION }}
                  </div>
                </div>
              </div>

            </div>

            <div class="tile is-parent">

              <div class="tile is-child">
                <div class="content-box">
                  <h4 class="header has-text-centered">Measurement</h4>
                  <div class="content">
                    <ship-value :ship="ship" field="LENGTH"></ship-value>
                    <ship-value :ship="ship" field="BEAM"></ship-value>
                    <ship-value :ship="ship" field="HEIGHT"></ship-value>
                    <ship-value :ship="ship" field="SIZE"></ship-value>
                    <ship-value :ship="ship" field="MASS"></ship-value>
                  </div>
                </div>
              </div>

              <div class="tile is-child">
                <div class="content-box">
                  <h4 class="header has-text-centered">Structural</h4>
                  <div class="content">
                    <ship-value :ship="ship" field="CARGO"></ship-value>
                    <ship-value :ship="ship" field="SCM_SPEED"></ship-value>
                    <ship-value :ship="ship" field="AFTERBURNER_SPEED"></ship-value>
                    <ship-value :ship="ship" field="MIN_CREW"></ship-value>
                    <ship-value :ship="ship" field="MAX_CREW"></ship-value>
                  </div>
                </div>
              </div>

            </div>

            <div class="tile is-parent">

              <div class="tile is-child">
                <div class="content-box">
                  <h4 class="header has-text-centered">Maneuvering</h4>
                  <div class="content">
                    <ship-value :ship="ship" field="PITCH_MAX"></ship-value>
                    <ship-value :ship="ship" field="YAW_MAX"></ship-value>
                    <ship-value :ship="ship" field="ROLL_MAX"></ship-value>
                    <ship-value :ship="ship" field="XAXIS_ACCELERATION"></ship-value>
                    <ship-value :ship="ship" field="YAXIS_ACCELERATION"></ship-value>
                    <ship-value :ship="ship" field="ZAXIS_ACCELERATION"></ship-value>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

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
          self.setShip(self.$root.shipHistory[ship.values.ID]['Now']);
        }
      });
    }
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
