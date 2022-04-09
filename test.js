const express = require("express");
const app = express();
const axios = require("axios");
const cheerio = require("cheerio");

const PORT = 8080;
const NEXON_URL = "https://maplestory.nexon.com";
// 깃 테스트용 주석
const getHtml = async (pageNum) => {
  try {
    return await axios({
      url: NEXON_URL + "/Common/Guild",
      method: "get",
      data: {
        gid: 285951,
        wid: 1,
        orderby: 0,
        page: pageNum
      }
    });
  } catch (err) {
    console.error(err);
  }
};

app.get("/", (req, res) => {
  let nameArr = [];

  const testFunction = async () => {
    for (let pageNum = 1; pageNum < 10; pageNum++) {
      const html = await getHtml(pageNum);
      const $ = cheerio.load(html.data);

      for (let index = 0; index < $(".rank_table tr").length - 1; index++) {
        nameArr.push($(".rank_table .left a").eq(index).text());
      }
    }

    return nameArr;
  }

  testFunction().then(result => res.send(result));
});


app.listen(PORT, () => {
  console.log(`Yoshi Member App listening on port ${PORT}`);
});