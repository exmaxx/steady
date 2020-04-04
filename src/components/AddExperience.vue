<template>
  <div class="add-experience">
    <button v-if="!showForm" @click="showForm = true">
      <i class="fas fa-plus"></i>
    </button>

    <form v-if="showForm">
      <h3>Co se stalo?</h3>
      <label>
        Datum
        <input v-model="form.datetime" type="text" placeholder="datum" />
      </label>

      <label>
        Aktivita?
        <v-select taggable multiple push-tags :options="activities" />
      </label>

      <label>
        Pocity / emoce?
        <v-select taggable multiple push-tags :options="emotions" />
      </label>

      <label>
        Podrobnejsi popis
        <textarea v-model="form.story" placeholder="popis situaci"></textarea>
      </label>

      <h3>Co ti pomohlo</h3>

      <label>
        Aktivita?
        <v-select taggable multiple push-tags :options="activities" />
      </label>

      <label>
        Pocity / emoce?
        <v-select taggable multiple push-tags :options="emotions" />
      </label>

      <label>
        Popis
        <textarea v-model="form.solution" placeholder="napis reseni"></textarea>
      </label>

      <button @click.prevent="submit">Pridej</button>
      <button @click.prevent="showForm = false">Zavri</button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapMutations } from 'vuex'

import { Experience } from '@/store/experiences/types'
import {fetchActivities, fetchEmotions} from '@/lib/api/firebase'

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
    }
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

  label {
    display: block;
  }

  textarea {
    width: 100%;
    height: 6rem;
    font-size: 1rem;
  }
}
</style>
