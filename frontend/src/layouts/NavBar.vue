<template>
  <v-app>
    <v-navigation-drawer v-model="sidebar" app>
      <v-list>
        <v-list-tile v-for="item in menuItems" :key="item.title" :to="item.path">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="primary" class="px-3" fixed dark>
      <span class="hidden-sm-and-up">
        <div @click="sidebar = !sidebar">dd</div>
      </span>

      <v-row>
        <v-col>
          <v-toolbar-title>
            <router-link to="/" class="d-flex align-center text-decoration-none" tag="span" style="cursor: pointer">
              <v-img
                contain
                eager
                class="app-logo me-3"
                :src="require('@/assets/images/logos/logo-book.png')"
                max-width="45px"
              ></v-img>
              <v-divider vertical class="white"></v-divider>
              <!-- <div class="d-flex flex-column pl-2 white--text logo-text">
                <div class="font-weight-light subtitle-1 d-inline-block">SI Modul Ajar</div>
                <div class="d-inline-block">
                  <small class="font-weight-light caption">Politeknik Elektronika Negeri Surabaya 22</small>
                </div>
              </div> -->
              <div class="ml-2">
                <v-card-title class="pt-0 px-0"> SI Modul Ajar </v-card-title>
                <v-card-subtitle class="text-xs pa-0">Politeknik Elektronika Negeri Surabaya </v-card-subtitle>
              </div>
            </router-link>
          </v-toolbar-title>
        </v-col>
        <v-col align-self="center">
          <v-toolbar-items class="hidden-xs-only">
            <v-btn color="transparent" v-for="item in menuItems" :key="item.title" :to="item.path">
              {{ item.title }}
            </v-btn>
          </v-toolbar-items>
        </v-col>
        <v-col align-self="center" justify="end" class="text-right"> <app-bar-user-menu></app-bar-user-menu> </v-col>
      </v-row>
    </v-app-bar>

    <v-main>
      <div class="pa-6 mt-12">
        <router-view></router-view>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import AppBarUserMenu from './components/AppBarUserMenu.vue'
import { mdiMagnify, mdiBellOutline, mdiGithub } from '@mdi/js'
export default {
  name: 'App',
  components: {
    AppBarUserMenu,
  },
  setup() {
    return {
      icons: {
        mdiMagnify,
        mdiBellOutline,
        mdiGithub,
      },
    }
  },
  data() {
    return {
      appTitle: 'Awesome App',
      sidebar: false,
      menuItems: [
        { title: 'Modul Ajar', path: '/home', icon: 'home' },
        { title: 'Riwaya Pendanaan', path: '/signup', icon: 'face' },
        { title: 'Daftar Dosen', path: '/signin', icon: 'lock_open' },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.logo-text {
  line-height: 0.1 !important;
}
</style>
