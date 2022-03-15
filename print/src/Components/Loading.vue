<template>
  <div
    style="height: 100vh;
    position: absolute;
    margin-top: 0px;
    z-index: 1000;
    background: white;
    width:100%"
    v-if="visible===true"
  >
    <a-progress type="circle" :percent="percent" style="padding-top:40vh;padding-left:41%">
      <template v-slot:format="percent">
        <span>{{percent}} %</span>
      </template>
    </a-progress>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("App/Components/Loading", {
      percent: state => state.percent,
      visible: state => state.visible
    })
  },
};
</script>

<style>
</style>