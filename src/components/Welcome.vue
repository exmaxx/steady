<template>
  <div class="centered">
    <div class="welcome">Welcome to <strong>Steady</strong>.</div>

    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Welcome',
})
</script>

<style lang="scss" scoped>
.centered {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-top: 35vh;

  .welcome {
    margin: 0.7em;
  }
}
</style>
