const app = require("express")()


app.get('/', (req,res) =>
    res.send('Im Reay Master')
)

module.exports = () => {
    app.listen(2004)
}