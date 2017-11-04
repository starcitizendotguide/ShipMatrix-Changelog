<template>
  <span>
    <h1 class="has-text-centered">{{ ship.name }}</h1>

    <div>
      <h4>Model</h4>

      <b-field>
        <b-select placeholder="Change Date" expanded>
          <option selected="selected" @click="selectDate(key)" v-for="(key, date) in history" value="">{{date}}</option>
        </b-select>
      </b-field>

      <compare-focus focusId="tablenamee">
        <b-table
            class="dark-table"
            :row-class="(row, index) => 'highlighted-text'"
            :data="shipValues">
            <template slot-scope="props">
                <b-table-column label="Name" width="60">
                    {{ props.row.key }}
                </b-table-column>

                <b-table-column label="Value">
                    {{ props.row.value }}
                </b-table-column>
            </template>

            <template slot="empty">
                <section class="section">
                    <div class="content has-text-grey has-text-centered">
                        <p>Nothing here.</p>
                    </div>
                </section>
            </template>
        </b-table>
      </compare-focus>
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
  </span>
</template>

<script>

export default {
  name: 'ShipColumn',
  props: [
    'shipId'
  ],
  data: function() {
    return {
      ship: null,
      history: [],
      shipValues: null,
      tmp: {
        selectFirst: true,
      }
    };
  },
  methods: {
    selectDate: function(key) {
      this.ship = key;
    }
  },
  created: function() {
    this.ship = this.$root.ships[this.shipId];
    this.history = this.$root.shipHistory[this.shipId];

    var self = this;
    this.shipValues = Object.keys(this.ship.values).map(function(key) {
        return {key: key, value: self.ship.values[key]};
    });
  }
}
</script>
