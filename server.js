const app = require("express")()

const port = process.env.PORT || 3000

app.get('/', async (req, res) => {
    return res.send('IM FINALLY UP')
})


module.exports = () => {
    app.listen(port)
}