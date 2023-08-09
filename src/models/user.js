import connection from "../config/db.js";

const getAllUsers = () => {
  const SQLQuery = 'SELECT * FROM users';

  return connection.execute(SQLQuery);
}
const checkUser = (body) => {
  const SQLQuery = `SELECT * FROM users WHERE email = ${body.email} AND password = ${body.password}} LIMIT 1`;

  return connection.execute(SQLQuery);
}
const checkAdmin = (body) => {
  const SQLQuery = `SELECT * FROM admin WHERE email = ${body.email} AND password = ${body.password}} LIMIT 1`;

  return connection.execute(SQLQuery);
}
const registerUser = (nama_depan, nama_belakang, email, password, alamat, no_hp) => {
  const SQLQuery = `INSERT INTO users (nama_depan, nama_belakang, email, password, alamat, no_hp) VALUES ("${nama_depan}", "${nama_belakang}", "${email}", "${password}", "${alamat}", "${no_hp}")`;

  return connection.execute(SQLQuery);
}
const getAllProduct = () => {
  const SQLQuery = 'SELECT * FROM produk';

  return connection.execute(SQLQuery);
}
const getAllCart = (body) => {
  const SQLQuery = `SELECT cart.* users.* FROM keranjang_belanja AS cart JOIN users ON cart.id_user = ${body.id}`;

  return connection.execute(SQLQuery);
}
const addToCart = (body) => {
  const SQLQuery = `INSERT INTO keranjang_belanja (id_user, id_produk, jumlah) VALUES (, ${body.id_produk}, ${body.jumlah})`;

  return connection.execute(SQLQuery);
}
const updateCart = (body) => {
  const SQLQuery = `UPDATE SET keranjang_belanja (jumlah) VALUES (${body.jumlah}) WHERE id_user = ${body.id_user} AND id_produk = ${body.id_produk}`;

  return connection.execute(SQLQuery);
}
const deleteCart = (body) => {
  const SQLQuery = `DELETE FROM keranjang_belanja WHERE id_user = ${body.id_user} AND id_produk = ${body.id_produk}`;

  return connection.execute(SQLQuery);
}

const getCartById = () => {
  const SQLQuery = 'SELECT * FROM keranjang_belanja';

  return connection.execute(SQLQuery);
}
const getProductById = (id_produk) => {
  const SQLQuery = `SELECT * FROM produk WHERE id_produk = ${id_produk} LIMIT 1`;

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
  getAllProduct,
  getProductById,
  updateProductById,
  deleteProductById,
  getAllCart,
  getCartById,
  addToCart,
  updateCart,
  deleteCart,
  checkUser,
  registerUser
}