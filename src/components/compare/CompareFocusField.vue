<template>
  <span @mouseover="changeFocus(focusId)" @mouseleave="changeFocus(null)"
    :class="{'highlighted-element': isFocused}"
  >
    <slot></slot>
  </span>
</template>

<script>

export default {
  props: [
    'focusId'
  ],
  methods: {
    changeFocus(field) {
      this.$root.comparator.focusedField = field;
    },
  },
  computed: {
    focusedField: function() {
      return this.$root.comparator.focusedField;
    },
    isFocused() {
      return (this.$root.comparator.focusedField == this.focusId);
    }
  }
}
</script>
