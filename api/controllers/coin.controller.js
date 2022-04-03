// const axios = require("axios");
const PortfolioModel = require("../models/portfolio.model");

async function addCoin(req, res) {
  try {
    const portfolio = await PortfolioModel.findById(
      req.params.portfolioId
    ).populate("coins");
    portfolio.coins.push(req.body);
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

async function editOneCoin(req, res, next) {
  try {
    const portfolio = await PortfolioModel.findById(req.params.portfolioId);
    const coin = portfolio.coins.id(req.params.coinId);
    coin.set(req.body);
    await portfolio.save();

    next();
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error editing coin: ${err}`);
  }
}

async function deleteOneCoin(req, res) {
  try {
    const portfolio = await PortfolioModel.findById(req.params.portfolioId);
    portfolio.coins.remove(req.params.coinId);
    await portfolio.save();

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
