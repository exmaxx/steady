<template>
  <div class="add-experience">
    <form class="pure-form pure-form-aligned">
      <fieldset>
        <legend>Co se stalo?</legend>

        <div class="pure-control-group">
          <label for="date"> Datum </label>

          <input id="date" v-model="form.datetime" type="date" />
        </div>

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

      <button class="pure-button pure-button-primary" @click.prevent="submit">
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

import { Experience } from '@/store/experiences/types'

export default Vue.extend({
  name: 'AddExperience',

  data() {
    return {
      form: {} as Experience,
    }
  },

  computed: {
    ...mapState(['emotions', 'activities']),
  },

  methods: {
    ...mapMutations(['addExperience']),
    ...mapActions(['createEmotion', 'createActivity', 'createExperience']),

    submit() {
      this.createExperience(this.form)
      this.$router.push({ name: 'experiences' })
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
