<template>
  <table class="header_patient_description_left_content">
    <tr>
      <td>Surabaya, {{tglSekarang()}}</td>
    </tr>
    <tr>
      <td align="center">Pemeriksa</td>
    </tr>
    <tr class="spasi_ttd">
      <td>
        &nbsp;
      </td>
    </tr>
    <tr>
      <!-- <td align="center">Joni</td> -->
      <td align="center">{{ namaPemeriksa }}</td>
    </tr>
  </table>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment"
export default {
  computed: {
    ...mapState("Components/PasienDetail", {
      namaPemeriksa : state => state.nama_pemeriksa
    })
  },
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
  width: 100%;
  border-width: 0mm;
  margin: 0;
  padding: 0;
  border: none;
  vertical-align: top;
  text-align: center;
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
  height: 20mm;
  width: auto;
}
</style>