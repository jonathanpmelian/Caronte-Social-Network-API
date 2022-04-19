const PortfolioModel = require("../models/portfolio.model");
const { cryptoAPI } = require("../utils/index");

async function getChart(req, res) {
  try {
    const portfolio = await PortfolioModel.findById(req.params.portfolioId);

    const holdingHistory = [];
    const range = portfolio.chartRange === "Month" ? 30 : 7;

    for (let i = 0; i < portfolio.coins.length; i++) {
      const historicalData = await cryptoAPI.get(
        `/v2/histoday?fsym=${portfolio.coins[i].coin}&tsym=${portfolio.currency}&limit=${range}`
      );

      const convertion = historicalData.data.Data.Data.map((elem) => {
        return (elem = {
          coin: portfolio.coins[i].coin,
          time: elem.time,
          holding:
            portfolio.coins[i].date.toFixed() < elem.time
              ? portfolio.coins[i].amount *
                ((elem.low + elem.high) / 2).toFixed(2)
              : 0,
        });
      });
      holdingHistory.push(convertion);
    }

    portfolio.holdingConvertion = [];
    for (let i = 0; i < holdingHistory[0].length; i++) {
      const data = {
        date: holdingHistory[0][i].time,
        total: 0,
      };
      portfolio.holdingConvertion.push(data);

      for (let j = 0; j < holdingHistory.length; j++) {
        portfolio.holdingConvertion[i].total += holdingHistory[j][i].holding;
      }
      portfolio.holdingConvertion[i].total.toFixed(2);
    }
    // await portfolio.updateOne();
    // await portfolio.save();

    res.status(200).json(portfolio.holdingConvertion);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error getting chart: ${err}`);
  }
}

async function getPieChart(req, res) {
  try {
    const portfolio = await PortfolioModel.findById(req.params.portfolioId);
    const data = portfolio.coins
      .map(
        (elem) =>
          (elem = {
            coin: elem.coin,
            totalInit: elem.totalInit,
          })
      )
      .reduce((p, c) => {
        const index = p.findIndex((elem) => elem.coin === c.coin);
        if (index !== -1) {
          p[index].totalInit += c.totalInit;
        } else {
          p.push(c);
        }
        return p;
      }, []);

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error getting pie chart data: ${err}`);
  }
}

async function editChart(req, res) {
  try {
    const portfolio = await PortfolioModel.findByIdAndUpdate(
      req.params.portfolioId,
      { chartRange: req.body.chartRange }
    );
    await portfolio.save();

    res.status(200).json(portfolio.chartRange);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error editing chart: ${err}`);
  }
}

module.exports = {
  getChart,
  editChart,
  getPieChart,
};
