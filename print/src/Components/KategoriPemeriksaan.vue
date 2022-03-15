<template>
  <table class="header">
    <tr>
      <td>{{nama}}</td>
    </tr>
  </table>
</template>

<script>
export default {
  props: ['nama'],
  data() {
    return {};
  }
};
</script>

<style scoped>
.header {
  border-spacing: 0;
  width: 210mm;
  height: 7mm;
  background-color: white;
  text-align: left;
}
td {
  font-size: 5mm;
  color:#3659b1;
  padding-left:2mm;
  font-weight: bold
}
</style>