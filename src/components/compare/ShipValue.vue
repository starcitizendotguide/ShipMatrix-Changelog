<template>
    <p class="has-text-left">
      <compare-focus :focusId="'values.' + field">
        {{ dataFields[field].name }}: <code>{{ (ship.values[field] ? ship.values[field] : '-') + dataFields[field].unit }}</code>
      </compare-focus>
    </p>
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
