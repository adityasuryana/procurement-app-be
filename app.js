const express = require('express')
const app = express()
const router = require('./router/index.js');
const cors = require('cors');
const port = 8015
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', router);


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})