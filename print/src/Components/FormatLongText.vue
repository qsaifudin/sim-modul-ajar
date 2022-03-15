<template>
    <div>
      <!-- 7mm -->
      <!-- <KategoriPemeriksaan
        class="padding-block pemeriksaan-list"
        v-if="node_detail.type==='kategori'"
        :nama="node_detail.nama"
      /> -->
      <!-- 7mm -->
      <!-- <SubKategoriPemeriksaan
        class="padding-block"
        v-else-if="node_detail.type==='sub_kategori'&&node_detail.nama!==' '"
        :nama="node_detail.nama"
      /> -->
        <table class="header">
            <tr>
                <td class="row_nama_pemeriksaan"><span class="set-nama-p">{{nama}}</span></td>
                <td class="row_hasil_pemeriksaan" align="left"><span v-html="hasil"></span></td>
            </tr>
        </table> 
    </div>
</template>

<script>
// import Header from "./Header";
// import HeaderPatientDescription from "./HeaderPatientDescription";
// import PatientDescription from "./PatientDescription";
// import HeaderDetailPemeriksaanLongText from "./HeaderDetailPemeriksaanLongText";
// import KategoriPemeriksaan from "./KategoriPemeriksaan";
// import SubKategoriPemeriksaan from "./SubKategoriPemeriksaan";
export default {
  components: {
    // BlankMarginTop,
    // Header,
    // HeaderPatientDescription,
    // PatientDescription,
    // HeaderDetailPemeriksaanLongText,
    // DetailPemeriksaan,
    // KategoriPemeriksaan,
    // SubKategoriPemeriksaan,
    // FormatLongText
  },
  props: ["nama", "hasil", "nilai_rujukan", "satuan", "metode", "flagKode", "flagWarna", "loopIndex"],
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
  padding-left: 5mm;
  width: 62mm;
}
.row_hasil_pemeriksaan {
  /* background-color: green; */
  padding-left: 5mm;
  /* width: 23mm; */
  /* width: 76mm; */
}
.row_nilai_rujukan {
  /* background-color: white; */
  width: 33mm;
}
.row_satuan {
  /* background-color: white; */
  width: 20mm;
}
.even{
  background-color: white;
}
.odd{
  background-color: #ececec !important;
    -webkit-print-color-adjust: exact;
}
.padding-block{
  padding: 0 5mm;
  margin-left: 0mm;
}
.patien-description-block{
  padding: 0 2mm 0 5mm;
  margin-left: 0mm;
}
.padding-block.detail-pemeriksaan{
  padding: .5mm 0 .5mm 5mm;
  margin-left: 0mm;
}
</style>