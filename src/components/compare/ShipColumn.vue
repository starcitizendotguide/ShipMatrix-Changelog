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
          <b-select @select="option => testIt(option)" v-on:input="(ship) => setShip(ship)" class="search-box" expanded>
            <option selected v-for="(ship, date) in history" :key="date" :value="ship">{{date}}</option>
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
                  <h4 class="header has-text-centered is-clickable" @click="collapseSwitch('values', 'description')">Description</h4>
                    <transition name="fade">
                      <div v-if="isCollapsed('description')" class="content">
                        {{ ship.values.DESCRIPTION }}
                      </div>
                    </transition>
                </div>
              </div>

            </div>

            <div class="tile is-parent">

              <div class="tile is-child">
                <div class="content-box">
                  <h4 class="header has-text-centered is-clickable" @click="collapseSwitch('values', 'measureAstruct')">Measurement</h4>
                  <transition name="fade">
                    <div v-if="isCollapsed('measureAstruct')" class="content">
                      <ship-value :ship="ship" field="LENGTH"></ship-value>
                      <ship-value :ship="ship" field="BEAM"></ship-value>
                      <ship-value :ship="ship" field="HEIGHT"></ship-value>
                      <ship-value :ship="ship" field="SIZE"></ship-value>
                      <ship-value :ship="ship" field="MASS"></ship-value>
                    </div>
                  </transition>
                </div>
              </div>

              <div class="tile is-child">
                <div class="content-box">
                  <h4 class="header has-text-centered is-clickable" @click="collapseSwitch('values', 'measureAstruct')">Structural</h4>
                  <transition name="fade">
                    <div v-if="isCollapsed('measureAstruct')" class="content">
                      <ship-value :ship="ship" field="CARGO"></ship-value>
                      <ship-value :ship="ship" field="SCM_SPEED"></ship-value>
                      <ship-value :ship="ship" field="AFTERBURNER_SPEED"></ship-value>
                      <ship-value :ship="ship" field="MIN_CREW"></ship-value>
                      <ship-value :ship="ship" field="MAX_CREW"></ship-value>
                    </div>
                </transition>
                </div>
              </div>

            </div>

            <div class="tile is-parent">

              <div class="tile is-child">
                <div class="content-box">
                  <h4 class="header has-text-centered is-clickable" @click="collapseSwitch('values', 'maneuvering')">Maneuvering</h4>
                  <transition name="fade">
                    <div class="content" v-if="isCollapsed('maneuvering')">
                      <ship-value :ship="ship" field="PITCH_MAX"></ship-value>
                      <ship-value :ship="ship" field="YAW_MAX"></ship-value>
                      <ship-value :ship="ship" field="ROLL_MAX"></ship-value>
                      <ship-value :ship="ship" field="XAXIS_ACCELERATION"></ship-value>
                      <ship-value :ship="ship" field="YAXIS_ACCELERATION"></ship-value>
                      <ship-value :ship="ship" field="ZAXIS_ACCELERATION"></ship-value>
                    </div>
                  </transition>
                </div>
              </div>

            </div>

            <div class="tile is-parent is-vertical" v-for="dataEntries in shipCompiled">

                <div class="content-box">

                  <div class="tile header">
                    {{ parentTypes[dataEntries.name].name }}
                  </div>

                  <div class="tile" v-for="componentTypes in dataEntries.list">
                    <div class="tile is-parent is-vertical" v-for="componentType in componentTypes">

                      <div class="content-box">

                        <div class="header">
                          {{ componentTypeFields[componentType.name].name }}
                        </div>

                        <div class="tile is-child" v-for="component in componentType.list">
                            <div class="content-box">
                              <div class="header"><small>{{ component.values.NAME ? component.values.NAME : "Unknown Name" }}</small></div>
                              <ul class="content">
                                <li v-for="value,key in component.values" v-if="key !== 'NAME' && key !== 'TYPE'">
                                  {{ compiledFields[key].name }}: {{value}} {{ compiledFields[key].unit }}
                                </li>
                              </ul>
                            </div>
                        </div>

                      </div>

                    </div>
                  </div>

                </div>

            </div>

          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script>

export default {
  name: 'ShipColumn',
  data: function() {
    return {
      selected: null,

      componentTypeFields: this.$root.componentTypeFields,
      parentTypes: this.$root.parentTypes,
      compiledFields: this.$root.compiledFields,

      ship: null,
      shipValues: null,
      shipCompiled: [],
      history: [],

      search: {
          shipName: '',
      },
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
      var _c = [];
      Object.entries(this.ship.compiledData.fields).forEach(function(parent) {

          var _name = parent[0];
          var _list = [];

          //--- Add
          var i = 0;
          var _tmp = [];
          Object.entries(parent[1]).forEach(function(entry) {
            i++;
            _tmp.push({ name: entry[0], list: entry[1] });

            if(i % 3 == 0) {
              _list.push(_tmp);
              _tmp = [];
            }
          });
          if(_tmp.length > 0) {
            _list.push(_tmp);
          }

          _c.push({ name: _name, list: _list })
      });
      this.shipCompiled = _c;
    },
    autocompleteShipSelection(name) {
      var self = this;
      Object.entries(this.$root.ships).forEach(function(entry) {
        var ship = entry[1];
        if(ship.name.localeCompare(name) === 0) {
          self.setShip(self.$root.shipHistory[ship.values.ID]['Now']);
        }
      });
    },
    isCollapsed(name) {
      return this.$root.comparator.collapsed.values[name];
    },
    collapseSwitch(type, name) {
      if(type === 'values') {
        this.$root.comparator.collapsed.values[name] = !this.$root.comparator.collapsed.values[name];
      }
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
