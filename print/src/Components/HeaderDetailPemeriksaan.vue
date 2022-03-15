<template>
  <table class="header">
    <tr>
      <td style="width: 52mm;">Pemeriksaan</td>
      <td style="width: 45mm;" align="center">Hasil</td>
      <td style="width: 43mm;" align="center">Nilai Rujukan</td>
      <td style="width: 25mm;" align="center">Satuan</td>
      <td style="width: 25mm;" align="center">Metode</td>
      <td style="width: 20mm;" align="center">Ket</td>
    </tr>
  </table>
</template>

<script>
export default {};
</script>

<style scoped>
.header {
  border-spacing: 0;
  width: 210mm;
  height: 7mm;
  background-color: white;
  border-top: black;
  border-top-width: 0.3mm;
  border-top-style: groove;
  text-align: left;

  border-bottom: black;
  border-bottom-width: 0.3mm;
  border-bottom-style: groove;
}
td {
  font-size: 4mm;
}
</style>