<template>
  <div :key="experience.id" class="experience">
    <h2>{{ experience.datetime | formatDateAndTime }}</h2>

    <h5 class="shadow">
      {{ experience.datetime | dayInWeek }},
      {{ experience.datetime | asIntervalDate }}
    </h5>

    <!-- TODO: Create Experience class with helper methods (datetime, hasSituation, hasSolution,...) -->

    <div>
      <div
        v-if="
          experience.situationStory !== '' ||
          experience.situationActivities.length > 0 ||
          experience.situationEmotions.length > 0
        "
        class="situation"
      >
        <h3>Trouble</h3>

        <div v-if="experience.situationStory !== ''" class="story">
          {{ experience.situationStory }}
        </div>

        <div v-if="experience.situationActivities.length > 0" class="tags">
          <h4>Activities:</h4>

          <ul>
            <li
              v-for="activity in experience.situationActivities"
              :key="activity"
            >
              <tag :title="activity" type="negative" />
            </li>
          </ul>
        </div>

        <div v-if="experience.situationEmotions.length > 0" class="tags">
          <h4>Emotions:</h4>

          <ul>
            <li v-for="emotion in experience.situationEmotions" :key="emotion">
              <tag :title="emotion" type="negative" />
            </li>
          </ul>
        </div>
      </div>

      <hr
        v-if="
          experience.solutionStory !== '' ||
          experience.solutionActivities.length > 0 ||
          experience.solutionEmotions.length > 0
        "
      />

      <div
        v-if="
          experience.solutionStory !== '' ||
          experience.solutionActivities.length > 0 ||
          experience.solutionEmotions.length > 0
        "
        class="solution"
      >
        <h3>Reaction</h3>

        <h5 :class="experience.solutionAspect | aspectAsClass">
          {{ experience.solutionAspect | aspectInWords }}
        </h5>

        <div>
          <div v-if="experience.solutionStory !== ''" class="story">
            {{ experience.solutionStory }}
          </div>

          <div v-if="experience.solutionActivities.length > 0" class="tags">
            <h4>Activities:</h4>

            <ul>
              <li
                v-for="activity in experience.solutionActivities"
                :key="activity"
              >
                <tag :title="activity" type="positive" />
              </li>
            </ul>
          </div>

          <div v-if="experience.solutionEmotions.length > 0" class="tags">
            <h4>Emotions:</h4>

            <ul>
              <li v-for="emotion in experience.solutionEmotions" :key="emotion">
                <tag :title="emotion" type="positive" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <router-link
      :to="{ name: 'edit-experience', params: { experienceId: experience.id } }"
      class="pure-button"
    >
      Edit
    </router-link>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

import Tag from '@/components/Tag.vue'
import { Experience } from '@/store/experiences/types'

export default Vue.extend({
  name: 'Experience',

  components: {
    Tag,
  },

  filters: {
    aspectAsClass: (aspect: string) => {
      switch (Number(aspect)) {
        case 1:
          return 'positive'
        case 0:
          return 'mixed'
        case -1:
          return 'negative'
        default:
          return ''
      }
    },

    aspectInWords: (aspect: string) => {
      switch (Number(aspect)) {
        case 1:
          return 'Positive'
        case 0:
          return 'Mixed'
        case -1:
          return 'Negative'
        default:
          return '(Incorrect value)'
      }
    },
  },

  props: {
    experience: {
      type: Object as PropType<Experience>,
      required: true,
    },
  },
})
</script>

<style lang="scss" scoped>
@import 'src/constants';

.experience {
  width: 40rem;
  border: 1px solid #acacac;
  box-sizing: border-box;
  border-radius: 0.5rem;
  padding: 1.5rem;

  @media only screen and (max-width: $small-screen) {
    width: 100%;
  }

  .story {
    font-family: 'Martel', serif;
    font-size: 85%;
    font-weight: 600;
    margin: 1.5em 0.5em;
  }

  .tags {
    margin: 0.2em 0;
  }

  hr {
    margin: 1.3em 2em 1.1em 2em;
  }

  ul {
    list-style: none;
    display: inline;
    margin: 0;
    padding: 0;
    font-size: 0.9em;

    li {
      display: inline-block;
    }
  }

  h2 {
    font-size: 1.2em;
    margin: 0;
    font-weight: bolder;
  }

  h3 {
    font-size: 1em;
    margin: 0.3em 0;
  }

  h4 {
    display: inline;
    font-size: 0.9em;
    margin-right: 0.5em;
  }

  h5 {
    margin: 0.3em 0 1.5em 0;
  }
}
</style>
