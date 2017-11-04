<template>
  <div class="columns">

    <div class="column is-4 is-offset-2">
      <ship-column shipId="61"></ship-column>
    </div>
    <div class="column is-4">
      <ship-column shipId="5"></ship-column>
    </div>

  </div>
</template>

<script>

export default {
  name: 'Compare',
  data: function() {
    return {
      ships: this.$root.ships,
    }
  },
  methods: {
  },
  computed: {
  },
  created: function() {
  }
}
</script>
