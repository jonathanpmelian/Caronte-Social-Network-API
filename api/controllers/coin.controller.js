// const axios = require("axios");
const CoinModel = require("../models/coin.model");
const PortfolioModel = require("../models/portfolio.model");

async function addCoin(req, res) {
  try {
    const coin = await CoinModel.create(req.body);
    const portfolio = await PortfolioModel.findById(
      req.params.portfolioId
    ).populate("coins");
    portfolio.coins.push(coin);
    await portfolio.save();

    res.status(200).json(portfolio.coins);
    // const coinAPI = axios.create({
    //   baseURL: "http://rest.coinapi.io",
    //   headers: { "X-CoinAPI-Key": "A1336175-CD98-4DCD-8C52-F2DFF000DC9D" },
    // });

    // const result = await coinAPI.get(`/v1/assets/BTC`);
    // res.status(200).json(result.data);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error adding coin: ${err}`);
  }
}

async function editOneCoin(req, res) {
  try {
    const coin = await CoinModel.findByIdAndUpdate(
      req.params.coinId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json(coin);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error editing coin: ${err}`);
  }
}

async function deleteOneCoin(req, res) {
  try {
    const portfolio = await PortfolioModel.findById(req.params.portfolioId);
    const index = portfolio.coins.findIndex(
      (elem) => elem._id.toString() === req.params.coinId
    );
    portfolio.coins.splice(index, 1);

    await CoinModel.findByIdAndDelete(req.params.coinId);
    res.status(200).send("Coin deleted");
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error deleting coin: ${err}`);
  }
}

module.exports = {
  addCoin,
  editOneCoin,
  deleteOneCoin,
};
