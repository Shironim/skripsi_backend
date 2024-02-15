import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import middleware from "./middleware/handler.js";
import routerAPI from "./api/index.js";
import morgan from 'morgan';
import cors from 'cors';

const app = express();
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
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use('/api', routerAPI);

app.use(middleware.notFound);
app.use(middleware.errorHandler);


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

export default app;