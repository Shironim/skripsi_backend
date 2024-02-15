import userController from "./controllers/userController.js";
import adminController from "./controllers/adminController.js";
import rasaController from "./controllers/rasaController.js";
import invoiceController from "./controllers/invoiceController.js";
import productController from "./controllers/productController.js";
import pengembalianController from "./controllers/pengembalianController.js";

import express from "express";
import dotenv from "dotenv";
// import { verifyToken } from "./middleware/auth.js";
import multer from "./middleware/multer.js";
import bodyParser from "body-parser";

const app = express();

const PORT = process.env.PORT || 3000;

dotenv.config();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, HEAD, OPTIONS, POST, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  next();
});
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.get("/", (req, res) => {
  res.json({
    message: "API is running, you can use this API with /tokplay",
  });
});

// NOT USED LOGIN SYSTEM
// app.post("/register", userController.registerUser);
// app.post("/login", userController.loginUser);
// app.get("/user", userController.getUserById);

// NOT USED CART
// app.get("/getcart", userController.getAllCart);
// app.post("/addcart", userController.saveToCart);
// app.patch("/updatecart", userController.changeJumlahHari);
// app.patch("/tanggalsewa", userController.changeTanggalSewa);
// app.delete("/cart/", userController.deleteCart);

app.get("/incomepermonth", adminController.getIncomePerMonth);

app.get("/search/:search", userController.getSearchProduct);

// SEND INVOICE EMAIL
app.post("/send-invoice", rasaController.postInvoiceFromRasa);
// GET PRODUCT BY ID
app.post("/getSeveralProduct", rasaController.getSeveralProduct);
// Search Produk Based On Rasa NLU
app.post("/search-produk", rasaController.getProductFromRasa);

// INVOICE
app.get("/allinvoice/", invoiceController.getAllInvoice);
app.get("/invoice/:kodeInvoice", invoiceController.selectInvoiceById);
app.post("/invoice/", invoiceController.createInvoice);
app.patch("/invoice/", invoiceController.updateInvoiceByKode);
app.delete("/invoice/", invoiceController.deleteInvoiceByKode);

// PRODUCT
app.get("/produk-invoice/", productController.getAllProdukByInvoice);
app.get("/produk", productController.getAllProduk);
app.get("/produk/:slug", productController.getProductById);
app.post("/addproduct/", productController.addProduct);
app.patch("/produk", productController.updateProdukById);
app.delete("/produk", productController.deleteProdukById);

// PENGEMBALIAN
app.get("/pengembalian", pengembalianController.getAllPengembalian);
app.get(
  "/pengembalian/:kodeinvoice",
  pengembalianController.getDetailPengembalianByInvoice
);  
app.patch("/pengembalian", pengembalianController.updatePengembalianByKode);

app.post("/upload", multer.single("file"), (req, res) => {
  res.status(200).send("Upload Success ");
});

app.use((err, res) => {
  res.json({
    message: err.message,
  });
});

app.listen(port, (err, res) => {
  if (err) {
      console.log(err)
      return res.status(500).send(err.message)
  } else {
      console.log('[INFO] Server Running on port:', port)
  }
})