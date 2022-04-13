const { cryptoAPI } = require("../utils/index");

async function getTopList(req, res) {
  try {
    const topList = await cryptoAPI.get(`/top/totalvolfull?limit=10&tsym=USD`);
    console.log(topList);
    res.status(200).json(topList.data.Data);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error getting topList:${err}`);
  }
}

async function getNews(req, res) {
  try {
    const news = await cryptoAPI.get(`/v2/news/?lang=ES`);

    res.status(200).json(news.data.Data);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error getting News:${err}`);
  }
}

module.exports = {
  getTopList,
  getNews,
};
