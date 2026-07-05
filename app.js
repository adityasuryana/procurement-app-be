const dotenv = require('dotenv');
dotenv.config();

const express = require('express')
const app = express()
const router = require('./router/index.js');
const cors = require('cors');
const port = process.env.PORT || 8015
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', router);

// Global Error Handler Middleware
app.use((err, req, res, next) => {
    console.error('Error Handler:', err.message);
    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'Ukuran file melebihi batas maksimum 5MB. Silakan kompres file Anda.' });
    }
    if (err.name === 'MulterError') {
        return res.status(400).json({ error: `Kesalahan unggah file: ${err.message}` });
    }
    if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
        const messages = err.errors.map(e => `${e.path} (${e.message})`).join(', ');
        return res.status(400).json({ error: `Kesalahan validasi data: ${messages}` });
    }
    res.status(err.status || 500).json({ error: err.message || 'Terjadi kesalahan sistem internal' });
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})