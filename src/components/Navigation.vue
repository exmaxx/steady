<template>
  <div>
    <nav id="menu" :class="['pure-menu', { active: isMenuVisible }]">
      <ul class="pure-menu-list">
        <li
          v-for="habit in sortedHabitsByName"
          :key="habit.id"
          class="pure-menu-item"
        >
          <router-link
            :to="{ name: 'habits', params: { id: habit.id } }"
            class="pure-menu-link"
          >
            {{ habit.name }}
          </router-link>
        </li>

        <li class="pure-menu-item">
          <router-link :to="{ name: 'habits-add' }" class="pure-menu-link">
            <i class="fas fa-plus"></i>
            Add Habit
          </router-link>
        </li>

        <li class="pure-menu-separator"></li>

        <li class="pure-menu-item">
          <router-link :to="{ name: 'home' }" class="pure-menu-link">
            Home
          </router-link>
        </li>

        <li class="pure-menu-item">
          <router-link :to="{ name: 'activities' }" class="pure-menu-link">
            Activities
          </router-link>
        </li>

        <li class="pure-menu-item">
          <router-link :to="{ name: 'emotions' }" class="pure-menu-link">
            Emotions
          </router-link>
        </li>

        <li class="pure-menu-separator"></li>

        <li class="pure-menu-item">
          <a href="#" class="pure-menu-link" @click.prevent="attemptLogout"
            >Logout</a
          >
        </li>
      </ul>
    </nav>

    <button
      id="menu-button"
      class="menu-button pure-button pure-button-primary"
      @click="isMenuVisible = !isMenuVisible"
    >
      <span v-if="isMenuVisible">X</span>
      <span v-else>Menu</span>
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'

export default Vue.extend({
  name: 'Navigation',

  data() {
    return {
      isMenuVisible: false,
    }
  },

  computed: {
    ...mapGetters(['sortedHabitsByName']),
  },

  methods: {
    ...mapActions(['attemptLogout']),
  },
})
</script>

<style lang="scss" scoped>
@import 'src/constants';

#menu-button {
  display: none;
}

#menu {
  position: fixed;
  padding: 2rem;

  a {
    font-weight: bold;
    color: #acacac;

    &.router-link-exact-active {
      color: #0078e7;
    }
  }

  ul {
    list-style: none;
  }
}

@media only screen and (max-width: $small-screen) {
  #menu-button {
    display: block;
    position: fixed;
    bottom: 0;
    right: 0;
  }

  #menu {
    display: none;
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: white;

    &.active {
      display: block;
    }
  }
}
</style>
