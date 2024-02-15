import produkModel from "../models/produk.js";

const getAllProdukByInvoice = async (req, res) => {
  try {
    const { produk } = req.body;
    console.log(produk);
    const [data] = await produkModel.getAllProdukByInvoice(produk);
    res.json({
      message: "GELL ALL Produk by Invoice",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const getAllProduk = async (req, res) => {
  try {
    console.log("getAllProduk Called");
    const [data] = await produkModel.getAllProduct();
    res.json({
      message: "GET all Produk success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const addProduct = async (req, res) => {
  console.log(req.body);
  try {
    const {
      nama,
      merk,
      harga,
      deskripsi,
      type_produk,
      status,
      spesifikasi,
      focal_length,
      thumbnail,
    } = req.body;
    const slug = nama.replace(/\s+/g, "-").toLowerCase();
    const [data] = await produkModel.addProduct(
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
    );
    res.json({
      message: "Add Product success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const updateProdukById = async (req, res) => {
  console.log("updateProdukById Called");
  try {
    const {
      idProduk,
      nama,
      merk,
      harga,
      deskripsi,
      type_produk,
      focal_length,
      spesifikasi,
      thumbnail,
    } = req.body;
    // console.log("req.body", req.body);
    // console.log("thumbnail", thumbnail);
    const slug = nama.replace(/\s+/g, "-").toLowerCase();
    if (thumbnail !== undefined) {
      // console.log("thumbnail undefined", thumbnail);
      await produkModel.updateProdukByIdWithThumb(
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
      );
    } else {
      await produkModel.updateProdukByIdWithoutThumb(
        idProduk,
        nama,
        merk,
        harga,
        deskripsi,
        type_produk,
        focal_length,
        spesifikasi,
        slug
      );
    }
    res.json({
      message: "Update produk success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const deleteProdukById = async (req, res) => {
  try {
    const { idProduk } = req.body;
    await produkModel.deleteProdukById(idProduk);
    res.json({
      message: "Delete produk success",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    console.log("getProductById Called");
    // console.log(req.params.id)
    const [data] = await produkModel.getProductById(req.params.slug);
    res.json({
      message: "GET Produk by id success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

export default {
  getAllProdukByInvoice,
  getAllProduk,
  addProduct,
  updateProdukById,
  deleteProdukById,
  getProductById,
};
