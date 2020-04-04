<template>
  <div>
    <div v-for="experience in experiences" :key="experience.datetime">
      <h2>{{ experience.datetime }}</h2>
      <div>
        <h3>Co se stalo</h3>
        <div>{{ experience.story }}</div>

        <ul>
          <li>tag udalosti 1</li>
          <li>tag udalosti 2</li>
          <li>tag udalosti 3</li>
        </ul>
      </div>

      <div>
        <h3>Jak jsi to vyresil</h3>
        <div>{{ experience.solution }}</div>
        <ul>
          <li>tag reseni 1</li>
          <li>tag reseni 2</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  name: 'Experiences',
  computed: {
    ...mapState(['experiences']),
  },
})
</script>

<style lang="scss" scoped>
li {
  display: inline-block;
  margin-right: 0.2rem;
  font-size: 0.9rem;

  &:not(:first-child):before {
    content: '| ';
    font-weight: bold;
  }
}
</style>
