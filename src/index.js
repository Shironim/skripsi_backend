import userController from './controllers/userController.js';
import express from 'express';
import dotenv from 'dotenv';
import auth from './middleware/auth.js';
import multer from './middleware/multer.js';
const app = express();

const PORT = process.env.PORT || 3000;

dotenv.config();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
  app.use(express.json());
});
app.use(express.static('public'));
app.get('/', (req, res) => {
  res.json({
    message: 'API is running, you can use this API with /tokplay',
  });
});
// app.get('/user', userController.getAllUsers);
app.get('/produk', userController.getAllProduk);
app.get('/produk/:id', userController.getProductById);
app.post('/register', userController.registerUser);
app.post('/login', userController.loginUser);

// app.use('/user', auth)
app.get('/getcart/:id', userController.getAllCart);
app.post('/addcart', userController.saveToCart);
app.post('/invoice/', userController.createInvoice);
app.patch('/tanggalSewa/', userController.changeTanggalSewa);
app.patch('/jumlahHariSewa/', userController.changeJumlahHari);
app.delete('/cart/', userController.deleteCart);

app.post('/invoice/', userController.createInvoice);
app.get('/invoice/', userController.selectInvoiceById);
app.get('/allinvoice/', userController.getAllInvoice);
app.post('/addproduct/', multer.single('photo'), userController.addProduct);
app.get('/produk-invoice/', userController.getAllProdukByInvoice);
app.post('/upload', multer.single('photo'), (req, res) => {
  res.status(200).send("Welcome 🙌 ");
})
app.get("/welcome", auth, (req, res) => {
  console.log(req.user)
  res.status(200).send("Welcome 🙌 ");
});
app.use((err, res) => {
  res.json({
    message: err.message
  })
})

app.listen(PORT, () => {
  console.log(`Server berhasil di running http://localhost:${PORT}`);
})