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
      data: JSON.parse(data[0].spesifikasi_detail)
    })
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error,
    })
  }
}

export default {
  getAllUsers,
  getAllProduk
}