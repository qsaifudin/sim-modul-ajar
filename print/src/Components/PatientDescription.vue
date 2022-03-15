<template>
  <table class="header_patient_description">
    <tr style="padding:0;margin:0;border:none;width:100%;">
      <td class="left_table">
        <PatientDescriptionLeftContent/>
      </td>
      <td class="right_table">
        <PatientDescriptionRightContent/>
      </td>
    </tr>
  </table>
</template>

<script>
import PatientDescriptionLeftContent from "./PatientDescriptionLeftContent";
import PatientDescriptionRightContent from "./PatientDescriptionRightContent";
export default {
  components: {
    PatientDescriptionLeftContent,
    PatientDescriptionRightContent
  }
};
</script>

<style scoped>
.header_patient_description {
  border-spacing: 0;
  width: 210mm;
  height: 25mm;
  border-width: 0mm;
  margin: 0;
  padding: 0;
  border: none;
}
.left_table {
  width: 60%;
  /* background-color: cornsilk; */
  background-color: white;
  margin: 0;
  padding: 0;
  border: none;
  vertical-align: top
}
.right_table {
  width: 40%;
  background-color: white;
  margin: 0;
  padding: 0;
  border: none;
  vertical-align: top
}
</style>