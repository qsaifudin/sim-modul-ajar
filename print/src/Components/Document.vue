<template>
  <div
    style="width: 210mm;padding:0 !important;margin:0 !important;background-color: pink !important"
  >
    <div
      v-for="(node_detail,loopIndex) in node_detail_list"
      :key="node_detail.uuid+Math.random(0,100)"
    >
      <div v-if="calculateNewPage(loopIndex,node_detail,node_detail_list)">
        <!-- header 33mm -->
        <Header class="margin_left header_document" />
        <!-- 7mm -->
        <HeaderPatientDescription class="margin_left" />
        <!-- 25mm -->
        <PatientDescription class="margin_left document_patient_description" />
        <!-- 7mm -->
        <HeaderDetailPemeriksaan class="margin_left" />
      </div>

      <!-- 7mm -->
      <KategoriPemeriksaan class="margin_left" v-if="node_detail.type==='kategori'" />
      <!-- 7mm -->
      <SubKategoriPemeriksaan class="margin_left" v-else-if="node_detail.type==='sub_kategori'" />
      <!-- 7mm -->
      <DetailPemeriksaan class="margin_left" v-else-if="node_detail.type==='pemeriksaan'" />
    </div>
    <!--  -->
    <!-- 15mm -->
    <CatatanPemeriksaan class="margin_left catatan_pemeriksaan" />
    <!-- 25mm -->
    <FooterLayout class="margin_left" />
  </div>
</template>

<script>
var globalCountHeight = 0;
import atob from "atob";
import qs from "querystringify";
import Header from "./Header";
import HeaderPatientDescription from "./HeaderPatientDescription";
import PatientDescription from "./PatientDescription";
import HeaderDetailPemeriksaan from "./HeaderDetailPemeriksaan";
import DetailPemeriksaan from "./DetailPemeriksaan";
import KategoriPemeriksaan from "./KategoriPemeriksaan";
import SubKategoriPemeriksaan from "./SubKategoriPemeriksaan";
import CatatanPemeriksaan from "./CatatanPemeriksaan";
import FooterLayout from "./FooterLayout";
// import BlankMarginTop from "./BlankMarginTop";
export default {
  mounted() {
    var rawUrl = window.location.toString();
    var dataQueryUrl = rawUrl.split("?")[1];
    var parsedDataQuery = qs.parse(dataQueryUrl);
    var base64DataPassing = parsedDataQuery.data;
    if (base64DataPassing !== undefined) {
      var stringDataPassing = atob(base64DataPassing);
      var jsonDataPassing = JSON.parse(stringDataPassing);
      window.alert(JSON.stringify(jsonDataPassing));
    }
  },
  computed: {},
  methods: {
    // eslint-disable-next-line
    calculateNewPage(loopIndex, node_detail, node_detail_list) {
      // eslint-disable-next-line
      console.log(this.countHeight);

      if (globalCountHeight === 0) {
        globalCountHeight = 33 + 7 + 25 + 7 + 7 + 7;
        return true;
        /**
         * Akan di potong 3 dari bawah dan di ganti bari di setelahnya
         * 7 adalah tinggi setiap baris dari pemeriksaan
         */
      } else if (
        node_detail_list.length - 3 === loopIndex &&
        globalCountHeight + 15 + 25 + 7 + 7 >= 280
      ) {
        globalCountHeight = 33 + 7 + 25 + 7 + 7 + 7;
        return true;
      } else if (globalCountHeight >= 280) {
        globalCountHeight = 33 + 7 + 25 + 7 + 7 + 7;
        return true;
      } else {
        switch (node_detail.type) {
          case "kategori":
            globalCountHeight += 7;
            break;
          case "sub_kategori":
            globalCountHeight += 7;
            break;
          case "pemeriksaan":
            globalCountHeight += 7;
            break;
        }
        return false;
      }
    }
  },
  data() {
    return {
      countHeight: 0,
      isNewPage: true,
      node_detail_list: [
        {
          uuid: "23423efsdrfds",
          type: "kategori",
          kode: "KIMIA",
          nama: "KIMIA"
        },
        {
          uuid: "23423efsdrfd4334",
          type: "sub_kategori",
          kode: "SUB KIM",
          nama: "SUB KIM"
        },
        {
          uuid: "23423efsdrfd4334erkd",
          type: "pemeriksaan",
          waktu_pemeriksaan_di_isi: "2019-01-01T12:12:12",
          id: "12",
          tampilan_nilai_rujukan: "12-15",
          satuan: "ml",
          metode: "beh",
          nama: "HGB",
          flag: {
            kode: "H",
            warna: "ffff"
          }
        },
        {
          uuid: "23423efsdrfd4334erkd",
          type: "pemeriksaan",
          waktu_pemeriksaan_di_isi: "2019-01-01T12:12:12",
          id: "12",
          tampilan_nilai_rujukan: "12-15",
          satuan: "ml",
          metode: "beh",
          nama: "HGB",
          flag: {
            kode: "H",
            warna: "ffff"
          }
        },
        {
          uuid: "23423efsdrfd4334erkd",
          type: "pemeriksaan",
          waktu_pemeriksaan_di_isi: "2019-01-01T12:12:12",
          id: "12",
          tampilan_nilai_rujukan: "12-15",
          satuan: "ml",
          metode: "beh",
          nama: "HGB",
          flag: {
            kode: "H",
            warna: "ffff"
          }
        },
        {
          uuid: "23423efsdrfd4334erkd",
          type: "pemeriksaan",
          waktu_pemeriksaan_di_isi: "2019-01-01T12:12:12",
          id: "12",
          tampilan_nilai_rujukan: "12-15",
          satuan: "ml",
          metode: "beh",
          nama: "HGB",
          flag: {
            kode: "H",
            warna: "ffff"
          }
        }
      ]
    };
  },
  components: {
    // BlankMarginTop,
    FooterLayout,
    CatatanPemeriksaan,
    Header,
    HeaderPatientDescription,
    PatientDescription,
    HeaderDetailPemeriksaan,
    DetailPemeriksaan,
    KategoriPemeriksaan,
    SubKategoriPemeriksaan
  }
};
</script>

<style scoped>
.margin_left {
  margin-left: 5mm;
}
.header_document {
  margin-top: 5mm;
  page-break-before: always;
}
.document_patient_description {
  margin-top: 1mm;
}
.catatan_pemeriksaan {
  margin-top: 2mm;
}
</style>>
