<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <h1>AKAI APC40 to OSC configurator</h1>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>
    <v-navigation-drawer
      absolute
      permanent
      right
      width="350"
    >
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/women/81.jpg">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Jane Smith</v-list-item-title>
            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
      <Config />
    </v-navigation-drawer>
    <v-content>
      <APC40 />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import APC40 from './views/APC40.vue'
import Config from './views/Config.vue'

export default Vue.extend({
  name: 'App',

  components: {
    APC40,
    Config
  },

  data: () => ({
    //
  })
})
</script>
