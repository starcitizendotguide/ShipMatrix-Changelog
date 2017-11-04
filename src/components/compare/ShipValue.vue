<template>
  <p>{{ dataFields[field].name }}: <compare-focus :focusId="'values.' + field"><code>{{ (ship.values[field] ? ship.values[field] : '-') + dataFields[field].unit }}</code></compare-focus></p>
</template>
<script>

export default {
  props: [
    'ship',
    'field',
  ],
  data: function() {
    return {
      dataFields: this.$root.dataFields
    };
  }
}
</script>
