<template>
  <div class="columns">

    <div class="column is-5 is-offset-1">
      <ship-column shipId="115"></ship-column>
    </div>
    <div class="column is-4">
      <ship-column shipId="115"></ship-column>
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
