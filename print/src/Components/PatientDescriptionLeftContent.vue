<template>
  <table class="header_patient_description_left_content">
    <tr>
      <td width="25%"><b>Nama Pasien</b></td>
      <td width="2%" align="center">:</td>
      <td width="73%"><b>{{nama}}</b> / {{jenis_kelamin}}</td>
    </tr>
    <tr>
      <td><b>Tgl Lahir/Umur</b></td>
      <td align="center">:</td>
      <td>
        {{tanggal_lahir}} -
        <span v-if="umur_tahun !== 0">{{ umur_tahun }}Tahun,</span>
        <span v-if="umur_bulan !== 0">{{ umur_bulan }}Bulan,</span>
        <span v-if="umur_hari !== 0">{{ umur_hari }}Hari</span>
      </td>
    </tr>
    <tr>
      <td><b>No. Lab</b></td>
      <td align="center">:</td>
      <td>{{no_lab}}</td>
    </tr>
    <tr>
      <td><b>No. RM</b></td>
      <td align="center">:</td>
      <td>{{no_rm}}</td>
    </tr>    
    <tr>
      <td><b>Diagnosa</b></td>
      <td align="center">:</td>
      <td>{{diagnosa_awal}}</td>
    </tr>
  </table>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("Components/PasienDetail", {
      nama: state => state.nama,
      jenis_kelamin: state => state.jenis_kelamin,
      tanggal_lahir: state => state.tanggal_lahir,
      penjamin: state => state.penjamin,
      no_telphone: state => state.no_telphone,
      alamat: state => state.alamat,
      umur_hari: state => state.umur_hari,
      umur_bulan: state => state.umur_bulan,
      umur_tahun: state => state.umur_tahun,
      dokter: state => state.dokter,
      no_lab: state => state.no_lab,
      no_rm: state => state.no_rm,
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
.header_patient_description_left_content {
  border-spacing: 0;
  /* width: 95mm; */
  border-width: 0mm;
  margin: 0;
  padding: 0;
  border: none;
  vertical-align: top;
}
.patient_description_left_content{

}
.alamat{
  word-break: break-all;
  text-overflow: clip;
  vertical-align:top;
}
</style>