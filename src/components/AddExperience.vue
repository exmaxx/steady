<template>
  <div class="add-experience">
    <button
      v-if="!showForm"
      class="pure-button pure-button-primary"
      @click="showForm = true"
    >
      <i class="fas fa-plus"></i>
    </button>

    <form v-if="showForm" class="pure-form pure-form-aligned">
      <fieldset>
        <legend>Co se stalo?</legend>

        <div class="pure-control-group">
          <label for="date"> Datum </label>

          <input id="date" type="date" />
        </div>

        <div class="pure-control-group">
          <label :for="'exp-activities'">Aktivita?</label>

          <v-select
            class="pure-input-2-3"
            input-id="exp-activities"
            taggable
            multiple
            push-tags
            :options="activities"
          />
        </div>

        <div class="pure-control-group">
          <label :for="'exp-emotions'">Pocity / emoce?</label>

          <v-select
            class="pure-input-2-3"
            input-id="exp-emotions"
            taggable
            multiple
            push-tags
            :options="emotions"
          />
        </div>

        <div class="pure-control-group">
          <label for="exp-story">Podrobnejsi popis</label>

          <textarea
            id="exp-story"
            v-model="form.story"
            class="pure-input-2-3"
            placeholder="popis situaci"
          ></textarea>
        </div>
      </fieldset>

      <fieldset>
        <legend>Co ti pomohlo</legend>

        <div class="pure-control-group">
          <label :for="'solution-activity'">Aktivita?</label>

          <v-select
            class="pure-input-2-3"
            input-id="solution-activity"
            taggable
            multiple
            push-tags
            :options="activities"
          />
        </div>

        <div class="pure-control-group">
          <label :for="'solution-emotions'">Pocity / emoce?</label>

          <v-select
            class="pure-input-2-3"
            input-id="solution-emotions"
            taggable
            multiple
            push-tags
            :options="emotions"
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

      <button class="pure-button pure-button-primary" @click.prevent="submit">
        Pridej
      </button>
      <button class="pure-button" @click.prevent="showForm = false">
        Zavri
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapMutations } from 'vuex'

import { fetchActivities, fetchEmotions } from '@/lib/api/firebase'
import { Experience } from '@/store/experiences/types'

export default Vue.extend({
  name: 'AddExperience',

  data() {
    return {
      showForm: false,
      form: {
        datetime: '',
        story: '',
        solution: '',
      } as Experience,
    }
  },

  computed: {
    activities() {
      return fetchActivities()
    },

    emotions() {
      return fetchEmotions()
    },
  },

  methods: {
    ...mapMutations(['addExperience']),

    submit() {
      this.showForm = false
      this.addExperience(this.form)
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
</style>
