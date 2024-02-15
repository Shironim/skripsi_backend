import UsersModel from "../models/user.js";

// Dashboard Page
const getIncomePerMonth = async (req, res) => {
  try {
    console.log("getIncomePerMonth Called");
    const [data] = await UsersModel.getIncomePerMonth();
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

export default { getIncomePerMonth };