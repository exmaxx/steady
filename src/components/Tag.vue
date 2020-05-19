<template>
  <span :class="type">{{ title }}</span>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Tag',

  props: {
    title: {
      type: String,
      required: true,
    },

    type: {
      default: 'neutral',
      validator(value: string): boolean {
        return ['neutral', 'positive', 'mixed', 'negative'].includes(value)
      },
    },
  },
})
</script>

<style lang="scss" scoped>
@import 'src/constants';

span {
  display: inline-block;
  margin-right: 0.3rem;
  margin-bottom: 0.3rem;
  padding: 0.2rem 0.5rem;
  box-sizing: border-box;
  border-radius: 0.5rem;

  &.neutral {
    color: black;
    background-color: $color-neutral;
    border: 0.05rem solid #ccc;
  }

  &.negative {
    color: white;
    background-color: $color-negative;
  }

  &.mixed {
    color: white;
    background-color: $color-mixed;
  }

  &.positive {
    color: white;
    background-color: $color-positive;
  }
}
</style>
