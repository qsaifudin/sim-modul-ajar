<?php
include "../includes/func.inc.php";

$db_user = "PA0014";
$db_pass = "598093";

$connect = konekDb($db_user, $db_pass);

if (!$connect) {
    die("Koneksi Tidak Berhasil: ");
}
