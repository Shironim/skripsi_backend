import connection from "../config/db.js";

const getAllUsers = () => {
  const SQLQuery = "SELECT * FROM users";

  return connection.execute(SQLQuery);
};

const getUserById = (id_user) => {
  const SQLQuery = `SELECT nama_depan FROM users WHERE id_user = ${id_user}`;

  return connection.execute(SQLQuery);
};

const checkUser = (email) => {
  const SQLQuery = `SELECT email, password, id_user, nama_depan FROM users WHERE email = '${email}' LIMIT 1`;

  return connection.execute(SQLQuery);
};

const checkAdmin = (body) => {
  const SQLQuery = `SELECT * FROM admin WHERE email = ${body.email} AND password = ${body.password}} LIMIT 1`;

  return connection.execute(SQLQuery);
};

const registerUser = (
  nama_depan,
  nama_belakang,
  email,
  password,
  alamat,
  no_hp
) => {
  console.log("ini query registerUser");
  const SQLQuery = `INSERT INTO users (nama_depan, nama_belakang, email, password, alamat, no_hp) VALUES ("${nama_depan}", "${nama_belakang}", "${email}", "${password}", "${alamat}", "${no_hp}")`;

  return connection.execute(SQLQuery);
};

const getAllCart = (user_id) => {
  const SQLQuery = `SELECT cart.*, produk.nama, produk.harga, produk.status, produk.thumbnail FROM keranjang_belanja AS cart 
                    JOIN produk ON cart.id_produk = produk.id_produk
                    WHERE cart.id_user = ${user_id}`;

  return connection.execute(SQLQuery);
};

const getIncomePerMonth = () => {
  const SQLQuery = `SELECT status_sewa, YEAR(created_at) AS tahun, MONTH(created_at) AS bulan, SUM(total_harga) AS total_revenue 
                    FROM invoice  
                    GROUP BY tahun, bulan, status_sewa 
                    ORDER BY tahun, bulan, status_sewa;
`;

  return connection.execute(SQLQuery);
};

const addToCart = (id_user, id_produk) => {
  const SQLQuery = `INSERT INTO keranjang_belanja (id_user, id_produk, jumlah_hari, tanggal_sewa ) VALUES (${id_user}, ${id_produk}, 1, NOW())`;

  return connection.execute(SQLQuery);
};

const updateTanggalSewaCart = (tanggal_sewa, id_cart) => {
  const SQLQuery = `UPDATE keranjang_belanja SET tanggal_sewa = str_to_date('${tanggal_sewa}','%Y-%m-%d') WHERE id_cart = ${id_cart}`;

  return connection.execute(SQLQuery);
};

const updatJumlahHariCart = (jumlah_hari, id_cart) => {
  const SQLQuery = `UPDATE keranjang_belanja SET jumlah_hari = ${jumlah_hari} WHERE id_cart = ${id_cart}`;

  return connection.execute(SQLQuery);
};

const deleteCart = (id_cart) => {
  const SQLQuery = `DELETE FROM keranjang_belanja WHERE id_cart = ${id_cart}`;

  return connection.execute(SQLQuery);
};

const getCartById = () => {
  const SQLQuery = "SELECT * FROM keranjang_belanja";

  return connection.execute(SQLQuery);
};

export default {
  getAllUsers,
  getUserById,
  checkUser,
  checkAdmin,
  registerUser,
  getAllCart,
  getIncomePerMonth,
  addToCart,
  updateTanggalSewaCart,
  updatJumlahHariCart,
  deleteCart,
  getCartById
};
