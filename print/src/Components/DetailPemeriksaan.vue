<template>
  <table class="header">
    <tr :class="{ even: loopIndex % 2, odd: !(loopIndex % 2) }">
      <td class="row_nama_pemeriksaan">
        <span class="set-nama-p" v-if="duplo === false">{{nama}}</span>
        <span class="set-nama-p" v-if="duplo === true">{{nama}}<span style="color:red"> *</span></span>
      </td>
      <td class="row_hasil_pemeriksaan" align="center" v-bind:style="{color: ''+flagWarna}">{{hasil}}</td>
      <td class="row_nilai_rujukan" align="center">{{nilai_rujukan}}</td>
      <td class="row_satuan" align="center">{{satuan}}</td>
      <td class="row_metode" align="center">{{metode}}</td>
      <td class="row_ket" align="center">
        <span v-if="flagKode==='N'||flagKode==='n'">
          &nbsp;&nbsp;&nbsp;
        </span>
        <span v-else v-bind:style="{color: ''+flagWarna}">
          <b>{{flagKode}}</b>
        </span>
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  props: ["nama", "hasil", "nilai_rujukan", "satuan", "metode", "flagKode", "flagWarna", "loopIndex", "duplo"],
  data() {
    return {};
  }
};
</script>

<style scoped>
.header {
  border-spacing: 0;
  width: 210mm;
  height: 6mm;
  background-color: white;
  text-align: left;
}
td {
  font-size: 4mm;
}
.row_flag{
  width: 5mm;
}
.set-nama-p{
  padding-left: 2mm;
}
.row_nama_pemeriksaan {
  /* background-color: blue; */
  /* padding-left: 5mm; */
  width: 52mm;
}
.row_hasil_pemeriksaan {
  /* background-color: green; */
  width: 45mm;
}
.row_nilai_rujukan {
  /* background-color: salmon; */
  width: 43mm;
}
.row_satuan {
  /* background-color: yellow; */
  width: 25mm;
}
.row_metode {
  /* background-color: red; */
  width: 25mm;
}
.row_ket {
  /* background-color: blue; */
  width: 20mm;
}
.even{
  background-color: white;
}
.odd{
  background-color: #ececec !important;
        -webkit-print-color-adjust: exact;
}
</style>