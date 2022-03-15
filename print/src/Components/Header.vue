<template>
  <table class="header">
    <tr>
      <td class="logo_container"> 
        <img class="logo" src="@/assets/undaan.png" />
      </td>
      <td class="kop_container">
        <!-- <b class="nama_daerah">PEMERINTAH KABUPATEN TUBAN</b> -->
        <b class="nama_rumah_sakit">RUMAH SAKIT MATA UNDAAN</b>
        <b class="nama_rumah_sakit">Laboratorium Klinik</b>
        <b class="alamat_rumah_sakit">Jl. Undaan Kulon No.19, Peneleh, Kec. Genteng, Kota SBY, Jawa Timur - 60274 Telepon (031) 5343806</b>
        <!-- <b class="alamat_rumah_sakit">Fax : (0354) 392883</b> -->
      </td>     
    </tr>   
  </table> 
</template> 
<script>
export default {};
</script> 

<style scoped>
.header {
  border-spacing: 0;
  /* width: 190mm; */
  width: 210mm;
  height: 33mm;
  /* background-color:  antiquewhite;  */
  background-color: white;
}
.logo_container {
  vertical-align: top;
  width: 35mm;
  display: inline-block;
}
.logo {
  width: 30mm;
  height: auto;
  display: inline-block;
  padding: 0;
  margin: 0;
}
.kop_container {
  vertical-align: middle;
  /* width: 160mm;*/
  width: 100%;
  margin: 0;
  padding: 0;
  text-align: left;
}
.nama_daerah {
  display: block;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 6.5mm;
  margin: 0;
  padding: 0;
  list-style-type: none;
  text-align: center;
}
.nama_rumah_sakit {
  margin-top: 1mm;
  display: block;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 6mm;
  padding: 0;
  list-style-type: none;
  text-align: left;
}
.alamat_rumah_sakit {
  display: block;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 4mm;
  margin-top: 1mm;
  padding: 0;
  list-style-type: none;
  text-align: left;
}
</style>