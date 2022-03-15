<template>
  <div>
    <div
      style="width: 210mm;padding:0 !important;margin:0 !important;background-color: white !important"
    >
      <div v-if="isNotLongText === true">
        <div
        v-for="(node_detail,loopIndex) in node_detail_list"
        :key="node_detail.uuid+Math.random(0,100)"
        >
          <div v-if="calculateNewPage(loopIndex,node_detail,node_detail_list)">
            <!-- header 33mm -->
            <Header class="padding-block header_document" />
            <!-- 7mm -->
            <HeaderPatientDescription class="padding-block" />
            <!-- 25mm -->
            <!-- <PatientDescription class="padding-block document_patient_description" /> -->
            <PatientDescription class="patien-description-block document_patient_description" />
            <!-- 7mm -->
            <HeaderDetailPemeriksaan class="padding-block detail-pemeriksaan" />
          </div>
          <!-- 7mm -->
          <KategoriPemeriksaan
            class="padding-block pemeriksaan-list"
            v-if="node_detail.type==='kategori' && node_detail.longText === false"
            :nama="node_detail.nama"
          />
          <!-- 7mm -->
          <SubKategoriPemeriksaan
            class="padding-block"
            v-else-if="node_detail.type==='sub_kategori'&&node_detail.nama!==' ' && node_detail.longText === false"
            :nama="node_detail.nama"
          />
          <!-- 7mm -->
          <DetailPemeriksaan
            class="padding-block detail-pemeriksaan"
            v-else-if="node_detail.type==='pemeriksaan' && node_detail.jenis_input !== 'L'"
            :nama="node_detail.nama"
            :hasil="node_detail.hasil_pemeriksaan"
            :nilai_rujukan="node_detail.tampilan_nilai_rujukan"
            :satuan="node_detail.satuan"
            :metode="node_detail.metode"
            :flagKode="node_detail.flag.kode"
            :flagNama="node_detail.flag.nama"
            :flagWarna="node_detail.flag.warna"
            :loopIndex="loopIndex"
            :duplo="node_detail.is_duplo"
          />
        </div>
      </div>

      <div v-if="isLongText === true">
        <HeaderDetailPemeriksaanLongText class="padding-block" />
        <div v-for="(node_detail,loopIndex) in node_detail_list"
          :key="node_detail.uuid+Math.random(0,100)">
          <KategoriPemeriksaan
            class="padding-block pemeriksaan-list"
            v-if="node_detail.type==='kategori' && node_detail.longText === true"
            :nama="node_detail.nama"
          />
          <SubKategoriPemeriksaan
            class="padding-block"
            v-else-if="node_detail.type==='sub_kategori'&&node_detail.nama!==' ' && node_detail.longText === true"
            :nama="node_detail.nama"
          />
          <FormatLongText v-if="node_detail.type==='pemeriksaan' && node_detail.jenis_input === 'L'" :nama="node_detail.nama"
            :hasil="node_detail.hasil_pemeriksaan" :loopIndex="loopIndex"></FormatLongText>
        </div>
      </div>
      
      <!--  -->
      <!-- 15mm -->
      <CatatanPemeriksaan class="padding-block catatan_pemeriksaan" />
      <!-- 25mm -->
      <FooterLayout class="padding-block" />
    </div>

    <div class="pagebreak" v-if="jenisInputMix === true">
      <HeaderDetailPemeriksaanLongText class="padding-block" />
      <div v-for="(node_detail,loopIndex) in node_detail_list"
        :key="node_detail.uuid+Math.random(0,100)">
        <KategoriPemeriksaan
          class="padding-block pemeriksaan-list"
          v-if="node_detail.type==='kategori' && node_detail.longText === true"
          :nama="node_detail.nama"
        />
        <SubKategoriPemeriksaan
            class="padding-block"
            v-else-if="node_detail.type==='sub_kategori'&&node_detail.nama!==' ' && node_detail.longText === true"
            :nama="node_detail.nama"
          />
        <FormatLongText v-if="node_detail.type==='pemeriksaan' && node_detail.jenis_input === 'L'" :nama="node_detail.nama"
          :hasil="node_detail.hasil_pemeriksaan" :loopIndex="loopIndex"></FormatLongText>
      </div>
    </div>

    
  </div>
</template>

<script>
/* eslint-disable */
async function loop(items, callback) {
  for (var a = 0; a < items.length; a++) {
    // eslint-disable-next-line
    await callback(items[a]);
  }
}
var globalCountHeight = 0;
import atob from "atob";
import qs from "querystringify";
import Header from "./Components/Header";
import HeaderPatientDescription from "./Components/HeaderPatientDescription";
import PatientDescription from "./Components/PatientDescription";
import HeaderDetailPemeriksaan from "./Components/HeaderDetailPemeriksaan";
import HeaderDetailPemeriksaanLongText from "./Components/HeaderDetailPemeriksaanLongText";
import DetailPemeriksaan from "./Components/DetailPemeriksaan";
import KategoriPemeriksaan from "./Components/KategoriPemeriksaan";
import SubKategoriPemeriksaan from "./Components/SubKategoriPemeriksaan";
import CatatanPemeriksaan from "./Components/CatatanPemeriksaan";
import FooterLayout from "./Components/FooterLayout";
import FormatLongText from './Components/FormatLongText';
import { mapMutations } from "vuex";
import uuidv4 from "uuid/v4";
import axios from "axios";
import moment from "moment";
// import BlankMarginTop from "./BlankMarginTop";
// selanjutnya build upload draft dan coba menggunakan post data base64
export default {
  async mounted() {
    var rawUrl = window.location.toString();
    var dataQueryUrl = rawUrl.split("?")[1];
    var parsedDataQuery = qs.parse(dataQueryUrl);
    var noLab = parsedDataQuery.no_lab;
    var id = parsedDataQuery.id;
    var namaPemeriksa = parsedDataQuery.nama_pemeriksa


    this.SET_NAMA_PEMERIKSA(namaPemeriksa)
    console.log("URL Query parameter = "+parsedDataQuery)
    if (noLab !== undefined && id !== undefined) {
      // alert("yeyee " + noLab + " id " + id);
      var urlApi = ""

      if (localStorage.getItem("show_print") === "hasil_pemeriksaan"){
        urlApi = "/api/v1/pemeriksaan_pasien/input_hasil/print"
      } else if (localStorage.getItem("show_print") === "arsip_pemeriksaan"){
        urlApi = "/api/v1/archive/hasil_pemeriksaan/print"
      }
      var respond = await axios.post( urlApi,
        {
          id: parseInt(id),
          no_lab: noLab
        }
      );
      var dataPrintObj = respond.data;
      console.log("Pemeriksaan : "+this.pemeriksaan)
      // var dataPrintObj = this.pemeriksaan;
      if (dataPrintObj.success === true) {
        // alert("yeyee success");
        this.setDataPasien(dataPrintObj.payload);
        this.setDataPemeriksaan(dataPrintObj.payload);
      } else {
        // alert("yeyee failure " + dataPrintObj.message);
      }
      // var stringDataPassing = atob(base64DataPassing);
      // var data = JSON.parse(stringDataPassing).payload;
      // this.setDataPasien(data);
      // this.setDataPemeriksaan(data);
    }
    localStorage.setItem('show_print', '')
  },
  computed: {},
  methods: {
    // eslint-disable-next-line
    calculateNewPage(loopIndex, node_detail, node_detail_list) {
      // eslint-disable-next-line

      console.log(this.countHeight);
      /**
      * Tidak ada melakukan pemotongan halaman
      */
      if (globalCountHeight === 0) {
        globalCountHeight = 33 + 7 + 25 + 7 + 7 + 7;
        return true;
      } 
      /**
      * Akan di potong 2 dari bawah dan di ganti bari di setelahnya
      * 7 adalah tinggi setiap baris dari pemeriksaan
      */
      else if (
        node_detail_list.length - 2 === loopIndex &&
        // globalCountHeight + 15 + 25 + 7 + 7 >= 280
        globalCountHeight + 15 + 25 + 7 + 7 >= 315
      ) {
        globalCountHeight = 33 + 7 + 25 + 7 + 7 + 7;
        return true;
      // } else if (globalCountHeight >= 280) {
      } else if (globalCountHeight >= 315) {
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
    },
    // eslint-disable-next-line
    async setDataPemeriksaan(data) {
      var kategoriPemeriksaanArray = await this.formatPemeriksaanLevel1(data);
      console.log("pemeriksaan")
      console.log(JSON.stringify(kategoriPemeriksaanArray));
      var nodeDetailTMP = [];
      // Loop kategori pemeriksaan
      await loop(kategoriPemeriksaanArray, async kategori_pemeriksaan => {
        nodeDetailTMP.push({
          uuid: uuidv4(),
          type: "kategori",
          kode: kategori_pemeriksaan.kode,
          nama: kategori_pemeriksaan.nama,
          longText: kategori_pemeriksaan.longText
        });
        // Loop sub kategori pemeriksaan
        await loop(
          kategori_pemeriksaan.sub_kategori_pemeriksaan,
          async sub_kategori_pemeriksaan => {
            nodeDetailTMP.push({
              uuid: uuidv4(),
              type: "sub_kategori",
              kode: sub_kategori_pemeriksaan.kode,
              nama: sub_kategori_pemeriksaan.nama,
              longText: sub_kategori_pemeriksaan.longText
            });
            // Loop pemeriksaan
            await loop(
              sub_kategori_pemeriksaan.detail_pemeriksaan,
              async detail_pemeriksaan => {
                nodeDetailTMP.push({
                  uuid: uuidv4(),
                  type: "pemeriksaan",
                  waktu_pemeriksaan_di_isi:
                    detail_pemeriksaan.waktu_pemeriksaan_di_isi,
                  id: detail_pemeriksaan.id,
                  tampilan_nilai_rujukan:
                    detail_pemeriksaan.tampilan_nilai_rujukan,
                  satuan: detail_pemeriksaan.satuan,
                  metode: detail_pemeriksaan.metode,
                  nama: detail_pemeriksaan.nama,
                  hasil_pemeriksaan: detail_pemeriksaan.hasil_pemeriksaan,
                  jenis_input: detail_pemeriksaan.jenis_input,
                  flag: {
                    kode: detail_pemeriksaan.flag.kode,
                    warna: detail_pemeriksaan.flag.warna,
                    nama: detail_pemeriksaan.flag.nama
                  },
                  is_duplo: detail_pemeriksaan.is_duplo
                });
              }
            );
          }
        );
      });

      await loop(nodeDetailTMP, async detail => {
        if (detail.type === "pemeriksaan" && detail.jenis_input !== "L") {
          this.isNotLongText = true;
        }
      });

      await loop(nodeDetailTMP, async detail => {
        if (detail.type === "pemeriksaan" && detail.jenis_input === "L" && this.isNotLongText === true) {
          this.jenisInputMix = true;
        } else if (detail.type === "pemeriksaan" && detail.jenis_input === "L" && this.isNotLongText === false) {
          this.isLongText = true;
        }
      });

      console.log('node detail === ' + JSON.stringify(nodeDetailTMP));
      console.log('yes = ' + this.isLongText);
      console.log('no = ' + this.isNotLongText);
      console.log('mix = ' + this.jenisInputMix);
      this.node_detail_list = nodeDetailTMP;
    },

    endDate: function (time) {
      var a = []
      var j = 0

      for (var i = 0; i < time.length; i++) {
        if (time[i].waktu_pemeriksaan_di_isi !== null) {
          a[j] = new Date(time[i].waktu_pemeriksaan_di_isi)
          j++
        }
      }
      var sorted = a.sort(function (date1, date2) { return date1.getTime() - date2.getTime() })
      var waktuSelesai = ''
      if (sorted[sorted.length - 1] !== undefined) {
        waktuSelesai = moment(sorted[sorted.length - 1]).format('DD/MM/YYYY - HH:mm')
        return waktuSelesai
      } else {
        waktuSelesai = '-'
        return waktuSelesai
        // this.SET_WAKTU_SELESAI_PERIKSA(waktuSelesai);
      }
    },
    setDataPasien(data) {
      // console.log("data pasien = "+JSON.stringify(data));

      // for(var i=0; i<data.item_pemeriksaans.length; i++){
      //   data.item_pemeriksaans[i]
      // }
      var waktu_selesai_name = null
      waktu_selesai_name = moment(data.registrasi.action_selesai.waktu_selesai).format('DD/MM/YYYY - HH:mm')
      this.SET_WAKTU_SELESAI_PERIKSA(waktu_selesai_name);

      var waktu_periksa = null
      waktu_periksa = moment(data.registrasi.action_checkin.waktu_checkin).format('DD/MM/YYYY - HH:mm')
      this.SET_WAKTU_PERIKSA(waktu_periksa);

      var tanggal_lahir = moment(data.pasien.tanggal_lahir).format('DD/MM/YYYY')
      
      this.SET_NAMA(data.pasien.nama);
      this.SET_JENIS_KELAMIN(
        data.pasien.jenis_kelamin === "L" ? "laki-laki" : "perempuan"
      );
      this.SET_TANGGAL_LAHIR(tanggal_lahir);
      this.SET_UMUR_HARI(data.pasien.umur_hari);
      this.SET_UMUR_BULAN(data.pasien.umur_bulan);
      this.SET_UMUR_TAHUN(data.pasien.umur_tahun);
      this.SET_PENJAMIN(data.penjamin.nama);
      this.SET_NO_TELPHONE(data.pasien.no_telphone);
      this.SET_ALAMAT(data.pasien.alamat);
      this.SET_NO_LAB(data.registrasi.no_lab);
      this.SET_NO_RM(data.pasien.no_rm);
      this.SET_NO_REGISTRASI(data.registrasi.no_reg_rs);
      this.SET_DOKTER(data.dokter_pengirim.nama);
      this.SET_DIAGNOSA_AWAL(data.registrasi.diagnosa_awal);
      this.SET_KETERANGAN_KLINIS(data.registrasi.keterangan_klinis);
      this.IS_DUPLO(data)
      // this.SET_WAKTU_PERIKSA(data.registrasi.waktu_registrasi);
      // this.SET_WAKTU_SELESAI_PERIKSA(data.registrasi.waktu_registrasi);
      this.SET_CATATAN_HASIL(data.registrasi.keterangan_hasil);
      this.SET_RUANG_KELAS(
        data.unit_asal.nama +
          " - " +
          (data.unit_asal.kelas == null ? "" : data.unit_asal.kelas)
      );
    },
    ...mapMutations("Components/PasienDetail", {
      SET_NAMA: "SET_NAMA",
      SET_JENIS_KELAMIN: "SET_JENIS_KELAMIN",
      SET_TANGGAL_LAHIR: "SET_TANGGAL_LAHIR",
      SET_UMUR_HARI: "SET_UMUR_HARI",
      SET_UMUR_BULAN: "SET_UMUR_BULAN",
      SET_UMUR_TAHUN: "SET_UMUR_TAHUN",
      SET_PENJAMIN: "SET_PENJAMIN",
      SET_NO_TELPHONE: "SET_NO_TELPHONE",
      SET_ALAMAT: "SET_ALAMAT",
      SET_NO_LAB: "SET_NO_LAB",
      SET_NO_RM: "SET_NO_RM",
      SET_NO_REGISTRASI: "SET_NO_REGISTRASI",
      SET_DOKTER: "SET_DOKTER",
      SET_WAKTU_PERIKSA: "SET_WAKTU_PERIKSA",
      SET_WAKTU_SELESAI_PERIKSA: "SET_WAKTU_SELESAI_PERIKSA",
      SET_RUANG_KELAS: "SET_RUANG_KELAS",
      SET_NAMA_PEMERIKSA: "SET_NAMA_PEMERIKSA",
      SET_CATATAN_HASIL: "SET_CATATAN_HASIL",
      SET_DIAGNOSA_AWAL: "SET_DIAGNOSA_AWAL",
      SET_KETERANGAN_KLINIS: "SET_KETERANGAN_KLINIS",
      IS_DUPLO: "IS_DUPLO"
    }),
    async formatPemeriksaanLevel1(pemeriksaan) {
      var kategoriPemeriksaanTMPArray = [];
      var formatLongText = [];

      await loop(pemeriksaan.item_pemeriksaans, async itemPemeriksaan => {
        var isInKategoriPemeriksaanTMPArray = false;
        await loop(
          kategoriPemeriksaanTMPArray,
          async kategoriPemeriksaanTMP => {
            if (
              kategoriPemeriksaanTMP.kode ===
              itemPemeriksaan.kategori_pemeriksaan.kode
            ) {
              isInKategoriPemeriksaanTMPArray = true;
              var isInSubKategoriPemeriksaan = false;
              await loop(
                kategoriPemeriksaanTMP.sub_kategori_pemeriksaan,
                async subKategoriPemeriksaanTMP => {
                  if (
                    subKategoriPemeriksaanTMP.kode ===
                    itemPemeriksaan.sub_kategori_pemeriksaan.kode
                  ) {
                    isInSubKategoriPemeriksaan = true;
                    if(itemPemeriksaan.jenis_input !== "L"){
                      subKategoriPemeriksaanTMP.detail_pemeriksaan.push(itemPemeriksaan);
                    }
                  }
                }
              );
              if (isInSubKategoriPemeriksaan === false && itemPemeriksaan.jenis_input !== "L") {
                kategoriPemeriksaanTMP.sub_kategori_pemeriksaan.push({
                  nama: itemPemeriksaan.sub_kategori_pemeriksaan.nama,
                  kode: itemPemeriksaan.sub_kategori_pemeriksaan.kode,
                  no_urut: itemPemeriksaan.sub_kategori_pemeriksaan.no_urut,
                  longText: false,
                  detail_pemeriksaan: [itemPemeriksaan]
                });
              }
            }
          }
        );
        if (isInKategoriPemeriksaanTMPArray === false && itemPemeriksaan.jenis_input !== 'L') {
          kategoriPemeriksaanTMPArray.push({
            nama: itemPemeriksaan.kategori_pemeriksaan.nama,
            kode: itemPemeriksaan.kategori_pemeriksaan.kode,
            no_urut: itemPemeriksaan.kategori_pemeriksaan.no_urut,
            longText: false,
            sub_kategori_pemeriksaan: [
              {
                nama: itemPemeriksaan.sub_kategori_pemeriksaan.nama,
                kode: itemPemeriksaan.sub_kategori_pemeriksaan.kode,
                no_urut: itemPemeriksaan.sub_kategori_pemeriksaan.no_urut,
                longText: false,
                detail_pemeriksaan: [itemPemeriksaan]
              }
            ]
          });
        }
      });

      await kategoriPemeriksaanTMPArray.sort(function(a, b) {
        return a.no_urut - b.no_urut;
      });
      await loop(kategoriPemeriksaanTMPArray, async kategoriPemeriksaanTMP => {
        await kategoriPemeriksaanTMP.sub_kategori_pemeriksaan.sort(function(
          a,
          b
        ) {
          return a.no_urut - b.no_urut;
        });
        await loop(
          kategoriPemeriksaanTMP.sub_kategori_pemeriksaan,
          async subKategoriPemeriksaanTMP => {
            await subKategoriPemeriksaanTMP.detail_pemeriksaan.sort(function(
              a,
              b
            ) {
              return a.no_urut - b.no_urut;
            });
          }
        );
      });

      await loop(pemeriksaan.item_pemeriksaans, async itemPemeriksaan =>{
        var isInKategoriPemeriksaanTMPArray = false;
        await loop(formatLongText, async kategori => {
            if(kategori.kode === itemPemeriksaan.kategori_pemeriksaan.kode) {
                isInKategoriPemeriksaanTMPArray = true;
                await loop(kategori.sub_kategori_pemeriksaan, async subkategori => {
                    if(subkategori.kode === itemPemeriksaan.sub_kategori_pemeriksaan.kode) {
                        if(itemPemeriksaan.jenis_input === "L"){
                            subkategori.detail_pemeriksaan.push(itemPemeriksaan)
                        }
                    }
                });
            }
        });
        if(isInKategoriPemeriksaanTMPArray === false && itemPemeriksaan.jenis_input === "L") {
            formatLongText.push({
                nama: itemPemeriksaan.kategori_pemeriksaan.nama,
                kode: itemPemeriksaan.kategori_pemeriksaan.kode,
                no_urut: itemPemeriksaan.kategori_pemeriksaan.no_urut,
                longText: true,
                sub_kategori_pemeriksaan: [{
                    nama: itemPemeriksaan.sub_kategori_pemeriksaan.nama,
                    kode: itemPemeriksaan.sub_kategori_pemeriksaan.kode,
                    no_urut: itemPemeriksaan.sub_kategori_pemeriksaan.no_urut,
                    longText: true,
                    detail_pemeriksaan: [itemPemeriksaan]
                }]
            });
        }
    });
    // console.log('final : ')
    // console.log(JSON.stringify(formatLongText));

    await loop(formatLongText, async item => {
        kategoriPemeriksaanTMPArray.push(item)
    });

      console.log("format lvl 1 === ")
      console.log(JSON.stringify(kategoriPemeriksaanTMPArray))

      return kategoriPemeriksaanTMPArray;
    }
  },
  data() {
    return {
      isLongText: false,
      isNotLongText: false,
      jenisInputMix: false,
      countHeight: 0,
      isNewPage: true,
      node_detail_list: [
        // {
        //   uuid: "23423efsdrfds",
        //   type: "kategori",
        //   kode: "KIMIA",
        //   nama: "KIMIA"
        // },
        // {
        //   uuid: "23423efsdrfd4334",
        //   type: "sub_kategori",
        //   kode: "SUB KIM",
        //   nama: "SUB KIM"
        // },
        // {
        //   uuid: "23423efsdrfd4334erkd",
        //   type: "pemeriksaan",
        //   waktu_pemeriksaan_di_isi: "2019-01-01T12:12:12",
        //   id: "12",
        //   tampilan_nilai_rujukan: "12-15",
        //   satuan: "ml",
        //   metode: "beh",
        //   nama: "HGB",
        //   flag: {
        //     kode: "H",
        //     warna: "ffff"
        //   }
        // },
        // {
        //   uuid: "23423efsdrfd4334erkd",
        //   type: "pemeriksaan",
        //   waktu_pemeriksaan_di_isi: "2019-01-01T12:12:12",
        //   id: "12",
        //   tampilan_nilai_rujukan: "12-15",
        //   satuan: "ml",
        //   metode: "beh",
        //   nama: "HGB",
        //   flag: {
        //     kode: "H",
        //     warna: "ffff"
        //   }
        // },
        // {
        //   uuid: "23423efsdrfd4334erkd",
        //   type: "pemeriksaan",
        //   waktu_pemeriksaan_di_isi: "2019-01-01T12:12:12",
        //   id: "12",
        //   tampilan_nilai_rujukan: "12-15",
        //   satuan: "ml",
        //   metode: "beh",
        //   nama: "HGB",
        //   flag: {
        //     kode: "H",
        //     warna: "ffff"
        //   }
        // },
        // {
        //   uuid: "23423efsdrfd4334erkd",
        //   type: "pemeriksaan",
        //   waktu_pemeriksaan_di_isi: "2019-01-01T12:12:12",
        //   id: "12",
        //   tampilan_nilai_rujukan: "12-15",
        //   satuan: "ml",
        //   metode: "beh",
        //   nama: "HGB",
        //   flag: {
        //     kode: "H",
        //     warna: "ffff"
        //   }
        // }
      ],
      pemeriksaan: {
        "success": true,
        "message": "Count Print berhasil",
        "payload": 
        {
          "registrasi": {
            "id": 10478,
            "no_lab": "202107170001",
            "no_reg_rs": "03072021-191",
            "no_antrian": null,
            "diagnosa_awal": "",
            "kode_icdt": null,
            "nama_icdt": null,
            "keterangan_klinis": "TIDAK ADA",
            "keterangan_hasil": "",
            "expertise": null,
            "waktu_expertise": null,
            "status_terbit": 0,
            "status_registrasi": 1,
            "action_registrasi": {
              "waktu_registrasi": "2021-07-17 00:16:28",
              "nama_pegawai": null
            },
            "action_checkin": {
              "waktu_checkin": "2021-07-18 23:34:02",
              "nama_pegawai": "root"
            },
            "action_sample": {
              "waktu_sample": null,
              "nama_pegawai": null
            },
            "action_selesai": {
              "waktu_selesai": "2021-07-19 00:23:34",
              "nama_pegawai": "root"
            },
            "action_final_pelaporan_kritis": {
              "waktu_registrasi": null,
              "nama_pegawai": null
            },
            "action_final_verifikasi": {
              "waktu_final_verifikasi": "2021-07-19 00:29:18",
              "nama_pegawai": "root"
            },
            "action_terbitkan": {
              "waktu_terbit": null,
              "nama_pegawai": null
            },
            "action_print": {
              "waktu_terbit": [
                "2021-07-19 02:02:54",
                "2021-07-19 02:03:26",
                "2021-07-19 02:27:02",
                "2021-07-19 02:28:57",
                "2021-07-19 02:29:38"
              ],
              "nama_pegawai": "root"
            },
            "total_bayar": 0,
            "total_print": 5,
            "status_kritis": false
          },
          "pasien": {
            "nama": "I GUSTI RAKA BHOMA SURYA CAKRA WINAYA, An",
            "no_rm": "0777483",
            "jenis_kelamin": "L",
            "tanggal_lahir": "2019-08-30",
            "alamat": "DUKUH SETRO GG 12/11A",
            "no_telphone": "081331593469",
            "umur_hari": 19,
            "umur_bulan": 10,
            "umur_tahun": 1,
            "no_nik": null
          },
          "dokter_pengirim": {
            "nama": "Dewi Rosarina, SpM",
            "kode": "144",
            "alamat": "SURABAYA",
            "no_telphone": "85234185893",
            "spesialis_nama": "Spesialis Mata",
            "spesialis_kode": "Sp.M"
          },
          "unit_asal": {
            "nama": "PENUNJANG MEDIK",
            "kode": "61",
            "kelas": "VIP",
            "keterangan": "Rawat Jalan",
            "jenis_nama": "Ruang",
            "jenis_kode": "RUANG"
          },
          "penjamin": {
            "nama": "BPJS KESEHATAN",
            "kode": "2",
            "jenis_nama": "BPJS",
            "jenis_kode": "BPJS"
          },
          "item_pemeriksaans": [
            {
              "id": 11165,
              "status_item_pemeriksaan": 0,
              "waktu_pemeriksaan_di_isi": null,
              "verifikasi": false,
              "waktu_verifikasi": null,
              "hasil_pemeriksaan": null,
              "keterangan": null,
              "is_duplo": false,
              "tampilan_nilai_rujukan": "10.0 - 50.0",
              "nilai_kritis_tampilan_nilai_kritis": null,
              "is_rekomendasi_nilai_rujukan": true,
              "kode": "BUN",
              "nama": "BUN",
              "satuan": "mg/dL",
              "metode": "Urease - GLDH",
              "no_urut": 2202,
              "jenis_input": "A",
              "is_tampilkan_waktu_periksa": false,
              "is_flag_nilai_rujukan": true,
              "is_flag_nilai_kritis": false,
              "kategori_pemeriksaan": {
                "nama": "KIMIA KLINIK",
                "kode": "KIM",
                "no_urut": 2
              },
              "sub_kategori_pemeriksaan": {
                "nama": "Test Faal Ginjal",
                "kode": "KIM3",
                "no_urut": 3
              },
              "flag": {
                "nama": null,
                "kode": null,
                "warna": null,
                "jenis_pewarnaan": null
              },
              "waktu_pelaporan_kritis": null,
              "catatan_pemeriksaan": null,
              "status_kritis": 0,
              "nama_pelapor_nilai_kritis": null,
              "nama_penerima_pelaporan_kritis": null,
              "image_item_pemeriksaan": null,
              "total_duplo": 0
            },
            {
              "id": 11166,
              "status_item_pemeriksaan": 0,
              "waktu_pemeriksaan_di_isi": null,
              "verifikasi": false,
              "waktu_verifikasi": null,
              "hasil_pemeriksaan": null,
              "keterangan": null,
              "is_duplo": false,
              "tampilan_nilai_rujukan": "< 25",
              "nilai_kritis_tampilan_nilai_kritis": null,
              "is_rekomendasi_nilai_rujukan": true,
              "kode": "SGPT",
              "nama": "SGPT",
              "satuan": "u/L",
              "metode": "IFCC",
              "no_urut": 2001,
              "jenis_input": "A",
              "is_tampilkan_waktu_periksa": false,
              "is_flag_nilai_rujukan": true,
              "is_flag_nilai_kritis": false,
              "kategori_pemeriksaan": {
                "nama": "KIMIA KLINIK",
                "kode": "KIM",
                "no_urut": 2
              },
              "sub_kategori_pemeriksaan": {
                "nama": "Test Faal Hati",
                "kode": "KIM1",
                "no_urut": 1
              },
              "flag": {
                "nama": null,
                "kode": null,
                "warna": null,
                "jenis_pewarnaan": null
              },
              "waktu_pelaporan_kritis": null,
              "catatan_pemeriksaan": null,
              "status_kritis": 0,
              "nama_pelapor_nilai_kritis": null,
              "nama_penerima_pelaporan_kritis": null,
              "image_item_pemeriksaan": null,
              "total_duplo": 0
            },
            {
              "id": 11167,
              "status_item_pemeriksaan": 0,
              "waktu_pemeriksaan_di_isi": null,
              "verifikasi": false,
              "waktu_verifikasi": null,
              "hasil_pemeriksaan": null,
              "keterangan": null,
              "is_duplo": false,
              "tampilan_nilai_rujukan": "0.7 - 1.5",
              "nilai_kritis_tampilan_nilai_kritis": null,
              "is_rekomendasi_nilai_rujukan": true,
              "kode": "CREA",
              "nama": "Creatinin",
              "satuan": "mg/dL",
              "metode": "Jaffe Blankedcomp",
              "no_urut": 2203,
              "jenis_input": "A",
              "is_tampilkan_waktu_periksa": false,
              "is_flag_nilai_rujukan": true,
              "is_flag_nilai_kritis": false,
              "kategori_pemeriksaan": {
                "nama": "KIMIA KLINIK",
                "kode": "KIM",
                "no_urut": 2
              },
              "sub_kategori_pemeriksaan": {
                "nama": "Test Faal Ginjal",
                "kode": "KIM3",
                "no_urut": 3
              },
              "flag": {
                "nama": null,
                "kode": null,
                "warna": null,
                "jenis_pewarnaan": null
              },
              "waktu_pelaporan_kritis": null,
              "catatan_pemeriksaan": null,
              "status_kritis": 0,
              "nama_pelapor_nilai_kritis": null,
              "nama_penerima_pelaporan_kritis": null,
              "image_item_pemeriksaan": null,
              "total_duplo": 0
            },
            {
              "id": 11168,
              "status_item_pemeriksaan": 1,
              "waktu_pemeriksaan_di_isi": "2021-07-19 00:23:34",
              "verifikasi": true,
              "waktu_verifikasi": "2021-07-19 00:29:18",
              "hasil_pemeriksaan": "14",
              "keterangan": null,
              "is_duplo": false,
              "tampilan_nilai_rujukan": "13.5 - 18.0",
              "nilai_kritis_tampilan_nilai_kritis": null,
              "is_rekomendasi_nilai_rujukan": true,
              "kode": "HGB",
              "nama": "Hemoglobin",
              "satuan": "g/dL",
              "metode": "Colorimetric",
              "no_urut": 1001,
              "jenis_input": "A",
              "is_tampilkan_waktu_periksa": false,
              "is_flag_nilai_rujukan": true,
              "is_flag_nilai_kritis": true,
              "kategori_pemeriksaan": {
                "nama": "HEMATOLOGI",
                "kode": "HEMA",
                "no_urut": 1
              },
              "sub_kategori_pemeriksaan": {
                "nama": "Darah Lengkap",
                "kode": "HEMA1",
                "no_urut": 1
              },
              "flag": {
                "nama": "Normal",
                "kode": "N",
                "warna": "#000000",
                "jenis_pewarnaan": "Blok"
              },
              "waktu_pelaporan_kritis": null,
              "catatan_pemeriksaan": null,
              "status_kritis": 0,
              "nama_pelapor_nilai_kritis": null,
              "nama_penerima_pelaporan_kritis": null,
              "image_item_pemeriksaan": null,
              "total_duplo": 0
            },
            {
              "id": 11169,
              "status_item_pemeriksaan": 0,
              "waktu_pemeriksaan_di_isi": null,
              "verifikasi": false,
              "waktu_verifikasi": null,
              "hasil_pemeriksaan": null,
              "keterangan": null,
              "is_duplo": false,
              "tampilan_nilai_rujukan": "34.5 - 54",
              "nilai_kritis_tampilan_nilai_kritis": null,
              "is_rekomendasi_nilai_rujukan": true,
              "kode": "HCT",
              "nama": "Hematokrit",
              "satuan": "%",
              "metode": "Impedance",
              "no_urut": 1002,
              "jenis_input": "A",
              "is_tampilkan_waktu_periksa": false,
              "is_flag_nilai_rujukan": true,
              "is_flag_nilai_kritis": true,
              "kategori_pemeriksaan": {
                "nama": "HEMATOLOGI",
                "kode": "HEMA",
                "no_urut": 1
              },
              "sub_kategori_pemeriksaan": {
                "nama": "Darah Lengkap",
                "kode": "HEMA1",
                "no_urut": 1
              },
              "flag": {
                "nama": null,
                "kode": null,
                "warna": null,
                "jenis_pewarnaan": null
              },
              "waktu_pelaporan_kritis": null,
              "catatan_pemeriksaan": null,
              "status_kritis": 0,
              "nama_pelapor_nilai_kritis": null,
              "nama_penerima_pelaporan_kritis": null,
              "image_item_pemeriksaan": null,
              "total_duplo": 0
            },
            {
              "id": 11170,
              "status_item_pemeriksaan": 0,
              "waktu_pemeriksaan_di_isi": null,
              "verifikasi": false,
              "waktu_verifikasi": null,
              "hasil_pemeriksaan": null,
              "keterangan": null,
              "is_duplo": false,
              "tampilan_nilai_rujukan": "4.5 - 6.0",
              "nilai_kritis_tampilan_nilai_kritis": null,
              "is_rekomendasi_nilai_rujukan": true,
              "kode": "RBC",
              "nama": "Eritrosit",
              "satuan": "x 10^6  /uL",
              "metode": "Impedance",
              "no_urut": 1003,
              "jenis_input": "A",
              "is_tampilkan_waktu_periksa": false,
              "is_flag_nilai_rujukan": true,
              "is_flag_nilai_kritis": false,
              "kategori_pemeriksaan": {
                "nama": "HEMATOLOGI",
                "kode": "HEMA",
                "no_urut": 1
              },
              "sub_kategori_pemeriksaan": {
                "nama": "Darah Lengkap",
                "kode": "HEMA1",
                "no_urut": 1
              },
              "flag": {
                "nama": null,
                "kode": null,
                "warna": null,
                "jenis_pewarnaan": null
              },
              "waktu_pelaporan_kritis": null,
              "catatan_pemeriksaan": null,
              "status_kritis": 0,
              "nama_pelapor_nilai_kritis": null,
              "nama_penerima_pelaporan_kritis": null,
              "image_item_pemeriksaan": null,
              "total_duplo": 0
            },
            {
              "id": 11171,
              "status_item_pemeriksaan": 0,
              "waktu_pemeriksaan_di_isi": null,
              "verifikasi": false,
              "waktu_verifikasi": null,
              "hasil_pemeriksaan": null,
              "keterangan": null,
              "is_duplo": false,
              "tampilan_nilai_rujukan": "4.3 - 11.3",
              "nilai_kritis_tampilan_nilai_kritis": null,
              "is_rekomendasi_nilai_rujukan": true,
              "kode": "WBC",
              "nama": "Leukosit",
              "satuan": "x 10^3 /uL",
              "metode": "Impedance",
              "no_urut": 1004,
              "jenis_input": "A",
              "is_tampilkan_waktu_periksa": false,
              "is_flag_nilai_rujukan": true,
              "is_flag_nilai_kritis": false,
              "kategori_pemeriksaan": {
                "nama": "HEMATOLOGI",
                "kode": "HEMA",
                "no_urut": 1
              },
              "sub_kategori_pemeriksaan": {
                "nama": "Darah Lengkap",
                "kode": "HEMA1",
                "no_urut": 1
              },
              "flag": {
                "nama": null,
                "kode": null,
                "warna": null,
                "jenis_pewarnaan": null
              },
              "waktu_pelaporan_kritis": null,
              "catatan_pemeriksaan": null,
              "status_kritis": 0,
              "nama_pelapor_nilai_kritis": null,
              "nama_penerima_pelaporan_kritis": null,
              "image_item_pemeriksaan": null,
              "total_duplo": 0
            },
            {
              "id": 11172,
              "status_item_pemeriksaan": 0,
              "waktu_pemeriksaan_di_isi": null,
              "verifikasi": false,
              "waktu_verifikasi": null,
              "hasil_pemeriksaan": null,
              "keterangan": null,
              "is_duplo": false,
              "tampilan_nilai_rujukan": "150 - 450",
              "nilai_kritis_tampilan_nilai_kritis": null,
              "is_rekomendasi_nilai_rujukan": true,
              "kode": "PLT",
              "nama": "Trombosit",
              "satuan": "x 10^3 /uL",
              "metode": "Impedance",
              "no_urut": 1005,
              "jenis_input": "A",
              "is_tampilkan_waktu_periksa": false,
              "is_flag_nilai_rujukan": true,
              "is_flag_nilai_kritis": false,
              "kategori_pemeriksaan": {
                "nama": "HEMATOLOGI",
                "kode": "HEMA",
                "no_urut": 1
              },
              "sub_kategori_pemeriksaan": {
                "nama": "Darah Lengkap",
                "kode": "HEMA1",
                "no_urut": 1
              },
              "flag": {
                "nama": null,
                "kode": null,
                "warna": null,
                "jenis_pewarnaan": null
              },
              "waktu_pelaporan_kritis": null,
              "catatan_pemeriksaan": null,
              "status_kritis": 0,
              "nama_pelapor_nilai_kritis": null,
              "nama_penerima_pelaporan_kritis": null,
              "image_item_pemeriksaan": null,
              "total_duplo": 0
            },
            {
              "id": 11173,
              "status_item_pemeriksaan": 0,
              "waktu_pemeriksaan_di_isi": null,
              "verifikasi": false,
              "waktu_verifikasi": null,
              "hasil_pemeriksaan": null,
              "keterangan": null,
              "is_duplo": false,
              "tampilan_nilai_rujukan": null,
              "nilai_kritis_tampilan_nilai_kritis": null,
              "is_rekomendasi_nilai_rujukan": true,
              "kode": "MCV",
              "nama": "MCV",
              "satuan": "fL",
              "metode": "Impedance",
              "no_urut": 1006,
              "jenis_input": "A",
              "is_tampilkan_waktu_periksa": false,
              "is_flag_nilai_rujukan": true,
              "is_flag_nilai_kritis": false,
              "kategori_pemeriksaan": {
                "nama": "HEMATOLOGI",
                "kode": "HEMA",
                "no_urut": 1
              },
              "sub_kategori_pemeriksaan": {
                "nama": "Darah Lengkap",
                "kode": "HEMA1",
                "no_urut": 1
              },
              "flag": {
                "nama": null,
                "kode": null,
                "warna": null,
                "jenis_pewarnaan": null
              },
              "waktu_pelaporan_kritis": null,
              "catatan_pemeriksaan": null,
              "status_kritis": 0,
              "nama_pelapor_nilai_kritis": null,
              "nama_penerima_pelaporan_kritis": null,
              "image_item_pemeriksaan": null,
              "total_duplo": 0
            },
            {
              "id": 11174,
              "status_item_pemeriksaan": 0,
              "waktu_pemeriksaan_di_isi": null,
              "verifikasi": false,
              "waktu_verifikasi": null,
              "hasil_pemeriksaan": null,
              "keterangan": null,
              "is_duplo": false,
              "tampilan_nilai_rujukan": null,
              "nilai_kritis_tampilan_nilai_kritis": null,
              "is_rekomendasi_nilai_rujukan": true,
              "kode": "MCH",
              "nama": "MCH",
              "satuan": "pg",
              "metode": "Impedance",
              "no_urut": 1007,
              "jenis_input": "A",
              "is_tampilkan_waktu_periksa": false,
              "is_flag_nilai_rujukan": true,
              "is_flag_nilai_kritis": false,
              "kategori_pemeriksaan": {
                "nama": "HEMATOLOGI",
                "kode": "HEMA",
                "no_urut": 1
              },
              "sub_kategori_pemeriksaan": {
                "nama": "Darah Lengkap",
                "kode": "HEMA1",
                "no_urut": 1
              },
              "flag": {
                "nama": null,
                "kode": null,
                "warna": null,
                "jenis_pewarnaan": null
              },
              "waktu_pelaporan_kritis": null,
              "catatan_pemeriksaan": null,
              "status_kritis": 0,
              "nama_pelapor_nilai_kritis": null,
              "nama_penerima_pelaporan_kritis": null,
              "image_item_pemeriksaan": null,
              "total_duplo": 0
            },
            {
              "id": 11175,
              "status_item_pemeriksaan": 0,
              "waktu_pemeriksaan_di_isi": null,
              "verifikasi": false,
              "waktu_verifikasi": null,
              "hasil_pemeriksaan": null,
              "keterangan": null,
              "is_duplo": false,
              "tampilan_nilai_rujukan": null,
              "nilai_kritis_tampilan_nilai_kritis": null,
              "is_rekomendasi_nilai_rujukan": true,
              "kode": "MCHC",
              "nama": "MCHC",
              "satuan": "g/dL",
              "metode": "Impedance",
              "no_urut": 1008,
              "jenis_input": "A",
              "is_tampilkan_waktu_periksa": false,
              "is_flag_nilai_rujukan": true,
              "is_flag_nilai_kritis": false,
              "kategori_pemeriksaan": {
                "nama": "HEMATOLOGI",
                "kode": "HEMA",
                "no_urut": 1
              },
              "sub_kategori_pemeriksaan": {
                "nama": "Darah Lengkap",
                "kode": "HEMA1",
                "no_urut": 1
              },
              "flag": {
                "nama": null,
                "kode": null,
                "warna": null,
                "jenis_pewarnaan": null
              },
              "waktu_pelaporan_kritis": null,
              "catatan_pemeriksaan": null,
              "status_kritis": 0,
              "nama_pelapor_nilai_kritis": null,
              "nama_penerima_pelaporan_kritis": null,
              "image_item_pemeriksaan": null,
              "total_duplo": 0
            },
            {
              "id": 11176,
              "status_item_pemeriksaan": 0,
              "waktu_pemeriksaan_di_isi": null,
              "verifikasi": false,
              "waktu_verifikasi": null,
              "hasil_pemeriksaan": null,
              "keterangan": null,
              "is_duplo": false,
              "tampilan_nilai_rujukan": null,
              "nilai_kritis_tampilan_nilai_kritis": null,
              "is_rekomendasi_nilai_rujukan": true,
              "kode": "RDW",
              "nama": "RDW-CV",
              "satuan": "%",
              "metode": "Impedance",
              "no_urut": 1009,
              "jenis_input": "A",
              "is_tampilkan_waktu_periksa": false,
              "is_flag_nilai_rujukan": true,
              "is_flag_nilai_kritis": false,
              "kategori_pemeriksaan": {
                "nama": "HEMATOLOGI",
                "kode": "HEMA",
                "no_urut": 1
              },
              "sub_kategori_pemeriksaan": {
                "nama": "Darah Lengkap",
                "kode": "HEMA1",
                "no_urut": 1
              },
              "flag": {
                "nama": null,
                "kode": null,
                "warna": null,
                "jenis_pewarnaan": null
              },
              "waktu_pelaporan_kritis": null,
              "catatan_pemeriksaan": null,
              "status_kritis": 0,
              "nama_pelapor_nilai_kritis": null,
              "nama_penerima_pelaporan_kritis": null,
              "image_item_pemeriksaan": null,
              "total_duplo": 0
            },
            {
              "id": 11177,
              "status_item_pemeriksaan": 0,
              "waktu_pemeriksaan_di_isi": null,
              "verifikasi": false,
              "waktu_verifikasi": null,
              "hasil_pemeriksaan": null,
              "keterangan": null,
              "is_duplo": false,
              "tampilan_nilai_rujukan": null,
              "nilai_kritis_tampilan_nilai_kritis": null,
              "is_rekomendasi_nilai_rujukan": true,
              "kode": "PCT",
              "nama": "PCT",
              "satuan": "%",
              "metode": " ",
              "no_urut": 1011,
              "jenis_input": "A",
              "is_tampilkan_waktu_periksa": false,
              "is_flag_nilai_rujukan": true,
              "is_flag_nilai_kritis": false,
              "kategori_pemeriksaan": {
                "nama": "HEMATOLOGI",
                "kode": "HEMA",
                "no_urut": 1
              },
              "sub_kategori_pemeriksaan": {
                "nama": "Darah Lengkap",
                "kode": "HEMA1",
                "no_urut": 1
              },
              "flag": {
                "nama": null,
                "kode": null,
                "warna": null,
                "jenis_pewarnaan": null
              },
              "waktu_pelaporan_kritis": null,
              "catatan_pemeriksaan": null,
              "status_kritis": 0,
              "nama_pelapor_nilai_kritis": null,
              "nama_penerima_pelaporan_kritis": null,
              "image_item_pemeriksaan": null,
              "total_duplo": 0
            },
            {
              "id": 11178,
              "status_item_pemeriksaan": 0,
              "waktu_pemeriksaan_di_isi": null,
              "verifikasi": false,
              "waktu_verifikasi": null,
              "hasil_pemeriksaan": null,
              "keterangan": null,
              "is_duplo": false,
              "tampilan_nilai_rujukan": null,
              "nilai_kritis_tampilan_nilai_kritis": null,
              "is_rekomendasi_nilai_rujukan": true,
              "kode": "MPV",
              "nama": "MPV",
              "satuan": "fL",
              "metode": "Impedance",
              "no_urut": 1012,
              "jenis_input": "A",
              "is_tampilkan_waktu_periksa": false,
              "is_flag_nilai_rujukan": true,
              "is_flag_nilai_kritis": false,
              "kategori_pemeriksaan": {
                "nama": "HEMATOLOGI",
                "kode": "HEMA",
                "no_urut": 1
              },
              "sub_kategori_pemeriksaan": {
                "nama": "Darah Lengkap",
                "kode": "HEMA1",
                "no_urut": 1
              },
              "flag": {
                "nama": null,
                "kode": null,
                "warna": null,
                "jenis_pewarnaan": null
              },
              "waktu_pelaporan_kritis": null,
              "catatan_pemeriksaan": null,
              "status_kritis": 0,
              "nama_pelapor_nilai_kritis": null,
              "nama_penerima_pelaporan_kritis": null,
              "image_item_pemeriksaan": null,
              "total_duplo": 0
            },
            {
              "id": 11179,
              "status_item_pemeriksaan": 0,
              "waktu_pemeriksaan_di_isi": null,
              "verifikasi": false,
              "waktu_verifikasi": null,
              "hasil_pemeriksaan": null,
              "keterangan": null,
              "is_duplo": false,
              "tampilan_nilai_rujukan": null,
              "nilai_kritis_tampilan_nilai_kritis": null,
              "is_rekomendasi_nilai_rujukan": true,
              "kode": "PDW",
              "nama": "PDW",
              "satuan": " ",
              "metode": "Impedance",
              "no_urut": 1013,
              "jenis_input": "A",
              "is_tampilkan_waktu_periksa": false,
              "is_flag_nilai_rujukan": true,
              "is_flag_nilai_kritis": false,
              "kategori_pemeriksaan": {
                "nama": "HEMATOLOGI",
                "kode": "HEMA",
                "no_urut": 1
              },
              "sub_kategori_pemeriksaan": {
                "nama": "Darah Lengkap",
                "kode": "HEMA1",
                "no_urut": 1
              },
              "flag": {
                "nama": null,
                "kode": null,
                "warna": null,
                "jenis_pewarnaan": null
              },
              "waktu_pelaporan_kritis": null,
              "catatan_pemeriksaan": null,
              "status_kritis": 0,
              "nama_pelapor_nilai_kritis": null,
              "nama_penerima_pelaporan_kritis": null,
              "image_item_pemeriksaan": null,
              "total_duplo": 0
            },
            {
              "id": 11180,
              "status_item_pemeriksaan": 0,
              "waktu_pemeriksaan_di_isi": null,
              "verifikasi": false,
              "waktu_verifikasi": null,
              "hasil_pemeriksaan": null,
              "keterangan": null,
              "is_duplo": false,
              "tampilan_nilai_rujukan": "10.5 - 13.4",
              "nilai_kritis_tampilan_nilai_kritis": null,
              "is_rekomendasi_nilai_rujukan": true,
              "kode": "PTT",
              "nama": "PTT",
              "satuan": "detik",
              "metode": "Foto Optikal",
              "no_urut": 1101,
              "jenis_input": "A",
              "is_tampilkan_waktu_periksa": false,
              "is_flag_nilai_rujukan": true,
              "is_flag_nilai_kritis": false,
              "kategori_pemeriksaan": {
                "nama": "HEMATOLOGI",
                "kode": "HEMA",
                "no_urut": 1
              },
              "sub_kategori_pemeriksaan": {
                "nama": "Faal Hemostatik",
                "kode": "HEMA2",
                "no_urut": 2
              },
              "flag": {
                "nama": null,
                "kode": null,
                "warna": null,
                "jenis_pewarnaan": null
              },
              "waktu_pelaporan_kritis": null,
              "catatan_pemeriksaan": null,
              "status_kritis": 0,
              "nama_pelapor_nilai_kritis": null,
              "nama_penerima_pelaporan_kritis": null,
              "image_item_pemeriksaan": null,
              "total_duplo": 0
            },
            {
              "id": 11181,
              "status_item_pemeriksaan": 0,
              "waktu_pemeriksaan_di_isi": null,
              "verifikasi": false,
              "waktu_verifikasi": null,
              "hasil_pemeriksaan": null,
              "keterangan": null,
              "is_duplo": false,
              "tampilan_nilai_rujukan": "0.92 - 0.07",
              "nilai_kritis_tampilan_nilai_kritis": null,
              "is_rekomendasi_nilai_rujukan": true,
              "kode": "INR",
              "nama": "INR",
              "satuan": " ",
              "metode": " ",
              "no_urut": 1102,
              "jenis_input": "A",
              "is_tampilkan_waktu_periksa": false,
              "is_flag_nilai_rujukan": true,
              "is_flag_nilai_kritis": false,
              "kategori_pemeriksaan": {
                "nama": "HEMATOLOGI",
                "kode": "HEMA",
                "no_urut": 1
              },
              "sub_kategori_pemeriksaan": {
                "nama": "Faal Hemostatik",
                "kode": "HEMA2",
                "no_urut": 2
              },
              "flag": {
                "nama": null,
                "kode": null,
                "warna": null,
                "jenis_pewarnaan": null
              },
              "waktu_pelaporan_kritis": null,
              "catatan_pemeriksaan": null,
              "status_kritis": 0,
              "nama_pelapor_nilai_kritis": null,
              "nama_penerima_pelaporan_kritis": null,
              "image_item_pemeriksaan": null,
              "total_duplo": 0
            },
            {
              "id": 11182,
              "status_item_pemeriksaan": 0,
              "waktu_pemeriksaan_di_isi": null,
              "verifikasi": false,
              "waktu_verifikasi": null,
              "hasil_pemeriksaan": null,
              "keterangan": null,
              "is_duplo": false,
              "tampilan_nilai_rujukan": "23.5 - 36.4",
              "nilai_kritis_tampilan_nilai_kritis": null,
              "is_rekomendasi_nilai_rujukan": true,
              "kode": "APTT",
              "nama": "APTT",
              "satuan": "detik",
              "metode": "Foto Optikal",
              "no_urut": 1103,
              "jenis_input": "A",
              "is_tampilkan_waktu_periksa": false,
              "is_flag_nilai_rujukan": true,
              "is_flag_nilai_kritis": false,
              "kategori_pemeriksaan": {
                "nama": "HEMATOLOGI",
                "kode": "HEMA",
                "no_urut": 1
              },
              "sub_kategori_pemeriksaan": {
                "nama": "Faal Hemostatik",
                "kode": "HEMA2",
                "no_urut": 2
              },
              "flag": {
                "nama": null,
                "kode": null,
                "warna": null,
                "jenis_pewarnaan": null
              },
              "waktu_pelaporan_kritis": null,
              "catatan_pemeriksaan": null,
              "status_kritis": 0,
              "nama_pelapor_nilai_kritis": null,
              "nama_penerima_pelaporan_kritis": null,
              "image_item_pemeriksaan": null,
              "total_duplo": 0
            },
            {
              "id": 11183,
              "status_item_pemeriksaan": 0,
              "waktu_pemeriksaan_di_isi": null,
              "verifikasi": false,
              "waktu_verifikasi": null,
              "hasil_pemeriksaan": null,
              "keterangan": null,
              "is_duplo": false,
              "tampilan_nilai_rujukan": "336.78 - 167.13",
              "nilai_kritis_tampilan_nilai_kritis": null,
              "is_rekomendasi_nilai_rujukan": true,
              "kode": "FIBRI",
              "nama": "Fibrinogen",
              "satuan": " ",
              "metode": " ",
              "no_urut": 1104,
              "jenis_input": "A",
              "is_tampilkan_waktu_periksa": false,
              "is_flag_nilai_rujukan": true,
              "is_flag_nilai_kritis": false,
              "kategori_pemeriksaan": {
                "nama": "HEMATOLOGI",
                "kode": "HEMA",
                "no_urut": 1
              },
              "sub_kategori_pemeriksaan": {
                "nama": "Faal Hemostatik",
                "kode": "HEMA2",
                "no_urut": 2
              },
              "flag": {
                "nama": null,
                "kode": null,
                "warna": null,
                "jenis_pewarnaan": null
              },
              "waktu_pelaporan_kritis": null,
              "catatan_pemeriksaan": null,
              "status_kritis": 0,
              "nama_pelapor_nilai_kritis": null,
              "nama_penerima_pelaporan_kritis": null,
              "image_item_pemeriksaan": null,
              "total_duplo": 0
            },
            {
              "id": 11184,
              "status_item_pemeriksaan": 0,
              "waktu_pemeriksaan_di_isi": null,
              "verifikasi": false,
              "waktu_verifikasi": null,
              "hasil_pemeriksaan": null,
              "keterangan": null,
              "is_duplo": false,
              "tampilan_nilai_rujukan": "6.43 - 5.24",
              "nilai_kritis_tampilan_nilai_kritis": null,
              "is_rekomendasi_nilai_rujukan": true,
              "kode": "CRP",
              "nama": "CRP",
              "satuan": " ",
              "metode": " ",
              "no_urut": 1105,
              "jenis_input": "A",
              "is_tampilkan_waktu_periksa": false,
              "is_flag_nilai_rujukan": true,
              "is_flag_nilai_kritis": false,
              "kategori_pemeriksaan": {
                "nama": "HEMATOLOGI",
                "kode": "HEMA",
                "no_urut": 1
              },
              "sub_kategori_pemeriksaan": {
                "nama": "Faal Hemostatik",
                "kode": "HEMA2",
                "no_urut": 2
              },
              "flag": {
                "nama": null,
                "kode": null,
                "warna": null,
                "jenis_pewarnaan": null
              },
              "waktu_pelaporan_kritis": null,
              "catatan_pemeriksaan": null,
              "status_kritis": 0,
              "nama_pelapor_nilai_kritis": null,
              "nama_penerima_pelaporan_kritis": null,
              "image_item_pemeriksaan": null,
              "total_duplo": 0
            },
            {
              "id": 11185,
              "status_item_pemeriksaan": 0,
              "waktu_pemeriksaan_di_isi": null,
              "verifikasi": false,
              "waktu_verifikasi": null,
              "hasil_pemeriksaan": null,
              "keterangan": null,
              "is_duplo": false,
              "tampilan_nilai_rujukan": "6 - 12",
              "nilai_kritis_tampilan_nilai_kritis": null,
              "is_rekomendasi_nilai_rujukan": true,
              "kode": "CT",
              "nama": "Masa Pembekuan (CT)",
              "satuan": "Menit",
              "metode": " ",
              "no_urut": 1106,
              "jenis_input": "A",
              "is_tampilkan_waktu_periksa": false,
              "is_flag_nilai_rujukan": true,
              "is_flag_nilai_kritis": false,
              "kategori_pemeriksaan": {
                "nama": "HEMATOLOGI",
                "kode": "HEMA",
                "no_urut": 1
              },
              "sub_kategori_pemeriksaan": {
                "nama": "Faal Hemostatik",
                "kode": "HEMA2",
                "no_urut": 2
              },
              "flag": {
                "nama": null,
                "kode": null,
                "warna": null,
                "jenis_pewarnaan": null
              },
              "waktu_pelaporan_kritis": null,
              "catatan_pemeriksaan": null,
              "status_kritis": 0,
              "nama_pelapor_nilai_kritis": null,
              "nama_penerima_pelaporan_kritis": null,
              "image_item_pemeriksaan": null,
              "total_duplo": 0
            },
            {
              "id": 11186,
              "status_item_pemeriksaan": 0,
              "waktu_pemeriksaan_di_isi": null,
              "verifikasi": false,
              "waktu_verifikasi": null,
              "hasil_pemeriksaan": null,
              "keterangan": null,
              "is_duplo": false,
              "tampilan_nilai_rujukan": "1 - 3",
              "nilai_kritis_tampilan_nilai_kritis": null,
              "is_rekomendasi_nilai_rujukan": true,
              "kode": "BT",
              "nama": "Masa Pendarahan (BT)",
              "satuan": "Menit",
              "metode": " ",
              "no_urut": 1107,
              "jenis_input": "A",
              "is_tampilkan_waktu_periksa": false,
              "is_flag_nilai_rujukan": true,
              "is_flag_nilai_kritis": false,
              "kategori_pemeriksaan": {
                "nama": "HEMATOLOGI",
                "kode": "HEMA",
                "no_urut": 1
              },
              "sub_kategori_pemeriksaan": {
                "nama": "Faal Hemostatik",
                "kode": "HEMA2",
                "no_urut": 2
              },
              "flag": {
                "nama": null,
                "kode": null,
                "warna": null,
                "jenis_pewarnaan": null
              },
              "waktu_pelaporan_kritis": null,
              "catatan_pemeriksaan": null,
              "status_kritis": 0,
              "nama_pelapor_nilai_kritis": null,
              "nama_penerima_pelaporan_kritis": null,
              "image_item_pemeriksaan": null,
              "total_duplo": 0
            },
            {
              "id": 11187,
              "status_item_pemeriksaan": 0,
              "waktu_pemeriksaan_di_isi": null,
              "verifikasi": false,
              "waktu_verifikasi": null,
              "hasil_pemeriksaan": null,
              "keterangan": null,
              "is_duplo": false,
              "tampilan_nilai_rujukan": "< 25",
              "nilai_kritis_tampilan_nilai_kritis": null,
              "is_rekomendasi_nilai_rujukan": true,
              "kode": "SGOT",
              "nama": "SGOT",
              "satuan": "u/L",
              "metode": "IFCC",
              "no_urut": 2002,
              "jenis_input": "A",
              "is_tampilkan_waktu_periksa": false,
              "is_flag_nilai_rujukan": true,
              "is_flag_nilai_kritis": false,
              "kategori_pemeriksaan": {
                "nama": "KIMIA KLINIK",
                "kode": "KIM",
                "no_urut": 2
              },
              "sub_kategori_pemeriksaan": {
                "nama": "Test Faal Hati",
                "kode": "KIM1",
                "no_urut": 1
              },
              "flag": {
                "nama": null,
                "kode": null,
                "warna": null,
                "jenis_pewarnaan": null
              },
              "waktu_pelaporan_kritis": null,
              "catatan_pemeriksaan": null,
              "status_kritis": 0,
              "nama_pelapor_nilai_kritis": null,
              "nama_penerima_pelaporan_kritis": null,
              "image_item_pemeriksaan": null,
              "total_duplo": 0
            }
          ]
        }
      }
    };
  },
  components: {
    // BlankMarginTop,
    FooterLayout,
    CatatanPemeriksaan,
    Header,
    HeaderPatientDescription,
    HeaderDetailPemeriksaanLongText,
    PatientDescription,
    HeaderDetailPemeriksaan,
    DetailPemeriksaan,
    KategoriPemeriksaan,
    SubKategoriPemeriksaan,
    FormatLongText
  }
};
</script>

<style scoped>
.pagebreak {
  clear: both;
  page-break-after: always;
}
.margin_left {
  margin-left: 10mm;
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
.pemeriksaan-list{
  margin-top: 2mm;
}
.catatan_pemeriksaan {
  margin-top: 2mm;
}
footer {
  page-break-after: always;
  position: fixed;
  display:block;
  bottom: 0;
  width: 100%
}
footer p{
  font-size: 10pt;
  margin-block-start: 0em;
    margin-block-end: 0em;
}
</style>