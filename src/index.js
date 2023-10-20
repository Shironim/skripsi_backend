import userController from './controllers/userController.js';
import express from 'express';
import dotenv from 'dotenv';
import {verifyToken} from './middleware/auth.js';
import multer from './middleware/multer.js';
import bodyParser from 'body-parser';
const app = express();

const PORT = process.env.PORT || 3000;

dotenv.config();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
app.get('/', (req, res) => {
  res.json({
    message: 'API is running, you can use this API with /tokplay',
  });
});

// RASA ENDPOINT
// GET Product Information by id -> when user click on product
// app.get('/produk/:id', userController.getProductById);
// GET Product Information by name and category -> return spesification product and availability today
app.get('/produk/:merk/:seri/:kategori', userController.getProductFromRasa);
// SEND INVOICE EMAIL
app.post("/send-invoice", userController.postInvoiceFromRasa);



// app.get('/user', userController.getAllUsers);
app.get('/produk', userController.getAllProduk);
app.get('/produk/:id', userController.getProductById);
app.post('/register', userController.registerUser);
app.post('/login', userController.loginUser);
app.get('/user', userController.getUserById);

// app.use('/user', auth)
app.get('/getcart', userController.getAllCart);
app.post('/addcart', userController.saveToCart);
app.patch('/updatecart', userController.changeJumlahHari);
app.patch('/tanggalsewa', userController.changeTanggalSewa);
// app.patch('/jumlahHariSewa/', userController.changeJumlahHari);
app.delete('/cart/', userController.deleteCart);
app.post('/invoice/', userController.createInvoice);

app.post('/invoice/', userController.createInvoice);
app.get('/invoice/', userController.selectInvoiceById);
app.get('/allinvoice/', userController.getAllInvoice);
app.post('/addproduct/', multer.single('photo'), userController.addProduct);
app.get('/produk-invoice/', userController.getAllProdukByInvoice);
app.post('/upload', multer.single('photo'), (req, res) => {
  res.status(200).send("Welcome 🙌 ");
})
app.get("/welcome", verifyToken, (req, res) => {
  console.log('req.user index', req.user.id_user)
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