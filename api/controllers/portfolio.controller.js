const PortfolioModel = require("../models/portfolio.model");
const UserModel = require("../models/user.model");

async function getAllPortfolio(req, res) {
  try {
    const user = await UserModel.findById(res.locals.user.id).populate(
      "portfolio"
    );

    res.status(200).json(user.portfolio);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error getting all portfolio: ${err}`);
  }
}

async function getOnePortfolio(req, res) {
  try {
    const user = await UserModel.findById(res.locals.user.id);

    if (
      user.portfolio.some(
        (elem) => elem._id.toString() === req.params.portfolioId
      )
    ) {
      const portfolio = await PortfolioModel.findById(req.params.portfolioId);

      res.status(200).json(portfolio);
    } else {
      res.status(403).send("Access denied");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error getting one portfolio: ${err}`);
  }
}

async function addPortfolio(req, res) {
  try {
    const portfolio = await PortfolioModel.create(req.body);
    const user = await UserModel.findById(res.locals.user.id);
    user.portfolio.push(portfolio);
    await user.save();

    res.status(200).json(portfolio);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error creating portfolio: ${err}`);
  }
}

async function editMyPortfolio(req, res) {
  try {
    const portfolio = await PortfolioModel.findByIdAndUpdate(
      req.params.portfolioId,
      { title: req.body.title, description: req.body.description },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json(portfolio);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error editing portfolio: ${err}`);
  }
}

async function deletePortfolio(req, res) {
  try {
    const user = await UserModel.findById(res.locals.user.id);
    const index = user.portfolio.findIndex(
      (elem) => elem._id.toString === req.params.portfolioId
    );
    user.portfolio.splice(index, 1);
    await PortfolioModel.findByIdAndDelete(req.params.portfolioId);
    await user.save();

    res.status(200).send("Portfolio deleted");
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error deleting portfolio: ${err}`);
  }
}

module.exports = {
  getAllPortfolio,
  getOnePortfolio,
  addPortfolio,
  editMyPortfolio,
  deletePortfolio,
};
