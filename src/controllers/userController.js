import UsersModel from '../models/user.js';

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
const registerUser = async (req, res) => {
  try {
    const {nama_depan, nama_belakang, email, password, alamat, no_hp} = req.body;
    console.log(validateEmail(email));
    // const [data] = await UsersModel.registerUser(nama_depan, nama_belakang, email, password, alamat, no_hp);
    // res.json({
    //   message: 'Register user success',
    //   data: data
    // })
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
  registerUser
}