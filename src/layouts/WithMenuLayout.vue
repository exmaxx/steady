<template>
  <div class="with-menu-layout">
    <navigation-view />

    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import NavigationView from '@/views/NavigationView.vue'

export default Vue.extend({
  name: 'WithMenuLayout',

  components: {
    NavigationView,
  },
})
</script>

<style lang="scss" scoped></style>
