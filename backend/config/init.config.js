import { DUMMY_NEWS } from "../data/dummy-news.js";
import { db } from "./db.config.js";

export function initDb() {
    db.prepare(`
        CREATE TABLE IF NOT EXISTS news (id INTEGER PRIMARY KEY, slug TEXT UNIQUE, title TEXT, content TEXT, date TEXT, image TEXT)
    `).run()

    const { count } = db.prepare(`SELECT COUNT(*) as count from news`).get()

    if (count === 0) {
        const insert = db.prepare(
        'INSERT INTO news (slug, title, content, date, image) VALUES (?, ?, ?, ?, ?)'
        );

        DUMMY_NEWS.forEach((news) => {
        insert.run(news.slug, news.title, news.content, news.date, news.image);
        });
    };
}