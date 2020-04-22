<template>
  <div class="content">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'PlainLayout',
})
</script>

<style lang="scss" scoped></style>
