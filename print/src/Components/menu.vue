<template>
  <div>
    <a-menu v-model="current" mode="horizontal" :theme="config.theme">
      <a-menu-item key="login">
        <router-link to="/Login">Login</router-link>
      </a-menu-item>
      <a-menu-item key="print">
        <router-link to="/Print">Print</router-link>
      </a-menu-item>
      <a-menu-item key="registrasi">Registrasi</a-menu-item>
      <a-menu-item key="detail">Detail</a-menu-item>
      <a-menu-item key="config">
        <router-link to="/ConfigPanel">Config System</router-link>
      </a-menu-item>
      <a-menu-item key="config_print">
        <router-link to="/ConfigPrint">Config Print</router-link>
      </a-menu-item>
    </a-menu>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("Config", {
      theme: state => state.theme,
      config: state => state.config
    })
  },
  data() {
    return {
      current: ["mail"]
    };
  }
};
</script>