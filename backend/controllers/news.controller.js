import { db } from '../config/db.config.js';

export const getAllNews = (req, res) => {
    const news = db.prepare(`SELECT * FROM news`).all();
    res.json(news)
}