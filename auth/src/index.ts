import express from 'express'
import bodyParser from 'body-parser'

const app = express()
app.use(bodyParser.json());


app.listen(3000, () => {
    console.log("Listning at port 3000");
})