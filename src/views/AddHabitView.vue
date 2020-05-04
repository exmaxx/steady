<template>
  <form class="pure-form pure-form-stacked" @submit.prevent="submit">
    <fieldset>
      <legend><strong>New Habit</strong></legend>

      <div class="pure-control-group">
        <label>Name: <input v-model="name" placeholder="Habit Name" /></label>
      </div>
    </fieldset>

    <button class="pure-button pure-button-primary" type="submit">
      <span>Add</span>
    </button>

    <button class="pure-button" @click="$router.back()">
      Go back
    </button>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'

export default Vue.extend({
  name: 'AddHabitView',
  data() {
    return {
      name: '',
    }
  },

  methods: {
    ...mapActions(['createHabit']),

    submit() {
      this.createHabit({
        name: this.name,
      }).then((habit) =>
        this.$router.push({ name: 'habit', params: { habitId: habit.id } })
      )
    },
  },
})
</script>

<style lang="scss" scoped>
@import 'src/constants';
@import 'src/mixins';

form {
  margin: auto;
  width: 35rem;

  @media only screen and (max-width: $small-screen) {
    width: initial;
    max-width: 40rem;
  }

  input {
    width: 100%;
  }

  button + button {
    margin-left: $default-margin;
  }
}
</style>
