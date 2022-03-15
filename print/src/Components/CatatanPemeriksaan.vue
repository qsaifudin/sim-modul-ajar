<template>
  <table class="header">
    <p style="font-size: 10pt;margin-bottom:0;"><span style="color:red;">(*)</span> Pemeriksaan Duplo</p>
    <!-- <tr style="text-align: left;">
      <td>L : Low</td>
      <td>H : High</td>
      <td>K : Kritis</td>
      <td>TN : Tidak Normal</td>
    </tr> -->
    <tr>
      <td>
        <span class="catatan_pemeriksaan_text">Catatan :</span>
        <span v-html="catatan_hasil"></span>
      </td>
    </tr>
  </table>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("Components/PasienDetail", {
      catatan_hasil : state => state.catatan_hasil
    })
  }
};
</script>

<style scoped>
.header {
  border-spacing: 0;
  width: 210mm;
  height: 25mm;
  background-color: white;
  text-align: left;
}
td {
  font-size: 4mm;
  vertical-align: middle;
}
.catatan_pemeriksaan_text {
  font-size: 4mm;
  font-weight: bold;
  padding-right:5mm
}
</style>