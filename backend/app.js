import cors from 'cors';
import express from 'express';
import { initDb } from './config/init.config.js';
import { getAllNews } from './controllers/news.controller.js';

const app = express();

app.use(cors());

app.get('/news', getAllNews);

initDb()

app.listen(8000)