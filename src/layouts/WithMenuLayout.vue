<template>
  <div class="with-menu-layout">
    <navigation />

    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import Navigation from '@/components/Navigation.vue'

export default Vue.extend({
  name: 'WithMenuLayout',

  components: {
    Navigation,
  },
})
</script>

<style lang="scss" scoped></style>
