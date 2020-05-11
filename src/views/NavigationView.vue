<template>
  <navigation :habits="habitsSortedByName" @logout-click="attemptLogout" />
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'

import Navigation from '@/components/Navigation.vue'

export default Vue.extend({
  name: 'NavigationView',

  components: {
    Navigation,
  },

  computed: {
    ...mapGetters(['habitsSortedByName']),
  },

  methods: {
    ...mapActions(['attemptLogout']),
  },
})
</script>
