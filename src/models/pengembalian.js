import connection from "../config/db.js";

const createdPengembalian = (kodeInvoice) => {
  console.log("ini query createdPengembalian");
  const SQLQuery = `INSERT INTO pengembalian (kode_invoice, created_at, status_pengembalian) VALUES ("${kodeInvoice}", NOW(), 'belum_diambil')`;

  return connection.execute(SQLQuery);
};

const getAllPengembalian = () => {
  const SQLQuery = `SELECT pengembalian.*, invoice.nama_penyewa FROM pengembalian JOIN invoice ON pengembalian.kode_invoice = invoice.kode_invoice`;

  return connection.execute(SQLQuery);
};
const getDetailPengembalianByInvoice = (kodeInvoice) => {
  const SQLQuery = `SELECT pengembalian.*, invoice.* FROM pengembalian JOIN invoice ON pengembalian.kode_invoice = invoice.kode_invoice WHERE pengembalian.kode_invoice = '${kodeInvoice}'`;

  return connection.execute(SQLQuery);
};

const updatePengembalianByKode = (
  kodeInvoice,
  status_pengembalian,
  bukti_pengembalian
) => {
  let pengembalian = "";
  let date = "";
  switch (status_pengembalian) {
    case "diambil":
      pengembalian = "bukti_ambil";
      date = "tgl_ambil";
      break;

    case "dikembalikan":
      pengembalian = "bukti_kembali";
      date = "tgl_kembali";
      break;

    default:
      pengembalian = "default";
      break;
  }
  const SQLQuery = `UPDATE pengembalian SET 
  status_pengembalian = '${status_pengembalian}', 
  updated_at = NOW(),
  ${pengembalian} = '${bukti_pengembalian}',
  ${date} = NOW() 
  WHERE kode_invoice = '${kodeInvoice}'`;

  return connection.execute(SQLQuery);
};

export default {
  createdPengembalian,
  getAllPengembalian,
  getDetailPengembalianByInvoice,
  updatePengembalianByKode,
};
