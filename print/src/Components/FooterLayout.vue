<template>
  <div>
    <table class="footer_layout">
      <tr style="padding:0;margin:0;border:none">
        <td class="footer_layout_left_table">
          <PenanggungJawab />
        </td>
        <!-- <td class="footer_bottom_table">
          <VerifikasiDPJB />
        </td> -->
        <td class="footer_layout_right_table">
          <Pemeriksa />
        </td>
      </tr>
      <!-- <tr style="position: inherite;display:block;bottom: 0;width: 100%">
        <td colspan="2" style="width: 100%;">
          
        </td>
      </tr> -->
    </table>
    <!-- <h5 class="footer-text">Hasil ini online dengan ruangan terkait dan dokter SpPK</h5> -->
  </div>
</template>

<script>
import PenanggungJawab from "./Footer/PenanggungJawab";
import Pemeriksa from "./Footer/Pemeriksaa";
// import VerifikasiDPJB from "./Footer/VerifikasiDPJB";
export default {
  components: {
    PenanggungJawab,
    Pemeriksa,
    // VerifikasiDPJB
  }
};
</script>

<style scoped>
.footer_layout {
  border-spacing: 0;
  width: 210mm;
  height: 25mm;
  border-width: 0mm;
  margin: 0;
  padding: 0;
  border: none;
}
.footer_layout_left_table {
  width: 65mm;
  background-color: white;
  margin-left: 0;
  padding: 0;
  border: none;
  vertical-align: top;
}
.footer_layout_right_table {
  width: 65mm;
  background-color: white;
  margin: 0;
  padding: 0;
  border: none;
  vertical-align: top;
}
.footer_bottom_table {
  text-align: center;
  padding: 0;
  width: 65mm;
  border: none;
  vertical-align: top;
}
.footer-text{
  position: absolute;
  display:block;
  bottom: 0;
  width: 100%
}
</style>