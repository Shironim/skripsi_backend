import connection from "../config/db.js";

const getProductFromRasa = (merk, kategori, seri, rentang_fokus) => {
  let queryLike = "";
  if (kategori) {
    queryLike += `type_produk LIKE '%${kategori}%' AND `;
    if (merk) {
      queryLike += `merk LIKE '%${merk}%' AND `;
    }
    if (seri) {
      queryLike += `nama LIKE '%${seri}%' AND `;
    }
    if (rentang_fokus) {
      queryLike += `rentang_fokus LIKE '%${rentang_fokus}%' AND `;
    }
  } else {
    if (merk) {
      queryLike += `merk LIKE '%${merk}%' AND `;
    }
    if (seri) {
      queryLike += `nama LIKE '%${seri}%' AND `;
    }
    if (rentang_fokus) {
      queryLike += `rentang_fokus LIKE '%${rentang_fokus}%' AND `;
    }
  }

  let queryWhere = "";
  if (queryLike !== "") {
    queryWhere = "WHERE " + queryLike.slice(0, -5) + " AND status = 'tersedia'"; // Menghapus "AND" terakhir
  } else {
    queryWhere = "WHERE status = 'tersedia'";
  }

  const SQLQuery = `SELECT id_produk, nama, thumbnail, harga FROM produk ${queryWhere}`;
  console.log("SQLQuery", SQLQuery);
  return connection.execute(SQLQuery);
};

const getSeveralProduct = (produk) => {
  console.log("produk db", produk);
  const id = produk.map((item) => item).join(",");
  const SQLQuery = `SELECT nama, harga, thumbnail, id_produk, merk, slug, deskripsi, type_produk, spesifikasi_detail FROM produk WHERE id_produk IN (${id})`;

  return connection.execute(SQLQuery);
};

export default { getProductFromRasa, getSeveralProduct };