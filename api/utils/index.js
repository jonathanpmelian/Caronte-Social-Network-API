const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const PortfolioModel = require("../models/portfolio.model");
const axios = require("axios");
const cryptoAPI = axios.create({
  baseURL: "https://min-api.cryptocompare.com/data",
  headers: {
    Apikey: process.env.Apikey,
  },
});

async function checkAuth(req, res, next) {
  try {
    if (!req.headers.token) return res.status(500).send("User not logged in");

    jwt.verify(req.headers.token, process.env.SECRET, async (err, decoded) => {
      if (err) return res.status(500).send("Token not valid");

      const user = await UserModel.findOne({ email: decoded.email });

      if (!user) return res.status(500).send("Token not valid");
      else {
        res.locals.user = user;
        next();
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error authorizing user: ${err}`);
  }
}

async function checkAdmin(req, res, next) {
  try {
    if (res.locals.user.role === "Admin") {
      next();
    } else {
      res.status(403).send("User not authorized");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error authorizing user: ${err}`);
  }
}

async function updatePrice(req, res) {
  try {
    const portfolio = await PortfolioModel.findById(
      req.params.portfolioId
    ).populate("coins");

    for (let i = 0; i < portfolio.coins.length; i++) {
      const actualPrice = await cryptoAPI.get(
        `/price?fsym=${portfolio.coins[i].coin}&tsyms=${portfolio.currency}`
      );
      portfolio.coins[i].totalInit =
        portfolio.coins[i].amount * portfolio.coins[i].price;

      portfolio.coins[i].total =
        portfolio.coins[i].amount * actualPrice.data[portfolio.currency];

      portfolio.coins[i].pl = (
        actualPrice.data[portfolio.currency] - portfolio.coins[i].totalInit
      ).toFixed(2);

      portfolio.coins[i].change = (
        (portfolio.coins[i].pl / portfolio.coins[i].totalInit) *
        100
      ).toFixed(2);
    }
    portfolio.adquisitionCost = portfolio.coins.reduce(
      (p, c) => p + c.totalInit,
      0
    );

    portfolio.holding = portfolio.coins
      .reduce((p, c) => p + c.total, 0)
      .toFixed(2);

    portfolio.balance = (portfolio.holding - portfolio.adquisitionCost).toFixed(
      2
    );
    const bestCrypto = Math.max(
      ...Object.values(portfolio.coins.map((elem) => (elem = elem.change)))
    );
    const worstCrypto = Math.min(
      ...Object.values(portfolio.coins.map((elem) => (elem = elem.change)))
    );
    portfolio.bestCrypto = `${
      portfolio.coins[
        portfolio.coins.findIndex((elem) => elem.change === bestCrypto)
      ].coin
    } ${bestCrypto}%`;
    portfolio.worstCrypto = `${
      portfolio.coins[
        portfolio.coins.findIndex((elem) => elem.change === worstCrypto)
      ].coin
    } ${worstCrypto}%`;

    portfolio.holdingHistory = [];
    await portfolio.save();
    const firstDate = Math.min(
      ...Object.values(portfolio.coins.map((elem) => elem.date))
    );
    let actualDate = Date.now();

    while (actualDate > firstDate) {
      const current = {
        date: actualDate,
        amount: 0,
      };

      for (let i = 0; i < portfolio.coins.length; i++) {
        const historicalData = await cryptoAPI.get(
          `/pricehistorical?fsym=${portfolio.coins[i].coin}&tsyms=${portfolio.currency}&ts=${actualDate}`
        );
        current.amount +=
          historicalData.data[portfolio.coins[i].coin][portfolio.currency] *
          portfolio.coins[i].amount;
      }
      portfolio.holdingHistory.push(current);
      actualDate = actualDate - 86400 * 1000;
      await portfolio.save();
    }

    res.status(200).json(portfolio);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error updating prices: ${err}`);
  }
}

module.exports = { checkAuth, checkAdmin, updatePrice };
