import app from "./app.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err, res) => {
  if (err) {
    console.log(err);
    return res.status(500).send(err.message);
  } else {
    console.log("[INFO] Server Running on port:", PORT);
  }
});
