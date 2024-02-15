import invoiceModel from "../models/invoice.js";

const getAllInvoice = async (req, res) => {
  try {
    const [data] = await invoiceModel.getAllInvoice();
    res.json({
      message: "GELL ALL Invoice",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const deleteInvoiceByKode = async (req, res) => {
  console.log("deleteInvoice Called");
  try {
    const { kodeInvoice } = req.body;
    const [data] = await invoiceModel.deleteInvoiceByKode(kodeInvoice);
    res.json({
      message: "Delete Invoice success",
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

const updateInvoiceByKode = async (req, res) => {
  console.log("updateInvoiceByKode Called");
  try {
    const { kodeInvoice, status_sewa, bukti_pembayaran } = req.body;
    const [data] = await invoiceModel.updateInvoiceByKode(
      kodeInvoice,
      status_sewa,
      bukti_pembayaran
    );
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

const createInvoice = async (req, res) => {
  console.log(req.body);
  console.log("createInvoice Called");
  try {
    const {
      id_user,
      produk,
      tanggal_sewa,
      tanggal_kembali,
      total_harga,
      status_sewa,
    } = req.body;
    const [data] = await invoiceModel.createInvoice(
      id_user,
      produk,
      tanggal_sewa,
      tanggal_kembali,
      total_harga,
      status_sewa
    );
    res.json({
      message: "Create Invoice success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const selectInvoiceById = async (req, res) => {
  console.log("selectInvoiceById Called");
  try {
    const [data] = await invoiceModel.selectInvoiceById(req.params.kodeInvoice);
    res.json({
      message: "GET Invoice",
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
  selectInvoiceById,
  getAllInvoice,
  createInvoice,
  deleteInvoiceByKode,
  updateInvoiceByKode,
};
