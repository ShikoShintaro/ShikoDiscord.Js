const app = require("express")()


app.get('/', async (req, res) => {
    return res.send('IM FINALLY UP')
})


module.exports = () => {
    app.listen(process.env.PORT || 8080)
}