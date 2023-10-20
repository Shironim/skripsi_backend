import connection from "../config/db.js";

const getAllUsers = () => {
  const SQLQuery = 'SELECT * FROM users';

  return connection.execute(SQLQuery);
}
const getUserById = (id_user) => {
  const SQLQuery = `SELECT nama_depan FROM users WHERE id_user = ${id_user}`;

  return connection.execute(SQLQuery);
}
const checkUser = (email) => {
  const SQLQuery = `SELECT email, password, id_user, nama_depan FROM users WHERE email = '${email}' LIMIT 1`;

  return connection.execute(SQLQuery);
}
const checkAdmin = (body) => {
  const SQLQuery = `SELECT * FROM admin WHERE email = ${body.email} AND password = ${body.password}} LIMIT 1`;

  return connection.execute(SQLQuery);
}
const registerUser = (nama_depan, nama_belakang, email, password, alamat, no_hp) => {
  console.log('ini query registerUser')
  const SQLQuery = `INSERT INTO users (nama_depan, nama_belakang, email, password, alamat, no_hp) VALUES ("${nama_depan}", "${nama_belakang}", "${email}", "${password}", "${alamat}", "${no_hp}")`;

  return connection.execute(SQLQuery);
}
const getAllProduct = () => {
  const SQLQuery = 'SELECT * FROM produk';

  return connection.execute(SQLQuery);
}

const getProductById = (id_produk) => {
  const SQLQuery = `SELECT * FROM produk WHERE id_produk = ${id_produk} LIMIT 1`;

  return connection.execute(SQLQuery);
}
const getProductFromRasa = (merk, kategori, seri) => {
  const SQLQuery = `SELECT * FROM produk WHERE nama LIKE '%${merk} ${seri}%' AND type_produk = '${kategori}'`;

  return connection.execute(SQLQuery);
}
const getSeveralProductFromRasa = (produk) => {
  const SQLQuery = `SELECT * FROM produk WHERE id_produk IN (${produk})`;

  return connection.execute(SQLQuery);
}
const createInvoice = (nama_user, email_user, tanggal_diambil, tanggal_dikembalikan, produk, totalHarga) => {
  const SQLQuery = `INSERT INTO invoice 
  (nama_penyewa, email_penyewa, produk, tanggal_sewa, tanggal_kembali, total_harga, status_sewa) 
  VALUES ('${nama_user}', '${email_user}', JSON_ARRAY(${produk}), str_to_date('${tanggal_diambil}','%Y-%m-%d'),
   str_to_date('${tanggal_dikembalikan}','%Y-%m-%d'), ${totalHarga}, 'belum_bayar')`;

  return connection.execute(SQLQuery);
}

const getAllCart = (user_id) => {
  const SQLQuery = `SELECT cart.*, produk.nama, produk.harga, produk.status, produk.thumbnail FROM keranjang_belanja AS cart 
                    JOIN produk ON cart.id_produk = produk.id_produk
                    WHERE cart.id_user = ${user_id}`;

  return connection.execute(SQLQuery);
}
const addToCart = (id_user, id_produk) => {
  const SQLQuery = `INSERT INTO keranjang_belanja (id_user, id_produk, jumlah_hari, tanggal_sewa ) VALUES (${id_user}, ${id_produk}, 1, NOW())`;

  return connection.execute(SQLQuery);
}
const updateTanggalSewaCart = (tanggal_sewa, id_cart) => {
  const SQLQuery = `UPDATE keranjang_belanja SET tanggal_sewa = str_to_date('${tanggal_sewa}','%Y-%m-%d') WHERE id_cart = ${id_cart}`;

  return connection.execute(SQLQuery);
}
const updatJumlahHariCart = (jumlah_hari, id_cart) => {
  const SQLQuery = `UPDATE keranjang_belanja SET jumlah_hari = ${jumlah_hari} WHERE id_cart = ${id_cart}`;

  return connection.execute(SQLQuery);
}
const deleteCart = (id_cart) => {
  const SQLQuery = `DELETE FROM keranjang_belanja WHERE id_cart = ${id_cart}`;

  return connection.execute(SQLQuery);
}

const addProduct = (nama, merk, harga, deskripsi, type_produk, status) => {
  const SQLQuery = `INSERT INTO produk (nama, merk, harga, deskripsi, type_produk, status) VALUES (
    "${nama}", 
    "${merk}", 
    "${harga}", 
    "${deskripsi}", 
    "${type_produk}", 
    "${status}"
    )`;

  return connection.execute(SQLQuery);
}

const selectInvoiceById = (id_invoice) => {
  const SQLQuery = `SELECT * FROM invoice WHERE id_invoice = ${id_invoice}`;

  return connection.execute(SQLQuery);
}
const getAllInvoice = () => {
  const SQLQuery = `SELECT invoice.*, users.* FROM invoice 
                    JOIN users ON invoice.id_user = users.id_user`;

  return connection.execute(SQLQuery);
}

const getAllProdukByInvoice = (produk) => {
  const SQLQuery = `SELECT * FROM produk WHERE id_produk in (${produk})`;

  return connection.execute(SQLQuery);
}

const getCartById = () => {
  const SQLQuery = 'SELECT * FROM keranjang_belanja';

  return connection.execute(SQLQuery);
}

const updateProductById = (body) => {
  const SQLQuery = `UPDATE produk SET 
                    nama = ${body.nama}
                    harga = ${body.harga}
                    thumbnail = ${body.thumbnail}
                    deskripsi = ${body.deskripsi}
                    type = ${body.type}
                    kategori = ${body.kategori}
                    perlengkapan_lain = ${body.perlengkapan_lain} 
                    WHERE id_produk = ${body.id_produk}`;

  return connection.execute(SQLQuery);
}
const deleteProductById = (body) => {
  const SQLQuery = `DELETE FROM produk WHERE id_produk = ${body.id_produk}`;

  return connection.execute(SQLQuery);
}

export default {
  getAllUsers,
  getUserById,
  getAllProduct,
  getProductById,
  updateProductById,
  deleteProductById,
  getAllCart,
  getCartById,
  addToCart,
  deleteCart,
  checkUser,
  registerUser,
  updateTanggalSewaCart,
  updatJumlahHariCart,
  createInvoice,
  selectInvoiceById,
  getAllProdukByInvoice,
  getAllInvoice,
  addProduct,
  getProductFromRasa,
  getSeveralProductFromRasa
}