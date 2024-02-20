import produkModel from "../models/produk.js";
import rasaModel from "../models/rasa.js";
import pengembalianModel from "../models/pengembalian.js";
import invoiceModel from "../models/invoice.js";
import { useFormatCurrency } from "../utils/utils.js";
import { Resend } from 'resend';
const resend = new Resend(`re_${process.env.RESEND_API_KEY}`);

const { formatCurrencyIDR } = useFormatCurrency();

const getProductFromRasa = async (req, res) => {
  console.log(req.body);
  console.log("getProductFromRasa Called");
  try {
    const { merk, kategori, seri, rentang_fokus } = req.body;
    const [data] = await rasaModel.getProductFromRasa(
      merk,
      kategori,
      seri,
      rentang_fokus
    );
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

const getSeveralProduct = async (req, res) => {
  console.log("getSeveralProduct Called");
  console.log(req.body);
  try {
    const { produk } = req.body;
    if (produk?.length > 0) {
      const [data] = await rasaModel.getSeveralProduct(produk);
      res.json({
        message: "GET Produk success",
        data: data,
      });
    } else {
      res.json({
        message: "GET Produk success",
        data: [],
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const sendMail = async (subject, toEmail, otpHtml) => {
  await resend.emails.send({
    from: 'ADMS Foto Video <onboarding@resend.dev>',
    to: [toEmail],
    subject: subject,
    html: otpHtml,
    headers: {
      'X-Entity-Ref-ID': `${process.env.RESEND_API_KEY}`,
    },
  });
}

const postInvoiceFromRasa = async (req, res) => {
  console.log(req.body);
  console.log("postInvoiceFromRasa Called");

  const toDate = (inputDate) => {
    const date = new Date(inputDate); // Mengonversi string tanggal ke objek Date
    const year = date.getFullYear(); // Mendapatkan tahun
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Mendapatkan bulan (ditambah 1 karena bulan dimulai dari 0)
    const day = String(date.getDate()).padStart(2, "0"); // Mendapatkan hari
    return `${day}/${month}/${year}`;
  };

  const generateRandomCode = (length) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // Karakter yang akan digunakan dalam kode invoice
    let randomCode = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomCode += characters.charAt(randomIndex);
    }
    return randomCode;
  };
  const createInvoiceCode = () => {
    let uniqueCode = generateRandomCode(12); // Membuat kode unik sepanjang 12 karakter
    let preUniqueCode = generateRandomCode(3); // Membuat kode unik sepanjang 12 karakter

    return `${preUniqueCode}-${uniqueCode}`;
  };
  try {
    const {
      nama_user,
      email_user,
      tanggal_diambil,
      tanggal_dikembalikan,
      produk,
    } = req.body;

    let today = new Date();
    let date_diambil = new Date();
    let date_dikembalikan = new Date();
    date_diambil.setDate(tanggal_diambil);
    date_dikembalikan.setDate(tanggal_dikembalikan);
    let lamaSewa = date_dikembalikan.getTime() - date_diambil.getTime(); // Menggunakan metode getTime() untuk mendapatkan nilai waktu dalam milidetik
    // Konversi lamaSewa dari milidetik menjadi hari
    lamaSewa = Math.ceil(lamaSewa / (1000 * 60 * 60 * 24));
    const [listProduk] = await rasaModel.getSeveralProduct(produk);
    for (let index = 0; index < produk.length; index++) {
      await produkModel.updateStatusProduk("disewa", produk[index]);
    }

    const kode_invoice = createInvoiceCode();
    const totalHarga = listProduk.reduce((accumulator, product) => {
      return accumulator + product.harga * lamaSewa;
    }, 0); // Initialize accumulator to 0

    let list = listProduk.map((item) => {
      return `
        <tr>
          <td style="text-align: left; font-weight: bold;">${item.nama}</td>
          <td style="text-align: center;">${item.harga}</td>
          <td style="text-align: center;">1</td>
          <td style="text-align: center;">${lamaSewa} Hari</td>
          <td style="text-align: right; font-weight: bold;">${formatCurrencyIDR(
            item.harga * lamaSewa
          )}</td>
        </tr>
      `;
    });
    let template = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <style>
        body{
          font-family: Arial, Helvetica, sans-serif;
          font-size: 16px;
          margin: 0 auto;
        }
        .table {
          border-collapse: collapse;
        }
        table{
          max-width: 600px;
          margin: 0 auto;
        }
        th{
          padding: 12px;
          text-transform: uppercase;
          font-family: Arial, Helvetica, sans-serif;
        }
        table, td {
          padding: 8px 16px;
          font-family: Arial, Helvetica, sans-serif;
        }
        .text-center {
          text-align: center;
        }
        td:not(:first-child) {
          text-align: center;
        }
        tbody td:last-child, tfoot td:last-child, thead th:last-child {
          text-align: end !important;
        }
        tr:first-child td{
          padding-top: 20px;
        }
        tbody tr:last-child td{
          padding-bottom: 20px;
          border-bottom: 1px solid black;
        }
        .margin-0 {
          margin: 0;
        }
        .padding-0 {
          padding: 0;
        }
      </style>
    </head>
    <body>
    <header style="max-width:600px; margin: 0 auto;">
      <h1 style="font-size: 20px;">
        Reminder Invoice #${kode_invoice}
      </h1>
      <p>
        Halo <span style="font-weight:bold">${nama_user}</span>, Terimakasih telah memilih ADMS sebagai tempat kepercayaan menyewa kamera area Kota Semarang, invoice ini dibuat pada tanggal ${toDate(
      today
    )}. Berikut rincian yang kamu order sebelumnya :
      </p>
    </header>
    <main>
      <table class="table">
        <thead>
          <tr style="color: black; text-align:left; background-color: #eeeee">
            <th style="width: 40%;">Keterangan</th>
            <th style="width: 20%;" class="text-center">Harga</th>
            <th style="width: 20%;" class="text-center">Jumlah</th>
            <th style="width: 20%;" class="text-center">Lama Sewa</th>
            <th style="width: 20%;" class="text-center">Total</th>
          </tr>
        </thead>
        <tbody>
          ${list.map((item) => item).join("")}
        </tbody>
        <tfoot>
          <tr>
            <td style="font-weight: bold;">TOTAL</td>
            <td></td>
            <td></td>
            <td colspan="2" style="font-weight: bold; text-align: end; font-size: 20px;">${formatCurrencyIDR(
              totalHarga
            )}</td>
          </tr>
        </tfoot>
      </table>
    </main>
    <footer style="max-width:600px; margin: 0 auto;">
      <div >
        <p style="font-style: italic;">
        *Note: Pengambilan alat dapat dilakukan di kantor kami pada tanggal ${toDate(
          today
        )}. Mohon untuk membawa KTP dan melakukan pembayaran sebelum pengambilan alat.
        </p>
          <div style="padding: 12px 8px 0;">
            <p class="margin-0" style="padding-bottom: 6px; font-weight: bold; font-size: 20px;">Metode Pembayaran</p>
            <p class="margin-0" style="padding-bottom: 6px;">a.n Sukotjo</p>
            <p class="margin-0" style="padding-bottom: 6px;">Bank Mandiri</p>
            <p class="margin-0" style="padding-bottom: 6px;">No Rek. 1234567890</p>
        </div>
      </div>
    </footer>
    </body>
    </html>
      `;
    const [pengembalian] = await pengembalianModel.createdPengembalian(
      kode_invoice
    );
    const [data] = await invoiceModel.createInvoice(
      nama_user,
      email_user,
      toDate(date_diambil),
      toDate(date_dikembalikan),
      produk,
      totalHarga,
      kode_invoice
    );
    sendMail("Invoice ADMS Foto Video", email_user, template);
    res.json({
      message: "Create Invoice success",
      data: {
        data: data,
        pengembalian: pengembalian,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

export default { getProductFromRasa, getSeveralProduct, postInvoiceFromRasa };
