const mongoose = require("mongodb");
const shikouri = process.env.shikodb
const shiko = mongoose

module.exports = async () => {

    let shikodb;

    let shkodb = new shiko.MongoClient(shikouri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    shkodb.connect((err, db) => {
        if (err) throw err;
        shikodb = db.db("ShikoDB")

    })

    return shkodb
}