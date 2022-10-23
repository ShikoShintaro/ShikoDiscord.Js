const app = require("express")()


app.get('/', async (req, res) => {
    return res.send('Follow documentation ')
})


app.listen(8999, () => {

})