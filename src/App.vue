<template>
  <v-app id="inspire">
    <v-app-bar
      app
      color="white"
      flat
    >
      <v-container class="py-0 fill-height">
        <v-avatar
          class="mr-10"
          color="grey darken-1"
          size="32"
        ></v-avatar>

        <v-btn
          v-for="link in links"
          :key="link"
          text
        >
          {{ link }}
        </v-btn>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg">
              <v-list color="transparent">
                <v-list-item
                  link
                  @click="simulateDriverA"
                >
                  <v-list-item-content>
                    <v-list-item-title style="color: green">
                      Simulate Scenario
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <v-list-item
                  link
                  color="grey lighten-4"
                >
                  <v-list-item-content>
                    <p>
                      Click "simulate scenario" to play out the scenario from beginning to end. <br /><br />
                      By Brian Mwangi Kabiru
                    </p>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-col>

          <v-col>
            <Home ref="homeRef" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Home from './components/Home.vue'

export default {
  components: {
    Home
  },

  data() {
    return {
      links: [
        'Dashboard',
        'Tracking Page'
      ],
    }
  },

  methods: {
    simulateDriverA() {
      this.$refs.homeRef.simulateDriverA();
    },
  }
}
</script>