<template>
  <table class="header_patient_description_right_content">
    <tr>
      <td width="32%"><b>Dokter</b></td>
      <td width="2%" align="center">:</td>
      <td width="65%">{{dokter}}</td>
    </tr>
    <tr>
      <td><b>Tgl Periksa</b></td>
      <td align="center">:</td>
      <td>{{waktu_periksa}}</td>
    </tr>
    <tr>
      <td><b>Tgl Selesai</b></td>
      <td align="center">:</td>
      <td>{{waktu_selesai_periksa}}</td>
    </tr>
    <tr>
      <td><b>Alamat</b></td>
      <td align="center">:</td>
      <td class="alamat">{{formatedPrint(alamat)}}</td>
    </tr>
  </table>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("Components/PasienDetail", {
      no_lab: state => state.no_lab,
      no_rm: state => state.no_rm,
      ruang_kelas: state => state.ruang_kelas,
      no_registrasi: state => state.no_registrasi,
      waktu_periksa: state => state.waktu_periksa,
      waktu_selesai_periksa: state => state.waktu_selesai_periksa,
      dokter: state => state.dokter,
      alamat: state => state.alamat,
      diagnosa_awal : state => state.diagnosa_awal
    })
  },
  methods: {
    formatedPrint: function (val) {
      var str = val
      var res = str.substr(0, 126)
      return res
    }
  }
};
</script>


<style scoped>
td {
  height: fit-content;
  margin: 0;
  padding: .5mm 0;
  font-size: 3.7mm;
  /* font-weight: bold; */
  vertical-align:top;
}
.header_patient_description_right_content {
  border-spacing: 0;
  /* width: 85mm; */
  border-width: 0mm;
  margin: 0;
  padding: 0;
  border: none;
  vertical-align: top;
}
.alamat{
  word-break: break-all;
  text-overflow: clip;
  vertical-align:top;
}
</style>