<template>
  <div class="add-experience">
    <form class="pure-form pure-form-aligned" @submit.prevent="submit">
      <fieldset>
        <legend>Co se stalo?</legend>

        <div class="pure-control-group">
          <label for="date"> Datum </label>

          <input
            id="date"
            v-model="$v.form.datetime.$model"
            type="date"
            required
          />

          <div class="errors">
            <div
              :style="{
                visibility: $v.form.datetime.$error ? 'visible' : 'hidden',
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
            v-model="form.situationActivities"
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
            v-model="form.situationEmotions"
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
            v-model="form.situation"
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
            v-model="form.solutionActivities"
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
            v-model="form.solutionEmotions"
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
            v-model="form.solution"
            class="pure-input-2-3"
            placeholder="napis reseni"
          ></textarea>
        </div>
      </fieldset>

      <button class="pure-button pure-button-primary" type="submit">
        Pridej
      </button>

      <router-link class="pure-button" :to="{ name: 'experiences' }">
        Zpet
      </router-link>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapMutations, mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'

import { Experience } from '@/store/experiences/types'
import { emptyExperience } from '@/lib/helpers'

export default Vue.extend({
  name: 'AddExperience',

  data() {
    return {
      form: {
        ...emptyExperience,
        datetime: '2020-01-01',
      } as Experience,
      situationGroupValid: null as boolean | null,
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
        solution,
        situation,
        situationEmotions,
        datetime,
        solutionActivities,
        solutionEmotions,
      } = this.form

      this.situationGroupValid = !(
        situationActivities.length === 0 &&
        situationEmotions.length === 0 &&
        situation === ''
      )

      this.solutionGroupValid = !(
        solutionActivities.length === 0 &&
        solutionEmotions.length === 0 &&
        solution === ''
      )

      if (datetime && (this.situationGroupValid || this.solutionGroupValid)) {
        this.createExperience(this.form)
        this.$router.push({ name: 'experiences' })
      }
    },
  },

  validations: {
    form: {
      datetime: {
        required,
      },
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
