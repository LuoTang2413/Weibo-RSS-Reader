const express = require('express');
const RSSParser = require('rss-parser');
const app = express();
const parser = new RSSParser();

let weiboData = [];

async function updateWeiboData() {
  const feed = await parser.parseURL('https://rsshub.app/weibo/user/7457195803');
  weiboData = feed.items;
}

setInterval(updateWeiboData, 3600000);
updateWeiboData();

app.get('/', (req, res) => {
  res.json(weiboData);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
