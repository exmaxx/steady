<template>
  <form>
    <label>
      Datum
      <input v-model="form.datetime" type="text" placeholder="datum" />
    </label>

    <label>
      Co se stalo?
      <textarea v-model="form.story" placeholder="popis situaci"></textarea>
    </label>

    <label>
      Jak jsi to vyresil?
      <textarea v-model="form.solution" placeholder="napis reseni"></textarea>
    </label>

    <button @click.prevent="addExperience(form)">Pridej</button>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapMutations } from 'vuex'

import { Experience } from '@/store/experiences/types'

export default Vue.extend({
  name: 'AddExperience',

  data() {
    return {
      form: {
        datetime: '',
        story: '',
        solution: '',
      } as Experience,
    }
  },

  methods: {
    ...mapMutations(['addExperience']),
  },
})
</script>

<style lang="scss" scoped>
label {
  display: block;
}
</style>
