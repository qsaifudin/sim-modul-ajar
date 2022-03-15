<template>
  <div>
        <!-- header 33mm -->
        <Header class="padding-block header_document" />
        <!-- 7mm -->
        <HeaderPatientDescription class="padding-block" />
        <!-- 25mm -->
        <!-- <PatientDescription class="padding-block document_patient_description" /> -->
        <PatientDescription class="patien-description-block document_patient_description" />
        <!-- 7mm -->
      <table class="header-pemeriksaan">
        <tr>
          <td style="width: 62mm;">Pemeriksaan</td>
          <td style="width: 5mm;"></td>
          <td align="center">Hasil</td>
          <!-- <td style="width: 33mm;" align="center">Nilai Rujukan</td>
          <td style="width: 20mm;" align="center">Satuan</td>
          <td align="center">Metode</td> -->
        </tr>
  </table>
  </div>
  
</template>

<script>
import Header from "./Header";
import HeaderPatientDescription from "./HeaderPatientDescription";
import PatientDescription from "./PatientDescription";
export default {
  components: {
    // BlankMarginTop,
    Header,
    HeaderPatientDescription,
    PatientDescription
    // HeaderDetailPemeriksaanLongText,
    // DetailPemeriksaan,
    // KategoriPemeriksaan,
    // SubKategoriPemeriksaan,
    // FormatLongText
  },
};
</script>

<style scoped>
.header-pemeriksaan {
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
.header_document {
  /* margin-top: 10mm; */
  margin-top: 0mm;
  page-break-before: always;
}
.document_patient_description {
  margin-top: 1mm;
}
</style>