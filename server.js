const express = require('express');
const multer = require('multer');
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const upload = multer();

// Инициализация Gemini с использованием API-ключа из переменной окружения
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-pro-exp-02-05",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

// Endpoint для обработки запроса от клиента
app.post('/api/gemini', upload.single('image'), async (req, res) => {
  const weight = req.body.weight;
  // Для примера формируем строку запроса с весом блюда.
  // При желании можно добавить обработку изображения.
  const inputText = `Блюдо с весом ${weight} г`;
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });
    const result = await chatSession.sendMessage(inputText);
    // Ожидается, что результат – строка с четырьмя числами через запятую
    const output = result.response.text().trim();
    res.send(output);
  } catch (error) {
    console.error('Ошибка при вызове Gemini API:', error);
    res.status(500).send("Ошибка API");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
