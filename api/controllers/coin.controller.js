const axios = require("axios");
const { application } = require("express");

async function addCoin(req, res) {
  try {
    //! DUDA: WS desde el front o REST API desde el back
    //Por el body:
    //Amount, price, date, coin
    //Desde la API externa:
    const coinAPI = axios.create({
      baseURL: "http://rest.coinapi.io",
      headers: { "X-CoinAPI-Key": "A1336175-CD98-4DCD-8C52-F2DFF000DC9D" },
    });

    const result = await coinAPI.get("/v1/assets/BTC");
    res.status(200).json(result.data);
    //Localizar coin y date
    //En el controlador
    //Calcular total, PL, Change
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error adding coin: ${err}`);
  }
}

async function editOneCoin(req, res) {
  try {
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error editing coin: ${err}`);
  }
}

async function deleteOneCoin(req, res) {
  try {
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
