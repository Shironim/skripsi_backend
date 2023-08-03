import express from 'express';
import userController from './controllers/userController.js';

const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'API is running, you can use this API with /tokplay',
  });
});
app.get('/user', userController.getAllUsers);
app.get('/produk', userController.getAllProduk);
// app.use('/tokplay', videoRouter);

app.use((err, res) => {
  res.json({
    message: err.message
  })
})

app.listen(PORT, () => {
  console.log(`Server berhasil di running http://localhost:${PORT}`);
})