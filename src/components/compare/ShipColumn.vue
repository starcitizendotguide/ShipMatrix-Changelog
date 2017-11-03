<template>
  <span>
    <h1 class="has-text-centered">{{ ship.name }}</h1>

    <div>
      <h4>Model</h4>
      <span>Focus:
        <p class="has-text-primary">{{ ship.values['Focus'] }}</p>
      </span>
    </div>


    <!---

    fields: {
      model: {
        focus: null,
        description: null,
      },
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
  props: [
    'shipId'
  ],
  data: function() {
    return {
      ship: null,
    };
  },
  methods: {
    changeFocus(field) {
      this.$root.comparator.focusedField = field;
    }
  },
  computed: {
    focusedField: function() {
      return this.$root.comparator.focusedField;
    }
  },
  created: function() {
    this.ship = this.$root.ships[this.shipId];
  }
}
</script>
