import UsersModel from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const getAllUsers = async (req, res) => {
  try {
    const [data] = await UsersModel.getAllUsers();
    res.json({
      message: 'GET all users success',
      data: data
    })
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error,
    })
  }
}
const getAllProduk = async (req, res) => {
  try {
    const [data] = await UsersModel.getAllProduct();
    res.json({
      message: 'GET all Produk success',
      data: data
    })
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error,
    })
  }
}

const getProductById = async (req, res) => {
  try {
    console.log(req.params.id)
    const [data] = await UsersModel.getProductById(req.params.id);
    res.json({
      message: 'GET Produk by id success',
      data: data
    })
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error,
    })
  }
}

const getAllCart = async (req, res) => {
  try {
    console.log(req.params.id)
    const [data] = await UsersModel.getAllCart(req.params.id);
    res.json({
      message: 'GET All chart ',
      data: data
    })
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error,
    })
  }
}

const saveToCart = async (req, res) => {
  try {
    const { id_user, id_produk } = req.body;
    const [data] = await UsersModel.addToCart(id_user, id_produk);
    console.log('user', id_user)
    console.log('produk', id_produk)
    res.json({
      message: 'Add to cart success',
      data: data
    })
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error,
    })
  }
}
const changeTanggalSewa = async (req, res) => {
  try {
    const { tanggal_sewa, id_cart } = req.body;
    console.log(tanggal_sewa, id_cart)
    const [data] = await UsersModel.updateTanggalSewaCart(tanggal_sewa, id_cart);
    res.json({
      message: 'Update tanggal sewa success',
      data: data
    })
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error,
    })
  }
}
const changeJumlahHari = async (req, res) => {
  try {
    const { jumlah_hari, id_cart } = req.body;
    console.log(jumlah_hari, id_cart)
    const [data] = await UsersModel.updatJumlahHariCart(jumlah_hari, id_cart);
    res.json({
      message: 'Update tanggal sewa success',
      data: data
    })
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error,
    })
  }
}

const deleteCart = async (req, res) => {
  try {
    const { id_cart } = req.body;
    const [data] = await UsersModel.deleteCart(id_cart);
    res.json({
      message: 'Delete cart success',
      data: data
    })
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error,
    })
  }
}

const createInvoice = async (req, res) => {
  console.log(req.body)
  try {
    const { id_user, produk, tanggal_sewa, tanggal_kembali, total_harga, status_sewa } = req.body;
    const [data] = await UsersModel.createInvoice(id_user, produk, tanggal_sewa, tanggal_kembali, total_harga, status_sewa);
    res.json({
      message: 'Create Invoice success',
      data: data
    })
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error,
    })
  }
}
const addProduct = async (req, res) => {
  console.log(req.body)
  try {
    const {nama, merk, harga, deskripsi, type_produk, status} = req.body;
    const [data] = await UsersModel.addProduct(nama, merk, harga, deskripsi, type_produk, status);
    res.json({
      message: 'ADD Product success',
      data: data
    })
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error,
    })
  }
}
const selectInvoiceById = async (req, res) => {
  try {
    const { id_invoice } = req.body;
    const [data] = await UsersModel.selectInvoiceById(id_invoice);
    res.json({
      message: 'GET Invoice',
      data: data
    })
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error,
    })
  }
}

const getAllProdukByInvoice = async (req, res) => {
  try {
    const { produk } = req.body;
    console.log(produk)
    const [data] = await UsersModel.getAllProdukByInvoice(produk);
    res.json({
      message: 'GELL ALL Produk by Invoice',
      data: data
    })
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error,
    })
  }
}
const getAllInvoice = async (req, res) => {
  try {
    const [data] = await UsersModel.getAllInvoice();
    res.json({
      message: 'GELL ALL Invoice',
      data: data
    })
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error,
    })
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [validUser] = await UsersModel.checkUser(email);
    // console.log('user : ', validUser)
    if (validUser && (await bcrypt.compare(password, validUser[0].password))) {
      // Create token
      const token = jwt.sign(
        { id_user: validUser[0].id_user, email },
        process.env.TOKEN_KEY,
        {}
      );
      // save user token
      validUser.token = token;
      // console.log('user : ', validUser)
      // user
      res.status(200).json(validUser);
    }else{
      res.status(400).send("Invalid Credentials");
    }

  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error,
    })
  }
}

const registerUser = async (req, res) => {
  try {
    console.log('body : ', req.body)
    const { nama_depan, nama_belakang, email, password, alamat, no_hp } = req.body;

    const [oldUser] = await UsersModel.checkUser(email);

    if (oldUser.length > 0) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    // //Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);
    // console.log('encrypt pass : ', encryptedPassword)
    const [data] = await UsersModel.registerUser(nama_depan, nama_belakang, email, encryptedPassword, alamat, no_hp);
    // return new user
    res.status(201)
        .json({
          message: 'Register user success',
          data: data
        })
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error,
    })
  }
}

const validateEmail = (email) => {
  return email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export default {
  getAllUsers,
  getAllProduk,
  getProductById,
  registerUser,
  saveToCart,
  getAllCart,
  changeTanggalSewa,
  changeJumlahHari,
  deleteCart,
  createInvoice,
  selectInvoiceById,
  getAllProdukByInvoice,
  loginUser,
  getAllInvoice,
  addProduct
}
