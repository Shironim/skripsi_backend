import pengembalianModel from "../models/pengembalian.js";
import produkModel from "../models/produk.js";

const updatePengembalianByKode = async (req, res) => {
  console.log("updateInvoiceByKode Called");
  try {
    const { kodeInvoice, status_pengembalian, bukti_pengembalian, produk } =
      req.body;
    const [data] = await pengembalianModel.updatePengembalianByKode(
      kodeInvoice,
      status_pengembalian,
      bukti_pengembalian
    );
    if (status_pengembalian === "dikembalikan") {
      for (let index = 0; index < produk.length; index++) {
        await produkModel.updateStatusProduk("tersedia", produk[index]);
      }
    }
    res.json({
      message: "Update Invoice success",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const getDetailPengembalianByInvoice = async (req, res) => {
  try {
    const [data] = await pengembalianModel.getDetailPengembalianByInvoice(
      req.params.kodeinvoice
    );
    res.json({
      message: "GELL Detail Pengembalian Invoice",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const getAllPengembalian = async (req, res) => {
  try {
    console.log("getAllPengembalian Called");
    const [data] = await pengembalianModel.getAllPengembalian();
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

export default {
  getAllPengembalian,
  getDetailPengembalianByInvoice,
  updatePengembalianByKode,
};
