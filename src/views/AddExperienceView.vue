<template>
  <div class="add-experience">
    <form class="pure-form pure-form-aligned" @submit.prevent="submit">
      <fieldset>
        <legend>Datum a čas</legend>

        <div class="pure-control-group">
          <label for="date">Datum</label>

          <input id="date" v-model="$v.date.$model" type="date" required />

          <div class="errors">
            <div
              :style="{
                visibility: $v.date.$error ? 'visible' : 'hidden',
              }"
              class="error "
            >
              This field is required.
            </div>
          </div>

          <label for="time">Datum</label>

          <input id="time" v-model="$v.time.$model" type="time" required />

          <div class="errors">
            <div
              :style="{
                visibility: $v.time.$error ? 'visible' : 'hidden',
              }"
              class="error "
            >
              This field is required.
            </div>
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend>Co se stalo?</legend>

        <div class="pure-control-group">
          <label :for="'situation-activities'">Aktivita?</label>

          <v-select
            v-model="situationActivities"
            class="pure-input-2-3"
            input-id="situation-activities"
            taggable
            multiple
            push-tags
            :options="activities"
            @option:created="createActivity($event)"
          />
        </div>

        <div class="pure-control-group">
          <label :for="'situation-emotions'">Pocity / emoce?</label>

          <v-select
            v-model="situationEmotions"
            class="pure-input-2-3"
            input-id="situation-emotions"
            taggable
            multiple
            push-tags
            :options="emotions"
            @option:created="createEmotion($event)"
          />
        </div>

        <div class="pure-control-group">
          <label for="situation">Podrobnejsi popis</label>

          <textarea
            id="situation"
            v-model="situationStory"
            class="pure-input-2-3"
            placeholder="popis situaci"
          ></textarea>
        </div>
      </fieldset>

      <fieldset>
        <legend>Co ti pomohlo?</legend>

        <div class="pure-control-group">
          <label :for="'solution-activity'">Aktivita?</label>

          <v-select
            v-model="solutionActivities"
            class="pure-input-2-3"
            input-id="solution-activity"
            taggable
            multiple
            push-tags
            :options="activities"
            @option:created="createActivity($event)"
          />
        </div>

        <div class="pure-control-group">
          <label :for="'solution-emotions'">Pocity / emoce?</label>

          <v-select
            v-model="solutionEmotions"
            class="pure-input-2-3"
            input-id="solution-emotions"
            taggable
            multiple
            push-tags
            :options="emotions"
            @option:created="createEmotion($event)"
          />
        </div>

        <div class="pure-control-group">
          <label for="solution">Popis</label>

          <textarea
            id="solution"
            v-model="solutionStory"
            class="pure-input-2-3"
            placeholder="napis reseni"
          ></textarea>
        </div>
      </fieldset>

      <button class="pure-button pure-button-primary" type="submit">
        Přidej
      </button>

      <router-link class="pure-button" :to="{ name: 'experiences' }">
        Zpět
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
    }
  },

  computed: {
    ...mapState(['emotions', 'activities']),
  },

  methods: {
    ...mapMutations(['addExperience']),
    ...mapActions(['createEmotion', 'createActivity', 'createExperience']),

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

        this.$router.push({ name: 'experiences' })
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
  max-width: 40rem;

  .v-select {
    display: inline-block;
  }
}

.pure-form-aligned {
  .errors {
    margin-left: 11em;

    .error {
      color: red;
      font-size: 0.875em;
    }
  }
}
</style>
