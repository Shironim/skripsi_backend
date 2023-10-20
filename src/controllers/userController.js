import UsersModel from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendMail from "../service/mailService.js";

const getAllUsers = async (req, res) => {
  try {
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
const getAllProduk = async (req, res) => {
  try {
    const [data] = await UsersModel.getAllProduct();
    res.json({
      message: "GET all Produk success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    // console.log(req.params.id)
    const [data] = await UsersModel.getProductById(req.params.id);
    res.json({
      message: "GET Produk by id success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};
const getProductFromRasa = async (req, res) => {
  try {
    const { merk, kategori, seri } = req.params;
    // console.log(req.params.id)
    const [data] = await UsersModel.getProductFromRasa(merk, kategori, seri);
    res.json({
      message: "GET Produk success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};
const postInvoiceFromRasa = async (req, res) => {
  const invoiceTable = () =>{
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Invoice ADMS Foto Video</title>
    
        <style>
          .invoice-box {
            max-width: 800px;
            margin: auto;
            padding: 30px;
            border: 1px solid #eee;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
            font-size: 16px;
            line-height: 24px;
            font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
            color: #555;
          }
    
          .invoice-box table {
            width: 100%;
            line-height: inherit;
            text-align: left;
          }
    
          .invoice-box table td {
            padding: 5px;
            vertical-align: top;
          }
    
          .invoice-box table tr td:nth-child(2) {
            text-align: right;
          }
    
          .invoice-box table tr.top table td {
            padding-bottom: 20px;
          }
    
          .invoice-box table tr.top table td.title {
            font-size: 45px;
            line-height: 45px;
            color: #333;
          }
    
          .invoice-box table tr.information table td {
            padding-bottom: 40px;
          }
    
          .invoice-box table tr.heading td {
            background: #eee;
            border-bottom: 1px solid #ddd;
            font-weight: bold;
          }
    
          .invoice-box table tr.details td {
            padding-bottom: 20px;
          }
    
          .invoice-box table tr.item td {
            border-bottom: 1px solid #eee;
          }
    
          .invoice-box table tr.item.last td {
            border-bottom: none;
          }
    
          .invoice-box table tr.total td:nth-child(2) {
            border-top: 2px solid #eee;
            font-weight: bold;
          }
    
          @media only screen and (max-width: 600px) {
            .invoice-box table tr.top table td {
              width: 100%;
              display: block;
              text-align: center;
            }
    
            .invoice-box table tr.information table td {
              width: 100%;
              display: block;
              text-align: center;
            }
          }
    
          /** RTL **/
          .invoice-box.rtl {
            direction: rtl;
            font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
          }
    
          .invoice-box.rtl table {
            text-align: right;
          }
    
          .invoice-box.rtl table tr td:nth-child(2) {
            text-align: left;
          }
        </style>
      </head>
    
      <body>
        <div class="invoice-box">
          <table cellpadding="0" cellspacing="0">
            <tr class="top">
              <td colspan="2">
                <table>
                  <tr>
                    <td class="title">
                      <img
                        src="https://sparksuite.github.io/simple-html-invoice-template/images/logo.png"
                        style="width: 100%; max-width: 300px"
                      />
                    </td>
    
                    <td>
                      Invoice #: 123<br />
                      Created: January 1, 2023<br />
                      Due: February 1, 2023
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
    
            <tr class="information">
              <td colspan="2">
                <table>
                  <tr>
                    <td>
                      Sparksuite, Inc.<br />
                      12345 Sunny Road<br />
                      Sunnyville, CA 12345
                    </td>
    
                    <td>
                      Acme Corp.<br />
                      John Doe<br />
                      john@example.com
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
    
            <tr class="heading">
              <td>Payment Method</td>
    
              <td>Check #</td>
            </tr>
    
            <tr class="details">
              <td>Check</td>
    
              <td>1000</td>
            </tr>
    
            <tr class="heading">
              <td>Item</td>
    
              <td>Price</td>
            </tr>
    
            <tr class="item">
              <td>Website design</td>
    
              <td>$300.00</td>
            </tr>
    
            <tr class="item">
              <td>Hosting (3 months)</td>
    
              <td>$75.00</td>
            </tr>
    
            <tr class="item last">
              <td>Domain name (1 year)</td>
    
              <td>$10.00</td>
            </tr>
    
            <tr class="total">
              <td></td>
    
              <td>Total: $385.00</td>
            </tr>
          </table>
        </div>
      </body>
    </html>
    `
  }
  // TODO
  // create invoice table
  // Send Invoice to email user

  const toDate = (inputDate) => {
    const date = new Date(inputDate); // Mengonversi string tanggal ke objek Date
    const year = date.getFullYear(); // Mendapatkan tahun
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Mendapatkan bulan (ditambah 1 karena bulan dimulai dari 0)
    const day = String(date.getDate()).padStart(2, "0"); // Mendapatkan hari

    return `${year}-${month}-${day}`;
  };
  try {
    const {
      nama_user,
      email_user,
      tanggal_diambil,
      tanggal_dikembalikan,
      produk,
    } = req.body;
    sendMail(
      "Invoice ADMS Foto Video",
      email_user,
      invoiceTable
    )
    // const [listProduk] = await UsersModel.getSeveralProductFromRasa(produk);

    // const totalHarga = listProduk.reduce((acc, curr) => {
    //   return acc.harga + curr.harga;
    // });
    // const date_diambil = new Date();
    // const date_dikembalikan = new Date();
    // date_diambil.setDate(tanggal_diambil);
    // date_dikembalikan.setDate(tanggal_dikembalikan);
    // const [data] = await UsersModel.createInvoice(
    //   nama_user,
    //   email_user,
    //   toDate(date_diambil),
    //   toDate(date_dikembalikan),
    //   produk,
    //   totalHarga * 1000
    // );
    // res.json({
    //   message: "Create Invoice success",
    //   data: data,
    // });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const getAllCart = async (req, res) => {
  try {
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

const createInvoice = async (req, res) => {
  console.log(req.body);
  try {
    const {
      id_user,
      produk,
      tanggal_sewa,
      tanggal_kembali,
      total_harga,
      status_sewa,
    } = req.body;
    const [data] = await UsersModel.createInvoice(
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
const addProduct = async (req, res) => {
  console.log(req.body);
  try {
    const { nama, merk, harga, deskripsi, type_produk, status } = req.body;
    const [data] = await UsersModel.addProduct(
      nama,
      merk,
      harga,
      deskripsi,
      type_produk,
      status
    );
    res.json({
      message: "ADD Product success",
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
  try {
    const { id_invoice } = req.body;
    const [data] = await UsersModel.selectInvoiceById(id_invoice);
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

const getAllProdukByInvoice = async (req, res) => {
  try {
    const { produk } = req.body;
    console.log(produk);
    const [data] = await UsersModel.getAllProdukByInvoice(produk);
    res.json({
      message: "GELL ALL Produk by Invoice",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};
const getAllInvoice = async (req, res) => {
  try {
    const [data] = await UsersModel.getAllInvoice();
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
  addProduct,
  getProductFromRasa,
  postInvoiceFromRasa,
};
