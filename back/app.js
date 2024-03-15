const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const BeCoMe = require('./BeCoMe'); // Путь к вашему классу BeCoMe

const app = express();
app.use(cors({ origin: 'http://77.91.68.118:3001' }));
const port = 3000;

// Используем middleware для парсинга JSON в теле запроса
app.use(bodyParser.json());

// Обработчик POST-запроса для расчетов
app.post('/calculate', (req, res) => {
  const expertJudgments = req.body.expertData;

  if (!expertJudgments || !Array.isArray(expertJudgments) || expertJudgments.length === 0) {
    return res.status(400).json({ error: 'Invalid input data.' });
  }

  // Создаем экземпляр BeCoMe с переданными оценками экспертов
  const becomeCalculator = new BeCoMe(expertJudgments);

  // Вычисляем результаты
  const result = becomeCalculator.calculateBecome();

  // Возвращаем результаты в формате JSON
  res.json({ result });
});

// Запускаем сервер
app.listen(port, () => {
  console.log(`Server is running at http://kikker.online:${port}`);
});
