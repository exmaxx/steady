<template>
  <div>
    <router-link
      :to="{ name: 'add-experience' }"
      class="pure-button pure-button-primary"
    >
      <i class="fas fa-plus"></i>
    </router-link>

    <div v-for="experience in experiences" :key="experience.datetime">
      <h2>{{ experience.datetime }}</h2>
      <div>
        <h3>Co se stalo</h3>
        <div>{{ experience.situation }}</div>

        <ul v-if="experience.situationActivities.length > 0">
          <li v-for="activity in experience.situationActivities">
            {{ activity }}
          </li>
        </ul>

        <ul v-if="experience.situationEmotions.length > 0">
          <li v-for="emotion in experience.situationEmotions">
            {{ emotion }}
          </li>
        </ul>
      </div>

      <div>
        <h3>Jak jsi to vyresil</h3>
        <div>{{ experience.solution }}</div>

        <ul v-if="experience.solutionActivities.length > 0">
          <li v-for="activity in experience.solutionActivities">
            {{ activity }}
          </li>
        </ul>

        <ul v-if="experience.solutionEmotions.length > 0">
          <li v-for="emotion in experience.solutionEmotions">
            {{ emotion }}
          </li>
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
