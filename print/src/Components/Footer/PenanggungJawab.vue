<template>
  <table class="header_patient_description_left_content">
    <tr>
      <td>Dokter Penanggung Jawab</td>
    </tr>
    <tr class="spasi_ttd">
      <td>
        <!-- <img src="@/assets/Lestari.png" /> -->
      </td>
    </tr>
    <tr>
      <td>dr. Diyan Wahyu Kurniasari, Sp.PK</td>
    </tr>
  </table>
</template>

<script>
import moment from "moment"
export default {
  methods : {
    tglSekarang: function () {
      return moment(new Date()).format('DD/MM/YYYY - HH:mm')
    },
  }
};
</script>

<style scoped>
.header_patient_description_left_content {
  border-spacing: 0;
  width: fit-content;
  border-width: 0mm;
  margin: 0;
  padding: 0;
  border: none;
  vertical-align: top;
  text-align:center;
}
td {
  height: fit-content;
  margin: 0;
  padding: 0;
  font-size: 3.6mm;
  font-weight: bold;
}
.spasi_ttd {
  height: 20mm;
}
.spasi_ttd img{
  margin-top: 2mm;
  height: 23mm;
  width: auto;
}
.date_print {
  margin: 0;
  padding: 0;
  font-size: 2.5mm;
}
</style>