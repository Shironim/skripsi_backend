import connection from "../config/db.js";

const getAllProduct = () => {
  const SQLQuery = "SELECT * FROM produk";

  return connection.execute(SQLQuery);
};

const getSearchProduct = (nama) => {
  let SQLQuery = "";
  if (nama === "all") {
    SQLQuery = `SELECT * FROM produk`;
  } else {
    SQLQuery = `SELECT * FROM produk WHERE nama LIKE '%${nama}%'`;
  }

  return connection.execute(SQLQuery);
};

const getProductById = (slug) => {
  const SQLQuery = `SELECT * FROM produk WHERE slug = "${slug}" LIMIT 1`;

  return connection.execute(SQLQuery);
};

const updateStatusProduk = (status, idProduk) => {
  const SQLQuery = `UPDATE produk SET status = "${status}" WHERE id_produk = ${idProduk}`;

  return connection.execute(SQLQuery);
};

const deleteProdukById = (idProduk) => {
  const SQLQuery = `DELETE FROM produk WHERE id_produk = '${idProduk}'`;

  return connection.execute(SQLQuery);
};

const addProduct = (
  nama,
  merk,
  harga,
  deskripsi,
  type_produk,
  status,
  spesifikasi,
  focal_length,
  thumbnail,
  slug
) => {
  let spek = JSON.stringify(spesifikasi);

  const SQLQuery = `INSERT INTO produk (nama, merk, harga, deskripsi, type_produk,rentang_fokus, status, spesifikasi_detail, thumbnail, slug, created_at) VALUES (
    "${nama}", 
    "${merk}", 
    "${harga}", 
    "${deskripsi}", 
    "${type_produk}", 
    "${focal_length}", 
    "${status}",
    '${spek}',
    "${thumbnail}",
    "${slug}",
    NOW()
    )`;
  return connection.execute(SQLQuery);
};

const updateProdukByIdWithThumb = (
  idProduk,
  nama,
  merk,
  harga,
  deskripsi,
  type_produk,
  focal_length,
  spesifikasi,
  thumbnail,
  slug
) => {
  let spek = JSON.stringify(spesifikasi);

  const SQLQuery = `UPDATE produk SET 
  nama = '${nama}', 
  merk = '${merk}',
  harga = '${harga}',
  deskripsi = '${deskripsi}',
  type_produk = '${type_produk}',
  rentang_fokus = '${focal_length}',
  spesifikasi_detail = '${spek}',
  thumbnail = '${thumbnail}',
  slug = '${slug}',
  updated_at = NOW()
  WHERE id_produk = '${idProduk}'`;

  return connection.execute(SQLQuery);
};

const updateProdukByIdWithoutThumb = (
  idProduk,
  nama,
  merk,
  harga,
  deskripsi,
  type_produk,
  focal_length,
  spesifikasi,
  slug
) => {
  let spek = JSON.stringify(spesifikasi);

  const SQLQuery = `UPDATE produk SET 
  nama = '${nama}', 
  merk = '${merk}',
  harga = '${harga}',
  deskripsi = '${deskripsi}',
  type_produk = '${type_produk}',
  rentang_fokus = '${focal_length}',
  spesifikasi_detail = '${spek}',
  slug = '${slug}',
  updated_at = NOW()
  WHERE id_produk = '${idProduk}'`;

  return connection.execute(SQLQuery);
};

const getAllProdukByInvoice = (produk) => {
  const SQLQuery = `SELECT * FROM produk WHERE id_produk in (${produk})`;

  return connection.execute(SQLQuery);
};

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
};

const deleteProductById = (body) => {
  const SQLQuery = `DELETE FROM produk WHERE id_produk = ${body.id_produk}`;

  return connection.execute(SQLQuery);
};

export default {
  getAllProduct,
  getSearchProduct,
  getProductById,
  updateStatusProduk,
  deleteProdukById,
  addProduct,
  updateProdukByIdWithThumb,
  updateProdukByIdWithoutThumb,
  getAllProdukByInvoice,
  updateProductById,
  deleteProductById,
};
