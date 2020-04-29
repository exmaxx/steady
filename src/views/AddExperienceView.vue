<template>
  <plain-layout>
    <div class="add-experience">
      <form class="pure-form pure-form-stacked" @submit.prevent="submit">
        <fieldset>
          <div class="pure-control-group">
            <label>
              Date and time
              <span style="display: block;">
                <input
                  id="date"
                  v-model="$v.date.$model"
                  style="display: inline-block;"
                  type="date"
                  required
                />
                <input
                  id="time"
                  v-model="$v.time.$model"
                  style="display: inline-block;"
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
              v-model="form.situationActivities"
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
              v-model="form.situationEmotions"
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
              v-model="form.situationStory"
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
              v-model="form.solutionActivities"
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
              v-model="form.solutionEmotions"
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
              v-model="form.solutionStory"
              rows="5"
              class="pure-input-1"
              placeholder="Describe the solution..."
            ></textarea>
          </div>
        </fieldset>

        <button class="pure-button pure-button-primary" type="submit">
          <span v-if="isUpdating">Update</span>
          <span v-else>Add</span>
        </button>

        <router-link class="pure-button" :to="{ name: 'home' }">
          Go back
        </router-link>
      </form>
    </div>
  </plain-layout></template
>

<script lang="ts">
import dayjs from 'dayjs'
import Vue from 'vue'
import { required } from 'vuelidate/lib/validators'
import { mapActions, mapState } from 'vuex'

import { createEmptyExperience } from '@/lib/helpers'
import { Experience } from '@/store/experiences/types'
import { RootState, Tag } from '@/store/types'

export default Vue.extend({
  name: 'AddExperience',

  data() {
    return {
      date: dayjs().format('YYYY-MM-DD'),
      time: dayjs().format('HH:mm'),

      form: createEmptyExperience() as Experience,
    }
  },

  computed: {
    ...mapState({
      experience(state: RootState, getters): Experience | null {
        return getters.findExperienceById(this.$route.params.id)
      },

      activities(state: RootState): Tag[] {
        return state.activities.size > 0 ? [...state.activities] : []
      },

      emotions(state: RootState): Tag[] {
        return state.emotions.size > 0 ? [...state.emotions] : []
      },
    }),

    isUpdating(): boolean {
      return !!this.$route.params.id
    },
  },

  watch: {
    date(newDate) {
      this.form.datetime = dayjs(`${newDate} ${this.time}`).toISOString()
    },
    time(newTime) {
      this.form.datetime = dayjs(`${this.date} ${newTime}`).toISOString()
    },

    // TODO: Use this in case you load experience with delay
    //  (e.g. after refresh without Fetcher waiting before showing the content)
    // experience(val) {
    //   this.form = { ...val }
    //
    //   if (val.datetime) {
    //     const datetime = dayjs(val.datetime)
    //
    //     this.date = datetime.format('YYYY-MM-DD')
    //     this.time = datetime.format('HH:mm')
    //   } else {
    //     this.date = dayjs().format('YYYY-MM-DD')
    //     this.time = dayjs().format('HH:mm')
    //   }
    // },
  },

  created() {
    this.form = this.experience
      ? { ...this.experience }
      : createEmptyExperience()

    const datetime = dayjs(this.form.datetime)

    this.date = datetime.format('YYYY-MM-DD')
    this.time = datetime.format('HH:mm')
  },

  methods: {
    ...mapActions([
      'createEmotion',
      'createActivity',
      'createExperience',
      'overwriteExperience',
    ]),

    submit() {
      const { date, time, form } = this
      const {
        situationStory,
        situationActivities,
        situationEmotions,
        solutionStory,
        solutionActivities,
        solutionEmotions,
      } = form

      const situationGroupValid = !(
        situationActivities.length === 0 &&
        situationEmotions.length === 0 &&
        situationStory === ''
      )

      const solutionGroupValid = !(
        solutionActivities.length === 0 &&
        solutionEmotions.length === 0 &&
        solutionStory === ''
      )

      if (date && time && (situationGroupValid || solutionGroupValid)) {
        this.isUpdating
          ? this.overwriteExperience(form)
          : this.createExperience(form)

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
@import 'src/constants';
@import 'src/mixins';

.add-experience {
  @include flex-centered-column;

  padding-bottom: 2rem;

  input + input {
    margin-left: $default-margin;
  }

  .pure-form {
    width: 35rem;

    @media only screen and (max-width: $small-screen) {
      width: auto;
      max-width: 40rem;
    }

    button {
      margin: 0;
    }
  }

  .v-select {
    display: inline-block;
  }

  .error {
    color: red;
  }

  button + a {
    margin-left: $default-margin;
  }
}
</style>
