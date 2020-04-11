<template>
  <div class="experiences">
    <router-link
      :to="{ name: 'add-experience' }"
      class="pure-button pure-button-primary"
    >
      <i class="fas fa-plus"></i>
    </router-link>

    <div
      class="experience"
      v-for="experience in experiences"
      :key="experience.date + experience.time"
    >
      <h2>{{ `${experience.date} ${experience.time}` | formatDate }}</h2>

      <h5>
        {{ `${experience.date} ${experience.time}` | asIntervalDate }},
        {{ experience.date | dayInWeek }}
      </h5>

      <!-- TODO: Create Experience class with helper methods (datetime, hasSituation, hasSolution,...) -->
      <!-- TODO: Rename `solution` to `solutionStory` -->

      <div class="content">
        <div
          class="situation"
          v-if="
            experience.situation !== '' ||
              experience.situationActivities.length > 0 ||
              experience.situationEmotions.length > 0
          "
        >
          <h3>Situace</h3>

          <div class="story" v-if="experience.situation !== ''">
            {{ experience.situation }}
          </div>

          <div v-if="experience.situationActivities.length > 0" class="tags">
            <h4>Aktivity:</h4>

            <ul>
              <li
                v-for="activity in experience.situationActivities"
                :key="activity"
              >
                {{ activity }}
              </li>
            </ul>
          </div>

          <div class="tags" v-if="experience.situationEmotions.length > 0">
            <h4>Emoce:</h4>

            <ul>
              <li
                v-for="emotion in experience.situationEmotions"
                :key="emotion"
              >
                {{ emotion }}
              </li>
            </ul>
          </div>
        </div>

        <hr
          v-if="
            experience.solution !== '' ||
              experience.solutionActivities.length > 0 ||
              experience.solutionEmotions.length > 0
          "
        />

        <div
          class="solution"
          v-if="
            experience.solution !== '' ||
              experience.solutionActivities.length > 0 ||
              experience.solutionEmotions.length > 0
          "
        >
          <h3>Řešení</h3>

          <div class="content">
            <div class="story" v-if="experience.solution !== ''">
              {{ experience.solution }}
            </div>

            <div class="tags" v-if="experience.solutionActivities.length > 0">
              <h4>Aktivity:</h4>

              <ul>
                <li
                  v-for="activity in experience.solutionActivities"
                  :key="activity"
                >
                  {{ activity }}
                </li>
              </ul>
            </div>

            <div class="tags" v-if="experience.solutionEmotions.length > 0">
              <h4>Emoce:</h4>

              <ul>
                <li
                  v-for="emotion in experience.solutionEmotions"
                  :key="emotion"
                >
                  {{ emotion }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import dayjs from 'dayjs'

export default Vue.extend({
  name: 'Experiences',
  computed: {
    ...mapState(['experiences']),
  },

  filters: {
    formatDate(datetime: string) {
      // TODO: Show nicer format (needs additonal translations first).
      // return dayjs(datetime).calendar()

      return dayjs(datetime).format('LLL')
    },

    asIntervalDate(datetime: string) {
      return dayjs(datetime).fromNow()
    },

    dayInWeek(date: string) {
      return dayjs(date).format('dddd')
    },
  },
})
</script>

<style lang="scss" scoped>
.experiences {
  display: flex;
  flex-direction: column;
  align-items: center;

  > * {
    margin: 0.5em 0;

    &:first-child {
      margin: 1em 0 0.5em 0;
    }
  }
}

.experience {
  width: 40rem;
  border: 1px solid #acacac;
  box-sizing: border-box;
  border-radius: 0.5rem;
  padding: 1.5rem;
  overflow: hidden;
}

.content {
}

.situation {
}

.solution {
}

.story {
  font-family: 'Martel', serif;
  font-size: 0.85rem;
  font-weight: 600;
  margin: 1.5em 0.5em;
}

.tags {
  margin: 0.4em 0;
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
    margin-right: 0.2em;
    padding: 0.3em 0.5em;
    box-sizing: border-box;
    border-radius: 0.5em;

    .situation & {
      color: white;
      background-color: #ff5e5e;
    }

    .solution & {
      color: white;
      background-color: #77c452;
    }
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
  color: #acacac;
}
</style>
