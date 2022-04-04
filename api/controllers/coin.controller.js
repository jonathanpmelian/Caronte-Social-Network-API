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
