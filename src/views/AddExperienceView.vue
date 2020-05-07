<template>
  <plain-layout>
    <div class="add-experience">
      <form class="pure-form pure-form-stacked" @submit.prevent="submit">
        <fieldset>
          <div class="pure-control-group">
            <label>
              <strong>Date and time</strong>
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
          <legend><strong>Reaction</strong></legend>

          <div class="pure-control-group">
            <div>
              <input
                id="positive"
                v-model="form.solutionAspect"
                type="radio"
                value="1"
              />
              <label for="positive" class="pure-radio positive">Positive</label>
              <span class="pure-form-message-inline">
                (reaction strengthened the habit)
              </span>
            </div>

            <div>
              <input
                id="neutral"
                v-model="form.solutionAspect"
                type="radio"
                value="0"
              />
              <label for="neutral" class="pure-radio mixed">Mixed</label>
              <span class="pure-form-message-inline">
                (partial helped, partially didn't)
              </span>
            </div>

            <div>
              <input
                id="negative"
                v-model="form.solutionAspect"
                type="radio"
                value="-1"
              />
              <label for="negative" class="pure-radio negative">Negative</label>
              <span class="pure-form-message-inline">
                (reaction was against the habit / it supported retraction to bad
                habit)
              </span>
            </div>
          </div>

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

        <button class="pure-button" @click="$router.back()">
          Go back
        </button>
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
import { Habit } from '@/store/habits/types'
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
        return getters.findExperienceById(this.$route.params.experienceId)
      },
    }),

    ...mapState({
      habit(state: RootState, getters): Habit | null {
        return getters.findHabitById(this.$route.params.habitId)
      },

      activities(state: RootState): Tag[] {
        return state.activities.size > 0 ? [...state.activities] : []
      },

      emotions(state: RootState): Tag[] {
        return state.emotions.size > 0 ? [...state.emotions] : []
      },
    }),

    isUpdating(): boolean {
      return !!this.$route.params.experienceId
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

  // TODO: Change to beforeCreated?
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
      'overwriteHabit',
    ]),

    isSituationGroupValid(): boolean {
      const {
        situationStory,
        situationActivities,
        situationEmotions,
      } = this.form

      return !(
        situationActivities.length === 0 &&
        situationEmotions.length === 0 &&
        situationStory === ''
      )
    },

    isSolutionGroupValid(): boolean {
      const { solutionStory, solutionActivities, solutionEmotions } = this.form

      return !(
        solutionActivities.length === 0 &&
        solutionEmotions.length === 0 &&
        solutionStory === ''
      )
    },

    submit() {
      const { date, time, form, habit } = this
      const newExperience: Experience = form

      if (
        date &&
        time &&
        (this.isSituationGroupValid() || this.isSolutionGroupValid())
      ) {
        if (!habit) {
          console.error('The habit was not found!')
          return
        }

        const setExperience = this.isUpdating
          ? this.overwriteExperience
          : this.createExperience

        setExperience(newExperience).then((id) => {
          // TODO: Maybe this all should happen is store.
          const newIds = habit.experienceIds.includes(id)
            ? habit.experienceIds
            : [...habit.experienceIds, id]

          const updatedHabit: Habit = {
            ...habit,
            experienceIds: newIds,
          }

          this.overwriteHabit(updatedHabit)
        })

        this.$router.push({
          name: 'habit',
          params: { habitId: this.$route.params.habitId },
        })
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

    .pure-radio {
      display: inline;
      margin: 0.5rem;
      vertical-align: middle;
    }

    .pure-control-group {
      margin-top: 1rem;
    }

    .v-select {
      display: inline-block;
    }

    .error {
      color: red;
    }

    legend {
      font-size: 125%;
    }

    button {
      margin: 0;
    }

    button + button {
      margin-left: $default-margin;
    }
  }
}
</style>
