require('dotenv').config();

const express = require('express');
const axios = require('axios');

const { PORT =  3000 } = process.env;

const HOST = 'https://www.metaweather.com';

const app = express();

app.get('*', async (req, res) => {
    console.log('req.url', req.url);
    if (req.url.startsWith('/api')) {
        const { data } = await axios.get(`${HOST}${req.url}`);
        res.json(data);
        return;
    }
    res.send('Your url should start with: /api');
});

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});