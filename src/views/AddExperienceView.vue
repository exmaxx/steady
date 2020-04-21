<template>
  <div class="add-experience flex-centered-column">
    <form class="pure-form pure-form-stacked" @submit.prevent="submit">
      <fieldset>
        <div class="pure-control-group">
          <label>
            Date and time
            <span style="display: block">
              <input
                id="date"
                v-model="$v.date.$model"
                style="display:inline-block"
                type="date"
                required
              />
              <input
                id="time"
                v-model="$v.time.$model"
                style="display:inline-block"
                type="time"
                required
              />
            </span>
          </label>

          <div
            v-if="$v.date.$error || $v.time.$error"
            class="pure-form-message error"
          >
            These fields are required.
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend><strong>Trouble</strong></legend>

        <div class="pure-control-group">
          <label :for="'situation-activities'">Activities?</label>

          <v-select
            v-model="situationActivities"
            class="pure-input-3-4"
            input-id="situation-activities"
            taggable
            multiple
            push-tags
            :options="activities"
            @option:created="createActivity($event)"
          />
        </div>

        <div class="pure-control-group">
          <label :for="'situation-emotions'">Feelings / emotions?</label>

          <v-select
            v-model="situationEmotions"
            class="pure-input-3-4"
            input-id="situation-emotions"
            taggable
            multiple
            push-tags
            :options="emotions"
            @option:created="createEmotion($event)"
          />
        </div>

        <div class="pure-control-group">
          <label for="situation">Details</label>

          <textarea
            id="situation"
            v-model="situationStory"
            rows="5"
            class="pure-input-1"
            placeholder="Describe the situation..."
          ></textarea>
        </div>
      </fieldset>

      <fieldset>
        <legend><strong>What helped you to overcome trouble?</strong></legend>

        <div class="pure-control-group">
          <label :for="'solution-activity'">Activities?</label>

          <v-select
            v-model="solutionActivities"
            class="pure-input-3-4"
            input-id="solution-activity"
            taggable
            multiple
            push-tags
            :options="activities"
            @option:created="createActivity($event)"
          />
        </div>

        <div class="pure-control-group">
          <label :for="'solution-emotions'">Feelings / emotions?</label>

          <v-select
            v-model="solutionEmotions"
            class="pure-input-3-4"
            input-id="solution-emotions"
            taggable
            multiple
            push-tags
            :options="emotions"
            @option:created="createEmotion($event)"
          />
        </div>

        <div class="pure-control-group">
          <label for="solution">Details</label>

          <textarea
            id="solution"
            v-model="solutionStory"
            rows="5"
            class="pure-input-1"
            placeholder="Describe the solution..."
          ></textarea>
        </div>
      </fieldset>

      <fieldset>
        <legend><strong>End the thread</strong></legend>

        <div class="pure-control-group">
          <label>
            <input v-model="shouldEndThread" type="checkbox" />
            I want to end the thread
          </label>
        </div>
      </fieldset>

      <button class="pure-button pure-button-primary" type="submit">
        Add
      </button>

      <router-link class="pure-button" :to="{ name: 'home' }">
        Go back
      </router-link>
    </form>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import Vue from 'vue'
import { required } from 'vuelidate/lib/validators'
import { mapActions, mapMutations, mapState } from 'vuex'

import { Tag } from '@/store/types'

export default Vue.extend({
  name: 'AddExperience',

  data() {
    return {
      date: dayjs().format('YYYY-MM-DD'),
      time: dayjs().format('HH:mm'),

      situationStory: '',
      situationActivities: [] as Tag[],
      situationEmotions: [] as Tag[],
      situationGroupValid: null as boolean | null,

      solutionStory: '',
      solutionActivities: [] as Tag[],
      solutionEmotions: [] as Tag[],
      solutionGroupValid: null as boolean | null,

      shouldEndThread: false,
    }
  },

  computed: {
    ...mapState(['emotions', 'activities']),
  },

  methods: {
    ...mapMutations(['addExperience']),
    ...mapActions([
      'createEmotion',
      'createActivity',
      'createExperience',
      'endActiveThread',
    ]),

    submit() {
      const {
        situationActivities,
        solutionStory,
        situationStory,
        situationEmotions,
        date,
        time,
        solutionActivities,
        solutionEmotions,
      } = this

      this.situationGroupValid = !(
        situationActivities.length === 0 &&
        situationEmotions.length === 0 &&
        situationStory === ''
      )

      this.solutionGroupValid = !(
        solutionActivities.length === 0 &&
        solutionEmotions.length === 0 &&
        solutionStory === ''
      )

      if (
        date &&
        time &&
        (this.situationGroupValid || this.solutionGroupValid)
      ) {
        this.createExperience({
          datetime: dayjs(`${this.date} ${this.time}`).toISOString(),
          solutionStory,
          solutionActivities,
          solutionEmotions,
          situationStory,
          situationActivities,
          situationEmotions,
        })

        if (this.shouldEndThread) {
          this.endActiveThread()
        }

        this.$router.push({ name: 'home' })
      }
    },
  },

  validations: {
    date: {
      required,
    },
    time: {
      required,
    },
  },
})
</script>

<style lang="scss" scoped>
.add-experience {
  padding-bottom: 2rem;

  .pure-form {
    width: 40rem;
  }

  .v-select {
    display: inline-block;
  }

  .error {
    color: red;
  }

  button[type='submit'] {
    margin-right: 0.5rem;
  }
}
</style>
