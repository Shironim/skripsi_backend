import UsersModel from "../models/user.js";
import produkModel from "../models/produk.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const getAllUsers = async (req, res) => {
  try {
    console.log("getAllUser Called");
    const [data] = await UsersModel.getAllUsers();
    res.json({
      message: "GET all users success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};
const getUserById = async (req, res) => {
  try {
    console.log("getUserById Called");
    const { id_user } = req.user;
    const [data] = await UsersModel.getUserById(id_user);
    res.json({
      message: "GET all users success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const getSearchProduct = async (req, res) => {
  try {
    console.log("getSearchProduct Called");
    const [data] = await produkModel.getSearchProduct(req.params.search);
    res.json({
      message: "GET Search Produk success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const getAllCart = async (req, res) => {
  try {
    console.log("getAllCart Called");
    const { id_user } = req.user;
    const [data] = await UsersModel.getAllCart(id_user);
    res.json({
      message: "GET All chart ",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const saveToCart = async (req, res) => {
  // console.log('test', req.user)
  try {
    console.log("saveToCart Called");
    const { id_produk } = req.body;
    const { id_user } = req.user;
    const [data] = await UsersModel.addToCart(id_user, id_produk);
    res.json({
      message: "Add to cart success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const changeTanggalSewa = async (req, res) => {
  try {
    const { tanggal_sewa, id_cart } = req.body;
    // console.log(tanggal_sewa, id_cart)
    const [data] = await UsersModel.updateTanggalSewaCart(
      tanggal_sewa,
      id_cart
    );
    res.json({
      message: "Update tanggal sewa success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const changeJumlahHari = async (req, res) => {
  try {
    const { jumlah_hari, id_cart } = req.body;
    const [data] = await UsersModel.updatJumlahHariCart(jumlah_hari, id_cart);
    res.json({
      message: "Update tanggal sewa success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const deleteCart = async (req, res) => {
  try {
    const { id_cart } = req.body;
    const [data] = await UsersModel.deleteCart(id_cart);
    res.json({
      message: "Delete cart success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const updatJumlahHariCart = async (req, res) => {
  try {
    const { jumlah_hari, id_cart } = req.body;
    const [data] = await UsersModel.updatJumlahHariCart(jumlah_hari, id_cart);
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

const loginUser = async (req, res) => {
  console.log("Login Called");
  try {
    const { email, password } = req.body;

    const [validUser] = await UsersModel.checkUser(email);
    // console.log('user : ', validUser)
    if (validUser && (await bcrypt.compare(password, validUser[0].password))) {
      // Create token
      const token = jwt.sign(
        { id_user: validUser[0].id_user, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h", //expired in 2 hour
        }
      );
      // console.log('token : ', token)
      // save user token
      validUser.token = token;
      // console.log('user : ', validUser)
      // user
      res.status(200).json({
        token: validUser.token,
      });
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const registerUser = async (req, res) => {
  try {
    console.log("body : ", req.body);
    const { nama_depan, nama_belakang, email, password, alamat, no_hp } =
      req.body;

    const [oldUser] = await UsersModel.checkUser(email);

    if (oldUser.length > 0) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    // //Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);
    // console.log('encrypt pass : ', encryptedPassword)
    const [data] = await UsersModel.registerUser(
      nama_depan,
      nama_belakang,
      email,
      encryptedPassword,
      alamat,
      no_hp
    );
    // return new user
    res.status(201).json({
      message: "Register user success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const validateEmail = (email) => {
  return email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export default {
  getAllUsers,
  getUserById,
  registerUser,
  saveToCart,
  getAllCart,
  changeTanggalSewa,
  changeJumlahHari,
  deleteCart,
  loginUser,
  getSearchProduct,
};
