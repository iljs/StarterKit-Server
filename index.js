require('dotenv').config()

const express = require('express')
const router = require('./routes/index')
const fileUpload = require('express-fileupload')

const cors = require('cors')

const PORT = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(fileUpload({}))


app.use('/api', router)
app.use(express.static('public'));

const start = async () => {
    try {
        //await sequelize.authenticate()
        //await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}


start()