<template>
  <plain-layout>
    <div class="not-found">
      Oops, wrong address. Try going <router-link to="/">Home</router-link>.
    </div>
  </plain-layout>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'NotFound',
})
</script>

<style lang="scss" scoped>
.not-found {
  text-align: center;
}
</style>
