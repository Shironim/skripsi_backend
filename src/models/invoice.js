import connection from "../config/db.js";

const selectInvoiceById = (kodeInvoice) => {
  const SQLQuery = `SELECT * FROM invoice WHERE kode_invoice = '${kodeInvoice}' LIMIT 1`;

  return connection.execute(SQLQuery);
};
const getAllInvoice = () => {
  const SQLQuery = `SELECT * FROM invoice`;

  return connection.execute(SQLQuery);
};

const createInvoice = (
  nama_user,
  email_user,
  tanggal_diambil,
  tanggal_dikembalikan,
  produk,
  totalHarga,
  kode_invoice
) => {
  const SQLQuery = `INSERT INTO invoice 
  (nama_penyewa,kode_invoice, email_penyewa, produk,created_at, tanggal_sewa, tanggal_kembali, total_harga, status_sewa) 
  VALUES ('${nama_user}', '${kode_invoice}', '${email_user}', JSON_ARRAY(${produk}),NOW() , str_to_date('${tanggal_diambil}','%d/%m/%Y'),
   str_to_date('${tanggal_dikembalikan}','%d/%m/%Y'), ${totalHarga}, 'belum_bayar')`;

  return connection.execute(SQLQuery);
};

const deleteInvoiceByKode = (kodeInvoice) => {
  const SQLQuery = `DELETE FROM invoice WHERE kode_invoice = '${kodeInvoice}'`;

  return connection.execute(SQLQuery);
};
const updateInvoiceByKode = (kodeInvoice, status_sewa, bukti_pembayaran) => {
  let pembayaran = "";
  let date = "";
  switch (status_sewa) {
    case "dp":
      pembayaran = "bukti_dp";
      date = "tgl_bayar_dp";
      break;

    case "lunas":
      pembayaran = "bukti_pelunasan";
      date = "tgl_pelunasan";
      break;

    default:
      pembayaran = "default";
      break;
  }
  const SQLQuery = `UPDATE invoice SET 
  status_sewa = '${status_sewa}', 
  updated_at = NOW(),
  ${pembayaran} = '${bukti_pembayaran}' ,
  ${date} = NOW() 
  WHERE kode_invoice = '${kodeInvoice}'`;

  return connection.execute(SQLQuery);
};

export default {
  selectInvoiceById,
  getAllInvoice,
  createInvoice,
  deleteInvoiceByKode,
  updateInvoiceByKode,
};
