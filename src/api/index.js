import userController from "../controllers/userController.js";
import adminController from "../controllers/adminController.js";
import rasaController from "../controllers/rasaController.js";
import invoiceController from "../controllers/invoiceController.js";
import productController from "../controllers/productController.js";
import pengembalianController from "../controllers/pengembalianController.js";
import multer from "../middleware/multer.js";

import express from "express";

const router = express.Router();
router.get("/incomepermonth", adminController.getIncomePerMonth);

router.get("/search/:search", userController.getSearchProduct);

// SEND INVOICE EMAIL
router.post("/send-invoice", rasaController.postInvoiceFromRasa);
// GET PRODUCT BY ID
router.post("/getSeveralProduct", rasaController.getSeveralProduct);
// Search Produk Based On Rasa NLU
router.post("/search-produk", rasaController.getProductFromRasa);

// INVOICE
router.get("/allinvoice/", invoiceController.getAllInvoice);
router.get("/invoice/:kodeInvoice", invoiceController.selectInvoiceById);
router.post("/invoice/", invoiceController.createInvoice);
router.patch("/invoice/", invoiceController.updateInvoiceByKode);
router.delete("/invoice/", invoiceController.deleteInvoiceByKode);

// PRODUCT
router.get("/produk-invoice/", productController.getAllProdukByInvoice);
router.get("/produk", productController.getAllProduk);
router.get("/produk/:slug", productController.getProductById);
router.post("/addproduct/", productController.addProduct);
router.patch("/produk", productController.updateProdukById);
router.delete("/produk", productController.deleteProdukById);

// PENGEMBALIAN
router.get("/pengembalian", pengembalianController.getAllPengembalian);
router.get(
  "/pengembalian/:kodeinvoice",
  pengembalianController.getDetailPengembalianByInvoice
);
router.patch("/pengembalian", pengembalianController.updatePengembalianByKode);

router.post("/upload", multer.single("file"), (req, res) => {
  res.status(200).send("Upload Success ");
});

export default router;