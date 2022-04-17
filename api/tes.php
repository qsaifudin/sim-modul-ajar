<?php
include '../includes/func.inc.php';

if (function_exists($_GET['function'])) {
    $_GET['function']();
}

function index()
{
    global $connect;

    $db_user = "PA0014";
    $db_pass = "598093";
    $con = konekDb($db_user, $db_pass);
    $Nomor = 1;

    $sql = "SELECT nama_barang, stok FROM barang WHERE nomor=:v1 ORDER BY nama_barang";
    $data = array(':v1' => $Nomor);
    $hasil = query_view($con, $sql, $data);

    oci_fetch_all($hasil, $rows, 0, 0, OCI_FETCHSTATEMENT_BY_ROW);

    $response = array(
        'status' => true,
        'message' => 'Success',
        'data' => $rows
    );

    echo json_encode($response);
}
