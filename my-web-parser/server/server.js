const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const app = express();
const PORT = 5001;

app.use(cors());

app.get('/parse', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).send('URL не указан');
  }

  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const pageTitle = $('title').text().trim(); // Извлекаем заголовок страницы
    res.json({ pageTitle }); // Отправляем заголовок страницы
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});