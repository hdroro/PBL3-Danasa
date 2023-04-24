const db = require('../../config/db');

class News {
    constructor(titleNews, contentNews, urlImg) {
        this.titleNews = titleNews;
        this.contentNews = contentNews;
        this.urlImg = urlImg;
    }

    async loadNews() {
        return new Promise((resolve, reject) => {
            const checkQuery = `SELECT * FROM news`;
            db.query(checkQuery,  (err, results) => {
                if (err) {
                    return reject(err);
                }
                else{
                    return resolve(results);
                }
            });
        });
    }
}

module.exports = News;
